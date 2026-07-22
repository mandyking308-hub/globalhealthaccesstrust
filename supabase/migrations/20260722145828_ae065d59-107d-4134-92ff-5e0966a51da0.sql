
CREATE POLICY "pta admin read" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'project-team-applications' AND public.is_admin(auth.uid()));

CREATE POLICY "pta authed insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-team-applications' AND auth.uid() IS NOT NULL);

CREATE POLICY "pta admin delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-team-applications' AND public.is_admin(auth.uid()));
