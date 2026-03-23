import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GovernancePage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Governance & Oversight
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our commitment to transparent, accountable, and ethical governance.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Governance & Oversight Framework</span>
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Governance Philosophy</h2>
                <p>
                  The Global Health Access Trust operates under a governance framework designed to 
                  ensure accountability, transparency, and effectiveness in all our activities. 
                  We are committed to the highest standards of institutional integrity and public trust.
                </p>
                <p>
                  Our governance approach is built on the principles of fiduciary duty, collective 
                  responsibility, and prudent stewardship of charitable resources.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  
                  Board of Trustees
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Composition and Appointment</h3>
                    <p>
                      The Board of Trustees comprises individuals with diverse expertise in global health, 
                      governance, finance, and law. Trustees are appointed based on their commitment to 
                      our charitable objectives and their professional competence.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Setting strategic direction and charitable objectives</li>
                      <li>Ensuring compliance with legal and regulatory requirements</li>
                      <li>Overseeing financial management and risk assessment</li>
                      <li>Monitoring performance and impact measurement</li>
                      <li>Ensuring accountability to beneficiaries and stakeholders</li>
                      <li>Safeguarding the Trust's reputation and public trust</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Meeting Structure</h3>
                    <p>
                      The Board meets quarterly, with additional meetings convened as necessary. 
                      All meetings follow formal procedures with documented minutes and action tracking.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  
                  Decision-Making Framework
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Delegated Authority</h3>
                    <p>
                      Clear delegation of authority ensures efficient decision-making while maintaining 
                      appropriate oversight. Major decisions require full Board approval, while operational 
                      matters are delegated to appropriate committees or officers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Committee Structure</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Audit Committee:</strong> Financial oversight and risk management</li>
                      <li><strong>Programme Committee:</strong> Strategic direction and impact assessment</li>
                      <li><strong>Governance Committee:</strong> Board effectiveness and compliance</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Voting and Quorum</h3>
                    <p>
                      All significant decisions require a quorum of trustees and are made by majority vote, 
                      with the Chair having a casting vote in case of deadlock. Emergency procedures 
                      allow for rapid decision-making when required.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  
                  Conflicts of Interest
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Declaration and Management</h3>
                    <p>
                      All trustees and senior staff maintain registers of interests and declare any 
                      potential conflicts at the beginning of each meeting. Conflicts are managed 
                      through withdrawal from discussions and decision-making as appropriate.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Annual Review</h3>
                    <p>
                      Registers of interests are reviewed annually and updated as circumstances change. 
                      The Governance Committee monitors compliance and provides guidance on complex situations.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  
                  Risk Management
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Risk Assessment Framework</h3>
                    <p>
                      The Trust maintains a comprehensive risk register covering strategic, operational, 
                      financial, and reputational risks. Risk assessment is integrated into all 
                      decision-making processes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Risk Categories</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Regulatory compliance and legal obligations</li>
                      <li>Financial management and sustainability</li>
                      <li>Programme delivery and impact</li>
                      <li>Safeguarding and duty of care</li>
                      <li>Reputation and public trust</li>
                      <li>Information security and data protection</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Monitoring and Review</h3>
                    <p>
                      The risk register is reviewed quarterly by the Audit Committee and annually 
                      by the full Board. Mitigation strategies are regularly updated and tested.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Financial Governance</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Financial Controls</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Segregation of duties in financial processes</li>
                      <li>Dual authorisation for significant expenditures</li>
                      <li>Regular financial monitoring and reporting</li>
                      <li>Annual external audit by qualified auditors</li>
                      <li>Investment policy and regular portfolio review</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Budget and Planning</h3>
                    <p>
                      Annual budgets are prepared and approved by the Board, with quarterly monitoring 
                      and variance reporting. Multi-year financial planning ensures sustainability 
                      and strategic alignment.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Transparency and Accountability</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Public Reporting</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Annual reports published and filed with the Charity Commission</li>
                      <li>Financial statements prepared in accordance with SORP requirements</li>
                      <li>Impact reporting demonstrating charitable outcomes</li>
                      <li>Public access to governance documents and policies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Stakeholder Engagement</h3>
                    <p>
                      Regular engagement with beneficiaries, funders, partners, and the wider public 
                      ensures accountability and continuous improvement. Feedback mechanisms are 
                      built into all our programmes and operations.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Performance Monitoring</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Performance Indicators</h3>
                    <p>
                      The Board monitors performance against strategic objectives using agreed KPIs 
                      covering programme outcomes, financial efficiency, and governance effectiveness.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Annual Review Process</h3>
                    <p>
                      Annual reviews assess progress against strategic objectives, evaluate governance 
                      effectiveness, and identify areas for improvement. External evaluation is 
                      commissioned periodically to ensure objectivity.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p>
                    <strong>Contact:</strong>{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Please use the Contact Form
                    </a>
                  </p>
                  <p><strong>Governance Enquiries:</strong> Include "Governance" in subject line</p>
                  <p><strong>Annual Reports:</strong> Available on request and via Charity Commission</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};