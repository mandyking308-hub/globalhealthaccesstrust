import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import educationTrainingHero from "@/assets/education-training-hero.jpg";

const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Project-based"] as const;
const AREA_OPTIONS = ["Field Work", "Operations", "Medical", "Research", "Fundraising", "Other"] as const;

const ACCURACY_VERSION = "team-accuracy-1.0";
const PRIVACY_VERSION = "team-privacy-ack-1.0";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_MIME.includes(file.type)) {
      toast({ title: "Invalid file type", description: "PDF or Word only", variant: "destructive" });
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      toast({ title: "File too large", description: "Max 5MB", variant: "destructive" });
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accuracy || !privacyAck) {
      toast({
        title: "Declarations required",
        description: "Both declarations must be confirmed.",
        variant: "destructive",
      });
      return;
    }
    if (!cvFile) {
      toast({ title: "CV required", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload to PRIVATE bucket. No public URL is created.
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user.id;
      // Scope path to uid when signed in, otherwise to a random anon prefix
      const prefix = uid ? `authenticated/${uid}` : `anonymous/${crypto.randomUUID()}`;
      const ext = cvFile.name.split(".").pop() || "bin";
      const objectPath = `${prefix}/${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("project-team-applications")
        .upload(objectPath, cvFile, { contentType: cvFile.type, upsert: false });
      if (uploadErr) throw uploadErr;

      const { error: rpcErr } = await supabase.rpc("submit_volunteer_application", {
        _name: formData.name,
        _email: formData.email,
        _phone: formData.phone || null,
        _country: formData.country,
        _role_of_interest: formData.role_of_interest || formData.area_of_interest,
        _area_of_interest: formData.area_of_interest || "Other",
        _availability: formData.availability || "Part-time",
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
      if (rpcErr) throw rpcErr;

      setSubmitted(true);
      toast({
        title: "Application received",
        description: "Thank you. The Trust will review and be in touch.",
      });
    } catch (error: any) {
      console.error("volunteer application error", error);
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
    <>
      <SEO
        title="Project Team Application — Global Health Access Trust"
        description="Apply to join a project delivery team supporting commissioned health interventions."
        canonical="/volunteer-apply"
      />
      <div className="min-h-screen bg-background">
        <section
          className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 21, 47, 0.7), rgba(5, 21, 47, 0.7)), url(${educationTrainingHero})`,
          }}
        >
          <div className="container max-w-4xl text-center px-4 sm:px-6 py-12 sm:py-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Project Team Application
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Skilled professionals supporting commissioned health interventions.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container max-w-3xl px-4 sm:px-6">
            {submitted ? (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Application received</CardTitle>
                  <CardDescription>
                    Thank you. Your details and CV are held securely. A member of the Trust will contact you.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl sm:text-3xl">Application form</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Your CV is uploaded to secure private storage. Only authorised Trust administrators can retrieve it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+44 …" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Availability *</Label>
                        <Select value={formData.availability} onValueChange={(v) => setFormData({ ...formData, availability: v })} required>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {AVAILABILITY_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Area of interest *</Label>
                        <Select value={formData.area_of_interest} onValueChange={(v) => setFormData({ ...formData, area_of_interest: v })} required>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {AREA_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role_of_interest">Role of interest</Label>
                      <Input id="role_of_interest" value={formData.role_of_interest} onChange={(e) => setFormData({ ...formData, role_of_interest: e.target.value })} placeholder="e.g., Field Coordinator" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills / profession *</Label>
                      <Input id="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Relevant experience *</Label>
                      <Textarea id="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} rows={4} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages *</Label>
                      <Input id="languages" value={formData.languages} onChange={(e) => setFormData({ ...formData, languages: e.target.value })} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Motivation</Label>
                      <Textarea id="motivation" value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cv-upload">CV (PDF or Word, max 5MB) *</Label>
                      <Input id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="cursor-pointer" />
                      {cvFile && <p className="text-sm text-green-700">{cvFile.name}</p>}
                      <p className="text-xs text-muted-foreground">
                        Held in private storage. No public link is created. Retrieved by administrators only, with an auditable signed URL.
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <div className="flex items-start gap-3">
                        <Checkbox id="accuracy" checked={accuracy} onCheckedChange={(v) => setAccuracy(v as boolean)} />
                        <label htmlFor="accuracy" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Accuracy declaration.</strong> I confirm that the information supplied — including my CV — is
                          true and accurate to the best of my knowledge. I understand that inaccurate information may result in
                          the application being declined or, if I am appointed, my engagement being ended. *
                        </label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox id="privacyAck" checked={privacyAck} onCheckedChange={(v) => setPrivacyAck(v as boolean)} />
                        <label htmlFor="privacyAck" className="text-sm leading-relaxed cursor-pointer">
                          <strong>Privacy acknowledgement.</strong> I acknowledge that I have read the{" "}
                          <a href="/privacy-policy" className="underline" target="_blank" rel="noreferrer">Privacy Notice</a>{" "}
                          and understand that my application, CV and correspondence will be processed by
                          Global Health Access Trust for the purpose of assessing and, where relevant, coordinating my
                          engagement on a project delivery team. *
                        </label>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={isSubmitting}>
                      {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</>) : "Submit application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
