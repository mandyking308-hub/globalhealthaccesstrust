
-- Helper role predicates (now safe — enum values committed)
CREATE OR REPLACE FUNCTION public.is_super_admin(_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user AND role='super_admin')
$$;

CREATE OR REPLACE FUNCTION public.is_complaints_officer(_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles
    WHERE user_id=_user AND role::text IN ('complaints_officer','super_admin'))
$$;

CREATE OR REPLACE FUNCTION public.is_concerns_officer(_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles
    WHERE user_id=_user AND role::text = 'super_admin')
$$;

CREATE OR REPLACE FUNCTION public.is_incident_officer(_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles
    WHERE user_id=_user AND role::text IN ('incident_officer','super_admin'))
$$;

-- Support pathway
DO $$ BEGIN
  CREATE TYPE public.support_pathway AS ENUM (
    'donor_account','payment','allocation','project','project_team',
    'evidence','privacy','technical','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.project_service_requests
  ADD COLUMN IF NOT EXISTS pathway public.support_pathway;

-- Shared reference generator
CREATE OR REPLACE FUNCTION public.generate_ref(_prefix text)
RETURNS text LANGUAGE sql VOLATILE SET search_path=public AS $$
  SELECT format('GHAT-%s-%s-%s', _prefix,
    to_char(now() AT TIME ZONE 'UTC','YYYY'),
    lpad((floor(random()*100000))::text, 5, '0'))
$$;

-- Append-only guard
CREATE OR REPLACE FUNCTION public.tg_append_only()
RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  IF TG_OP <> 'INSERT' AND NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'append_only_table';
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;

-- =========================== COMPLAINTS ===========================
DO $$ BEGIN
  CREATE TYPE public.complaint_status AS ENUM (
    'received','acknowledged','under_investigation','awaiting_information',
    'response_issued','under_review','escalated','closed','withdrawn');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text NOT NULL UNIQUE DEFAULT generate_ref('CMP'),
  complainant_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  complainant_name text, complainant_email text, complainant_phone text,
  is_anonymous boolean NOT NULL DEFAULT false,
  accessibility_needs text,
  complaint_about text NOT NULL,
  category text NOT NULL,
  project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  description text NOT NULL,
  requested_remedy text,
  conflict_notes text,
  assigned_officer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status public.complaint_status NOT NULL DEFAULT 'received',
  acknowledged_at timestamptz,
  investigation_notes text,
  response_summary text,
  response_issued_at timestamptz,
  review_outcome text,
  review_completed_at timestamptz,
  escalation_route text,
  closed_at timestamptz,
  retention_basis text,
  ack_token text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.complaint_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role text, event_type text NOT NULL, detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.complaints TO authenticated;
GRANT ALL ON public.complaints TO service_role;
GRANT SELECT, INSERT ON public.complaint_events TO authenticated;
GRANT ALL ON public.complaint_events TO service_role;

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY cmp_officers ON public.complaints FOR ALL TO authenticated
  USING (public.is_complaints_officer(auth.uid()) OR public.is_admin(auth.uid()))
  WITH CHECK (public.is_complaints_officer(auth.uid()) OR public.is_admin(auth.uid()));
CREATE POLICY cmp_own ON public.complaints FOR SELECT TO authenticated
  USING (complainant_user_id = auth.uid());
CREATE POLICY cmp_ev_officers ON public.complaint_events FOR ALL TO authenticated
  USING (public.is_complaints_officer(auth.uid()) OR public.is_admin(auth.uid()))
  WITH CHECK (public.is_complaints_officer(auth.uid()) OR public.is_admin(auth.uid()));
CREATE POLICY cmp_ev_own ON public.complaint_events FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.complaints c
    WHERE c.id = complaint_events.complaint_id AND c.complainant_user_id = auth.uid()));

CREATE TRIGGER trg_cmp_events_append BEFORE UPDATE OR DELETE ON public.complaint_events
  FOR EACH ROW EXECUTE FUNCTION public.tg_append_only();
CREATE TRIGGER trg_cmp_updated BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE FUNCTION public.complaint_submit(
  _complaint_about text, _category text, _description text,
  _requested_remedy text DEFAULT NULL, _project_id uuid DEFAULT NULL,
  _complainant_name text DEFAULT NULL, _complainant_email text DEFAULT NULL,
  _complainant_phone text DEFAULT NULL, _accessibility_needs text DEFAULT NULL,
  _anonymous boolean DEFAULT false
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE _id uuid; _ref text; _tok text;
BEGIN
  IF _description IS NULL OR length(trim(_description)) < 20 THEN
    RAISE EXCEPTION 'description_too_short'; END IF;
  IF _category NOT IN ('conduct','process','delivery','finance','privacy','safeguarding_signpost','other') THEN
    RAISE EXCEPTION 'invalid_category'; END IF;
  _tok := CASE WHEN _anonymous THEN encode(gen_random_bytes(24),'hex') END;
  INSERT INTO public.complaints(complainant_user_id, complainant_name, complainant_email,
    complainant_phone, is_anonymous, accessibility_needs, complaint_about, category,
    project_id, description, requested_remedy, ack_token)
  VALUES (
    CASE WHEN _anonymous THEN NULL ELSE auth.uid() END,
    CASE WHEN _anonymous THEN NULL ELSE _complainant_name END,
    CASE WHEN _anonymous THEN NULL ELSE _complainant_email END,
    CASE WHEN _anonymous THEN NULL ELSE _complainant_phone END,
    _anonymous, _accessibility_needs, _complaint_about, _category, _project_id,
    _description, _requested_remedy, _tok)
  RETURNING id, reference_number INTO _id, _ref;
  INSERT INTO public.complaint_events(complaint_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'submitter', 'submitted', jsonb_build_object('anonymous',_anonymous));
  RETURN jsonb_build_object('id',_id,'reference_number',_ref,'ack_token',_tok);
END $$;
REVOKE ALL ON FUNCTION public.complaint_submit(text,text,text,text,uuid,text,text,text,text,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complaint_submit(text,text,text,text,uuid,text,text,text,text,boolean) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.complaint_set_status(
  _id uuid, _status public.complaint_status, _note text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT (public.is_complaints_officer(auth.uid()) OR public.is_admin(auth.uid())) THEN
    RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.complaints SET status=_status,
    acknowledged_at = CASE WHEN _status='acknowledged' AND acknowledged_at IS NULL THEN now() ELSE acknowledged_at END,
    response_issued_at = CASE WHEN _status='response_issued' AND response_issued_at IS NULL THEN now() ELSE response_issued_at END,
    closed_at = CASE WHEN _status IN ('closed','withdrawn') AND closed_at IS NULL THEN now() ELSE closed_at END
  WHERE id=_id;
  INSERT INTO public.complaint_events(complaint_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'officer', 'status_change', jsonb_build_object('status',_status,'note',_note));
END $$;
REVOKE ALL ON FUNCTION public.complaint_set_status(uuid,public.complaint_status,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complaint_set_status(uuid,public.complaint_status,text) TO authenticated;

-- ====================== PROTECTED CONCERNS ======================
DO $$ BEGIN
  CREATE TYPE public.concern_status AS ENUM (
    'received','triage','under_review','investigating','referred','closed','not_upheld','upheld');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.protected_concerns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text NOT NULL UNIQUE DEFAULT generate_ref('PC'),
  concern_type text NOT NULL,
  summary text NOT NULL, detail text NOT NULL,
  is_anonymous boolean NOT NULL DEFAULT false,
  reporter_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_name text, reporter_contact text,
  ack_token text UNIQUE,
  assigned_officer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status public.concern_status NOT NULL DEFAULT 'received',
  triage_notes text, investigation_notes text,
  outcome_summary text, referred_to text,
  closed_at timestamptz, retention_basis text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.protected_concern_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concern_id uuid NOT NULL REFERENCES public.protected_concerns(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role text, event_type text NOT NULL, detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.protected_concerns TO authenticated;
GRANT ALL ON public.protected_concerns TO service_role;
GRANT SELECT, INSERT ON public.protected_concern_events TO authenticated;
GRANT ALL ON public.protected_concern_events TO service_role;

ALTER TABLE public.protected_concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protected_concern_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY pc_officers ON public.protected_concerns FOR ALL TO authenticated
  USING (public.is_concerns_officer(auth.uid()))
  WITH CHECK (public.is_concerns_officer(auth.uid()));
CREATE POLICY pc_own ON public.protected_concerns FOR SELECT TO authenticated
  USING (reporter_user_id = auth.uid() AND is_anonymous = false);
CREATE POLICY pc_ev_officers ON public.protected_concern_events FOR ALL TO authenticated
  USING (public.is_concerns_officer(auth.uid()))
  WITH CHECK (public.is_concerns_officer(auth.uid()));

CREATE TRIGGER trg_pc_events_append BEFORE UPDATE OR DELETE ON public.protected_concern_events
  FOR EACH ROW EXECUTE FUNCTION public.tg_append_only();
CREATE TRIGGER trg_pc_updated BEFORE UPDATE ON public.protected_concerns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE FUNCTION public.concern_submit(
  _concern_type text, _summary text, _detail text,
  _anonymous boolean DEFAULT true,
  _reporter_name text DEFAULT NULL, _reporter_contact text DEFAULT NULL
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE _id uuid; _ref text; _tok text;
BEGIN
  IF _concern_type NOT IN ('wrongdoing','fraud','misuse_of_funds','safeguarding','retaliation','conflicts','governance','legal') THEN
    RAISE EXCEPTION 'invalid_concern_type'; END IF;
  IF length(coalesce(_detail,'')) < 30 THEN RAISE EXCEPTION 'detail_too_short'; END IF;
  _tok := encode(gen_random_bytes(24),'hex');
  INSERT INTO public.protected_concerns(concern_type, summary, detail, is_anonymous,
    reporter_user_id, reporter_name, reporter_contact, ack_token)
  VALUES (_concern_type, _summary, _detail, _anonymous,
    CASE WHEN _anonymous THEN NULL ELSE auth.uid() END,
    CASE WHEN _anonymous THEN NULL ELSE _reporter_name END,
    CASE WHEN _anonymous THEN NULL ELSE _reporter_contact END, _tok)
  RETURNING id, reference_number INTO _id, _ref;
  INSERT INTO public.protected_concern_events(concern_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'reporter', 'submitted',
      jsonb_build_object('anonymous',_anonymous,'type',_concern_type));
  RETURN jsonb_build_object('id',_id,'reference_number',_ref,'ack_token',_tok);
END $$;
REVOKE ALL ON FUNCTION public.concern_submit(text,text,text,boolean,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.concern_submit(text,text,text,boolean,text,text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.concern_set_status(
  _id uuid, _status public.concern_status, _note text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.is_concerns_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.protected_concerns SET status=_status,
    closed_at = CASE WHEN _status IN ('closed','not_upheld','upheld') AND closed_at IS NULL THEN now() ELSE closed_at END
  WHERE id=_id;
  INSERT INTO public.protected_concern_events(concern_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'officer', 'status_change', jsonb_build_object('status',_status,'note',_note));
END $$;
REVOKE ALL ON FUNCTION public.concern_set_status(uuid,public.concern_status,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.concern_set_status(uuid,public.concern_status,text) TO authenticated;

-- ======================== SAFEGUARDING ========================
DO $$ BEGIN
  CREATE TYPE public.safeguarding_status AS ENUM (
    'received','triaged','under_review','referred_statutory','closed_no_action','closed_action_taken');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.safeguarding_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text NOT NULL UNIQUE DEFAULT generate_ref('SG'),
  reporter_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_name text, reporter_contact text,
  is_anonymous boolean NOT NULL DEFAULT false,
  person_at_risk_initials text, person_at_risk_age_band text,
  immediate_danger boolean NOT NULL DEFAULT false,
  location text,
  project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  allegation_summary text NOT NULL,
  immediate_actions text, statutory_referrals text,
  chronology jsonb NOT NULL DEFAULT '[]'::jsonb,
  decisions text, outcome text,
  status public.safeguarding_status NOT NULL DEFAULT 'received',
  retention_basis text, retention_review_at timestamptz, closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.safeguarding_case_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.safeguarding_cases(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role text, event_type text NOT NULL, detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.safeguarding_cases TO authenticated;
GRANT ALL ON public.safeguarding_cases TO service_role;
GRANT SELECT, INSERT ON public.safeguarding_case_events TO authenticated;
GRANT ALL ON public.safeguarding_case_events TO service_role;

ALTER TABLE public.safeguarding_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safeguarding_case_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY sg_officers ON public.safeguarding_cases FOR ALL TO authenticated
  USING (public.is_safeguarding_officer(auth.uid()))
  WITH CHECK (public.is_safeguarding_officer(auth.uid()));
CREATE POLICY sg_ev_officers ON public.safeguarding_case_events FOR ALL TO authenticated
  USING (public.is_safeguarding_officer(auth.uid()))
  WITH CHECK (public.is_safeguarding_officer(auth.uid()));

CREATE TRIGGER trg_sg_events_append BEFORE UPDATE OR DELETE ON public.safeguarding_case_events
  FOR EACH ROW EXECUTE FUNCTION public.tg_append_only();
CREATE TRIGGER trg_sg_updated BEFORE UPDATE ON public.safeguarding_cases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE FUNCTION public.safeguarding_report(
  _allegation text, _immediate_danger boolean DEFAULT false,
  _location text DEFAULT NULL, _person_initials text DEFAULT NULL,
  _person_age_band text DEFAULT NULL, _project_id uuid DEFAULT NULL,
  _reporter_name text DEFAULT NULL, _reporter_contact text DEFAULT NULL,
  _anonymous boolean DEFAULT false
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE _id uuid; _ref text;
BEGIN
  IF length(coalesce(_allegation,'')) < 20 THEN RAISE EXCEPTION 'allegation_too_short'; END IF;
  INSERT INTO public.safeguarding_cases(reporter_user_id, reporter_name, reporter_contact,
    is_anonymous, person_at_risk_initials, person_at_risk_age_band, immediate_danger,
    location, project_id, allegation_summary)
  VALUES (
    CASE WHEN _anonymous THEN NULL ELSE auth.uid() END,
    CASE WHEN _anonymous THEN NULL ELSE _reporter_name END,
    CASE WHEN _anonymous THEN NULL ELSE _reporter_contact END,
    _anonymous, _person_initials, _person_age_band, _immediate_danger,
    _location, _project_id, _allegation)
  RETURNING id, reference_number INTO _id, _ref;
  INSERT INTO public.safeguarding_case_events(case_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'reporter', 'submitted',
      jsonb_build_object('immediate_danger',_immediate_danger,'anonymous',_anonymous));
  RETURN jsonb_build_object('id',_id,'reference_number',_ref,'urgent',_immediate_danger);
END $$;
REVOKE ALL ON FUNCTION public.safeguarding_report(text,boolean,text,text,text,uuid,text,text,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.safeguarding_report(text,boolean,text,text,text,uuid,text,text,boolean) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.safeguarding_add_chronology(_id uuid, _entry text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.is_safeguarding_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.safeguarding_cases
     SET chronology = coalesce(chronology,'[]'::jsonb) ||
       jsonb_build_array(jsonb_build_object('at',now(),'by',auth.uid(),'entry',_entry))
   WHERE id=_id;
  INSERT INTO public.safeguarding_case_events(case_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'officer', 'chronology_added', jsonb_build_object('entry',_entry));
END $$;
REVOKE ALL ON FUNCTION public.safeguarding_add_chronology(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.safeguarding_add_chronology(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.safeguarding_set_status(
  _id uuid, _status public.safeguarding_status, _note text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.is_safeguarding_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.safeguarding_cases SET status=_status,
    closed_at = CASE WHEN _status::text LIKE 'closed_%' AND closed_at IS NULL THEN now() ELSE closed_at END
  WHERE id=_id;
  INSERT INTO public.safeguarding_case_events(case_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'officer', 'status_change', jsonb_build_object('status',_status,'note',_note));
END $$;
REVOKE ALL ON FUNCTION public.safeguarding_set_status(uuid,public.safeguarding_status,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.safeguarding_set_status(uuid,public.safeguarding_status,text) TO authenticated;

-- ========================== INCIDENTS ==========================
DO $$ BEGIN
  CREATE TYPE public.incident_kind AS ENUM ('security_incident','personal_data_breach','payment_incident','fraud','availability_outage','unauthorised_access','evidence_disclosure','lost_device','provider_incident');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.incident_severity AS ENUM ('low','medium','high','critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.incident_status AS ENUM ('open','triage','containing','investigating','recovering','notified','closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text NOT NULL UNIQUE DEFAULT generate_ref('INC'),
  kind public.incident_kind NOT NULL,
  severity public.incident_severity NOT NULL DEFAULT 'medium',
  status public.incident_status NOT NULL DEFAULT 'open',
  discovered_at timestamptz NOT NULL DEFAULT now(),
  discovered_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  short_summary text NOT NULL, detail text NOT NULL,
  affected_systems text, affected_people_count integer, affected_people_categories text,
  containment_actions text, evidence_refs text,
  timeline jsonb NOT NULL DEFAULT '[]'::jsonb,
  risk_assessment text, notification_decision text,
  regulator_notification_required boolean,
  regulator_notified_at timestamptz, affected_persons_notified_at timestamptz,
  recovery_summary text, lessons_learned text,
  approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.incident_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id uuid NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role text, event_type text NOT NULL, detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.incidents TO authenticated;
GRANT ALL ON public.incidents TO service_role;
GRANT SELECT, INSERT ON public.incident_events TO authenticated;
GRANT ALL ON public.incident_events TO service_role;

ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY inc_officers ON public.incidents FOR ALL TO authenticated
  USING (public.is_incident_officer(auth.uid())
     OR (kind='personal_data_breach' AND public.is_safeguarding_officer(auth.uid())))
  WITH CHECK (public.is_incident_officer(auth.uid()));
CREATE POLICY inc_ev_officers ON public.incident_events FOR ALL TO authenticated
  USING (public.is_incident_officer(auth.uid()))
  WITH CHECK (public.is_incident_officer(auth.uid()));

CREATE TRIGGER trg_inc_ev_append BEFORE UPDATE OR DELETE ON public.incident_events
  FOR EACH ROW EXECUTE FUNCTION public.tg_append_only();
CREATE TRIGGER trg_inc_updated BEFORE UPDATE ON public.incidents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE FUNCTION public.incident_open(
  _kind public.incident_kind, _severity public.incident_severity,
  _short_summary text, _detail text, _affected_systems text DEFAULT NULL
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE _id uuid; _ref text;
BEGIN
  IF NOT public.is_incident_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  INSERT INTO public.incidents(kind, severity, short_summary, detail, affected_systems, discovered_by)
    VALUES (_kind, _severity, _short_summary, _detail, _affected_systems, auth.uid())
    RETURNING id, reference_number INTO _id, _ref;
  INSERT INTO public.incident_events(incident_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'incident_officer', 'opened',
      jsonb_build_object('kind',_kind,'severity',_severity));
  RETURN jsonb_build_object('id',_id,'reference_number',_ref);
END $$;
REVOKE ALL ON FUNCTION public.incident_open(public.incident_kind,public.incident_severity,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.incident_open(public.incident_kind,public.incident_severity,text,text,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.incident_append_timeline(_id uuid, _entry text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.is_incident_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.incidents
     SET timeline = coalesce(timeline,'[]'::jsonb) ||
       jsonb_build_array(jsonb_build_object('at',now(),'by',auth.uid(),'entry',_entry))
   WHERE id=_id;
  INSERT INTO public.incident_events(incident_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'incident_officer', 'timeline_added', jsonb_build_object('entry',_entry));
END $$;
REVOKE ALL ON FUNCTION public.incident_append_timeline(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.incident_append_timeline(uuid,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.incident_record_decision(
  _id uuid, _regulator_required boolean, _decision_text text,
  _regulator_notified_at timestamptz DEFAULT NULL,
  _persons_notified_at timestamptz DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT (public.is_incident_officer(auth.uid()) OR public.is_super_admin(auth.uid())) THEN
    RAISE EXCEPTION 'forbidden'; END IF;
  IF _decision_text IS NULL OR length(trim(_decision_text)) < 20 THEN
    RAISE EXCEPTION 'decision_reasoning_required'; END IF;
  UPDATE public.incidents SET
    regulator_notification_required = _regulator_required,
    notification_decision = _decision_text,
    regulator_notified_at = coalesce(_regulator_notified_at, regulator_notified_at),
    affected_persons_notified_at = coalesce(_persons_notified_at, affected_persons_notified_at),
    approved_by = auth.uid()
  WHERE id=_id;
  INSERT INTO public.incident_events(incident_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'incident_officer', 'decision_recorded',
      jsonb_build_object('regulator_required',_regulator_required));
END $$;
REVOKE ALL ON FUNCTION public.incident_record_decision(uuid,boolean,text,timestamptz,timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.incident_record_decision(uuid,boolean,text,timestamptz,timestamptz) TO authenticated;

CREATE OR REPLACE FUNCTION public.incident_set_status(
  _id uuid, _status public.incident_status, _note text DEFAULT NULL
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.is_incident_officer(auth.uid()) THEN RAISE EXCEPTION 'forbidden'; END IF;
  UPDATE public.incidents SET status=_status,
    closed_at = CASE WHEN _status='closed' AND closed_at IS NULL THEN now() ELSE closed_at END
  WHERE id=_id;
  INSERT INTO public.incident_events(incident_id, actor_id, actor_role, event_type, detail)
    VALUES (_id, auth.uid(), 'incident_officer', 'status_change', jsonb_build_object('status',_status,'note',_note));
END $$;
REVOKE ALL ON FUNCTION public.incident_set_status(uuid,public.incident_status,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.incident_set_status(uuid,public.incident_status,text) TO authenticated;
