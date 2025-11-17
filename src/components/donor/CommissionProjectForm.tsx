import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const CommissionProjectForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    region: "",
    country: "",
    project_type: "",
    description: "",
    budget_range: "",
    urgency: "",
    dedication: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to commission a project.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase
        .from("commissioned_projects")
        .insert({
          ...formData,
          donor_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Project request submitted",
        description: "Your commissioned project request has been submitted for review. We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        title: "",
        region: "",
        country: "",
        project_type: "",
        description: "",
        budget_range: "",
        urgency: "",
        dedication: ""
      });

    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your project request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="font-serif text-xl sm:text-2xl">Commission a New Project</CardTitle>
        <CardDescription className="text-sm">
          Design a bespoke health intervention project with complete transparency and real-time tracking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Mobile Clinic for Rural Tanzania"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sub-Saharan Africa">Sub-Saharan Africa</SelectItem>
                  <SelectItem value="South Asia">South Asia</SelectItem>
                  <SelectItem value="Middle East">Middle East</SelectItem>
                  <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                  <SelectItem value="Latin America">Latin America</SelectItem>
                  <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., Tanzania"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_type">Project Type *</Label>
            <Select value={formData.project_type} onValueChange={(value) => setFormData({ ...formData, project_type: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical Equipment">Medical Equipment</SelectItem>
                <SelectItem value="Healthcare Workforce">Healthcare Workforce Training</SelectItem>
                <SelectItem value="Mobile Clinic">Mobile Clinic</SelectItem>
                <SelectItem value="Emergency Response">Emergency Response</SelectItem>
                <SelectItem value="Systems Strengthening">Systems Strengthening</SelectItem>
                <SelectItem value="Maternal Health">Maternal Health</SelectItem>
                <SelectItem value="Child Health">Child Health</SelectItem>
                <SelectItem value="Infectious Disease">Infectious Disease Control</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your intended impact, target population, and expected outcomes..."
              rows={5}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range *</Label>
              <Select value={formData.budget_range} onValueChange={(value) => setFormData({ ...formData, budget_range: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="£5,000 - £10,000">£5,000 - £10,000</SelectItem>
                  <SelectItem value="£10,000 - £25,000">£10,000 - £25,000</SelectItem>
                  <SelectItem value="£25,000 - £50,000">£25,000 - £50,000</SelectItem>
                  <SelectItem value="£50,000 - £100,000">£50,000 - £100,000</SelectItem>
                  <SelectItem value="£100,000+">£100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency *</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Emergency">Emergency (Immediate)</SelectItem>
                  <SelectItem value="High">High (1-2 months)</SelectItem>
                  <SelectItem value="Medium">Medium (3-6 months)</SelectItem>
                  <SelectItem value="Standard">Standard (6-12 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dedication">Dedication (Optional)</Label>
            <Input
              id="dedication"
              value={formData.dedication}
              onChange={(e) => setFormData({ ...formData, dedication: e.target.value })}
              placeholder="In memory of... / In honor of... / Anonymous"
            />
            <p className="text-sm text-muted-foreground">
              Add a personal dedication if you wish. This will appear in project documentation.
            </p>
          </div>

          <Button type="submit" size="lg" className="w-full min-h-[48px]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Project Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};