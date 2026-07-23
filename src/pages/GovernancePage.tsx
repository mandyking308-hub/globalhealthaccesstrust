import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export const GovernancePage = () => {
  return (
    <>
      <SEO
        title="Governance & Oversight"
        description="How the Global Health Access Trust exercises Board oversight, records decisions, governs projects and protects public accountability."
        canonical="/governance"
      />
      <div className="flex flex-col">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/5">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
            <h1 className="mb-6">Governance &amp; Oversight</h1>
            <p className="text-xl text-foreground leading-relaxed max-w-3xl">
              “Oversight is exercised through collective responsibility, documented decisions and evidence.”
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
            <div className="section-container">
              <h2>Board Oversight</h2>
              <p>The Board retains responsibility for charitable purpose, strategy, safeguarding, institutional risk, significant expenditure, project approval and the appointment of advisers and delivery partners.</p>
              <p>Authority may be delegated only within documented limits and remains subject to Board review.</p>
            </div>

            <div className="section-container">
              <h2>Decision-Making and Records</h2>
              <p>Material decisions are recorded through meeting minutes or written resolutions.</p>
              <p>Conflicts of interest are declared and managed before participation in the relevant decision. Restricted funds, project allocations and significant contractual commitments require a clear approval record.</p>
            </div>

            <div className="section-container">
              <h2>Project Oversight</h2>
              <p>Each approved project is assigned:</p>
              <ul>
                <li>A defined charitable purpose</li>
                <li>A responsible delivery team</li>
                <li>An approved funding position</li>
                <li>Milestones and reporting requirements</li>
                <li>Evidence and expenditure records</li>
                <li>An escalation route for safeguarding, risk or material departure from scope</li>
              </ul>
            </div>

            <div className="section-container">
              <h2>Independent Assurance</h2>
              <p>Professional advice, due diligence, external review, independent examination or audit are obtained where required by law, institutional risk or the nature of the activity.</p>
            </div>

            <div className="section-container">
              <h2>Accountability and Review</h2>
              <p>Governance policies and controls are reviewed at intervals proportionate to the Trust’s activities and following any material change or incident.</p>
              <p>Donors and the public receive appropriate information while confidentiality, safeguarding, data protection, clinical responsibility and personal safety remain protected.</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/governance-legal-framework" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Governance &amp; Legal Framework →</Link>
              <Link to="/publications" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">View Publications →</Link>
              <Link to="/protected-concerns/new" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Report a Protected Concern →</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
