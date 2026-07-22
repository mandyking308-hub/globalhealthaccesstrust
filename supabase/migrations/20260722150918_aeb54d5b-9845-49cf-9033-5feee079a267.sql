
-- 1. Extend enums / check constraints
ALTER TABLE public.donation_drafts DROP CONSTRAINT IF EXISTS donation_drafts_payment_route_check;
ALTER TABLE public.donation_drafts ADD CONSTRAINT donation_drafts_payment_route_check
  CHECK (payment_route = ANY (ARRAY['card','gocardless','bank_transfer']));

ALTER TABLE public.payment_attempts ALTER COLUMN provider DROP DEFAULT;
ALTER TABLE public.payment_attempts ADD CONSTRAINT payment_attempts_provider_check
  CHECK (provider = ANY (ARRAY['stripe','gocardless','bank_transfer']));

-- 2. Provider events (idempotent webhook log)
CREATE TABLE IF NOT EXISTS public.payment_provider_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL CHECK (provider IN ('stripe','gocardless','bank_transfer','other')),
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT false,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ,
  processing_result TEXT,
  related_draft_id UUID REFERENCES public.donation_drafts(id) ON DELETE SET NULL,
  related_donation_id UUID REFERENCES public.donations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_event_id)
);
GRANT SELECT ON public.payment_provider_events TO authenticated;
GRANT ALL ON public.payment_provider_events TO service_role;
ALTER TABLE public.payment_provider_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read provider events" ON public.payment_provider_events
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_pp_events_updated_at BEFORE UPDATE ON public.payment_provider_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 3. Recurring arrangements (Direct Debit mandates)
CREATE TABLE IF NOT EXISTS public.recurring_payment_arrangements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  originating_draft_id UUID REFERENCES public.donation_drafts(id) ON DELETE SET NULL,
  provider TEXT NOT NULL CHECK (provider IN ('gocardless')),
  provider_mandate_id TEXT,
  provider_customer_id TEXT,
  provider_subscription_id TEXT,
  amount_minor BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP' CHECK (currency = 'GBP'),
  interval TEXT NOT NULL CHECK (interval IN ('monthly','quarterly','annually')),
  status TEXT NOT NULL DEFAULT 'pending_authorisation'
    CHECK (status IN ('pending_authorisation','active','cancelled','failed','expired')),
  authorised_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.recurring_payment_arrangements TO authenticated;
GRANT ALL ON public.recurring_payment_arrangements TO service_role;
ALTER TABLE public.recurring_payment_arrangements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own mandates" ON public.recurring_payment_arrangements
  FOR SELECT TO authenticated USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE TRIGGER trg_rpa_updated_at BEFORE UPDATE ON public.recurring_payment_arrangements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 4. Donation adjustments (refunds, chargebacks)
CREATE TABLE IF NOT EXISTS public.donation_adjustments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  adjustment_type TEXT NOT NULL CHECK (adjustment_type IN ('refund','partial_refund','chargeback','correction')),
  amount_minor BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  provider TEXT NOT NULL,
  provider_reference TEXT,
  reason TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.donation_adjustments TO authenticated;
GRANT ALL ON public.donation_adjustments TO service_role;
ALTER TABLE public.donation_adjustments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage adjustments" ON public.donation_adjustments
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "donor read own donation adjustments" ON public.donation_adjustments
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.donations d WHERE d.id = donation_id AND d.donor_id = auth.uid())
  );
CREATE TRIGGER trg_da_updated_at BEFORE UPDATE ON public.donation_adjustments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 5. Payment settings (Trust bank details) — single row, admin-managed
CREATE TABLE IF NOT EXISTS public.payment_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE CHECK (singleton = true),
  beneficiary_name TEXT,
  bank_name TEXT,
  sort_code TEXT,
  account_number TEXT,
  iban TEXT,
  bic TEXT,
  instructions_notes TEXT,
  show_details_to_donor_after_confirmation BOOLEAN NOT NULL DEFAULT false,
  gocardless_enabled BOOLEAN NOT NULL DEFAULT false,
  gocardless_environment TEXT CHECK (gocardless_environment IN ('sandbox','live')),
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_settings TO authenticated;
GRANT ALL ON public.payment_settings TO service_role;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage payment settings" ON public.payment_settings
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_ps_updated_at BEFORE UPDATE ON public.payment_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Ensure singleton row exists
INSERT INTO public.payment_settings (singleton) VALUES (true) ON CONFLICT DO NOTHING;

-- 6. Donor-facing view of trust bank details AFTER a draft is transaction-confirmed
CREATE OR REPLACE FUNCTION public.donor_get_bank_details(_draft_id UUID)
RETURNS TABLE (
  beneficiary_name TEXT, bank_name TEXT, sort_code TEXT, account_number TEXT,
  iban TEXT, bic TEXT, instructions_notes TEXT, show_details BOOLEAN
)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE d public.donation_drafts%ROWTYPE; s public.payment_settings%ROWTYPE;
BEGIN
  SELECT * INTO d FROM public.donation_drafts WHERE id = _draft_id;
  IF d.donor_id <> auth.uid() AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Not authorised';
  END IF;
  IF d.confirmed_at IS NULL THEN
    RAISE EXCEPTION 'Confirmation required before bank details are released';
  END IF;
  SELECT * INTO s FROM public.payment_settings WHERE singleton = true;
  IF NOT s.show_details_to_donor_after_confirmation THEN
    RETURN QUERY SELECT NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, false;
    RETURN;
  END IF;
  RETURN QUERY SELECT s.beneficiary_name, s.bank_name, s.sort_code, s.account_number,
                      s.iban, s.bic, s.instructions_notes, true;
END $$;
REVOKE ALL ON FUNCTION public.donor_get_bank_details(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.donor_get_bank_details(UUID) TO authenticated;

-- 7. GoCardless configuration probe (does not reveal values)
CREATE OR REPLACE FUNCTION public.gocardless_enabled()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT gocardless_enabled FROM public.payment_settings WHERE singleton = true), false);
$$;
REVOKE ALL ON FUNCTION public.gocardless_enabled() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.gocardless_enabled() TO authenticated;

-- 8. Create pending arrangement from confirmed draft (called by gocardless-create-flow function)
CREATE OR REPLACE FUNCTION public.gocardless_prepare_arrangement(_draft_id UUID)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d public.donation_drafts%ROWTYPE; v_id UUID;
BEGIN
  SELECT * INTO d FROM public.donation_drafts WHERE id = _draft_id;
  IF d IS NULL THEN RAISE EXCEPTION 'Draft not found'; END IF;
  IF d.donor_id <> auth.uid() AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Not authorised';
  END IF;
  IF d.confirmed_at IS NULL THEN RAISE EXCEPTION 'Draft not confirmed'; END IF;

  IF d.frequency IN ('monthly','quarterly','annually') THEN
    INSERT INTO public.recurring_payment_arrangements(
      donor_id, originating_draft_id, provider, amount_minor, currency, interval, status)
    VALUES (d.donor_id, d.id, 'gocardless', d.amount_minor, d.currency, d.frequency::text, 'pending_authorisation')
    RETURNING id INTO v_id;
  END IF;

  INSERT INTO public.payment_attempts(
    donation_draft_id, donor_id, provider, amount_minor, currency, payment_mode, status)
  VALUES (d.id, d.donor_id, 'gocardless', d.amount_minor, d.currency,
          CASE WHEN d.frequency = 'one_time' THEN 'payment' ELSE 'subscription' END,
          'created');

  UPDATE public.donation_drafts SET payment_route = 'gocardless', status = 'awaiting_payment' WHERE id = d.id;
  RETURN COALESCE(v_id, d.id);
END $$;
REVOKE ALL ON FUNCTION public.gocardless_prepare_arrangement(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.gocardless_prepare_arrangement(UUID) TO authenticated;
