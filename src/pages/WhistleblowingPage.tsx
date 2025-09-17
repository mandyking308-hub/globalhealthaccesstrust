import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Phone } from "lucide-react";

export const WhistleblowingPage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            <Shield className="w-12 h-12 text-primary mr-4 mt-2" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Whistleblowing Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Protection and support for those who speak up about wrongdoing.
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Whistleblowing Policy</span>
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
                  The Global Health Access Trust is committed to maintaining the highest standards 
                  of integrity, transparency, and accountability. We encourage and support individuals 
                  who raise concerns about suspected wrongdoing or malpractice.
                </p>
                <p>
                  This policy provides protection for whistleblowers and sets out the procedures 
                  for raising and handling concerns in a confidential and responsible manner.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">What is Whistleblowing?</h2>
                <p>
                  Whistleblowing is the disclosure of information about suspected wrongdoing or 
                  dangers that affect others, such as the public, colleagues, or the organisation itself.
                </p>
                <p>Examples of qualifying disclosures include:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Fraud, corruption, or financial misconduct</li>
                  <li>Breach of legal obligations or regulatory requirements</li>
                  <li>Miscarriage of justice or criminal offences</li>
                  <li>Endangering health and safety</li>
                  <li>Damage to the environment</li>
                  <li>Concealment of any of the above</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-primary" />
                  Protection for Whistleblowers
                </h2>
                <p>The Trust provides comprehensive protection for genuine whistleblowers:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Protection from retaliation, dismissal, or discriminatory treatment</li>
                  <li>Confidential handling of reports and identity protection</li>
                  <li>Anonymous reporting options where appropriate</li>
                  <li>Support throughout the investigation process</li>
                  <li>Right to be accompanied at meetings</li>
                  <li>Protection under the Public Interest Disclosure Act 1998</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-primary" />
                  Confidential Reporting Procedures
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Internal Reporting</h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p><strong>Email:</strong> operations@globalhealthaccesstrust.org</p>
                      <p><strong>Subject:</strong> Confidential - Whistleblowing Report</p>
                      <p><strong>Mark as:</strong> Private and Confidential</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Anonymous Reporting</h3>
                    <p>
                      If you prefer to report anonymously, you may do so through our secure reporting system. 
                      While anonymous reports are accepted, providing contact details helps with investigation 
                      and follow-up.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">External Reporting</h3>
                    <p>
                      If internal reporting is inappropriate or ineffective, you may report to:
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Charity Commission (for charity-related concerns)</li>
                      <li>Relevant regulatory bodies</li>
                      <li>Professional bodies</li>
                      <li>Legal authorities where criminal activity is suspected</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Investigation Process</h2>
                <ol className="list-decimal ml-6 space-y-3">
                  <li>
                    <strong>Receipt and Acknowledgment:</strong> All reports are acknowledged within 48 hours, 
                    with confirmation of confidential handling.
                  </li>
                  <li>
                    <strong>Initial Assessment:</strong> The Chair of Trustees reviews the concern to 
                    determine appropriate investigation procedures.
                  </li>
                  <li>
                    <strong>Investigation:</strong> An independent investigation team is appointed, 
                    with external expertise where necessary.
                  </li>
                  <li>
                    <strong>Evidence Gathering:</strong> All relevant evidence is collected and documented 
                    in accordance with legal requirements.
                  </li>
                  <li>
                    <strong>Findings and Action:</strong> Investigation findings are reviewed by the 
                    Board of Trustees and appropriate action is taken.
                  </li>
                  <li>
                    <strong>Follow-up:</strong> The whistleblower is updated on outcomes and measures 
                    taken to prevent recurrence.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Support for Whistleblowers</h2>
                <p>The Trust provides comprehensive support including:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Regular updates on investigation progress</li>
                  <li>Access to independent advice and support</li>
                  <li>Counselling services where appropriate</li>
                  <li>Protection from retaliation or harassment</li>
                  <li>Reasonable adjustments to working conditions if needed</li>
                  <li>Legal support where whistleblower protection is breached</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Malicious or False Allegations</h2>
                <p>
                  While we encourage reporting of genuine concerns, we take malicious or deliberately 
                  false allegations seriously. Such actions may result in disciplinary measures.
                </p>
                <p>
                  However, no action will be taken against anyone who makes a report in good faith, 
                  even if the investigation concludes that no wrongdoing occurred.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-primary" />
                  Monitoring and Review
                </h2>
                <p>
                  This policy is reviewed annually by the Board of Trustees. We monitor the 
                  effectiveness of our whistleblowing procedures and make improvements based on 
                  feedback and best practice.
                </p>
                <p>
                  All whistleblowing cases are reported anonymously to the Board of Trustees 
                  as part of our governance and risk management processes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-primary" />
                  Emergency Contacts
                </h2>
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <p><strong>Chair of Trustees:</strong> operations@globalhealthaccesstrust.org</p>
                  <p><strong>For urgent matters:</strong> Include "URGENT - WHISTLEBLOWING" in subject</p>
                  <p><strong>External Support:</strong> Public Concern at Work - 020 7404 6609</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Legal Framework</h2>
                <p>
                  This policy operates within the framework of UK employment law and the 
                  Public Interest Disclosure Act 1998, which provides legal protection for 
                  whistleblowers who report wrongdoing in good faith.
                </p>
                <p>
                  The Trust is committed to compliance with all relevant legislation and 
                  regulatory guidance regarding whistleblowing and worker protection.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};