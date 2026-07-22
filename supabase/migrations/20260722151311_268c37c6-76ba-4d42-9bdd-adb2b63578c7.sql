
-- 1. Cookie registry (internal inventory)
CREATE TABLE IF NOT EXISTS public.cookie_registry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_key TEXT NOT NULL,
  provider TEXT NOT NULL,
  purpose TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('necessary','functional','analytics','other')),
  duration TEXT NOT NULL,
  is_first_party BOOLEAN NOT NULL DEFAULT true,
  legal_basis TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  last_reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (storage_key, provider)
);
GRANT SELECT ON public.cookie_registry TO anon, authenticated;
GRANT ALL ON public.cookie_registry TO service_role;
ALTER TABLE public.cookie_registry ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cookie registry public read" ON public.cookie_registry FOR SELECT USING (true);
CREATE POLICY "cookie registry admin write" ON public.cookie_registry FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_cr_updated_at BEFORE UPDATE ON public.cookie_registry
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 2. Consent events
CREATE TABLE IF NOT EXISTS public.cookie_consent_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_key TEXT,
  necessary BOOLEAN NOT NULL DEFAULT true,
  functional BOOLEAN NOT NULL DEFAULT false,
  analytics BOOLEAN NOT NULL DEFAULT false,
  other BOOLEAN NOT NULL DEFAULT false,
  action TEXT NOT NULL CHECK (action IN ('accept_all','reject_non_essential','custom','withdraw')),
  preference_version TEXT NOT NULL DEFAULT 'cookie-notice-1.0',
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.cookie_consent_events TO anon, authenticated;
GRANT SELECT ON public.cookie_consent_events TO authenticated;
GRANT ALL ON public.cookie_consent_events TO service_role;
ALTER TABLE public.cookie_consent_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "consent insert any" ON public.cookie_consent_events FOR INSERT WITH CHECK (true);
CREATE POLICY "consent read self or admin" ON public.cookie_consent_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- 3. Communication channels
CREATE TABLE IF NOT EXISTS public.communication_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  description TEXT,
  is_service_message BOOLEAN NOT NULL DEFAULT false,
  is_project_update BOOLEAN NOT NULL DEFAULT false,
  is_optional_marketing BOOLEAN NOT NULL DEFAULT true,
  medium TEXT NOT NULL CHECK (medium IN ('email','sms','direct_message','postal','telephone','in_app')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.communication_channels TO anon, authenticated;
GRANT ALL ON public.communication_channels TO service_role;
ALTER TABLE public.communication_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "channels public read" ON public.communication_channels FOR SELECT USING (true);
CREATE POLICY "channels admin write" ON public.communication_channels FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.communication_channels (code, label, description, is_service_message, is_project_update, is_optional_marketing, medium) VALUES
  ('service_email','Service and transaction messages','Receipts, confirmations, security notices, and legally required notifications',true,false,false,'email'),
  ('project_updates_email','Project updates you requested','Progress reports on projects you have supported',false,true,false,'email'),
  ('fundraising_email','Fundraising email','Occasional email about the Trust''s charitable work and how you can help',false,false,true,'email'),
  ('fundraising_sms','Fundraising SMS','Occasional SMS about the Trust''s charitable work',false,false,true,'sms'),
  ('fundraising_dm','Fundraising direct message','Direct messages through the donor portal',false,false,true,'direct_message'),
  ('fundraising_post','Postal fundraising','Occasional post about the Trust''s charitable work',false,false,true,'postal'),
  ('fundraising_phone','Telephone fundraising','Occasional call about the Trust''s charitable work',false,false,true,'telephone'),
  ('research_invitations','Research or event invitations','Invitations to closed briefings, roundtables or research interviews',false,false,true,'email')
ON CONFLICT (code) DO NOTHING;

-- 4. Communication preferences (per user)
CREATE TABLE IF NOT EXISTS public.communication_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_code TEXT NOT NULL REFERENCES public.communication_channels(code) ON DELETE CASCADE,
  opted_in BOOLEAN NOT NULL DEFAULT false,
  lawful_basis TEXT,
  source TEXT,
  set_by TEXT NOT NULL DEFAULT 'user' CHECK (set_by IN ('user','admin','soft_optin','import')),
  set_by_user UUID REFERENCES auth.users(id),
  evidence_notes TEXT,
  wording_version TEXT,
  set_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, channel_code)
);
GRANT SELECT, INSERT, UPDATE ON public.communication_preferences TO authenticated;
GRANT ALL ON public.communication_preferences TO service_role;
ALTER TABLE public.communication_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "prefs own read" ON public.communication_preferences FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "prefs own write" ON public.communication_preferences FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "prefs own update" ON public.communication_preferences FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE TRIGGER trg_cp_updated_at BEFORE UPDATE ON public.communication_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 5. Suppressions (append-only marketing-suppression list)
CREATE TABLE IF NOT EXISTS public.communication_suppressions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_hash BYTEA NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('email','sms','postal','telephone')),
  channel_code TEXT REFERENCES public.communication_channels(code),
  reason TEXT NOT NULL CHECK (reason IN ('unsubscribe','bounce','complaint','request','admin')),
  source TEXT,
  suppressed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (contact_hash, contact_type, channel_code, reason)
);
GRANT SELECT ON public.communication_suppressions TO authenticated;
GRANT ALL ON public.communication_suppressions TO service_role;
ALTER TABLE public.communication_suppressions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "suppressions admin read" ON public.communication_suppressions FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 6. Soft opt-in settings (single row, disabled by default)
CREATE TABLE IF NOT EXISTS public.soft_optin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE CHECK (singleton = true),
  enabled BOOLEAN NOT NULL DEFAULT false,
  qualifies_as_charity_recorded BOOLEAN NOT NULL DEFAULT false,
  collected_directly_recorded BOOLEAN NOT NULL DEFAULT false,
  interest_or_support_recorded BOOLEAN NOT NULL DEFAULT false,
  opt_out_offered_at_collection_recorded BOOLEAN NOT NULL DEFAULT false,
  only_own_charitable_purposes_recorded BOOLEAN NOT NULL DEFAULT false,
  every_message_contains_opt_out_recorded BOOLEAN NOT NULL DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  evidence_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.soft_optin_settings TO authenticated;
GRANT ALL ON public.soft_optin_settings TO service_role;
ALTER TABLE public.soft_optin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "soft optin admin only" ON public.soft_optin_settings FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_soi_updated_at BEFORE UPDATE ON public.soft_optin_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
INSERT INTO public.soft_optin_settings (singleton) VALUES (true) ON CONFLICT DO NOTHING;

-- Guard: can only enable if all six conditions recorded and approver set
CREATE OR REPLACE FUNCTION public.soft_optin_enable_guard()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.enabled AND NOT (
    NEW.qualifies_as_charity_recorded
    AND NEW.collected_directly_recorded
    AND NEW.interest_or_support_recorded
    AND NEW.opt_out_offered_at_collection_recorded
    AND NEW.only_own_charitable_purposes_recorded
    AND NEW.every_message_contains_opt_out_recorded
    AND NEW.approved_by IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Soft opt-in cannot be enabled: statutory conditions and approver must all be recorded';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_soi_enable_guard ON public.soft_optin_settings;
CREATE TRIGGER trg_soi_enable_guard BEFORE UPDATE ON public.soft_optin_settings
  FOR EACH ROW EXECUTE FUNCTION public.soft_optin_enable_guard();

-- 7. Campaign register
CREATE TABLE IF NOT EXISTS public.communication_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  channel_code TEXT NOT NULL REFERENCES public.communication_channels(code),
  lawful_basis TEXT NOT NULL,
  audience_source TEXT NOT NULL,
  message_version TEXT NOT NULL,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  send_started_at TIMESTAMPTZ,
  send_completed_at TIMESTAMPTZ,
  total_recipients INTEGER,
  total_unsubscribes INTEGER,
  total_bounces INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.communication_campaigns TO authenticated;
GRANT ALL ON public.communication_campaigns TO service_role;
ALTER TABLE public.communication_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "campaigns admin only" ON public.communication_campaigns FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_cc_updated_at BEFORE UPDATE ON public.communication_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 8. Public unsubscribe tokens (single-use, no login required)
CREATE TABLE IF NOT EXISTS public.email_unsubscribe_public_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  contact_hash BYTEA NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('email','sms','postal','telephone')),
  channel_code TEXT REFERENCES public.communication_channels(code),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '90 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.email_unsubscribe_public_tokens TO anon, authenticated;
GRANT ALL ON public.email_unsubscribe_public_tokens TO service_role;
ALTER TABLE public.email_unsubscribe_public_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "unsub tokens public read by token" ON public.email_unsubscribe_public_tokens FOR SELECT USING (true);

-- 9. Public RPC: apply an unsubscribe token
CREATE OR REPLACE FUNCTION public.apply_unsubscribe_token(_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t public.email_unsubscribe_public_tokens%ROWTYPE;
BEGIN
  SELECT * INTO t FROM public.email_unsubscribe_public_tokens WHERE token = _token;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'reason', 'invalid'); END IF;
  IF t.used_at IS NOT NULL THEN RETURN jsonb_build_object('ok', true, 'reason', 'already_used'); END IF;
  IF t.expires_at < now() THEN RETURN jsonb_build_object('ok', false, 'reason', 'expired'); END IF;

  INSERT INTO public.communication_suppressions (contact_hash, contact_type, channel_code, reason, source)
  VALUES (t.contact_hash, t.contact_type, t.channel_code, 'unsubscribe', 'public_token')
  ON CONFLICT DO NOTHING;

  UPDATE public.email_unsubscribe_public_tokens SET used_at = now() WHERE id = t.id;
  RETURN jsonb_build_object('ok', true, 'reason', 'applied');
END $$;
REVOKE ALL ON FUNCTION public.apply_unsubscribe_token(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.apply_unsubscribe_token(TEXT) TO anon, authenticated;

-- 10. Seed cookie registry with the site's actual keys
INSERT INTO public.cookie_registry (storage_key, provider, purpose, category, duration, is_first_party, legal_basis, notes) VALUES
  ('sb-oaovlhbzqymwhuqmwwku-auth-token','Global Health Access Trust','Maintains your signed-in session on the donor, project team and admin portals','necessary','Session or up to 1 year',true,'Strictly necessary — no consent required','Set by Supabase Auth client'),
  ('ghat-cookie-consent','Global Health Access Trust','Stores your cookie-preference choices so we do not ask on every page','necessary','1 year',true,'Strictly necessary — no consent required',NULL),
  ('ghat-consent-timestamp','Global Health Access Trust','Records the date and time your cookie choices were made','necessary','1 year',true,'Strictly necessary — no consent required',NULL),
  ('ghat-consent-version','Global Health Access Trust','Records the Cookie Notice version you consented to','necessary','1 year',true,'Strictly necessary — no consent required',NULL)
ON CONFLICT DO NOTHING;
