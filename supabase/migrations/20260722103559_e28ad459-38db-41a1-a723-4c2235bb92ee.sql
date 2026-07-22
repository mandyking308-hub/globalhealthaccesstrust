
DROP POLICY IF EXISTS "Donors view assigned volunteer identity" ON public.volunteers;

CREATE OR REPLACE FUNCTION public.donor_can_view_volunteer(_volunteer_id uuid, _donor_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.volunteer_project_assignments vpa
    JOIN public.commissioned_projects cp ON cp.id = vpa.project_id
    WHERE vpa.volunteer_id = _volunteer_id AND cp.donor_id = _donor_id
  );
$$;

REVOKE EXECUTE ON FUNCTION public.donor_can_view_volunteer(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.donor_can_view_volunteer(uuid, uuid) TO authenticated;

CREATE POLICY "Donors view assigned volunteer identity"
ON public.volunteers
FOR SELECT
TO authenticated
USING (public.donor_can_view_volunteer(id, auth.uid()));
