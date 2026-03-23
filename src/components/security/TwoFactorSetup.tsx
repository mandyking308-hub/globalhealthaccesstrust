import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { generateRecoveryCodes } from "@/lib/security";

interface TwoFactorSetupProps {
  userId: string;
  onComplete: () => void;
}

export const TwoFactorSetup = ({ userId, onComplete }: TwoFactorSetupProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"intro" | "verify" | "recovery">("intro");
  const [verificationCode, setVerificationCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentCode, setSentCode] = useState(false);

  const sendVerificationCode = async () => {
    setLoading(true);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", userId)
        .single();

      if (!profile?.email) {
        throw new Error("User email not found");
      }

      // Generate and store 2FA code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      await supabase.from("two_factor_codes").insert({
        user_id: userId,
        code,
        expires_at: expiresAt.toISOString(),
      });

      // TODO: Send email with code via edge function
      console.log("2FA Code:", code); // For testing

      setSentCode(true);
      setStep("verify");
      
      toast({
        title: "Verification code sent",
        description: "Check your email for the 6-digit code",
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: "Error",
        description: "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      const { data: codeData, error } = await supabase
        .from("two_factor_codes")
        .select("*")
        .eq("user_id", userId)
        .eq("code", verificationCode)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !codeData) {
        throw new Error("Invalid or expired code");
      }

      // Mark code as used
      await supabase
        .from("two_factor_codes")
        .update({ used: true })
        .eq("id", codeData.id);

      // Generate recovery codes
      const codes = generateRecoveryCodes(10);
      setRecoveryCodes(codes);

      // Store recovery codes
      const recoveryCodeInserts = codes.map(code => ({
        user_id: userId,
        code,
      }));
      
      await supabase.from("recovery_codes").insert(recoveryCodeInserts);

      setStep("recovery");
      
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication is now active",
      });
    } catch (error) {
      console.error("Error verifying code:", error);
      toast({
        title: "Verification failed",
        description: "Invalid or expired code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyRecoveryCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopiedCodes(true);
    toast({
      title: "Copied!",
      description: "Recovery codes copied to clipboard",
    });
  };

  const finishSetup = async () => {
    setLoading(true);
    try {
      await supabase
        .from("profiles")
        .update({ two_factor_enabled: true })
        .eq("id", userId);

      toast({
        title: "Setup complete",
        description: "Two-factor authentication is now enabled",
      });

      onComplete();
    } catch (error) {
      console.error("Error completing setup:", error);
      toast({
        title: "Error",
        description: "Failed to enable 2FA",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === "intro" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              
              <CardTitle className="font-serif text-2xl">Enable Two-Factor Authentication</CardTitle>
            </div>
            <CardDescription>
              Add an extra layer of security to your account. You'll receive a 6-digit code via email whenever you sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Two-factor authentication helps protect your account from unauthorized access, even if your password is compromised.
              </AlertDescription>
            </Alert>
            <Button onClick={sendVerificationCode} disabled={loading} className="w-full">
              {loading ? "Sending..." : "Get Started"}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "verify" && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Verify Your Email</CardTitle>
            <CardDescription>
              Enter the 6-digit code we sent to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={verifyCode}
                disabled={loading || verificationCode.length !== 6}
                className="flex-1"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
              <Button
                variant="outline"
                onClick={sendVerificationCode}
                disabled={loading}
              >
                Resend Code
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "recovery" && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Save Your Recovery Codes</CardTitle>
            <CardDescription>
              Store these codes in a safe place. You can use them to access your account if you lose access to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription className="text-yellow-700">
                <strong>Important:</strong> Each code can only be used once. Keep them secure and don't share them with anyone.
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                {recoveryCodes.map((code, index) => (
                  <div key={index} className="text-foreground">
                    {index + 1}. {code}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={copyRecoveryCodes}
              className="w-full"
            >
              {copiedCodes ? (
                <>
                  
                  Copied!
                </>
              ) : (
                <>
                  
                  Copy All Codes
                </>
              )}
            </Button>

            <Button
              onClick={finishSetup}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Completing Setup..." : "Complete Setup"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
