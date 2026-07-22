import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const DonatePage = () => (
  <ContentLayout>
    <SEO
      title="Funding Engagement"
      description="A secure enquiry route for prospective support of Global Health Access Trust while verified banking arrangements are established."
      canonical="/donate"
    />
    <h1>Funding Engagement</h1>
    <p className="featured-text">This is an enquiry page. Public payment collection is not currently active.</p>

    <p>
      The Trustees are applying for a UK bank account in the legal name Global Health Access Trust. Bank details and payment-provider links will not be displayed or activated until the relevant account, settlement arrangements and controls have been verified and approved.
    </p>

    <div className="section-container">
      <h2>Before any funds are accepted</h2>
      <ul>
        <li>The proposed support must fall within the Trust Deed and serve the public benefit.</li>
        <li>The Trust may carry out identity, authority, source-of-funds, sanctions, conflict and other proportionate due-diligence checks.</li>
        <li>Any restriction or material funding arrangement must be approved and documented by the Trustees.</li>
        <li>No adviser, associated company or individual Trustee may substitute a personal or corporate account for an account held in GHAT's legal name.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>When a contribution counts as received</h2>
      <p>
        A pledge, payment instruction, mandate or pending transfer is not treated as received charitable income. A donation is recorded only after cleared funds have been received and reconciled through an approved account or provider.
      </p>
      <p>
        The Trust does not currently operate Gift Aid and will not claim or advertise Gift Aid before the required HMRC recognition and valid declarations are in place.
      </p>
    </div>

    <div className="text-center mt-10">
      <Button asChild size="lg">
        <Link to="/contact-the-trust">Submit a Funding Enquiry</Link>
      </Button>
    </div>
  </ContentLayout>
);
