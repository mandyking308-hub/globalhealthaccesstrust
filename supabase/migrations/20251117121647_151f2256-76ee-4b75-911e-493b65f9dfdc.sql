-- Create system alerts table
CREATE TABLE IF NOT EXISTS public.system_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL CHECK (alert_type IN (
    'volunteer_inactivity', 'milestone_overdue', 'evidence_missing',
    'project_stalled', 'donor_message_pending', 'ai_anomaly',
    'upload_failed', 'email_failed', 'login_failure', 'security_threat'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  related_id UUID,
  related_type TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'escalated', 'dismissed')),
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create system health metrics table
CREATE TABLE IF NOT EXISTS public.system_health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create system logs table
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_type TEXT NOT NULL CHECK (log_type IN (
    'app', 'error', 'ai', 'security', 'evidence', 'message'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('debug', 'info', 'warning', 'error', 'critical')),
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  related_id UUID,
  related_type TEXT,
  stack_trace TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create alert settings table
CREATE TABLE IF NOT EXISTS public.alert_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  alert_type TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  notification_method TEXT NOT NULL DEFAULT 'dashboard' CHECK (notification_method IN ('dashboard', 'email', 'both')),
  threshold_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, alert_type)
);

-- Enable RLS
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for system_alerts
CREATE POLICY "Admins can manage all alerts"
ON public.system_alerts
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policies for system_health_metrics
CREATE POLICY "Admins can view health metrics"
ON public.system_health_metrics
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert health metrics"
ON public.system_health_metrics
FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for system_logs
CREATE POLICY "Admins can view all logs"
ON public.system_logs
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert logs"
ON public.system_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for alert_settings
CREATE POLICY "Admins can manage own alert settings"
ON public.alert_settings
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_system_alerts_type ON public.system_alerts(alert_type);
CREATE INDEX idx_system_alerts_status ON public.system_alerts(status);
CREATE INDEX idx_system_alerts_severity ON public.system_alerts(severity);
CREATE INDEX idx_system_alerts_created_at ON public.system_alerts(created_at DESC);
CREATE INDEX idx_system_health_metrics_type ON public.system_health_metrics(metric_type);
CREATE INDEX idx_system_health_metrics_recorded_at ON public.system_health_metrics(recorded_at DESC);
CREATE INDEX idx_system_logs_type ON public.system_logs(log_type);
CREATE INDEX idx_system_logs_severity ON public.system_logs(severity);
CREATE INDEX idx_system_logs_created_at ON public.system_logs(created_at DESC);
CREATE INDEX idx_alert_settings_user_id ON public.alert_settings(user_id);

-- Create triggers
CREATE TRIGGER update_alert_settings_updated_at
BEFORE UPDATE ON public.alert_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Insert sample health metrics for demonstration
INSERT INTO public.system_health_metrics (metric_type, metric_value, metric_unit) VALUES
('api_uptime_24h', 99.8, 'percentage'),
('api_uptime_7d', 99.5, 'percentage'),
('page_load_speed', 1.2, 'seconds'),
('database_response_time', 45, 'milliseconds'),
('storage_used', 2.5, 'gigabytes'),
('error_rate_24h', 0.3, 'percentage'),
('queue_backlog', 5, 'jobs'),
('active_users_today', 42, 'count');

-- Insert sample alerts for demonstration
INSERT INTO public.system_alerts (alert_type, severity, title, description, status) VALUES
('milestone_overdue', 'high', 'Milestone 3 Overdue', 'Project "Rural Clinic Equipment" has milestone 3 overdue by 5 days', 'active'),
('volunteer_inactivity', 'medium', 'Volunteer Inactive', 'Volunteer Dr. Sarah Johnson has not uploaded evidence in 14 days', 'active'),
('evidence_missing', 'medium', 'Evidence Awaiting Approval', '7 evidence submissions pending admin review', 'active'),
('donor_message_pending', 'high', 'Donor Message > 24h', 'Donor inquiry from Legacy Builder tier awaiting response', 'active');