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
import { SEO } from "@/components/SEO";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

const enquiryOptions = [
  "General Enquiry",
  "Partnership Opportunity",
  "Funding Engagement",
  "Legal / Legacy Matters",
  "Media / Press",
  "Other",
] as const;

const emptyForm = {
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
};

export const ContactPage = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.consent) {
      toast.error("Please provide consent to process your enquiry.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: formData,
      });

      if (error || !data?.success) {
        throw new Error(data?.message || error?.message || "Submission failed");
      }

      setReference(typeof data.reference === "string" ? data.reference : null);
      setIsSubmitted(true);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Secure contact submission failed", error);
      toast.error("The enquiry could not be submitted. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEO title="Enquiry Received" description="Confirmation that a secure enquiry was submitted to Global Health Access Trust." canonical="/contact" />
        <div className="py-16">
          <div className="container-section">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-serif font-bold mb-4">Enquiry Received</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Your enquiry has been recorded and will be reviewed according to its nature and priority.
              </p>
              {reference && <p className="text-sm text-muted-foreground mb-8">Reference: {reference}</p>}
              <Button onClick={() => { setIsSubmitted(false); setReference(null); }}>
                Submit Another Enquiry
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Secure Contact Form"
        description="Submit a secure enquiry to Global Health Access Trust."
        canonical="/contact"
      />
      <div className="flex flex-col">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="container-section">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">Secure Contact Form</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Submit an initial enquiry for review by an appropriately authorised person.
              </p>
            </div>
          </div>
        </section>

        <div className="py-16">
          <div className="container-section">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <aside className="lg:col-span-1 space-y-8">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Before submitting</h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Provide only the information necessary for the initial enquiry.</li>
                      <li>Do not send bank details, identity documents, medical records or safeguarding evidence through this first-stage form.</li>
                      <li>Supporting documents are requested through a controlled route after review.</li>
                      <li>No guaranteed response time is published.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Correspondence address</h2>
                    <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                      {LEGAL_ENTITY.correspondenceAddress.lines.map((line) => <span key={line} className="block">{line}</span>)}
                    </address>
                    <p className="mt-3 text-xs text-muted-foreground">Correspondence address only; not a registered office.</p>
                  </CardContent>
                </Card>
              </aside>

              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-serif font-bold mb-8">Submit an Enquiry</h2>

                    <form onSubmit={handleSubmit} className="space-y-9">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleInputChange}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <fieldset className="space-y-5">
                        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full name *</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required maxLength={200} autoComplete="name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email address *</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required maxLength={320} autoComplete="email" />
                          </div>
                        </div>
                        <div className="space-y-2 max-w-sm">
                          <Label htmlFor="phone">Contact number</Label>
                          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} maxLength={40} autoComplete="tel" />
                        </div>
                      </fieldset>

                      <fieldset className="space-y-5">
                        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Professional context</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="organisation">Organisation</Label>
                            <Input id="organisation" name="organisation" value={formData.organisation} onChange={handleInputChange} maxLength={200} autoComplete="organization" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="position">Position or role</Label>
                            <Input id="position" name="position" value={formData.position} onChange={handleInputChange} maxLength={150} autoComplete="organization-title" />
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className="space-y-5">
                        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Enquiry classification</legend>
                        <div className="space-y-2 max-w-sm">
                          <Label>Nature of enquiry *</Label>
                          <Select value={formData.nature_of_enquiry} onValueChange={(value) => setFormData((previous) => ({ ...previous, nature_of_enquiry: value }))} required>
                            <SelectTrigger><SelectValue placeholder="Select enquiry type" /></SelectTrigger>
                            <SelectContent>
                              {enquiryOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </fieldset>

                      <fieldset className="space-y-5">
                        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your message</legend>
                        <div className="space-y-2">
                          <Label htmlFor="message">Summary of enquiry *</Label>
                          <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} maxLength={5000} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="additional_context">Additional context</Label>
                          <Textarea id="additional_context" name="additional_context" value={formData.additional_context} onChange={handleInputChange} rows={4} maxLength={5000} />
                        </div>
                      </fieldset>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                          <Checkbox
                            id="consent"
                            checked={formData.consent}
                            onCheckedChange={(checked) => setFormData((previous) => ({ ...previous, consent: checked === true }))}
                            className="mt-1"
                          />
                          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer flex-1">
                            I consent to Global Health Access Trust processing my information to review and respond to this enquiry in accordance with the Privacy Notice. *
                          </Label>
                        </div>
                        <Alert>
                          <AlertDescription className="text-sm">
                            The form is protected by server-side validation and submission limits. Information is handled in accordance with the Trust's Privacy Notice and applicable law.
                          </AlertDescription>
                        </Alert>
                      </div>

                      <Button type="submit" size="lg" disabled={isSubmitting || !formData.consent || !formData.nature_of_enquiry} className="w-full md:w-auto">
                        {isSubmitting ? "Submitting…" : "Submit Enquiry"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
