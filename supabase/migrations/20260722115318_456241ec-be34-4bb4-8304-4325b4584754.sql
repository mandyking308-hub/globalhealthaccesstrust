
-- =========================================================
-- ENUMS
-- =========================================================
DO $$ BEGIN CREATE TYPE public.agreement_status AS ENUM
  ('draft','issued','under_review','changes_requested','revised','accepted','active','superseded','terminated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.agreement_decision AS ENUM ('accept','request_changes','decline','trust_approve');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.change_request_status AS ENUM
  ('proposed','under_review','clarification_required','approved','rejected','withdrawn','implemented');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.comment_parent_type AS ENUM
  ('charter','agreement_version','milestone','project_update','expense','evidence','change_request','reporting_deadline','service_request');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.comment_visibility AS ENUM
  ('trust_internal','donor_trust','team_trust','shared_project','safeguarding_restricted','finance_restricted');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.service_request_status AS ENUM
  ('new','triage','assigned','investigating','awaiting_trust','awaiting_donor','awaiting_project_team','awaiting_third_party','proposed_resolution','resolved','closed','reopened','escalated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.service_request_priority AS ENUM ('routine','normal','high','urgent','critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.service_request_confidentiality AS ENUM
  ('standard','restricted_safeguarding','restricted_finance','identity_restricted');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.service_comment_type AS ENUM
  ('requester_comment','trust_response','internal_note','request_for_information','decision','resolution','escalation_note','safeguarding_note');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE public.project_health_state AS ENUM
  ('on_track','attention_required','at_risk','off_track','on_hold','completed','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =========================================================
-- HELPER FUNCTIONS
-- =========================================================
CREATE OR REPLACE FUNCTION public.is_safeguarding_officer(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role IN ('safeguarding_officer','super_admin'));
$$;

CREATE OR REPLACE FUNCTION public.is_finance_officer(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role IN ('finance_officer','super_admin'));
$$;

CREATE OR REPLACE FUNCTION public.is_project_team_member(_project_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.volunteer_project_assignments vpa
    JOIN public.volunteers v ON v.id = vpa.volunteer_id
    WHERE vpa.project_id = _project_id AND v.user_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_project_donor(_project_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.commissioned_projects WHERE id=_project_id AND donor_id=_user_id);
$$;

REVOKE EXECUTE ON FUNCTION public.is_safeguarding_officer(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_finance_officer(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_project_team_member(uuid, uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_project_donor(uuid, uuid) FROM anon;

-- =========================================================
-- AGREEMENTS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.project_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  status public.agreement_status NOT NULL DEFAULT 'draft',
  current_version_id uuid,
  activated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id)
);
GRANT SELECT, INSERT, UPDATE ON public.project_agreements TO authenticated;
GRANT ALL ON public.project_agreements TO service_role;
ALTER TABLE public.project_agreements ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_agreement_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_id uuid NOT NULL REFERENCES public.project_agreements(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  version_number int NOT NULL,
  title text NOT NULL,
  purpose text, intended_outcomes text, safe_location text,
  scope text, exclusions text, deliverables text, beneficiary_group text,
  funding_target numeric, gross_donation numeric, operating_allocation numeric, delivery_allocation numeric,
  budget_categories jsonb DEFAULT '[]'::jsonb,
  planned_start date, planned_completion date, expected_duration text,
  reporting_frequency text, first_report_due date, evidence_requirements text,
  financial_reporting text, communication_arrangements text,
  dependencies text, risks_private text,
  escalation_procedure text, change_control_procedure text,
  complaint_procedure text, safeguarding_route text, confidentiality_terms text,
  donor_visible_status text,
  issued_at timestamptz, issued_by uuid REFERENCES auth.users(id),
  is_donor_accepted boolean DEFAULT false,
  is_team_accepted boolean DEFAULT false,
  is_trust_approved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(agreement_id, version_number)
);
GRANT SELECT, INSERT, UPDATE ON public.project_agreement_versions TO authenticated;
GRANT ALL ON public.project_agreement_versions TO service_role;
ALTER TABLE public.project_agreement_versions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_agreement_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id uuid NOT NULL REFERENCES public.project_agreement_versions(id) ON DELETE CASCADE,
  title text NOT NULL,
  target_date date,
  weight numeric NOT NULL DEFAULT 1,
  sequence int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_agreement_milestones TO authenticated;
GRANT ALL ON public.project_agreement_milestones TO service_role;
ALTER TABLE public.project_agreement_milestones ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_agreement_decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id uuid NOT NULL REFERENCES public.project_agreement_versions(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  role text NOT NULL,
  decision public.agreement_decision NOT NULL,
  comment text,
  decided_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.project_agreement_decisions TO authenticated;
GRANT ALL ON public.project_agreement_decisions TO service_role;
ALTER TABLE public.project_agreement_decisions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  from_version_id uuid REFERENCES public.project_agreement_versions(id),
  resulting_version_id uuid REFERENCES public.project_agreement_versions(id),
  field text NOT NULL,
  original_value jsonb, proposed_value jsonb, reason text,
  requested_by uuid NOT NULL REFERENCES auth.users(id),
  requested_by_role text NOT NULL,
  requested_at timestamptz NOT NULL DEFAULT now(),
  status public.change_request_status NOT NULL DEFAULT 'proposed',
  decision_reason text,
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  requires_donor_reacceptance boolean DEFAULT false,
  requires_team_reacceptance boolean DEFAULT false,
  donor_visible boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_change_requests TO authenticated;
GRANT ALL ON public.project_change_requests TO service_role;
ALTER TABLE public.project_change_requests ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- COMMENTS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  parent_type public.comment_parent_type NOT NULL,
  parent_id uuid NOT NULL,
  author_id uuid NOT NULL REFERENCES auth.users(id),
  author_role text NOT NULL,
  body text NOT NULL,
  attachment_url text,
  parent_comment_id uuid REFERENCES public.project_comments(id) ON DELETE CASCADE,
  visibility public.comment_visibility NOT NULL DEFAULT 'trust_internal',
  approval_status text NOT NULL DEFAULT 'pending',
  edited_at timestamptz,
  mentions uuid[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_comments TO authenticated;
GRANT ALL ON public.project_comments TO service_role;
ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_comment_reads (
  comment_id uuid NOT NULL REFERENCES public.project_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(comment_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.project_comment_reads TO authenticated;
GRANT ALL ON public.project_comment_reads TO service_role;
ALTER TABLE public.project_comment_reads ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- SERVICE REQUESTS
-- =========================================================
CREATE SEQUENCE IF NOT EXISTS public.service_request_seq;

CREATE OR REPLACE FUNCTION public.generate_service_request_reference()
RETURNS text LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.service_request_seq');
  RETURN 'GHAT-' || to_char(now(),'YYYY') || '-' || lpad(n::text, 6, '0');
END $$;
REVOKE EXECUTE ON FUNCTION public.generate_service_request_reference() FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.project_service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL DEFAULT public.generate_service_request_reference(),
  requester_user_id uuid NOT NULL REFERENCES auth.users(id),
  requester_role text NOT NULL,
  requester_assignment_id uuid REFERENCES public.volunteer_project_assignments(id),
  project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  donation_id uuid REFERENCES public.donations(id) ON DELETE SET NULL,
  milestone_id uuid REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  expense_id uuid REFERENCES public.project_expenses(id) ON DELETE SET NULL,
  evidence_id uuid REFERENCES public.project_field_evidence(id) ON DELETE SET NULL,
  request_type text NOT NULL,
  category text,
  subject text NOT NULL,
  description text NOT NULL,
  priority public.service_request_priority NOT NULL DEFAULT 'normal',
  severity text,
  confidentiality_level public.service_request_confidentiality NOT NULL DEFAULT 'standard',
  status public.service_request_status NOT NULL DEFAULT 'new',
  assigned_team text,
  assigned_user_id uuid REFERENCES auth.users(id),
  first_response_due_at timestamptz,
  resolution_due_at timestamptz,
  first_responded_at timestamptz,
  last_response_at timestamptz,
  waiting_on text,
  escalated_at timestamptz,
  escalation_reason text,
  resolved_at timestamptz,
  resolution_summary text,
  resolution_category text,
  closed_at timestamptz,
  reopened_at timestamptz,
  donor_visible boolean DEFAULT true,
  satisfaction_score int,
  satisfaction_feedback text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_service_requests TO authenticated;
GRANT ALL ON public.project_service_requests TO service_role;
ALTER TABLE public.project_service_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_service_request_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.project_service_requests(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id),
  author_role text NOT NULL,
  comment_type public.service_comment_type NOT NULL DEFAULT 'requester_comment',
  body text NOT NULL,
  visibility public.comment_visibility NOT NULL DEFAULT 'trust_internal',
  attachment_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);
GRANT SELECT, INSERT, UPDATE ON public.project_service_request_comments TO authenticated;
GRANT ALL ON public.project_service_request_comments TO service_role;
ALTER TABLE public.project_service_request_comments ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_service_request_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.project_service_requests(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id),
  actor_role text,
  event_type text NOT NULL,
  detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.project_service_request_events TO authenticated;
GRANT ALL ON public.project_service_request_events TO service_role;
ALTER TABLE public.project_service_request_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_service_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL,
  priority public.service_request_priority NOT NULL,
  acknowledge_minutes int NOT NULL DEFAULT 240,
  first_response_minutes int NOT NULL DEFAULT 1440,
  resolution_minutes int NOT NULL DEFAULT 10080,
  escalation_minutes int NOT NULL DEFAULT 2880,
  business_hours jsonb DEFAULT '{"mon_fri":"09:00-17:30"}'::jsonb,
  timezone text NOT NULL DEFAULT 'Europe/London',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(request_type, priority)
);
GRANT SELECT ON public.project_service_policies TO authenticated;
GRANT ALL ON public.project_service_policies TO service_role;
ALTER TABLE public.project_service_policies ENABLE ROW LEVEL SECURITY;

INSERT INTO public.project_service_policies(request_type, priority, first_response_minutes, resolution_minutes) VALUES
  ('general','routine', 2880, 20160),
  ('general','normal',  1440, 10080),
  ('general','high',     480,  4320),
  ('general','urgent',   120,  1440),
  ('general','critical',  60,   480),
  ('safeguarding','critical', 30, 240),
  ('complaint','normal', 1440, 20160)
ON CONFLICT DO NOTHING;

-- =========================================================
-- HEALTH & NOTIFICATIONS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.project_health_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  health public.project_health_state NOT NULL,
  signals jsonb DEFAULT '{}'::jsonb,
  override_by uuid REFERENCES auth.users(id),
  override_reason text,
  donor_visible_explanation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_health_snapshots TO authenticated;
GRANT ALL ON public.project_health_snapshots TO service_role;
ALTER TABLE public.project_health_snapshots ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.project_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.project_notifications TO authenticated;
GRANT ALL ON public.project_notifications TO service_role;
ALTER TABLE public.project_notifications ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- UPDATED_AT TRIGGERS
-- =========================================================
CREATE TRIGGER trg_pa_updated BEFORE UPDATE ON public.project_agreements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_pav_updated BEFORE UPDATE ON public.project_agreement_versions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_pcr_updated BEFORE UPDATE ON public.project_change_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_pc_updated BEFORE UPDATE ON public.project_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_psr_updated BEFORE UPDATE ON public.project_service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_psrc_updated BEFORE UPDATE ON public.project_service_request_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_psp_updated BEFORE UPDATE ON public.project_service_policies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =========================================================
-- RLS POLICIES
-- =========================================================
CREATE POLICY "agreements_admin_all" ON public.project_agreements FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "agreements_donor_read" ON public.project_agreements FOR SELECT TO authenticated
  USING (public.is_project_donor(project_id, auth.uid()));
CREATE POLICY "agreements_team_read" ON public.project_agreements FOR SELECT TO authenticated
  USING (public.is_project_team_member(project_id, auth.uid()));

CREATE POLICY "versions_admin_all" ON public.project_agreement_versions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "versions_donor_read" ON public.project_agreement_versions FOR SELECT TO authenticated
  USING (public.is_project_donor(project_id, auth.uid()) AND issued_at IS NOT NULL);
CREATE POLICY "versions_team_read" ON public.project_agreement_versions FOR SELECT TO authenticated
  USING (public.is_project_team_member(project_id, auth.uid()) AND issued_at IS NOT NULL);

CREATE POLICY "amilestones_admin_all" ON public.project_agreement_milestones FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "amilestones_read" ON public.project_agreement_milestones FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.project_agreement_versions v WHERE v.id = version_id
                  AND (public.is_project_donor(v.project_id, auth.uid()) OR public.is_project_team_member(v.project_id, auth.uid()))
                  AND v.issued_at IS NOT NULL));

CREATE POLICY "decisions_admin_all" ON public.project_agreement_decisions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "decisions_self_read" ON public.project_agreement_decisions FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "decisions_self_insert" ON public.project_agreement_decisions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND (
    public.is_project_donor(project_id, auth.uid()) OR public.is_project_team_member(project_id, auth.uid())
  ));

CREATE POLICY "changes_admin_all" ON public.project_change_requests FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "changes_donor_read" ON public.project_change_requests FOR SELECT TO authenticated
  USING (donor_visible = true AND status = 'approved' AND public.is_project_donor(project_id, auth.uid()));
CREATE POLICY "changes_team_read" ON public.project_change_requests FOR SELECT TO authenticated
  USING (public.is_project_team_member(project_id, auth.uid()));
CREATE POLICY "changes_requester_insert" ON public.project_change_requests FOR INSERT TO authenticated
  WITH CHECK (requested_by = auth.uid() AND (
    public.is_project_donor(project_id, auth.uid()) OR public.is_project_team_member(project_id, auth.uid())
  ));

CREATE POLICY "comments_admin_all" ON public.project_comments FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "comments_visibility_read" ON public.project_comments FOR SELECT TO authenticated
  USING (
    approval_status = 'approved' AND (
      (visibility = 'donor_trust' AND public.is_project_donor(project_id, auth.uid())) OR
      (visibility = 'team_trust'  AND public.is_project_team_member(project_id, auth.uid())) OR
      (visibility = 'shared_project' AND (public.is_project_donor(project_id, auth.uid()) OR public.is_project_team_member(project_id, auth.uid()))) OR
      (visibility = 'safeguarding_restricted' AND public.is_safeguarding_officer(auth.uid())) OR
      (visibility = 'finance_restricted'      AND public.is_finance_officer(auth.uid()))
    )
  );
CREATE POLICY "comments_author_insert" ON public.project_comments FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND (
    public.is_project_donor(project_id, auth.uid()) OR public.is_project_team_member(project_id, auth.uid()) OR public.is_admin(auth.uid())
  ));
CREATE POLICY "comments_author_own_read" ON public.project_comments FOR SELECT TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "comment_reads_self" ON public.project_comment_reads FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "sr_admin_all" ON public.project_service_requests FOR ALL TO authenticated
  USING (
    public.is_admin(auth.uid()) AND (
      confidentiality_level = 'standard' OR
      (confidentiality_level = 'restricted_safeguarding' AND public.is_safeguarding_officer(auth.uid())) OR
      (confidentiality_level = 'restricted_finance' AND public.is_finance_officer(auth.uid())) OR
      (confidentiality_level = 'identity_restricted' AND public.is_safeguarding_officer(auth.uid()))
    )
  ) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "sr_requester_read" ON public.project_service_requests FOR SELECT TO authenticated
  USING (requester_user_id = auth.uid());
CREATE POLICY "sr_requester_insert" ON public.project_service_requests FOR INSERT TO authenticated
  WITH CHECK (requester_user_id = auth.uid());
CREATE POLICY "sr_requester_update_limited" ON public.project_service_requests FOR UPDATE TO authenticated
  USING (requester_user_id = auth.uid()) WITH CHECK (requester_user_id = auth.uid());

CREATE POLICY "src_admin_all" ON public.project_service_request_comments FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "src_participant_read" ON public.project_service_request_comments FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.project_service_requests r WHERE r.id = request_id AND r.requester_user_id = auth.uid())
    AND visibility IN ('donor_trust','team_trust','shared_project')
  );
CREATE POLICY "src_participant_insert" ON public.project_service_request_comments FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.project_service_requests r WHERE r.id = request_id AND r.requester_user_id = auth.uid())
  );

CREATE POLICY "sre_admin_all" ON public.project_service_request_events FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "sre_requester_read" ON public.project_service_request_events FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.project_service_requests r WHERE r.id = request_id AND r.requester_user_id = auth.uid()));
CREATE POLICY "sre_actor_insert" ON public.project_service_request_events FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid());

CREATE POLICY "policies_read_all" ON public.project_service_policies FOR SELECT TO authenticated USING (true);
CREATE POLICY "policies_admin_write" ON public.project_service_policies FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "health_admin_all" ON public.project_health_snapshots FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "health_donor_read" ON public.project_health_snapshots FOR SELECT TO authenticated
  USING (public.is_project_donor(project_id, auth.uid()) AND donor_visible_explanation IS NOT NULL);
CREATE POLICY "health_team_read" ON public.project_health_snapshots FOR SELECT TO authenticated
  USING (public.is_project_team_member(project_id, auth.uid()));

CREATE POLICY "notif_self_read" ON public.project_notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "notif_self_update" ON public.project_notifications FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "notif_admin_insert" ON public.project_notifications FOR INSERT TO authenticated
  WITH CHECK (public.is_admin(auth.uid()) OR user_id = auth.uid());

-- =========================================================
-- RPCs
-- =========================================================
CREATE OR REPLACE FUNCTION public.donor_project_agreement(_project_id uuid)
RETURNS TABLE(
  version_id uuid, version_number int, status public.agreement_status,
  title text, purpose text, intended_outcomes text, safe_location text,
  scope text, exclusions text, deliverables text, beneficiary_group text,
  funding_target numeric, gross_donation numeric, operating_allocation numeric, delivery_allocation numeric,
  budget_categories jsonb, planned_start date, planned_completion date, expected_duration text,
  reporting_frequency text, first_report_due date, evidence_requirements text,
  financial_reporting text, communication_arrangements text,
  complaint_procedure text, safeguarding_route text, confidentiality_terms text,
  donor_visible_status text, issued_at timestamptz,
  is_donor_accepted boolean, is_trust_approved boolean, activated_at timestamptz
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT v.id, v.version_number, a.status,
    v.title, v.purpose, v.intended_outcomes, v.safe_location,
    v.scope, v.exclusions, v.deliverables, v.beneficiary_group,
    v.funding_target, v.gross_donation, v.operating_allocation, v.delivery_allocation,
    v.budget_categories, v.planned_start, v.planned_completion, v.expected_duration,
    v.reporting_frequency, v.first_report_due, v.evidence_requirements,
    v.financial_reporting, v.communication_arrangements,
    v.complaint_procedure, v.safeguarding_route, v.confidentiality_terms,
    v.donor_visible_status, v.issued_at,
    v.is_donor_accepted, v.is_trust_approved, a.activated_at
  FROM public.project_agreements a
  JOIN public.project_agreement_versions v ON v.id = a.current_version_id
  WHERE a.project_id = _project_id
    AND public.is_project_donor(_project_id, auth.uid())
    AND v.issued_at IS NOT NULL;
$$;
REVOKE EXECUTE ON FUNCTION public.donor_project_agreement(uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.team_project_agreement(_project_id uuid)
RETURNS TABLE(
  version_id uuid, version_number int, status public.agreement_status,
  title text, purpose text, intended_outcomes text, safe_location text,
  scope text, exclusions text, deliverables text, beneficiary_group text,
  delivery_allocation numeric, budget_categories jsonb,
  planned_start date, planned_completion date, expected_duration text,
  reporting_frequency text, first_report_due date, evidence_requirements text,
  communication_arrangements text, dependencies text,
  escalation_procedure text, safeguarding_route text,
  issued_at timestamptz, is_team_accepted boolean, is_trust_approved boolean, activated_at timestamptz
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT v.id, v.version_number, a.status,
    v.title, v.purpose, v.intended_outcomes, v.safe_location,
    v.scope, v.exclusions, v.deliverables, v.beneficiary_group,
    v.delivery_allocation, v.budget_categories,
    v.planned_start, v.planned_completion, v.expected_duration,
    v.reporting_frequency, v.first_report_due, v.evidence_requirements,
    v.communication_arrangements, v.dependencies,
    v.escalation_procedure, v.safeguarding_route,
    v.issued_at, v.is_team_accepted, v.is_trust_approved, a.activated_at
  FROM public.project_agreements a
  JOIN public.project_agreement_versions v ON v.id = a.current_version_id
  WHERE a.project_id = _project_id
    AND public.is_project_team_member(_project_id, auth.uid())
    AND v.issued_at IS NOT NULL;
$$;
REVOKE EXECUTE ON FUNCTION public.team_project_agreement(uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.submit_agreement_decision(
  _version_id uuid, _decision public.agreement_decision, _comment text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_project uuid; v_role text; v_agreement uuid; v_new_id uuid; BEGIN
  SELECT project_id, agreement_id INTO v_project, v_agreement FROM public.project_agreement_versions WHERE id = _version_id;
  IF v_project IS NULL THEN RAISE EXCEPTION 'Agreement version not found'; END IF;

  IF _decision = 'trust_approve' THEN
    IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Only Trust can approve'; END IF;
    v_role := 'trust';
  ELSIF public.is_project_donor(v_project, auth.uid()) THEN v_role := 'donor';
  ELSIF public.is_project_team_member(v_project, auth.uid()) THEN v_role := 'project_team';
  ELSIF public.is_admin(auth.uid()) THEN v_role := 'trust';
  ELSE RAISE EXCEPTION 'Not authorised to decide on this agreement';
  END IF;

  IF _decision IN ('request_changes','decline') AND (_comment IS NULL OR length(trim(_comment))=0) THEN
    RAISE EXCEPTION 'Comment required for requesting changes or declining';
  END IF;

  INSERT INTO public.project_agreement_decisions(version_id, project_id, user_id, role, decision, comment)
  VALUES (_version_id, v_project, auth.uid(), v_role, _decision, _comment)
  RETURNING id INTO v_new_id;

  IF _decision = 'accept' THEN
    IF v_role = 'donor' THEN UPDATE public.project_agreement_versions SET is_donor_accepted = true WHERE id = _version_id; END IF;
    IF v_role = 'project_team' THEN UPDATE public.project_agreement_versions SET is_team_accepted = true WHERE id = _version_id; END IF;
  ELSIF _decision = 'trust_approve' THEN
    UPDATE public.project_agreement_versions SET is_trust_approved = true WHERE id = _version_id;
  ELSIF _decision = 'request_changes' THEN
    UPDATE public.project_agreements SET status = 'changes_requested' WHERE id = v_agreement;
  END IF;

  UPDATE public.project_agreements a
     SET status = 'active', activated_at = COALESCE(a.activated_at, now())
   WHERE a.id = v_agreement
     AND EXISTS (SELECT 1 FROM public.project_agreement_versions v
                  WHERE v.id = _version_id AND v.is_donor_accepted AND v.is_team_accepted AND v.is_trust_approved);

  RETURN v_new_id;
END $$;
REVOKE EXECUTE ON FUNCTION public.submit_agreement_decision(uuid, public.agreement_decision, text) FROM anon;

CREATE OR REPLACE FUNCTION public.compute_service_sla(_request_type text, _priority public.service_request_priority)
RETURNS TABLE(first_response_due_at timestamptz, resolution_due_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE p record; BEGIN
  SELECT * INTO p FROM public.project_service_policies WHERE request_type = _request_type AND priority = _priority LIMIT 1;
  IF p IS NULL THEN SELECT * INTO p FROM public.project_service_policies WHERE request_type = 'general' AND priority = _priority LIMIT 1; END IF;
  IF p IS NULL THEN
    RETURN QUERY SELECT now() + interval '24 hours', now() + interval '7 days';
  ELSE
    RETURN QUERY SELECT now() + (p.first_response_minutes || ' minutes')::interval, now() + (p.resolution_minutes || ' minutes')::interval;
  END IF;
END $$;
REVOKE EXECUTE ON FUNCTION public.compute_service_sla(text, public.service_request_priority) FROM anon;

CREATE OR REPLACE FUNCTION public.create_service_request(
  _request_type text, _category text, _subject text, _description text,
  _priority public.service_request_priority, _confidentiality public.service_request_confidentiality,
  _project_id uuid, _milestone_id uuid, _expense_id uuid, _evidence_id uuid, _donation_id uuid
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_role text; sla record; assignment uuid; donor_visible boolean; BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF _subject IS NULL OR length(trim(_subject))=0 THEN RAISE EXCEPTION 'Subject required'; END IF;
  IF _description IS NULL OR length(trim(_description))=0 THEN RAISE EXCEPTION 'Description required'; END IF;

  IF public.is_admin(auth.uid()) THEN v_role := 'trust';
  ELSIF _project_id IS NOT NULL AND public.is_project_donor(_project_id, auth.uid()) THEN v_role := 'donor';
  ELSIF _project_id IS NOT NULL AND public.is_project_team_member(_project_id, auth.uid()) THEN v_role := 'project_team';
  ELSE
    IF EXISTS(SELECT 1 FROM public.commissioned_projects WHERE donor_id = auth.uid()) THEN v_role := 'donor';
    ELSIF EXISTS(SELECT 1 FROM public.volunteers WHERE user_id = auth.uid()) THEN v_role := 'project_team';
    ELSE v_role := 'unknown';
    END IF;
  END IF;

  SELECT vpa.id INTO assignment FROM public.volunteer_project_assignments vpa
  JOIN public.volunteers v ON v.id = vpa.volunteer_id
  WHERE vpa.project_id = _project_id AND v.user_id = auth.uid() LIMIT 1;

  SELECT * INTO sla FROM public.compute_service_sla(COALESCE(_request_type,'general'), _priority);
  donor_visible := (_confidentiality = 'standard');

  INSERT INTO public.project_service_requests(
    requester_user_id, requester_role, requester_assignment_id,
    project_id, milestone_id, expense_id, evidence_id, donation_id,
    request_type, category, subject, description,
    priority, confidentiality_level, status,
    first_response_due_at, resolution_due_at, donor_visible
  ) VALUES (
    auth.uid(), v_role, assignment,
    _project_id, _milestone_id, _expense_id, _evidence_id, _donation_id,
    _request_type, _category, _subject, _description,
    _priority, _confidentiality, 'new',
    sla.first_response_due_at, sla.resolution_due_at, donor_visible
  ) RETURNING id INTO v_id;

  INSERT INTO public.project_service_request_events(request_id, actor_id, actor_role, event_type, detail)
  VALUES (v_id, auth.uid(), v_role, 'created', jsonb_build_object('priority', _priority, 'confidentiality', _confidentiality));

  RETURN v_id;
END $$;
REVOKE EXECUTE ON FUNCTION public.create_service_request(text,text,text,text,public.service_request_priority,public.service_request_confidentiality,uuid,uuid,uuid,uuid,uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.add_service_request_comment(
  _request_id uuid, _body text, _comment_type public.service_comment_type, _visibility public.comment_visibility
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_role text; r record; BEGIN
  SELECT * INTO r FROM public.project_service_requests WHERE id = _request_id;
  IF r IS NULL THEN RAISE EXCEPTION 'Request not found'; END IF;

  IF public.is_admin(auth.uid()) THEN v_role := 'trust';
  ELSIF r.requester_user_id = auth.uid() THEN v_role := r.requester_role;
  ELSE RAISE EXCEPTION 'Not authorised to comment on this request';
  END IF;

  INSERT INTO public.project_service_request_comments(request_id, author_id, author_role, comment_type, body, visibility)
  VALUES (_request_id, auth.uid(), v_role, _comment_type, _body, _visibility) RETURNING id INTO v_id;

  UPDATE public.project_service_requests
     SET last_response_at = now(),
         first_responded_at = COALESCE(first_responded_at, CASE WHEN v_role='trust' THEN now() ELSE NULL END),
         waiting_on = CASE WHEN v_role='trust' THEN r.requester_role ELSE 'trust' END,
         status = CASE WHEN v_role='trust' AND r.status='new' THEN 'assigned'::public.service_request_status ELSE r.status END
   WHERE id = _request_id;

  INSERT INTO public.project_service_request_events(request_id, actor_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), v_role, 'comment', jsonb_build_object('comment_id', v_id, 'type', _comment_type));

  RETURN v_id;
END $$;
REVOKE EXECUTE ON FUNCTION public.add_service_request_comment(uuid,text,public.service_comment_type,public.comment_visibility) FROM anon;

CREATE OR REPLACE FUNCTION public.resolve_service_request(_request_id uuid, _summary text, _category text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Only Trust can propose resolution'; END IF;
  UPDATE public.project_service_requests
     SET status='proposed_resolution', resolution_summary=_summary, resolution_category=_category, resolved_at=now()
   WHERE id=_request_id;
  INSERT INTO public.project_service_request_events(request_id, actor_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), 'trust', 'proposed_resolution', jsonb_build_object('summary',_summary));
END $$;
REVOKE EXECUTE ON FUNCTION public.resolve_service_request(uuid,text,text) FROM anon;

CREATE OR REPLACE FUNCTION public.confirm_service_resolution(_request_id uuid, _score int, _feedback text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r record; BEGIN
  SELECT * INTO r FROM public.project_service_requests WHERE id = _request_id;
  IF r.requester_user_id <> auth.uid() THEN RAISE EXCEPTION 'Only requester can confirm resolution'; END IF;
  UPDATE public.project_service_requests
     SET status='closed', closed_at=now(),
         satisfaction_score = CASE WHEN r.confidentiality_level='standard' THEN _score ELSE NULL END,
         satisfaction_feedback = CASE WHEN r.confidentiality_level='standard' THEN _feedback ELSE NULL END
   WHERE id=_request_id;
  INSERT INTO public.project_service_request_events(request_id, actor_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), r.requester_role, 'closed', jsonb_build_object('confirmed', true));
END $$;
REVOKE EXECUTE ON FUNCTION public.confirm_service_resolution(uuid,int,text) FROM anon;

CREATE OR REPLACE FUNCTION public.reopen_service_request(_request_id uuid, _reason text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r record; BEGIN
  SELECT * INTO r FROM public.project_service_requests WHERE id = _request_id;
  IF r.requester_user_id <> auth.uid() AND NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  UPDATE public.project_service_requests SET status='reopened', reopened_at=now(), closed_at=NULL WHERE id=_request_id;
  INSERT INTO public.project_service_request_events(request_id, actor_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), COALESCE(r.requester_role,'trust'), 'reopened', jsonb_build_object('reason',_reason));
END $$;
REVOKE EXECUTE ON FUNCTION public.reopen_service_request(uuid,text) FROM anon;

CREATE OR REPLACE FUNCTION public.compute_project_health(_project_id uuid)
RETURNS public.project_health_state LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE overdue_milestones int; unresolved_high int; not_accepted int; result public.project_health_state;
BEGIN
  SELECT COUNT(*) INTO overdue_milestones FROM public.project_milestones
   WHERE project_id=_project_id AND status <> 'completed' AND target_date IS NOT NULL AND target_date < CURRENT_DATE;
  SELECT COUNT(*) INTO unresolved_high FROM public.project_service_requests
   WHERE project_id=_project_id AND priority IN ('high','urgent','critical') AND status NOT IN ('resolved','closed');
  SELECT CASE WHEN EXISTS (SELECT 1 FROM public.project_agreements WHERE project_id=_project_id AND status <> 'active') THEN 1 ELSE 0 END INTO not_accepted;
  IF overdue_milestones >= 2 OR unresolved_high >= 2 THEN result := 'off_track';
  ELSIF overdue_milestones = 1 OR unresolved_high = 1 THEN result := 'at_risk';
  ELSIF not_accepted = 1 THEN result := 'attention_required';
  ELSE result := 'on_track';
  END IF;
  RETURN result;
END $$;
REVOKE EXECUTE ON FUNCTION public.compute_project_health(uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.admin_issue_agreement_version(_agreement_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  UPDATE public.project_agreement_versions SET issued_at = COALESCE(issued_at, now()), issued_by = COALESCE(issued_by, auth.uid())
   WHERE agreement_id = _agreement_id AND id = (SELECT current_version_id FROM public.project_agreements WHERE id = _agreement_id);
  UPDATE public.project_agreements SET status = 'issued' WHERE id = _agreement_id AND status IN ('draft','changes_requested');
END $$;
REVOKE EXECUTE ON FUNCTION public.admin_issue_agreement_version(uuid) FROM anon;
