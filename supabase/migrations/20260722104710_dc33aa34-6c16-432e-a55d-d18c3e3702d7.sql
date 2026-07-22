
-- Add donor-visibility flag for responsibilities
ALTER TABLE public.volunteer_project_assignments
  ADD COLUMN IF NOT EXISTS responsibilities_donor_visible boolean NOT NULL DEFAULT false;

-- Remove the broad donor SELECT policy on the full volunteers table.
-- Donor-facing team identity is now served exclusively through the RPC below.
DROP POLICY IF EXISTS "Donors view assigned volunteer identity" ON public.volunteers;

-- Secure donor-facing team RPC. Returns only safe fields, with a
-- pre-calculated display name derived from the approved visibility mode.
CREATE OR REPLACE FUNCTION public.donor_project_team(_project_ids uuid[])
RETURNS TABLE (
  assignment_id uuid,
  project_id uuid,
  assigned_role text,
  responsibilities text,
  donor_visibility_mode text,
  display_name text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    vpa.id AS assignment_id,
    vpa.project_id,
    vpa.assigned_role,
    CASE WHEN vpa.responsibilities_donor_visible THEN vpa.responsibilities ELSE NULL END AS responsibilities,
    vpa.donor_visibility_mode,
    CASE vpa.donor_visibility_mode
      WHEN 'full_name'  THEN COALESCE(NULLIF(v.name, ''), 'Field team member')
      WHEN 'first_name' THEN COALESCE(NULLIF(split_part(v.name, ' ', 1), ''), 'Field team member')
      WHEN 'role_only'  THEN COALESCE(NULLIF(vpa.assigned_role, ''), 'Field team member')
      WHEN 'anonymised' THEN 'Field team member'
      ELSE 'Field team member'
    END AS display_name
  FROM public.volunteer_project_assignments vpa
  JOIN public.volunteers v ON v.id = vpa.volunteer_id
  JOIN public.commissioned_projects cp ON cp.id = vpa.project_id
  WHERE cp.donor_id = auth.uid()
    AND vpa.project_id = ANY(_project_ids);
$$;

REVOKE ALL ON FUNCTION public.donor_project_team(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.donor_project_team(uuid[]) TO authenticated;
