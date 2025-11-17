-- Enhance audit_logs table for admin activity tracking
ALTER TABLE audit_logs 
ADD COLUMN IF NOT EXISTS action_type TEXT,
ADD COLUMN IF NOT EXISTS target_type TEXT,
ADD COLUMN IF NOT EXISTS target_id UUID;

-- Create index for faster audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON audit_logs(action_type);

-- Create rate_limit_tracking table
CREATE TABLE IF NOT EXISTS rate_limit_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  ip_address TEXT NOT NULL,
  action_type TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on rate_limit_tracking
ALTER TABLE rate_limit_tracking ENABLE ROW LEVEL SECURITY;

-- Only admins can view rate limit tracking
CREATE POLICY "Admins can view rate limits"
ON rate_limit_tracking
FOR SELECT
USING (is_admin(auth.uid()));

-- Create sessions table for better session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  device_info TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions"
ON user_sessions
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all sessions
CREATE POLICY "Admins can view all sessions"
ON user_sessions
FOR SELECT
USING (is_admin(auth.uid()));

-- Users can delete their own sessions
CREATE POLICY "Users can delete own sessions"
ON user_sessions
FOR DELETE
USING (auth.uid() = user_id);

-- Create 2FA codes table
CREATE TABLE IF NOT EXISTS two_factor_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on 2FA codes
ALTER TABLE two_factor_codes ENABLE ROW LEVEL SECURITY;

-- Users can only access their own 2FA codes
CREATE POLICY "Users can view own 2FA codes"
ON two_factor_codes
FOR SELECT
USING (auth.uid() = user_id);

-- Create recovery codes table
CREATE TABLE IF NOT EXISTS recovery_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on recovery codes
ALTER TABLE recovery_codes ENABLE ROW LEVEL SECURITY;

-- Users can view their own recovery codes
CREATE POLICY "Users can view own recovery codes"
ON recovery_codes
FOR SELECT
USING (auth.uid() = user_id);

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action TEXT,
  p_action_type TEXT,
  p_target_type TEXT,
  p_target_id UUID,
  p_details JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    action_type,
    target_type,
    target_id,
    details,
    ip_address
  )
  VALUES (
    auth.uid(),
    p_action,
    p_action_type,
    p_target_type,
    p_target_id,
    p_details,
    current_setting('request.headers', true)::json->>'x-forwarded-for'
  );
END;
$$;