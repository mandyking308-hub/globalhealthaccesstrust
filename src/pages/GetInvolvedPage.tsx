import { Heart, Users, Gift, Mail, ArrowRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const GetInvolvedPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gold/10 to-primary/5">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Support the Trust
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              The Global Health Access Trust is structured to receive, steward, and apply 
              charitable donations, legacies, and grants with the full solemnity of a 
              fiduciary institution, governed by trust law and operating exclusively for 
              the public benefit.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container-section">
          <div className="max-w-4xl mx-auto prose-professional text-center mb-16">
            <p className="text-lg">
              Gifts to the Trust constitute enduring expressions of public duty, civic identity, 
              and personal legacy. Whether made in life or by will, every gift received is held 
              in perpetuity for charitable purposes, and is administered with the same care, 
              documentation, and integrity one would expect of a constitutional body or public trustee.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-16 bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ways to Support Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We respectfully invite support through the following lawful and recognised methods:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Direct Donations */}
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-heart/10 rounded-lg flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Direct Charitable Donations</h3>
                    <Badge variant="secondary" className="mt-1">Most Common</Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Support through single or recurring charitable donations made directly to our 
                  registered bank account, or through authorised donation platforms.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span>One-time donation</span>
                    <Button size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly giving</span>
                    <Button size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual donation</span>
                    <Button size="sm" disabled>Coming Soon</Button>
                  </div>
                </div>
                
                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Gift Aid:</strong> UK taxpayers may qualify for Gift Aid relief 
                    under HMRC guidelines, increasing the value of your donation by 25% at no cost to you.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Legacy Giving */}
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mr-4">
                    <Gift className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Legacy Giving</h3>
                    <Badge variant="outline" className="mt-1">Bequests by Will</Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Testators may name the Global Health Access Trust as a beneficiary in their will. 
                  A lasting way to ensure healthcare justice continues beyond your lifetime.
                </p>
                
                <div className="bg-accent/20 border border-accent rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">Suggested Wording:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "I give [the sum of £____ / ___% of my residuary estate] to the Global Health 
                    Access Trust (registered address: 2 Harley Street. London, Charity Commission 
                    registration pending, anticipated 2025), for its general charitable purposes."
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  We offer guidance and collaboration with legal and financial advisers to ensure 
                  your legacy is both honoured and protected.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Major Giving Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Restricted Gifts */}
            <Card className="card-professional">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Restricted Gifts & Named Funds</h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Major benefactors may direct their support to a particular charitable purpose 
                  aligned with the Trust's objectives—such as the establishment of a named bursary, 
                  programme, or grant stream.
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Review and approval by the Board of Trustees</li>
                  <li>• Alignment with the Trust's charitable objects</li>
                  <li>• Documentation via Memorandum of Understanding</li>
                </ul>
              </CardContent>
            </Card>

            {/* Founding Benefactors */}
            <Card className="card-professional">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mr-4">
                    <Gift className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold">Founding Benefactor Status</h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Individuals, foundations, and family offices who make a capital contribution of 
                  significant scale may be invited to become Founding Benefactors of the Trust.
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Establish named endowments</li>
                  <li>• Recognition in perpetuity on formal registers</li>
                  <li>• Annual stewardship reports</li>
                  <li>• Ceremonial and diplomatic representation opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Integration Placeholder */}
      <section className="py-16 primary-gradient text-primary-foreground">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Integration Placeholder</h3>
              <p className="text-primary-foreground/80 mb-4">
                Secure donation processing will be integrated with one of the following trusted platforms:
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <Badge variant="secondary">Stripe</Badge>
                <Badge variant="secondary">Charities Aid Foundation</Badge>
                <Badge variant="secondary">JustGiving</Badge>
                <Badge variant="secondary">PayPal Giving Fund</Badge>
              </div>
              <p className="text-sm text-primary-foreground/70 mt-4">
                Implementation notes: Ensure PCI compliance, Gift Aid capture, and donor stewardship workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" variant="secondary" disabled>
                <Heart className="mr-2 w-5 h-5" />
                Donate Now (Coming Soon)
              </Button>
              
              <div className="text-primary-foreground/80">
                <p>For immediate donations or legacy enquiries, please contact:</p>
                <a 
                  href="mailto:operations@globalhealthaccesstrust.org" 
                  className="font-medium underline hover:no-underline"
                >
                  operations@globalhealthaccesstrust.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container-section">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">Stay Connected</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates on our work, impact reports, and opportunities 
              to support healthcare justice worldwide.
            </p>
            
            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Newsletter Integration Placeholder</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Double opt-in newsletter signup with integration options:
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Badge variant="outline">Mailchimp</Badge>
                <Badge variant="outline">ConvertKit</Badge>
                <Badge variant="outline">Generic Webhook</Badge>
              </div>
              <Button disabled>
                Subscribe (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stewardship Promise */}
      <section className="py-16 bg-accent/20">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Stewardship and Oversight
            </h2>
            <div className="prose-professional">
              <p className="text-lg mb-6">
                All support received by the Trust shall be receipted and acknowledged with due formality, 
                accounted for in published financial statements, and applied solely in accordance with 
                the Trust's charitable constitution and the laws of England and Wales.
              </p>
              <blockquote className="text-xl font-serif italic text-primary">
                "No donation may be used for private benefit, nor may any influence be accepted 
                in exchange for gift. The Trust retains full independence of operation and 
                decision-making authority in all matters."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};