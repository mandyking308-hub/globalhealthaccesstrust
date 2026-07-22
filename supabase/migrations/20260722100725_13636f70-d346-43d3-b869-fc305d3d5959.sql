
-- 1. donation_allocations
CREATE TABLE IF NOT EXISTS public.donation_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE UNIQUE,
  donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  gross_donation_amount NUMERIC(12,2) NOT NULL,
  operating_allocation_rate NUMERIC(5,4) NOT NULL DEFAULT 0.20,
  operating_allocation_amount NUMERIC(12,2) NOT NULL,
  project_delivery_allocation NUMERIC(12,2) NOT NULL,
  amount_committed NUMERIC(12,2) NOT NULL DEFAULT 0,
  amount_spent NUMERIC(12,2) NOT NULL DEFAULT 0,
  amount_remaining NUMERIC(12,2) NOT NULL,
  allocation_status TEXT NOT NULL DEFAULT 'awaiting_project_allocation',
  currency TEXT NOT NULL DEFAULT 'GBP',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donation_allocations TO authenticated;
GRANT ALL ON public.donation_allocations TO service_role;
ALTER TABLE public.donation_allocations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins manage donation allocations" ON public.donation_allocations;
CREATE POLICY "Admins manage donation allocations" ON public.donation_allocations
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "Donors view own donation allocations" ON public.donation_allocations;
CREATE POLICY "Donors view own donation allocations" ON public.donation_allocations
  FOR SELECT USING (auth.uid() = donor_id);
DROP TRIGGER IF EXISTS trg_donation_allocations_updated_at ON public.donation_allocations;
CREATE TRIGGER trg_donation_allocations_updated_at
  BEFORE UPDATE ON public.donation_allocations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

INSERT INTO public.donation_allocations (
  donation_id, donor_id, gross_donation_amount, operating_allocation_rate,
  operating_allocation_amount, project_delivery_allocation,
  amount_committed, amount_spent, amount_remaining, allocation_status, currency
)
SELECT d.id, d.donor_id, d.amount, 0.20,
  ROUND(d.amount * 0.20, 2), ROUND(d.amount * 0.80, 2),
  0, 0, ROUND(d.amount * 0.80, 2),
  'awaiting_project_allocation', d.currency
FROM public.donations d
WHERE NOT EXISTS (SELECT 1 FROM public.donation_allocations da WHERE da.donation_id = d.id);

-- 2. project_expenses
ALTER TABLE public.project_expenses
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS donor_visible BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS override_reason TEXT;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_expenses_status_check') THEN
    ALTER TABLE public.project_expenses ADD CONSTRAINT project_expenses_status_check
      CHECK (status IN ('draft','submitted','under_review','approved','committed','paid','rejected','refunded'));
  END IF;
END $$;

-- 3. project_milestones
ALTER TABLE public.project_milestones
  ADD COLUMN IF NOT EXISTS sequence INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS target_date DATE,
  ADD COLUMN IF NOT EXISTS completion_date DATE,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS weight NUMERIC(5,2) NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS evidence_required BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS donor_visible BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_milestones_status_check') THEN
    ALTER TABLE public.project_milestones ADD CONSTRAINT project_milestones_status_check
      CHECK (status IN ('pending','in_progress','completed','blocked','cancelled'));
  END IF;
END $$;
DROP TRIGGER IF EXISTS trg_project_milestones_updated_at ON public.project_milestones;
CREATE TRIGGER trg_project_milestones_updated_at
  BEFORE UPDATE ON public.project_milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 4. volunteer_project_assignments
ALTER TABLE public.volunteer_project_assignments
  ADD COLUMN IF NOT EXISTS responsibilities TEXT,
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS end_date DATE,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS donor_visibility_mode TEXT NOT NULL DEFAULT 'role_only',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'vpa_status_check') THEN
    ALTER TABLE public.volunteer_project_assignments ADD CONSTRAINT vpa_status_check
      CHECK (status IN ('proposed','active','on_hold','completed','withdrawn'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'vpa_visibility_check') THEN
    ALTER TABLE public.volunteer_project_assignments ADD CONSTRAINT vpa_visibility_check
      CHECK (donor_visibility_mode IN ('full_name','first_name','role_only','anonymised'));
  END IF;
END $$;
DROP POLICY IF EXISTS "Donors view own project team" ON public.volunteer_project_assignments;
CREATE POLICY "Donors view own project team" ON public.volunteer_project_assignments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.commissioned_projects cp
            WHERE cp.id = volunteer_project_assignments.project_id
              AND cp.donor_id = auth.uid())
  );

-- 5. project_field_evidence
CREATE TABLE IF NOT EXISTS public.project_field_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.commissioned_projects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  date_taken DATE,
  approved_general_location TEXT,
  caption TEXT,
  activity_description TEXT,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  expense_id UUID REFERENCES public.project_expenses(id) ON DELETE SET NULL,
  consent_status TEXT NOT NULL DEFAULT 'pending',
  safeguarding_status TEXT NOT NULL DEFAULT 'pending',
  review_status TEXT NOT NULL DEFAULT 'awaiting_review',
  donor_visible BOOLEAN NOT NULL DEFAULT false,
  storage_path TEXT NOT NULL,
  storage_path_sanitised TEXT,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  withdrawn_at TIMESTAMPTZ,
  withdrawal_reason TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT pfe_review_status_check CHECK (review_status IN ('awaiting_review','under_review','approved','rejected','withdrawn')),
  CONSTRAINT pfe_consent_check CHECK (consent_status IN ('pending','confirmed','not_required','refused')),
  CONSTRAINT pfe_safeguard_check CHECK (safeguarding_status IN ('pending','cleared','flagged'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_field_evidence TO authenticated;
GRANT ALL ON public.project_field_evidence TO service_role;
ALTER TABLE public.project_field_evidence ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins manage all evidence" ON public.project_field_evidence;
CREATE POLICY "Admins manage all evidence" ON public.project_field_evidence
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "Assigned volunteers upload evidence" ON public.project_field_evidence;
CREATE POLICY "Assigned volunteers upload evidence" ON public.project_field_evidence
  FOR INSERT WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.volunteer_project_assignments vpa
      JOIN public.volunteers v ON v.id = vpa.volunteer_id
      WHERE vpa.project_id = project_field_evidence.project_id AND v.user_id = auth.uid()
    )
  );
DROP POLICY IF EXISTS "Assigned volunteers view own project evidence" ON public.project_field_evidence;
CREATE POLICY "Assigned volunteers view own project evidence" ON public.project_field_evidence
  FOR SELECT USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.volunteer_project_assignments vpa
      JOIN public.volunteers v ON v.id = vpa.volunteer_id
      WHERE vpa.project_id = project_field_evidence.project_id AND v.user_id = auth.uid()
    )
  );
DROP POLICY IF EXISTS "Donors view approved donor-visible evidence" ON public.project_field_evidence;
CREATE POLICY "Donors view approved donor-visible evidence" ON public.project_field_evidence
  FOR SELECT USING (
    review_status = 'approved' AND donor_visible = true AND withdrawn_at IS NULL AND
    EXISTS (SELECT 1 FROM public.commissioned_projects cp
            WHERE cp.id = project_field_evidence.project_id AND cp.donor_id = auth.uid())
  );
DROP TRIGGER IF EXISTS trg_project_field_evidence_updated_at ON public.project_field_evidence;
CREATE TRIGGER trg_project_field_evidence_updated_at
  BEFORE UPDATE ON public.project_field_evidence
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Storage RLS
DROP POLICY IF EXISTS "Volunteers upload field evidence" ON storage.objects;
CREATE POLICY "Volunteers upload field evidence" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'field-evidence' AND
    EXISTS (
      SELECT 1 FROM public.volunteer_project_assignments vpa
      JOIN public.volunteers v ON v.id = vpa.volunteer_id
      WHERE v.user_id = auth.uid()
        AND vpa.project_id::text = (storage.foldername(name))[1]
    )
  );
DROP POLICY IF EXISTS "Field evidence read scoped" ON storage.objects;
CREATE POLICY "Field evidence read scoped" ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'field-evidence' AND (
      public.is_admin(auth.uid()) OR
      EXISTS (
        SELECT 1 FROM public.volunteer_project_assignments vpa
        JOIN public.volunteers v ON v.id = vpa.volunteer_id
        WHERE v.user_id = auth.uid()
          AND vpa.project_id::text = (storage.foldername(name))[1]
      ) OR
      EXISTS (
        SELECT 1 FROM public.commissioned_projects cp
        WHERE cp.donor_id = auth.uid()
          AND cp.id::text = (storage.foldername(name))[1]
      )
    )
  );
DROP POLICY IF EXISTS "Admins manage field evidence storage" ON storage.objects;
CREATE POLICY "Admins manage field evidence storage" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'field-evidence' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'field-evidence' AND public.is_admin(auth.uid()));

-- 6. project_messages governance
ALTER TABLE public.project_messages
  ADD COLUMN IF NOT EXISTS recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS recipient_role TEXT,
  ADD COLUMN IF NOT EXISTS parent_message_id UUID REFERENCES public.project_messages(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'internal_only',
  ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS attachments JSONB,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pm_visibility_check') THEN
    ALTER TABLE public.project_messages ADD CONSTRAINT pm_visibility_check
      CHECK (visibility IN ('internal_only','admin_and_donor','admin_and_team','shared_project_thread'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pm_approval_check') THEN
    ALTER TABLE public.project_messages ADD CONSTRAINT pm_approval_check
      CHECK (approval_status IN ('pending','approved','rejected','auto'));
  END IF;
END $$;
DROP TRIGGER IF EXISTS trg_project_messages_updated_at ON public.project_messages;
CREATE TRIGGER trg_project_messages_updated_at
  BEFORE UPDATE ON public.project_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP POLICY IF EXISTS "Donors view project messages" ON public.project_messages;
DROP POLICY IF EXISTS "Volunteers view project messages" ON public.project_messages;
DROP POLICY IF EXISTS "Admins manage project messages" ON public.project_messages;
DROP POLICY IF EXISTS "Participants insert project messages" ON public.project_messages;
DROP POLICY IF EXISTS "Admins manage all messages" ON public.project_messages;
CREATE POLICY "Admins manage all messages" ON public.project_messages
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "Donors view approved donor-visible messages" ON public.project_messages;
CREATE POLICY "Donors view approved donor-visible messages" ON public.project_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.commissioned_projects cp
            WHERE cp.id = project_messages.project_id AND cp.donor_id = auth.uid())
    AND approval_status IN ('approved','auto')
    AND visibility IN ('admin_and_donor','shared_project_thread')
  );
DROP POLICY IF EXISTS "Donors insert questions to Trust Office" ON public.project_messages;
CREATE POLICY "Donors insert questions to Trust Office" ON public.project_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND sender_role = 'donor' AND
    visibility = 'admin_and_donor' AND
    EXISTS (SELECT 1 FROM public.commissioned_projects cp
            WHERE cp.id = project_messages.project_id AND cp.donor_id = auth.uid())
  );
DROP POLICY IF EXISTS "Volunteers view approved team messages" ON public.project_messages;
CREATE POLICY "Volunteers view approved team messages" ON public.project_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.volunteer_project_assignments vpa
            JOIN public.volunteers v ON v.id = vpa.volunteer_id
            WHERE vpa.project_id = project_messages.project_id AND v.user_id = auth.uid())
    AND (visibility IN ('admin_and_team','shared_project_thread') OR sender_id = auth.uid())
  );
DROP POLICY IF EXISTS "Volunteers insert to Trust Office" ON public.project_messages;
CREATE POLICY "Volunteers insert to Trust Office" ON public.project_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND sender_role = 'volunteer' AND
    visibility IN ('admin_and_team','shared_project_thread') AND
    EXISTS (SELECT 1 FROM public.volunteer_project_assignments vpa
            JOIN public.volunteers v ON v.id = vpa.volunteer_id
            WHERE vpa.project_id = project_messages.project_id AND v.user_id = auth.uid())
  );

-- 7. Audit trigger
CREATE OR REPLACE FUNCTION public.log_governance_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.audit_logs (user_id, action, action_type, target_type, target_id, details)
  VALUES (
    auth.uid(),
    TG_TABLE_NAME || ' ' || TG_OP,
    lower(TG_OP),
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
  );
  RETURN COALESCE(NEW, OLD);
END $$;

DROP TRIGGER IF EXISTS trg_audit_donation_allocations ON public.donation_allocations;
CREATE TRIGGER trg_audit_donation_allocations AFTER INSERT OR UPDATE OR DELETE ON public.donation_allocations
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_project_expenses ON public.project_expenses;
CREATE TRIGGER trg_audit_project_expenses AFTER INSERT OR UPDATE OR DELETE ON public.project_expenses
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_project_milestones ON public.project_milestones;
CREATE TRIGGER trg_audit_project_milestones AFTER INSERT OR UPDATE OR DELETE ON public.project_milestones
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_vpa ON public.volunteer_project_assignments;
CREATE TRIGGER trg_audit_vpa AFTER INSERT OR UPDATE OR DELETE ON public.volunteer_project_assignments
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_field_evidence ON public.project_field_evidence;
CREATE TRIGGER trg_audit_field_evidence AFTER INSERT OR UPDATE OR DELETE ON public.project_field_evidence
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_project_messages ON public.project_messages;
CREATE TRIGGER trg_audit_project_messages AFTER INSERT OR UPDATE OR DELETE ON public.project_messages
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_commissioned_projects ON public.commissioned_projects;
CREATE TRIGGER trg_audit_commissioned_projects AFTER UPDATE ON public.commissioned_projects
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();
DROP TRIGGER IF EXISTS trg_audit_fund_allocations ON public.fund_allocations;
CREATE TRIGGER trg_audit_fund_allocations AFTER INSERT OR UPDATE OR DELETE ON public.fund_allocations
  FOR EACH ROW EXECUTE FUNCTION public.log_governance_change();

-- 8. Delivery progress helper
CREATE OR REPLACE FUNCTION public.project_delivery_progress(_project_id UUID)
RETURNS NUMERIC LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(
    ROUND(
      SUM(CASE WHEN status='completed' THEN weight ELSE 0 END)::numeric
      / NULLIF(SUM(weight),0) * 100, 2), 0)
  FROM public.project_milestones WHERE project_id = _project_id;
$$;
