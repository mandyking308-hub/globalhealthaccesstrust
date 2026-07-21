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
    <footer className="bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">

          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-primary" aria-hidden="true" />
              <span className="font-serif text-xl font-bold uppercase tracking-tight">
                {SITE_CONFIG.shortName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <div>{SITE_CONFIG.address.line1}</div>
              <div>{SITE_CONFIG.address.city}</div>
              <div>{SITE_CONFIG.address.country}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Navigation</h5>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            {FOOTER_SECTIONS.quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Governance */}
          <div className="flex flex-col gap-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Governance</h5>
            {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Stay Connected</h5>
            <form onSubmit={handleNewsletterSubmit}>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Subscribe to receive updates on our work and impact.
              </p>
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted/30 border-foreground/10 text-foreground placeholder:text-muted-foreground text-sm h-9 rounded-none"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubscribed}
                  className="text-sm h-9 rounded-none"
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
              <Link to="/terms-of-use" className="hover:text-foreground transition-colors">Terms of Use</Link>
              <Link to="/data-access-request" className="hover:text-foreground transition-colors">Data Request</Link>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
