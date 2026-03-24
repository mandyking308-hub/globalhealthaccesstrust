
ALTER TABLE public.inbound_contacts 
ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'Low',
ADD COLUMN IF NOT EXISTS attachment_url text;

ALTER TABLE public.volunteers 
ADD COLUMN IF NOT EXISTS availability text DEFAULT 'Part-time',
ADD COLUMN IF NOT EXISTS area_of_interest text DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS motivation text;
