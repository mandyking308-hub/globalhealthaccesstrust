-- Create storage bucket for volunteer CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('volunteer-cvs', 'volunteer-cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Create volunteers table
CREATE TABLE IF NOT EXISTS public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  skills TEXT NOT NULL,
  experience TEXT NOT NULL,
  languages TEXT NOT NULL,
  cv_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create volunteer project requests table
CREATE TABLE IF NOT EXISTS public.volunteer_project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES public.volunteers(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(volunteer_id, project_id)
);

-- Create volunteer project assignments table
CREATE TABLE IF NOT EXISTS public.volunteer_project_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES public.volunteers(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  assigned_role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(volunteer_id, project_id)
);

-- Create volunteer updates table
CREATE TABLE IF NOT EXISTS public.volunteer_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES public.volunteers(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  update_type TEXT NOT NULL,
  file_url TEXT,
  note_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for volunteers
CREATE POLICY "Volunteers can view own profile"
  ON public.volunteers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Volunteers can update own profile"
  ON public.volunteers
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create volunteer application"
  ON public.volunteers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all volunteers"
  ON public.volunteers
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update volunteers"
  ON public.volunteers
  FOR UPDATE
  USING (is_admin(auth.uid()));

-- RLS Policies for volunteer_project_requests
CREATE POLICY "Volunteers can view own requests"
  ON public.volunteer_project_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.volunteers
      WHERE id = volunteer_project_requests.volunteer_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Volunteers can create requests"
  ON public.volunteer_project_requests
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.volunteers
      WHERE id = volunteer_project_requests.volunteer_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage requests"
  ON public.volunteer_project_requests
  FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for volunteer_project_assignments
CREATE POLICY "Volunteers can view own assignments"
  ON public.volunteer_project_assignments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.volunteers
      WHERE id = volunteer_project_assignments.volunteer_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage assignments"
  ON public.volunteer_project_assignments
  FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for volunteer_updates
CREATE POLICY "Volunteers can view own updates"
  ON public.volunteer_updates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.volunteers
      WHERE id = volunteer_updates.volunteer_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Volunteers can create updates"
  ON public.volunteer_updates
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.volunteers
      WHERE id = volunteer_updates.volunteer_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all updates"
  ON public.volunteer_updates
  FOR ALL
  USING (is_admin(auth.uid()));

-- Storage policies for volunteer CVs
CREATE POLICY "Volunteers can upload own CV"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'volunteer-cvs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Volunteers can view own CV"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'volunteer-cvs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all CVs"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'volunteer-cvs' AND
    is_admin(auth.uid())
  );

-- Add trigger for updated_at
CREATE TRIGGER update_volunteers_updated_at
  BEFORE UPDATE ON public.volunteers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();