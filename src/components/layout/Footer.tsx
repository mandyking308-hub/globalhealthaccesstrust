import { useState } from "react";
import { Link } from "react-router-dom";
import { FOOTER_SECTIONS, SITE_CONFIG } from "@/lib/constants";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="ghat-footer">
      <div className="ghat-shell">
        <div className="ghat-footer__masthead">
          <Link to="/" className="ghat-brand ghat-brand--footer" aria-label="Global Health Access Trust - Home">
            <span className="ghat-brand__mark" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
            <span className="ghat-brand__name">
              Global Health<br />Access Trust
            </span>
          </Link>
          <p>Access to health is justice<br />— not charity.</p>
        </div>

        <div className="ghat-footer__grid">
          <div className="ghat-footer__address">
            <p>{SITE_CONFIG.description}</p>
            <address>
              {SITE_CONFIG.address.line1}<br />
              {SITE_CONFIG.address.city}<br />
              {SITE_CONFIG.address.country}
            </address>
            <Link to="/contact">Contact the Trust</Link>
          </div>

          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link to="/volunteer-apply">Become a Volunteer</Link></li>
              {FOOTER_SECTIONS.quickLinks.map((link) => (
                <li key={link.href}><Link to={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Governance</h2>
            <ul>
              {FOOTER_SECTIONS.governance.slice(0, 8).map((link) => (
                <li key={link.href}><Link to={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Stay connected</h2>
            <p>Subscribe to receive updates on our work and impact.</p>
            <form className="ghat-newsletter" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="ghat-newsletter-email">Email address</label>
              <input
                id="ghat-newsletter-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" disabled={isSubscribed}>
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="ghat-footer__bottom">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/cookie-policy">Cookies</Link>
            <Link to="/terms-of-use">Terms</Link>
            <Link to="/data-access-request">Data Request</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
