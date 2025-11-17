-- Create storage buckets for PDF documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('donation-receipts', 'donation-receipts', false, 10485760, ARRAY['application/pdf']),
  ('impact-certificates', 'impact-certificates', false, 10485760, ARRAY['application/pdf']),
  ('evidence-packs', 'evidence-packs', false, 52428800, ARRAY['application/pdf', 'application/zip'])
ON CONFLICT (id) DO NOTHING;

-- Create document_records table to track all generated PDFs
CREATE TABLE IF NOT EXISTS public.document_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL CHECK (document_type IN ('receipt', 'certificate', 'evidence_pack')),
  document_id TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  related_id UUID, -- donation_id or project_id
  file_path TEXT NOT NULL,
  file_size BIGINT,
  status TEXT NOT NULL DEFAULT 'generated' CHECK (status IN ('generating', 'generated', 'failed')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  downloaded_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.document_records ENABLE ROW LEVEL SECURITY;

-- Users can view their own documents
CREATE POLICY "Users can view own documents"
ON public.document_records
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all documents
CREATE POLICY "Admins can view all documents"
ON public.document_records
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Admins can insert documents
CREATE POLICY "Admins can create documents"
ON public.document_records
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

-- Admins can update documents
CREATE POLICY "Admins can update documents"
ON public.document_records
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

-- Storage policies for donation-receipts bucket
CREATE POLICY "Users can read own receipts"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'donation-receipts' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Admins can read all receipts"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'donation-receipts' AND
  is_admin(auth.uid())
);

CREATE POLICY "Service can insert receipts"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'donation-receipts');

-- Storage policies for impact-certificates bucket
CREATE POLICY "Users can read own certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'impact-certificates' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Admins can read all certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'impact-certificates' AND
  is_admin(auth.uid())
);

CREATE POLICY "Service can insert certificates"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'impact-certificates');

-- Storage policies for evidence-packs bucket
CREATE POLICY "Users can read own evidence packs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'evidence-packs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Admins can read all evidence packs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'evidence-packs' AND
  is_admin(auth.uid())
);

CREATE POLICY "Service can insert evidence packs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'evidence-packs');

-- Create indexes
CREATE INDEX idx_document_records_user ON public.document_records(user_id);
CREATE INDEX idx_document_records_type ON public.document_records(document_type);
CREATE INDEX idx_document_records_related ON public.document_records(related_id);
CREATE INDEX idx_document_records_document_id ON public.document_records(document_id);

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_document_download(doc_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE document_records
  SET 
    downloaded_count = downloaded_count + 1,
    last_downloaded_at = now()
  WHERE id = doc_id;
END;
$$;