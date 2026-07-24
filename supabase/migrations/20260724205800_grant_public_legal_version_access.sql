-- Allow website visitors to read only the current published legal-document version
-- through the existing public.current_legal_version RPC used by LegalDocumentPage.
-- This does not grant direct table access or any write/admin permission.

DO $$
DECLARE
  function_signature text;
  matching_functions integer := 0;
BEGIN
  FOR function_signature IN
    SELECT format(
      '%I.%I(%s)',
      namespace.nspname,
      procedure.proname,
      pg_get_function_identity_arguments(procedure.oid)
    )
    FROM pg_proc AS procedure
    JOIN pg_namespace AS namespace
      ON namespace.oid = procedure.pronamespace
    WHERE namespace.nspname = 'public'
      AND procedure.proname = 'current_legal_version'
  LOOP
    matching_functions := matching_functions + 1;
    EXECUTE format(
      'GRANT EXECUTE ON FUNCTION %s TO anon, authenticated',
      function_signature
    );
  END LOOP;

  IF matching_functions = 0 THEN
    RAISE EXCEPTION 'public.current_legal_version was not found';
  END IF;
END $$;
