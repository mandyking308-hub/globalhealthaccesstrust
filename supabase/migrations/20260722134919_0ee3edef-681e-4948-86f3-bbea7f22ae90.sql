
-- 1. Extend legal_acceptances with event type + context (additive, backwards compatible)
ALTER TABLE public.legal_acceptances
  ADD COLUMN IF NOT EXISTS event_type text NOT NULL DEFAULT 'acceptance',
  ADD COLUMN IF NOT EXISTS acceptance_context text;

ALTER TABLE public.legal_acceptances
  ADD CONSTRAINT legal_acceptances_event_type_check
  CHECK (event_type IN ('acceptance','acknowledgement'));

-- Idempotency: one event per (user, document, version, event_type, context)
CREATE UNIQUE INDEX IF NOT EXISTS legal_acceptances_event_unique
  ON public.legal_acceptances (user_id, document_id, version_id, event_type, COALESCE(acceptance_context, ''));

-- 2. New secure recorder that does not collect user agent
CREATE OR REPLACE FUNCTION public.record_legal_event(
  _slug text,
  _event_type text DEFAULT 'acceptance',
  _context text DEFAULT NULL,
  _role text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  d public.legal_documents%ROWTYPE;
  v public.legal_document_versions%ROWTYPE;
  new_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Sign-in required';
  END IF;
  IF _event_type NOT IN ('acceptance','acknowledgement') THEN
    RAISE EXCEPTION 'Invalid event_type';
  END IF;

  SELECT * INTO d FROM public.legal_documents WHERE slug = _slug;
  IF NOT FOUND OR d.current_published_version_id IS NULL THEN
    -- Silently succeed when document not yet published; caller treats as non-blocking.
    RETURN NULL;
  END IF;
  SELECT * INTO v FROM public.legal_document_versions WHERE id = d.current_published_version_id;

  INSERT INTO public.legal_acceptances (
    user_id, document_id, version_id, role,
    acceptance_text_snapshot, event_type, acceptance_context
  ) VALUES (
    auth.uid(), d.id, v.id, _role,
    COALESCE(v.acceptance_text,
      CASE WHEN _event_type = 'acknowledgement'
           THEN 'I acknowledge that I have read ' || d.title || ' (version ' || v.version_number || ').'
           ELSE 'I accept ' || d.title || ' (version ' || v.version_number || ').'
      END),
    _event_type, _context
  )
  ON CONFLICT (user_id, document_id, version_id, event_type, COALESCE(acceptance_context, '')) DO NOTHING
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.record_legal_event(text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_legal_event(text, text, text, text) TO authenticated;

-- 3. Server-side trigger so events are recorded even when signup requires email confirmation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  terms_slug text := COALESCE(m->>'terms_document_slug', 'terms-of-use');
  privacy_slug text := COALESCE(m->>'privacy_document_slug', 'privacy-notice');
  terms_doc public.legal_documents%ROWTYPE;
  privacy_doc public.legal_documents%ROWTYPE;
  terms_ver public.legal_document_versions%ROWTYPE;
  privacy_ver public.legal_document_versions%ROWTYPE;
BEGIN
  -- Profile (do NOT force blanket gdpr_consent)
  INSERT INTO public.profiles (id, first_name, last_name, email, gdpr_consent)
  VALUES (
    NEW.id,
    COALESCE(m->>'first_name', ''),
    COALESCE(m->>'last_name', ''),
    NEW.email,
    false
  )
  ON CONFLICT (id) DO NOTHING;

  -- Default donor role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'donor')
  ON CONFLICT DO NOTHING;

  -- Terms acceptance (idempotent)
  IF (m ? 'terms_accepted_at') OR COALESCE((m->>'terms_accepted')::boolean, false) THEN
    SELECT * INTO terms_doc FROM public.legal_documents WHERE slug = terms_slug;
    IF FOUND AND terms_doc.current_published_version_id IS NOT NULL THEN
      SELECT * INTO terms_ver FROM public.legal_document_versions WHERE id = terms_doc.current_published_version_id;
      INSERT INTO public.legal_acceptances (
        user_id, document_id, version_id, role,
        acceptance_text_snapshot, event_type, acceptance_context
      ) VALUES (
        NEW.id, terms_doc.id, terms_ver.id, 'donor',
        COALESCE(terms_ver.acceptance_text,
          'I accept ' || terms_doc.title || ' (version ' || terms_ver.version_number || ').'),
        'acceptance', 'account_creation'
      )
      ON CONFLICT (user_id, document_id, version_id, event_type, COALESCE(acceptance_context, '')) DO NOTHING;
    END IF;
  END IF;

  -- Privacy Notice acknowledgement (idempotent)
  IF (m ? 'privacy_acknowledged_at') THEN
    SELECT * INTO privacy_doc FROM public.legal_documents WHERE slug = privacy_slug;
    IF FOUND AND privacy_doc.current_published_version_id IS NOT NULL THEN
      SELECT * INTO privacy_ver FROM public.legal_document_versions WHERE id = privacy_doc.current_published_version_id;
      INSERT INTO public.legal_acceptances (
        user_id, document_id, version_id, role,
        acceptance_text_snapshot, event_type, acceptance_context
      ) VALUES (
        NEW.id, privacy_doc.id, privacy_ver.id, 'donor',
        COALESCE(privacy_ver.acceptance_text,
          'I acknowledge that I have read ' || privacy_doc.title || ' (version ' || privacy_ver.version_number || ').'),
        'acknowledgement', 'account_creation'
      )
      ON CONFLICT (user_id, document_id, version_id, event_type, COALESCE(acceptance_context, '')) DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;
