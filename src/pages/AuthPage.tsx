import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

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

    // Validation
    if (!signupFirstName || !signupLastName) {
      setError("First name and last name are required");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters");
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
    <div className="min-h-screen flex flex-col">
      <Helmet><title>Login | Global Health Access Trust</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-2">Global Health Access Trust</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Secure Donor Portal</p>
          </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  
                  Login
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access your donor account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  
                  Create Account
                </CardTitle>
                <CardDescription>
                  Register to become a donor and support our mission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input
                        id="first-name"
                        type="text"
                        placeholder="John"
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input
                        id="last-name"
                        type="text"
                        placeholder="Doe"
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 6 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password *</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="gdpr-consent"
                      checked={gdprConsent}
                      onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                      disabled={loading}
                    />
                    <label
                      htmlFor="gdpr-consent"
                      className="text-sm leading-relaxed cursor-pointer"
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

                  <Button type="submit" className="w-full" disabled={loading || !gdprConsent}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            All donations require registration for GDPR compliance and receipt management.
          </p>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
};