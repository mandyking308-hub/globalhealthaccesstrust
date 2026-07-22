
DROP FUNCTION IF EXISTS public.retention_review_blocking_hold(uuid);
DROP FUNCTION IF EXISTS public.rr_generate_due_review_candidates();

CREATE OR REPLACE FUNCTION public.retention_review_blocking_hold(_review_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.privacy_retention_reviews rr
    JOIN public.privacy_retention_holds h ON h.id = rr.hold_id
    WHERE rr.id = _review_id AND h.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.rr_record_extension_notification(
  _request_id uuid, _notified_at timestamptz, _channel text, _note text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE r record;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _channel IS NULL OR length(trim(_channel)) = 0 THEN RAISE EXCEPTION 'Channel required'; END IF;
  IF _channel NOT IN ('portal','secure_email','post','telephone_confirmed','other') THEN
    RAISE EXCEPTION 'Invalid channel';
  END IF;
  SELECT * INTO r FROM public.gdpr_requests WHERE id = _request_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Request not found'; END IF;
  IF NOT r.extension_applied THEN RAISE EXCEPTION 'Apply the extension before recording the notification'; END IF;

  UPDATE public.gdpr_requests
     SET extension_notified_at = COALESCE(_notified_at, now()),
         extension_notification_channel = _channel,
         extension_notification_note = _note
   WHERE id = _request_id;

  PERFORM public.rr_add_event(_request_id, 'extension_notified',
    jsonb_build_object('channel', _channel, 'note', _note, 'notified_at', COALESCE(_notified_at, now())));
END $$;

CREATE OR REPLACE FUNCTION public.rr_review_create(
  _rule_code text, _record_type text, _record_id uuid, _record_summary text,
  _subject_user_id uuid DEFAULT NULL, _related_project_id uuid DEFAULT NULL,
  _related_donation_id uuid DEFAULT NULL, _review_due_at timestamptz DEFAULT NULL,
  _sensitivity text DEFAULT 'routine', _proposed_action text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_rule public.privacy_retention_rules%ROWTYPE; v_id uuid; v_ref text;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT * INTO v_rule FROM public.privacy_retention_rules WHERE rule_code = _rule_code AND active;
  IF NOT FOUND THEN RAISE EXCEPTION 'Retention rule % not found or inactive', _rule_code; END IF;
  v_ref := public.generate_review_reference();
  INSERT INTO public.privacy_retention_reviews(
    review_reference, retention_rule_id, record_type, record_id, record_summary,
    subject_user_id, related_project_id, related_donation_id,
    review_due_at, sensitivity, status, proposed_action
  ) VALUES (
    v_ref, v_rule.id, _record_type, _record_id, _record_summary,
    _subject_user_id, _related_project_id, _related_donation_id,
    COALESCE(_review_due_at, now()),
    COALESCE(_sensitivity, CASE WHEN v_rule.sensitive_exclusion THEN 'confidential' ELSE 'routine' END),
    'due',
    COALESCE(_proposed_action, v_rule.ordinary_action)
  ) RETURNING id INTO v_id;
  RETURN v_id;
END $$;

CREATE OR REPLACE FUNCTION public.rr_review_decide(
  _review_id uuid, _decision text, _decision_reason text, _deferred_until timestamptz DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE new_status text;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _decision_reason IS NULL OR length(trim(_decision_reason)) = 0 THEN
    RAISE EXCEPTION 'A reason is required for every retention decision';
  END IF;
  IF _decision = 'begin_review' THEN
    UPDATE public.privacy_retention_reviews
       SET status='in_review', reviewed_by=auth.uid(), decision_reason=_decision_reason
     WHERE id=_review_id;
    RETURN;
  END IF;
  new_status := CASE _decision
    WHEN 'retain' THEN 'retain' WHEN 'defer' THEN 'defer'
    WHEN 'anonymise_approved' THEN 'anonymise_approved'
    WHEN 'delete_approved' THEN 'delete_approved'
    WHEN 'excluded' THEN 'excluded' ELSE NULL END;
  IF new_status IS NULL THEN RAISE EXCEPTION 'Invalid decision: %', _decision; END IF;
  IF _decision = 'defer' AND _deferred_until IS NULL THEN
    RAISE EXCEPTION 'A new review date is required to defer';
  END IF;
  IF _decision IN ('anonymise_approved','delete_approved') THEN
    IF public.retention_review_blocking_hold(_review_id) THEN
      RAISE EXCEPTION 'An active retention hold prevents this action';
    END IF;
  END IF;
  UPDATE public.privacy_retention_reviews
     SET status = new_status, decision = _decision, decision_reason = _decision_reason,
         reviewed_by = auth.uid(), reviewed_at = now(),
         deferred_until = CASE WHEN _decision='defer' THEN _deferred_until ELSE deferred_until END,
         review_due_at = CASE WHEN _decision='defer' THEN _deferred_until ELSE review_due_at END
   WHERE id = _review_id;
END $$;

CREATE OR REPLACE FUNCTION public.rr_generate_due_review_candidates()
RETURNS TABLE(rule_code text, candidates_created integer, unmapped boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  rule public.privacy_retention_rules%ROWTYPE;
  cutoff timestamptz;
  n integer;
  mapped_codes text[] := ARRAY['R-CONTACT','R-PORTAL','R-UNSUCCESSFUL-TEAM','R-SEC-LOGS','R-COOKIE','R-DPR'];
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;

  FOR rule IN SELECT * FROM public.privacy_retention_rules WHERE active LOOP
    n := 0;
    IF rule.rule_code = ANY(mapped_codes) AND rule.default_retention_value IS NOT NULL
       AND rule.default_retention_unit IN ('days','months','years') THEN
      cutoff := now() - (rule.default_retention_value ||
                CASE rule.default_retention_unit
                  WHEN 'days' THEN ' days' WHEN 'months' THEN ' months' ELSE ' years' END)::interval;

      IF rule.rule_code = 'R-CONTACT' THEN
        WITH s AS (
          SELECT ic.id, 'Contact enquiry: ' || COALESCE(ic.subject, ic.name, ic.email) AS summary
          FROM public.inbound_contacts ic
          WHERE ic.created_at < cutoff
            AND NOT EXISTS (
              SELECT 1 FROM public.privacy_retention_reviews r
              WHERE r.record_type='inbound_contact' AND r.record_id=ic.id AND r.status IN ('due','in_review','defer')
            )
          LIMIT 200
        ), ins AS (
          INSERT INTO public.privacy_retention_reviews(
            review_reference, retention_rule_id, record_type, record_id, record_summary,
            review_due_at, sensitivity, status, proposed_action)
          SELECT public.generate_review_reference(), rule.id, 'inbound_contact', s.id, s.summary,
                 now(), 'routine', 'due', rule.ordinary_action FROM s
          RETURNING 1
        ) SELECT count(*) INTO n FROM ins;

      ELSIF rule.rule_code = 'R-PORTAL' THEN
        WITH s AS (
          SELECT p.id, 'Portal account: ' || COALESCE(p.email, p.id::text) AS summary
          FROM public.profiles p
          LEFT JOIN public.user_sessions us ON us.user_id = p.id
          GROUP BY p.id, p.email
          HAVING COALESCE(MAX(us.created_at), (SELECT created_at FROM public.profiles pp WHERE pp.id=p.id)) < cutoff
             AND NOT EXISTS (
               SELECT 1 FROM public.privacy_retention_reviews r
               WHERE r.record_type='profile' AND r.record_id=p.id AND r.status IN ('due','in_review','defer')
             )
          LIMIT 200
        ), ins AS (
          INSERT INTO public.privacy_retention_reviews(
            review_reference, retention_rule_id, record_type, record_id, record_summary, subject_user_id,
            review_due_at, sensitivity, status, proposed_action)
          SELECT public.generate_review_reference(), rule.id, 'profile', s.id, s.summary, s.id,
                 now(), 'confidential', 'due', rule.ordinary_action FROM s
          RETURNING 1
        ) SELECT count(*) INTO n FROM ins;

      ELSIF rule.rule_code = 'R-UNSUCCESSFUL-TEAM' THEN
        WITH s AS (
          SELECT v.id, 'Unsuccessful Project Team application: ' || COALESCE(v.name, v.email) AS summary, v.user_id
          FROM public.volunteers v
          WHERE COALESCE(v.updated_at, v.created_at) < cutoff
            AND lower(COALESCE(v.status,'')) IN ('rejected','declined','withdrawn','not_selected','unsuccessful')
            AND NOT EXISTS (
              SELECT 1 FROM public.privacy_retention_reviews r
              WHERE r.record_type='volunteer' AND r.record_id=v.id AND r.status IN ('due','in_review','defer')
            )
          LIMIT 200
        ), ins AS (
          INSERT INTO public.privacy_retention_reviews(
            review_reference, retention_rule_id, record_type, record_id, record_summary, subject_user_id,
            review_due_at, sensitivity, status, proposed_action)
          SELECT public.generate_review_reference(), rule.id, 'volunteer', s.id, s.summary, s.user_id,
                 now(), 'confidential', 'due', 'delete_after_review' FROM s
          RETURNING 1
        ) SELECT count(*) INTO n FROM ins;

      ELSIF rule.rule_code = 'R-SEC-LOGS' THEN
        WITH s AS (
          SELECT sl.id, 'Security log: ' || COALESCE(sl.log_type, 'event') AS summary
          FROM public.system_logs sl
          WHERE sl.created_at < cutoff
            AND NOT EXISTS (
              SELECT 1 FROM public.privacy_retention_reviews r
              WHERE r.record_type='system_log' AND r.record_id=sl.id AND r.status IN ('due','in_review','defer')
            )
          LIMIT 200
        ), ins AS (
          INSERT INTO public.privacy_retention_reviews(
            review_reference, retention_rule_id, record_type, record_id, record_summary,
            review_due_at, sensitivity, status, proposed_action)
          SELECT public.generate_review_reference(), rule.id, 'system_log', s.id, s.summary,
                 now(), 'routine', 'due', rule.ordinary_action FROM s
          RETURNING 1
        ) SELECT count(*) INTO n FROM ins;

      ELSIF rule.rule_code = 'R-DPR' THEN
        WITH s AS (
          SELECT g.id, 'Rights request: ' || COALESCE(g.reference_number, g.id::text) AS summary, g.user_id
          FROM public.gdpr_requests g
          WHERE COALESCE(g.completed_at, g.updated_at, g.created_at) < cutoff
            AND g.status IN ('completed','refused','refused_in_part','withdrawn','closed')
            AND NOT EXISTS (
              SELECT 1 FROM public.privacy_retention_reviews r
              WHERE r.record_type='gdpr_request' AND r.record_id=g.id AND r.status IN ('due','in_review','defer')
            )
          LIMIT 200
        ), ins AS (
          INSERT INTO public.privacy_retention_reviews(
            review_reference, retention_rule_id, record_type, record_id, record_summary, subject_user_id,
            review_due_at, sensitivity, status, proposed_action)
          SELECT public.generate_review_reference(), rule.id, 'gdpr_request', s.id, s.summary, s.user_id,
                 now(), 'confidential', 'due', rule.ordinary_action FROM s
          RETURNING 1
        ) SELECT count(*) INTO n FROM ins;

      ELSIF rule.rule_code = 'R-COOKIE' THEN
        n := 0;
      END IF;

      rule_code := rule.rule_code; candidates_created := n; unmapped := false; RETURN NEXT;
    ELSE
      rule_code := rule.rule_code; candidates_created := 0; unmapped := true; RETURN NEXT;
    END IF;
  END LOOP;
END $$;

GRANT EXECUTE ON FUNCTION public.retention_review_blocking_hold(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_record_extension_notification(uuid, timestamptz, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_review_create(text, text, uuid, text, uuid, uuid, uuid, timestamptz, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_review_decide(uuid, text, text, timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_generate_due_review_candidates() TO authenticated;
