
-- =========================================================================
-- OUTPUT 3B: Privacy Governance, Retention & Rights Requests
-- Additive, idempotent. Preserves existing gdpr_requests + legal_acceptances.
-- =========================================================================

-- ---------- shared helpers ----------
CREATE OR REPLACE FUNCTION public.privacy_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Generic audit trigger writing to audit_logs (which already exists).
CREATE OR REPLACE FUNCTION public.privacy_audit_row()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (
    auth.uid(),
    TG_TABLE_NAME || ' ' || TG_OP,
    lower(TG_OP),
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
  );
  RETURN COALESCE(NEW, OLD);
END $$;

-- =========================================================================
-- 1. PROCESSING ACTIVITIES
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_processing_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_code TEXT UNIQUE NOT NULL,
  activity_name TEXT NOT NULL,
  description TEXT,
  purpose TEXT,
  data_subject_categories TEXT[],
  personal_data_categories TEXT[],
  special_category_data BOOLEAN NOT NULL DEFAULT false,
  special_category_condition TEXT,
  criminal_offence_data BOOLEAN NOT NULL DEFAULT false,
  criminal_offence_condition TEXT,
  article_6_lawful_bases TEXT[],
  recognised_legitimate_interest TEXT,
  legitimate_interest_assessment_reference TEXT,
  recipients TEXT[],
  systems_used TEXT[],
  international_transfer_required BOOLEAN NOT NULL DEFAULT false,
  related_transfer_ids UUID[],
  retention_rule_id UUID,
  security_measures_summary TEXT,
  risk_level TEXT NOT NULL DEFAULT 'low' CHECK (risk_level IN ('low','medium','high','very_high')),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  owner_role TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','under_review','retired')),
  last_reviewed_at TIMESTAMPTZ,
  last_reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  next_review_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_processing_activities TO authenticated;
GRANT ALL ON public.privacy_processing_activities TO service_role;
ALTER TABLE public.privacy_processing_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ppa_admin_all" ON public.privacy_processing_activities;
CREATE POLICY "ppa_admin_all" ON public.privacy_processing_activities
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

DROP TRIGGER IF EXISTS trg_ppa_touch ON public.privacy_processing_activities;
CREATE TRIGGER trg_ppa_touch BEFORE UPDATE ON public.privacy_processing_activities
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_ppa_audit ON public.privacy_processing_activities;
CREATE TRIGGER trg_ppa_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_processing_activities
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

-- =========================================================================
-- 2. SERVICE PROVIDERS / PROCESSORS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name TEXT NOT NULL,
  service_description TEXT,
  provider_role TEXT NOT NULL CHECK (provider_role IN
    ('processor','independent_controller','joint_controller','professional_adviser','other')),
  processing_purpose TEXT,
  data_subject_categories TEXT[],
  personal_data_categories TEXT[],
  special_category_access BOOLEAN NOT NULL DEFAULT false,
  systems_or_products TEXT[],
  processing_countries TEXT[],
  hosting_countries TEXT[],
  subprocessor_use BOOLEAN NOT NULL DEFAULT false,
  subprocessor_information TEXT,
  contract_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (contract_status IN ('not_started','requested','under_review','signed','expired','terminated')),
  data_processing_terms_status TEXT,
  contract_reference TEXT,
  contract_start_date DATE,
  contract_end_date DATE,
  security_review_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (security_review_status IN ('not_started','in_progress','satisfactory','action_required','expired')),
  security_review_date DATE,
  international_transfer BOOLEAN NOT NULL DEFAULT false,
  transfer_mechanism TEXT,
  related_transfer_id UUID,
  breach_notification_terms TEXT,
  deletion_or_return_terms TEXT,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  risk_level TEXT NOT NULL DEFAULT 'low' CHECK (risk_level IN ('low','medium','high','very_high')),
  next_review_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'prospective'
    CHECK (status IN ('prospective','active','suspended','ended')),
  notes TEXT,
  supporting_document_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_service_providers TO authenticated;
GRANT ALL ON public.privacy_service_providers TO service_role;
ALTER TABLE public.privacy_service_providers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "psp_admin_all" ON public.privacy_service_providers;
CREATE POLICY "psp_admin_all" ON public.privacy_service_providers
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP TRIGGER IF EXISTS trg_psp_touch ON public.privacy_service_providers;
CREATE TRIGGER trg_psp_touch BEFORE UPDATE ON public.privacy_service_providers
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_psp_audit ON public.privacy_service_providers;
CREATE TRIGGER trg_psp_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_service_providers
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

-- =========================================================================
-- 3. INTERNATIONAL TRANSFERS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_international_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transfer_reference TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_role TEXT NOT NULL CHECK (recipient_role IN
    ('processor','independent_controller','joint_controller','Project_Team','delivery_partner','adviser','other')),
  destination_country TEXT,
  onward_transfer_countries TEXT[],
  purpose TEXT,
  data_subject_categories TEXT[],
  personal_data_categories TEXT[],
  special_category_data BOOLEAN NOT NULL DEFAULT false,
  frequency TEXT CHECK (frequency IN ('one_off','occasional','recurring','continuous_remote_access')),
  transfer_method TEXT,
  transfer_mechanism TEXT NOT NULL DEFAULT 'not_yet_determined'
    CHECK (transfer_mechanism IN
      ('adequacy','UK_IDTA','UK_Addendum','binding_corporate_rules',
       'statutory_instrument','permitted_exception','not_yet_determined')),
  mechanism_reference TEXT,
  transfer_risk_assessment_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (transfer_risk_assessment_status IN ('not_started','in_progress','approved','changes_required','expired')),
  risk_assessment_reference TEXT,
  risk_assessment_date DATE,
  assessed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  supplementary_safeguards TEXT,
  encryption_or_access_controls TEXT,
  contract_status TEXT,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  effective_date DATE,
  review_date DATE,
  status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed','active','suspended','ended')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_international_transfers TO authenticated;
GRANT ALL ON public.privacy_international_transfers TO service_role;
ALTER TABLE public.privacy_international_transfers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pit_admin_all" ON public.privacy_international_transfers;
CREATE POLICY "pit_admin_all" ON public.privacy_international_transfers
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP TRIGGER IF EXISTS trg_pit_touch ON public.privacy_international_transfers;
CREATE TRIGGER trg_pit_touch BEFORE UPDATE ON public.privacy_international_transfers
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_pit_audit ON public.privacy_international_transfers;
CREATE TRIGGER trg_pit_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_international_transfers
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

CREATE SEQUENCE IF NOT EXISTS public.privacy_transfer_seq START 1;
CREATE OR REPLACE FUNCTION public.generate_transfer_reference()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.privacy_transfer_seq');
  RETURN 'GHAT-TR-' || to_char(now(),'YYYY') || '-' || lpad(n::text,4,'0');
END $$;

-- =========================================================================
-- 4. RETENTION RULES
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_retention_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_code TEXT UNIQUE NOT NULL,
  record_category TEXT NOT NULL,
  description TEXT,
  retention_start_event TEXT,
  default_retention_value INT,
  default_retention_unit TEXT NOT NULL CHECK (default_retention_unit IN
    ('days','months','years','permanent','case_specific')),
  review_required BOOLEAN NOT NULL DEFAULT true,
  ordinary_action TEXT NOT NULL CHECK (ordinary_action IN
    ('review','anonymise_after_review','delete_after_review','retain_permanently','case_specific_review')),
  automatic_deletion_allowed BOOLEAN NOT NULL DEFAULT false,
  sensitive_exclusion BOOLEAN NOT NULL DEFAULT false,
  legal_or_governance_reason TEXT,
  related_privacy_notice_section TEXT,
  version INT NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT true,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_retention_rules TO authenticated;
GRANT ALL ON public.privacy_retention_rules TO service_role;
ALTER TABLE public.privacy_retention_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prr_admin_all" ON public.privacy_retention_rules;
CREATE POLICY "prr_admin_all" ON public.privacy_retention_rules
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP TRIGGER IF EXISTS trg_prr_touch ON public.privacy_retention_rules;
CREATE TRIGGER trg_prr_touch BEFORE UPDATE ON public.privacy_retention_rules
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_prr_audit ON public.privacy_retention_rules;
CREATE TRIGGER trg_prr_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_retention_rules
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

-- FK from processing activities to retention rules
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ppa_retention_rule_fk') THEN
    ALTER TABLE public.privacy_processing_activities
      ADD CONSTRAINT ppa_retention_rule_fk FOREIGN KEY (retention_rule_id)
      REFERENCES public.privacy_retention_rules(id) ON DELETE SET NULL;
  END IF;
END $$;

-- =========================================================================
-- 5. RETENTION HOLDS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_retention_holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hold_reference TEXT UNIQUE NOT NULL,
  scope_type TEXT NOT NULL CHECK (scope_type IN
    ('individual','user','project','donation','complaint','service_request',
     'safeguarding_case','data_category','system','other')),
  scope_id UUID,
  record_categories TEXT[],
  reason TEXT NOT NULL CHECK (reason IN
    ('litigation','threatened_claim','investigation','safeguarding',
     'regulatory_request','fraud','audit','protected_concern','legal_advice','other')),
  detailed_reason TEXT,
  applied_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  review_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','under_review','released')),
  released_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  released_at TIMESTAMPTZ,
  release_reason TEXT,
  supporting_document_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_retention_holds TO authenticated;
GRANT ALL ON public.privacy_retention_holds TO service_role;
ALTER TABLE public.privacy_retention_holds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prh_admin_all" ON public.privacy_retention_holds;
CREATE POLICY "prh_admin_all" ON public.privacy_retention_holds
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP TRIGGER IF EXISTS trg_prh_touch ON public.privacy_retention_holds;
CREATE TRIGGER trg_prh_touch BEFORE UPDATE ON public.privacy_retention_holds
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_prh_audit ON public.privacy_retention_holds;
CREATE TRIGGER trg_prh_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_retention_holds
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

CREATE SEQUENCE IF NOT EXISTS public.privacy_hold_seq START 1;
CREATE OR REPLACE FUNCTION public.generate_hold_reference()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.privacy_hold_seq');
  RETURN 'GHAT-HLD-' || to_char(now(),'YYYY') || '-' || lpad(n::text,4,'0');
END $$;

-- =========================================================================
-- 6. RETENTION REVIEWS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.privacy_retention_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_reference TEXT UNIQUE NOT NULL,
  retention_rule_id UUID REFERENCES public.privacy_retention_rules(id) ON DELETE SET NULL,
  record_type TEXT,
  record_id UUID,
  record_summary TEXT,
  subject_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  related_project_id UUID,
  related_donation_id UUID,
  review_due_at TIMESTAMPTZ,
  hold_status TEXT DEFAULT 'none',
  hold_id UUID REFERENCES public.privacy_retention_holds(id) ON DELETE SET NULL,
  sensitivity TEXT NOT NULL DEFAULT 'routine' CHECK (sensitivity IN
    ('routine','confidential','finance_restricted','due_diligence_restricted','safeguarding_restricted')),
  status TEXT NOT NULL DEFAULT 'due' CHECK (status IN
    ('due','in_review','retain','defer','anonymise_approved','delete_approved','completed','excluded')),
  proposed_action TEXT,
  decision TEXT,
  decision_reason TEXT,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  deferred_until TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  audit_event_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.privacy_retention_reviews TO authenticated;
GRANT ALL ON public.privacy_retention_reviews TO service_role;
ALTER TABLE public.privacy_retention_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_retention_reviews FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prv_admin_all" ON public.privacy_retention_reviews;
CREATE POLICY "prv_admin_all" ON public.privacy_retention_reviews
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP TRIGGER IF EXISTS trg_prv_touch ON public.privacy_retention_reviews;
CREATE TRIGGER trg_prv_touch BEFORE UPDATE ON public.privacy_retention_reviews
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_prv_audit ON public.privacy_retention_reviews;
CREATE TRIGGER trg_prv_audit AFTER INSERT OR UPDATE OR DELETE ON public.privacy_retention_reviews
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

CREATE SEQUENCE IF NOT EXISTS public.privacy_review_seq START 1;
CREATE OR REPLACE FUNCTION public.generate_review_reference()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.privacy_review_seq');
  RETURN 'GHAT-REV-' || to_char(now(),'YYYY') || '-' || lpad(n::text,5,'0');
END $$;

-- Guard: an active hold blocks delete/anonymise decisions
CREATE OR REPLACE FUNCTION public.enforce_hold_on_retention_review()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE hold_active BOOLEAN;
BEGIN
  IF NEW.status IN ('anonymise_approved','delete_approved') THEN
    IF NEW.hold_id IS NOT NULL THEN
      SELECT (status='active') INTO hold_active FROM public.privacy_retention_holds WHERE id = NEW.hold_id;
      IF hold_active THEN
        RAISE EXCEPTION 'An active retention hold prevents deletion or anonymisation of this record.';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_prv_hold_guard ON public.privacy_retention_reviews;
CREATE TRIGGER trg_prv_hold_guard BEFORE INSERT OR UPDATE ON public.privacy_retention_reviews
  FOR EACH ROW EXECUTE FUNCTION public.enforce_hold_on_retention_review();

-- =========================================================================
-- 7. RIGHTS REQUESTS (canonical). Preserves existing gdpr_requests table.
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.rights_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,
  requester_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  requester_name TEXT,
  requester_contact TEXT NOT NULL,
  representative_name TEXT,
  representative_authority_status TEXT,
  request_type TEXT NOT NULL CHECK (request_type IN
    ('access','rectification','erasure','restriction','objection','portability',
     'withdrawal_of_consent','automated_decision_review','information_request','other')),
  request_description TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'website' CHECK (channel IN
    ('website','portal','email','post','telephone','verbal','social_media','other')),
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  identity_status TEXT NOT NULL DEFAULT 'not_started' CHECK (identity_status IN
    ('not_required','not_started','requested','partially_verified','verified','failed')),
  identity_requested_at TIMESTAMPTZ,
  identity_verified_at TIMESTAMPTZ,
  authority_verified_at TIMESTAMPTZ,
  clock_start_at TIMESTAMPTZ,
  due_at TIMESTAMPTZ,
  clock_paused_at TIMESTAMPTZ,
  pause_reason TEXT,
  clock_resumed_at TIMESTAMPTZ,
  extension_applied BOOLEAN NOT NULL DEFAULT false,
  extension_reason TEXT,
  extension_notified_at TIMESTAMPTZ,
  extended_due_at TIMESTAMPTZ,
  clarification_requested_at TIMESTAMPTZ,
  clarification_received_at TIMESTAMPTZ,
  scope TEXT,
  systems_to_search TEXT[],
  searches_completed TEXT[],
  third_party_information_review TEXT,
  exemption_review TEXT,
  exemption_reasons TEXT[],
  decision TEXT NOT NULL DEFAULT 'pending' CHECK (decision IN
    ('pending','fulfil','fulfil_in_part','refuse','withdrawn')),
  response_summary TEXT,
  response_package_reference TEXT,
  secure_delivery_method TEXT,
  completed_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN
    ('received','identity_verification','clarification_required','searching',
     'third_party_review','exemption_review','response_preparation','response_ready',
     'completed','refused_in_part','refused','withdrawn')),
  internal_notes TEXT,
  linked_gdpr_request_id UUID REFERENCES public.gdpr_requests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.rights_requests TO authenticated;
GRANT ALL ON public.rights_requests TO service_role;
ALTER TABLE public.rights_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rr_admin_all" ON public.rights_requests;
CREATE POLICY "rr_admin_all" ON public.rights_requests
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "rr_owner_read" ON public.rights_requests;
CREATE POLICY "rr_owner_read" ON public.rights_requests
  FOR SELECT TO authenticated USING (requester_user_id = auth.uid());

-- Owners may not update or delete their submitted requests.
DROP TRIGGER IF EXISTS trg_rr_touch ON public.rights_requests;
CREATE TRIGGER trg_rr_touch BEFORE UPDATE ON public.rights_requests
  FOR EACH ROW EXECUTE FUNCTION public.privacy_touch_updated_at();
DROP TRIGGER IF EXISTS trg_rr_audit ON public.rights_requests;
CREATE TRIGGER trg_rr_audit AFTER INSERT OR UPDATE OR DELETE ON public.rights_requests
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

CREATE SEQUENCE IF NOT EXISTS public.rights_request_seq START 1;
CREATE OR REPLACE FUNCTION public.generate_rights_request_reference()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.rights_request_seq');
  RETURN 'GHAT-DPR-' || to_char(now(),'YYYY') || '-' || lpad(n::text,5,'0');
END $$;

-- Event history
CREATE TABLE IF NOT EXISTS public.rights_request_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.rights_requests(id) ON DELETE CASCADE,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role TEXT,
  event_type TEXT NOT NULL,
  detail JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.rights_request_events TO authenticated;
GRANT ALL ON public.rights_request_events TO service_role;
ALTER TABLE public.rights_request_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rre_admin_all" ON public.rights_request_events;
CREATE POLICY "rre_admin_all" ON public.rights_request_events
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- Safe view for owners (no internal notes, no exemption text, no third-party info)
CREATE OR REPLACE VIEW public.my_rights_requests AS
  SELECT id, reference_number, request_type, status, decision,
         received_at, due_at, extended_due_at, completed_at,
         (identity_status IN ('requested','partially_verified','failed')) AS identity_action_needed,
         (clarification_requested_at IS NOT NULL AND clarification_received_at IS NULL) AS clarification_needed
  FROM public.rights_requests
  WHERE requester_user_id = auth.uid();
GRANT SELECT ON public.my_rights_requests TO authenticated;

-- Public/anonymous submission (SECURITY DEFINER; tightly scoped inputs)
CREATE OR REPLACE FUNCTION public.submit_rights_request(
  _request_type TEXT, _request_description TEXT,
  _requester_contact TEXT, _requester_name TEXT,
  _representative_name TEXT DEFAULT NULL,
  _channel TEXT DEFAULT 'website'
) RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id UUID; v_ref TEXT; v_uid UUID := auth.uid();
BEGIN
  IF _request_description IS NULL OR length(trim(_request_description)) < 5 THEN
    RAISE EXCEPTION 'Please describe your request.';
  END IF;
  IF _requester_contact IS NULL OR length(trim(_requester_contact)) < 3 THEN
    RAISE EXCEPTION 'Contact information is required.';
  END IF;
  v_ref := public.generate_rights_request_reference();
  INSERT INTO public.rights_requests(
    reference_number, requester_user_id, requester_name, requester_contact,
    representative_name, request_type, request_description, channel,
    identity_status
  ) VALUES (
    v_ref, v_uid,
    COALESCE(_requester_name, ''),
    _requester_contact,
    _representative_name,
    _request_type, _request_description, _channel,
    CASE WHEN v_uid IS NOT NULL THEN 'not_required' ELSE 'not_started' END
  ) RETURNING id INTO v_id;

  INSERT INTO public.rights_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (v_id, v_uid, CASE WHEN v_uid IS NULL THEN 'anonymous' ELSE 'user' END,
          'received', jsonb_build_object('channel', _channel, 'request_type', _request_type));

  RETURN v_ref;
END $$;
REVOKE ALL ON FUNCTION public.submit_rights_request(text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_rights_request(text,text,text,text,text,text) TO anon, authenticated;

-- Admin helpers
CREATE OR REPLACE FUNCTION public.rr_add_event(
  _request_id UUID, _event_type TEXT, _detail JSONB DEFAULT '{}'::jsonb
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id UUID;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.rights_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), 'admin', _event_type, _detail) RETURNING id INTO v_id;
  RETURN v_id;
END $$;

-- Set / recalc due date using one calendar month.
CREATE OR REPLACE FUNCTION public.rr_set_clock_start(_request_id UUID, _start TIMESTAMPTZ)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  UPDATE public.rights_requests
    SET clock_start_at = _start,
        due_at = _start + interval '1 month'
    WHERE id = _request_id;
  PERFORM public.rr_add_event(_request_id, 'clock_started', jsonb_build_object('start', _start));
END $$;

CREATE OR REPLACE FUNCTION public.rr_apply_extension(_request_id UUID, _reason TEXT, _months INT DEFAULT 2)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE base TIMESTAMPTZ;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF _months < 1 OR _months > 2 THEN RAISE EXCEPTION 'Extension must be 1 or 2 months'; END IF;
  IF _reason IS NULL OR length(trim(_reason))=0 THEN RAISE EXCEPTION 'Reason required'; END IF;
  SELECT COALESCE(due_at, clock_start_at, received_at) INTO base FROM public.rights_requests WHERE id=_request_id;
  UPDATE public.rights_requests
    SET extension_applied = true,
        extension_reason = _reason,
        extension_notified_at = COALESCE(extension_notified_at, now()),
        extended_due_at = base + (_months || ' months')::interval
    WHERE id = _request_id;
  PERFORM public.rr_add_event(_request_id, 'extension_applied',
    jsonb_build_object('reason',_reason,'months',_months));
END $$;

-- =========================================================================
-- 8. SEED RETENTION SCHEDULE from Privacy Notice §18 (idempotent)
-- =========================================================================
INSERT INTO public.privacy_retention_rules
  (rule_code, record_category, description, default_retention_value, default_retention_unit,
   ordinary_action, automatic_deletion_allowed, sensitive_exclusion, related_privacy_notice_section, legal_or_governance_reason)
VALUES
  ('R-CONTACT','Website contact enquiries','Enquiries submitted via the public contact form',24,'months','review',false,false,'18','Legitimate interest, service response'),
  ('R-PORTAL','Portal account and profile information','User account and profile records',NULL,'case_specific','review',false,false,'18','Account lifecycle'),
  ('R-TERMS','Website and Portal Terms acceptances','Legal acceptance ledger',NULL,'permanent','retain_permanently',false,true,'18','Legal audit'),
  ('R-PRIVACY-ACK','Privacy Notice acknowledgements','Privacy acknowledgement ledger',NULL,'permanent','retain_permanently',false,true,'18','Legal audit'),
  ('R-DONATION','Donation, payment, allocation and refund records','Donation financial records',7,'years','review',false,true,'18','Statutory financial retention'),
  ('R-RESTRICTED-FUND','Restricted-fund and project-finance records','Restricted-fund financial records',7,'years','review',false,true,'18','Statutory financial retention'),
  ('R-DUEDIL','Donor due-diligence, source-of-funds and sanctions records','Due diligence records',7,'years','review',false,true,'18','Regulatory and anti-financial-crime'),
  ('R-CHARTERS','Project Charters, agreements and change records','Project delivery agreements',10,'years','review',false,true,'18','Contract audit'),
  ('R-EXPENSES','Project expenses, receipts and financial evidence','Delivery expenditure records',7,'years','review',false,true,'18','Financial audit'),
  ('R-PROJECT-REPORTS','Project reports, milestones and audit history','Project delivery audit',10,'years','review',false,true,'18','Delivery accountability'),
  ('R-UNSUCCESSFUL-TEAM','Unsuccessful Project Team applications','Rejected applications',12,'months','delete_after_review',false,false,'18','Recruitment fairness'),
  ('R-TEAM-ASSIGNMENT','Project Team assignment and delivery records','Team delivery history',10,'years','review',false,true,'18','Delivery accountability'),
  ('R-REFERENCES','References and eligibility checks','Reference records',6,'years','review',false,true,'18','Team suitability'),
  ('R-BACKGROUND','Background-check information','Background check outcomes',NULL,'case_specific','case_specific_review',false,true,'18','Safeguarding governance'),
  ('R-SUPPORT','Routine support requests','Support centre requests',3,'years','review',false,false,'18','Service history'),
  ('R-COMPLAINTS','Formal complaints','Complaints file',7,'years','review',false,true,'18','Governance and accountability'),
  ('R-SAFEGUARDING','Safeguarding records','Safeguarding case file',NULL,'permanent','retain_permanently',false,true,'18','Safeguarding duty'),
  ('R-WHISTLEBLOWING','Protected concerns and whistleblowing records','Whistleblowing records',NULL,'permanent','retain_permanently',false,true,'18','Statutory whistleblowing protection'),
  ('R-FIELD-EVIDENCE','Field photographs, video and identifiable media','Identifiable media',NULL,'case_specific','case_specific_review',false,true,'18','Consent and dignity'),
  ('R-MEDIA-CONSENT','Consent and media-permission records','Media consent register',NULL,'permanent','retain_permanently',false,true,'18','Evidence of lawful basis'),
  ('R-SEC-LOGS','Security and authentication logs','Authentication logs',24,'months','review',false,false,'18','Security incident support'),
  ('R-INCIDENT','Security-incident and data-breach records','Incident register',7,'years','review',false,true,'18','Regulatory obligation'),
  ('R-DPR','Data-protection rights requests','Rights request register',3,'years','review',false,false,'18','Regulator evidence'),
  ('R-COOKIE','Cookie and consent-preference records','Cookie preference records',24,'months','review',false,false,'18','Evidence of consent'),
  ('R-COMMS','Marketing and communication preferences','Communication preferences',NULL,'case_specific','review',false,false,'18','Preference management'),
  ('R-ADVISER','Professional adviser, supplier and delivery-partner records','Adviser and supplier records',7,'years','review',false,true,'18','Contract audit'),
  ('R-GOVERNANCE','Trustee and governance records','Trustee records',NULL,'permanent','retain_permanently',false,true,'18','Charitable governance')
ON CONFLICT (rule_code) DO NOTHING;

-- =========================================================================
-- 9. SEED PROCESSING ACTIVITY DRAFT TEMPLATES (idempotent, editable, draft)
-- =========================================================================
INSERT INTO public.privacy_processing_activities
  (activity_code, activity_name, description, purpose, status, risk_level)
VALUES
  ('PA-WEB','Website and Portal administration','Draft template: operating the public website and secure portals','Service delivery','draft','low'),
  ('PA-DONOR','Donor relationship management','Draft template: managing donor relationships','Donor engagement','draft','medium'),
  ('PA-DONATION','Donations and financial records','Draft template: processing donations','Financial administration','draft','medium'),
  ('PA-DUEDIL','Donor due diligence','Draft template: source-of-funds and sanctions checks','Regulatory','draft','high'),
  ('PA-PROJECT','Project commissioning and delivery','Draft template: charitable project delivery','Delivery','draft','medium'),
  ('PA-TEAM','Project Team administration','Draft template: Project Team lifecycle','Delivery workforce','draft','medium'),
  ('PA-EVIDENCE','Field evidence and reporting','Draft template: capturing and safeguarding field evidence','Accountability','draft','high'),
  ('PA-SUPPORT','Project Support Centre','Draft template: routine and formal support','Service','draft','low'),
  ('PA-COMPLAINTS','Complaints','Draft template: complaints handling','Governance','draft','medium'),
  ('PA-SAFEGUARDING','Safeguarding and protected concerns','Draft template: safeguarding case management','Safeguarding duty','draft','very_high'),
  ('PA-SECURITY','Website security and authentication','Draft template: authentication and security logging','Security','draft','medium'),
  ('PA-RIGHTS','Rights requests','Draft template: handling data-protection rights requests','Rights compliance','draft','medium'),
  ('PA-COMMS','Fundraising communications','Draft template: donor communications','Engagement','draft','low')
ON CONFLICT (activity_code) DO NOTHING;
