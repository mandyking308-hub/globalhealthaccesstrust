
REVOKE EXECUTE ON FUNCTION public.publish_legal_version(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.record_legal_acceptance(text, text, uuid, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.needs_legal_reacceptance(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.legal_entity_is_verified() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.publish_legal_version(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_legal_acceptance(text, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.needs_legal_reacceptance(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.legal_entity_is_verified() TO authenticated;
