
-- ============ Enums ============
DO $$ BEGIN
  CREATE TYPE public.legal_review_status AS ENUM (
    'draft','internal_review','solicitor_review','trustee_approved','published','superseded'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============ Legal Entity Settings ============
CREATE TABLE IF NOT EXISTS public.legal_entity_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton BOOLEAN NOT NULL DEFAULT TRUE UNIQUE,
  legal_name TEXT,
  trading_name TEXT,
  legal_status TEXT,
  company_number TEXT,
  charity_number TEXT,
  regulator TEXT,
  registered_address TEXT,
  contact_email TEXT,
  insurance_summary TEXT,
  governing_law TEXT,
  jurisdiction TEXT,
  high_value_threshold NUMERIC NOT NULL DEFAULT 10000,
  enhanced_dd_threshold NUMERIC NOT NULL DEFAULT 2500,
  trustee_approval_threshold NUMERIC NOT NULL DEFAULT 25000,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.legal_entity_settings TO anon, authenticated;
GRANT ALL ON public.legal_entity_settings TO service_role;
ALTER TABLE public.legal_entity_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read legal entity settings"
  ON public.legal_entity_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage legal entity settings"
  ON public.legal_entity_settings FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

INSERT INTO public.legal_entity_settings (singleton) VALUES (TRUE)
  ON CONFLICT (singleton) DO NOTHING;

-- ============ Legal Documents ============
CREATE TABLE IF NOT EXISTS public.legal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  requires_signup_acceptance BOOLEAN NOT NULL DEFAULT FALSE,
  requires_team_acceptance BOOLEAN NOT NULL DEFAULT FALSE,
  requires_donation_acceptance BOOLEAN NOT NULL DEFAULT FALSE,
  current_published_version_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.legal_documents TO anon, authenticated;
GRANT ALL ON public.legal_documents TO service_role;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read legal documents index"
  ON public.legal_documents FOR SELECT USING (true);
CREATE POLICY "Admins manage legal documents"
  ON public.legal_documents FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ============ Legal Document Versions ============
CREATE TABLE IF NOT EXISTS public.legal_document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.legal_documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  body_markdown TEXT NOT NULL DEFAULT '',
  acceptance_text TEXT,
  effective_date DATE,
  material_change BOOLEAN NOT NULL DEFAULT FALSE,
  review_status public.legal_review_status NOT NULL DEFAULT 'draft',
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewer_note TEXT,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  superseded_at TIMESTAMPTZ,
  supersedes_version_id UUID REFERENCES public.legal_document_versions(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (document_id, version_number)
);

GRANT SELECT ON public.legal_document_versions TO anon, authenticated;
GRANT ALL ON public.legal_document_versions TO service_role;
ALTER TABLE public.legal_document_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published legal versions"
  ON public.legal_document_versions FOR SELECT
  USING (review_status = 'published');
CREATE POLICY "Admins can read all legal versions"
  ON public.legal_document_versions FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins manage legal versions"
  ON public.legal_document_versions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ============ Legal Acceptances ============
CREATE TABLE IF NOT EXISTS public.legal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.legal_documents(id) ON DELETE RESTRICT,
  version_id UUID NOT NULL REFERENCES public.legal_document_versions(id) ON DELETE RESTRICT,
  role TEXT,
  project_id UUID REFERENCES public.commissioned_projects(id) ON DELETE SET NULL,
  acceptance_text_snapshot TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.legal_acceptances TO authenticated;
GRANT ALL ON public.legal_acceptances TO service_role;
ALTER TABLE public.legal_acceptances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see their own acceptances"
  ON public.legal_acceptances FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "Users can insert their own acceptances"
  ON public.legal_acceptances FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ============ Updated_at trigger ============
DROP TRIGGER IF EXISTS trg_legal_entity_updated ON public.legal_entity_settings;
CREATE TRIGGER trg_legal_entity_updated BEFORE UPDATE ON public.legal_entity_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS trg_legal_documents_updated ON public.legal_documents;
CREATE TRIGGER trg_legal_documents_updated BEFORE UPDATE ON public.legal_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS trg_legal_versions_updated ON public.legal_document_versions;
CREATE TRIGGER trg_legal_versions_updated BEFORE UPDATE ON public.legal_document_versions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============ Legal-entity verified helper ============
CREATE OR REPLACE FUNCTION public.legal_entity_is_verified()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.legal_entity_settings
    WHERE verified_at IS NOT NULL
      AND legal_name IS NOT NULL AND legal_name <> ''
      AND legal_status IS NOT NULL AND legal_status <> ''
      AND registered_address IS NOT NULL AND registered_address <> ''
      AND governing_law IS NOT NULL AND governing_law <> ''
  );
$$;

-- ============ Publish a legal version ============
CREATE OR REPLACE FUNCTION public.publish_legal_version(_version_id UUID)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v public.legal_document_versions%ROWTYPE;
  prev_id UUID;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Not authorised';
  END IF;

  SELECT * INTO v FROM public.legal_document_versions WHERE id = _version_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Version not found'; END IF;

  IF NOT public.legal_entity_is_verified() THEN
    RAISE EXCEPTION 'Legal entity details must be verified before publishing legal documents';
  END IF;

  IF v.review_status <> 'trustee_approved' THEN
    RAISE EXCEPTION 'Only trustee-approved versions can be published';
  END IF;

  SELECT current_published_version_id INTO prev_id FROM public.legal_documents WHERE id = v.document_id;
  IF prev_id IS NOT NULL AND prev_id <> _version_id THEN
    UPDATE public.legal_document_versions
      SET review_status = 'superseded', superseded_at = now()
      WHERE id = prev_id;
    UPDATE public.legal_document_versions
      SET supersedes_version_id = prev_id
      WHERE id = _version_id;
  END IF;

  UPDATE public.legal_document_versions
    SET review_status = 'published',
        published_at = COALESCE(published_at, now()),
        effective_date = COALESCE(effective_date, CURRENT_DATE)
    WHERE id = _version_id;

  UPDATE public.legal_documents
    SET current_published_version_id = _version_id, updated_at = now()
    WHERE id = v.document_id;

  RETURN _version_id;
END;
$$;

-- ============ Current published version (public read) ============
CREATE OR REPLACE FUNCTION public.current_legal_version(_slug TEXT)
RETURNS TABLE (
  document_id UUID, slug TEXT, title TEXT, category TEXT,
  version_id UUID, version_number INTEGER, body_markdown TEXT,
  summary TEXT, acceptance_text TEXT, effective_date DATE, published_at TIMESTAMPTZ,
  requires_signup_acceptance BOOLEAN, requires_team_acceptance BOOLEAN,
  requires_donation_acceptance BOOLEAN
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT d.id, d.slug, d.title, d.category,
         v.id, v.version_number, v.body_markdown,
         v.summary, v.acceptance_text, v.effective_date, v.published_at,
         d.requires_signup_acceptance, d.requires_team_acceptance,
         d.requires_donation_acceptance
  FROM public.legal_documents d
  JOIN public.legal_document_versions v ON v.id = d.current_published_version_id
  WHERE d.slug = _slug AND v.review_status = 'published';
$$;

-- ============ Record acceptance ============
CREATE OR REPLACE FUNCTION public.record_legal_acceptance(
  _slug TEXT, _role TEXT DEFAULT NULL, _project_id UUID DEFAULT NULL,
  _user_agent TEXT DEFAULT NULL
) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  d public.legal_documents%ROWTYPE;
  v public.legal_document_versions%ROWTYPE;
  new_id UUID;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sign-in required to record acceptance'; END IF;
  SELECT * INTO d FROM public.legal_documents WHERE slug = _slug;
  IF NOT FOUND OR d.current_published_version_id IS NULL THEN
    RAISE EXCEPTION 'Document not currently published';
  END IF;
  SELECT * INTO v FROM public.legal_document_versions WHERE id = d.current_published_version_id;

  INSERT INTO public.legal_acceptances (
    user_id, document_id, version_id, role, project_id,
    acceptance_text_snapshot, user_agent
  ) VALUES (
    auth.uid(), d.id, v.id, _role, _project_id,
    COALESCE(v.acceptance_text,
      'I confirm I have read and accept ' || d.title || ' (version ' || v.version_number || ').'),
    _user_agent
  ) RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

-- ============ Needs re-acceptance? ============
CREATE OR REPLACE FUNCTION public.needs_legal_reacceptance(_slug TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH cur AS (
    SELECT d.id AS doc_id, d.current_published_version_id AS v_id
    FROM public.legal_documents d WHERE d.slug = _slug
  )
  SELECT CASE
    WHEN (SELECT v_id FROM cur) IS NULL THEN FALSE
    WHEN auth.uid() IS NULL THEN TRUE
    ELSE NOT EXISTS (
      SELECT 1 FROM public.legal_acceptances la
      WHERE la.user_id = auth.uid()
        AND la.document_id = (SELECT doc_id FROM cur)
        AND la.version_id = (SELECT v_id FROM cur)
    )
  END;
$$;

-- ============ Seed nine documents (drafts) ============
INSERT INTO public.legal_documents (slug, title, category, requires_signup_acceptance, requires_team_acceptance, requires_donation_acceptance) VALUES
  ('terms-of-use', 'Website Terms of Use', 'terms', FALSE, FALSE, FALSE),
  ('donor-funding-terms', 'Donor and Project Funding Terms', 'donor', TRUE, FALSE, TRUE),
  ('privacy-notice', 'Privacy Notice', 'privacy', TRUE, TRUE, FALSE),
  ('cookie-notice', 'Cookie Notice', 'privacy', FALSE, FALSE, FALSE),
  ('complaints-policy', 'Complaints Policy', 'governance', FALSE, FALSE, FALSE),
  ('gift-acceptance-policy', 'Gift Acceptance, Refusal and Return Policy', 'governance', FALSE, FALSE, FALSE),
  ('safeguarding-policy', 'Safeguarding and Protected Concerns Policy', 'governance', FALSE, TRUE, FALSE),
  ('project-team-terms', 'Project Team Terms', 'team', FALSE, TRUE, FALSE),
  ('media-policy', 'Photography, Field Evidence and Media Policy', 'governance', FALSE, TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;

-- Seed empty draft v1 for each doc so admins can immediately edit
INSERT INTO public.legal_document_versions (document_id, version_number, title, body_markdown, acceptance_text)
SELECT d.id, 1, d.title,
  '# ' || d.title || E'\n\n> Draft — awaiting Trust review and trustee approval.\n\nContent will be authored by the Trust and reviewed before publication.',
  'I confirm I have read and accept the ' || d.title || '.'
FROM public.legal_documents d
WHERE NOT EXISTS (
  SELECT 1 FROM public.legal_document_versions v WHERE v.document_id = d.id
);
