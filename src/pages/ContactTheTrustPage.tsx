import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

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
        <h2>General Enquiries</h2>
        <p>Global Health Access Trust<br />
        2 Harley Street, London<br />
        United Kingdom</p>
      </div>

      <div className="section-container">
        <h2>Legacy & Legal Enquiries</h2>
        <p>Subject line: Legacy – Confidential</p>
        <p>To contact the Chair of Trustees or for guidance on testamentary giving, please use the secure contact form or email above.</p>
      </div>

      <div className="section-container">
        <h2>Support the Trust</h2>
        <p>All funding relationships are established through a structured engagement process aligned with the Trust's governance and charitable mandate.</p>
        <p>We welcome enquiries regarding:</p>
        <ul>
          <li>Structured funding relationships (via formal engagement pathways)</li>
          <li>Legacy giving (see suggested will wording on our Support the Trust page)</li>
          <li>Restricted gifts for specific programmes, bursaries, or geographies</li>
          <li>Founding benefactor capital (minimum thresholds apply)</li>
        </ul>
        <p>All contributions are receipted, independently accounted for, and held exclusively for charitable purposes. Influence is never accepted in exchange for support.</p>
        <p>If you wish to discuss a significant gift, charitable vehicle, or family legacy, please contact us in confidence.</p>
      </div>

      <p className="featured-text">We respond to all serious enquiries within 48 hours.</p>
    </ContentLayout>
  );
};
