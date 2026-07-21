import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const DonationFormPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    frequency: "one_time",
    notes: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit funding.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) < 500) {
      toast({
        title: "Invalid amount",
        description: "Minimum funding amount is £500.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.purpose) {
      toast({
        title: "Purpose required",
        description: "Please select a funding purpose.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("donations")
      .insert([{
        donor_id: userId,
        amount: parseFloat(formData.amount),
        currency: "GBP",
        purpose: formData.purpose as any,
        frequency: formData.frequency as any,
        notes: formData.notes || null,
        status: "pending",
      }]);

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your funding submission has been recorded.",
      });
      navigate("/donor-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col donor-portal">
      <Header />
      <main className="flex-grow">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-12">
            <span className="portal-eyebrow md:mt-2">Funding Submission</span>
            <div>
              <h1 className="no-display text-foreground mb-4" style={{ fontFamily: "var(--font-serif)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1 }}>
                Funding Submission
              </h1>
              <p className="text-[16.5px] text-muted-foreground leading-relaxed">
                Submit a structured funding allocation
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="portal-panel space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Funding Amount (£)*</Label>
              <Input
                id="amount"
                type="number"
                min="500"
                step="0.01"
                placeholder="500.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">Minimum funding amount: £500</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Funding Purpose*</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) => setFormData({ ...formData, purpose: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare_access">Healthcare Access</SelectItem>
                  <SelectItem value="humanitarian_crisis">Humanitarian Crisis</SelectItem>
                  <SelectItem value="research_policy">Research & Policy</SelectItem>
                  <SelectItem value="professional_education">Professional Education</SelectItem>
                  <SelectItem value="where_most_needed">Where Most Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Funding Frequency*</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one_time">One-time</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or dedication..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase" disabled={loading}>
              {loading ? "Processing..." : "Submit Funding"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
