
-- 1) Restrict internal helper SECURITY DEFINER functions so anon/authenticated
--    cannot execute them from the Data API. They are only used inside RLS
--    policies, triggers, and other SECURITY DEFINER RPCs, which run as the
--    function owner and do not require EXECUTE on the caller role.
DO $$
DECLARE
  r record;
  internal_names text[] := ARRAY[
    'has_role','is_admin','is_super_admin',
    'is_complaints_officer','is_concerns_officer','is_finance_officer',
    'is_incident_officer','is_safeguarding_officer',
    'is_project_donor','is_project_team_member',
    'can_access_project','can_manage_donor_dd','can_manage_gift_proposals','can_manage_hvda',
    'current_legal_version','needs_legal_reacceptance','legal_entity_is_verified',
    'compute_project_health','compute_service_sla','donation_calculate_allocation',
    'project_delivery_progress','donor_can_view_volunteer',
    'privacy_audit_row','log_governance_change','retention_review_blocking_hold',
    'handle_new_user',
    'trg_aa_immutable','trg_charter_freeze_issued','trg_eal_immutable',
    'trg_pfe_donor_visibility_guard','trg_vpa_supersede_acceptance'
  ];
BEGIN
  FOR r IN
    SELECT p.oid, p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.prosecdef
      AND p.proname = ANY(internal_names)
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION public.%I(%s) FROM PUBLIC, anon, authenticated',
                   r.proname, r.args);
  END LOOP;
END $$;

-- 2) Storage policy: restrict inserts on the project-team-applications bucket
--    to the applicant's own folder (first path segment must equal auth.uid()).
DROP POLICY IF EXISTS "pta authed insert" ON storage.objects;
CREATE POLICY "pta owner insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-team-applications'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);
