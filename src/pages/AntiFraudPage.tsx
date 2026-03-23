import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AntiFraudPage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Anti-Fraud & Anti-Corruption Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Our commitment to maintaining the highest standards of integrity and transparency.
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Anti-Fraud & Anti-Corruption Policy</span>
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
                <h2 className="text-2xl font-semibold mb-4">Policy Statement</h2>
                <p>
                  The Global Health Access Trust is committed to conducting all our activities with 
                  integrity, honesty, and transparency. We have zero tolerance for fraud, corruption, 
                  bribery, or any form of financial misconduct.
                </p>
                <p>
                  This policy applies to all trustees, staff, volunteers, partners, contractors, 
                  and anyone acting on behalf of the Trust.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Fraud</h3>
                    <p>
                      Deliberate deception, misrepresentation, or concealment for personal gain or 
                      to cause loss to another party.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Corruption</h3>
                    <p>
                      The misuse of position, power, or trust for personal gain or advantage.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Bribery</h3>
                    <p>
                      Offering, giving, receiving, or soliciting something of value to influence 
                      actions or decisions improperly.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Prevention Measures</h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Regular financial monitoring and audit processes</li>
                  <li>Clear segregation of duties in financial processes</li>
                  <li>Transparent procurement and grant-making procedures</li>
                  <li>Regular due diligence checks on partners and suppliers</li>
                  <li>Staff training on fraud prevention and detection</li>
                  <li>Clear policies on gifts, hospitality, and conflicts of interest</li>
                  <li>Regular review and update of internal controls</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reporting Procedures</h2>
                <p>
                  If you suspect fraud, corruption, or any financial misconduct, please report it immediately using the{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact Form
                  </a>:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <p><strong>Subject:</strong> Confidential - Fraud/Corruption Report</p>
                  <p><strong>Mark as:</strong> Urgent if needed</p>
                </div>
                <p>
                  All reports will be treated confidentially and investigated thoroughly. 
                  We protect whistleblowers from retaliation and ensure their safety.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Investigation Process</h2>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>All reports are acknowledged within 48 hours</li>
                  <li>Initial assessment and risk evaluation conducted</li>
                  <li>Investigation team appointed (independent where necessary)</li>
                  <li>Evidence gathered and documented</li>
                  <li>Findings reviewed by senior management and trustees</li>
                  <li>Appropriate action taken based on findings</li>
                  <li>Follow-up to prevent recurrence</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Consequences</h2>
                <p>
                  Fraud, corruption, or financial misconduct may result in:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Disciplinary action, including termination</li>
                  <li>Recovery of misappropriated funds</li>
                  <li>Referral to law enforcement authorities</li>
                  <li>Civil action to recover losses</li>
                  <li>Notification to regulatory bodies</li>
                  <li>Public disclosure where appropriate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Training and Awareness</h2>
                <p>
                  The Trust provides regular training to all staff and trustees covering:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Recognition of fraud and corruption risks</li>
                  <li>Reporting procedures and protection measures</li>
                  <li>Legal and regulatory requirements</li>
                  <li>Ethical decision-making</li>
                  <li>Due diligence procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Monitoring and Review</h2>
                <p>
                  This policy is reviewed annually by the Board of Trustees and updated as necessary 
                  to reflect changes in law, regulation, or best practice. Implementation is monitored 
                  through regular audit and compliance reviews.
                </p>
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
                  <p><strong>For urgent matters:</strong> Include "URGENT" in subject line</p>
                  <p><strong>Anonymous reporting:</strong> Available through our whistleblowing procedures</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};