import { useState } from "react";
import { Link } from "react-router-dom";
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

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Healthcare-Access or System Project Proposition",
  "Join a Project Team / Contribute Expertise",
  "Volunteer or Employment Enquiry",
  "Organisational or Institutional Partnership",
  "Donation or Active Project Support",
  "Major, Restricted or Institutional Funding",
  "Legal or Legacy Matter",
  "Media or Press",
  "Other",
] as const;

const initialForm = {
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
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.honeypot) return;
    if (!formData.consent) {
      toast.error("Please provide consent to process your enquiry.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organisation: formData.organisation.trim(),
          position: formData.position.trim(),
          nature_of_enquiry: formData.nature_of_enquiry,
          message: formData.message.trim(),
          additional_context: formData.additional_context.trim(),
          consent: formData.consent,
          honeypot: formData.honeypot,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.message || "The enquiry could not be submitted.");

      setReference(typeof data.reference === "string" ? data.reference : null);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Secure contact submission failed", error);
      toast.error("There was a problem submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setReference(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="py-16">
        <SEO
          title="Enquiry Received"
          description="Confirmation that an enquiry has been securely submitted to Global Health Access Trust."
          canonical="/contact"
        />
        <div className="container-section">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-serif font-bold mb-4 text-left md:text-center">Enquiry Received</h1>
            <p className="text-lg text-muted-foreground mb-3">
              Your enquiry has been received and will be reviewed and directed to the appropriate route.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Where a response is appropriate, the Trust will use the contact details you provided. Please retain the reference shown below.
            </p>
            {reference && (
              <p className="text-sm text-muted-foreground mb-8">
                Reference: <span className="font-mono">{reference}</span>
              </p>
            )}
            <Button onClick={resetForm}>Submit Another Enquiry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SEO
        title="Contact the Trust"
        description="Submit a secure enquiry to Global Health Access Trust concerning healthcare-access and system projects, professional contribution, partnerships, funding, legal matters or media enquiries."
        canonical="/contact"
      />

      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">Contact the Trust</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-5">
              Use this secure form for general enquiries, healthcare-access or system project propositions, professional contribution, organisational partnerships, funding discussions, legal or legacy matters and media enquiries.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The Trust enables better healthcare but is not a medical practice or clinical service. This form is not for diagnosis, treatment, prescribing, triage, personalised medical advice or emergencies.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-left">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Please provide only the information necessary for the Trust to understand and direct your enquiry.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This form may be used by individuals, communities, professionals, organisations, supporters and advisers.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Existing donors and project commissioners should normally use secure dashboard messaging for matters relating to an existing contribution or project.
                </p>
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  Do not submit symptoms, medical records, treatment requests or detailed patient-identifying health information.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-left">Enquiry Types</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                      <li>General enquiries</li>
                      <li>Healthcare-access or system project propositions</li>
                      <li>Project-team or professional contribution</li>
                      <li>Volunteering or employment enquiries</li>
                      <li>Organisational or institutional partnerships</li>
                      <li>Donation, active-project and funding discussions</li>
                      <li>Legacy, legal, media and press matters</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-left">Use a Dedicated Route</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Existing relationships and sensitive concerns should use the system designed for them.
                    </p>
                    <div className="space-y-2 text-sm">
                      <Link to="/donor-login" className="block font-medium text-primary hover:underline">Donor Portal</Link>
                      <Link to="/project-team-login" className="block font-medium text-primary hover:underline">Project Team Portal</Link>
                      <Link to="/safeguarding/report" className="block font-medium text-primary hover:underline">Safeguarding Report</Link>
                      <Link to="/complaints/new" className="block font-medium text-primary hover:underline">Submit a Complaint</Link>
                      <Link to="/protected-concerns/new" className="block font-medium text-primary hover:underline">Report a Protected Concern</Link>
                    </div>
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
                      <p className="mt-2 text-xs">Correspondence address for official, legal and institutional communications.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-left">Review and Routing</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Enquiries are reviewed and directed according to their nature, urgency and the appropriate governance, project or professional route.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Response times vary according to complexity and available capacity. The form is not an emergency or clinical service.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Urgent safeguarding matters and protected concerns must use the dedicated confidential reporting route.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-3 text-left">Submit an Enquiry</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    Complete the fields below as accurately and concisely as possible. Submission does not constitute project approval, appointment, partnership, funding acceptance, professional engagement or a clinical relationship.
                  </p>

                  <Alert className="mb-8">
                    <AlertDescription className="text-sm">
                      <strong>Not a medical service:</strong> Do not use this form for symptoms, diagnosis, treatment, prescribing, triage, emergencies or the submission of medical records. Seek assistance from the appropriate local healthcare or emergency service.
                    </AlertDescription>
                  </Alert>

                  <form onSubmit={handleSubmit} className="space-y-10">
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
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contact Details</legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required maxLength={200} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required maxLength={320} />
                        </div>
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <Label htmlFor="phone">Direct Contact Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+44 …" maxLength={40} />
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Professional Context</legend>
                      <p className="text-sm text-muted-foreground">These fields are optional but help the Trust understand professional, organisational or institutional enquiries.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="organisation">Organisation</Label>
                          <Input id="organisation" name="organisation" value={formData.organisation} onChange={handleInputChange} maxLength={200} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position / Role</Label>
                          <Input id="position" name="position" value={formData.position} onChange={handleInputChange} maxLength={150} />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Enquiry Classification</legend>
                      <p className="text-sm text-muted-foreground">Select the category that most closely reflects your enquiry. Safeguarding, complaints and protected concerns should use the dedicated routes rather than this form.</p>
                      <div className="space-y-2 max-w-sm">
                        <Label>Nature of Enquiry *</Label>
                        <Select
                          value={formData.nature_of_enquiry}
                          onValueChange={(value) => setFormData((previous) => ({ ...previous, nature_of_enquiry: value }))}
                          required
                        >
                          <SelectTrigger><SelectValue placeholder="Select enquiry type" /></SelectTrigger>
                          <SelectContent>
                            {ENQUIRY_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5">
                      <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Your Message</legend>
                      <div className="space-y-2">
                        <Label htmlFor="message">Summary of Enquiry *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          maxLength={5000}
                          placeholder="Explain the purpose of your enquiry, the access or system need involved and the outcome you are seeking…"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additional_context">Additional Context</Label>
                        <Textarea
                          id="additional_context"
                          name="additional_context"
                          value={formData.additional_context}
                          onChange={handleInputChange}
                          rows={4}
                          maxLength={5000}
                          placeholder="Include relevant location, organisation, expertise, proposed contribution, urgency, safeguarding or delivery information…"
                        />
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
                          I consent to the Global Health Access Trust processing my personal information to review and respond to this enquiry in accordance with the Trust's Privacy Policy. <span className="text-destructive">*</span>
                        </Label>
                      </div>
                      <Alert>
                        <AlertDescription className="text-sm">
                          <strong>Data Protection:</strong> Your information will be processed in accordance with the Trust's Privacy Policy and applicable data-protection requirements. It will be accessed or shared only where reasonably necessary to review and respond to the enquiry, operate authorised systems, comply with law or protect people from harm.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
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