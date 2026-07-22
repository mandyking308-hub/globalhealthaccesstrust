
CREATE POLICY "Donors view assigned volunteer identity"
ON public.volunteers
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.volunteer_project_assignments vpa
    JOIN public.commissioned_projects cp ON cp.id = vpa.project_id
    WHERE vpa.volunteer_id = volunteers.id AND cp.donor_id = auth.uid()
  )
);
