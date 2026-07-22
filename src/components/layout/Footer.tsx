import { Link } from "react-router-dom";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About the Trust", href: "/about-the-trust" },
  { label: "Trustees and Advisers", href: "/trustee-biographies" },
  { label: "Our Work", href: "/our-work" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact-the-trust" },
];

const governanceLinks = [
  { label: "Governance Framework", href: "/governance-legal-framework" },
  { label: "Signed Constitution", href: "/constitution" },
  { label: "Financial Controls", href: "/financial-controls" },
  { label: "Risk Management", href: "/risk-management" },
  { label: "Anti-Fraud", href: "/anti-fraud" },
  { label: "Whistleblowing", href: "/whistleblowing" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Legal Centre", href: "/legal" },
];

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground pt-24 pb-10 mt-24 border-t border-primary-foreground/10">
    <div className="max-w-[1400px] mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-primary-foreground/15">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-sans text-lg font-black uppercase tracking-[0.02em] leading-[0.95]">GHAT</span>
          </div>
          <p className="font-sans text-3xl md:text-4xl leading-[0.98] font-black uppercase max-w-xl tracking-[-0.005em]">
            Trustee-led work for accountable healthcare access.
          </p>
          <p className="text-sm text-primary-foreground/70 mt-8 max-w-md leading-relaxed">
            Global Health Access Trust is a charitable trust governed by its Trust Deed and administered by its Board of Trustees exclusively for charitable purposes.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Navigation</h5>
            {navigationLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-[14px] font-sans font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Governance</h5>
            {governanceLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-[14px] font-sans font-bold uppercase tracking-[0.04em] text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60 mb-2">Correspondence</h5>
            <address className="not-italic text-sm text-primary-foreground/85 leading-relaxed">
              {LEGAL_ENTITY.correspondenceAddress.lines.map((line) => <div key={line}>{line}</div>)}
            </address>
            <p className="text-xs text-primary-foreground/65 leading-relaxed">
              Correspondence address only. This is not described as a registered office.
            </p>
            <Link to="/contact-the-trust" className="text-sm font-semibold underline underline-offset-4 text-primary-foreground/90 hover:text-primary-foreground">
              Use the secure contact form
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-5 text-[10.5px] font-sans font-black uppercase tracking-[0.18em] text-primary-foreground/60">
            <Link to="/legal" className="hover:text-primary-foreground transition-colors">Legal Centre</Link>
            <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Notice</Link>
            <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">Cookie Notice</Link>
            <CookieSettingsLink className="hover:text-primary-foreground transition-colors uppercase tracking-[0.18em]">Cookie Settings</CookieSettingsLink>
            <Link to="/terms-of-use" className="hover:text-primary-foreground transition-colors">Terms of Use</Link>
            <Link to="/legal/complaints-policy" className="hover:text-primary-foreground transition-colors">Complaints</Link>
            <Link to="/support" className="hover:text-primary-foreground transition-colors">Support and Concerns</Link>
            <Link to="/data-access-request" className="hover:text-primary-foreground transition-colors">Data Request</Link>
          </div>
          <p className="text-[10.5px] font-sans font-black uppercase tracking-[0.22em] text-primary-foreground/60">
            © {new Date().getFullYear()} {LEGAL_ENTITY.legalName}
          </p>
        </div>
      </div>
    </div>
  </footer>
);
