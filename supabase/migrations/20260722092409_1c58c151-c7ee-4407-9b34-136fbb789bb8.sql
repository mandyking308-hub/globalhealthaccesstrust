
-- 1. Extend commissioned_projects
ALTER TABLE public.commissioned_projects
  ADD COLUMN IF NOT EXISTS funding_target numeric(12,2),
  ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'GBP',
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Link fund_allocations to a project (optional; keeps legacy project_name text intact)
ALTER TABLE public.fund_allocations
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.commissioned_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_fund_allocations_project ON public.fund_allocations(project_id);

-- 3. project_expenses
CREATE TABLE IF NOT EXISTS public.project_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency text NOT NULL DEFAULT 'GBP',
  category text NOT NULL,
  description text,
  incurred_on date NOT NULL DEFAULT CURRENT_DATE,
  receipt_url text,
  recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_project_expenses_project ON public.project_expenses(project_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_expenses TO authenticated;
GRANT ALL ON public.project_expenses TO service_role;

ALTER TABLE public.project_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage all expenses" ON public.project_expenses
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Donors view own project expenses" ON public.project_expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.commissioned_projects cp
      WHERE cp.id = project_expenses.project_id AND cp.donor_id = auth.uid()
    )
  );

CREATE POLICY "Assigned volunteers view project expenses" ON public.project_expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.volunteer_project_assignments vpa
      JOIN public.volunteers v ON v.id = vpa.volunteer_id
      WHERE vpa.project_id = project_expenses.project_id
        AND v.user_id = auth.uid()
    )
  );

CREATE TRIGGER update_project_expenses_updated_at
  BEFORE UPDATE ON public.project_expenses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 4. project_messages
CREATE TABLE IF NOT EXISTS public.project_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_role text NOT NULL CHECK (sender_role IN ('donor','volunteer','admin')),
  body text NOT NULL CHECK (char_length(body) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_project_messages_project ON public.project_messages(project_id, created_at DESC);

GRANT SELECT, INSERT ON public.project_messages TO authenticated;
GRANT ALL ON public.project_messages TO service_role;

ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user a participant on the project?
CREATE OR REPLACE FUNCTION public.can_access_project(_project_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.is_admin(_user_id)
    OR EXISTS (SELECT 1 FROM public.commissioned_projects cp WHERE cp.id = _project_id AND cp.donor_id = _user_id)
    OR EXISTS (
      SELECT 1
      FROM public.volunteer_project_assignments vpa
      JOIN public.volunteers v ON v.id = vpa.volunteer_id
      WHERE vpa.project_id = _project_id AND v.user_id = _user_id
    );
$$;

CREATE POLICY "Participants view project messages" ON public.project_messages
  FOR SELECT USING (public.can_access_project(project_id, auth.uid()));

CREATE POLICY "Participants post project messages" ON public.project_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND public.can_access_project(project_id, auth.uid())
  );
