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
    <footer className="border-t border-border/30 bg-foreground text-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Organization Info */}
            <div className="lg:col-span-1">
              <div className="font-serif text-lg font-semibold mb-6">
                {SITE_CONFIG.name}
              </div>
              
              <p className="text-background/70 mb-6 leading-relaxed text-sm">
                {SITE_CONFIG.description}
              </p>
              
              <div className="space-y-2 text-sm text-background/60">
                <div>
                  {SITE_CONFIG.address.line1}<br />
                  {SITE_CONFIG.address.city}<br />
                  {SITE_CONFIG.address.country}
                </div>
                <div className="pt-2">
                  <Link 
                    to="/contact"
                    className="text-background/80 hover:text-background transition-colors underline-offset-4 hover:underline"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] mb-6 text-background/50">Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/volunteers"
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    Become a Volunteer
                  </Link>
                </li>
                {FOOTER_SECTIONS.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] mb-6 text-background/50">Governance</h3>
              <ul className="space-y-2.5">
                {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] mb-6 text-background/50">Stay Connected</h3>
              
              <form onSubmit={handleNewsletterSubmit}>
                <p className="text-background/60 mb-4 text-sm leading-relaxed">
                  Subscribe to receive updates on our work and impact.
                </p>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/40 text-sm h-9"
                  />
                  <Button 
                    type="submit"
                    variant="secondary"
                    size="sm"
                    disabled={isSubscribed}
                    className="text-sm h-9"
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-background/50">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-xs">
              <Link to="/privacy-policy" className="text-background/50 hover:text-background/80 transition-colors">Privacy</Link>
              <Link to="/cookie-policy" className="text-background/50 hover:text-background/80 transition-colors">Cookies</Link>
              <Link to="/terms-of-use" className="text-background/50 hover:text-background/80 transition-colors">Terms</Link>
              <Link to="/data-access-request" className="text-background/50 hover:text-background/80 transition-colors">Data Request</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
