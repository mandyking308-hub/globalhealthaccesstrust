import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";

export const GetInvolvedPage = () => {
  const [newsletterForm, setNewsletterForm] = useState({
    name: "",
    email: "",
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterForm.consent) return;
    console.log("Newsletter subscription:", newsletterForm);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNewsletterForm({ name: "", email: "", consent: false });
    }, 3000);
  };

  return (
    <>
      <SEO
        title="Get Involved"
        description="Engage with the Global Health Access Trust through structured partnerships, volunteering, or professional collaboration to advance healthcare access worldwide."
        canonical="/get-involved"
      />
      <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/5">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="mb-4">Engage with the Trust</h1>
          <p className="text-[15px] text-muted-foreground leading-[1.7] max-w-3xl">
            The Trust welcomes selective engagement from individuals, institutions, and professionals 
            aligned with our mandate to advance healthcare access through structured, accountable partnerships.
          </p>
        </div>
      </section>

      {/* Ways to Engage */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-4">Pathways to Engagement</h2>
          <p className="text-[15px] text-muted-foreground mb-10 leading-[1.7] max-w-3xl">
            From structured funding relationships to professional partnerships, engagement with 
            the Trust follows a selective and governed process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Support the Trust</h3>
              <p className="text-[15px] text-muted-foreground mb-6 leading-[1.7]">
                Engage with the Trust through a selective funding relationship 
                aligned with our governance and charitable mandate.
              </p>
              <Link to="/support-the-trust">
                <Button size="lg" className="w-full">Request Access</Button>
              </Link>
            </div>

            <div className="section-container">
              <h3 className="mb-3 text-foreground">Become a Partner</h3>
              <p className="text-[15px] text-muted-foreground mb-6 leading-[1.7]">
                Professional partnerships with healthcare institutions, academic bodies, 
                and development organisations to advance our shared mission.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full">Submit an Enquiry</Button>
              </Link>
            </div>

            <div className="section-container">
              <h3 className="mb-3 text-foreground">Stay Informed</h3>
              <p className="text-[15px] text-muted-foreground mb-6 leading-[1.7]">
                Subscribe to our newsletter for updates on programmes, research, 
                and opportunities to engage with the Trust.
              </p>
              <Button variant="outline" size="lg" className="w-full" onClick={() => {
                document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Partnerships */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-6">Professional Partnerships</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="section-container">
              <h3 className="mb-3 text-foreground">Healthcare Institutions</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
                We welcome partnerships with hospitals, clinics, medical schools, and 
                healthcare systems committed to principled, sustainable care delivery.
              </p>
              <ul className="text-[13px] text-muted-foreground space-y-1">
                <li>• Clinical programme development</li>
                <li>• Professional training initiatives</li>
                <li>• Research collaboration opportunities</li>
                <li>• Quality improvement programmes</li>
              </ul>
            </div>

            <div className="section-container">
              <h3 className="mb-3 text-foreground">Academic &amp; Research</h3>
              <p className="text-[15px] text-muted-foreground leading-[1.7] mb-4">
                Academic partnerships advance evidence-based policy and practice 
                through rigorous research and scholarship.
              </p>
              <ul className="text-[13px] text-muted-foreground space-y-1">
                <li>• Policy research initiatives</li>
                <li>• Academic exchange programmes</li>
                <li>• Publication and dissemination</li>
                <li>• Capacity building support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter-section" className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="mb-4">Stay Informed</h2>
            <p className="text-[15px] text-muted-foreground mb-6 leading-[1.7]">
              Subscribe to receive updates on our programmes, research findings, 
              and opportunities to engage with the Trust.
            </p>

            {isSubmitted ? (
              <div className="section-container">
                <h3 className="mb-2 text-foreground">Subscription Confirmed</h3>
                <p className="text-[15px] text-muted-foreground">
                  Thank you for subscribing. You'll receive a confirmation email shortly.
                </p>
              </div>
            ) : (
              <div className="section-container">
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-name">First Name</Label>
                      <Input
                        id="newsletter-name"
                        value={newsletterForm.name}
                        onChange={(e) => setNewsletterForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-email">Email Address</Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={newsletterForm.email}
                        onChange={(e) => setNewsletterForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter-consent"
                        checked={newsletterForm.consent}
                        onCheckedChange={(checked) => 
                          setNewsletterForm(prev => ({ ...prev, consent: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="newsletter-consent" className="text-sm leading-relaxed cursor-pointer">
                        I consent to receiving email updates from the Global Health Access Trust 
                        and understand I can unsubscribe at any time.
                      </Label>
                    </div>

                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Double Opt-In:</strong> You will receive a confirmation email 
                        to verify your subscription.
                      </AlertDescription>
                    </Alert>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={!newsletterForm.consent}
                  >
                    Subscribe to Updates
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-4">Ready to Engage?</h2>
          <p className="text-[15px] mb-8 opacity-90 max-w-3xl leading-[1.7]">
            Whether you represent an institution, a professional body, or wish to explore 
            a structured funding relationship, we welcome your enquiry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary">Submit an Enquiry</Button>
            </Link>
            <Link to="/about-the-trust">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More About the Trust
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};
