import { Cookie, Settings, BarChart3, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CookiePolicyPage = () => {
  return (
    <div className="py-16">
      <div className="container-content">
        <div className="text-left mb-12">
          <div className="flex items-start mb-4">
            <Cookie className="w-12 h-12 text-primary mr-4 mt-2" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Cookie Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: <span className="font-medium">16 September 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-left space-y-8">
          {/* What are cookies */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>What are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cookies are small text files that are placed on your computer or mobile device 
                when you visit a website. They are widely used to make websites work more 
                efficiently and provide information to website owners about how their site is being used.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center text-success">
                  <Shield className="w-5 h-5 mr-2" />
                  Essential Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  These cookies are strictly necessary for the website to function properly. 
                  They cannot be switched off and are set in response to actions you take.
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Security and authentication</li>
                  <li>Form submission functionality</li>
                  <li>Cookie consent preferences</li>
                  <li>Load balancing</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong>Retention:</strong> Session or 1 year maximum
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center text-info">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analytics Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  These cookies help us understand how visitors use our website by 
                  collecting anonymous information about page visits and user interactions.
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Page view statistics</li>
                  <li>Traffic source information</li>
                  <li>User journey analysis</li>
                  <li>Performance metrics</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  <strong>Retention:</strong> Up to 24 months
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Specific Cookies */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Cookie Name</th>
                      <th className="text-left py-2 font-medium">Purpose</th>
                      <th className="text-left py-2 font-medium">Duration</th>
                      <th className="text-left py-2 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2 font-mono">cookie-consent</td>
                      <td className="py-2">Stores your cookie preferences</td>
                      <td className="py-2">1 year</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-success/10 text-success rounded text-xs">Essential</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">_plausible_*</td>
                      <td className="py-2">Privacy-friendly analytics</td>
                      <td className="py-2">24 months</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-info/10 text-info rounded text-xs">Analytics</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono">session_id</td>
                      <td className="py-2">Maintains user session</td>
                      <td className="py-2">Session</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-success/10 text-success rounded text-xs">Essential</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You can control cookies in several ways:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cookie Banner</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    When you first visit our website, you'll see a cookie banner where you can 
                    accept or decline non-essential cookies.
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Cookie Preferences
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Most browsers allow you to control cookies through their settings. 
                    You can usually find these options in the 'Settings' or 'Preferences' menu.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Opt-out Links</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <a href="https://plausible.io/data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Plausible Analytics Opt-out
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youronlinechoices.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        Your Online Choices
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Consent Mode */}
          <Card className="card-professional border-primary/20">
            <CardHeader>
              <CardTitle>Google Consent Mode v2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We implement Google Consent Mode v2 to ensure compliance with privacy regulations 
                whilst maintaining measurement capabilities. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Analytics only function with your explicit consent</li>
                <li>No personal data is processed without permission</li>
                <li>Aggregated, privacy-preserving insights may still be collected</li>
                <li>Your consent choices are respected across all Google services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle>Questions About Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions about our use of cookies, please{" "}
                <a href="/contact" className="text-primary hover:underline">
                  use the Contact Form
                </a>.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                This Cookie Policy should be read alongside our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};