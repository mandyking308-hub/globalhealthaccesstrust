import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import educationTrainingHero from "@/assets/education-training-hero.jpg";

const AVAILABILITY_OPTIONS = [
  "Occasional or advisory",
  "Short-term project",
  "Part-time",
  "Full-time",
  "Remote contribution",
  "In-country or field contribution",
] as const;

const AREA_OPTIONS = [
  "Healthcare Access and Health Systems",
  "Infrastructure, Housing and Facilities",
  "Food Systems, Agriculture and Nutrition",
  "Water, Sanitation and Essential Utilities",
  "Education, Training and Workforce Capability",
  "Responsible AI, Technology and Data",
  "Research, Policy, Legal and Systems Reform",
  "Logistics, Procurement and Supply Systems",
  "Humanitarian and Emergency Response",
  "Community Protection and Safeguarding",
  "Finance, Governance and Administration",
  "Communications, Partnerships and Fundraising",
  "Multi-disciplinary or Other",
] as const;

const ACCURACY_VERSION = "team-accuracy-1.1";
const PRIVACY_VERSION = "team-privacy-ack-1.1";
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const VolunteersPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [accuracy, setAccuracy] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    skills: "",
    experience: "",
    languages: "",
    availability: "",
    area_of_interest: "",
    motivation: "",
    role_of_interest: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_MIME.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please provide a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!accuracy || !privacyAck) {
      toast({
        title: "Declarations required",
        description: "Please confirm both declarations before submitting.",
        variant: "destructive",
      });
      return;
    }
    if (!cvFile) {
      toast({ title: "Experience profile required", description: "Please attach a CV or brief professional and experience profile.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      const prefix = userId ? `authenticated/${userId}` : `anonymous/${crypto.randomUUID()}`;
      const extension = cvFile.name.split(".").pop() || "bin";
      const objectPath = `${prefix}/${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("project-team-applications")
        .upload(objectPath, cvFile, { contentType: cvFile.type, upsert: false });
      if (uploadError) throw uploadError;

      const { error: rpcError } = await supabase.rpc("submit_volunteer_application", {
        _name: formData.name,
        _email: formData.email,
        _phone: formData.phone || null,
        _country: formData.country,
        _role_of_interest: formData.role_of_interest,
        _area_of_interest: formData.area_of_interest,
        _availability: formData.availability,
        _skills: formData.skills,
        _experience: formData.experience,
        _languages: formData.languages,
        _motivation: formData.motivation || null,
        _cv_object_path: objectPath,
        _cv_original_filename: cvFile.name,
        _cv_mime_type: cvFile.type,
        _cv_size_bytes: cvFile.size,
        _accuracy_version: ACCURACY_VERSION,
        _privacy_version: PRIVACY_VERSION,
      });
      if (rpcError) throw rpcError;

      setSubmitted(true);
      toast({
        title: "Application received",
        description: "Thank you. The Trust will review the application against identified project needs.",
      });
    } catch (error: any) {
      console.error("project team application error", error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Project Team & Contributor Application"
        description="Register interest in contributing professional, technical, practical or local capability to approved public-benefit projects coordinated by the Global Health Access Trust."
        canonical="/volunteer-apply"
      />
      <Header />

      <main className="flex-grow">
        <section
          className="relative min-h-[42vh] sm:min-h-[52vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 21, 47, 0.72), rgba(5, 21, 47, 0.72)), url(${educationTrainingHero})`,
          }}
        >
          <div className="container max-w-4xl text-center px-4 sm:px-6 py-14 sm:py-18">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Register an Interest
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Project Team &amp; Contributor Application
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Contribute professional, technical, practical or local capability to properly structured public-benefit work.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-border/60">
          <div className="container max-w-5xl px-4 sm:px-6">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-start">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Who This Route Is For</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Trust brings together clinicians, researchers, technologists, educators, engineers,
                  operational specialists, community contributors and other experienced people according to
                  the needs of each approved or developing project.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Contributions may be voluntary, pro bono, advisory, project-based, contracted or employed
                  where a role has been separately approved and offered. Registering an interest does not
                  create an appointment, assignment or entitlement to paid work.
                </p>
              </div>
              <div className="border border-border bg-muted/20 p-6">
                <h3 className="font-semibold mb-3">Looking to offer time without making a formal team application?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Use the contribution-pledge route where you wish to offer time, expertise or practical help
                  for the Trust to consider before a formal project-team process is appropriate.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline"><Link to="/donate#pledge-form">Pledge Time or Expertise</Link></Button>
                  <Button asChild variant="outline"><Link to="/project-team-login">Existing Team Login</Link></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-muted/20 border-b border-border/60">
          <div className="container max-w-5xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8 text-center">How Applications Are Considered</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-background border border-border p-6">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-primary">01 — Review</span>
                <h3 className="font-serif text-xl font-bold mt-3 mb-2">Capability and Project Need</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Trust reviews your experience, proposed contribution, availability, location and the needs of current or developing projects.
                </p>
              </div>
              <div className="bg-background border border-border p-6">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-primary">02 — Verification</span>
                <h3 className="font-serif text-xl font-bold mt-3 mb-2">Suitability and Safeguards</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Checks may include identity, qualifications, professional registration, references, conflicts, sanctions, safeguarding and any role-specific requirements.
                </p>
              </div>
              <div className="bg-background border border-border p-6">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-primary">03 — Agreement</span>
                <h3 className="font-serif text-xl font-bold mt-3 mb-2">Defined Responsibilities</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Where there is a suitable role, the scope, responsibilities, supervision, confidentiality, reporting and engagement terms are agreed before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container max-w-3xl px-4 sm:px-6">
            {submitted ? (
              <Card className="shadow-medium rounded-none">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Application received</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    Thank you. Your details and experience profile are held securely. This records an
                    expression of interest and does not create an appointment or project assignment. Where
                    your capability matches an identified need, the Trust may contact you to discuss
                    verification and the next steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild><Link to="/our-work">Explore Our Work</Link></Button>
                    <Button asChild variant="outline"><Link to="/get-involved">Return to Get Involved</Link></Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-medium rounded-none">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl sm:text-3xl">Register Your Interest</CardTitle>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    Provide enough information for the Trust to understand your capability and the kind of
                    contribution you may be able to make. Your CV or brief professional and experience
                    profile is uploaded to secure private storage and is available only to authorised Trust
                    administrators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name *</Label>
                      <Input id="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telephone</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="+44 …" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country and current location *</Label>
                      <Input id="country" value={formData.country} onChange={(event) => setFormData({ ...formData, country: event.target.value })} placeholder="Country, city or region" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Preferred availability *</Label>
                        <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })} required>
                          <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                          <SelectContent>
                            {AVAILABILITY_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Primary area of contribution *</Label>
                        <Select value={formData.area_of_interest} onValueChange={(value) => setFormData({ ...formData, area_of_interest: value })} required>
                          <SelectTrigger><SelectValue placeholder="Select the closest area" /></SelectTrigger>
                          <SelectContent>
                            {AREA_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role_of_interest">Role or contribution of interest *</Label>
                      <Input
                        id="role_of_interest"
                        value={formData.role_of_interest}
                        onChange={(event) => setFormData({ ...formData, role_of_interest: event.target.value })}
                        placeholder="For example: clinical adviser, AI specialist, project coordinator, engineer, researcher or community contributor"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills, profession or practical capability *</Label>
                      <Textarea
                        id="skills"
                        value={formData.skills}
                        onChange={(event) => setFormData({ ...formData, skills: event.target.value })}
                        rows={3}
                        placeholder="Summarise your principal skills, qualifications, professional standing or practical capability."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Relevant experience *</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(event) => setFormData({ ...formData, experience: event.target.value })}
                        rows={5}
                        placeholder="Describe experience relevant to public-benefit projects, professional practice, operations, delivery, communities or the selected area."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages and relevant local knowledge *</Label>
                      <Input
                        id="languages"
                        value={formData.languages}
                        onChange={(event) => setFormData({ ...formData, languages: event.target.value })}
                        placeholder="Languages spoken and any relevant country, community or regional knowledge"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">How you would like to contribute</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(event) => setFormData({ ...formData, motivation: event.target.value })}
                        rows={4}
                        placeholder="Explain the contribution you hope to make, any project or geographical preference, and practical limits or requirements."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cv-upload">CV or professional and experience profile (PDF or Word, max 5MB) *</Label>
                      <Input id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="cursor-pointer" />
                      {cvFile && <p className="text-sm text-green-700">Selected: {cvFile.name}</p>}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        This may be a conventional CV or a short document setting out your professional,
                        technical, practical or community experience. It is held in private storage; no
                        public link is created.
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <div className="flex items-start gap-3">
                        <Checkbox id="accuracy" checked={accuracy} onCheckedChange={(value) => setAccuracy(value === true)} />
                        <label htmlFor="accuracy" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Accuracy declaration.</strong> I confirm that the information supplied,
                          including the attached profile, is true and accurate to the best of my knowledge. I
                          understand that material inaccuracies may result in the application being declined
                          or an engagement being ended. *
                        </label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox id="privacyAck" checked={privacyAck} onCheckedChange={(value) => setPrivacyAck(value === true)} />
                        <label htmlFor="privacyAck" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Privacy acknowledgement.</strong> I acknowledge that I have read the{" "}
                          <a href="/legal/privacy-notice" className="underline" target="_blank" rel="noreferrer">Privacy Notice</a>{" "}
                          and understand that my application, attached profile and correspondence will be
                          processed to assess my suitability for professional, practical, advisory, voluntary
                          or other project contribution. *
                        </label>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Where a suitable role is identified, the Trust may request evidence of identity,
                      qualifications, professional registration, references, safeguarding information,
                      conflicts, insurance, right to work or travel, and other role-specific information
                      through an appropriate secure process.
                    </p>

                    <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</> : "Submit Project Team Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
