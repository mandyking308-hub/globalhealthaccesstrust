import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy of the Global Health Access Trust. How we collect, use, store, and protect your personal data under UK GDPR."
        canonical="/privacy-policy"
      />
      <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: <span className="font-medium">16 September 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          {/* Data Controller */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center">
                
                Data Controller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Global Health Access Trust ("we", "us", "our") is the data controller for 
                personal information processed in connection with our charitable activities. 
                We are committed to protecting your privacy and handling your personal 
                information in accordance with UK GDPR and the Data Protection Act 2018.
              </p>
              <div className="mt-6 border-l-2 border-primary pl-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-2">Contact Details</p>
                <p>Global Health Access Trust</p>
                <p>2 Harley Street, London, United Kingdom</p>
                <p>
                  <a href="/contact" className="text-primary hover:underline">
                    Please use the Contact Form for all enquiries
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3">Information you provide to us:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Contact details (name, email, postal address, telephone number)</li>
                <li>Donation information and payment details</li>
                <li>Communication preferences</li>
                <li>Information submitted through contact forms or correspondence</li>
                <li>Newsletter subscription details</li>
              </ul>

              <h3 className="font-semibold mb-3">Information we collect automatically:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website usage data through analytics (with your consent)</li>
                <li>Device and browser information</li>
                <li>IP addresses and location data</li>
                <li>Cookies and similar technologies (see our Cookie Policy)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Legal Basis */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Legal Basis for Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We process your personal information on the following legal bases:</p>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-medium text-primary">Legitimate Interest</h4>
                  <p className="text-sm">For our charitable activities, fundraising, and organisational administration</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Consent</h4>
                  <p className="text-sm">For marketing communications and non-essential cookies</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Contract</h4>
                  <p className="text-sm">For processing donations and providing requested services</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Legal Obligation</h4>
                  <p className="text-sm">For compliance with charity law, financial regulations, and safeguarding requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Under UK GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Right of access:</strong> Request a copy of your personal information</li>
                <li><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Right to restrict processing:</strong> Limit how we use your information</li>
                <li><strong>Right to data portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to object:</strong> Object to processing based on legitimate interest</li>
                <li><strong>Right to withdraw consent:</strong> Where processing is based on consent</li>
              </ul>
              
              <div className="mt-6 border-l-2 border-primary pl-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                  How to Exercise Your Rights
                </h4>
                <p className="text-sm">
                  To exercise any of these rights, please{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    use the Contact Form
                  </a>
                  {" "}with "Data Subject Access Request" in the subject line.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We retain personal information for as long as necessary to fulfil the purposes for which it was collected:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Donation records:</strong> 7 years (for regulatory compliance)</li>
                <li><strong>Marketing communications:</strong> Until you unsubscribe or object</li>
                <li><strong>Website analytics:</strong> 24 months maximum</li>
                <li><strong>Contact form enquiries:</strong> 3 years unless ongoing correspondence</li>
                <li><strong>Safeguarding records:</strong> As required by statutory guidance</li>
              </ul>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>International Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may transfer your personal information to countries outside the UK for processing 
                by our service providers. Where we do so, we ensure appropriate safeguards are in 
                place through adequacy decisions, standard contractual clauses, or other approved mechanisms.
              </p>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We implement appropriate technical and organisational measures to protect your 
                personal information against unauthorised access, alteration, disclosure, or destruction. 
                These include encryption, access controls, regular security assessments, and staff training.
              </p>
            </CardContent>
          </Card>

          {/* Children */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our website and services are not directed at children under 16. We do not knowingly 
                collect personal information from children under 16 without appropriate parental consent. 
                If you believe we have collected such information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Contact & Complaints */}
          <Card className="card-professional border-primary/20">
            <CardHeader>
              <CardTitle>Contact & Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have questions about this Privacy Policy or our data practices, please{" "}
                <a href="/contact" className="text-primary hover:underline">
                  use the Contact Form
                </a>.
              </p>
              <p className="mt-4">
                You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) 
                if you believe we have not handled your personal information appropriately. 
                Visit{" "}
                <a href="https://ico.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  ico.org.uk
                </a>{" "}
                for more information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};