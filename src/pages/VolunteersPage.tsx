import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Loader2 } from "lucide-react";
import educationTrainingHero from "@/assets/education-training-hero.jpg";

const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Project-based"] as const;
const AREA_OPTIONS = ["Field Work", "Operations", "Medical", "Research", "Fundraising", "Other"] as const;

export const VolunteersPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [gdprConsent, setGdprConsent] = useState(false);

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
    notes: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Invalid file type", description: "Please upload a PDF or Word document", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload a file smaller than 5MB", variant: "destructive" });
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast({ title: "Consent required", description: "Please agree to GDPR and data processing to continue.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      let cvUrl = null;
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('volunteer-cvs').upload(filePath, cvFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('volunteer-cvs').getPublicUrl(filePath);
        cvUrl = publicUrl;
      }

      const { error } = await supabase.from("volunteers").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        country: formData.country,
        skills: formData.skills,
        experience: formData.experience,
        languages: formData.languages,
        availability: formData.availability || "Part-time",
        area_of_interest: formData.area_of_interest || "Other",
        motivation: formData.motivation || null,
        notes: formData.notes || null,
        cv_url: cvUrl,
        status: 'pending',
      } as any);

      if (error) throw error;
      toast({ title: "Application submitted successfully!", description: "Thank you for applying. We'll review your application and be in touch soon." });
      setFormData({ name: "", email: "", phone: "", country: "", skills: "", experience: "", languages: "", availability: "", area_of_interest: "", motivation: "", notes: "" });
      setCvFile(null);
      setGdprConsent(false);
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({ title: "Submission failed", description: error.message || "There was an error submitting your application. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Become a Volunteer - Global Health Access Trust" description="Join a global community of skilled professionals supporting high-impact health interventions." canonical="/volunteer-apply" />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(5, 21, 47, 0.7), rgba(5, 21, 47, 0.7)), url(${educationTrainingHero})` }}>
          <div className="container max-w-4xl text-center px-4 sm:px-6 py-12 sm:py-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">Join Us in Delivering Health With Heart</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">Be part of a global community of skilled professionals supporting high-impact health interventions commissioned by our donors.</p>
          </div>
        </section>

        {/* Why Volunteer */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="container max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Why Volunteer With GHAT</h2>
            <p className="text-base sm:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 sm:mb-16">Join a purpose-driven organization where your skills make a real difference.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { title: "Meaningful Impact", desc: "Work on targeted, high-integrity projects with measurable outcomes that change lives." },
                { title: "Flexible Roles", desc: "Field work, logistics, training, admin support, or remote assistance — find your fit." },
                { title: "Full Support", desc: "Guided by our admin team and AI assistant every step of the way." },
              ].map((item) => (
                <Card key={item.title} className="text-center shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container max-w-3xl px-4 sm:px-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="font-serif text-2xl sm:text-3xl">Volunteer Application</CardTitle>
                <CardDescription className="text-sm sm:text-base">Complete the form below to join our community of dedicated professionals.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
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
                      <Select value={formData.availability} onValueChange={(val) => setFormData({ ...formData, availability: val })} required>
                        <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                        <SelectContent>
                          {AVAILABILITY_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Area of Interest *</Label>
                      <Select value={formData.area_of_interest} onValueChange={(val) => setFormData({ ...formData, area_of_interest: val })} required>
                        <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                        <SelectContent>
                          {AREA_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills / Profession *</Label>
                    <Input id="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder="e.g., Registered Nurse, Project Manager" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience *</Label>
                    <Textarea id="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} rows={4} required placeholder="Describe your relevant experience…" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages *</Label>
                    <Input id="languages" value={formData.languages} onChange={(e) => setFormData({ ...formData, languages: e.target.value })} placeholder="e.g., English (Native), French (Fluent)" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivation Statement</Label>
                    <Textarea id="motivation" value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} rows={3} placeholder="Why do you want to volunteer with GHAT?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-upload">Upload CV (PDF or Word) *</Label>
                    <Input id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="cursor-pointer" />
                    {cvFile && <p className="text-sm text-green-600">{cvFile.name}</p>}
                    <p className="text-sm text-muted-foreground">Max 5MB · PDF, DOC, DOCX</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} />
                  </div>

                  <div className="flex items-start space-x-2 py-4">
                    <Checkbox id="gdpr" checked={gdprConsent} onCheckedChange={(checked) => setGdprConsent(checked as boolean)} required />
                    <label htmlFor="gdpr" className="text-sm leading-relaxed cursor-pointer">
                      I agree to GDPR and data processing. I understand that my personal information will be stored securely and used only for volunteer coordination purposes. *
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={isSubmitting}>
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting Application...</>) : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};
