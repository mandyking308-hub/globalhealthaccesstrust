
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Extend project_field_evidence
ALTER TABLE public.project_field_evidence
  ADD COLUMN IF NOT EXISTS donor_derivative_path text,
  ADD COLUMN IF NOT EXISTS exif_scrubbed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS redaction_notes text,
  ADD COLUMN IF NOT EXISTS retention_review_at date,
  ADD COLUMN IF NOT EXISTS retention_status text NOT NULL DEFAULT 'active';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='pfe_retention_status_check') THEN
    ALTER TABLE public.project_field_evidence
      ADD CONSTRAINT pfe_retention_status_check
      CHECK (retention_status IN ('active','retention_review_due','retained_on_hold','archived','deleted'));
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.trg_pfe_donor_visibility_guard()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.donor_visible = true THEN
    IF NEW.review_status <> 'approved' THEN
      RAISE EXCEPTION 'Evidence must be approved by Trust before donor viewing';
    END IF;
    IF NEW.donor_derivative_path IS NULL OR NEW.exif_scrubbed = false THEN
      RAISE EXCEPTION 'Donor-viewable evidence requires a scrubbed derivative (EXIF/GPS removed)';
    END IF;
    IF NEW.withdrawn_at IS NOT NULL THEN
      RAISE EXCEPTION 'Withdrawn evidence cannot be donor visible';
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS pfe_donor_visibility_guard ON public.project_field_evidence;
CREATE TRIGGER pfe_donor_visibility_guard
BEFORE INSERT OR UPDATE ON public.project_field_evidence
FOR EACH ROW EXECUTE FUNCTION public.trg_pfe_donor_visibility_guard();

-- 2. Assignment acceptances
CREATE TABLE IF NOT EXISTS public.assignment_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.volunteer_project_assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  snapshot_hash text NOT NULL,
  ip_hash text,
  user_agent text,
  superseded_at timestamptz,
  supersede_reason text,
  accepted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, user_id, snapshot_hash)
);
GRANT SELECT, INSERT ON public.assignment_acceptances TO authenticated;
GRANT ALL ON public.assignment_acceptances TO service_role;
ALTER TABLE public.assignment_acceptances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "aa_admin_all" ON public.assignment_acceptances FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "aa_self_read" ON public.assignment_acceptances FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "aa_self_insert" ON public.assignment_acceptances FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.trg_aa_immutable()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP='UPDATE' THEN
    IF NEW.assignment_id<>OLD.assignment_id OR NEW.user_id<>OLD.user_id
       OR NEW.snapshot::text<>OLD.snapshot::text OR NEW.snapshot_hash<>OLD.snapshot_hash
       OR NEW.accepted_at<>OLD.accepted_at THEN
      RAISE EXCEPTION 'assignment_acceptances snapshot is immutable';
    END IF;
    RETURN NEW;
  END IF;
  IF TG_OP='DELETE' AND NOT public.has_role(auth.uid(),'super_admin'::app_role) THEN
    RAISE EXCEPTION 'assignment_acceptances cannot be deleted';
  END IF;
  RETURN OLD;
END $$;
DROP TRIGGER IF EXISTS aa_immutable ON public.assignment_acceptances;
CREATE TRIGGER aa_immutable BEFORE UPDATE OR DELETE ON public.assignment_acceptances
  FOR EACH ROW EXECUTE FUNCTION public.trg_aa_immutable();

CREATE OR REPLACE FUNCTION public.trg_vpa_supersede_acceptance()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.assigned_role IS DISTINCT FROM OLD.assigned_role
     OR NEW.responsibilities IS DISTINCT FROM OLD.responsibilities
     OR NEW.start_date IS DISTINCT FROM OLD.start_date
     OR NEW.end_date IS DISTINCT FROM OLD.end_date THEN
    UPDATE public.assignment_acceptances
      SET superseded_at = now(), supersede_reason = 'Assignment terms changed'
      WHERE assignment_id = NEW.id AND superseded_at IS NULL;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS vpa_supersede_acceptance ON public.volunteer_project_assignments;
CREATE TRIGGER vpa_supersede_acceptance AFTER UPDATE ON public.volunteer_project_assignments
  FOR EACH ROW EXECUTE FUNCTION public.trg_vpa_supersede_acceptance();

-- 3. Delivery Partner Agreements
CREATE TABLE IF NOT EXISTS public.delivery_partner_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  partner_legal_name text NOT NULL,
  partner_registration_ref text,
  partner_jurisdiction text,
  authorised_signatory_name text,
  authorised_signatory_title text,
  scope_of_engagement text,
  due_diligence_summary text,
  due_diligence_reviewed_at timestamptz,
  finance_terms text,
  procurement_terms text,
  safeguarding_terms text,
  sanctions_terms text,
  data_processing_terms text,
  evidence_terms text,
  reporting_terms text,
  audit_terms text,
  subcontracting_terms text,
  insurance_terms text,
  incidents_terms text,
  termination_terms text,
  unused_funds_terms text,
  status text NOT NULL DEFAULT 'draft',
  version_number int NOT NULL DEFAULT 1,
  signed_at timestamptz,
  signed_by uuid REFERENCES auth.users(id),
  amendment_reason text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dpa_status_check CHECK (status IN
    ('draft','due_diligence','under_review','issued','signed','active','suspended','terminated','superseded'))
);
GRANT SELECT, INSERT, UPDATE ON public.delivery_partner_agreements TO authenticated;
GRANT ALL ON public.delivery_partner_agreements TO service_role;
ALTER TABLE public.delivery_partner_agreements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dpa_admin_all" ON public.delivery_partner_agreements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role));

CREATE OR REPLACE FUNCTION public.trg_dpa_touch() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END $$;
DROP TRIGGER IF EXISTS dpa_touch_updated ON public.delivery_partner_agreements;
CREATE TRIGGER dpa_touch_updated BEFORE UPDATE ON public.delivery_partner_agreements
  FOR EACH ROW EXECUTE FUNCTION public.trg_dpa_touch();

-- 4. Evidence access log (immutable)
CREATE TABLE IF NOT EXISTS public.evidence_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id uuid NOT NULL REFERENCES public.project_field_evidence(id) ON DELETE CASCADE,
  accessed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  accessed_role text NOT NULL,
  action text NOT NULL,
  variant text NOT NULL DEFAULT 'donor_derivative',
  token_expires_at timestamptz,
  ip_hash text,
  user_agent text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT eal_action_check CHECK (action IN ('view','download','signed_url_issued','withdrawal','approval','redaction'))
);
GRANT SELECT, INSERT ON public.evidence_access_log TO authenticated;
GRANT ALL ON public.evidence_access_log TO service_role;
ALTER TABLE public.evidence_access_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "eal_admin_read" ON public.evidence_access_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "eal_self_read" ON public.evidence_access_log FOR SELECT TO authenticated
  USING (accessed_by = auth.uid());
CREATE POLICY "eal_admin_insert" ON public.evidence_access_log FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role));

CREATE OR REPLACE FUNCTION public.trg_eal_immutable()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP='UPDATE' THEN RAISE EXCEPTION 'evidence_access_log is immutable'; END IF;
  IF TG_OP='DELETE' AND NOT public.has_role(auth.uid(),'super_admin'::app_role) THEN
    RAISE EXCEPTION 'evidence_access_log cannot be deleted';
  END IF;
  RETURN CASE WHEN TG_OP='DELETE' THEN OLD ELSE NEW END;
END $$;
DROP TRIGGER IF EXISTS eal_immutable ON public.evidence_access_log;
CREATE TRIGGER eal_immutable BEFORE UPDATE OR DELETE ON public.evidence_access_log
  FOR EACH ROW EXECUTE FUNCTION public.trg_eal_immutable();

-- 5. RPC: accept current Project Team Terms
CREATE OR REPLACE FUNCTION public.pt_accept_terms()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d public.legal_documents; v public.legal_document_versions; acc_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO d FROM public.legal_documents WHERE slug='project-team-terms';
  IF d.id IS NULL THEN RAISE EXCEPTION 'Project Team Terms not found'; END IF;
  SELECT * INTO v FROM public.legal_document_versions
    WHERE document_id=d.id AND review_status='published' AND published_at IS NOT NULL
    ORDER BY version_number DESC LIMIT 1;
  IF v.id IS NULL THEN RAISE EXCEPTION 'No published version of Project Team Terms'; END IF;
  INSERT INTO public.legal_acceptances(user_id, document_id, version_id, role, acceptance_text_snapshot, event_type)
  VALUES (auth.uid(), d.id, v.id, 'project_team',
          COALESCE(v.acceptance_text, 'I accept the Project Team Terms'), 'acceptance')
  ON CONFLICT (user_id, document_id, version_id, event_type, COALESCE(acceptance_context,'')) DO NOTHING
  RETURNING id INTO acc_id;
  RETURN acc_id;
END $$;
REVOKE ALL ON FUNCTION public.pt_accept_terms() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.pt_accept_terms() TO authenticated;

-- 6. RPC: accept assignment
CREATE OR REPLACE FUNCTION public.assignment_accept(
  _assignment_id uuid,
  _milestones jsonb DEFAULT '[]'::jsonb,
  _reporting_terms text DEFAULT NULL,
  _expense_authority text DEFAULT NULL,
  _safeguarding_terms text DEFAULT NULL,
  _evidence_duties text DEFAULT NULL,
  _escalation_routes text DEFAULT NULL,
  _location text DEFAULT NULL,
  _ip_hash text DEFAULT NULL,
  _user_agent text DEFAULT NULL
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE vpa public.volunteer_project_assignments; vol public.volunteers; snap jsonb; h text; new_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO vpa FROM public.volunteer_project_assignments WHERE id=_assignment_id;
  IF vpa.id IS NULL THEN RAISE EXCEPTION 'Assignment not found'; END IF;
  SELECT * INTO vol FROM public.volunteers WHERE id=vpa.volunteer_id;
  IF vol.user_id <> auth.uid() THEN RAISE EXCEPTION 'Only the assigned team member may accept this assignment'; END IF;
  snap := jsonb_build_object(
    'role', vpa.assigned_role, 'responsibilities', vpa.responsibilities, 'location', _location,
    'start_date', vpa.start_date, 'end_date', vpa.end_date, 'milestones', _milestones,
    'reporting', _reporting_terms, 'expense_authority', _expense_authority,
    'safeguarding', _safeguarding_terms, 'evidence_duties', _evidence_duties,
    'escalation', _escalation_routes
  );
  h := encode(digest(snap::text, 'sha256'), 'hex');
  INSERT INTO public.assignment_acceptances(assignment_id, user_id, project_id, snapshot, snapshot_hash, ip_hash, user_agent)
  VALUES (_assignment_id, auth.uid(), vpa.project_id, snap, h, _ip_hash, _user_agent)
  ON CONFLICT (assignment_id, user_id, snapshot_hash) DO NOTHING
  RETURNING id INTO new_id;
  INSERT INTO public.audit_logs(user_id, action, resource_type, resource_id, metadata)
  VALUES (auth.uid(), 'assignment_accepted', 'volunteer_project_assignments', _assignment_id, jsonb_build_object('snapshot_hash', h));
  RETURN new_id;
END $$;
REVOKE ALL ON FUNCTION public.assignment_accept(uuid,jsonb,text,text,text,text,text,text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assignment_accept(uuid,jsonb,text,text,text,text,text,text,text,text) TO authenticated;

-- 7. RPC: withdraw evidence
CREATE OR REPLACE FUNCTION public.evidence_withdraw(_evidence_id uuid, _reason text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE e public.project_field_evidence;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO e FROM public.project_field_evidence WHERE id=_evidence_id;
  IF e.id IS NULL THEN RAISE EXCEPTION 'Evidence not found'; END IF;
  IF NOT (public.has_role(auth.uid(),'super_admin'::app_role)
       OR public.has_role(auth.uid(),'admin'::app_role)
       OR e.uploaded_by = auth.uid()) THEN
    RAISE EXCEPTION 'Not authorised to withdraw this evidence';
  END IF;
  IF _reason IS NULL OR length(trim(_reason))<3 THEN RAISE EXCEPTION 'Reason required'; END IF;
  UPDATE public.project_field_evidence
    SET withdrawn_at=now(), withdrawal_reason=_reason,
        donor_visible=false, review_status='withdrawn', updated_at=now()
    WHERE id=_evidence_id;
  INSERT INTO public.evidence_access_log(evidence_id, accessed_by, accessed_role, action, metadata)
  VALUES (_evidence_id, auth.uid(),
          CASE WHEN public.has_role(auth.uid(),'admin'::app_role) THEN 'admin' ELSE 'project_team' END,
          'withdrawal', jsonb_build_object('reason', _reason));
END $$;
REVOKE ALL ON FUNCTION public.evidence_withdraw(uuid,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.evidence_withdraw(uuid,text) TO authenticated;

-- 8. RPC: apply redaction
CREATE OR REPLACE FUNCTION public.evidence_apply_redaction(
  _evidence_id uuid, _derivative_path text, _notes text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  THEN RAISE EXCEPTION 'Admin only'; END IF;
  IF _derivative_path IS NULL OR _derivative_path !~ '^field-evidence/' THEN
    RAISE EXCEPTION 'Derivative must live in field-evidence/ (private bucket)';
  END IF;
  UPDATE public.project_field_evidence
    SET donor_derivative_path=_derivative_path, exif_scrubbed=true,
        redaction_notes=_notes, updated_at=now()
    WHERE id=_evidence_id;
  INSERT INTO public.evidence_access_log(evidence_id, accessed_by, accessed_role, action, metadata)
  VALUES (_evidence_id, auth.uid(), 'admin', 'redaction',
          jsonb_build_object('derivative_path', _derivative_path, 'notes', _notes));
END $$;
REVOKE ALL ON FUNCTION public.evidence_apply_redaction(uuid,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.evidence_apply_redaction(uuid,text,text) TO authenticated;

-- 9. RPC: donor signed-URL preparation
CREATE OR REPLACE FUNCTION public.evidence_grant_donor_view(_evidence_id uuid, _ttl_seconds int DEFAULT 900)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  e public.project_field_evidence;
  is_admin boolean := public.has_role(auth.uid(),'super_admin'::app_role)
                    OR public.has_role(auth.uid(),'admin'::app_role);
  is_donor boolean;
  ttl int := GREATEST(60, LEAST(COALESCE(_ttl_seconds, 900), 3600));
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO e FROM public.project_field_evidence WHERE id=_evidence_id;
  IF e.id IS NULL THEN RAISE EXCEPTION 'Evidence not found'; END IF;
  is_donor := public.is_project_donor(e.project_id, auth.uid());
  IF NOT (is_admin OR is_donor) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF NOT is_admin THEN
    IF NOT e.donor_visible OR e.review_status <> 'approved' OR e.withdrawn_at IS NOT NULL THEN
      RAISE EXCEPTION 'Evidence is not approved for donor viewing';
    END IF;
    IF e.donor_derivative_path IS NULL OR NOT e.exif_scrubbed THEN
      RAISE EXCEPTION 'Donor derivative not prepared';
    END IF;
  END IF;
  INSERT INTO public.evidence_access_log(evidence_id, accessed_by, accessed_role, action, variant, token_expires_at)
  VALUES (_evidence_id, auth.uid(),
          CASE WHEN is_admin THEN 'admin' ELSE 'donor' END,
          'signed_url_issued',
          CASE WHEN is_admin THEN 'admin_original' ELSE 'donor_derivative' END,
          now() + make_interval(secs => ttl));
  RETURN jsonb_build_object(
    'bucket', 'field-evidence',
    'path', CASE WHEN is_admin THEN e.storage_path ELSE regexp_replace(e.donor_derivative_path, '^field-evidence/', '') END,
    'ttl_seconds', ttl,
    'variant', CASE WHEN is_admin THEN 'admin_original' ELSE 'donor_derivative' END,
    'caption', e.caption,
    'approved_general_location', e.approved_general_location,
    'reviewed_by_trust', (e.review_status IN ('approved','under_review')),
    'approved_for_donor_viewing', (e.donor_visible AND e.review_status='approved')
  );
END $$;
REVOKE ALL ON FUNCTION public.evidence_grant_donor_view(uuid,int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.evidence_grant_donor_view(uuid,int) TO authenticated;

-- 10. RPC: DPA status
CREATE OR REPLACE FUNCTION public.dpa_set_status(_dpa_id uuid, _new_status text, _note text DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(),'super_admin'::app_role) OR public.has_role(auth.uid(),'admin'::app_role))
  THEN RAISE EXCEPTION 'Admin only'; END IF;
  UPDATE public.delivery_partner_agreements
    SET status=_new_status,
        signed_at = CASE WHEN _new_status='signed' THEN now() ELSE signed_at END,
        signed_by = CASE WHEN _new_status='signed' THEN auth.uid() ELSE signed_by END,
        updated_at=now()
    WHERE id=_dpa_id;
  INSERT INTO public.audit_logs(user_id, action, resource_type, resource_id, metadata)
  VALUES (auth.uid(), 'dpa_status_changed', 'delivery_partner_agreements', _dpa_id,
          jsonb_build_object('status', _new_status, 'note', _note));
END $$;
REVOKE ALL ON FUNCTION public.dpa_set_status(uuid,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.dpa_set_status(uuid,text,text) TO authenticated;
