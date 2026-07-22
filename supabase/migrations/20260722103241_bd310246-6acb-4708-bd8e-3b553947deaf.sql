
CREATE POLICY "Donors view own project allocations"
ON public.fund_allocations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.commissioned_projects cp
    WHERE cp.id = fund_allocations.project_id AND cp.donor_id = auth.uid()
  )
);
