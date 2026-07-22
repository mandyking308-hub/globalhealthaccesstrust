import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

export const ContactTheTrustPage = () => (
  <ContentLayout>
    <SEO
      title="Contact the Trust"
      description="Use the secure contact form for general, legal, legacy, banking, partnership or public-benefit enquiries concerning Global Health Access Trust."
      canonical="/contact-the-trust"
    />
    <h1>Contact the Trust</h1>
    <p className="featured-text">Secure, recorded and directed to the appropriate authorised person.</p>

    <p>We welcome genuine enquiries from:</p>
    <ul>
      <li>banks, legal and financial representatives;</li>
      <li>family offices, foundations and philanthropic institutions;</li>
      <li>trustees, executors and professional advisers;</li>
      <li>academic, clinical, agricultural and health-system partners;</li>
      <li>prospective volunteers and specialist contributors; and</li>
      <li>members of the public seeking information about the Trust's charitable work.</li>
    </ul>

    <div className="section-container">
      <h2>Contact securely</h2>
      <p>
        The Trust does not publish a direct GHAT email address on the public website. Please use the secure enquiry form so the matter can be recorded, classified and handled by an appropriately authorised person.
      </p>
      <p>
        Do not include unnecessary sensitive personal information in an initial enquiry. Where supporting evidence is required, the Trust will provide an appropriate secure route after reviewing the matter.
      </p>
      <Button asChild>
        <Link to="/contact">Open the Secure Contact Form</Link>
      </Button>
    </div>

    <div className="section-container">
      <h2>Correspondence address</h2>
      <address className="not-italic">
        {LEGAL_ENTITY.correspondenceAddress.lines.map((line) => <span key={line} className="block">{line}</span>)}
      </address>
      <p>This is a correspondence address only. It is not described as a registered office.</p>
    </div>

    <div className="section-container">
      <h2>Banking and due-diligence enquiries</h2>
      <p>
        Banks and professional advisers may use the secure form to request the Trust Deed, trustee information, banking resolutions, source-of-funds controls, policy documents or other appropriate evidence. Confidential documents are supplied through controlled due-diligence channels rather than published openly.
      </p>
    </div>

    <div className="section-container">
      <h2>Funding and legacy enquiries</h2>
      <p>
        Public payment collection is not currently active. The Trustees are applying for a UK bank account in the legal name Global Health Access Trust. A proposed contribution is not treated as received until cleared funds have been reconciled through an approved account or provider.
      </p>
      <p>
        The Trust does not currently operate Gift Aid. Executors, solicitors and prospective supporters should obtain independent advice and confirm the Trust's current particulars before entering a binding arrangement.
      </p>
    </div>

    <p className="text-sm text-muted-foreground">
      Enquiries are reviewed according to their nature, urgency and the information available. The Trust does not publish a guaranteed response time.
    </p>
  </ContentLayout>
);
