
-- =========================================================
-- HIGH-VALUE DONATION AGREEMENT (HVDA) SYSTEM
-- =========================================================

-- Enums --------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.hvda_status AS ENUM (
    'draft','due_diligence','trustee_review','legal_review_requested',
    'approved_for_signature','signed','active','completed','terminated'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.hvda_designation_reason AS ENUM (
    'amount','donor_profile','restrictions','source_of_funds','complexity',
    'international_features','reputational_risk','payment_schedule','project_dependency'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.hvda_approval_type AS ENUM (
    'due_diligence','trustee_review','legal_review','approved_for_signature'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.hvda_approval_decision AS ENUM (
    'approved','changes_requested','declined','noted'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.hvda_signatory_role AS ENUM ('donor','trust');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.hvda_condition_status AS ENUM ('open','satisfied','waived','failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Authorisation helper ------------------------------------
CREATE OR REPLACE FUNCTION public.can_manage_hvda(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(_user_id) OR public.is_finance_officer(_user_id);
$$;
REVOKE ALL ON FUNCTION public.can_manage_hvda(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_manage_hvda(uuid) TO authenticated;

-- Case shell ---------------------------------------------
CREATE TABLE public.high_value_donation_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE,
  donor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- may be a prospect
  donor_display_name TEXT,
  related_donation_draft_id UUID,
  related_project_id UUID REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  designation_reasons public.hvda_designation_reason[] NOT NULL DEFAULT '{}',
  designation_notes TEXT,
  status public.hvda_status NOT NULL DEFAULT 'draft',
  current_version_id UUID,
  opened_by UUID REFERENCES auth.users(id),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.high_value_donation_agreements TO authenticated;
GRANT ALL ON public.high_value_donation_agreements TO service_role;
ALTER TABLE public.high_value_donation_agreements ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_manage_all ON public.high_value_donation_agreements
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- Versioned template -------------------------------------
CREATE TABLE public.hvda_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  authored_by UUID REFERENCES auth.users(id),
  authored_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 1 Parties
  trust_party_name TEXT,
  donor_party_name TEXT,
  -- 2 Background
  background TEXT,
  -- 3 Charitable purpose
  charitable_purpose TEXT,
  -- 4 Amount + 4a currency
  donation_amount_minor BIGINT,
  currency CHAR(3) DEFAULT 'GBP',
  -- 5 Payment schedule (also structured rows in hvda_payment_schedule)
  payment_schedule_narrative TEXT,
  -- 6 Payment route
  payment_route TEXT,
  -- 7 Conditions precedent (also structured rows)
  conditions_precedent_narrative TEXT,
  -- 8 Donor identity + authority
  donor_identity_details TEXT,        -- sensitive
  donor_authority_details TEXT,       -- sensitive
  -- 9 Beneficial ownership
  beneficial_ownership_details TEXT,  -- sensitive
  -- 10 Source of funds
  source_of_funds_representation TEXT, -- sensitive
  -- 11 Source of wealth (proportionate)
  source_of_wealth_information TEXT,   -- sensitive
  -- 12 Sanctions
  sanctions_representation TEXT,
  -- 13 Anti-fraud
  anti_fraud_representation TEXT,
  -- 14 No unlawful / third-party controlled funds
  no_unlawful_or_third_party_funds TEXT,
  -- 15 Intended project or purpose
  intended_project_or_purpose TEXT,
  -- 16 Restricted / unrestricted
  is_restricted BOOLEAN DEFAULT false,
  restriction_details TEXT,
  -- 17/18 Allocation
  operating_allocation_pct NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  delivery_allocation_pct NUMERIC(5,2) NOT NULL DEFAULT 80.00,
  -- 19 Budget
  project_budget TEXT,
  -- 20 Trustee discretion
  trustee_discretion_clause TEXT,
  -- 21 No donor control
  no_donor_ownership_or_control_clause TEXT,
  -- 22 Project changes
  project_changes_clause TEXT,
  -- 23 Reallocation
  reallocation_clause TEXT,
  -- 24 Reporting
  reporting_clause TEXT,
  -- 25 Approved evidence
  approved_evidence_clause TEXT,
  -- 26 Beneficiary privacy
  beneficiary_privacy_clause TEXT,
  -- 27 Publicity and recognition
  publicity_and_recognition_clause TEXT,
  -- 28 Confidentiality
  confidentiality_clause TEXT,
  -- 29 Data protection
  data_protection_clause TEXT,
  -- 30 Tax and Gift Aid
  tax_and_gift_aid_clause TEXT,
  -- 31 Warranties
  warranties_clause TEXT,
  -- 32 Suspension
  suspension_clause TEXT,
  -- 33 Refusal
  refusal_clause TEXT,
  -- 34 Return of funds
  return_of_funds_clause TEXT,
  -- 35 Refund limitations
  refund_limitations_clause TEXT,
  -- 36 Termination
  termination_clause TEXT,
  -- 37 Force majeure
  force_majeure_clause TEXT,
  -- 38 Notices
  notices_clause TEXT,
  -- 39 No partnership / agency / investment
  no_partnership_agency_clause TEXT,
  -- 40 Entire agreement
  entire_agreement_clause TEXT,
  -- 41 Amendments
  amendments_clause TEXT,
  -- 42 Governing law
  governing_law_clause TEXT,
  -- 43 Signatures (blocks are recorded in hvda_signatures)
  signature_block_notes TEXT,

  -- External legal review (recorded fact, not a claim)
  legal_review_firm TEXT,
  legal_review_reference TEXT,
  legal_review_completed_at TIMESTAMPTZ,
  legal_review_notes TEXT,

  is_locked BOOLEAN NOT NULL DEFAULT false,
  locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (agreement_id, version_number)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_versions TO authenticated;
GRANT ALL ON public.hvda_versions TO service_role;
ALTER TABLE public.hvda_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_versions_manage ON public.hvda_versions
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

ALTER TABLE public.high_value_donation_agreements
  ADD CONSTRAINT hvda_current_version_fk
  FOREIGN KEY (current_version_id) REFERENCES public.hvda_versions(id) ON DELETE SET NULL;

-- Approvals ----------------------------------------------
CREATE TABLE public.hvda_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  approval_type public.hvda_approval_type NOT NULL,
  decision public.hvda_approval_decision NOT NULL,
  decided_by UUID NOT NULL REFERENCES auth.users(id),
  decided_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  comment TEXT,
  supporting_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_approvals TO authenticated;
GRANT ALL ON public.hvda_approvals TO service_role;
ALTER TABLE public.hvda_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_approvals_manage ON public.hvda_approvals
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- Signatures ---------------------------------------------
CREATE TABLE public.hvda_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  signatory_role public.hvda_signatory_role NOT NULL,
  signatory_name TEXT NOT NULL,
  signatory_title TEXT,
  signatory_user_id UUID REFERENCES auth.users(id),
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  method TEXT NOT NULL DEFAULT 'manual', -- manual | wet_ink | e_signature
  evidence_reference TEXT,
  recorded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_signatures TO authenticated;
GRANT ALL ON public.hvda_signatures TO service_role;
ALTER TABLE public.hvda_signatures ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_signatures_manage ON public.hvda_signatures
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- Payment schedule ---------------------------------------
CREATE TABLE public.hvda_payment_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL,
  due_date DATE,
  amount_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'GBP',
  payment_route TEXT,
  status TEXT NOT NULL DEFAULT 'planned', -- planned | received | overdue | cancelled
  received_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_payment_schedule TO authenticated;
GRANT ALL ON public.hvda_payment_schedule TO service_role;
ALTER TABLE public.hvda_payment_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_schedule_manage ON public.hvda_payment_schedule
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- Conditions precedent -----------------------------------
CREATE TABLE public.hvda_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL,
  description TEXT NOT NULL,
  status public.hvda_condition_status NOT NULL DEFAULT 'open',
  evidence_reference TEXT,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_conditions TO authenticated;
GRANT ALL ON public.hvda_conditions TO service_role;
ALTER TABLE public.hvda_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_conditions_manage ON public.hvda_conditions
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- Amendments (link previous → new version) ---------------
CREATE TABLE public.hvda_amendments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id UUID NOT NULL REFERENCES public.high_value_donation_agreements(id) ON DELETE CASCADE,
  previous_version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  new_version_id UUID NOT NULL REFERENCES public.hvda_versions(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  summary_of_changes TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hvda_amendments TO authenticated;
GRANT ALL ON public.hvda_amendments TO service_role;
ALTER TABLE public.hvda_amendments ENABLE ROW LEVEL SECURITY;
CREATE POLICY hvda_amendments_manage ON public.hvda_amendments
  FOR ALL TO authenticated
  USING (public.can_manage_hvda(auth.uid()))
  WITH CHECK (public.can_manage_hvda(auth.uid()));

-- updated_at triggers ------------------------------------
CREATE TRIGGER hvda_touch_shell BEFORE UPDATE ON public.high_value_donation_agreements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER hvda_touch_versions BEFORE UPDATE ON public.hvda_versions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER hvda_touch_schedule BEFORE UPDATE ON public.hvda_payment_schedule
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER hvda_touch_conditions BEFORE UPDATE ON public.hvda_conditions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Reference generator ------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.hvda_reference_seq;

CREATE OR REPLACE FUNCTION public.generate_hvda_reference()
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint;
BEGIN
  n := nextval('public.hvda_reference_seq');
  RETURN 'GHAT-HVDA-' || to_char(now(),'YYYY') || '-' || lpad(n::text, 5, '0');
END $$;
REVOKE ALL ON FUNCTION public.generate_hvda_reference() FROM PUBLIC;

-- ==============================================================
-- RPCs
-- ==============================================================

-- Open an agreement (creates shell + first draft version)
CREATE OR REPLACE FUNCTION public.hvda_open(
  _donor_user_id uuid,
  _donor_display_name text,
  _related_draft_id uuid,
  _related_project_id uuid,
  _reasons public.hvda_designation_reason[],
  _designation_notes text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_ver uuid; v_ref text;
BEGIN
  IF NOT public.can_manage_hvda(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _reasons IS NULL OR array_length(_reasons,1) IS NULL THEN
    RAISE EXCEPTION 'At least one designation reason is required';
  END IF;
  v_ref := public.generate_hvda_reference();
  INSERT INTO public.high_value_donation_agreements(
    reference, donor_user_id, donor_display_name, related_donation_draft_id,
    related_project_id, designation_reasons, designation_notes, opened_by
  ) VALUES (
    v_ref, _donor_user_id, _donor_display_name, _related_draft_id,
    _related_project_id, _reasons, _designation_notes, auth.uid()
  ) RETURNING id INTO v_id;

  INSERT INTO public.hvda_versions(agreement_id, version_number, authored_by)
  VALUES (v_id, 1, auth.uid()) RETURNING id INTO v_ver;

  UPDATE public.high_value_donation_agreements SET current_version_id = v_ver WHERE id = v_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'hvda_opened', 'insert', 'high_value_donation_agreements', v_id,
    jsonb_build_object('reference', v_ref, 'reasons', _reasons));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.hvda_open(uuid,text,uuid,uuid,public.hvda_designation_reason[],text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_open(uuid,text,uuid,uuid,public.hvda_designation_reason[],text) TO authenticated;

-- Set status (with legal guards)
CREATE OR REPLACE FUNCTION public.hvda_set_status(_agreement_id uuid, _new_status public.hvda_status, _note text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE a public.high_value_donation_agreements%ROWTYPE; has_trustee boolean; has_signed boolean;
BEGIN
  IF NOT public.can_manage_hvda(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT * INTO a FROM public.high_value_donation_agreements WHERE id=_agreement_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Agreement not found'; END IF;

  IF _new_status = 'approved_for_signature' THEN
    SELECT EXISTS(SELECT 1 FROM public.hvda_approvals
      WHERE agreement_id=_agreement_id AND version_id=a.current_version_id
        AND approval_type='trustee_review' AND decision='approved') INTO has_trustee;
    IF NOT has_trustee THEN
      RAISE EXCEPTION 'Recorded trustee approval is required before approving for signature';
    END IF;
    -- Lock the current version
    UPDATE public.hvda_versions SET is_locked=true, locked_at=now()
      WHERE id=a.current_version_id;
  END IF;

  IF _new_status = 'signed' THEN
    SELECT
      EXISTS(SELECT 1 FROM public.hvda_signatures WHERE agreement_id=_agreement_id AND version_id=a.current_version_id AND signatory_role='donor')
      AND
      EXISTS(SELECT 1 FROM public.hvda_signatures WHERE agreement_id=_agreement_id AND version_id=a.current_version_id AND signatory_role='trust')
    INTO has_signed;
    IF NOT has_signed THEN
      RAISE EXCEPTION 'Both donor and trust signatures must be recorded before marking as signed';
    END IF;
  END IF;

  UPDATE public.high_value_donation_agreements
    SET status=_new_status,
        closed_at = CASE WHEN _new_status IN ('completed','terminated') THEN now() ELSE closed_at END
    WHERE id=_agreement_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'hvda_status_changed', 'update', 'high_value_donation_agreements', _agreement_id,
    jsonb_build_object('from', a.status, 'to', _new_status, 'note', _note));
END $$;
REVOKE ALL ON FUNCTION public.hvda_set_status(uuid, public.hvda_status, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_set_status(uuid, public.hvda_status, text) TO authenticated;

-- Record an approval
CREATE OR REPLACE FUNCTION public.hvda_record_approval(
  _agreement_id uuid, _approval_type public.hvda_approval_type,
  _decision public.hvda_approval_decision, _comment text, _reference text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE a public.high_value_donation_agreements%ROWTYPE; v_id uuid;
BEGIN
  IF NOT public.can_manage_hvda(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT * INTO a FROM public.high_value_donation_agreements WHERE id=_agreement_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Agreement not found'; END IF;
  IF a.current_version_id IS NULL THEN RAISE EXCEPTION 'No current version'; END IF;

  INSERT INTO public.hvda_approvals(agreement_id, version_id, approval_type, decision, decided_by, comment, supporting_reference)
  VALUES (_agreement_id, a.current_version_id, _approval_type, _decision, auth.uid(), _comment, _reference)
  RETURNING id INTO v_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'hvda_approval_recorded', 'insert', 'hvda_approvals', v_id,
    jsonb_build_object('type', _approval_type, 'decision', _decision));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.hvda_record_approval(uuid, public.hvda_approval_type, public.hvda_approval_decision, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_record_approval(uuid, public.hvda_approval_type, public.hvda_approval_decision, text, text) TO authenticated;

-- Record a signature
CREATE OR REPLACE FUNCTION public.hvda_record_signature(
  _agreement_id uuid, _signatory_role public.hvda_signatory_role,
  _signatory_name text, _signatory_title text, _signatory_user_id uuid,
  _method text, _evidence_reference text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE a public.high_value_donation_agreements%ROWTYPE; v_id uuid;
BEGIN
  IF NOT public.can_manage_hvda(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT * INTO a FROM public.high_value_donation_agreements WHERE id=_agreement_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Agreement not found'; END IF;
  IF a.status NOT IN ('approved_for_signature','signed') THEN
    RAISE EXCEPTION 'Agreement must be approved for signature before signatures can be recorded';
  END IF;

  INSERT INTO public.hvda_signatures(agreement_id, version_id, signatory_role, signatory_name, signatory_title,
    signatory_user_id, method, evidence_reference, recorded_by)
  VALUES (_agreement_id, a.current_version_id, _signatory_role, _signatory_name, _signatory_title,
    _signatory_user_id, COALESCE(_method,'manual'), _evidence_reference, auth.uid())
  RETURNING id INTO v_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'hvda_signature_recorded', 'insert', 'hvda_signatures', v_id,
    jsonb_build_object('role', _signatory_role, 'method', _method));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.hvda_record_signature(uuid, public.hvda_signatory_role, text, text, uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_record_signature(uuid, public.hvda_signatory_role, text, text, uuid, text, text) TO authenticated;

-- Create a new version (amendment) from current
CREATE OR REPLACE FUNCTION public.hvda_create_amendment(
  _agreement_id uuid, _reason text, _summary text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE a public.high_value_donation_agreements%ROWTYPE; v_prev uuid; v_new_no int; v_new uuid;
BEGIN
  IF NOT public.can_manage_hvda(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _reason IS NULL OR length(trim(_reason))=0 THEN RAISE EXCEPTION 'Amendment reason required'; END IF;
  IF _summary IS NULL OR length(trim(_summary))=0 THEN RAISE EXCEPTION 'Amendment summary required'; END IF;
  SELECT * INTO a FROM public.high_value_donation_agreements WHERE id=_agreement_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Agreement not found'; END IF;
  v_prev := a.current_version_id;

  SELECT COALESCE(MAX(version_number),0)+1 INTO v_new_no FROM public.hvda_versions WHERE agreement_id=_agreement_id;

  -- clone previous version content
  INSERT INTO public.hvda_versions (
    agreement_id, version_number, authored_by,
    trust_party_name, donor_party_name, background, charitable_purpose,
    donation_amount_minor, currency, payment_schedule_narrative, payment_route,
    conditions_precedent_narrative, donor_identity_details, donor_authority_details,
    beneficial_ownership_details, source_of_funds_representation, source_of_wealth_information,
    sanctions_representation, anti_fraud_representation, no_unlawful_or_third_party_funds,
    intended_project_or_purpose, is_restricted, restriction_details,
    operating_allocation_pct, delivery_allocation_pct, project_budget,
    trustee_discretion_clause, no_donor_ownership_or_control_clause, project_changes_clause,
    reallocation_clause, reporting_clause, approved_evidence_clause, beneficiary_privacy_clause,
    publicity_and_recognition_clause, confidentiality_clause, data_protection_clause,
    tax_and_gift_aid_clause, warranties_clause, suspension_clause, refusal_clause,
    return_of_funds_clause, refund_limitations_clause, termination_clause, force_majeure_clause,
    notices_clause, no_partnership_agency_clause, entire_agreement_clause, amendments_clause,
    governing_law_clause, signature_block_notes,
    legal_review_firm, legal_review_reference, legal_review_completed_at, legal_review_notes
  )
  SELECT
    agreement_id, v_new_no, auth.uid(),
    trust_party_name, donor_party_name, background, charitable_purpose,
    donation_amount_minor, currency, payment_schedule_narrative, payment_route,
    conditions_precedent_narrative, donor_identity_details, donor_authority_details,
    beneficial_ownership_details, source_of_funds_representation, source_of_wealth_information,
    sanctions_representation, anti_fraud_representation, no_unlawful_or_third_party_funds,
    intended_project_or_purpose, is_restricted, restriction_details,
    operating_allocation_pct, delivery_allocation_pct, project_budget,
    trustee_discretion_clause, no_donor_ownership_or_control_clause, project_changes_clause,
    reallocation_clause, reporting_clause, approved_evidence_clause, beneficiary_privacy_clause,
    publicity_and_recognition_clause, confidentiality_clause, data_protection_clause,
    tax_and_gift_aid_clause, warranties_clause, suspension_clause, refusal_clause,
    return_of_funds_clause, refund_limitations_clause, termination_clause, force_majeure_clause,
    notices_clause, no_partnership_agency_clause, entire_agreement_clause, amendments_clause,
    governing_law_clause, signature_block_notes,
    legal_review_firm, legal_review_reference, legal_review_completed_at, legal_review_notes
  FROM public.hvda_versions WHERE id = v_prev
  RETURNING id INTO v_new;

  INSERT INTO public.hvda_amendments(agreement_id, previous_version_id, new_version_id, reason, summary_of_changes, created_by)
  VALUES (_agreement_id, v_prev, v_new, _reason, _summary, auth.uid());

  UPDATE public.high_value_donation_agreements
    SET current_version_id = v_new, status = 'draft'
    WHERE id=_agreement_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'hvda_amendment_created', 'insert', 'hvda_versions', v_new,
    jsonb_build_object('previous_version_id', v_prev, 'reason', _reason));
  RETURN v_new;
END $$;
REVOKE ALL ON FUNCTION public.hvda_create_amendment(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_create_amendment(uuid, text, text) TO authenticated;

-- Donor-safe copy: only after approval, excludes sensitive fields
CREATE OR REPLACE FUNCTION public.hvda_donor_safe_copy(_agreement_id uuid)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE a public.high_value_donation_agreements%ROWTYPE; v public.hvda_versions%ROWTYPE; is_donor boolean;
BEGIN
  SELECT * INTO a FROM public.high_value_donation_agreements WHERE id=_agreement_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Agreement not found'; END IF;

  is_donor := (a.donor_user_id IS NOT NULL AND a.donor_user_id = auth.uid());
  IF NOT (public.can_manage_hvda(auth.uid()) OR is_donor) THEN
    RAISE EXCEPTION 'Not authorised';
  END IF;
  IF a.status NOT IN ('approved_for_signature','signed','active','completed','terminated') THEN
    RAISE EXCEPTION 'Donor copy is only available after approval for signature';
  END IF;

  SELECT * INTO v FROM public.hvda_versions WHERE id = a.current_version_id;

  RETURN jsonb_build_object(
    'reference', a.reference,
    'status', a.status,
    'version_number', v.version_number,
    'parties', jsonb_build_object('trust', v.trust_party_name, 'donor', v.donor_party_name),
    'background', v.background,
    'charitable_purpose', v.charitable_purpose,
    'donation_amount_minor', v.donation_amount_minor,
    'currency', v.currency,
    'payment_schedule', v.payment_schedule_narrative,
    'payment_route', v.payment_route,
    'conditions_precedent', v.conditions_precedent_narrative,
    'sanctions', v.sanctions_representation,
    'anti_fraud', v.anti_fraud_representation,
    'no_unlawful_or_third_party_funds', v.no_unlawful_or_third_party_funds,
    'intended_project_or_purpose', v.intended_project_or_purpose,
    'restricted', v.is_restricted,
    'restriction_details', v.restriction_details,
    'operating_allocation_pct', v.operating_allocation_pct,
    'delivery_allocation_pct', v.delivery_allocation_pct,
    'project_budget', v.project_budget,
    'trustee_discretion', v.trustee_discretion_clause,
    'no_donor_control', v.no_donor_ownership_or_control_clause,
    'project_changes', v.project_changes_clause,
    'reallocation', v.reallocation_clause,
    'reporting', v.reporting_clause,
    'approved_evidence', v.approved_evidence_clause,
    'beneficiary_privacy', v.beneficiary_privacy_clause,
    'publicity_and_recognition', v.publicity_and_recognition_clause,
    'confidentiality', v.confidentiality_clause,
    'data_protection', v.data_protection_clause,
    'tax_and_gift_aid', v.tax_and_gift_aid_clause,
    'warranties', v.warranties_clause,
    'suspension', v.suspension_clause,
    'refusal', v.refusal_clause,
    'return_of_funds', v.return_of_funds_clause,
    'refund_limitations', v.refund_limitations_clause,
    'termination', v.termination_clause,
    'force_majeure', v.force_majeure_clause,
    'notices', v.notices_clause,
    'no_partnership_agency', v.no_partnership_agency_clause,
    'entire_agreement', v.entire_agreement_clause,
    'amendments', v.amendments_clause,
    'governing_law', v.governing_law_clause,
    'signatures', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'role', s.signatory_role,'name', s.signatory_name,'title', s.signatory_title,
        'signed_at', s.signed_at,'method', s.method)), '[]'::jsonb)
      FROM public.hvda_signatures s
      WHERE s.agreement_id=_agreement_id AND s.version_id=a.current_version_id
    )
    -- Deliberately excluded: donor_identity_details, donor_authority_details,
    -- beneficial_ownership_details, source_of_funds_representation, source_of_wealth_information,
    -- legal_review_* internal fields, approvals audit trail.
  );
END $$;
REVOKE ALL ON FUNCTION public.hvda_donor_safe_copy(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.hvda_donor_safe_copy(uuid) TO authenticated;
