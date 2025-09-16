import { useState } from "react";
import { Heart, Users, Mail, FileText, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    
    // Simulate submission
    console.log("Newsletter subscription:", newsletterForm);
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setNewsletterForm({ name: "", email: "", consent: false });
    }, 3000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-gold/10">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Get Involved
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Join our mission to uphold healthcare as a matter of justice. Whether through 
              donation, partnership, or advocacy, your involvement creates lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ways to Support Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From financial support to professional partnerships, there are many meaningful 
              ways to contribute to healthcare justice worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Donate */}
            <Card className="card-elevated group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <Heart className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Support our charitable programmes through one-time or monthly donations. 
                  UK taxpayers can add Gift Aid to increase impact.
                </p>
                <Link to="/donate">
                  <Button size="lg" className="w-full">
                    Donate Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Partner */}
            <Card className="card-elevated group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Become a Partner</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Professional partnerships with healthcare institutions, academic bodies, 
                  and development organisations to advance our shared mission.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full">
                    Partner With Us
                    <Users className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stay Informed */}
            <Card className="card-elevated group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Stay Informed</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Subscribe to our newsletter for updates on programmes, research, 
                  and opportunities to get involved in healthcare justice.
                </p>
                <Button variant="outline" size="lg" className="w-full" onClick={() => {
                  document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Subscribe
                  <Mail className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Partnerships */}
      <section className="py-16 bg-muted/30">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              Professional Partnerships
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-professional">
                <CardContent className="p-8">
                  <FileText className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Healthcare Institutions</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We welcome partnerships with hospitals, clinics, medical schools, and 
                    healthcare systems committed to principled, sustainable care delivery.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clinical programme development</li>
                    <li>• Professional training initiatives</li>
                    <li>• Research collaboration opportunities</li>
                    <li>• Quality improvement programmes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-professional">
                <CardContent className="p-8">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Academic & Research</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Academic partnerships advance evidence-based policy and practice 
                    through rigorous research and scholarship.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Policy research initiatives</li>
                    <li>• Academic exchange programmes</li>
                    <li>• Publication and dissemination</li>
                    <li>• Capacity building support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter-section" className="py-16">
        <div className="container-section">
          <div className="max-w-2xl mx-auto">
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-serif font-bold mb-2">Stay Informed</h2>
                  <p className="text-muted-foreground">
                    Subscribe to receive updates on our programmes, research findings, 
                    and opportunities to support healthcare justice.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Subscription Confirmed</h3>
                    <p className="text-muted-foreground">
                      Thank you for subscribing. You'll receive a confirmation email shortly 
                      with instructions to complete your subscription.
                    </p>
                  </div>
                ) : (
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
                          and understand I can unsubscribe at any time. Your information will be 
                          processed in accordance with our Privacy Policy.
                        </Label>
                      </div>

                      <Alert>
                        <AlertDescription className="text-sm">
                          <strong>Double Opt-In:</strong> You will receive a confirmation email 
                          to verify your subscription. We respect your privacy and will never 
                          share your information with third parties.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={!newsletterForm.consent}
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Subscribe to Updates
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-section text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Whether you're an individual donor, healthcare professional, or institutional 
            partner, we welcome you to join our mission of healthcare justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More About GHAT
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};