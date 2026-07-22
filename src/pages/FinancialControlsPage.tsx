import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const FinancialControlsPage = () => (
  <>
    <SEO
      title="Financial Controls"
      description="The trustee-led banking, income, expenditure, record-keeping and reporting controls of Global Health Access Trust."
      canonical="/financial-controls"
    />
    <ContentLayout>
      <h1>Financial Controls</h1>
      <p className="featured-text">
        Trustee authority, verified banking and evidence-based accounting.
      </p>

      <p className="text-sm text-muted-foreground">
        This page is a public summary. Formal resolutions, mandates, approval records and confidential banking information are retained within the Trust's private governance records.
      </p>

      <div className="section-container">
        <h2>Trustee responsibility</h2>
        <p>
          The Trustees are collectively responsible for safeguarding the Trust's assets and ensuring that funds are accepted, held and used exclusively for lawful charitable purposes and the public benefit.
        </p>
        <p>
          Digital systems support administration and record keeping. They do not replace trustee decisions, bank mandates, accounting records or professional advice.
        </p>
      </div>

      <div className="section-container">
        <h2>Banking arrangements</h2>
        <p>
          The Trustees are applying for a UK bank account in the legal name <strong>Global Health Access Trust</strong>. The website does not claim that this account is already open.
        </p>
        <ul>
          <li>The account must be held in the Trust's legal name, not in the name of an individual Trustee, adviser, associated company or trading style.</li>
          <li>Bank signatories and online-banking users require documented trustee approval.</li>
          <li>Dual control will be used for material payments and sensitive banking changes where the selected bank supports it.</li>
          <li>Bank details will remain private and will not be hardcoded into or displayed on the public website.</li>
          <li>No payment collection will be treated as active until the account, settlement details and provider settings have been verified and approved.</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Receipt and recording of income</h2>
        <ul>
          <li>A pledge, proposed gift, draft payment instruction, mandate or pending transfer is not recorded as received income.</li>
          <li>A donation is recorded only after cleared funds have been received and reconciled to the relevant bank or payment-provider record.</li>
          <li>Failed, reversed, disputed or refunded transactions are recorded according to their actual status and are not reported as completed donations.</li>
          <li>Restricted and unrestricted funds are recorded separately.</li>
          <li>A receipt or acknowledgement is issued only for a payment that has been verified and reconciled.</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Gift Aid</h2>
        <p>
          Global Health Access Trust does not currently operate a Gift Aid scheme. Gift Aid will not be claimed or advertised unless the required HMRC recognition is in place and a valid declaration and supporting records have been obtained.
        </p>
      </div>

      <div className="section-container">
        <h2>Expenditure and approvals</h2>
        <ul>
          <li>Expenditure must fall within the Trust Deed and an approved charitable purpose.</li>
          <li>Material expenditure requires documented approval in accordance with trustee resolutions and the applicable banking mandate.</li>
          <li>Payments must be supported by appropriate invoices, agreements, receipts or other evidence.</li>
          <li>Conflicts of interest must be declared and managed before the relevant decision is taken.</li>
          <li>Project payments are linked to an approved purpose, budget, responsibility and reporting arrangement.</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Due diligence and financial crime controls</h2>
        <p>
          The Trustees apply proportionate donor, partner and project checks. Depending on risk, this may include identity and authority, source-of-funds, beneficial-ownership, sanctions, politically exposed person, adverse-information and conflict checks.
        </p>
        <p>
          The Trust may refuse, pause, return or restrict funds where legal, ethical, safeguarding, reputational or operational risks cannot be managed appropriately.
        </p>
      </div>

      <div className="section-container">
        <h2>Records, reconciliation and reporting</h2>
        <ul>
          <li>Bank and payment-provider movements will be reconciled to the accounting records.</li>
          <li>Records will distinguish allocated, committed, spent, remaining, refunded and reallocated amounts.</li>
          <li>Financial records and supporting evidence will be retained for the applicable legal and accounting period.</li>
          <li>Accounts, reports and filings will be prepared, approved and supplied where required by law, a competent regulator, a bank or a binding agreement.</li>
          <li>Accounts will be independently examined or audited where required by law or separately approved by the Trustees.</li>
        </ul>
        <p>
          The website does not claim that annual accounts, an independent examination, an audit or a regulatory filing has already been completed or published unless that has actually occurred.
        </p>
      </div>

      <div className="section-container">
        <h2>Financial governance enquiries</h2>
        <p>
          Banks, professional advisers and other authorised due-diligence reviewers may request supporting governance evidence through the Trust's secure contact route.
        </p>
        <Link to="/contact-the-trust" className="text-primary hover:underline">
          Contact the Trust securely →
        </Link>
      </div>
    </ContentLayout>
  </>
);
