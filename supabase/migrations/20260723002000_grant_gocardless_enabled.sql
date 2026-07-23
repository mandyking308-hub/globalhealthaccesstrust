-- The public donation form reads only the payment-availability boolean.
-- Permit anonymous and authenticated callers to execute this no-argument status RPC.
-- No bank details, credentials or payment configuration are returned by this function.

REVOKE ALL ON FUNCTION public.gocardless_enabled() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.gocardless_enabled() TO anon, authenticated;
