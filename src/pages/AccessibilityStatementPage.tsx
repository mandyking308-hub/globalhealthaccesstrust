import { Eye, Keyboard, Users, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AccessibilityStatementPage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            <Eye className="w-12 h-12 text-primary mr-4 mt-2" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Accessibility Statement
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: <span className="font-medium">{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Global Health Access Trust is committed to ensuring digital accessibility for 
                people with disabilities. We are continually improving the user experience for 
                everyone and applying relevant accessibility standards.
              </p>
              <p className="mt-4">
                We aim to conform to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA 
                standards wherever possible, exceeding minimum requirements where feasible.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Eye className="w-5 h-5 mr-2" />
                  Visual Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>High contrast colour schemes</li>
                  <li>Scalable text up to 200% without loss of functionality</li>
                  <li>Descriptive alt text for all images</li>
                  <li>Clear visual hierarchy and consistent design</li>
                  <li>Support for screen readers and magnification tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Keyboard className="w-5 h-5 mr-2" />
                  Keyboard Navigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Full keyboard navigation support</li>
                  <li>Visible focus indicators</li>
                  <li>Logical tab order throughout the site</li>
                  <li>Skip navigation links for main content</li>
                  <li>Accessible dropdown menus and forms</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Standards Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-3">WCAG 2.1 AA Compliance</h3>
              <p className="mb-4">Our website has been designed to meet WCAG 2.1 AA standards, including:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Perceivable</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Text alternatives for images</li>
                    <li>Captions and audio descriptions</li>
                    <li>Sufficient colour contrast</li>
                    <li>Resizable text</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Operable</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Keyboard accessible</li>
                    <li>No seizure-inducing content</li>
                    <li>Sufficient time for interactions</li>
                    <li>Clear navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Understandable</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Readable and predictable</li>
                    <li>Clear instructions and labels</li>
                    <li>Error identification and suggestions</li>
                    <li>Consistent navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Robust</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Valid, semantic HTML</li>
                    <li>Assistive technology compatible</li>
                    <li>Future-proof coding practices</li>
                    <li>Cross-platform compatibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Assistive Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our website is designed to be compatible with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                  <li>Voice recognition software</li>
                  <li>Screen magnification tools</li>
                  <li>Switch navigation devices</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>High contrast mode</li>
                  <li>Browser zoom functionality</li>
                  <li>Keyboard-only navigation</li>
                  <li>Alternative input devices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Known Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We are continuously working to improve accessibility. Currently known limitations include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Some third-party embedded content may not meet full accessibility standards</li>
                <li>PDF documents are being progressively updated for accessibility</li>
                <li>Some interactive features are being enhanced for better assistive technology support</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                We are actively working to address these limitations in upcoming updates.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Feedback & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We welcome feedback on the accessibility of our website. If you encounter 
                accessibility barriers or need assistance with any content, please contact us:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium mb-1">Accessibility Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Please use the{" "}
                      <a href="/contact" className="text-primary hover:underline">
                        Contact Form
                      </a>
                      {" "}for all accessibility enquiries.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please include "Accessibility Support" in your subject line.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-accent/20 rounded-lg">
                  <h4 className="font-medium mb-2">What to Include</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Description of the accessibility issue</li>
                    <li>• The web page or section where you encountered the problem</li>
                    <li>• The assistive technology you were using (if applicable)</li>
                    <li>• Your contact information for follow-up</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                We aim to respond to accessibility feedback within 2 business days and 
                resolve issues as quickly as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};