import { Shield, Users, AlertTriangle, Heart, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SafeguardingPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            <Shield className="w-12 h-12 text-primary mr-4 mt-2" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Global Health Access Trust – Safeguarding Policy
              </h1>
              <div className="text-sm text-muted-foreground mb-6">
                <p><strong>Last Updated:</strong> September 16, 2025</p>
                <p><strong>Effective Date:</strong> 08/05/2025</p>
                <p><strong>Review Date:</strong> 08/05/2025</p>
                <p><strong>Approved by:</strong> Board of Trustees</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Alert className="border-green-200 bg-green-50">
            <Shield className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Zero tolerance</strong> approach to abuse in any form. 
              The welfare of vulnerable individuals is paramount in all our decisions.
            </AlertDescription>
          </Alert>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">1. Policy Statement</h2>
              <p className="text-muted-foreground mb-4">
                The Global Health Access Trust ("the Trust") is committed to safeguarding and promoting the welfare of all individuals, particularly children, young people, and vulnerable adults who come into contact with our services, funded programmes, or charitable activities.
              </p>
              <p className="text-muted-foreground">
                We believe that everyone has the right to live free from abuse, exploitation, and neglect. The Trust has a zero-tolerance approach to abuse in any form.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">2. Scope</h2>
              <p className="text-muted-foreground mb-4">This policy applies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All trustees, officers, and employees</li>
                <li>Contractors, volunteers, and third-party partners</li>
                <li>Any individual or organisation receiving funding from the Trust</li>
                <li>All programme or grant activity involving contact with service users</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. Legal Framework</h2>
              <p className="text-muted-foreground mb-4">This policy is aligned with the following legislation and guidance:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The Children Act 1989 and 2004</li>
                <li>The Care Act 2014</li>
                <li>The Safeguarding Vulnerable Groups Act 2006</li>
                <li>Working Together to Safeguard Children (HM Government)</li>
                <li>Charity Commission guidance on safeguarding</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Definitions</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Child:</strong> Anyone under the age of 18</li>
                <li><strong>Vulnerable adult:</strong> A person aged 18 or over who may be unable to protect themselves from harm or exploitation</li>
                <li><strong>Abuse:</strong> A violation of an individual's human and civil rights, including physical, emotional, sexual, and financial abuse or neglect</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Trustees have ultimate accountability for safeguarding within the Trust</li>
                <li>Safeguarding Lead: One trustee will be appointed as the Safeguarding Lead to oversee implementation and review</li>
                <li>All personnel must complete safeguarding induction training and report any concerns immediately</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Safeguarding Procedures</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All concerns, disclosures, or allegations must be reported without delay to the Safeguarding Lead</li>
                <li>The Safeguarding Lead will assess risk and contact statutory authorities where necessary</li>
                <li>Accurate records will be kept securely and confidentially</li>
                <li>Incidents will be reviewed and discussed at Board level as part of risk management</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Safer Recruitment</h2>
              <p className="text-muted-foreground mb-4">The Trust ensures that all trustees, staff, and volunteers involved in programme delivery are:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Subject to background checks (e.g. DBS checks where appropriate)</li>
                <li>Properly referenced and inducted</li>
                <li>Aware of safeguarding expectations and policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Partnerships and Due Diligence</h2>
              <p className="text-muted-foreground mb-4">Any funded partner or organisation must:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide their safeguarding policy</li>
                <li>Demonstrate compliance with local safeguarding laws</li>
                <li>Cooperate fully in reporting and resolving safeguarding issues</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. Whistleblowing</h2>
              <p className="text-muted-foreground">
                All individuals connected to the Trust are encouraged to report any concerns relating to misconduct or abuse. Whistleblowers will be protected from reprisal under the Public Interest Disclosure Act 1998.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">10. Review and Training</h2>
              <p className="text-muted-foreground mb-6">
                This policy is reviewed annually or following any significant safeguarding event. Trustees and key personnel must complete safeguarding training and refreshers as necessary.
              </p>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact Details</h3>
                <p className="text-muted-foreground">
                  <strong>Designated Safeguarding Lead:</strong><br/>
                  Dr Jagdev Thukral<br/>
                  Subject Line: Safeguarding Concern – Confidential
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export const AntiFraudPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Anti-Fraud & Anti-Corruption Policy</h1>
          <div className="text-sm text-muted-foreground mb-6">
            <p><strong>Last Updated:</strong> September 16, 2025</p>
          </div>
        </div>

        <Card className="card-professional">
          <CardContent className="p-8">
            <p className="text-muted-foreground">
              The Global Health Access Trust maintains strict anti-fraud and anti-corruption policies as part of our commitment to financial integrity and transparency. These policies are integrated within our Financial Controls Policy and Risk Management Statement to ensure comprehensive protection of charitable assets and maintain public trust.
            </p>
            <p className="text-muted-foreground mt-4">
              For detailed information on our anti-fraud measures, please refer to our Financial Controls Policy and Risk Management Statement.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export const WhistleblowingPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Global Health Access Trust – Whistleblowing Policy
          </h1>
          <div className="text-sm text-muted-foreground mb-6">
            <p><strong>Last Updated:</strong> September 16, 2025</p>
            <p><strong>Effective Date:</strong> 08/05/2025</p>
            <p><strong>Review Date:</strong> 08/05/2026</p>
            <p><strong>Approved by:</strong> Board of Trustees</p>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">1. Policy Statement</h2>
              <p className="text-muted-foreground mb-4">
                The Global Health Access Trust ("the Trust") is committed to the highest standards of integrity, ethics, and public accountability. This Whistleblowing Policy provides a secure, confidential process for reporting concerns about wrongdoing, misconduct, or malpractice within or related to the Trust.
              </p>
              <p className="text-muted-foreground">
                We encourage individuals to report concerns early and without fear of retaliation. Reports may be made anonymously and will be handled with discretion.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">2. Scope</h2>
              <p className="text-muted-foreground mb-4">This policy applies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Trustees and advisory board members</li>
                <li>Employees, contractors, and consultants</li>
                <li>Volunteers or beneficiaries</li>
                <li>Partners or anyone working with or on behalf of the Trust</li>
              </ul>
              
              <p className="text-muted-foreground mb-4 mt-4">It covers concerns related to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial mismanagement or misuse of charitable funds</li>
                <li>Fraud, corruption, or criminal activity</li>
                <li>Breach of legal or regulatory obligations</li>
                <li>Safeguarding failures</li>
                <li>Harassment, discrimination, or abuse of power</li>
                <li>Serious breach of internal policies</li>
                <li>Any action that may seriously harm the Trust's mission or reputation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. Legal Framework</h2>
              <p className="text-muted-foreground">
                This policy is guided by the UK Public Interest Disclosure Act 1998. Individuals who raise concerns in good faith are protected by law and by this policy from dismissal, discrimination, or disadvantage.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Reporting a Concern</h2>
              <p className="text-muted-foreground mb-4">Concerns should be raised as soon as possible through one of the following methods:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Primary contact:</strong> Mandy King, Chair of Trustees</li>
                <li><strong>Alternative contact:</strong> John O Sullivan, Governance Lead</li>
                <li><strong>Subject line:</strong> "Whistleblowing – Confidential"</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Reports may also be submitted anonymously, though doing so may limit the Trust's ability to investigate fully.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Investigation Procedure</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The concern is acknowledged within 5 working days</li>
                <li>A preliminary review is conducted to assess risk and credibility</li>
                <li>If necessary, a full investigation is initiated, either internally or by a third party</li>
                <li>Outcomes and actions are documented and retained securely</li>
                <li>The reporter (if known) will be updated on findings, within confidentiality limits</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Confidentiality and Protection</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Whistleblowers are protected from victimisation, dismissal, or other negative treatment</li>
                <li>All reports are kept confidential and only shared with those who need to know</li>
                <li>Retaliation against a whistleblower is a disciplinary offence and may result in dismissal or removal from office</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Malicious or False Allegations</h2>
              <p className="text-muted-foreground">
                Deliberately false or malicious allegations will be taken seriously and may result in disciplinary action. However, no action will be taken against anyone who raises a concern in good faith, even if it proves unfounded.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Trustee Oversight</h2>
              <p className="text-muted-foreground">
                The Board of Trustees receives a summary report of any serious whistleblowing cases at its quarterly meetings. Anonymity is maintained unless disclosure is legally required.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. External Reporting</h2>
              <p className="text-muted-foreground mb-4">If you do not feel comfortable reporting internally, you may contact:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li><strong>The Charity Commission:</strong> www.gov.uk/complain-about-charity</li>
                <li><strong>Protect (formerly Public Concern at Work):</strong> www.protect-advice.org.uk | 020 3117 2520</li>
              </ul>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact for Confidential Disclosures:</h3>
                <p className="text-muted-foreground">
                  <strong>Mandy King</strong><br/>
                  Subject Line: Whistleblowing – Confidential
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export const GovernancePage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Governance & Oversight</h1>
          <div className="text-sm text-muted-foreground mb-6">
            <p><strong>Last Updated:</strong> September 16, 2025</p>
          </div>
        </div>

        <Card className="card-professional">
          <CardContent className="p-8">
            <p className="text-muted-foreground">
              The Global Health Access Trust operates under robust governance frameworks designed to ensure transparency, accountability, and effective oversight of all charitable activities. Our governance structure encompasses multiple interconnected policies and procedures that work together to maintain the highest standards of charitable governance.
            </p>
            <p className="text-muted-foreground mt-4">
              For comprehensive information on our governance framework, please refer to our specific policy documents including the Conflict of Interest Policy, Financial Controls Policy, Risk Management Statement, and related governance documents available on this website.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);