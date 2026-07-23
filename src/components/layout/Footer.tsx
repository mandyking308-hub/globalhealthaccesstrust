import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_SECTIONS, SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { supabase } from "@/integrations/supabase/client";

const publicQuickLinks = FOOTER_SECTIONS.quickLinks;

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [subscriptionReference, setSubscriptionReference] = useState<string | null>(null);

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubscriptionStatus("submitting");
    setSubscriptionReference(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: {
          name: "Institutional updates subscriber",
          email: normalizedEmail,
          phone: "",
          organisation: "",
          position: "",
          nature_of_enquiry: "General Enquiry",
          message: "Please add this email address to the Global Health Access Trust institutional updates list.",
          additional_context: "Submitted through the website footer institutional updates form.",
          consent: true,
          honeypot: "",
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.message || "Request failed");

      setSubscriptionReference(typeof data.reference === "string" ? data.reference : null);
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Institutional updates request failed", error);
      setSubscriptionStatus("error");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-10 mt-24 border-t border-primary-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-primary-foreground/15">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-sans text-lg font-black uppercase tracking-[0.02em] leading-[0.95]">
                {SITE_CONFIG.shortName}
              </span>
            </div>
            <p className="font-sans text-3xl md:text-4xl leading-[0.98] font-black uppercase max-w-xl tracking-[-0.005em]">
              Structured support for the systems that make healthcare possible.
            </p>
            <p className="text-sm text-primary-foreground/70 mt-8 max-w-md leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-3">
              <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Navigation</h5>
              {publicQuickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[15px] font-sans font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Governance</h5>
              {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[15px] font-sans font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Correspondence</h5>
              <div className="text-sm text-primary-foreground/85 leading-relaxed">
                <div>{SITE_CONFIG.address.line1}</div>
                <div>{SITE_CONFIG.address.city}</div>
                <div>{SITE_CONFIG.address.country}</div>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="mt-4">
                <p className="text-xs text-primary-foreground/70 mb-3 leading-relaxed">
                  Subscribe for institutional updates.
                </p>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    aria-label="Email address for institutional updates"
                    placeholder="Email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (subscriptionStatus !== "submitting") setSubscriptionStatus("idle");
                    }}
                    required
                    disabled={subscriptionStatus === "submitting"}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm h-10 rounded-none focus-visible:ring-primary-foreground/40"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={subscriptionStatus === "submitting"}
                    className="text-[12px] font-sans tracking-[0.14em] uppercase font-black h-10 rounded-none bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {subscriptionStatus === "submitting" ? "Submitting…" : "Subscribe"}
                  </Button>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-primary-foreground/60">
                  By submitting, you ask the Trust to contact you with institutional updates. See the{" "}
                  <Link to="/legal/privacy-notice" className="underline hover:text-primary-foreground">Privacy Notice</Link>.
                </p>
                <div className="mt-2 min-h-5 text-[11px]" aria-live="polite">
                  {subscriptionStatus === "success" && (
                    <span className="text-primary-foreground/85">
                      Request received{subscriptionReference ? ` — ${subscriptionReference}` : ""}.
                    </span>
                  )}
                  {subscriptionStatus === "error" && (
                    <span className="text-primary-foreground/85">The request could not be submitted. Please use the contact form.</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-6 text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60">
              <Link to="/legal" className="hover:text-primary-foreground transition-colors">Legal Centre</Link>
              <Link to="/legal/privacy-notice" className="hover:text-primary-foreground transition-colors">Privacy Notice</Link>
              <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">Cookie Notice</Link>
              <CookieSettingsLink className="hover:text-primary-foreground transition-colors uppercase tracking-[0.22em]">Cookie Settings</CookieSettingsLink>
              <Link to="/legal/terms-of-use" className="hover:text-primary-foreground transition-colors">Terms of Use</Link>
              <Link to="/donor-project-funding-terms" className="hover:text-primary-foreground transition-colors">Funding Terms</Link>
              <Link to="/gift-acceptance-and-restricted-funds-policy" className="hover:text-primary-foreground transition-colors">Gift Acceptance</Link>
              <Link to="/donor-due-diligence-and-sanctions-policy" className="hover:text-primary-foreground transition-colors">Due Diligence</Link>
              <Link to="/project-team-terms" className="hover:text-primary-foreground transition-colors">Project Team Terms</Link>
              <Link to="/support" className="hover:text-primary-foreground transition-colors">Support &amp; Concerns</Link>
              <Link to="/legal/complaints-policy" className="hover:text-primary-foreground transition-colors">Complaints</Link>
              <Link to="/data-access-request" className="hover:text-primary-foreground transition-colors">Data Request</Link>
              <Link to="/preferences" className="hover:text-primary-foreground transition-colors">Communication Preferences</Link>
            </div>
            <p className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60">
              © {new Date().getFullYear()} {SITE_CONFIG.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
