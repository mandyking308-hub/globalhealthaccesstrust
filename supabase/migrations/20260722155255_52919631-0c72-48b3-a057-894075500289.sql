
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
  _tok := CASE WHEN _anonymous THEN replace(gen_random_uuid()::text,'-','') || replace(gen_random_uuid()::text,'-','') END;
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
  _tok := replace(gen_random_uuid()::text,'-','') || replace(gen_random_uuid()::text,'-','');
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
