import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Heart, Users, Briefcase, Loader2, Upload, CheckCircle } from "lucide-react";
import educationTrainingHero from "@/assets/education-training-hero.jpg";

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
    notes: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consent required",
        description: "Please agree to GDPR and data processing to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let cvUrl = null;

      // Upload CV if provided
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('volunteer-cvs')
          .upload(filePath, cvFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('volunteer-cvs')
          .getPublicUrl(filePath);

        cvUrl = publicUrl;
      }

      // Create volunteer record
      const { error } = await supabase
        .from("volunteers")
        .insert({
          ...formData,
          cv_url: cvUrl,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Application submitted successfully!",
        description: "Thank you for applying. We'll review your application and be in touch soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        skills: "",
        experience: "",
        languages: "",
        notes: ""
      });
      setCvFile(null);
      setGdprConsent(false);
      
      // Reset file input
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Become a Volunteer - Global Health Access Trust"
        description="Join a global community of skilled professionals supporting high-impact health interventions commissioned by our donors."
        canonical="/volunteers"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section 
          className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(5, 21, 47, 0.7), rgba(5, 21, 47, 0.7)), url(${educationTrainingHero})` }}
        >
          <div className="container max-w-4xl text-center px-6 py-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Us in Delivering Health With Heart
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Be part of a global community of skilled professionals supporting high-impact health interventions commissioned by our donors.
            </p>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
              Why Volunteer With GHAT
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              Join a purpose-driven organization where your skills make a real difference.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Meaningful Impact</h3>
                  <p className="text-muted-foreground">
                    Work on targeted, high-integrity projects with measurable outcomes that change lives.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Flexible Roles</h3>
                  <p className="text-muted-foreground">
                    Field work, logistics, training, admin support, or remote assistance — find your fit.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">Full Support</h3>
                  <p className="text-muted-foreground">
                    Guided by our admin team and AI assistant every step of the way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-20">
          <div className="container max-w-3xl px-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Volunteer Application</CardTitle>
                <CardDescription className="text-base">
                  Complete the form below to join our community of dedicated professionals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.smith@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 20 1234 5678"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="United Kingdom"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills / Profession *</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g., Registered Nurse, Project Manager, Logistics Coordinator"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience *</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Describe your relevant experience in healthcare, humanitarian work, or related fields..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages *</Label>
                    <Input
                      id="languages"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      placeholder="e.g., English (Native), French (Fluent), Spanish (Conversational)"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-upload">Upload CV (PDF or Word) *</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="cursor-pointer"
                      />
                      {cvFile && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>{cvFile.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional information you'd like to share..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-start space-x-2 py-4">
                    <Checkbox
                      id="gdpr"
                      checked={gdprConsent}
                      onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                      required
                    />
                    <label
                      htmlFor="gdpr"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to GDPR and data processing. I understand that my personal information will be stored securely and used only for volunteer coordination purposes. *
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
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