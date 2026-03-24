import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Partnership Opportunity",
  "Donation / Funding",
  "Legal / Legacy Matters",
  "Media / Press",
  "Other",
] as const;

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    position: "",
    nature_of_enquiry: "",
    message: "",
    additional_context: "",
    consent: false,
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!formData.consent) {
      toast.error("Please provide consent to process your enquiry.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("inbound_contacts").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        organisation: formData.organisation.trim() || null,
        position: formData.position.trim() || null,
        nature_of_enquiry: formData.nature_of_enquiry,
        message: formData.message.trim(),
        additional_context: formData.additional_context.trim() || null,
        gdpr_consent: formData.consent,
        status: "New",
      });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("There was a problem submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="py-16">
        <div className="container-section">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-serif font-bold mb-4 text-left md:text-center">
              Enquiry Received
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your enquiry has been received. A member of the team will respond in due course.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "", email: "", phone: "", organisation: "", position: "",
                  nature_of_enquiry: "", message: "", additional_context: "",
                  consent: false, honeypot: "",
                });
              }}
            >
              Submit Another Enquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-left">
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
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-left">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  For all matters relating to the Trust's charitable activities, partnership
                  opportunities, or general enquiries, please use the contact form.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-left">Enquiry Types</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>General enquiries</li>
                      <li>Partnership opportunities</li>
                      <li>Donation &amp; funding</li>
                      <li>Legacy and legal matters</li>
                      <li>Media &amp; press</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-left">Address</h3>
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
                    <h3 className="font-semibold mb-4 text-left">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all enquiries within 2–3 business days.
                      For urgent matters, please indicate this in your message.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-8 text-left">
                    Submit an Enquiry
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Honeypot */}
                    <input
                      type="text" name="honeypot" value={formData.honeypot}
                      onChange={handleInputChange}
                      style={{ display: "none" }} tabIndex={-1} autoComplete="off"
                    />

                    {/* Section 1 — Contact Details */}
                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Contact Details
                      </legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" name="name" value={formData.name}
                            onChange={handleInputChange} required maxLength={100} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" value={formData.email}
                            onChange={handleInputChange} required maxLength={255} />
                        </div>
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <Label htmlFor="phone">Direct Contact Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone}
                          onChange={handleInputChange} placeholder="+44 …" maxLength={30} />
                      </div>
                    </fieldset>

                    {/* Section 2 — Professional Context */}
                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Professional Context
                      </legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="organisation">Organisation</Label>
                          <Input id="organisation" name="organisation" value={formData.organisation}
                            onChange={handleInputChange} maxLength={150} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position / Role</Label>
                          <Input id="position" name="position" value={formData.position}
                            onChange={handleInputChange} maxLength={100} />
                        </div>
                      </div>
                    </fieldset>

                    {/* Section 3 — Enquiry Classification */}
                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Enquiry Classification
                      </legend>
                      <div className="space-y-2 max-w-sm">
                        <Label>Nature of Enquiry *</Label>
                        <Select
                          value={formData.nature_of_enquiry}
                          onValueChange={(val) =>
                            setFormData((prev) => ({ ...prev, nature_of_enquiry: val }))
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select enquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ENQUIRY_OPTIONS.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </fieldset>

                    {/* Section 4 — Message */}
                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Your Message
                      </legend>
                      <div className="space-y-2">
                        <Label htmlFor="message">Summary of Enquiry *</Label>
                        <Textarea id="message" name="message" value={formData.message}
                          onChange={handleInputChange} required rows={5} maxLength={2000}
                          placeholder="Please provide a concise overview of your enquiry…" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additional_context">Additional Context</Label>
                        <Textarea id="additional_context" name="additional_context"
                          value={formData.additional_context} onChange={handleInputChange}
                          rows={4} maxLength={3000}
                          placeholder="Include any relevant background, timelines, or supporting details…" />
                      </div>
                    </fieldset>

                    {/* Consent */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                        <Checkbox
                          id="consent" checked={formData.consent}
                          onCheckedChange={(checked: boolean) =>
                            setFormData((prev) => ({ ...prev, consent: checked }))
                          }
                          className="mt-1"
                        />
                        <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer flex-1">
                          I consent to the Global Health Access Trust processing my personal
                          information to respond to this enquiry in accordance with the Trust's
                          Privacy Policy. <span className="text-destructive">*</span>
                        </Label>
                      </div>

                      <Alert>
                        <AlertDescription className="text-sm">
                          <strong>Data Protection:</strong> Your information will be processed
                          in accordance with UK GDPR and stored securely. We will only use your
                          details to respond to your enquiry and will not share them with third
                          parties without your explicit consent.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Button
                      type="submit" size="lg"
                      disabled={isSubmitting || !formData.consent || !formData.nature_of_enquiry}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
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
