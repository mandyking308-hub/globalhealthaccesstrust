
-- =========================================================================
-- 1. RETENTION SCHEDULE CORRECTIONS (idempotent, targeted UPDATEs)
-- =========================================================================
UPDATE public.privacy_retention_rules SET
  record_category='Website contact enquiries',
  default_retention_value=3, default_retention_unit='years',
  retention_start_event='enquiry closed',
  ordinary_action='review', automatic_deletion_allowed=false
WHERE rule_code='R-CONTACT';

UPDATE public.privacy_retention_rules SET
  record_category='Portal account and profile information',
  default_retention_value=2, default_retention_unit='years',
  retention_start_event='account closure',
  ordinary_action='review', automatic_deletion_allowed=false,
  notes='Retained while the account is active and for two years after closure, except where another record category requires longer retention.'
WHERE rule_code='R-PORTAL';

UPDATE public.privacy_retention_rules SET
  default_retention_value=7, default_retention_unit='years',
  retention_start_event='account or relevant relationship ends',
  ordinary_action='review', automatic_deletion_allowed=false
WHERE rule_code='R-TERMS';

UPDATE public.privacy_retention_rules SET
  default_retention_value=7, default_retention_unit='years',
  retention_start_event='account or relevant relationship ends',
  ordinary_action='review', automatic_deletion_allowed=false
WHERE rule_code='R-PRIVACY-ACK';

UPDATE public.privacy_retention_rules SET
  default_retention_value=7, default_retention_unit='years',
  retention_start_event='project closure or termination',
  ordinary_action='review'
WHERE rule_code='R-CHARTERS';

UPDATE public.privacy_retention_rules SET
  default_retention_value=7, default_retention_unit='years',
  retention_start_event='project closure',
  ordinary_action='review'
WHERE rule_code='R-PROJECT-REPORTS';

UPDATE public.privacy_retention_rules SET
  default_retention_value=7, default_retention_unit='years',
  retention_start_event='assignment ends',
  ordinary_action='review',
  notes='Records supporting financial, contractual, safeguarding or project accountability are retained for seven years; other routine administration should be reviewed after two years.'
WHERE rule_code='R-TEAM-ASSIGNMENT';

UPDATE public.privacy_retention_rules SET
  default_retention_value=2, default_retention_unit='years',
  retention_start_event='relevant relationship ends',
  ordinary_action='review',
  notes='A longer period may apply for a documented safeguarding or legal reason.'
WHERE rule_code='R-REFERENCES';

UPDATE public.privacy_retention_rules SET
  default_retention_value=6, default_retention_unit='years',
  retention_start_event='final closure',
  ordinary_action='review'
WHERE rule_code='R-COMPLAINTS';

UPDATE public.privacy_retention_rules SET
  default_retention_value=NULL, default_retention_unit='case_specific',
  ordinary_action='case_specific_review',
  automatic_deletion_allowed=false, sensitive_exclusion=true,
  notes='Retention of safeguarding records depends on the concern, the people involved, limitation periods, safeguarding guidance and professional advice. Records are not treated as permanently retained by default.'
WHERE rule_code='R-SAFEGUARDING';

UPDATE public.privacy_retention_rules SET
  default_retention_value=6, default_retention_unit='years',
  retention_start_event='case closure',
  ordinary_action='review',
  automatic_deletion_allowed=false, sensitive_exclusion=true,
  notes='Records may be retained longer while an investigation, claim, safeguarding need or regulatory requirement continues.'
WHERE rule_code='R-WHISTLEBLOWING';

UPDATE public.privacy_retention_rules SET
  default_retention_value=NULL, default_retention_unit='case_specific',
  ordinary_action='case_specific_review',
  automatic_deletion_allowed=false,
  notes='Permission records are retained while the relevant media is retained and for an appropriate evidential period afterwards.'
WHERE rule_code='R-MEDIA-CONSENT';

UPDATE public.privacy_retention_rules SET
  default_retention_value=12, default_retention_unit='months',
  ordinary_action='review',
  notes='A security incident, fraud investigation, hold or legal requirement may justify longer retention.'
WHERE rule_code='R-SEC-LOGS';

-- =========================================================================
-- 2. gdpr_requests STATUS + DECISION CHECK CONSTRAINTS
-- =========================================================================
-- Normalise any legacy row values first (only if compatible; we do NOT rewrite outcomes)
-- current rows: 0, so this is safe.
ALTER TABLE public.gdpr_requests DROP CONSTRAINT IF EXISTS gdpr_requests_status_check;
ALTER TABLE public.gdpr_requests ADD CONSTRAINT gdpr_requests_status_check
  CHECK (status IN (
    'pending','received','identity_verification','clarification_required',
    'searching','third_party_review','exemption_review',
    'response_preparation','response_ready',
    'completed','refused_in_part','refused','withdrawn',
    -- legacy compat
    'in_progress','approved','rejected'
  ));

ALTER TABLE public.gdpr_requests DROP CONSTRAINT IF EXISTS gdpr_requests_decision_check;
ALTER TABLE public.gdpr_requests ADD CONSTRAINT gdpr_requests_decision_check
  CHECK (decision IS NULL OR decision IN (
    'pending','fulfil','fulfil_in_part','refuse','withdrawn'
  ));

-- =========================================================================
-- 3. EXTENSION NOTIFICATION SEPARATION
-- =========================================================================
ALTER TABLE public.gdpr_requests
  ADD COLUMN IF NOT EXISTS extension_notification_channel text,
  ADD COLUMN IF NOT EXISTS extension_notification_note text;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='gdpr_requests_ext_channel_check') THEN
    ALTER TABLE public.gdpr_requests ADD CONSTRAINT gdpr_requests_ext_channel_check
      CHECK (extension_notification_channel IS NULL OR extension_notification_channel IN
        ('portal','secure_email','post','telephone_confirmed','other'));
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.rr_apply_extension(_request_id uuid, _reason text, _months integer DEFAULT 2)
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE base TIMESTAMPTZ;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _months < 1 OR _months > 2 THEN RAISE EXCEPTION 'Extension must be 1 or 2 months'; END IF;
  IF _reason IS NULL OR length(trim(_reason))=0 THEN RAISE EXCEPTION 'Reason required'; END IF;
  SELECT COALESCE(due_at, clock_start_at, received_at, created_at) INTO base
    FROM public.gdpr_requests WHERE id=_request_id;
  IF base IS NULL THEN RAISE EXCEPTION 'Request not found'; END IF;
  UPDATE public.gdpr_requests
    SET extension_applied = true,
        extension_reason = _reason,
        extended_due_at = base + (_months || ' months')::interval
    WHERE id = _request_id;
  PERFORM public.rr_add_event(_request_id, 'extension_applied',
    jsonb_build_object('reason',_reason,'months',_months,'admin',auth.uid(),'at',now()));
END $$;

CREATE OR REPLACE FUNCTION public.rr_record_extension_notification(
  _request_id uuid, _notified_at timestamptz, _channel text, _note text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE r record;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _notified_at IS NULL THEN RAISE EXCEPTION 'Notification date required'; END IF;
  IF _channel NOT IN ('portal','secure_email','post','telephone_confirmed','other') THEN
    RAISE EXCEPTION 'Invalid channel';
  END IF;
  SELECT extension_applied INTO r FROM public.gdpr_requests WHERE id=_request_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Request not found'; END IF;
  IF NOT r.extension_applied THEN RAISE EXCEPTION 'No extension has been applied to this request'; END IF;
  UPDATE public.gdpr_requests
    SET extension_notified_at = _notified_at,
        extension_notification_channel = _channel,
        extension_notification_note = _note
    WHERE id = _request_id;
  PERFORM public.rr_add_event(_request_id, 'extension_notification_recorded',
    jsonb_build_object('at',_notified_at,'channel',_channel,'note',_note,'admin',auth.uid()));
END $$;

-- =========================================================================
-- 4. AUTO-CLOCK FOR SIGNED-IN REQUESTS
-- =========================================================================
CREATE OR REPLACE FUNCTION public.submit_rights_request(
  _request_type text, _request_description text, _requester_contact text,
  _requester_name text, _representative_name text DEFAULT NULL::text, _channel text DEFAULT 'website'::text
) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_id UUID; v_ref TEXT; v_uid UUID := auth.uid();
  v_now TIMESTAMPTZ := now(); v_identity TEXT; v_clock TIMESTAMPTZ; v_due TIMESTAMPTZ;
BEGIN
  IF _request_description IS NULL OR length(trim(_request_description)) < 5 THEN
    RAISE EXCEPTION 'Please describe your request.';
  END IF;
  IF _requester_contact IS NULL OR length(trim(_requester_contact)) < 3 THEN
    RAISE EXCEPTION 'Contact information is required.';
  END IF;

  v_ref := public.generate_gdpr_reference();
  v_identity := CASE WHEN v_uid IS NOT NULL THEN 'not_required' ELSE 'not_started' END;
  IF v_uid IS NOT NULL THEN
    v_clock := v_now;
    v_due := v_now + interval '1 month';
  END IF;

  INSERT INTO public.gdpr_requests(
    user_id, email, request_type, request_details, status,
    reference_number, requester_name, requester_contact,
    representative_name, channel, received_at, identity_status,
    clock_start_at, due_at
  ) VALUES (
    v_uid, _requester_contact, _request_type, _request_description,
    CASE WHEN v_uid IS NOT NULL THEN 'received' ELSE 'pending' END,
    v_ref, COALESCE(_requester_name,''), _requester_contact,
    _representative_name, _channel, v_now, v_identity,
    v_clock, v_due
  ) RETURNING id INTO v_id;

  INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (v_id, v_uid, CASE WHEN v_uid IS NULL THEN 'anonymous' ELSE 'user' END,
          'received', jsonb_build_object('channel', _channel, 'request_type', _request_type));

  IF v_uid IS NOT NULL THEN
    INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
    VALUES (v_id, v_uid, 'system', 'clock_started_automatically',
            jsonb_build_object('at', v_clock, 'due_at', v_due, 'basis', 'signed_in_identity_not_required'));
  END IF;

  RETURN v_ref;
END $$;

-- =========================================================================
-- 5. OPERATIONAL RETENTION-REVIEW RPCs
-- =========================================================================

-- Hold check helper — returns hold reference of any active hold that would block deletion
CREATE OR REPLACE FUNCTION public.retention_review_blocking_hold(_review_id uuid)
 RETURNS TABLE(hold_id uuid, hold_reference text)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE r record;
BEGIN
  SELECT * INTO r FROM public.privacy_retention_reviews WHERE id=_review_id;
  IF NOT FOUND THEN RETURN; END IF;

  RETURN QUERY
    SELECT h.id, h.hold_reference FROM public.privacy_retention_holds h
    WHERE h.status='active' AND (
      (r.hold_id IS NOT NULL AND h.id = r.hold_id)
      OR (r.subject_user_id IS NOT NULL AND h.scope_type IN ('user','individual') AND h.scope_ref_id = r.subject_user_id)
      OR (r.related_project_id IS NOT NULL AND h.scope_type='project' AND h.scope_ref_id = r.related_project_id)
      OR (r.related_donation_id IS NOT NULL AND h.scope_type='donation' AND h.scope_ref_id = r.related_donation_id)
      OR (r.record_type IS NOT NULL AND h.scope_type='data_category' AND h.data_category = r.record_type)
    )
    LIMIT 1;
END $$;

CREATE OR REPLACE FUNCTION public.rr_review_create(
  _retention_rule_id uuid, _record_type text, _record_id uuid, _record_summary text,
  _subject_user_id uuid, _related_project_id uuid, _related_donation_id uuid,
  _review_due_at timestamptz, _sensitivity text, _proposed_action text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE v_id uuid; v_ref text; v_existing uuid;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;

  -- Idempotency: if same (rule, record_type, record_id, review_due date) exists and is not completed, return it
  IF _record_id IS NOT NULL THEN
    SELECT id INTO v_existing FROM public.privacy_retention_reviews
      WHERE retention_rule_id = _retention_rule_id
        AND record_type = _record_type
        AND record_id = _record_id
        AND status IN ('due','in_review','defer')
      LIMIT 1;
    IF v_existing IS NOT NULL THEN RETURN v_existing; END IF;
  END IF;

  v_ref := public.generate_review_reference();
  INSERT INTO public.privacy_retention_reviews(
    review_reference, retention_rule_id, record_type, record_id, record_summary,
    subject_user_id, related_project_id, related_donation_id,
    review_due_at, sensitivity, proposed_action, status
  ) VALUES (
    v_ref, _retention_rule_id, _record_type, _record_id, _record_summary,
    _subject_user_id, _related_project_id, _related_donation_id,
    _review_due_at, COALESCE(_sensitivity,'routine'), _proposed_action, 'due'
  ) RETURNING id INTO v_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'retention_review_created', 'insert', 'privacy_retention_reviews', v_id,
          jsonb_build_object('reference', v_ref, 'rule_id', _retention_rule_id));
  RETURN v_id;
END $$;

CREATE OR REPLACE FUNCTION public.rr_review_decide(
  _review_id uuid, _decision text, _decision_reason text, _deferred_until timestamptz DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE r record; new_status text; blocking record;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _decision_reason IS NULL OR length(trim(_decision_reason))=0 THEN
    RAISE EXCEPTION 'Decision reason required';
  END IF;
  SELECT * INTO r FROM public.privacy_retention_reviews WHERE id=_review_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Review not found'; END IF;

  new_status := CASE _decision
    WHEN 'begin_review' THEN 'in_review'
    WHEN 'retain' THEN 'retain'
    WHEN 'defer' THEN 'defer'
    WHEN 'anonymise_approved' THEN 'anonymise_approved'
    WHEN 'delete_approved' THEN 'delete_approved'
    WHEN 'excluded' THEN 'excluded'
    WHEN 'completed' THEN 'completed'
    ELSE NULL END;
  IF new_status IS NULL THEN RAISE EXCEPTION 'Invalid decision'; END IF;

  IF _decision IN ('anonymise_approved','delete_approved') THEN
    SELECT * INTO blocking FROM public.retention_review_blocking_hold(_review_id);
    IF blocking.hold_id IS NOT NULL THEN
      INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
      VALUES (auth.uid(), 'retention_review_hold_prevented_action', 'update',
              'privacy_retention_reviews', _review_id,
              jsonb_build_object('decision', _decision, 'hold_reference', blocking.hold_reference));
      RAISE EXCEPTION 'Blocked by active retention hold (%)', blocking.hold_reference;
    END IF;
  END IF;

  IF _decision='defer' AND _deferred_until IS NULL THEN
    RAISE EXCEPTION 'Deferral requires a new review date';
  END IF;

  UPDATE public.privacy_retention_reviews SET
    status = new_status,
    decision = _decision,
    decision_reason = _decision_reason,
    reviewed_by = auth.uid(),
    reviewed_at = now(),
    deferred_until = _deferred_until,
    completed_at = CASE WHEN _decision IN ('completed','retain','anonymise_approved','delete_approved','excluded')
                        THEN now() ELSE completed_at END
  WHERE id = _review_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'retention_review_decision_' || _decision, 'update',
          'privacy_retention_reviews', _review_id,
          jsonb_build_object('decision', _decision, 'reason', _decision_reason,
                             'deferred_until', _deferred_until));
END $$;

-- Generate due candidates: only mapped categories. Idempotent (relies on rr_review_create dedup).
CREATE OR REPLACE FUNCTION public.rr_generate_due_review_candidates()
 RETURNS TABLE(rule_code text, candidates_created integer, unmapped boolean)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE rec record; created int;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;

  -- R-CONTACT: inbound_contacts closed 3 years ago
  created := 0;
  FOR rec IN
    SELECT ic.id, ic.name, ic.updated_at
    FROM public.inbound_contacts ic
    WHERE ic.status IN ('closed','resolved','archived')
      AND ic.updated_at < now() - interval '3 years'
      AND NOT EXISTS (SELECT 1 FROM public.privacy_retention_reviews rv
                      WHERE rv.record_type='inbound_contact' AND rv.record_id=ic.id
                        AND rv.status IN ('due','in_review','defer'))
  LOOP
    PERFORM public.rr_review_create(
      (SELECT id FROM public.privacy_retention_rules WHERE rule_code='R-CONTACT'),
      'inbound_contact', rec.id,
      'Contact enquiry from ' || COALESCE(rec.name,'—'),
      NULL, NULL, NULL, now(), 'routine', 'review');
    created := created + 1;
  END LOOP;
  RETURN QUERY SELECT 'R-CONTACT'::text, created, false;

  -- R-DPR: gdpr_requests completed 3 years ago
  created := 0;
  FOR rec IN
    SELECT g.id, g.reference_number, g.completed_at
    FROM public.gdpr_requests g
    WHERE g.status IN ('completed','refused','refused_in_part','withdrawn')
      AND g.completed_at IS NOT NULL
      AND g.completed_at < now() - interval '3 years'
      AND NOT EXISTS (SELECT 1 FROM public.privacy_retention_reviews rv
                      WHERE rv.record_type='gdpr_request' AND rv.record_id=g.id
                        AND rv.status IN ('due','in_review','defer'))
  LOOP
    PERFORM public.rr_review_create(
      (SELECT id FROM public.privacy_retention_rules WHERE rule_code='R-DPR'),
      'gdpr_request', rec.id,
      'DPR ' || COALESCE(rec.reference_number, rec.id::text),
      NULL, NULL, NULL, now(), 'confidential', 'review');
    created := created + 1;
  END LOOP;
  RETURN QUERY SELECT 'R-DPR'::text, created, false;

  -- Report unmapped categories (case-specific / permanent / need mapping)
  RETURN QUERY
    SELECT r.rule_code, 0::int, true
    FROM public.privacy_retention_rules r
    WHERE r.rule_code NOT IN ('R-CONTACT','R-DPR');
END $$;

GRANT EXECUTE ON FUNCTION public.rr_record_extension_notification(uuid, timestamptz, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_review_create(uuid, text, uuid, text, uuid, uuid, uuid, timestamptz, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_review_decide(uuid, text, text, timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rr_generate_due_review_candidates() TO authenticated;
GRANT EXECUTE ON FUNCTION public.retention_review_blocking_hold(uuid) TO authenticated;
