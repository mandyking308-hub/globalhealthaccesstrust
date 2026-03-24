
CREATE TABLE public.inbound_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organisation TEXT,
  position TEXT,
  nature_of_enquiry TEXT NOT NULL,
  message TEXT NOT NULL,
  additional_context TEXT,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inbound_contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (public form)
CREATE POLICY "Anyone can submit enquiry"
  ON public.inbound_contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Admins can view all enquiries
CREATE POLICY "Admins can view all enquiries"
  ON public.inbound_contacts
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

-- Admins can update enquiries
CREATE POLICY "Admins can update enquiries"
  ON public.inbound_contacts
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()));
