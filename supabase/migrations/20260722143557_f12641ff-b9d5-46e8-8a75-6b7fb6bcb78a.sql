
-- Privacy-preserving anti-abuse table for public rights-request submissions.
CREATE TABLE IF NOT EXISTS public.rights_request_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_hash BYTEA NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  request_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rrrl_hash_window ON public.rights_request_rate_limits(contact_hash, window_start);
CREATE INDEX IF NOT EXISTS idx_rrrl_created ON public.rights_request_rate_limits(created_at);

GRANT SELECT ON public.rights_request_rate_limits TO authenticated;
GRANT ALL ON public.rights_request_rate_limits TO service_role;

ALTER TABLE public.rights_request_rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view rate limits" ON public.rights_request_rate_limits;
CREATE POLICY "Admins can view rate limits"
  ON public.rights_request_rate_limits FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Rewrite submit_rights_request with server-side anti-abuse limits for anonymous submissions.
CREATE OR REPLACE FUNCTION public.submit_rights_request(
  _request_type text,
  _request_description text,
  _requester_contact text,
  _requester_name text,
  _representative_name text DEFAULT NULL::text,
  _channel text DEFAULT 'website'::text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_id UUID; v_ref TEXT; v_uid UUID := auth.uid();
  v_now TIMESTAMPTZ := now(); v_identity TEXT; v_clock TIMESTAMPTZ; v_due TIMESTAMPTZ;
  v_hash BYTEA;
  v_recent_same INT;
  v_recent_global INT;
BEGIN
  IF _request_description IS NULL OR length(trim(_request_description)) < 5 THEN
    RAISE EXCEPTION 'Please describe your request.';
  END IF;
  IF _requester_contact IS NULL OR length(trim(_requester_contact)) < 3 THEN
    RAISE EXCEPTION 'Contact information is required.';
  END IF;

  -- Server-side anti-abuse limits for anonymous submissions only.
  IF v_uid IS NULL THEN
    -- Housekeeping: retain rate-limit rows no longer than 48h.
    DELETE FROM public.rights_request_rate_limits WHERE created_at < v_now - interval '48 hours';

    v_hash := digest(lower(trim(_requester_contact)), 'sha256');

    SELECT COALESCE(SUM(request_count),0) INTO v_recent_same
    FROM public.rights_request_rate_limits
    WHERE contact_hash = v_hash AND window_start > v_now - interval '24 hours';

    IF v_recent_same >= 3 THEN
      RAISE EXCEPTION 'We have already received recent requests using this contact. Please email contact@globalhealthaccesstrust.com to continue — your right to make a request is not affected.';
    END IF;

    SELECT COALESCE(SUM(request_count),0) INTO v_recent_global
    FROM public.rights_request_rate_limits
    WHERE window_start > v_now - interval '1 hour';

    IF v_recent_global >= 30 THEN
      RAISE EXCEPTION 'The rights-request form is temporarily busy. Please try again shortly, or email contact@globalhealthaccesstrust.com — your right to make a request is not affected.';
    END IF;

    INSERT INTO public.rights_request_rate_limits(contact_hash) VALUES (v_hash);
  END IF;

  v_ref := public.generate_gdpr_reference();
  v_identity := CASE WHEN v_uid IS NOT NULL THEN 'not_required' ELSE 'not_started' END;
  IF v_uid IS NOT NULL THEN
    v_clock := v_now;
    v_due := v_now + interval '1 month';
  END IF;

  INSERT INTO public.gdpr_requests(
    user_id, email, request_type, request_details, status,
    reference_number, requester_name, requester_contact,
    representative_name, channel, received_at, identity_status,
    clock_start_at, due_at
  ) VALUES (
    v_uid, _requester_contact, _request_type, _request_description,
    CASE WHEN v_uid IS NOT NULL THEN 'received' ELSE 'pending' END,
    v_ref, COALESCE(_requester_name,''), _requester_contact,
    _representative_name, _channel, v_now, v_identity,
    v_clock, v_due
  ) RETURNING id INTO v_id;

  INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
  VALUES (v_id, v_uid, CASE WHEN v_uid IS NULL THEN 'anonymous' ELSE 'user' END,
          'received', jsonb_build_object('channel', _channel, 'request_type', _request_type));

  IF v_uid IS NOT NULL THEN
    INSERT INTO public.gdpr_request_events(request_id, actor_user_id, actor_role, event_type, detail)
    VALUES (v_id, v_uid, 'system', 'clock_started_automatically',
            jsonb_build_object('at', v_clock, 'due_at', v_due, 'basis', 'signed_in_identity_not_required'));
  END IF;

  RETURN v_ref;
END $function$;
