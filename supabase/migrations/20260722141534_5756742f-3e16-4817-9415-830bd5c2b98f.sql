
-- ---------------------------------------------------------------
-- 1. Remove unused staged tables from previous migration
-- ---------------------------------------------------------------
DROP VIEW IF EXISTS public.my_rights_requests;
DROP FUNCTION IF EXISTS public.submit_rights_request(text,text,text,text,text,text);
DROP FUNCTION IF EXISTS public.rr_add_event(uuid, text, jsonb);
DROP FUNCTION IF EXISTS public.rr_set_clock_start(uuid, timestamptz);
DROP FUNCTION IF EXISTS public.rr_apply_extension(uuid, text, int);
DROP FUNCTION IF EXISTS public.generate_rights_request_reference();
DROP SEQUENCE IF EXISTS public.rights_request_seq;
DROP TABLE IF EXISTS public.rights_request_events;
DROP TABLE IF EXISTS public.rights_requests;

-- ---------------------------------------------------------------
-- 2. Extend gdpr_requests additively (preserve all data)
-- ---------------------------------------------------------------
ALTER TABLE public.gdpr_requests
  DROP CONSTRAINT IF EXISTS gdpr_requests_request_type_check;
ALTER TABLE public.gdpr_requests
  ADD CONSTRAINT gdpr_requests_request_type_check CHECK (request_type IN
    ('access','rectification','erasure','restriction','objection','portability',
     'withdrawal_of_consent','automated_decision_review','information_request','other',
     -- legacy values preserved:
     'export','delete'));

-- Allow anonymous (public) submissions
ALTER TABLE public.gdpr_requests ALTER COLUMN user_id DROP NOT NULL;

-- New columns (all additive, all nullable)
ALTER TABLE public.gdpr_requests
  ADD COLUMN IF NOT EXISTS reference_number TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS requester_name TEXT,
  ADD COLUMN IF NOT EXISTS requester_contact TEXT,
  ADD COLUMN IF NOT EXISTS representative_name TEXT,
  ADD COLUMN IF NOT EXISTS representative_authority_status TEXT,
  ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS received_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS identity_status TEXT DEFAULT 'not_started',
  ADD COLUMN IF NOT EXISTS identity_requested_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS identity_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS authority_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clock_start_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS due_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clock_paused_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pause_reason TEXT,
  ADD COLUMN IF NOT EXISTS clock_resumed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS extension_applied BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS extension_reason TEXT,
  ADD COLUMN IF NOT EXISTS extension_notified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS extended_due_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clarification_requested_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS clarification_received_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS scope TEXT,
  ADD COLUMN IF NOT EXISTS systems_to_search TEXT[],
  ADD COLUMN IF NOT EXISTS third_party_information_review TEXT,
  ADD COLUMN IF NOT EXISTS exemption_review TEXT,
  ADD COLUMN IF NOT EXISTS exemption_reasons TEXT[],
  ADD COLUMN IF NOT EXISTS decision TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS response_summary TEXT,
  ADD COLUMN IF NOT EXISTS response_package_reference TEXT,
  ADD COLUMN IF NOT EXISTS secure_delivery_method TEXT,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Reference-number sequence and back-fill
CREATE SEQUENCE IF NOT EXISTS public.gdpr_request_seq START 1;
CREATE OR REPLACE FUNCTION public.generate_gdpr_reference()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n bigint; BEGIN
  n := nextval('public.gdpr_request_seq');
  RETURN 'GHAT-DPR-' || to_char(now(),'YYYY') || '-' || lpad(n::text, 5, '0');
END $$;

UPDATE public.gdpr_requests
  SET reference_number = public.generate_gdpr_reference()
  WHERE reference_number IS NULL;

UPDATE public.gdpr_requests
  SET received_at = COALESCE(received_at, created_at)
  WHERE received_at IS NULL;

UPDATE public.gdpr_requests
  SET requester_contact = COALESCE(requester_contact, email)
  WHERE requester_contact IS NULL;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.gdpr_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
DROP TRIGGER IF EXISTS trg_gdpr_touch ON public.gdpr_requests;
CREATE TRIGGER trg_gdpr_touch BEFORE UPDATE ON public.gdpr_requests
  FOR EACH ROW EXECUTE FUNCTION public.gdpr_touch_updated_at();

-- Audit history reuse
DROP TRIGGER IF EXISTS trg_gdpr_audit ON public.gdpr_requests;
CREATE TRIGGER trg_gdpr_audit AFTER INSERT OR UPDATE OR DELETE ON public.gdpr_requests
  FOR EACH ROW EXECUTE FUNCTION public.privacy_audit_row();

-- ---------------------------------------------------------------
-- 3. gdpr_request_events history
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gdpr_request_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.gdpr_requests(id) ON DELETE CASCADE,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_role TEXT,
  event_type TEXT NOT NULL,
  detail JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.gdpr_request_events TO authenticated;
GRANT ALL ON public.gdpr_request_events TO service_role;
ALTER TABLE public.gdpr_request_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gdpr_events_admin_all" ON public.gdpr_request_events;
CREATE POLICY "gdpr_events_admin_all" ON public.gdpr_request_events
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ---------------------------------------------------------------
-- 4. RPCs pointing at gdpr_requests
-- ---------------------------------------------------------------
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
  v_ref := public.generate_gdpr_reference();
  INSERT INTO public.gdpr_requests(
    user_id, email, request_type, request_details, status,
    reference_number, requester_name, requester_contact,
    representative_name, channel, received_at, identity_status
  ) VALUES (
    v_uid, _requester_contact, _request_type, _request_description, 'pending',
    v_ref, COALESCE(_requester_name,''), _requester_contact,
    _representative_name, _channel, now(),
    CASE WHEN v_uid IS NOT NULL THEN 'not_required' ELSE 'not_started' END
  ) RETURNING id INTO v_id;

  INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (v_id, v_uid, CASE WHEN v_uid IS NULL THEN 'anonymous' ELSE 'user' END,
          'received', jsonb_build_object('channel', _channel, 'request_type', _request_type));

  RETURN v_ref;
END $$;
REVOKE ALL ON FUNCTION public.submit_rights_request(text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_rights_request(text,text,text,text,text,text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.rr_add_event(
  _request_id UUID, _event_type TEXT, _detail JSONB DEFAULT '{}'::jsonb
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id UUID;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (_request_id, auth.uid(), 'admin', _event_type, _detail) RETURNING id INTO v_id;
  RETURN v_id;
END $$;

CREATE OR REPLACE FUNCTION public.rr_set_clock_start(_request_id UUID, _start TIMESTAMPTZ)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  UPDATE public.gdpr_requests
    SET clock_start_at = _start, due_at = _start + interval '1 month'
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
  SELECT COALESCE(due_at, clock_start_at, received_at, created_at) INTO base FROM public.gdpr_requests WHERE id=_request_id;
  UPDATE public.gdpr_requests
    SET extension_applied = true,
        extension_reason = _reason,
        extension_notified_at = COALESCE(extension_notified_at, now()),
        extended_due_at = base + (_months || ' months')::interval
    WHERE id = _request_id;
  PERFORM public.rr_add_event(_request_id, 'extension_applied',
    jsonb_build_object('reason',_reason,'months',_months));
END $$;

-- Owner-safe summary view (security invoker; owner-only rows)
CREATE OR REPLACE VIEW public.my_gdpr_requests
WITH (security_invoker = true) AS
  SELECT id, reference_number, request_type, status, decision,
         received_at, due_at, extended_due_at, completed_at,
         (identity_status IN ('requested','partially_verified','failed')) AS identity_action_needed,
         (clarification_requested_at IS NOT NULL AND clarification_received_at IS NULL) AS clarification_needed
  FROM public.gdpr_requests
  WHERE user_id = auth.uid();
GRANT SELECT ON public.my_gdpr_requests TO authenticated;
