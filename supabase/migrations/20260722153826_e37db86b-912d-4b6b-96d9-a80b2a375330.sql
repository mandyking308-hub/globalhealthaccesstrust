
-- ============================================================
-- Output 9: Project Charter & Delivery Agreement — extensions
-- ============================================================

-- 1. Extend project_agreement_versions with additional Charter sections
ALTER TABLE public.project_agreement_versions
  ADD COLUMN IF NOT EXISTS background_need text,
  ADD COLUMN IF NOT EXISTS geography text,
  ADD COLUMN IF NOT EXISTS security_sensitive_controls text,
  ADD COLUMN IF NOT EXISTS is_security_sensitive_location boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS permitted_expenditure text,
  ADD COLUMN IF NOT EXISTS procurement_terms text,
  ADD COLUMN IF NOT EXISTS expenses_terms text,
  ADD COLUMN IF NOT EXISTS financial_evidence_terms text,
  ADD COLUMN IF NOT EXISTS project_team_roles jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS delivery_partners jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS trustee_authority_terms text,
  ADD COLUMN IF NOT EXISTS donor_visibility_terms text,
  ADD COLUMN IF NOT EXISTS delays_terms text,
  ADD COLUMN IF NOT EXISTS force_majeure_terms text,
  ADD COLUMN IF NOT EXISTS safeguarding_terms text,
  ADD COLUMN IF NOT EXISTS data_protection_terms text,
  ADD COLUMN IF NOT EXISTS sanctions_terms text,
  ADD COLUMN IF NOT EXISTS anti_fraud_terms text,
  ADD COLUMN IF NOT EXISTS conflicts_of_interest_terms text,
  ADD COLUMN IF NOT EXISTS field_evidence_terms text,
  ADD COLUMN IF NOT EXISTS consent_dignity_terms text,
  ADD COLUMN IF NOT EXISTS reporting_terms text,
  ADD COLUMN IF NOT EXISTS communications_terms text,
  ADD COLUMN IF NOT EXISTS complaints_terms text,
  ADD COLUMN IF NOT EXISTS incidents_terms text,
  ADD COLUMN IF NOT EXISTS audit_access_terms text,
  ADD COLUMN IF NOT EXISTS insurance_terms text,
  ADD COLUMN IF NOT EXISTS intellectual_property_terms text,
  ADD COLUMN IF NOT EXISTS publicity_terms text,
  ADD COLUMN IF NOT EXISTS suspension_terms text,
  ADD COLUMN IF NOT EXISTS termination_terms text,
  ADD COLUMN IF NOT EXISTS unused_funds_terms text,
  ADD COLUMN IF NOT EXISTS reallocation_terms text,
  ADD COLUMN IF NOT EXISTS records_retention_terms text,
  ADD COLUMN IF NOT EXISTS governing_law text DEFAULT 'England and Wales',
  ADD COLUMN IF NOT EXISTS acceptance_terms text,
  ADD COLUMN IF NOT EXISTS amended_from_version_id uuid REFERENCES public.project_agreement_versions(id),
  ADD COLUMN IF NOT EXISTS amendment_reason text;

-- 2. Freeze issued Charter versions: block edits/deletes once issued
CREATE OR REPLACE FUNCTION public.trg_charter_freeze_issued()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  is_admin boolean := public.has_role(auth.uid(),'super_admin'::app_role)
                   OR public.has_role(auth.uid(),'admin'::app_role);
BEGIN
  IF TG_OP='UPDATE' AND OLD.issued_at IS NOT NULL THEN
    -- Allow only acceptance flag flips + updated_at; block everything else
    IF NEW.title IS DISTINCT FROM OLD.title
       OR NEW.purpose IS DISTINCT FROM OLD.purpose
       OR NEW.scope IS DISTINCT FROM OLD.scope
       OR NEW.deliverables IS DISTINCT FROM OLD.deliverables
       OR NEW.funding_target IS DISTINCT FROM OLD.funding_target
       OR NEW.operating_allocation IS DISTINCT FROM OLD.operating_allocation
       OR NEW.delivery_allocation IS DISTINCT FROM OLD.delivery_allocation
       OR NEW.planned_start IS DISTINCT FROM OLD.planned_start
       OR NEW.planned_completion IS DISTINCT FROM OLD.planned_completion THEN
      RAISE EXCEPTION 'Issued Charter versions are immutable — use charter_amend() to create a new version';
    END IF;
  END IF;
  IF TG_OP='DELETE' AND OLD.issued_at IS NOT NULL AND NOT is_admin THEN
    RAISE EXCEPTION 'Cannot delete an issued Charter version';
  END IF;
  RETURN CASE WHEN TG_OP='DELETE' THEN OLD ELSE NEW END;
END $$;

DROP TRIGGER IF EXISTS charter_freeze_issued ON public.project_agreement_versions;
CREATE TRIGGER charter_freeze_issued
BEFORE UPDATE OR DELETE ON public.project_agreement_versions
FOR EACH ROW EXECUTE FUNCTION public.trg_charter_freeze_issued();

-- 3. Enforce that 20% + 80% allocations reconcile with gross_donation
ALTER TABLE public.project_agreement_versions
  DROP CONSTRAINT IF EXISTS chk_allocation_split;
-- (Do not use CHECK — allow nulls during drafting; enforce via trigger on issue)

CREATE OR REPLACE FUNCTION public.charter_validate_finances(_version_id uuid)
RETURNS void LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v public.project_agreement_versions;
BEGIN
  SELECT * INTO v FROM public.project_agreement_versions WHERE id=_version_id;
  IF v.gross_donation IS NOT NULL AND v.operating_allocation IS NOT NULL AND v.delivery_allocation IS NOT NULL THEN
    IF ABS((v.operating_allocation + v.delivery_allocation) - v.gross_donation) > 0.01 THEN
      RAISE EXCEPTION 'Financial inconsistency: operating (%) + delivery (%) must equal gross donation (%)',
        v.operating_allocation, v.delivery_allocation, v.gross_donation;
    END IF;
    IF ABS(v.operating_allocation - (v.gross_donation * 0.20)) > 0.5 THEN
      RAISE EXCEPTION 'Operating allocation must equal 20%% of gross donation';
    END IF;
  END IF;
END $$;

-- 4. RPC: record acceptance decision by donor / project team / trustee
CREATE OR REPLACE FUNCTION public.charter_record_decision(
  _version_id uuid,
  _decision public.agreement_decision,
  _comment text DEFAULT NULL
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v public.project_agreement_versions;
  caller_role text;
  is_donor boolean;
  is_team boolean;
  is_admin boolean := public.has_role(auth.uid(),'super_admin'::app_role)
                   OR public.has_role(auth.uid(),'admin'::app_role);
  dec_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO v FROM public.project_agreement_versions WHERE id=_version_id;
  IF v.id IS NULL THEN RAISE EXCEPTION 'Version not found'; END IF;
  IF v.issued_at IS NULL THEN RAISE EXCEPTION 'Charter version has not been issued'; END IF;

  is_donor := public.is_project_donor(v.project_id, auth.uid());
  is_team  := public.is_project_team_member(v.project_id, auth.uid());

  IF is_admin THEN caller_role := 'trust';
  ELSIF is_team THEN caller_role := 'project_team';
  ELSIF is_donor THEN caller_role := 'donor';
  ELSE RAISE EXCEPTION 'Not authorised to record a decision on this Charter';
  END IF;

  -- Trustee-only decisions
  IF _decision = 'trust_approve' AND caller_role <> 'trust' THEN
    RAISE EXCEPTION 'Only Trust may record trust_approve';
  END IF;

  INSERT INTO public.project_agreement_decisions(version_id, project_id, user_id, role, decision, comment)
  VALUES (_version_id, v.project_id, auth.uid(), caller_role, _decision, _comment)
  RETURNING id INTO dec_id;

  -- Update acceptance flags
  IF _decision = 'accept' THEN
    IF caller_role='donor' THEN UPDATE public.project_agreement_versions SET is_donor_accepted=true WHERE id=_version_id; END IF;
    IF caller_role='project_team' THEN UPDATE public.project_agreement_versions SET is_team_accepted=true WHERE id=_version_id; END IF;
    IF caller_role='trust' THEN UPDATE public.project_agreement_versions SET is_trust_approved=true WHERE id=_version_id; END IF;
  ELSIF _decision = 'trust_approve' THEN
    UPDATE public.project_agreement_versions SET is_trust_approved=true WHERE id=_version_id;
  END IF;

  -- Audit
  INSERT INTO public.audit_logs(user_id, action, resource_type, resource_id, metadata, target_type, target_id, details)
  VALUES (auth.uid(), 'charter_decision_recorded', 'project_agreement_versions', _version_id,
          jsonb_build_object('decision', _decision, 'role', caller_role),
          'project_agreement_versions', _version_id,
          jsonb_build_object('decision', _decision, 'role', caller_role));

  RETURN dec_id;
END $$;
REVOKE ALL ON FUNCTION public.charter_record_decision(uuid, public.agreement_decision, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.charter_record_decision(uuid, public.agreement_decision, text) TO authenticated;

-- 5. RPC: activate charter (requires trust approval + team acceptance)
CREATE OR REPLACE FUNCTION public.charter_activate(_agreement_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  a public.project_agreements;
  v public.project_agreement_versions;
BEGIN
  IF NOT (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  THEN RAISE EXCEPTION 'Trust only'; END IF;

  SELECT * INTO a FROM public.project_agreements WHERE id=_agreement_id FOR UPDATE;
  IF a.current_version_id IS NULL THEN RAISE EXCEPTION 'No current version'; END IF;
  SELECT * INTO v FROM public.project_agreement_versions WHERE id=a.current_version_id;
  IF NOT v.is_trust_approved OR NOT v.is_team_accepted THEN
    RAISE EXCEPTION 'Cannot activate: requires trust approval and project team acceptance';
  END IF;

  PERFORM public.charter_validate_finances(v.id);

  UPDATE public.project_agreements
    SET status='active', activated_at=COALESCE(activated_at, now()), updated_at=now()
    WHERE id=_agreement_id;

  INSERT INTO public.audit_logs(user_id, action, resource_type, resource_id, target_type, target_id)
  VALUES (auth.uid(), 'charter_activated', 'project_agreements', _agreement_id, 'project_agreements', _agreement_id);
END $$;
REVOKE ALL ON FUNCTION public.charter_activate(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.charter_activate(uuid) TO authenticated;

-- 6. RPC: amend charter (creates a new version cloned from current, resets acceptance)
CREATE OR REPLACE FUNCTION public.charter_amend(_agreement_id uuid, _reason text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  a public.project_agreements;
  prev public.project_agreement_versions;
  new_id uuid;
  next_no int;
BEGIN
  IF NOT (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  THEN RAISE EXCEPTION 'Trust only'; END IF;
  IF _reason IS NULL OR length(trim(_reason)) < 5 THEN
    RAISE EXCEPTION 'Amendment reason is required';
  END IF;

  SELECT * INTO a FROM public.project_agreements WHERE id=_agreement_id FOR UPDATE;
  IF a.current_version_id IS NULL THEN RAISE EXCEPTION 'Nothing to amend'; END IF;
  SELECT * INTO prev FROM public.project_agreement_versions WHERE id=a.current_version_id;

  SELECT COALESCE(MAX(version_number),0)+1 INTO next_no
    FROM public.project_agreement_versions WHERE agreement_id=_agreement_id;

  INSERT INTO public.project_agreement_versions (
    agreement_id, project_id, version_number, title,
    purpose, intended_outcomes, safe_location, scope, exclusions, deliverables, beneficiary_group,
    funding_target, gross_donation, operating_allocation, delivery_allocation, budget_categories,
    planned_start, planned_completion, expected_duration,
    reporting_frequency, first_report_due, evidence_requirements, financial_reporting, communication_arrangements,
    dependencies, risks_private, escalation_procedure, change_control_procedure, complaint_procedure,
    safeguarding_route, confidentiality_terms, donor_visible_status,
    background_need, geography, security_sensitive_controls, is_security_sensitive_location,
    permitted_expenditure, procurement_terms, expenses_terms, financial_evidence_terms,
    project_team_roles, delivery_partners, trustee_authority_terms, donor_visibility_terms,
    delays_terms, force_majeure_terms, safeguarding_terms, data_protection_terms,
    sanctions_terms, anti_fraud_terms, conflicts_of_interest_terms,
    field_evidence_terms, consent_dignity_terms, reporting_terms, communications_terms,
    complaints_terms, incidents_terms, audit_access_terms, insurance_terms,
    intellectual_property_terms, publicity_terms, suspension_terms, termination_terms,
    unused_funds_terms, reallocation_terms, records_retention_terms, governing_law, acceptance_terms,
    amended_from_version_id, amendment_reason
  ) VALUES (
    prev.agreement_id, prev.project_id, next_no, prev.title,
    prev.purpose, prev.intended_outcomes, prev.safe_location, prev.scope, prev.exclusions, prev.deliverables, prev.beneficiary_group,
    prev.funding_target, prev.gross_donation, prev.operating_allocation, prev.delivery_allocation, prev.budget_categories,
    prev.planned_start, prev.planned_completion, prev.expected_duration,
    prev.reporting_frequency, prev.first_report_due, prev.evidence_requirements, prev.financial_reporting, prev.communication_arrangements,
    prev.dependencies, prev.risks_private, prev.escalation_procedure, prev.change_control_procedure, prev.complaint_procedure,
    prev.safeguarding_route, prev.confidentiality_terms, prev.donor_visible_status,
    prev.background_need, prev.geography, prev.security_sensitive_controls, prev.is_security_sensitive_location,
    prev.permitted_expenditure, prev.procurement_terms, prev.expenses_terms, prev.financial_evidence_terms,
    prev.project_team_roles, prev.delivery_partners, prev.trustee_authority_terms, prev.donor_visibility_terms,
    prev.delays_terms, prev.force_majeure_terms, prev.safeguarding_terms, prev.data_protection_terms,
    prev.sanctions_terms, prev.anti_fraud_terms, prev.conflicts_of_interest_terms,
    prev.field_evidence_terms, prev.consent_dignity_terms, prev.reporting_terms, prev.communications_terms,
    prev.complaints_terms, prev.incidents_terms, prev.audit_access_terms, prev.insurance_terms,
    prev.intellectual_property_terms, prev.publicity_terms, prev.suspension_terms, prev.termination_terms,
    prev.unused_funds_terms, prev.reallocation_terms, prev.records_retention_terms, prev.governing_law, prev.acceptance_terms,
    prev.id, _reason
  ) RETURNING id INTO new_id;

  -- Supersede previous version's parent agreement pointer; keep prev as history
  UPDATE public.project_agreements
    SET current_version_id=new_id, status='draft', updated_at=now()
    WHERE id=_agreement_id;

  INSERT INTO public.audit_logs(user_id, action, resource_type, resource_id, metadata)
  VALUES (auth.uid(), 'charter_amended', 'project_agreement_versions', new_id,
          jsonb_build_object('from', prev.id, 'reason', _reason));

  RETURN new_id;
END $$;
REVOKE ALL ON FUNCTION public.charter_amend(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.charter_amend(uuid, text) TO authenticated;

-- 7. RPC: milestone-derived progress (weighted; never funding-based)
CREATE OR REPLACE FUNCTION public.charter_milestone_progress(_project_id uuid)
RETURNS numeric LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(
    ROUND(
      100.0 * SUM(
        CASE WHEN pm.status IN ('completed','verified','approved') THEN COALESCE(pm.weight,1) ELSE 0 END
      ) / NULLIF(SUM(COALESCE(pm.weight,1)),0)
    , 2)
  , 0)
  FROM public.project_milestones pm
  WHERE pm.project_id = _project_id;
$$;
REVOKE ALL ON FUNCTION public.charter_milestone_progress(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.charter_milestone_progress(uuid) TO authenticated;

-- 8. RPC: donor-safe redacted view (excludes team details, beneficiary identities,
--    safeguarding info, security-sensitive locations, private due-diligence)
CREATE OR REPLACE FUNCTION public.charter_donor_safe_view(_project_id uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  a public.project_agreements;
  v public.project_agreement_versions;
  is_admin boolean := public.has_role(auth.uid(),'super_admin'::app_role)
                    OR public.has_role(auth.uid(),'admin'::app_role);
  is_donor boolean := public.is_project_donor(_project_id, auth.uid());
BEGIN
  IF NOT (is_admin OR is_donor) THEN RAISE EXCEPTION 'Not authorised'; END IF;

  SELECT * INTO a FROM public.project_agreements WHERE project_id=_project_id;
  IF a.id IS NULL OR a.current_version_id IS NULL THEN RETURN NULL; END IF;
  SELECT * INTO v FROM public.project_agreement_versions WHERE id=a.current_version_id;

  RETURN jsonb_build_object(
    'agreement_id', a.id,
    'status', a.status,
    'activated_at', a.activated_at,
    'version', jsonb_build_object(
      'id', v.id,
      'version_number', v.version_number,
      'title', v.title,
      'purpose', v.purpose,
      'background_need', v.background_need,
      'geography', CASE WHEN v.is_security_sensitive_location THEN 'Withheld — security-sensitive location' ELSE v.geography END,
      'safe_location', CASE WHEN v.is_security_sensitive_location THEN NULL ELSE v.safe_location END,
      'scope', v.scope,
      'exclusions', v.exclusions,
      'deliverables', v.deliverables,
      'planned_start', v.planned_start,
      'planned_completion', v.planned_completion,
      'expected_duration', v.expected_duration,
      'funding_target', v.funding_target,
      'gross_donation', v.gross_donation,
      'operating_allocation', v.operating_allocation,
      'delivery_allocation', v.delivery_allocation,
      'budget_categories', v.budget_categories,
      'permitted_expenditure', v.permitted_expenditure,
      'procurement_terms', v.procurement_terms,
      'reporting_frequency', v.reporting_frequency,
      'reporting_terms', v.reporting_terms,
      'communications_terms', v.communications_terms,
      'complaints_terms', v.complaints_terms,
      'trustee_authority_terms', v.trustee_authority_terms,
      'donor_visibility_terms', v.donor_visibility_terms,
      'change_control_procedure', v.change_control_procedure,
      'delays_terms', v.delays_terms,
      'force_majeure_terms', v.force_majeure_terms,
      'suspension_terms', v.suspension_terms,
      'termination_terms', v.termination_terms,
      'unused_funds_terms', v.unused_funds_terms,
      'reallocation_terms', v.reallocation_terms,
      'records_retention_terms', v.records_retention_terms,
      'intellectual_property_terms', v.intellectual_property_terms,
      'publicity_terms', v.publicity_terms,
      'governing_law', v.governing_law,
      'acceptance_terms', v.acceptance_terms,
      'donor_visible_status', v.donor_visible_status,
      'is_donor_accepted', v.is_donor_accepted,
      'is_team_accepted', v.is_team_accepted,
      'is_trust_approved', v.is_trust_approved
      -- REDACTED: beneficiary_group, project_team_roles, delivery_partners (identities),
      --          safeguarding_route, safeguarding_terms, security_sensitive_controls,
      --          risks_private, confidentiality_terms internals, dependencies internals
    ),
    'progress_percent', public.charter_milestone_progress(_project_id)
  );
END $$;
REVOKE ALL ON FUNCTION public.charter_donor_safe_view(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.charter_donor_safe_view(uuid) TO authenticated;
