import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const SupportTheTrustPage = () => (
  <ContentLayout>
    <SEO
      title="Support the Trust"
      description="How prospective supporters and partners may make an initial, governed enquiry to Global Health Access Trust."
      canonical="/support-the-trust"
    />
    <h1>Support the Trust</h1>
    <p className="featured-text">Initial engagement first. Verified banking and trustee approval before funds are accepted.</p>

    <p>
      Global Health Access Trust welcomes enquiries from individuals, professional advisers, family offices, foundations, institutions and organisations whose interests align with its charitable purposes.
    </p>
    <p>
      The Trustees are applying for a UK bank account in the legal name Global Health Access Trust. This page is an enquiry route, not an active payment request. No public bank details are displayed and no payment channel should be treated as active until verified and approved.
    </p>

    <div className="section-container">
      <h2>Engagement process</h2>
      <ol className="space-y-4">
        <li><strong>1. Initial enquiry:</strong> submit a secure form explaining the proposed support or relationship.</li>
        <li><strong>2. Trustee and compliance review:</strong> the Trust considers charitable fit, authority, conflicts, source of funds, sanctions, safeguarding and operational risk where relevant.</li>
        <li><strong>3. Written terms:</strong> any accepted restriction, project purpose or material funding arrangement is documented appropriately.</li>
        <li><strong>4. Verified receipt:</strong> a donation is recorded only after cleared funds have been received and reconciled through an approved account or provider.</li>
      </ol>
    </div>

    <div className="section-container">
      <h2>Restricted gifts and named purposes</h2>
      <p>
        A supporter may propose a particular charitable purpose, but any restriction requires trustee approval and clear written terms. A donor preference cannot displace the Trustees' legal responsibility or require the Trust to act outside its Trust Deed.
      </p>
      <p>
        Appropriate alternative-use, return or reallocation provisions may be required if the original purpose becomes impossible, unlawful, unsafe or no longer serves the public benefit.
      </p>
    </div>

    <div className="section-container">
      <h2>Legacy enquiries</h2>
      <p>
        Executors, solicitors and individuals considering a legacy may contact the Trust privately. No sample will wording on this website should be used without independent legal advice and confirmation that the Trust's current legal and banking particulars are correct at the time of execution.
      </p>
    </div>

    <div className="section-container">
      <h2>Gift Aid and receipts</h2>
      <p>
        The Trust does not currently operate Gift Aid. A receipt or acknowledgement will be issued only after a payment has been verified and reconciled. A pledge, mandate or pending transfer is not a completed donation.
      </p>
    </div>

    <div className="text-center mt-10">
      <Button asChild size="lg">
        <Link to="/contact-the-trust">Make a Secure Enquiry</Link>
      </Button>
    </div>
  </ContentLayout>
);
