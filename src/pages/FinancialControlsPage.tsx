import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export const FinancialControlsPage = () => (
  <>
    <SEO
      title="Financial Controls"
      description="Financial control framework of the Global Health Access Trust, including budgetary oversight, record keeping and fund management policies."
      canonical="/financial-controls"
    />
    <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Global Health Access Trust – Financial Controls Policy
              </h1>
              <div className="text-sm text-muted-foreground mb-6">
                <p><strong>Published:</strong> September 2025</p>
                <p><strong>Status:</strong> Current public policy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">1. Policy Statement</h2>
              <p className="text-muted-foreground">
                The Global Health Access Trust ("the Trust") is committed to ensuring that all financial activities are conducted with integrity, transparency, and accountability. This policy outlines the systems, responsibilities, and processes used to safeguard the Trust's assets and ensure funds are applied solely for charitable purposes.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">2. Scope</h2>
              <p className="text-muted-foreground mb-4">This policy applies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Trustees</li>
                <li>Employees and consultants handling funds</li>
                <li>Any individual or organisation acting on behalf of the Trust</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                It covers income, expenditure, record-keeping, financial reporting, and independent review procedures.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. Key Principles</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial decisions must be authorised in accordance with documented Trustee decisions and delegated limits</li>
                <li>Charitable funds and assets must be protected from loss, fraud, misuse, or waste</li>
                <li>Financial records and reporting must follow the legal and accounting requirements applicable to the organisation's status and activities</li>
                <li>Trustees must monitor solvency and financial sustainability</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Roles and Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Chair of Trustees:</strong> Oversees strategic financial direction and compliance</li>
                <li><strong>Finance Lead or designated Trustee:</strong> Maintains financial oversight and reporting</li>
                <li><strong>Board of Trustees:</strong> Approves budgets and significant expenditure and receives appropriate financial updates</li>
                <li><strong>Independent Examiner or Auditor:</strong> Reviews accounts where required by law or formally commissioned by the Board</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Authorisation of Expenditure</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Expenditure must be authorised before payment and supported by appropriate documentation</li>
                <li>Dual authorisation is required for transactions above £500 unless the Board records a different control for a defined purpose</li>
                <li>Expenditure above £5,000 requires a recorded Board decision</li>
                <li>Grant disbursements require proportionate due diligence and an appropriate written agreement</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Income Handling</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All income is recorded promptly and allocated according to any applicable restrictions</li>
                <li>Restricted and unrestricted funds are recorded separately</li>
                <li>Any future Gift Aid claims will be made only after the necessary HMRC recognition, declarations and processes are in place</li>
                <li>Legacy income is recorded following legal confirmation of the bequest</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Budgeting and Reporting</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A budget is prepared when required for the Trust's activities and approved by the Board</li>
                <li>Actual income and expenditure are reviewed against approved budgets at appropriate intervals</li>
                <li>Financial information is provided to Trustees for oversight and decision-making</li>
                <li>Trustees may request additional reports or supporting records at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Record Keeping</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Transactions are supported by receipts, invoices, agreements or other appropriate records</li>
                <li>Financial records are retained for the period required by applicable law and good governance practice</li>
                <li>Accounting and reporting will follow the requirements applicable to the organisation's legal status, income and activities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. Independent Review</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial statements will be independently examined or audited where required by law or formally commissioned by the Board</li>
                <li>Reports required by any regulator with jurisdiction over the Trust will be submitted in accordance with applicable requirements</li>
                <li>Any findings or recommendations will be considered by the Trustees and used to strengthen controls where appropriate</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">10. Fraud Prevention</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial activity is subject to proportionate controls intended to prevent and identify fraud, theft or misuse</li>
                <li>Suspected irregularities must be reported promptly to the Chair or Finance Lead</li>
                <li>Concerns may be escalated to appropriate professional advisers, regulators or law-enforcement bodies where required</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">11. Review and Training</h2>
              <p className="text-muted-foreground mb-6">
                The policy is reviewed when the Trust's activities, legal obligations or financial risks materially change. Trustees and authorised personnel receive information or training proportionate to their responsibilities.
              </p>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact for Financial Governance Enquiries:</h3>
                <p className="text-muted-foreground">
                  <strong>John O'Sullivan BA FCA</strong><br/>
                  Subject Line: Finance – Confidential
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  </>
);
