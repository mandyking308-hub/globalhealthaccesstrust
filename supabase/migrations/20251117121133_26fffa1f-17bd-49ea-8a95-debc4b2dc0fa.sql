-- Create presentations table
CREATE TABLE IF NOT EXISTS public.presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('global_overview', 'project_deck')),
  project_id UUID REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create slides table
CREATE TABLE IF NOT EXISTS public.presentation_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id UUID NOT NULL REFERENCES public.presentations(id) ON DELETE CASCADE,
  slide_order INTEGER NOT NULL,
  slide_type TEXT NOT NULL CHECK (slide_type IN (
    'cover', 'title', 'title_subtitle', 'full_image', 
    'two_column', 'three_column', 'photo_gallery', 
    'quote', 'data', 'thank_you'
  )),
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_urls TEXT[],
  layout_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create presentation exports table
CREATE TABLE IF NOT EXISTS public.presentation_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id UUID NOT NULL REFERENCES public.presentations(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL CHECK (export_type IN ('pdf', 'slides', 'link')),
  file_path TEXT,
  share_link TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  downloaded_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_exports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for presentations
CREATE POLICY "Admins can manage all presentations"
ON public.presentations
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Donors can view own project presentations"
ON public.presentations
FOR SELECT
TO authenticated
USING (
  project_id IN (
    SELECT id FROM public.commissioned_projects 
    WHERE donor_id = auth.uid()
  )
);

-- RLS Policies for slides
CREATE POLICY "Admins can manage all slides"
ON public.presentation_slides
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.presentations 
    WHERE id = presentation_slides.presentation_id
    AND public.is_admin(auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.presentations 
    WHERE id = presentation_slides.presentation_id
    AND public.is_admin(auth.uid())
  )
);

CREATE POLICY "Donors can view slides from own project presentations"
ON public.presentation_slides
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.presentations p
    JOIN public.commissioned_projects cp ON p.project_id = cp.id
    WHERE p.id = presentation_slides.presentation_id
    AND cp.donor_id = auth.uid()
  )
);

-- RLS Policies for exports
CREATE POLICY "Admins can manage all exports"
ON public.presentation_exports
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Donors can view own project exports"
ON public.presentation_exports
FOR SELECT
TO authenticated
USING (
  presentation_id IN (
    SELECT p.id FROM public.presentations p
    JOIN public.commissioned_projects cp ON p.project_id = cp.id
    WHERE cp.donor_id = auth.uid()
  )
);

-- Create indexes
CREATE INDEX idx_presentations_type ON public.presentations(type);
CREATE INDEX idx_presentations_project_id ON public.presentations(project_id);
CREATE INDEX idx_presentation_slides_presentation_id ON public.presentation_slides(presentation_id);
CREATE INDEX idx_presentation_slides_order ON public.presentation_slides(presentation_id, slide_order);
CREATE INDEX idx_presentation_exports_presentation_id ON public.presentation_exports(presentation_id);

-- Create triggers
CREATE TRIGGER update_presentations_updated_at
BEFORE UPDATE ON public.presentations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_presentation_slides_updated_at
BEFORE UPDATE ON public.presentation_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Insert default GHAT Global Overview Deck
INSERT INTO public.presentations (title, type, status) VALUES
('GHAT Global Overview Deck', 'global_overview', 'published');

-- Get the presentation ID for inserting slides
DO $$
DECLARE
  deck_id UUID;
BEGIN
  SELECT id INTO deck_id FROM public.presentations WHERE type = 'global_overview' LIMIT 1;
  
  -- Insert default slides for global overview deck
  INSERT INTO public.presentation_slides (presentation_id, slide_order, slide_type, title, subtitle, content) VALUES
  (deck_id, 1, 'cover', 'Global Health Access Trust', 'Where Purpose Meets Precision', 'Empowering committed donors to fund, direct, and witness life-changing health interventions with total transparency.'),
  (deck_id, 2, 'title_subtitle', 'Mission & Vision', 'Transforming Global Health Through Transparent Partnership', E'**Our Mission**\nTo deliver accessible, high-quality healthcare interventions in underserved regions through donor-directed, volunteer-supported, and evidence-based projects.\n\n**Our Vision**\nA world where every community has access to dignified healthcare, and every philanthropic contribution creates measurable, verifiable impact.'),
  (deck_id, 3, 'data', 'The Global Health Gap', 'Billions Lack Access to Basic Healthcare', E'**5.5 billion** people lack access to essential health services\n\n**400 million** live without basic medical care\n\n**100 million** pushed into extreme poverty due to health expenses\n\n*Sources: WHO, World Bank Global Health Data*'),
  (deck_id, 4, 'two_column', 'GHAT''s Solution', 'Commissioned Projects Ecosystem', E'**For Donors:**\n• Full control over project design\n• Real-time transparency\n• Verified impact certificates\n• Naming opportunities\n• Advisory participation\n\n**For Communities:**\n• Targeted interventions\n• Sustainable outcomes\n• Dignified implementation\n• Local capacity building\n• Long-term support'),
  (deck_id, 5, 'title_subtitle', 'Donor Control & Transparency', 'You Design. We Deliver. You Witness.', E'Commissioned projects allow donors to:\n\n✓ Specify region, country, and intervention type\n✓ Set budget and timeline parameters\n✓ Receive milestone-based updates\n✓ View approved field evidence in real-time\n✓ Track every stage from conception to completion\n✓ Receive verified impact certificates'),
  (deck_id, 6, 'two_column', 'Volunteer Collaboration', 'Global Network of Field Professionals', E'**Our Volunteers:**\n• Medical professionals\n• Public health specialists\n• Field coordinators\n• Healthcare administrators\n• Technical experts\n\n**Their Role:**\n• Project implementation\n• Evidence documentation\n• Progress reporting\n• Quality assurance\n• Community engagement'),
  (deck_id, 7, 'title_subtitle', 'AI Operational Intelligence', 'Smart Coordination, Human Oversight', E'**AI-Powered Features:**\n\n• **Donor AI Assistant** - Project status summaries, timeline clarity, impact updates\n• **Volunteer AI Support** - Milestone reminders, evidence guidance, documentation assistance\n• **Admin AI Operations** - Priority flagging, quality control, workflow optimization\n\n*All AI operates under strict privacy boundaries with full administrative control*'),
  (deck_id, 8, 'data', 'Security & Compliance', 'Enterprise-Grade Protection', E'**Security Measures:**\n• Two-factor authentication\n• Session management & monitoring\n• Rate limiting & IP protection\n• File encryption at rest\n• Comprehensive audit logging\n\n**GDPR Compliance:**\n• Data minimization principles\n• Right to access & erasure\n• Configurable retention periods\n• Privacy-by-design architecture'),
  (deck_id, 9, 'three_column', 'Impact Model', NULL, E'**Transparency**\n\nEvery donation tracked\nMilestone-based updates\nVerified evidence\nReal-time visibility\n\n**Accountability**\n\nAdmin-approved evidence\nVolunteer-donor separation\nComprehensive audit trails\nQuality control gates\n\n**Verification**\n\nImpact certificates\nEvidence packs\nCompletion documentation\nThird-party validation'),
  (deck_id, 10, 'photo_gallery', 'Impact in Action', 'Evidence from Recent Projects', 'Placeholder for approved field evidence from completed commissioned projects showcasing healthcare interventions, facility improvements, and community impact.'),
  (deck_id, 11, 'title_subtitle', 'Future Roadmap', 'Scaling Transparent Impact', E'**2025 Goals:**\n• Expand to 15+ countries\n• 50+ active commissioned projects\n• 200+ verified volunteers\n• Enhanced AI coordination\n• Real-time donor dashboards\n\n**2026 Vision:**\n• Regional impact hubs\n• Multi-year project tracking\n• Advanced analytics platform\n• Strategic partnerships'),
  (deck_id, 12, 'two_column', 'Governance & Integrity', 'Built on Trust and Transparency', E'**Governance Structure:**\n• Independent board of trustees\n• Conflict of interest policies\n• Financial controls & audits\n• Risk management framework\n• Whistleblowing protections\n\n**Compliance:**\n• UK Charity Commission registered\n• GDPR compliant\n• Anti-fraud measures\n• Safeguarding policies\n• Regular compliance audits'),
  (deck_id, 13, 'thank_you', 'Partner With Us', 'Transform Global Health Through Transparent Action', E'**Get Involved:**\n\n📧 Contact: [Contact Form on Website]\n🌐 Website: www.globalhealthaccesstrust.org\n📄 Documentation: Full governance & compliance docs available\n\n*Global Health Access Trust is a registered UK charity dedicated to transparent, donor-directed healthcare interventions worldwide.*');
END $$;