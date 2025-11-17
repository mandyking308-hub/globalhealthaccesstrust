-- Ensure gdpr_requests table has all required fields
ALTER TABLE gdpr_requests 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS request_details TEXT;

-- Create data retention settings table
CREATE TABLE IF NOT EXISTS data_retention_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value INTEGER NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE data_retention_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage retention settings
CREATE POLICY "Admins can manage retention settings"
ON data_retention_settings
FOR ALL
USING (is_admin(auth.uid()));

-- Insert default retention periods
INSERT INTO data_retention_settings (setting_key, setting_value, description)
VALUES 
  ('volunteer_evidence_months', 12, 'Retention period for volunteer evidence files'),
  ('session_logs_days', 30, 'Retention period for user session logs'),
  ('admin_activity_months', 12, 'Retention period for admin activity logs')
ON CONFLICT (setting_key) DO NOTHING;

-- Add consent tracking to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS data_processing_consent_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS cookie_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS cookie_consent_date TIMESTAMP WITH TIME ZONE;

-- Create function to export user data (for DSAR)
CREATE OR REPLACE FUNCTION export_user_data(target_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_data JSONB;
BEGIN
  -- Compile all user data from different tables
  SELECT jsonb_build_object(
    'profile', (SELECT row_to_json(p.*) FROM profiles p WHERE id = target_user_id),
    'donations', (SELECT jsonb_agg(row_to_json(d.*)) FROM donations d WHERE donor_id = target_user_id),
    'commissioned_projects', (SELECT jsonb_agg(row_to_json(cp.*)) FROM commissioned_projects cp WHERE donor_id = target_user_id),
    'volunteer_profile', (SELECT row_to_json(v.*) FROM volunteers v WHERE user_id = target_user_id),
    'messages', (SELECT jsonb_agg(row_to_json(m.*)) FROM messages m WHERE to_user_id = target_user_id OR from_user_id = target_user_id),
    'sessions', (SELECT jsonb_agg(row_to_json(s.*)) FROM user_sessions s WHERE user_id = target_user_id),
    'exported_at', NOW()
  ) INTO user_data;
  
  RETURN user_data;
END;
$$;

-- Create function to anonymize user data (soft delete - maintains project integrity)
CREATE OR REPLACE FUNCTION anonymize_user_data(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update profiles to remove personal data
  UPDATE profiles 
  SET 
    first_name = 'Deleted',
    last_name = 'User',
    email = 'deleted_' || id || '@anonymized.ghat',
    gdpr_consent = FALSE,
    data_processing_consent = FALSE
  WHERE id = target_user_id;
  
  -- Anonymize volunteer data
  UPDATE volunteers 
  SET 
    name = 'Anonymized Volunteer',
    email = 'deleted_' || id || '@anonymized.ghat',
    phone = 'DELETED',
    cv_url = NULL,
    notes = 'User data deleted per GDPR request'
  WHERE user_id = target_user_id;
  
  -- Delete sessions
  DELETE FROM user_sessions WHERE user_id = target_user_id;
  
  -- Delete 2FA codes
  DELETE FROM two_factor_codes WHERE user_id = target_user_id;
  DELETE FROM recovery_codes WHERE user_id = target_user_id;
  
  -- Anonymize messages
  UPDATE messages 
  SET body = '[Message deleted per GDPR request]'
  WHERE from_user_id = target_user_id OR to_user_id = target_user_id;
  
  -- Log the deletion
  INSERT INTO audit_logs (action, action_type, target_type, target_id, user_id, details)
  VALUES ('GDPR Data Deletion', 'delete', 'user', target_user_id, target_user_id, 
    jsonb_build_object('reason', 'GDPR right to erasure'));
  
  RETURN TRUE;
END;
$$;