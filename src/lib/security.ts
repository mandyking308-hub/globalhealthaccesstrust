import { supabase } from "@/integrations/supabase/client";

// Password validation
export const PASSWORD_REQUIREMENTS = {
  minLength: 10,
  requireUppercase: true,
  requireNumber: true,
  requireSymbol: true,
};

const COMMON_PASSWORDS = [
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "1234567",
  "letmein", "trustno1", "dragon", "baseball", "iloveyou", "master", "sunshine",
  "ashley", "bailey", "passw0rd", "shadow", "123123", "654321", "superman",
  "qazwsx", "michael", "football", "welcome", "jesus", "ninja", "mustang",
  "password1", "123456789", "adobe123", "admin", "1234567890", "photoshop"
];

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`);
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (PASSWORD_REQUIREMENTS.requireNumber && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (PASSWORD_REQUIREMENTS.requireSymbol && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push("This password is too common. Please choose a stronger password");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Session management
const SESSION_TIMEOUT = 45 * 60 * 1000; // 45 minutes
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

export function initSessionMonitoring() {
  // Reset timer on user activity
  const resetTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(async () => {
      await supabase.auth.signOut();
      window.location.href = "/auth?session_expired=true";
    }, SESSION_TIMEOUT);
  };

  // Monitor user activity
  const events = ["mousedown", "keydown", "scroll", "touchstart"];
  events.forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  resetTimer();
}

export function clearSessionMonitoring() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
}

// Rate limiting helpers
export async function checkRateLimit(
  actionType: string,
  maxAttempts: number = 5,
  windowMinutes: number = 1
): Promise<{ allowed: boolean; remainingAttempts?: number; blockedUntil?: Date }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    // Get recent attempts
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
    
    const { data: rateLimitData, error } = await supabase
      .from("rate_limit_tracking")
      .select("*")
      .eq("action_type", actionType)
      .eq("user_id", userId || null)
      .gte("created_at", windowStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    // Check if currently blocked
    if (rateLimitData?.blocked_until && new Date(rateLimitData.blocked_until) > new Date()) {
      return {
        allowed: false,
        blockedUntil: new Date(rateLimitData.blocked_until),
      };
    }

    // Count attempts
    const { count } = await supabase
      .from("rate_limit_tracking")
      .select("*", { count: "exact", head: true })
      .eq("action_type", actionType)
      .eq("user_id", userId || null)
      .gte("created_at", windowStart.toISOString());

    const attemptCount = count || 0;

    if (attemptCount >= maxAttempts) {
      // Block for 10 minutes
      const blockedUntil = new Date(Date.now() + 10 * 60 * 1000);
      
      await supabase.from("rate_limit_tracking").insert({
        user_id: userId || null,
        ip_address: "",
        action_type: actionType,
        attempt_count: attemptCount + 1,
        blocked_until: blockedUntil.toISOString(),
      });

      return {
        allowed: false,
        blockedUntil,
      };
    }

    // Log this attempt
    await supabase.from("rate_limit_tracking").insert({
      user_id: userId || null,
      ip_address: "",
      action_type: actionType,
      attempt_count: 1,
    });

    return {
      allowed: true,
      remainingAttempts: maxAttempts - attemptCount - 1,
    };
  } catch (error) {
    console.error("Rate limit check error:", error);
    return { allowed: true }; // Fail open to prevent lockouts on errors
  }
}

// File upload validation
export const FILE_UPLOAD_LIMITS = {
  photo: 5 * 1024 * 1024, // 5MB
  pdf: 10 * 1024 * 1024, // 10MB
  video: 50 * 1024 * 1024, // 50MB
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo"];

export function validateFile(
  file: File,
  type: "photo" | "pdf" | "video"
): { valid: boolean; error?: string } {
  // Check file size
  const maxSize = FILE_UPLOAD_LIMITS[type];
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`,
    };
  }

  // Check MIME type
  let allowedTypes: string[] = [];
  switch (type) {
    case "photo":
      allowedTypes = ALLOWED_IMAGE_TYPES;
      break;
    case "pdf":
      allowedTypes = ALLOWED_DOCUMENT_TYPES;
      break;
    case "video":
      allowedTypes = ALLOWED_VIDEO_TYPES;
      break;
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  return { valid: true };
}

// Audit logging
export async function logAdminAction(
  action: string,
  actionType: string,
  targetType: string,
  targetId: string,
  details?: Record<string, any>
) {
  try {
    await supabase.rpc("log_admin_action", {
      p_action: action,
      p_action_type: actionType,
      p_target_type: targetType,
      p_target_id: targetId,
      p_details: details || null,
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
}

// 2FA utilities
export function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateRecoveryCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}
