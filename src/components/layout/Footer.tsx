import { Link } from "react-router-dom";
import { Globe, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_SECTIONS, SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-section">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Organization Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="font-serif font-semibold text-lg">
                  {SITE_CONFIG.name}
                </div>
              </div>
              
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                {SITE_CONFIG.description}
              </p>
              
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    {SITE_CONFIG.address.line1}<br />
                    {SITE_CONFIG.address.city}<br />
                    {SITE_CONFIG.address.country}
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <Link 
                      to="/contact"
                      className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
                    >
                      Please use the Contact Form for all enquiries
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {FOOTER_SECTIONS.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance & Policies */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Governance & Policies</h3>
              <ul className="space-y-3">
                {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Language */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Stay Connected</h3>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <p className="text-primary-foreground/80 mb-4 text-sm">
                  Subscribe to receive updates on our work and impact.
                </p>
                <div className="flex flex-col space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button 
                    type="submit"
                    variant="secondary"
                    size="sm"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                  </Button>
                </div>
              </form>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-primary-foreground/70">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </div>
              <div className="text-xs text-primary-foreground/60 max-w-2xl">
                Content is protected under copyright law. Unauthorized copying, distribution, or reproduction is prohibited.
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
              >
                Privacy
              </Link>
              <Link
                to="/cookie-policy"
                className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
              >
                Cookies
              </Link>
              <Link
                to="/terms-of-use"
                className="text-primary-foreground font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary rounded transition-all"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};