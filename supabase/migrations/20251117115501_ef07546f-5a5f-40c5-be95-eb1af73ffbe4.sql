-- Create onboarding_status table
CREATE TABLE public.onboarding_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  donor_onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  volunteer_onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  admin_onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.onboarding_status ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own onboarding status
CREATE POLICY "Users can view own onboarding status"
ON public.onboarding_status
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding status"
ON public.onboarding_status
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding status"
ON public.onboarding_status
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view and manage all onboarding status
CREATE POLICY "Admins can manage all onboarding status"
ON public.onboarding_status
FOR ALL
TO authenticated
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_onboarding_status_updated_at
BEFORE UPDATE ON public.onboarding_status
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();