import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export const FinancialControlsPage = () => (
  <>
    <SEO
      title="Financial Controls"
      description="Financial control framework of the Global Health Access Trust, including budgetary oversight, audit procedures, and fund management policies."
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
                <p><strong>Last Updated:</strong> September 16, 2025</p>
                <p><strong>Effective Date:</strong> 08/05/2025</p>
                <p><strong>Review Date:</strong> 08/05/2026</p>
                <p><strong>Approved by:</strong> Board of Trustees</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">1. Policy Statement</h2>
              <p className="text-muted-foreground">
                The Global Health Access Trust ("the Trust") is committed to ensuring that all financial activities are conducted with integrity, transparency, and accountability. This policy outlines the systems, responsibilities, and processes in place to safeguard the Trust's assets and ensure funds are used solely for charitable purposes.
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
                It covers income, expenditure, banking, record-keeping, financial reporting, and audit procedures.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. Key Principles</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All financial decisions must be authorised in accordance with Trustee resolutions</li>
                <li>Public funds must be protected from loss, fraud, misuse, or waste</li>
                <li>All financial records must comply with UK charity accounting standards applicable to the Trust's status</li>
                <li>Trustees must ensure the charity remains solvent and financially sustainable</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Roles and Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Chair of Trustees:</strong> Oversees strategic financial direction and compliance</li>
                <li><strong>Finance Director (or equivalent trustee role):</strong> Maintains day-to-day oversight and reporting</li>
                <li><strong>Board of Trustees:</strong> Approves budgets, major expenditures, and receives financial updates quarterly</li>
                <li><strong>Independent Examiner or Auditor:</strong> Reviews annual accounts for accuracy and regulatory compliance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Authorisation of Expenditure</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All expenditure must be authorised prior to payment and supported by documentation</li>
                <li>Dual authorisation is required for all transactions above £500</li>
                <li>High-value expenditures (e.g., greater than £5,000) require full board resolution</li>
                <li>Grant disbursements follow due diligence and a Grant Agreement or Deed of Gift</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Income Handling</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Donations are deposited into a designated charitable bank account</li>
                <li>Restricted and unrestricted funds are tracked separately</li>
                <li>Any future Gift Aid claims would be submitted only after HMRC recognition is confirmed and required declarations are in place</li>
                <li>Legacy income is recorded upon legal confirmation of the bequest</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Banking Arrangements</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The Trust holds accounts in its name with a UK-registered bank</li>
                <li>Online banking access is limited to designated finance personnel and monitored by trustees</li>
                <li>Monthly bank reconciliations are conducted and reviewed by the Finance Lead</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Budgeting and Reporting</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>An annual budget is prepared and approved by the Board of Trustees</li>
                <li>Actual performance is compared to budget quarterly</li>
                <li>Financial reports are shared at each board meeting</li>
                <li>Trustees may request additional reports at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. Record Keeping</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All transactions are documented with receipts, invoices, or funding agreements</li>
                <li>Financial records are retained for at least six years</li>
                <li>The Trust complies with SORP (Statement of Recommended Practice) for accounting and reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">10. External Review & Audit</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Annual financial statements are independently examined or audited</li>
                <li>Reports required by any regulator with jurisdiction over the Trust will be submitted in accordance with applicable deadlines</li>
                <li>Findings are reviewed at a full board meeting and used to strengthen internal controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">11. Fraud Prevention</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All financial activity is subject to internal controls to prevent fraud or theft</li>
                <li>Any suspected irregularity must be reported immediately to the Chair or Finance Lead</li>
                <li>Investigations will be handled with discretion and may be escalated to regulatory bodies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">12. Review and Training</h2>
              <p className="text-muted-foreground mb-6">
                This policy is reviewed annually by the Board. Training on financial governance is provided to new trustees and reviewed every two years.
              </p>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact for Financial Governance Enquiries:</h3>
                <p className="text-muted-foreground">
                  <strong>John O Sullivan</strong><br/>
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