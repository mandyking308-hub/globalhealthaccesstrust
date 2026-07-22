import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const ControlCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="card-professional">
    <CardContent className="p-8">
      <h2 className="text-2xl font-serif font-bold mb-4">{title}</h2>
      {children}
    </CardContent>
  </Card>
);

export const FinancialControlsPage = () => (
  <>
    <SEO
      title="Financial Controls"
      description="The trustee-led financial control framework of Global Health Access Trust, covering authorisation, banking, restricted funds, due diligence, records and reporting."
      canonical="/financial-controls"
    />
    <div className="py-16">
      <div className="container-content">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Financial Controls
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A trustee-led framework for safeguarding charitable funds, maintaining clear records and ensuring that every financial decision remains within the Trust's governing purposes.
            </p>
            <p className="text-sm text-muted-foreground mt-5">
              This page is a public summary. Formal resolutions, mandates, approval records, due-diligence files and confidential financial information are retained within the Trust's private governance records.
            </p>
          </div>

          <div className="prose max-w-none text-left space-y-8">
            <ControlCard title="1. Trustee responsibility">
              <p className="text-muted-foreground">
                The Trustees are collectively responsible for safeguarding the Trust's assets and ensuring that all funds are accepted, held and applied exclusively for lawful charitable purposes and the public benefit.
              </p>
              <p className="text-muted-foreground mt-4">
                Administrative systems support record keeping, project oversight and reporting. They do not replace trustee decisions, formal mandates, accounting records or professional advice.
              </p>
            </ControlCard>

            <ControlCard title="2. Scope">
              <p className="text-muted-foreground mb-4">The framework applies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>all Trustees and any person given delegated financial responsibilities;</li>
                <li>employees, consultants, volunteers or project personnel handling Trust resources;</li>
                <li>donations, grants, legacies, restricted funds, expenditure, reimbursements and project disbursements;</li>
                <li>banking, payment-provider activity, accounting records, reconciliation and financial reporting.</li>
              </ul>
            </ControlCard>

            <ControlCard title="3. Core principles">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial decisions must be authorised in accordance with the Trust Deed and documented Trustee resolutions.</li>
                <li>Trust assets must be protected from loss, fraud, misuse, conflict and waste.</li>
                <li>Restricted and unrestricted funds must be identifiable and separately accounted for.</li>
                <li>No individual Trustee, adviser or associated organisation may treat Trust funds as personal or corporate funds.</li>
                <li>Records must be sufficient to show the purpose, authority, evidence and outcome of each material transaction.</li>
              </ul>
            </ControlCard>

            <ControlCard title="4. Banking and payment controls">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Trust funds may be received or held only through arrangements approved by the Trustees and established in the Trust's legal name.</li>
                <li>Signatories, online-banking users and payment-provider administrators require documented Trustee authority.</li>
                <li>Material payments and sensitive account changes are subject to dual control where supported by the relevant provider.</li>
                <li>Bank and settlement details are confidential and are not displayed on the public website.</li>
                <li>Payment collection is activated only after the receiving account, settlement route, provider configuration and reconciliation process have been verified.</li>
              </ul>
            </ControlCard>

            <ControlCard title="5. Receipt and recording of income">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A pledge, proposed gift, payment instruction or pending transfer is not treated as received income.</li>
                <li>Income is recorded only after cleared funds have been received and reconciled to the relevant financial record.</li>
                <li>Failed, reversed, disputed or refunded transactions are recorded according to their actual status.</li>
                <li>Receipts and acknowledgements are issued only after payment has been verified.</li>
                <li>Legacy income is recorded only when the entitlement and receipt are legally confirmed.</li>
              </ul>
            </ControlCard>

            <ControlCard title="6. Restricted funds and donor terms">
              <p className="text-muted-foreground">
                Restrictions accepted by the Trustees are recorded against the relevant gift or agreement. Expenditure is then tracked against the approved purpose, budget and reporting obligations. Any proposed variation, reallocation or return is handled in accordance with the governing terms and applicable law.
              </p>
              <p className="text-muted-foreground mt-4">
                Donations and commissioned projects are also governed by the published <Link to="/donor-project-funding-terms" className="text-primary hover:underline">Donor and Project Funding Terms</Link> and, where relevant, a specific agreement.
              </p>
            </ControlCard>

            <ControlCard title="7. Gift Aid and tax representations">
              <p className="text-muted-foreground">
                Gift Aid is claimed only where the required HMRC recognition, valid donor declaration and supporting records are in place. The Trust does not advertise or claim a tax benefit before those requirements have been satisfied.
              </p>
            </ControlCard>

            <ControlCard title="8. Expenditure and approvals">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Expenditure must fall within the Trust Deed and an approved charitable purpose.</li>
                <li>Material commitments and payments require the level of approval specified by current Trustee resolutions and mandates.</li>
                <li>Payments must be supported by appropriate invoices, agreements, receipts, milestone evidence or equivalent documentation.</li>
                <li>Conflicts of interest must be declared, recorded and managed before the relevant decision is taken.</li>
                <li>Project disbursements are linked to an approved purpose, budget, responsible party and reporting arrangement.</li>
              </ul>
            </ControlCard>

            <ControlCard title="9. Due diligence and financial crime controls">
              <p className="text-muted-foreground">
                The Trustees apply proportionate checks to donors, partners, projects and payment routes. Depending on risk, checks may include identity and authority, source of funds, beneficial ownership, sanctions, politically exposed persons, adverse information and conflicts of interest.
              </p>
              <p className="text-muted-foreground mt-4">
                The Trust may refuse, pause, restrict, return or report funds where legal, ethical, safeguarding, reputational or operational risks cannot be managed appropriately. Further detail appears in the <Link to="/donor-due-diligence-and-sanctions-policy" className="text-primary hover:underline">Donor Due Diligence and Sanctions Policy</Link>.
              </p>
            </ControlCard>

            <ControlCard title="10. Reconciliation, records and reporting">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial movements are reconciled to the accounting records and supporting evidence.</li>
                <li>Records distinguish received, allocated, committed, spent, remaining, refunded and reallocated amounts.</li>
                <li>Financial and supporting records are retained for the applicable legal and accounting period.</li>
                <li>Accounts, reports and filings are prepared, approved and supplied where required by law, a competent regulator, a bank or a binding agreement.</li>
                <li>Independent examination or audit is arranged where required by law or separately approved by the Trustees.</li>
              </ul>
            </ControlCard>

            <ControlCard title="11. Fraud, concerns and review">
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Suspected fraud, theft, bribery, diversion or financial irregularity must be reported promptly through the protected concerns route.</li>
                <li>Relevant records are preserved and access is restricted while a concern is assessed.</li>
                <li>The Trustees review this framework and related mandates when operations, risks or legal requirements change.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-5 text-sm">
                <Link to="/anti-fraud" className="text-primary hover:underline">Anti-Fraud and Anti-Corruption Policy →</Link>
                <Link to="/protected-concerns/new" className="text-primary hover:underline">Raise a protected concern →</Link>
                <Link to="/contact-the-trust" className="text-primary hover:underline">Financial governance enquiry →</Link>
              </div>
            </ControlCard>
          </div>
        </div>
      </div>
    </div>
  </>
);
