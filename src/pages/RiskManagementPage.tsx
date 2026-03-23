import { Card, CardContent } from "@/components/ui/card";

export const RiskManagementPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Global Health Access Trust – Risk Management Statement
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
                The Global Health Access Trust ("the Trust") recognises that effective risk management is essential to safeguarding charitable assets, maintaining legal compliance, and protecting the beneficiaries, partners, and reputation of the Trust. This policy outlines how we identify, assess, mitigate, and monitor risks across all areas of our work.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">2. Scope</h2>
              <p className="text-muted-foreground mb-4">This statement applies to all areas of the Trust's operations, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial governance</li>
                <li>Charitable programme delivery</li>
                <li>Reputational risk</li>
                <li>Legal and regulatory compliance</li>
                <li>Cybersecurity and data protection</li>
                <li>Strategic partnerships and grant-making</li>
                <li>Physical and operational safety (where applicable)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. Objectives</h2>
              <p className="text-muted-foreground mb-4">The objectives of our risk management approach are to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Identify risks that may impact the Trust's ability to meet its objectives</li>
                <li>Assess the likelihood and impact of each risk</li>
                <li>Put appropriate controls and mitigation plans in place</li>
                <li>Monitor risks regularly and review action plans</li>
                <li>Embed a culture of risk awareness across governance and operations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Roles and Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Board of Trustees:</strong> Overall responsibility for risk oversight and approval of the Risk Register</li>
                <li><strong>Executive Lead:</strong> Responsible for identifying emerging risks and executing mitigation plans</li>
                <li><strong>Governance Advisor / Secretary:</strong> Maintains the Risk Register and reports updates to the Board</li>
                <li><strong>All Personnel:</strong> Expected to report any concerns, risks, or issues that may arise in programme delivery or administration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Risk Register</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The Trust maintains a formal Risk Register</li>
                <li>Risks are assessed based on Likelihood (1–5) and Impact (1–5)</li>
                <li>Each risk is assigned a Red, Amber, or Green (RAG) rating</li>
                <li>Mitigation strategies and responsible leads are assigned</li>
                <li>The register is reviewed quarterly by the Board or delegated subcommittee</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Categories of Risk Considered</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Risk Types and Examples</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><strong>Financial:</strong> Fraud, funding gaps, misallocation of resources</li>
                    <li><strong>Governance & Legal:</strong> Breach of trustee duties, non-compliance with Charity Commission regulations</li>
                    <li><strong>Reputational:</strong> Media scrutiny, misalignment with partners, beneficiary complaints</li>
                    <li><strong>Operational:</strong> Failure in grant delivery, programme underperformance</li>
                    <li><strong>Safeguarding & Safety:</strong> Abuse allegations, breach of duty of care</li>
                    <li><strong>Technological / Cybersecurity:</strong> Data breaches, system failure, unauthorised access</li>
                    <li><strong>Strategic:</strong> Mission drift, partner failure, crisis response delays</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Mitigation Measures</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Strong internal policies (e.g. financial controls, safeguarding, due diligence)</li>
                <li>Regular trustee training and annual declarations of interest</li>
                <li>Legal vetting of grant agreements and MOUs</li>
                <li>Comprehensive due diligence for all partners</li>
                <li>Secure data systems with GDPR compliance</li>
                <li>Whistleblowing procedures in place</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Incident Reporting and Escalation</h2>
              <p className="text-muted-foreground mb-4">If a significant risk materialises:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>It must be reported to the Executive Lead or Chair of Trustees immediately</li>
                <li>A record is logged, and the Board is informed at the next available opportunity</li>
                <li>Serious incidents will be reported to the Charity Commission as required</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. Continuous Improvement</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Risk management is a standing agenda item at board meetings</li>
                <li>External reviews or audits may be conducted periodically</li>
                <li>Lessons learned from incidents are fed back into revised mitigation planning</li>
              </ul>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact for Risk & Compliance Enquiries:</h3>
                <p className="text-muted-foreground">
                  <strong>Rachel Duff</strong><br/>
                  Subject Line: Risk Reporting – Confidential
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);