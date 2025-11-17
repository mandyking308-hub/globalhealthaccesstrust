import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Download, Trash2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DataAccessRequestPage = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState<"export" | "delete">("export");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useState(() => {
    checkAuth();
  });

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .single();
      if (profile) {
        setEmail(profile.email);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("gdpr_requests").insert({
        user_id: userId,
        email,
        request_type: requestType,
        request_details: details,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: `Your ${requestType === "export" ? "data export" : "data deletion"} request has been received. We will process it within 30 days.`,
      });

      setDetails("");
    } catch (error) {
      console.error("Error submitting DSAR:", error);
      toast({
        title: "Submission Error",
        description: "Your request could not be completed. A member of our team will review this shortly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Data Access Request - Global Health Access Trust"
        description="Exercise your GDPR rights: request your data or deletion."
      />
      
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-serif text-foreground">Data Access Request</h1>
            </div>
            <p className="text-muted-foreground">
              Exercise your GDPR rights to access or delete your personal data
            </p>
          </div>

          <Alert className="mb-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Under UK GDPR, you have the right to access your personal data or request its deletion. 
              We will respond to your request within 30 days.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Submit a Request</CardTitle>
              <CardDescription>
                Choose whether you'd like to export your data or request deletion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>Request Type</Label>
                  <RadioGroup value={requestType} onValueChange={(value) => setRequestType(value as "export" | "delete")}>
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="export" id="export" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="export" className="cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Download className="h-4 w-4 text-primary" />
                            <span className="font-semibold">Data Export</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Request a complete copy of all personal data we hold about you in a portable format
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="delete" id="delete" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="delete" className="cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="font-semibold">Data Deletion</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Request permanent deletion of your personal data (note: some data may be retained for legal compliance)
                          </p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoggedIn}
                  />
                  {isLoggedIn && (
                    <p className="text-xs text-muted-foreground">
                      Using your registered email address
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details (Optional)</Label>
                  <Textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide any additional information about your request..."
                    rows={4}
                  />
                </div>

                {requestType === "delete" && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      <strong>Important:</strong> Deleting your data is permanent and irreversible. 
                      Your account access will be removed, but anonymized project data may be retained 
                      to maintain project integrity and comply with charity regulations.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="font-serif text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                <li>Your request is logged and reviewed by our data protection team</li>
                <li>We verify your identity to ensure data security</li>
                <li>
                  {requestType === "export" 
                    ? "We compile all your data into a secure, downloadable format" 
                    : "We permanently remove your personal data from our systems"}
                </li>
                <li>You receive confirmation via email within 30 days</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
