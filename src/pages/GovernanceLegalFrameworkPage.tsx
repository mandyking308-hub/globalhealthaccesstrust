import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

export const GovernanceLegalFrameworkPage = () => (
  <ContentLayout>
    <SEO
      title="Governance & Legal Framework"
      description="The legal identity, trustee authority, banking controls and governance framework of Global Health Access Trust."
      canonical="/governance-legal-framework"
    />
    <h1>Governance &amp; Legal Framework</h1>
    <p className="featured-text">Trustee authority, documented decisions and controlled stewardship.</p>

    <div className="section-container">
      <h2>Legal status</h2>
      <p>{LEGAL_ENTITY.publicLegalDescription}</p>
      <p>
        The Trust is not a company and does not claim a company number. It does not claim a Charity Commission registration number. Its signed Trust Deed is the governing document under which the Trustees act.
      </p>
      <p>
        The public correspondence address is {LEGAL_ENTITY.correspondenceAddress.single}. It is not described as a registered office.
      </p>
    </div>

    <div className="section-container">
      <h2>Board of Trustees</h2>
      <p>The current Board comprises Mandy King, Dr Jagdev Thukral and John O'Sullivan BA FCA.</p>
      <p>The Trustees are collectively responsible for:</p>
      <ul>
        <li>acting within the Trust Deed and exclusively for charitable purposes;</li>
        <li>considering public benefit and avoiding unauthorised private benefit;</li>
        <li>approving banking mandates, signatories and payment controls;</li>
        <li>approving material gifts, restrictions, projects and expenditure;</li>
        <li>maintaining appropriate records, risk management and safeguarding oversight; and</li>
        <li>ensuring that donor preferences do not displace trustee decision-making.</li>
      </ul>
      <Link to="/trustee-biographies" className="text-primary hover:underline">Trustee information →</Link>
    </div>

    <div className="section-container">
      <h2>Banking authority</h2>
      <p>
        The Trustees are seeking a UK bank account in the legal name Global Health Access Trust. The account must not be opened in the name of an individual Trustee, adviser, associated company or trading style.
      </p>
      <ul>
        <li>Bank signatories and online-banking users require documented trustee authority.</li>
        <li>Dual control will be used for material payments and sensitive banking changes wherever the selected bank supports it.</li>
        <li>Bank details will be held in controlled administration settings and will not be hardcoded into the public website.</li>
        <li>No public payment collection will be activated before account details and settlement arrangements are verified.</li>
        <li>Statements, reconciliations, approvals and supporting documents will form part of the Trust's accounting records.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>Financial governance</h2>
      <ul>
        <li>Funds are accepted only for purposes within the Trust Deed.</li>
        <li>Restricted gifts are accepted only through an express trustee decision and are recorded separately.</li>
        <li>Proposed, pending and failed payments are not treated as received donations.</li>
        <li>Cleared funds are reconciled before a receipt or project allocation is finalised.</li>
        <li>Material expenditure must be supported by records and appropriate approval.</li>
        <li>Accounts will be prepared and independently examined or audited where required by law or approved by the Trustees.</li>
      </ul>
      <Link to="/financial-controls" className="text-primary hover:underline">Financial controls →</Link>
    </div>

    <div className="section-container">
      <h2>Risk, due diligence and sanctions</h2>
      <p>
        The Trust applies a proportionate, risk-based approach to donor, partner and project due diligence. This may include identity, authority, source-of-funds, beneficial-ownership, sanctions, politically exposed person, adverse-information and conflict checks where relevant.
      </p>
      <p>
        Screening does not replace trustee judgement. The Trustees may refuse, return or pause funding where legal, ethical, safeguarding, reputational or operational risk cannot be managed appropriately.
      </p>
      <Link to="/donor-due-diligence-and-sanctions-policy" className="text-primary hover:underline">Due diligence and sanctions policy →</Link>
    </div>

    <div className="section-container">
      <h2>Records and accountability</h2>
      <p>
        The Trust maintains records of trustee decisions, legal-document versions, acceptances, project approvals, financial movements, complaints, safeguarding matters and other material governance events. Public information is separated from confidential, personal, legally privileged and safeguarding-restricted records.
      </p>
      <p>
        Reports and filings will be prepared, approved and supplied where required by applicable law, a competent regulator, a bank or a binding agreement. The website does not claim that a filing or audit has occurred unless it has actually occurred.
      </p>
    </div>

    <div className="section-container">
      <h2>Governing document and policies</h2>
      <div className="flex flex-wrap gap-5">
        <Link to="/constitution" className="text-primary hover:underline">Signed Constitution →</Link>
        <Link to="/legal" className="text-primary hover:underline">Legal Centre →</Link>
        <Link to="/support" className="text-primary hover:underline">Complaints and protected pathways →</Link>
      </div>
    </div>
  </ContentLayout>
);
