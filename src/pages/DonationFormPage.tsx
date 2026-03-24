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
        description: "Please log in to make a donation.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) < 500) {
      toast({
        title: "Invalid amount",
        description: "Minimum donation amount is £500.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.purpose) {
      toast({
        title: "Purpose required",
        description: "Please select a donation purpose.",
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
        description: "Your donation has been recorded. Payment processing will be added soon.",
      });
      navigate("/donor-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Funding Submission</h1>
          <p className="text-muted-foreground mb-8">Submit a structured funding allocation</p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm border">
            <div>
              <Label htmlFor="amount">Funding Amount (£)*</Label>
              <Input
                id="amount"
                type="number"
                min="500"
                step="0.01"
                placeholder="500.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">Minimum funding amount: £500</p>
            </div>

            <div>
              <Label htmlFor="purpose">Funding Purpose*</Label>
              <Select 
                value={formData.purpose} 
                onValueChange={(value) => setFormData({ ...formData, purpose: value })}
              >
                <SelectTrigger>
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

            <div>
              <Label htmlFor="frequency">Funding Frequency*</Label>
              <Select 
                value={formData.frequency} 
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
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

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or dedication..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit Donation"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
