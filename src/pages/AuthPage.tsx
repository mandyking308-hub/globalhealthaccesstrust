import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { validatePassword, PASSWORD_REQUIREMENTS } from "@/lib/security";

export const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const redirectByRole = async (userId: string) => {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const isAdmin = roles?.some(r => r.role === "admin" || r.role === "super_admin");
    navigate(isAdmin ? "/admin/dashboard" : "/donor-dashboard");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        redirectByRole(session.user.id);
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        await redirectByRole(data.session.user.id);
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupFirstName || !signupLastName) {
      setError("First name and last name are required");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const pwCheck = validatePassword(signupPassword);
    if (!pwCheck.valid) {
      setError(pwCheck.errors[0]);
      return;
    }

    if (!gdprConsent) {
      setError("You must accept the GDPR consent to register");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/donor-dashboard`,
          data: {
            first_name: signupFirstName,
            last_name: signupLastName,
            gdpr_consent: gdprConsent,
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Welcome to GHAT!",
          description: "Your account has been created successfully.",
        });
        await redirectByRole(data.session.user.id);
      } else {
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Helmet><title>Login | Global Health Access Trust</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Header />
      <main className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-160px)]">
          {/* LEFT — brand identity panel */}
          <aside className="bg-primary text-primary-foreground flex flex-col justify-between p-10 md:p-16 lg:p-20 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span className="h-px w-10 bg-primary-foreground/60" />
                <span className="uppercase tracking-[0.28em] text-[10.5px] font-bold text-primary-foreground/80">
                  Secure Donor Portal
                </span>
              </div>
              <h1
                className="text-primary-foreground no-display"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(34px, 3.8vw, 54px)", lineHeight: 1.02 }}
              >
                Global Health<br />Access Trust
              </h1>
              <p className="mt-8 text-primary-foreground/85 text-[16.5px] leading-relaxed max-w-md">
                Every supporter begins their journey by creating a secure account. This is required for all engagement.
              </p>
            </div>
            <div className="mt-16 pt-8 border-t border-primary-foreground/25 space-y-3">
              <p className="uppercase tracking-[0.22em] text-[10.5px] font-bold text-primary-foreground/70">
                Privacy & Security
              </p>
              <p className="text-primary-foreground/80 text-[14px] leading-relaxed max-w-md">
                Our platform is encrypted, GDPR-compliant, and designed to handle structured funding relationships with full discretion and accountability.
              </p>
            </div>
          </aside>

          {/* RIGHT — form column */}
          <section className="flex items-center justify-center px-6 md:px-12 py-16 order-1 lg:order-2 bg-background">
            <div className="w-full max-w-md">
              <span className="portal-eyebrow mb-4">Account Access</span>
              <h2 className="text-foreground mb-8" style={{ fontSize: "clamp(24px, 2.2vw, 32px)", fontWeight: 500, letterSpacing: "-0.018em" }}>
                Enter the Donor Portal
              </h2>

              <Tabs defaultValue="login" className="w-full portal-tabs">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="pt-8">
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your credentials to access your donor account
                  </p>
                  <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11"
                      />
                    </div>

                    <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.08em] text-[13px] font-semibold uppercase" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="pt-8">
                  <p className="text-sm text-muted-foreground mb-6">
                    Register to become a donor and support our mission
                  </p>
                  <form onSubmit={handleSignup} className="space-y-5">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">First Name *</Label>
                        <Input
                          id="first-name"
                          type="text"
                          placeholder="John"
                          value={signupFirstName}
                          onChange={(e) => setSignupFirstName(e.target.value)}
                          required
                          disabled={loading}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Last Name *</Label>
                        <Input
                          id="last-name"
                          type="text"
                          placeholder="Doe"
                          value={signupLastName}
                          onChange={(e) => setSignupLastName(e.target.value)}
                          required
                          disabled={loading}
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={PASSWORD_REQUIREMENTS.minLength}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum {PASSWORD_REQUIREMENTS.minLength} characters, with an uppercase letter, a number, and a symbol.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Confirm Password *</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11"
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="gdpr-consent"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                        disabled={loading}
                      />
                      <label
                        htmlFor="gdpr-consent"
                        className="text-sm leading-relaxed cursor-pointer text-muted-foreground"
                      >
                        I consent to the processing of my personal data in accordance with the{" "}
                        <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="/terms-of-use" className="text-primary hover:underline" target="_blank">
                          Terms of Use
                        </a>
                        . *
                      </label>
                    </div>

                    <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.08em] text-[13px] font-semibold uppercase" disabled={loading || !gdprConsent}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <p className="mt-8 pt-6 border-t border-foreground/10 text-xs text-muted-foreground leading-relaxed">
                All engagement requires registration for GDPR compliance and record management.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
