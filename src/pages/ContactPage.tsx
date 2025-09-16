import { useState } from "react";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
    honeypot: "" // Anti-spam field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-spam check
    if (formData.honeypot) {
      console.log("Spam detected");
      return;
    }

    if (!formData.consent) {
      alert("Please provide consent to process your enquiry.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would send to operations@globalhealthaccesstrust.org
    console.log("Form submission:", {
      ...formData,
      timestamp: new Date().toISOString(),
      honeypot: undefined
    });
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consent: checked
    }));
  };

  if (isSubmitted) {
    return (
      <div className="py-16">
        <div className="container-section">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold mb-4">Message Sent Successfully</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for contacting the Global Health Access Trust. We have received 
              your enquiry and will respond within 2-3 business days.
            </p>
            <Button onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                consent: false,
                honeypot: ""
              });
            }}>
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We welcome confidential enquiries from donors, legal representatives, 
              philanthropic institutions, and regulated professionals.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  For all matters relating to the Trust's charitable activities, partnership 
                  opportunities, or general enquiries, please use the contact form or reach 
                  out directly using the information below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="w-5 h-5 text-primary mr-3" />
                      <h3 className="font-semibold">Email</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">General Enquiries:</p>
                        <a 
                          href="mailto:operations@globalhealthaccesstrust.org"
                          className="text-primary hover:underline"
                        >
                          operations@globalhealthaccesstrust.org
                        </a>
                      </div>
                      <div>
                        <p className="font-medium">Legacy & Legal:</p>
                        <a 
                          href="mailto:operations@globalhealthaccesstrust.org?subject=Legacy – Confidential"
                          className="text-primary hover:underline"
                        >
                          Chair of Trustees (Legacy – Confidential)
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-5 h-5 text-primary mr-3" />
                      <h3 className="font-semibold">Address</h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Global Health Access Trust</p>
                      <p>2 Harley Street</p>
                      <p>London, England</p>
                      <p>United Kingdom</p>
                      <p className="mt-2 text-xs">
                        For official correspondence, legal service, and charity documentation.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="w-5 h-5 text-primary mr-3" />
                      <h3 className="font-semibold">Response Time</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all enquiries within 2-3 business days. 
                      For urgent matters, please indicate this in your subject line.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Anti-spam honeypot field (hidden) */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., General Enquiry, Partnership Opportunity, Legacy Giving"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full"
                        placeholder="Please provide details of your enquiry..."
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={handleConsentChange}
                          className="mt-1"
                        />
                        <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                          I consent to the Global Health Access Trust processing my personal 
                          information to respond to this enquiry in accordance with the Trust's 
                          Privacy Policy. *
                        </Label>
                      </div>

                      <Alert>
                        <AlertDescription className="text-sm">
                          <strong>Data Protection:</strong> Your information will be processed 
                          in accordance with UK GDPR and stored securely. We will only use your 
                          details to respond to your enquiry and will not share them with third parties 
                          without your explicit consent.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting || !formData.consent}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};