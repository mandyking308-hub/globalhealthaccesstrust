import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const FrequentlyAskedQuestionsPage = () => (
  <ContentLayout>
    <SEO
      title="Frequently Asked Questions"
      description="Common questions about the legal identity, history, governance, banking and charitable work of Global Health Access Trust."
      canonical="/frequently-asked-questions"
    />
    <h1>Frequently Asked Questions</h1>
    <p className="featured-text">Clear answers about the Trust's status, governance and current stage of development.</p>

    <div className="section-container">
      <h2>What is Global Health Access Trust?</h2>
      <p>
        Global Health Access Trust is a charitable trust established under the laws of England and Wales. It is governed by its Trust Deed and administered by its Board of Trustees exclusively for charitable purposes.
      </p>
      <p>
        It is not a company and is not currently presented as a registered charity. The website does not display a company number or Charity Commission registration number.
      </p>
    </div>

    <div className="section-container">
      <h2>When did the work begin?</h2>
      <p>
        The charitable and public-benefit work that led to Global Health Access Trust began in 2019. Global Health Access Trust itself was formally established under its Trust Deed with effect from 1 December 2024.
      </p>
    </div>

    <div className="section-container">
      <h2>Who governs the Trust?</h2>
      <p>
        The current Trustees are Mandy King, Chair of Trustees; Dr Jagdev Thukral; and John O'Sullivan BA FCA. They retain responsibility for charitable purpose, banking, financial stewardship, risk, safeguarding and project approval.
      </p>
      <p>
        Rachael Duff, Dr Joy Wong and Richard Banyard are valued advisory and specialist contributors. They are not Trustees, do not control Trust funds and cannot bind GHAT without specific written trustee authority.
      </p>
      <Link to="/trustee-biographies" className="text-primary hover:underline">Read the full biographies →</Link>
    </div>

    <div className="section-container">
      <h2>What is the wider clinical network?</h2>
      <p>
        The earlier Clinicians Check work created an international clinician and volunteer network with registrations numbering in the thousands, representation across 12 countries and more than 40 partner and organisational relationships.
      </p>
      <p>
        These figures describe wider network reach and organisational capacity. They are not claims that GHAT has completed funded projects in every represented country.
      </p>
    </div>

    <div className="section-container">
      <h2>What current work can be described publicly?</h2>
      <p>
        The wider team is providing unpaid technical and operational support to an agricultural supply-chain organisation in Nigeria. The work is intended to improve visibility and coordination across farmers, partners, logistics, quality assurance, buyer delivery and payment-risk processes. The organisation is not publicly named and completed results are not claimed.
      </p>
    </div>

    <div className="section-container">
      <h2>Does the Trust already have a bank account?</h2>
      <p>
        The Trustees are applying for a UK bank account in the legal name Global Health Access Trust. No public bank details or payment route should be treated as active until the account and provider settings have been verified and approved.
      </p>
    </div>

    <div className="section-container">
      <h2>When is a donation recorded?</h2>
      <p>
        A pledge, mandate, payment instruction or pending transfer is not recorded as a completed donation. A donation is recorded only after cleared funds have been received and reconciled.
      </p>
    </div>

    <div className="section-container">
      <h2>Does GHAT operate Gift Aid?</h2>
      <p>
        No. GHAT does not currently operate a Gift Aid scheme. Gift Aid will not be claimed or advertised unless the required HMRC recognition, declarations and processes are in place.
      </p>
    </div>

    <div className="section-container">
      <h2>Have annual accounts or audits already been published?</h2>
      <p>
        The website does not claim that annual accounts, an independent examination, an audit or a regulatory filing has already been completed or published. Accounts and external review will be undertaken where required by law or approved by the Trustees.
      </p>
    </div>

    <div className="section-container">
      <h2>How can I contact the Trust?</h2>
      <p>
        Use the secure contact form. Direct GHAT email addresses and bank details are not printed on the public website. Enquiries are reviewed and answered according to their nature and priority; no guaranteed response time is published.
      </p>
      <Link to="/contact-the-trust" className="text-primary hover:underline">Contact the Trust securely →</Link>
    </div>
  </ContentLayout>
);
