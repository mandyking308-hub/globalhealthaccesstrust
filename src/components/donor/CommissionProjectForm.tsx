import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
          description: "Please log in to submit a project proposition.",
          variant: "destructive",
        });
        navigate("/auth?portal=donor");
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
        title: "Project proposition received",
        description: "It has been submitted for initial review. Submission does not constitute project approval or funding acceptance.",
      });

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
        description: "There was an error submitting your project proposition. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelCls = "text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70";

  return (
    <div className="portal-panel">
      <span className="portal-eyebrow mb-4">Commission a Public-Benefit Project</span>
      <h2 className="text-foreground mt-2 mb-3" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>
        Submit an Initial Project Proposition
      </h2>
      <p className="text-[15px] text-muted-foreground mb-3 max-w-3xl">
        Submit an initial public-benefit project proposition for scoping and Trustee review.
        Please explain the need, setting, intended outcome, proposed contribution and the
        resources or relationships that may support delivery.
      </p>
      <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
        Submission creates a proposition for review. It does not constitute project approval,
        acceptance of funds or a commitment to deliver.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className={labelCls}>Project Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="A clear working title for the proposition"
            required
            className="h-11"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="region" className={labelCls}>Region *</Label>
            <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sub-Saharan Africa">Sub-Saharan Africa</SelectItem>
                <SelectItem value="North Africa">North Africa</SelectItem>
                <SelectItem value="South Asia">South Asia</SelectItem>
                <SelectItem value="Middle East">Middle East</SelectItem>
                <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                <SelectItem value="East Asia">East Asia</SelectItem>
                <SelectItem value="Latin America and the Caribbean">Latin America and the Caribbean</SelectItem>
                <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
                <SelectItem value="Western Europe">Western Europe</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
                <SelectItem value="Multi-region or Global">Multi-region or Global</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className={labelCls}>Country or Location *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Country, territory or community"
              required
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_type" className={labelCls}>Project Area *</Label>
          <Select value={formData.project_type} onValueChange={(value) => setFormData({ ...formData, project_type: value })} required>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select the closest project area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Healthcare Access and Health Systems">Healthcare Access and Health Systems</SelectItem>
              <SelectItem value="Land, Buildings and Essential Infrastructure">Land, Buildings and Essential Infrastructure</SelectItem>
              <SelectItem value="Housing and Safe Living Conditions">Housing and Safe Living Conditions</SelectItem>
              <SelectItem value="Food Systems, Agriculture and Nutrition">Food Systems, Agriculture and Nutrition</SelectItem>
              <SelectItem value="Water, Sanitation and Essential Utilities">Water, Sanitation and Essential Utilities</SelectItem>
              <SelectItem value="Education, Skills and Professional Capability">Education, Skills and Professional Capability</SelectItem>
              <SelectItem value="Employment, Livelihoods and Enterprise">Employment, Livelihoods and Enterprise</SelectItem>
              <SelectItem value="Responsible AI, Technology and Data">Responsible AI, Technology and Data</SelectItem>
              <SelectItem value="Logistics and Supply Systems">Logistics and Supply Systems</SelectItem>
              <SelectItem value="Humanitarian and Emergency Response">Humanitarian and Emergency Response</SelectItem>
              <SelectItem value="Community Protection and Vulnerability">Community Protection and Vulnerability</SelectItem>
              <SelectItem value="Research, Policy and Systems Reform">Research, Policy and Systems Reform</SelectItem>
              <SelectItem value="Integrated Multi-System Project">Integrated Multi-System Project</SelectItem>
              <SelectItem value="Other Public-Benefit Proposition">Other Public-Benefit Proposition</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Livelihood and enterprise propositions must serve a defined charitable and health-related public benefit rather than ordinary private business development.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className={labelCls}>Project Proposition *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the need or system challenge, the setting, the population or service context, the intended public-benefit outcome and any organisations, expertise, relationships or resources already identified."
            rows={7}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget_range" className={labelCls}>Indicative Budget Range *</Label>
            <Select value={formData.budget_range} onValueChange={(value) => setFormData({ ...formData, budget_range: value })} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select indicative budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To be established">To be established</SelectItem>
                <SelectItem value="Under £5,000">Under £5,000</SelectItem>
                <SelectItem value="£5,000 - £10,000">£5,000 - £10,000</SelectItem>
                <SelectItem value="£10,000 - £25,000">£10,000 - £25,000</SelectItem>
                <SelectItem value="£25,000 - £50,000">£25,000 - £50,000</SelectItem>
                <SelectItem value="£50,000 - £100,000">£50,000 - £100,000</SelectItem>
                <SelectItem value="£100,000 - £500,000">£100,000 - £500,000</SelectItem>
                <SelectItem value="£500,000+">£500,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency" className={labelCls}>Timing *</Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select proposed timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent — time-sensitive need">Urgent — time-sensitive need</SelectItem>
                <SelectItem value="Priority — intended within three months">Priority — intended within three months</SelectItem>
                <SelectItem value="Planned — intended within three to twelve months">Planned — intended within three to twelve months</SelectItem>
                <SelectItem value="Exploratory — timing to be established">Exploratory — timing to be established</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dedication" className={labelCls}>Dedication or Recognition Preference (Optional)</Label>
          <Input
            id="dedication"
            value={formData.dedication}
            onChange={(e) => setFormData({ ...formData, dedication: e.target.value })}
            placeholder="In memory of… / In honour of… / Organisation or family / Anonymous / No recognition"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Recognition arrangements remain subject to the Trust's approval, privacy choices and the needs of the project.
          </p>
        </div>

        <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Proposition…
            </>
          ) : (
            "Submit Project Proposition"
          )}
        </Button>
      </form>
    </div>
  );
};