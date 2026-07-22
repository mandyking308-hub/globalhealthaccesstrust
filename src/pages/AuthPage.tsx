import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
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

type Portal = "donor" | "team" | "admin";

const PORTALS: Record<Portal, {
  eyebrow: string;
  title: string;
  heading: string;
  description: string;
  signupAllowed: boolean;
  applyRoute?: string;
  applyLabel?: string;
}> = {
  donor: {
    eyebrow: "Secure Donor Portal",
    title: "Donor Portal",
    heading: "Enter the Donor Portal",
    description:
      "View your donations, funding allocations, project expenditure, milestones, field photographs and project reports.",
    signupAllowed: true,
  },
  team: {
    eyebrow: "Project Team Portal",
    title: "Project Team Portal",
    heading: "Enter the Project Team Portal",
    description:
      "Access assigned projects, report progress, upload photographs and supporting evidence, submit expenditure records, update milestones and communicate securely with the Trust.",
    signupAllowed: false,
    applyRoute: "/volunteer-apply",
    applyLabel: "Apply to join a project team",
  },
  admin: {
    eyebrow: "Trust Administration",
    title: "Trust Administration",
    heading: "Trust Administration Sign-In",
    description:
      "Restricted access for authorised Global Health Access Trust administrators.",
    signupAllowed: false,
  },
};

const AUDIENCE = [
  "Charity workers",
  "Local field staff",
  "Healthcare professionals",
  "Approved volunteers",
  "Project coordinators",
  "Authorised delivery partners",
];

export const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPortal = useMemo<Portal | null>(() => {
    const p = searchParams.get("portal");
    if (p === "donor" || p === "team" || p === "admin") return p;
    return null;
  }, [searchParams]);

  const [portal, setPortal] = useState<Portal | null>(initialPortal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state (donor only)
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);


  const redirectByRole = async (userId: string) => {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    const roleSet = new Set((roles ?? []).map((r) => r.role));
    if (roleSet.has("admin") || roleSet.has("super_admin")) {
      navigate("/admin/dashboard");
    } else if (roleSet.has("volunteer") || roleSet.has("project_team" as any)) {
      navigate("/volunteer-dashboard");
    } else {
      navigate("/donor-dashboard");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) redirectByRole(session.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choosePortal = (p: Portal) => {
    setPortal(p);
    setError(null);
    setSearchParams({ portal: p }, { replace: true });
  };

  const clearPortal = () => {
    setPortal(null);
    setError(null);
    setSearchParams({}, { replace: true });
  };

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
        toast({ title: "Welcome back", description: "You've successfully signed in." });
        await redirectByRole(data.session.user.id);
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!signupFirstName || !signupLastName) return setError("First name and last name are required");
    if (signupPassword !== signupConfirmPassword) return setError("Passwords do not match");
    const pwCheck = validatePassword(signupPassword);
    if (!pwCheck.valid) return setError(pwCheck.errors[0]);
    if (!termsAccepted) return setError("You must agree to the Website and Portal Terms of Use to create an account");

    setLoading(true);
    try {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/donor-dashboard`,
          data: {
            first_name: signupFirstName,
            last_name: signupLastName,
            terms_accepted: true,
            terms_document_slug: "terms-of-use",
            terms_version: "1.0",
            terms_accepted_at: nowIso,
            privacy_document_slug: "privacy-notice",
            privacy_version: "1.0",
            privacy_acknowledged_at: nowIso,
          },
        },
      });
      if (error) throw error;
      // Client-side fallback: record both events when we have an immediate session.
      // The database trigger records them from auth metadata regardless, so this
      // is best-effort and non-blocking.
      if (data.session) {
        try {
          await Promise.all([
            supabase.rpc("record_legal_event", {
              _slug: "terms-of-use",
              _event_type: "acceptance",
              _context: "account_creation",
              _role: "donor",
            }),
            supabase.rpc("record_legal_event", {
              _slug: "privacy-notice",
              _event_type: "acknowledgement",
              _context: "account_creation",
              _role: "donor",
            }),
          ]);
        } catch {
          /* non-blocking */
        }
        toast({ title: "Welcome to GHAT", description: "Your account has been created." });
        await redirectByRole(data.session.user.id);
      } else {
        toast({ title: "Registration successful", description: "Please check your email to confirm your account." });
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Helmet>
        <title>Portal Access | Global Health Access Trust</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-grow bg-background">
        {!portal ? (
          <PortalChooser onChoose={choosePortal} />
        ) : (
          <PortalForm
            portal={portal}
            onBack={clearPortal}
            error={error}
            loading={loading}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            signupFirstName={signupFirstName}
            setSignupFirstName={setSignupFirstName}
            signupLastName={signupLastName}
            setSignupLastName={setSignupLastName}
            signupEmail={signupEmail}
            setSignupEmail={setSignupEmail}
            signupPassword={signupPassword}
            setSignupPassword={setSignupPassword}
            signupConfirmPassword={signupConfirmPassword}
            setSignupConfirmPassword={setSignupConfirmPassword}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />

        )}
      </main>
      <Footer />
    </div>
  );
};

// ---------------- Chooser ----------------

const PortalChooser = ({ onChoose }: { onChoose: (p: Portal) => void }) => (
  <section className="py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-6 md:px-10">
      <div className="max-w-2xl mb-14">
        <span className="portal-eyebrow mb-4">Portal Access</span>
        <h1
          className="text-foreground mt-4"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(30px, 3.2vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
        >
          Choose your portal
        </h1>
        <p className="text-muted-foreground mt-5 text-[16.5px] leading-relaxed">
          Global Health Access Trust operates three secure sign-in surfaces. Each uses the same authentication system; only the workspace that opens after sign-in differs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-foreground/15">
        <PortalCard
          eyebrow="Supporters"
          title="Donor Portal"
          description={PORTALS.donor.description}
          cta="Enter Donor Portal"
          onClick={() => onChoose("donor")}
          footer="New supporters can register here."
        />
        <PortalCard
          eyebrow="Field Delivery"
          title="Project Team Portal"
          description={PORTALS.team.description}
          cta="Enter Project Team Portal"
          onClick={() => onChoose("team")}
          footer="For approved workers only. Not self-service — accounts must be assigned by an administrator."
        />
        <PortalCard
          eyebrow="Restricted"
          title="Trust Administration"
          description={PORTALS.admin.description}
          cta="Administrator Sign-In"
          onClick={() => onChoose("admin")}
          discreet
        />
      </div>

      <div className="mt-14 pt-10 border-t border-foreground/10 grid md:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <span className="portal-eyebrow">Who the Project Team Portal serves</span>
          <p className="text-muted-foreground text-[15px] leading-relaxed mt-3">
            A single sign-in for everyone delivering a commissioned project on behalf of the Trust.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[15px] text-foreground/80">
          {AUDIENCE.map((a) => (
            <li key={a} className="flex items-baseline gap-3">
              <span className="h-px w-4 bg-primary/60 translate-y-[-4px]" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const PortalCard = ({
  eyebrow, title, description, cta, onClick, footer, discreet,
}: {
  eyebrow: string; title: string; description: string; cta: string;
  onClick: () => void; footer?: string; discreet?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left border-r border-b border-foreground/15 p-8 md:p-10 flex flex-col justify-between min-h-[340px] transition-colors ${
      discreet ? "bg-foreground/[0.02] hover:bg-foreground/[0.05]" : "bg-background hover:bg-foreground/[0.03]"
    }`}
  >
    <div>
      <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-foreground/55">{eyebrow}</span>
      <h3
        className={`mt-4 ${discreet ? "text-foreground/85" : "text-foreground"}`}
        style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(22px, 1.9vw, 28px)", lineHeight: 1.15, letterSpacing: "-0.005em" }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground text-[14.5px] leading-relaxed mt-4">{description}</p>
    </div>
    <div className="mt-8">
      <span className={`inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] ${discreet ? "text-foreground/70" : "text-primary"}`}>
        {cta}
        <span aria-hidden="true">→</span>
      </span>
      {footer && <p className="text-[11.5px] text-muted-foreground mt-4 leading-relaxed">{footer}</p>}
    </div>
  </button>
);

// ---------------- Form ----------------

type FormProps = {
  portal: Portal;
  onBack: () => void;
  error: string | null;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => void;
  handleSignup: (e: React.FormEvent) => void;
  loginEmail: string; setLoginEmail: (v: string) => void;
  loginPassword: string; setLoginPassword: (v: string) => void;
  signupFirstName: string; setSignupFirstName: (v: string) => void;
  signupLastName: string; setSignupLastName: (v: string) => void;
  signupEmail: string; setSignupEmail: (v: string) => void;
  signupPassword: string; setSignupPassword: (v: string) => void;
  signupConfirmPassword: string; setSignupConfirmPassword: (v: string) => void;
  termsAccepted: boolean; setTermsAccepted: (v: boolean) => void;
};


const PortalForm = (props: FormProps) => {
  const cfg = PORTALS[props.portal];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-160px)]">
      {/* LEFT — brand context panel */}
      <aside className="bg-primary text-primary-foreground flex flex-col justify-between p-10 md:p-16 lg:p-20 order-2 lg:order-1">
        <div>
          <button
            onClick={props.onBack}
            className="text-primary-foreground/75 hover:text-primary-foreground text-[11px] font-semibold uppercase tracking-[0.2em] mb-10 inline-flex items-center gap-2"
          >
            ← Choose a different portal
          </button>
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-primary-foreground/60" />
            <span className="uppercase tracking-[0.28em] text-[10.5px] font-bold text-primary-foreground/80">
              {cfg.eyebrow}
            </span>
          </div>
          <h1
            className="text-primary-foreground no-display"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(34px, 3.8vw, 54px)", lineHeight: 1.02 }}
          >
            Global Health<br />Access Trust
          </h1>
          <p className="mt-8 text-primary-foreground/85 text-[16.5px] leading-relaxed max-w-md">
            {cfg.description}
          </p>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/25 space-y-3">
          <p className="uppercase tracking-[0.22em] text-[10.5px] font-bold text-primary-foreground/70">
            Privacy &amp; Security
          </p>
          <p className="text-primary-foreground/80 text-[14px] leading-relaxed max-w-md">
            The platform is encrypted, GDPR-compliant and role-scoped. Every session is auditable.
          </p>
        </div>
      </aside>

      {/* RIGHT — form column */}
      <section className="flex items-center justify-center px-6 md:px-12 py-16 order-1 lg:order-2 bg-background">
        <div className="w-full max-w-md">
          <span className="portal-eyebrow mb-4">{cfg.title}</span>
          <h2 className="text-foreground mb-8" style={{ fontSize: "clamp(24px, 2.2vw, 32px)", fontWeight: 500, letterSpacing: "-0.018em" }}>
            {cfg.heading}
          </h2>

          {cfg.signupAllowed ? (
            <Tabs defaultValue="login" className="w-full portal-tabs">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="pt-8">
                <LoginForm {...props} />
              </TabsContent>

              <TabsContent value="signup" className="pt-8">
                <SignupForm {...props} />
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <LoginForm {...props} />
              {props.portal === "team" && (
                <div className="mt-10 pt-6 border-t border-foreground/10">
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Project Team accounts are not self-service. Approved workers are added by a Trust administrator.
                    New applicants can submit their details for review.
                  </p>
                  <Link
                    to={cfg.applyRoute!}
                    className="inline-flex items-center h-11 px-6 mt-5 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors"
                  >
                    {cfg.applyLabel}
                  </Link>
                </div>
              )}
              {props.portal === "admin" && (
                <p className="mt-8 text-[12px] text-muted-foreground leading-relaxed">
                  Administrator accounts are provisioned internally by the Trust Office. Sign-in attempts are logged.
                </p>
              )}
            </>
          )}

          <p className="mt-8 pt-6 border-t border-foreground/10 text-xs text-muted-foreground leading-relaxed">
            All engagement is authenticated and audited for GDPR compliance and safeguarding.
          </p>
        </div>
      </section>
    </div>
  );
};

const LoginForm = (props: FormProps) => (
  <form onSubmit={props.handleLogin} className="space-y-5">
    {props.error && (
      <Alert variant="destructive"><AlertDescription>{props.error}</AlertDescription></Alert>
    )}
    <div className="space-y-2">
      <Label htmlFor="login-email" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Email</Label>
      <Input id="login-email" type="email" placeholder="your@email.com" value={props.loginEmail}
        onChange={(e) => props.setLoginEmail(e.target.value)} required disabled={props.loading} className="h-11" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="login-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Password</Label>
      <Input id="login-password" type="password" placeholder="••••••••" value={props.loginPassword}
        onChange={(e) => props.setLoginPassword(e.target.value)} required disabled={props.loading} className="h-11" />
    </div>
    <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.08em] text-[13px] font-semibold uppercase" disabled={props.loading}>
      {props.loading ? "Signing in..." : "Sign In"}
    </Button>
  </form>
);

const SignupForm = (props: FormProps) => (
  <form onSubmit={props.handleSignup} className="space-y-5">
    {props.error && <Alert variant="destructive"><AlertDescription>{props.error}</AlertDescription></Alert>}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="first-name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">First Name *</Label>
        <Input id="first-name" type="text" value={props.signupFirstName}
          onChange={(e) => props.setSignupFirstName(e.target.value)} required disabled={props.loading} className="h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Last Name *</Label>
        <Input id="last-name" type="text" value={props.signupLastName}
          onChange={(e) => props.setSignupLastName(e.target.value)} required disabled={props.loading} className="h-11" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="signup-email" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Email *</Label>
      <Input id="signup-email" type="email" value={props.signupEmail}
        onChange={(e) => props.setSignupEmail(e.target.value)} required disabled={props.loading} className="h-11" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="signup-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Password *</Label>
      <Input id="signup-password" type="password" value={props.signupPassword}
        onChange={(e) => props.setSignupPassword(e.target.value)} required disabled={props.loading}
        minLength={PASSWORD_REQUIREMENTS.minLength} className="h-11" />
      <p className="text-xs text-muted-foreground">
        Minimum {PASSWORD_REQUIREMENTS.minLength} characters, with an uppercase letter, a number, and a symbol.
      </p>
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirm-password" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Confirm Password *</Label>
      <Input id="confirm-password" type="password" value={props.signupConfirmPassword}
        onChange={(e) => props.setSignupConfirmPassword(e.target.value)} required disabled={props.loading} className="h-11" />
    </div>
    <div className="flex items-start space-x-2 pt-2">
      <Checkbox id="terms-accepted" checked={props.termsAccepted}
        onCheckedChange={(c) => props.setTermsAccepted(c as boolean)} disabled={props.loading} />
      <label htmlFor="terms-accepted" className="text-sm leading-relaxed cursor-pointer text-muted-foreground">
        I agree to the{" "}
        <a href="/terms-of-use" className="text-primary hover:underline" target="_blank">Website and Portal Terms of Use</a>
        {" "}and confirm that I have read the{" "}
        <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Notice</a>. *
      </label>
    </div>
    <p className="text-[12px] text-muted-foreground leading-relaxed">
      Creating an account does not constitute blanket consent to the processing of your personal data.
      Personal information is processed for the specific purposes explained in the Privacy Notice, using
      the lawful bases described there.
    </p>
    <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.08em] text-[13px] font-semibold uppercase" disabled={props.loading || !props.termsAccepted}>
      {props.loading ? "Creating account..." : "Create Account"}
    </Button>
  </form>
);


export default AuthPage;
