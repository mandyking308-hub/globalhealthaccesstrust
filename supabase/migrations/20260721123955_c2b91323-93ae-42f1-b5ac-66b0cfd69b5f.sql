
-- ============================================================================
-- 1) Fix insert-forgery on audit_logs / system_health_metrics / system_logs
-- ============================================================================
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "Admins can insert audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "System can insert health metrics" ON public.system_health_metrics;
CREATE POLICY "Admins can insert health metrics"
  ON public.system_health_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "System can insert logs" ON public.system_logs;
CREATE POLICY "Admins can insert system logs"
  ON public.system_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================================
-- 2) Remove client-side read access to 2FA codes (now handled by edge fn)
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own 2FA codes" ON public.two_factor_codes;

-- ============================================================================
-- 3) Harden SECURITY DEFINER functions: authz checks + fixed search_path
-- ============================================================================

-- GDPR export: only self or admin
CREATE OR REPLACE FUNCTION public.export_user_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  user_data jsonb;
BEGIN
  IF auth.uid() IS NULL
     OR (auth.uid() <> target_user_id AND NOT public.is_admin(auth.uid())) THEN
    RAISE EXCEPTION 'Not authorized to export this user''s data';
  END IF;

  SELECT jsonb_build_object(
    'profile', (SELECT row_to_json(p.*) FROM public.profiles p WHERE id = target_user_id),
    'donations', (SELECT jsonb_agg(row_to_json(d.*)) FROM public.donations d WHERE donor_id = target_user_id),
    'commissioned_projects', (SELECT jsonb_agg(row_to_json(cp.*)) FROM public.commissioned_projects cp WHERE donor_id = target_user_id),
    'volunteer_profile', (SELECT row_to_json(v.*) FROM public.volunteers v WHERE user_id = target_user_id),
    'messages', (SELECT jsonb_agg(row_to_json(m.*)) FROM public.messages m WHERE to_user_id = target_user_id OR from_user_id = target_user_id),
    'sessions', (SELECT jsonb_agg(row_to_json(s.*)) FROM public.user_sessions s WHERE user_id = target_user_id),
    'exported_at', NOW()
  ) INTO user_data;

  RETURN user_data;
END;
$function$;

-- GDPR anonymize: admin only (destructive)
CREATE OR REPLACE FUNCTION public.anonymize_user_data(target_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF auth.uid() IS NULL
     OR (auth.uid() <> target_user_id AND NOT public.is_admin(auth.uid())) THEN
    RAISE EXCEPTION 'Not authorized to anonymize this user''s data';
  END IF;

  UPDATE public.profiles
  SET
    first_name = 'Deleted',
    last_name = 'User',
    email = 'deleted_' || id || '@anonymized.ghat',
    gdpr_consent = FALSE,
    data_processing_consent = FALSE
  WHERE id = target_user_id;

  UPDATE public.volunteers
  SET
    name = 'Anonymized Volunteer',
    email = 'deleted_' || id || '@anonymized.ghat',
    phone = 'DELETED',
    cv_url = NULL,
    notes = 'User data deleted per GDPR request'
  WHERE user_id = target_user_id;

  DELETE FROM public.user_sessions WHERE user_id = target_user_id;
  DELETE FROM public.two_factor_codes WHERE user_id = target_user_id;
  DELETE FROM public.recovery_codes WHERE user_id = target_user_id;

  UPDATE public.messages
  SET body = '[Message deleted per GDPR request]'
  WHERE from_user_id = target_user_id OR to_user_id = target_user_id;

  INSERT INTO public.audit_logs (action, action_type, target_type, target_id, user_id, details)
  VALUES ('GDPR Data Deletion', 'delete', 'user', target_user_id, auth.uid(),
    jsonb_build_object('reason', 'GDPR right to erasure'));

  RETURN TRUE;
END;
$function$;

-- Document download counter: only for owner or admin
CREATE OR REPLACE FUNCTION public.increment_document_download(doc_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.document_records
    WHERE id = doc_id
      AND (user_id = auth.uid() OR public.is_admin(auth.uid()))
  ) THEN
    RETURN;
  END IF;

  UPDATE public.document_records
  SET
    downloaded_count = downloaded_count + 1,
    last_downloaded_at = now()
  WHERE id = doc_id;
END;
$function$;

-- log_admin_action: add fixed search_path
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action text,
  p_action_type text,
  p_target_type text,
  p_target_id uuid,
  p_details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.audit_logs (
    user_id, action, action_type, target_type, target_id, details, ip_address
  ) VALUES (
    auth.uid(), p_action, p_action_type, p_target_type, p_target_id, p_details,
    current_setting('request.headers', true)::json->>'x-forwarded-for'
  );
END;
$function$;

-- update_updated_at: add fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- ============================================================================
-- 4) Lock down EXECUTE on all SECURITY DEFINER functions
--    - Revoke from PUBLIC and anon
--    - Grant to authenticated only where the client actually needs to call it
--    - Trigger-only functions (handle_new_user, update_updated_at) get no grants
-- ============================================================================

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.export_user_data(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.export_user_data(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.anonymize_user_data(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.anonymize_user_data(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.increment_document_download(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.increment_document_download(uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.log_admin_action(text, text, text, uuid, jsonb) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.log_admin_action(text, text, text, uuid, jsonb) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
