
CREATE OR REPLACE FUNCTION public.rr_generate_due_review_candidates()
 RETURNS TABLE(rule_code text, candidates_created integer, unmapped boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
          SELECT ic.id, 'Contact enquiry: ' || COALESCE(ic.nature_of_enquiry, ic.name, ic.email) AS summary
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
END $function$;
