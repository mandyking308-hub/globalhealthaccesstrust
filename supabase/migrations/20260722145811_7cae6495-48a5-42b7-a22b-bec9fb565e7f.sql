
-- ============================================================
-- Sequences for reference generation
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS public.bank_transfer_seq;
CREATE SEQUENCE IF NOT EXISTS public.receipt_seq;

CREATE OR REPLACE FUNCTION public.generate_bank_transfer_reference()
RETURNS text LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN RETURN 'GHAT-BT-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.bank_transfer_seq')::text, 5, '0'); END $$;

CREATE OR REPLACE FUNCTION public.generate_receipt_reference()
RETURNS text LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN RETURN 'GHAT-R-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.receipt_seq')::text, 6, '0'); END $$;

-- ============================================================
-- Extend donations
-- ============================================================
ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS donation_draft_id uuid,
  ADD COLUMN IF NOT EXISTS payment_provider text,
  ADD COLUMN IF NOT EXISTS provider_payment_intent_id text,
  ADD COLUMN IF NOT EXISTS provider_subscription_id text,
  ADD COLUMN IF NOT EXISTS payment_route text,
  ADD COLUMN IF NOT EXISTS receipt_reference text,
  ADD COLUMN IF NOT EXISTS amount_minor bigint;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_donations_provider_pi
  ON public.donations(provider_payment_intent_id) WHERE provider_payment_intent_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_donations_receipt_ref
  ON public.donations(receipt_reference) WHERE receipt_reference IS NOT NULL;

-- ============================================================
-- Donation drafts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.donation_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_minor bigint NOT NULL CHECK (amount_minor >= 50000),
  currency text NOT NULL DEFAULT 'GBP' CHECK (currency = 'GBP'),
  frequency donation_frequency NOT NULL DEFAULT 'one_time',
  purpose donation_purpose NOT NULL,
  proposed_project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  notes text,
  recognition_preference text,
  anonymous boolean NOT NULL DEFAULT false,
  operating_allocation_minor bigint NOT NULL,
  delivery_allocation_minor bigint NOT NULL,
  payment_route text CHECK (payment_route IN ('card','bank_transfer')),
  confirmation_version text,
  confirmed_at timestamptz,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft','transaction_confirmed','checkout_created','awaiting_payment',
    'bank_transfer_instructions_requested','under_review','cancelled','expired','converted_to_donation'
  )),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.donation_drafts TO authenticated;
GRANT ALL ON public.donation_drafts TO service_role;
ALTER TABLE public.donation_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own drafts select" ON public.donation_drafts FOR SELECT USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE POLICY "donor own drafts insert" ON public.donation_drafts FOR INSERT WITH CHECK (auth.uid() = donor_id);
CREATE POLICY "donor own drafts update" ON public.donation_drafts FOR UPDATE USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE TRIGGER trg_donation_drafts_updated_at BEFORE UPDATE ON public.donation_drafts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Retro-FK from donations.donation_draft_id
ALTER TABLE public.donations
  DROP CONSTRAINT IF EXISTS donations_donation_draft_id_fkey;
ALTER TABLE public.donations
  ADD CONSTRAINT donations_donation_draft_id_fkey
  FOREIGN KEY (donation_draft_id) REFERENCES public.donation_drafts(id) ON DELETE SET NULL;

-- ============================================================
-- Transaction confirmations (immutable)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.donation_transaction_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_draft_id uuid NOT NULL REFERENCES public.donation_drafts(id) ON DELETE CASCADE,
  donor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gross_amount_minor bigint NOT NULL,
  operating_allocation_minor bigint NOT NULL,
  delivery_allocation_minor bigint NOT NULL,
  currency text NOT NULL,
  frequency donation_frequency NOT NULL,
  purpose donation_purpose NOT NULL,
  wording_version text NOT NULL,
  confirmed_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.donation_transaction_confirmations TO authenticated;
GRANT ALL ON public.donation_transaction_confirmations TO service_role;
ALTER TABLE public.donation_transaction_confirmations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own confirmations select" ON public.donation_transaction_confirmations
  FOR SELECT USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE POLICY "donor own confirmations insert" ON public.donation_transaction_confirmations
  FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- ============================================================
-- Payment attempts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payment_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_draft_id uuid NOT NULL REFERENCES public.donation_drafts(id) ON DELETE CASCADE,
  donor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL DEFAULT 'stripe',
  provider_checkout_session_id text,
  provider_payment_intent_id text,
  provider_subscription_id text,
  amount_minor bigint NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  payment_mode text NOT NULL CHECK (payment_mode IN ('payment','subscription')),
  status text NOT NULL DEFAULT 'created' CHECK (status IN (
    'created','open','processing','succeeded','failed','cancelled','expired','refunded','partially_refunded','disputed'
  )),
  failure_code text,
  failure_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_attempts TO authenticated;
GRANT ALL ON public.payment_attempts TO service_role;
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own attempts select" ON public.payment_attempts
  FOR SELECT USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE TRIGGER trg_payment_attempts_updated_at BEFORE UPDATE ON public.payment_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE INDEX IF NOT EXISTS idx_payment_attempts_session ON public.payment_attempts(provider_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_intent ON public.payment_attempts(provider_payment_intent_id);

-- ============================================================
-- Webhook idempotency
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'stripe',
  provider_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  processing_error text,
  payload_hash text
);
GRANT SELECT ON public.payment_webhook_events TO authenticated;
GRANT ALL ON public.payment_webhook_events TO service_role;
ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin webhook events" ON public.payment_webhook_events FOR SELECT USING (public.is_admin(auth.uid()));

-- ============================================================
-- Bank transfer requests
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bank_transfer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text NOT NULL UNIQUE DEFAULT public.generate_bank_transfer_reference(),
  donation_draft_id uuid NOT NULL REFERENCES public.donation_drafts(id) ON DELETE CASCADE,
  donor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_minor bigint NOT NULL,
  currency text NOT NULL DEFAULT 'GBP',
  frequency donation_frequency NOT NULL DEFAULT 'one_time',
  purpose donation_purpose NOT NULL,
  status text NOT NULL DEFAULT 'requested' CHECK (status IN (
    'requested','under_review','instructions_sent','awaiting_funds','received','reconciled','rejected','cancelled'
  )),
  due_diligence_status text,
  secure_delivery_channel text,
  instructions_sent_at timestamptz,
  instructions_sent_by uuid REFERENCES auth.users(id),
  amount_expected_minor bigint,
  amount_received_minor bigint,
  received_at timestamptz,
  bank_reference text,
  reconciliation_status text,
  reconciliation_notes text,
  approver_id uuid REFERENCES auth.users(id),
  second_approver_id uuid REFERENCES auth.users(id),
  resulting_donation_id uuid REFERENCES public.donations(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bank_transfer_requests TO authenticated;
GRANT ALL ON public.bank_transfer_requests TO service_role;
ALTER TABLE public.bank_transfer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own bt select" ON public.bank_transfer_requests
  FOR SELECT USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));
CREATE POLICY "admin bt manage" ON public.bank_transfer_requests
  FOR UPDATE USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_bank_transfer_updated_at BEFORE UPDATE ON public.bank_transfer_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- Refunds
-- ============================================================
CREATE TABLE IF NOT EXISTS public.refund_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id uuid NOT NULL REFERENCES public.donations(id) ON DELETE RESTRICT,
  requested_by uuid REFERENCES auth.users(id),
  approved_by uuid REFERENCES auth.users(id),
  amount_minor bigint NOT NULL CHECK (amount_minor > 0),
  reason text NOT NULL,
  provider_refund_id text,
  full_refund boolean NOT NULL DEFAULT false,
  allocation_impact_notes text,
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','approved','processing','completed','failed','cancelled')),
  requested_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  completed_at timestamptz
);
GRANT SELECT ON public.refund_records TO authenticated;
GRANT ALL ON public.refund_records TO service_role;
ALTER TABLE public.refund_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own refunds" ON public.refund_records FOR SELECT
  USING (public.is_admin(auth.uid()) OR EXISTS (
    SELECT 1 FROM public.donations d WHERE d.id = donation_id AND d.donor_id = auth.uid()
  ));
CREATE POLICY "admin refunds manage" ON public.refund_records FOR UPDATE
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================
-- Payment receipts (immutable snapshot)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.payment_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id uuid NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  donor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receipt_reference text NOT NULL UNIQUE DEFAULT public.generate_receipt_reference(),
  gross_amount_minor bigint NOT NULL,
  currency text NOT NULL,
  operating_allocation_minor bigint NOT NULL,
  delivery_allocation_minor bigint NOT NULL,
  payment_route text NOT NULL,
  purpose donation_purpose NOT NULL,
  paid_at timestamptz NOT NULL,
  donor_display_name text,
  anonymous boolean NOT NULL DEFAULT false,
  refund_adjustments jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_receipts TO authenticated;
GRANT ALL ON public.payment_receipts TO service_role;
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donor own receipts" ON public.payment_receipts FOR SELECT
  USING (auth.uid() = donor_id OR public.is_admin(auth.uid()));

-- ============================================================
-- Volunteer applications (separate from confidential `volunteers`)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by_user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  role_of_interest text,
  area_of_interest text,
  availability text,
  skills text,
  experience text,
  languages text,
  motivation text,
  cv_object_path text,
  cv_original_filename text,
  cv_mime_type text,
  cv_size_bytes bigint,
  status text NOT NULL DEFAULT 'received' CHECK (status IN (
    'received','under_review','clarification_requested','interview','checks_required',
    'approved','declined','withdrawn','account_invited','account_activated'
  )),
  reviewer_notes text,
  linked_volunteer_id uuid REFERENCES public.volunteers(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.volunteer_applications TO authenticated;
GRANT ALL ON public.volunteer_applications TO service_role;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin apps select" ON public.volunteer_applications FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "admin apps update" ON public.volunteer_applications FOR UPDATE USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "applicant own app select" ON public.volunteer_applications FOR SELECT USING (auth.uid() = submitted_by_user_id);
CREATE TRIGGER trg_volunteer_applications_updated_at BEFORE UPDATE ON public.volunteer_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TABLE IF NOT EXISTS public.volunteer_application_declarations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.volunteer_applications(id) ON DELETE CASCADE,
  declaration_type text NOT NULL CHECK (declaration_type IN ('accuracy','privacy_acknowledgement')),
  wording_version text NOT NULL,
  declared_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(application_id, declaration_type)
);
GRANT SELECT, INSERT ON public.volunteer_application_declarations TO authenticated;
GRANT ALL ON public.volunteer_application_declarations TO service_role;
ALTER TABLE public.volunteer_application_declarations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin decl select" ON public.volunteer_application_declarations FOR SELECT USING (public.is_admin(auth.uid()));

CREATE TABLE IF NOT EXISTS public.volunteer_account_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.volunteer_applications(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  role app_role NOT NULL DEFAULT 'volunteer'
    CHECK (role IN ('volunteer','donor')),
  invited_email text NOT NULL,
  invited_by uuid NOT NULL REFERENCES auth.users(id),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  consumed_at timestamptz,
  consumed_by_user_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.volunteer_account_invitations TO authenticated;
GRANT ALL ON public.volunteer_account_invitations TO service_role;
ALTER TABLE public.volunteer_account_invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin invitations" ON public.volunteer_account_invitations FOR SELECT USING (public.is_admin(auth.uid()));

-- ============================================================
-- Placeholder legal documents (versions not yet published)
-- ============================================================
INSERT INTO public.legal_documents (slug, title, category, requires_signup_acceptance, requires_team_acceptance, requires_donation_acceptance)
VALUES
  ('donor-and-project-funding-terms', 'Donor and Project Funding Terms', 'donation', false, false, true),
  ('project-team-terms', 'Project Team Terms of Engagement', 'team', false, true, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Allocation calculator (integer minor units)
-- ============================================================
CREATE OR REPLACE FUNCTION public.donation_calculate_allocation(_amount_minor bigint)
RETURNS TABLE(operating_minor bigint, delivery_minor bigint)
LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF _amount_minor IS NULL OR _amount_minor < 50000 THEN
    RAISE EXCEPTION 'Amount must be at least £500.00 (50000 pence)';
  END IF;
  operating_minor := (_amount_minor * 20) / 100;
  delivery_minor := _amount_minor - operating_minor;
  RETURN NEXT;
END $$;
REVOKE ALL ON FUNCTION public.donation_calculate_allocation(bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.donation_calculate_allocation(bigint) TO authenticated, service_role;

-- ============================================================
-- Draft create / update
-- ============================================================
CREATE OR REPLACE FUNCTION public.donation_draft_create(
  _amount_minor bigint, _frequency donation_frequency, _purpose donation_purpose,
  _proposed_project_id uuid, _notes text, _recognition_preference text, _anonymous boolean
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_id uuid; v_op bigint; v_del bigint;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sign-in required'; END IF;
  SELECT operating_minor, delivery_minor INTO v_op, v_del
    FROM public.donation_calculate_allocation(_amount_minor);
  INSERT INTO public.donation_drafts (
    donor_id, amount_minor, frequency, purpose, proposed_project_id, notes,
    recognition_preference, anonymous, operating_allocation_minor, delivery_allocation_minor
  ) VALUES (
    auth.uid(), _amount_minor, _frequency, _purpose, _proposed_project_id, _notes,
    _recognition_preference, COALESCE(_anonymous,false), v_op, v_del
  ) RETURNING id INTO v_id;
  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'donation_draft_created', 'insert', 'donation_drafts', v_id,
    jsonb_build_object('amount_minor', _amount_minor, 'purpose', _purpose));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.donation_draft_create(bigint, donation_frequency, donation_purpose, uuid, text, text, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.donation_draft_create(bigint, donation_frequency, donation_purpose, uuid, text, text, boolean) TO authenticated;

CREATE OR REPLACE FUNCTION public.donation_confirm_transaction(_draft_id uuid, _wording_version text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE d public.donation_drafts%ROWTYPE; v_id uuid;
BEGIN
  SELECT * INTO d FROM public.donation_drafts WHERE id = _draft_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Draft not found'; END IF;
  IF d.donor_id <> auth.uid() THEN RAISE EXCEPTION 'Not authorised'; END IF;
  IF d.status NOT IN ('draft','transaction_confirmed') THEN RAISE EXCEPTION 'Draft is not in a confirmable state'; END IF;

  INSERT INTO public.donation_transaction_confirmations(
    donation_draft_id, donor_id, gross_amount_minor,
    operating_allocation_minor, delivery_allocation_minor,
    currency, frequency, purpose, wording_version
  ) VALUES (
    _draft_id, auth.uid(), d.amount_minor,
    d.operating_allocation_minor, d.delivery_allocation_minor,
    d.currency, d.frequency, d.purpose, _wording_version
  ) RETURNING id INTO v_id;

  UPDATE public.donation_drafts SET status='transaction_confirmed',
    confirmation_version=_wording_version, confirmed_at=now() WHERE id=_draft_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'donation_transaction_confirmed', 'insert', 'donation_transaction_confirmations', v_id,
    jsonb_build_object('draft_id', _draft_id, 'wording_version', _wording_version));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.donation_confirm_transaction(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.donation_confirm_transaction(uuid, text) TO authenticated;

-- ============================================================
-- Bank transfer request
-- ============================================================
CREATE OR REPLACE FUNCTION public.donation_request_bank_transfer(_draft_id uuid)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE d public.donation_drafts%ROWTYPE; v_ref text; v_id uuid; v_conf boolean;
BEGIN
  SELECT * INTO d FROM public.donation_drafts WHERE id=_draft_id;
  IF NOT FOUND OR d.donor_id <> auth.uid() THEN RAISE EXCEPTION 'Not authorised'; END IF;
  SELECT EXISTS(SELECT 1 FROM public.donation_transaction_confirmations WHERE donation_draft_id=_draft_id) INTO v_conf;
  IF NOT v_conf THEN RAISE EXCEPTION 'Transaction confirmation required before requesting bank transfer'; END IF;
  IF d.status IN ('converted_to_donation','cancelled','expired') THEN RAISE EXCEPTION 'Draft not in a requestable state'; END IF;

  INSERT INTO public.bank_transfer_requests(
    donation_draft_id, donor_id, amount_minor, currency, frequency, purpose, amount_expected_minor
  ) VALUES (
    _draft_id, auth.uid(), d.amount_minor, d.currency, d.frequency, d.purpose, d.amount_minor
  ) RETURNING id, reference_number INTO v_id, v_ref;

  UPDATE public.donation_drafts SET status='bank_transfer_instructions_requested', payment_route='bank_transfer' WHERE id=_draft_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'bank_transfer_requested', 'insert', 'bank_transfer_requests', v_id,
    jsonb_build_object('reference', v_ref, 'draft_id', _draft_id));
  RETURN v_ref;
END $$;
REVOKE ALL ON FUNCTION public.donation_request_bank_transfer(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.donation_request_bank_transfer(uuid) TO authenticated;

-- ============================================================
-- Admin: record bank transfer receipt -> creates donation + allocation
-- ============================================================
CREATE OR REPLACE FUNCTION public.bank_transfer_record_receipt(
  _request_id uuid, _amount_received_minor bigint, _received_at timestamptz,
  _bank_reference text, _reconciliation_notes text, _second_approver_id uuid
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE r public.bank_transfer_requests%ROWTYPE; d public.donation_drafts%ROWTYPE;
        v_donation_id uuid; v_op numeric; v_del numeric; v_ref text;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Only Trust Administration may record receipt'; END IF;
  IF _amount_received_minor IS NULL OR _amount_received_minor <= 0 THEN RAISE EXCEPTION 'Amount received required'; END IF;
  IF _bank_reference IS NULL OR length(trim(_bank_reference))=0 THEN RAISE EXCEPTION 'Bank reference required'; END IF;

  SELECT * INTO r FROM public.bank_transfer_requests WHERE id=_request_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Request not found'; END IF;
  IF r.status IN ('received','reconciled','rejected','cancelled') THEN RAISE EXCEPTION 'Request already closed'; END IF;
  SELECT * INTO d FROM public.donation_drafts WHERE id=r.donation_draft_id;

  v_op := (_amount_received_minor * 20) / 100;
  v_del := _amount_received_minor - v_op;
  v_ref := public.generate_receipt_reference();

  INSERT INTO public.donations(
    donor_id, amount, amount_minor, currency, purpose, frequency,
    payment_provider, payment_route, status, processed_at, donation_draft_id, receipt_reference, notes
  ) VALUES (
    r.donor_id, (_amount_received_minor::numeric / 100.0), _amount_received_minor, r.currency, r.purpose, r.frequency,
    'bank_transfer', 'bank_transfer', 'paid', _received_at, r.donation_draft_id, v_ref,
    'Bank transfer ' || r.reference_number || ' — ref ' || _bank_reference
  ) RETURNING id INTO v_donation_id;

  INSERT INTO public.donation_allocations(
    donation_id, donor_id, gross_donation_amount, operating_allocation_rate,
    operating_allocation_amount, project_delivery_allocation,
    amount_committed, amount_spent, amount_remaining, allocation_status, currency
  ) VALUES (
    v_donation_id, r.donor_id, (_amount_received_minor::numeric / 100.0), 0.20,
    (v_op::numeric / 100.0), (v_del::numeric / 100.0),
    0, 0, (v_del::numeric / 100.0),
    CASE WHEN d.proposed_project_id IS NULL THEN 'awaiting_project_allocation' ELSE 'allocated' END,
    r.currency
  );

  INSERT INTO public.payment_receipts(
    donation_id, donor_id, receipt_reference, gross_amount_minor, currency,
    operating_allocation_minor, delivery_allocation_minor,
    payment_route, purpose, paid_at
  ) VALUES (
    v_donation_id, r.donor_id, v_ref, _amount_received_minor, r.currency,
    v_op, v_del, 'bank_transfer', r.purpose, _received_at
  );

  UPDATE public.bank_transfer_requests SET
    status='reconciled', amount_received_minor=_amount_received_minor, received_at=_received_at,
    bank_reference=_bank_reference, reconciliation_notes=_reconciliation_notes,
    reconciliation_status='reconciled', approver_id=auth.uid(), second_approver_id=_second_approver_id,
    resulting_donation_id=v_donation_id WHERE id=_request_id;
  UPDATE public.donation_drafts SET status='converted_to_donation' WHERE id=r.donation_draft_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'bank_transfer_reconciled', 'insert', 'donations', v_donation_id,
    jsonb_build_object('request', r.reference_number, 'amount_minor', _amount_received_minor,
      'receipt', v_ref, 'second_approver', _second_approver_id));
  RETURN v_donation_id;
END $$;
REVOKE ALL ON FUNCTION public.bank_transfer_record_receipt(uuid, bigint, timestamptz, text, text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bank_transfer_record_receipt(uuid, bigint, timestamptz, text, text, uuid) TO authenticated;

-- ============================================================
-- Finalise from Stripe (called by webhook edge function with service role)
-- ============================================================
CREATE OR REPLACE FUNCTION public.donation_finalize_from_provider(
  _draft_id uuid, _provider text, _payment_intent_id text, _subscription_id text,
  _amount_minor bigint, _paid_at timestamptz, _payment_route text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE d public.donation_drafts%ROWTYPE; existing_id uuid;
        v_op bigint; v_del bigint; v_donation_id uuid; v_ref text;
BEGIN
  -- Idempotency
  IF _payment_intent_id IS NOT NULL THEN
    SELECT id INTO existing_id FROM public.donations WHERE provider_payment_intent_id=_payment_intent_id LIMIT 1;
    IF existing_id IS NOT NULL THEN RETURN existing_id; END IF;
  END IF;

  SELECT * INTO d FROM public.donation_drafts WHERE id=_draft_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Draft not found: %', _draft_id; END IF;

  v_op := (_amount_minor * 20) / 100;
  v_del := _amount_minor - v_op;
  v_ref := public.generate_receipt_reference();

  INSERT INTO public.donations(
    donor_id, amount, amount_minor, currency, purpose, frequency,
    payment_provider, payment_route, provider_payment_intent_id, provider_subscription_id,
    stripe_payment_id, stripe_subscription_id, status, processed_at,
    donation_draft_id, receipt_reference
  ) VALUES (
    d.donor_id, (_amount_minor::numeric/100.0), _amount_minor, d.currency, d.purpose, d.frequency,
    _provider, _payment_route, _payment_intent_id, _subscription_id,
    _payment_intent_id, _subscription_id, 'paid', _paid_at,
    _draft_id, v_ref
  ) RETURNING id INTO v_donation_id;

  INSERT INTO public.donation_allocations(
    donation_id, donor_id, gross_donation_amount, operating_allocation_rate,
    operating_allocation_amount, project_delivery_allocation,
    amount_committed, amount_spent, amount_remaining, allocation_status, currency
  ) VALUES (
    v_donation_id, d.donor_id, (_amount_minor::numeric/100.0), 0.20,
    (v_op::numeric/100.0), (v_del::numeric/100.0),
    0, 0, (v_del::numeric/100.0),
    CASE WHEN d.proposed_project_id IS NULL THEN 'awaiting_project_allocation' ELSE 'allocated' END,
    d.currency
  );

  INSERT INTO public.payment_receipts(
    donation_id, donor_id, receipt_reference, gross_amount_minor, currency,
    operating_allocation_minor, delivery_allocation_minor,
    payment_route, purpose, paid_at, anonymous
  ) VALUES (
    v_donation_id, d.donor_id, v_ref, _amount_minor, d.currency,
    v_op, v_del, _payment_route, d.purpose, _paid_at, d.anonymous
  );

  UPDATE public.donation_drafts SET status='converted_to_donation' WHERE id=_draft_id;

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (d.donor_id, 'donation_paid', 'insert', 'donations', v_donation_id,
    jsonb_build_object('provider', _provider, 'payment_intent_id', _payment_intent_id,
      'amount_minor', _amount_minor, 'receipt', v_ref));
  RETURN v_donation_id;
END $$;
REVOKE ALL ON FUNCTION public.donation_finalize_from_provider(uuid, text, text, text, bigint, timestamptz, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.donation_finalize_from_provider(uuid, text, text, text, bigint, timestamptz, text) TO service_role;

-- ============================================================
-- Volunteer application submission
-- ============================================================
CREATE OR REPLACE FUNCTION public.submit_volunteer_application(
  _name text, _email text, _phone text, _country text, _role_of_interest text,
  _area_of_interest text, _availability text, _skills text, _experience text,
  _languages text, _motivation text,
  _cv_object_path text, _cv_original_filename text, _cv_mime_type text, _cv_size_bytes bigint,
  _accuracy_version text, _privacy_version text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_id uuid;
BEGIN
  IF _name IS NULL OR length(trim(_name))=0 THEN RAISE EXCEPTION 'Name required'; END IF;
  IF _email IS NULL OR length(trim(_email))<3 THEN RAISE EXCEPTION 'Email required'; END IF;
  IF _accuracy_version IS NULL OR length(trim(_accuracy_version))=0 THEN RAISE EXCEPTION 'Accuracy declaration required'; END IF;
  IF _privacy_version IS NULL OR length(trim(_privacy_version))=0 THEN RAISE EXCEPTION 'Privacy acknowledgement required'; END IF;

  INSERT INTO public.volunteer_applications(
    submitted_by_user_id, name, email, phone, country, role_of_interest, area_of_interest,
    availability, skills, experience, languages, motivation,
    cv_object_path, cv_original_filename, cv_mime_type, cv_size_bytes
  ) VALUES (
    auth.uid(), _name, _email, _phone, _country, _role_of_interest, _area_of_interest,
    _availability, _skills, _experience, _languages, _motivation,
    _cv_object_path, _cv_original_filename, _cv_mime_type, _cv_size_bytes
  ) RETURNING id INTO v_id;

  INSERT INTO public.volunteer_application_declarations(application_id, declaration_type, wording_version)
  VALUES (v_id, 'accuracy', _accuracy_version), (v_id, 'privacy_acknowledgement', _privacy_version);

  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'volunteer_application_submitted', 'insert', 'volunteer_applications', v_id,
    jsonb_build_object('accuracy_version', _accuracy_version, 'privacy_version', _privacy_version,
      'has_cv', _cv_object_path IS NOT NULL));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.submit_volunteer_application(text,text,text,text,text,text,text,text,text,text,text,text,text,text,bigint,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_volunteer_application(text,text,text,text,text,text,text,text,text,text,text,text,text,text,bigint,text,text) TO authenticated;

-- ============================================================
-- Admin: log CV access request (URL signing done client-side with authorised token)
-- ============================================================
CREATE OR REPLACE FUNCTION public.log_volunteer_cv_access(_application_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'cv_signed_url_requested', 'select', 'volunteer_applications', _application_id, '{}'::jsonb);
END $$;
REVOKE ALL ON FUNCTION public.log_volunteer_cv_access(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_volunteer_cv_access(uuid) TO authenticated;

-- ============================================================
-- Refunds
-- ============================================================
CREATE OR REPLACE FUNCTION public.refund_request(_donation_id uuid, _amount_minor bigint, _reason text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_id uuid; v_donor uuid;
BEGIN
  SELECT donor_id INTO v_donor FROM public.donations WHERE id=_donation_id;
  IF v_donor IS NULL THEN RAISE EXCEPTION 'Donation not found'; END IF;
  IF NOT (public.is_admin(auth.uid()) OR v_donor = auth.uid()) THEN RAISE EXCEPTION 'Not authorised'; END IF;
  INSERT INTO public.refund_records(donation_id, requested_by, amount_minor, reason)
  VALUES (_donation_id, auth.uid(), _amount_minor, _reason) RETURNING id INTO v_id;
  INSERT INTO public.audit_logs(user_id, action, action_type, target_type, target_id, details)
  VALUES (auth.uid(), 'refund_requested', 'insert', 'refund_records', v_id,
    jsonb_build_object('donation_id', _donation_id, 'amount_minor', _amount_minor));
  RETURN v_id;
END $$;
REVOKE ALL ON FUNCTION public.refund_request(uuid, bigint, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.refund_request(uuid, bigint, text) TO authenticated;
