
-- Enums
DO $$ BEGIN
  CREATE TYPE public.dd_risk_level AS ENUM ('low','medium','high','prohibited_or_escalated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.dd_case_status AS ENUM (
    'draft','information_requested','under_review','trustee_escalation',
    'approved','declined','returned','on_hold','closed'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.dd_donor_type AS ENUM ('individual','organisation','trust','estate','anonymous','third_party_payer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.dd_screening_type AS ENUM ('sanctions','pep','adverse_media','watchlist');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.dd_screening_result AS ENUM ('clear','possible_match','confirmed_match','false_positive','not_performed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.dd_hold_status AS ENUM ('active','released','converted_to_return','converted_to_decline');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Access helper (finance officer / admin / super admin)
CREATE OR REPLACE FUNCTION public.can_manage_donor_dd(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT public.is_admin(_user_id) OR public.is_finance_officer(_user_id);
$$;
REVOKE ALL ON FUNCTION public.can_manage_donor_dd(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_manage_donor_dd(uuid) TO authenticated;

-- Reference sequence
CREATE SEQUENCE IF NOT EXISTS public.dd_case_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_dd_case_reference()
RETURNS text LANGUAGE plpgsql SET search_path=public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.dd_case_seq');
  RETURN 'GHAT-DD-' || to_char(now(),'YYYY') || '-' || lpad(n::text,5,'0');
END $$;

-- 1. Compliance case
CREATE TABLE public.donor_dd_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_reference text UNIQUE NOT NULL DEFAULT public.generate_dd_case_reference(),
  donor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  donor_display_name text NOT NULL,
  donor_type public.dd_donor_type NOT NULL DEFAULT 'individual',
  primary_country text,
  related_donation_id uuid REFERENCES public.donations(id) ON DELETE SET NULL,
  related_draft_id uuid REFERENCES public.donation_drafts(id) ON DELETE SET NULL,
  related_hvda_id uuid REFERENCES public.high_value_donation_agreements(id) ON DELETE SET NULL,
  trigger_reason text,
  amount_minor bigint,
  currency text DEFAULT 'GBP',
  is_anonymous boolean NOT NULL DEFAULT false,
  is_third_party_payer boolean NOT NULL DEFAULT false,
  status public.dd_case_status NOT NULL DEFAULT 'draft',
  overall_risk public.dd_risk_level,
  risk_factors jsonb NOT NULL DEFAULT '{}'::jsonb,
  risk_rationale text,
  trustee_escalation_required boolean NOT NULL DEFAULT false,
  adviser_involved boolean NOT NULL DEFAULT false,
  adviser_details text,
  decision text,
  decision_reason text,
  decided_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  decided_at timestamptz,
  next_review_due date,
  expiry_or_recheck_date date,
  screening_provider_configured boolean NOT NULL DEFAULT false,
  screening_method text NOT NULL DEFAULT 'manual_documented',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.donor_dd_cases TO authenticated;
GRANT ALL ON public.donor_dd_cases TO service_role;
ALTER TABLE public.donor_dd_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_cases_managers_read" ON public.donor_dd_cases FOR SELECT TO authenticated
  USING (public.can_manage_donor_dd(auth.uid()));
CREATE POLICY "dd_cases_managers_write" ON public.donor_dd_cases FOR INSERT TO authenticated
  WITH CHECK (public.can_manage_donor_dd(auth.uid()));
CREATE POLICY "dd_cases_managers_update" ON public.donor_dd_cases FOR UPDATE TO authenticated
  USING (public.can_manage_donor_dd(auth.uid())) WITH CHECK (public.can_manage_donor_dd(auth.uid()));

CREATE TRIGGER trg_dd_cases_updated BEFORE UPDATE ON public.donor_dd_cases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 2. Identity records (individuals, organisations, representatives, beneficial owners)
CREATE TABLE public.donor_dd_identity_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.donor_dd_cases(id) ON DELETE CASCADE,
  record_type text NOT NULL CHECK (record_type IN ('individual','organisation','representative','beneficial_owner','third_party_payer')),
  full_name text NOT NULL,
  role_or_title text,
  date_of_birth date,
  nationality text,
  country_of_residence text,
  organisation_name text,
  organisation_type text,
  registration_number text,
  registered_address text,
  ownership_percent numeric,
  authority_evidence text,
  identity_evidence_summary text,
  evidence_document_reference text,
  verified_at timestamptz,
  verified_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donor_dd_identity_records TO authenticated;
GRANT ALL ON public.donor_dd_identity_records TO service_role;
ALTER TABLE public.donor_dd_identity_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_identity_managers_all" ON public.donor_dd_identity_records FOR ALL TO authenticated
  USING (public.can_manage_donor_dd(auth.uid())) WITH CHECK (public.can_manage_donor_dd(auth.uid()));
CREATE TRIGGER trg_dd_identity_updated BEFORE UPDATE ON public.donor_dd_identity_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 3. Screening records (sanctions / PEP / adverse media)
CREATE TABLE public.donor_dd_screening (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.donor_dd_cases(id) ON DELETE CASCADE,
  identity_record_id uuid REFERENCES public.donor_dd_identity_records(id) ON DELETE CASCADE,
  screening_type public.dd_screening_type NOT NULL,
  method text NOT NULL DEFAULT 'manual_documented',
  provider text,
  performed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  performed_at timestamptz NOT NULL DEFAULT now(),
  result public.dd_screening_result NOT NULL DEFAULT 'not_performed',
  match_details text,
  false_positive_reason text,
  evidence_reference text,
  recheck_due date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donor_dd_screening TO authenticated;
GRANT ALL ON public.donor_dd_screening TO service_role;
ALTER TABLE public.donor_dd_screening ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_screening_managers_all" ON public.donor_dd_screening FOR ALL TO authenticated
  USING (public.can_manage_donor_dd(auth.uid())) WITH CHECK (public.can_manage_donor_dd(auth.uid()));

-- 4. Source of funds / source of wealth / adverse information evidence
CREATE TABLE public.donor_dd_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.donor_dd_cases(id) ON DELETE CASCADE,
  evidence_type text NOT NULL CHECK (evidence_type IN (
    'source_of_funds','source_of_wealth','adverse_information','fraud_indicator',
    'conflict_of_interest','payment_route_evidence','other'
  )),
  summary text NOT NULL,
  detail text,
  document_reference text,
  obtained_from text,
  proportionality_note text,
  recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donor_dd_evidence TO authenticated;
GRANT ALL ON public.donor_dd_evidence TO service_role;
ALTER TABLE public.donor_dd_evidence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_evidence_managers_all" ON public.donor_dd_evidence FOR ALL TO authenticated
  USING (public.can_manage_donor_dd(auth.uid())) WITH CHECK (public.can_manage_donor_dd(auth.uid()));

-- 5. Compliance holds (freeze donations)
CREATE TABLE public.donor_dd_holds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.donor_dd_cases(id) ON DELETE CASCADE,
  donation_id uuid REFERENCES public.donations(id) ON DELETE SET NULL,
  draft_id uuid REFERENCES public.donation_drafts(id) ON DELETE SET NULL,
  reason text NOT NULL,
  amount_minor bigint,
  currency text DEFAULT 'GBP',
  status public.dd_hold_status NOT NULL DEFAULT 'active',
  placed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  placed_at timestamptz NOT NULL DEFAULT now(),
  released_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  released_at timestamptz,
  release_reason text
);
GRANT SELECT, INSERT, UPDATE ON public.donor_dd_holds TO authenticated;
GRANT ALL ON public.donor_dd_holds TO service_role;
ALTER TABLE public.donor_dd_holds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_holds_managers_all" ON public.donor_dd_holds FOR ALL TO authenticated
  USING (public.can_manage_donor_dd(auth.uid())) WITH CHECK (public.can_manage_donor_dd(auth.uid()));

-- 6. Immutable audit events
CREATE TABLE public.donor_dd_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.donor_dd_cases(id) ON DELETE CASCADE,
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.donor_dd_events TO authenticated;
GRANT ALL ON public.donor_dd_events TO service_role;
ALTER TABLE public.donor_dd_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dd_events_managers_read" ON public.donor_dd_events FOR SELECT TO authenticated
  USING (public.can_manage_donor_dd(auth.uid()));
CREATE POLICY "dd_events_managers_insert" ON public.donor_dd_events FOR INSERT TO authenticated
  WITH CHECK (public.can_manage_donor_dd(auth.uid()));

-- Block updates/deletes on events (immutability) — no UPDATE/DELETE grants above; RLS defaults deny.
-- Also prevent superuser accidental changes via triggers.
CREATE OR REPLACE FUNCTION public.dd_events_immutable()
RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  RAISE EXCEPTION 'Donor DD events are immutable';
END $$;
CREATE TRIGGER trg_dd_events_no_update BEFORE UPDATE ON public.donor_dd_events
  FOR EACH ROW EXECUTE FUNCTION public.dd_events_immutable();
CREATE TRIGGER trg_dd_events_no_delete BEFORE DELETE ON public.donor_dd_events
  FOR EACH ROW EXECUTE FUNCTION public.dd_events_immutable();

-- RPC: open a case
CREATE OR REPLACE FUNCTION public.dd_open_case(
  _donor_display_name text,
  _donor_type public.dd_donor_type,
  _primary_country text,
  _amount_minor bigint,
  _currency text,
  _trigger_reason text,
  _donor_user_id uuid DEFAULT NULL,
  _related_donation_id uuid DEFAULT NULL,
  _related_draft_id uuid DEFAULT NULL,
  _related_hvda_id uuid DEFAULT NULL,
  _is_anonymous boolean DEFAULT false,
  _is_third_party_payer boolean DEFAULT false
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.can_manage_donor_dd(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.donor_dd_cases(
    donor_user_id, donor_display_name, donor_type, primary_country,
    related_donation_id, related_draft_id, related_hvda_id,
    trigger_reason, amount_minor, currency,
    is_anonymous, is_third_party_payer, created_by
  ) VALUES (
    _donor_user_id, _donor_display_name, _donor_type, _primary_country,
    _related_donation_id, _related_draft_id, _related_hvda_id,
    _trigger_reason, _amount_minor, COALESCE(_currency,'GBP'),
    COALESCE(_is_anonymous,false), COALESCE(_is_third_party_payer,false), auth.uid()
  ) RETURNING id INTO v_id;
  INSERT INTO public.donor_dd_events(case_id, actor_user_id, event_type, detail)
    VALUES (v_id, auth.uid(), 'case_opened',
      jsonb_build_object('trigger', _trigger_reason, 'amount_minor', _amount_minor));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.dd_open_case(text,public.dd_donor_type,text,bigint,text,text,uuid,uuid,uuid,uuid,boolean,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dd_open_case(text,public.dd_donor_type,text,bigint,text,text,uuid,uuid,uuid,uuid,boolean,boolean) TO authenticated;

-- RPC: update risk / status
CREATE OR REPLACE FUNCTION public.dd_set_risk_and_status(
  _case_id uuid,
  _overall_risk public.dd_risk_level,
  _risk_factors jsonb,
  _risk_rationale text,
  _status public.dd_case_status,
  _trustee_escalation_required boolean,
  _next_review_due date,
  _expiry_or_recheck_date date
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.donor_dd_cases%ROWTYPE;
BEGIN
  IF NOT public.can_manage_donor_dd(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT * INTO c FROM public.donor_dd_cases WHERE id=_case_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case not found'; END IF;
  UPDATE public.donor_dd_cases SET
    overall_risk = COALESCE(_overall_risk, overall_risk),
    risk_factors = COALESCE(_risk_factors, risk_factors),
    risk_rationale = COALESCE(_risk_rationale, risk_rationale),
    status = COALESCE(_status, status),
    trustee_escalation_required = COALESCE(_trustee_escalation_required, trustee_escalation_required),
    next_review_due = COALESCE(_next_review_due, next_review_due),
    expiry_or_recheck_date = COALESCE(_expiry_or_recheck_date, expiry_or_recheck_date)
  WHERE id=_case_id;
  INSERT INTO public.donor_dd_events(case_id, actor_user_id, event_type, detail)
    VALUES (_case_id, auth.uid(), 'risk_status_updated',
      jsonb_build_object('risk', _overall_risk, 'status', _status,
        'escalation', _trustee_escalation_required));
END $$;
REVOKE ALL ON FUNCTION public.dd_set_risk_and_status(uuid,public.dd_risk_level,jsonb,text,public.dd_case_status,boolean,date,date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dd_set_risk_and_status(uuid,public.dd_risk_level,jsonb,text,public.dd_case_status,boolean,date,date) TO authenticated;

-- RPC: decide
CREATE OR REPLACE FUNCTION public.dd_record_decision(
  _case_id uuid,
  _decision text,
  _decision_reason text
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.donor_dd_cases%ROWTYPE; v_status public.dd_case_status;
BEGIN
  IF NOT public.can_manage_donor_dd(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _decision NOT IN ('approve','decline','return','hold') THEN RAISE EXCEPTION 'Invalid decision'; END IF;
  IF _decision_reason IS NULL OR length(trim(_decision_reason))=0 THEN
    RAISE EXCEPTION 'A reason is required for every compliance decision';
  END IF;
  SELECT * INTO c FROM public.donor_dd_cases WHERE id=_case_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case not found'; END IF;
  IF c.overall_risk = 'prohibited_or_escalated' AND _decision = 'approve' THEN
    RAISE EXCEPTION 'A prohibited or escalated case cannot be approved';
  END IF;
  v_status := CASE _decision
    WHEN 'approve' THEN 'approved'::public.dd_case_status
    WHEN 'decline' THEN 'declined'::public.dd_case_status
    WHEN 'return'  THEN 'returned'::public.dd_case_status
    WHEN 'hold'    THEN 'on_hold'::public.dd_case_status
  END;
  UPDATE public.donor_dd_cases SET
    decision=_decision, decision_reason=_decision_reason,
    decided_by=auth.uid(), decided_at=now(), status=v_status
   WHERE id=_case_id;
  INSERT INTO public.donor_dd_events(case_id, actor_user_id, event_type, detail)
    VALUES (_case_id, auth.uid(), 'decision_recorded',
      jsonb_build_object('decision', _decision, 'reason', _decision_reason));
END $$;
REVOKE ALL ON FUNCTION public.dd_record_decision(uuid,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dd_record_decision(uuid,text,text) TO authenticated;

-- RPC: place hold
CREATE OR REPLACE FUNCTION public.dd_place_hold(
  _case_id uuid, _reason text, _donation_id uuid DEFAULT NULL,
  _draft_id uuid DEFAULT NULL, _amount_minor bigint DEFAULT NULL, _currency text DEFAULT 'GBP'
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.can_manage_donor_dd(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.donor_dd_holds(case_id, donation_id, draft_id, reason, amount_minor, currency, placed_by)
  VALUES (_case_id, _donation_id, _draft_id, _reason, _amount_minor, _currency, auth.uid())
  RETURNING id INTO v_id;
  INSERT INTO public.donor_dd_events(case_id, actor_user_id, event_type, detail)
    VALUES (_case_id, auth.uid(), 'hold_placed',
      jsonb_build_object('hold_id', v_id, 'reason', _reason, 'amount_minor', _amount_minor));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.dd_place_hold(uuid,text,uuid,uuid,bigint,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dd_place_hold(uuid,text,uuid,uuid,bigint,text) TO authenticated;

-- RPC: release hold
CREATE OR REPLACE FUNCTION public.dd_release_hold(
  _hold_id uuid, _release_reason text,
  _final_status public.dd_hold_status DEFAULT 'released'
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE h public.donor_dd_holds%ROWTYPE;
BEGIN
  IF NOT public.can_manage_donor_dd(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _release_reason IS NULL OR length(trim(_release_reason))=0 THEN
    RAISE EXCEPTION 'A reason is required to release a compliance hold';
  END IF;
  SELECT * INTO h FROM public.donor_dd_holds WHERE id=_hold_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Hold not found'; END IF;
  IF h.status <> 'active' THEN RAISE EXCEPTION 'Hold already resolved'; END IF;
  UPDATE public.donor_dd_holds SET
    status=_final_status, released_by=auth.uid(), released_at=now(), release_reason=_release_reason
   WHERE id=_hold_id;
  INSERT INTO public.donor_dd_events(case_id, actor_user_id, event_type, detail)
    VALUES (h.case_id, auth.uid(), 'hold_released',
      jsonb_build_object('hold_id', _hold_id, 'final_status', _final_status, 'reason', _release_reason));
END $$;
REVOKE ALL ON FUNCTION public.dd_release_hold(uuid,text,public.dd_hold_status) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.dd_release_hold(uuid,text,public.dd_hold_status) TO authenticated;

-- Guard: prohibited donations cannot be allocated
CREATE OR REPLACE FUNCTION public.dd_block_prohibited_allocation()
RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.donor_dd_cases c
    WHERE c.related_donation_id = NEW.donation_id
      AND (c.overall_risk = 'prohibited_or_escalated' OR c.status IN ('declined','returned','on_hold'))
  ) OR EXISTS (
    SELECT 1 FROM public.donor_dd_holds h
    WHERE h.donation_id = NEW.donation_id AND h.status='active'
  ) THEN
    RAISE EXCEPTION 'Donation is subject to an active compliance hold or prohibited status and cannot be allocated';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_dd_block_alloc ON public.fund_allocations;
CREATE TRIGGER trg_dd_block_alloc BEFORE INSERT OR UPDATE ON public.fund_allocations
  FOR EACH ROW EXECUTE FUNCTION public.dd_block_prohibited_allocation();

-- Register public policy as a legal document
INSERT INTO public.legal_documents(slug, title, category, requires_signup_acceptance, requires_team_acceptance, requires_donation_acceptance)
VALUES ('donor-due-diligence-and-sanctions-policy',
        'Donor Due Diligence and Sanctions Policy',
        'compliance', false, false, false)
ON CONFLICT (slug) DO NOTHING;
