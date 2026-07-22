-- Publish the seven legal documents approved for release following Gary's legal review
-- and Mandy King's instruction to publish on 22 July 2026.
-- Idempotent: rerunning leaves the same current published versions in place.

DO $$
DECLARE
  v_slugs text[] := ARRAY[
    'terms-of-use',
    'privacy-notice',
    'cookie-notice',
    'project-team-terms',
    'complaints-policy',
    'safeguarding-policy',
    'media-policy'
  ];
  v_doc record;
  v_version_id uuid;
  v_approver uuid;
  v_found integer;
BEGIN
  SELECT count(*)
    INTO v_found
    FROM public.legal_documents
   WHERE slug = ANY(v_slugs);

  IF v_found <> array_length(v_slugs, 1) THEN
    RAISE EXCEPTION 'Expected 7 approved legal documents, found %', v_found;
  END IF;

  SELECT verified_by
    INTO v_approver
    FROM public.legal_entity_settings
   ORDER BY verified_at DESC NULLS LAST
   LIMIT 1;

  FOR v_doc IN
    SELECT id, slug, current_published_version_id
      FROM public.legal_documents
     WHERE slug = ANY(v_slugs)
     ORDER BY slug
  LOOP
    SELECT id
      INTO v_version_id
      FROM public.legal_document_versions
     WHERE document_id = v_doc.id
     ORDER BY version_number DESC, created_at DESC
     LIMIT 1;

    IF v_version_id IS NULL THEN
      RAISE EXCEPTION 'No legal document version exists for %', v_doc.slug;
    END IF;

    IF v_doc.current_published_version_id IS NOT NULL
       AND v_doc.current_published_version_id <> v_version_id THEN
      UPDATE public.legal_document_versions
         SET review_status = 'superseded'
       WHERE id = v_doc.current_published_version_id
         AND review_status = 'published';
    END IF;

    UPDATE public.legal_document_versions
       SET review_status = 'published',
           approved_at = COALESCE(approved_at, now()),
           approved_by = COALESCE(approved_by, v_approver, created_by),
           published_at = COALESCE(published_at, now()),
           effective_date = COALESCE(effective_date, DATE '2026-07-22'),
           reviewer_note = concat_ws(
             E'\n',
             NULLIF(reviewer_note, ''),
             'Gary confirmed legal review was complete. Publication authorised by Mandy King on 22 July 2026.'
           )
     WHERE id = v_version_id;

    UPDATE public.legal_documents
       SET current_published_version_id = v_version_id
     WHERE id = v_doc.id;
  END LOOP;
END $$;

-- Guardrail: the signed governing document remains a separate public PDF at
-- /GHAT_Constitution_2025_Refined.pdf and is not altered by this migration.
