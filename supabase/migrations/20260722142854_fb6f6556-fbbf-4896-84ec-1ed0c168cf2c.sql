
REVOKE EXECUTE ON FUNCTION public.retention_review_blocking_hold(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.rr_record_extension_notification(uuid, timestamptz, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.rr_review_create(text, text, uuid, text, uuid, uuid, uuid, timestamptz, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.rr_review_decide(uuid, text, text, timestamptz) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.rr_generate_due_review_candidates() FROM PUBLIC, anon;
