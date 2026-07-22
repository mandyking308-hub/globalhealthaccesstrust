
-- 1. Fix search_path on trg_dpa_touch
ALTER FUNCTION public.trg_dpa_touch() SET search_path = public;

-- 2. Revoke EXECUTE from PUBLIC and anon on all SECURITY DEFINER functions in public schema.
--    Then grant to authenticated for user-callable ones, and grant to anon for the
--    explicit anonymous-intake whitelist.
DO $$
DECLARE
  r record;
  anon_whitelist text[] := ARRAY[
    'apply_unsubscribe_token',
    'complaint_submit',
    'concern_submit',
    'safeguarding_report',
    'submit_rights_request',
    'current_legal_version',
    'record_legal_event'
  ];
  trigger_only text[] := ARRAY[
    'handle_new_user','log_governance_change','privacy_audit_row',
    'trg_aa_immutable','trg_charter_freeze_issued','trg_eal_immutable',
    'trg_pfe_donor_visibility_guard','trg_vpa_supersede_acceptance','trg_dpa_touch'
  ];
  sig text;
BEGIN
  FOR r IN
    SELECT p.oid,
           p.proname,
           pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.prosecdef = true
  LOOP
    sig := format('public.%I(%s)', r.proname, r.args);
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC', sig);
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM anon', sig);
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM authenticated', sig);
    -- service_role always keeps access
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', sig);
    IF NOT (r.proname = ANY(trigger_only)) THEN
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', sig);
    END IF;
    IF r.proname = ANY(anon_whitelist) THEN
      EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO anon', sig);
    END IF;
  END LOOP;
END $$;

-- 3. Replace always-true INSERT policies with tighter WITH CHECK
DROP POLICY IF EXISTS "consent insert any" ON public.cookie_consent_events;
CREATE POLICY "consent insert self or anon"
  ON public.cookie_consent_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can submit enquiry" ON public.inbound_contacts;
CREATE POLICY "Public can submit enquiry with consent"
  ON public.inbound_contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    gdpr_consent = true
    AND length(coalesce(name, '')) BETWEEN 1 AND 200
    AND length(coalesce(email, '')) BETWEEN 3 AND 320
    AND length(coalesce(message, '')) BETWEEN 1 AND 5000
    AND status = 'New'
  );

DROP POLICY IF EXISTS "Anyone can create volunteer application" ON public.volunteers;
CREATE POLICY "Public can submit volunteer application"
  ON public.volunteers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND (user_id IS NULL OR user_id = auth.uid())
    AND length(coalesce(name,'')) BETWEEN 1 AND 200
    AND length(coalesce(email,'')) BETWEEN 3 AND 320
  );

-- 4. Lock down email_unsubscribe_public_tokens: remove public SELECT policy.
--    Callers must use the SECURITY DEFINER RPC apply_unsubscribe_token(token).
DROP POLICY IF EXISTS "unsub tokens public read by token" ON public.email_unsubscribe_public_tokens;
-- Revoke direct table privileges from anon/authenticated; only service_role and the RPC can read.
REVOKE ALL ON public.email_unsubscribe_public_tokens FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.email_unsubscribe_public_tokens TO service_role;

-- 5. Fix volunteer_project_assignments donor visibility.
--    Drop the donor SELECT policy that leaked the responsibilities column;
--    donors already fetch team data via the redacting RPC donor_project_team().
DROP POLICY IF EXISTS "Donors view own project team" ON public.volunteer_project_assignments;
