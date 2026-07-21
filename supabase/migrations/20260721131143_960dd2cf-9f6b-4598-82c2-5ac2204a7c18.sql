
DROP POLICY IF EXISTS "Service can insert receipts" ON storage.objects;
DROP POLICY IF EXISTS "Service can insert certificates" ON storage.objects;
DROP POLICY IF EXISTS "Service can insert evidence packs" ON storage.objects;

CREATE POLICY "Users can insert own receipts"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'receipts'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'admin')
  )
);

CREATE POLICY "Users can insert own certificates"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'certificates'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'admin')
  )
);

CREATE POLICY "Users can insert own evidence packs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'evidence-packs'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'admin')
  )
);
