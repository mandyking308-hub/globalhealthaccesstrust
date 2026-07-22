import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

export const ContactTheTrustPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Contact the Trust"
        description="Contact the Global Health Access Trust for general, legacy, legal, or partnership enquiries. All communication handled with discretion and GDPR compliance."
        canonical="/contact-the-trust"
      />
      <h1>Contact the Trust</h1>

      <p className="featured-text">Discreet. Professional. Accountable.</p>

      <p>We welcome confidential enquiries from:</p>
      <ul>
        <li>Legal and financial representatives</li>
        <li>Family offices and philanthropic institutions</li>
        <li>Trustees and executors</li>
        <li>Academic and health system partners</li>
        <li>Members of the public seeking to understand our charitable work</li>
      </ul>
      <p>All communication is treated with discretion and handled in accordance with data protection and safeguarding law.</p>

      <div className="section-container">
        <h2>Contact Securely</h2>
        <p>
          The Trust does not publish a direct email address on the public website. Please use the secure enquiry form so your matter can be routed, recorded and handled by the appropriate authorised person.
        </p>
        <Button asChild>
          <Link to="/contact">Open the Secure Contact Form</Link>
        </Button>
      </div>

      <div className="section-container">
        <h2>Correspondence Address</h2>
        <p>
          {LEGAL_ENTITY.correspondenceAddress.lines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </p>
        <p>This is the Trust&apos;s correspondence address.</p>
      </div>

      <div className="section-container">
        <h2>Legacy &amp; Legal Enquiries</h2>
        <p>When using the secure form, select <strong>Legal / Legacy Matters</strong> and mark the enquiry <strong>Legacy – Confidential</strong>.</p>
        <p>To contact the Chair of Trustees or request guidance on testamentary giving, please use the secure contact form.</p>
      </div>

      <div className="section-container">
        <h2>Support the Trust</h2>
        <p>All funding relationships are established through a structured engagement process aligned with the Trust&apos;s governance and charitable mandate.</p>
        <p>We welcome enquiries regarding:</p>
        <ul>
          <li>Structured funding relationships through formal engagement pathways</li>
          <li>Legacy giving</li>
          <li>Restricted gifts for specific programmes, bursaries or geographies</li>
          <li>Founding benefactor capital, subject to the Trust&apos;s acceptance and due-diligence processes</li>
        </ul>
        <p>All accepted contributions are receipted, accounted for and held exclusively for charitable purposes. Influence is never accepted in exchange for support.</p>
        <p>To discuss a significant gift, charitable vehicle or family legacy, please use the secure contact form.</p>
      </div>

      <p className="featured-text">We aim to acknowledge serious enquiries within two working days.</p>
    </ContentLayout>
  );
};
