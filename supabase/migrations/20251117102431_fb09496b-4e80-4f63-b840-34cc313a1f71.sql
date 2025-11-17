-- Create commissioned projects table
CREATE TABLE IF NOT EXISTS public.commissioned_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  urgency TEXT NOT NULL,
  dedication TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
);

-- Create project milestones table
CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  milestone_title TEXT NOT NULL,
  milestone_description TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create project updates table
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  update_type TEXT NOT NULL,
  file_url TEXT,
  note_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.commissioned_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for commissioned_projects
CREATE POLICY "Donors can view own projects"
  ON public.commissioned_projects
  FOR SELECT
  USING (auth.uid() = donor_id);

CREATE POLICY "Donors can create projects"
  ON public.commissioned_projects
  FOR INSERT
  WITH CHECK (auth.uid() = donor_id);

CREATE POLICY "Admins can view all projects"
  ON public.commissioned_projects
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update projects"
  ON public.commissioned_projects
  FOR UPDATE
  USING (is_admin(auth.uid()));

-- RLS Policies for project_milestones
CREATE POLICY "Donors can view milestones for own projects"
  ON public.project_milestones
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.commissioned_projects
      WHERE id = project_milestones.project_id
      AND donor_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage milestones"
  ON public.project_milestones
  FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for project_updates
CREATE POLICY "Donors can view updates for own projects"
  ON public.project_updates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.commissioned_projects
      WHERE id = project_updates.project_id
      AND donor_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage updates"
  ON public.project_updates
  FOR ALL
  USING (is_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_commissioned_projects_updated_at
  BEFORE UPDATE ON public.commissioned_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();