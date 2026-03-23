import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TermsOfUsePage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Terms of Use
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: <span className="font-medium">16 September 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                By accessing and using the Global Health Access Trust website, you accept and agree 
                to be bound by these Terms of Use. If you do not agree to these terms, please do not 
                use our website or services.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Use of Website</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3">Permitted Use</h3>
              <p className="mb-4">You may use our website for lawful purposes only, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Learning about our charitable activities and mission</li>
                <li>Making donations to support our work</li>
                <li>Accessing public information and resources</li>
                <li>Contacting us through provided channels</li>
              </ul>

              <h3 className="font-semibold mb-3">Prohibited Use</h3>
              <p className="mb-4">You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Transmit or attempt to transmit any harmful code or malware</li>
                <li>Interfere with the security or proper functioning of the website</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Use automated systems to access the website without our permission</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of Global Health Access Trust or our licensors and is protected by 
                copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may view, print, and download content for personal, non-commercial use only, 
                provided you do not modify the content and retain all copyright notices.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                All donations made through our website are processed securely and are subject to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our charitable objects and governing document</li>
                <li>Applicable charity law and regulations</li>
                <li>Due diligence and compliance requirements</li>
                <li>Our commitment to use funds exclusively for charitable purposes</li>
              </ul>
              <p className="mt-4">
                Donations are generally not refundable except in exceptional circumstances 
                at our sole discretion.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center">
                
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3">Information Accuracy</h3>
              <p className="mb-4">
                We strive to ensure information on our website is accurate and up-to-date. 
                However, we make no warranties about the completeness, accuracy, or reliability 
                of any information provided.
              </p>

              <h3 className="font-semibold mb-3">External Links</h3>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible 
                for the content, privacy practices, or terms of use of external sites.
              </p>

              <h3 className="font-semibold mb-3">No Professional Advice</h3>
              <p>
                Information on our website is for general informational purposes only and 
                should not be construed as professional, medical, legal, or financial advice.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To the fullest extent permitted by law, Global Health Access Trust shall not 
                be liable for any direct, indirect, incidental, special, consequential, or 
                punitive damages arising from your use of this website or any information 
                contained herein.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                These Terms of Use are governed by the laws of England and Wales. Any disputes 
                arising from these terms or your use of our website shall be subject to the 
                exclusive jurisdiction of the courts of England and Wales.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional border-primary/20">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have questions about these Terms of Use, please{" "}
                <a href="/contact" className="text-primary hover:underline">
                  use the Contact Form
                </a>.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting to this website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};