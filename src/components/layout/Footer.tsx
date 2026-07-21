import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_SECTIONS, SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-10 mt-24 border-t border-primary-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-primary-foreground/15">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-serif text-lg font-black uppercase tracking-[0.02em] leading-[0.95]">
                {SITE_CONFIG.shortName}
              </span>
            </div>
            <p className="font-serif text-3xl md:text-4xl leading-[0.98] font-black uppercase max-w-xl tracking-[-0.005em]">
              Structured funding for the systems that make healthcare possible.
            </p>
            <p className="text-sm text-primary-foreground/70 mt-8 max-w-md leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-3">
              <h5 className="text-[10.5px] font-serif font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Navigation</h5>
              {FOOTER_SECTIONS.quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[15px] font-serif font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-[10.5px] font-serif font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Governance</h5>
              {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[15px] font-serif font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h5 className="text-[10.5px] font-serif font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Correspondence</h5>
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
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm h-10 rounded-none focus-visible:ring-primary-foreground/40"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubscribed}
                    className="text-[12px] font-serif tracking-[0.14em] uppercase font-black h-10 rounded-none bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-6 text-[10.5px] font-serif font-black uppercase tracking-[0.22em] text-primary-foreground/60">
              <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
              <Link to="/terms-of-use" className="hover:text-primary-foreground transition-colors">Terms of Use</Link>
              <Link to="/data-access-request" className="hover:text-primary-foreground transition-colors">Data Request</Link>
            </div>
            <p className="text-[10.5px] font-serif font-black uppercase tracking-[0.22em] text-primary-foreground/60">
              © {new Date().getFullYear()} {SITE_CONFIG.name}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
              <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
              <Link to="/terms-of-use" className="hover:text-primary-foreground transition-colors">Terms of Use</Link>
              <Link to="/data-access-request" className="hover:text-primary-foreground transition-colors">Data Request</Link>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
              © {new Date().getFullYear()} {SITE_CONFIG.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
