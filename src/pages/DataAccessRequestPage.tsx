import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const REQUEST_TYPES: { value: string; label: string; description: string }[] = [
  { value: "access", label: "Access your personal data", description: "Receive a secure copy of the personal data we hold about you." },
  { value: "rectification", label: "Correct inaccurate data", description: "Ask us to correct information that is wrong or incomplete." },
  { value: "erasure", label: "Erasure of personal data", description: "Request deletion. Some records may be retained where a legal or governance obligation applies." },
  { value: "restriction", label: "Restriction of processing", description: "Ask us to pause processing while a matter is reviewed." },
  { value: "objection", label: "Object to processing", description: "Object to processing carried out under legitimate interests." },
  { value: "portability", label: "Portability of data you provided", description: "Receive certain data you provided in a portable format." },
  { value: "withdrawal_of_consent", label: "Withdraw consent", description: "Withdraw consent previously given (this does not affect earlier lawful processing)." },
  { value: "automated_decision_review", label: "Automated decision review", description: "Ask a person to review a decision made by automated means." },
  { value: "information_request", label: "Information about our processing", description: "Ask us how we use personal data." },
  { value: "other", label: "Other data-protection request", description: "Any other data-protection matter." },
];

export const DataAccessRequestPage = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState<string>("access");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [representative, setRepresentative] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  // Bot protection: honeypot (must remain blank) + form open timestamp
  const [website, setWebsite] = useState("");
  const [formOpenedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data: profile } = await supabase
          .from("profiles").select("email, first_name, last_name").eq("id", user.id).maybeSingle();
        if (profile) {
          setContact(profile.email ?? "");
          setName([profile.first_name, profile.last_name].filter(Boolean).join(" "));
        }
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silently ignore
    if (website.trim() !== "") { setReference("SILENT-OK"); return; }
    // Minimum time-on-page: 3 seconds. Silently ignore anything faster.
    if (Date.now() - formOpenedAt < 3000) { setReference("SILENT-OK"); return; }
    // Client-side throttle: 1 submission per 60s per browser
    const key = "ghat_dpr_last_submit";
    const last = Number(localStorage.getItem(key) || 0);
    if (Date.now() - last < 60_000) {
      toast({ title: "Please wait", description: "You can submit another request in a moment.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("submit_rights_request", {
        _request_type: requestType,
        _request_description: description,
        _requester_contact: contact,
        _requester_name: name,
        _representative_name: representative || null,
        _channel: "website",
      });
      if (error) throw error;
      localStorage.setItem(key, String(Date.now()));
      setReference(data as string);
      toast({
        title: "Request received",
        description: "Your reference is " + data + ". We will contact you to confirm and, where required, verify your identity.",
      });
      setDescription("");
    } catch (err: any) {
      toast({
        title: "We could not submit your request",
        description: err.message ?? "Please try again or contact us.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <SEO
        title="Data-protection rights request | Global Health Access Trust"
        description="Exercise your UK GDPR rights: access, correction, erasure, restriction, objection, portability, consent withdrawal and related requests."
      />
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-foreground">Data-protection rights request</h1>
            <p className="mt-3 text-muted-foreground">
              You may exercise your rights under the UK GDPR by completing this form. We aim to respond within one calendar month of confirming your request and, where required, verifying your identity. Complex requests may be extended by up to two further months, and we will explain any extension in writing.
            </p>
          </div>

          {reference && (
            <Alert className="mb-6">
              <AlertDescription>
                Your reference number is <strong>{reference}</strong>. Please keep this for your records.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Submit a request</CardTitle>
              <CardDescription>All requests are handled by the Trust's data-protection lead.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Type of request</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {REQUEST_TYPES.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {REQUEST_TYPES.find(t => t.value === requestType)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact (email or postal address)</Label>
                  <Input id="contact" value={contact} onChange={e => setContact(e.target.value)} required disabled={isLoggedIn} />
                  {isLoggedIn && <p className="text-xs text-muted-foreground">Using your registered contact.</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="representative">Acting on behalf of someone else? (optional)</Label>
                  <Input id="representative" value={representative} onChange={e => setRepresentative(e.target.value)}
                    placeholder="Name of the person you represent" />
                  <p className="text-xs text-muted-foreground">
                    If you are acting for another person, we will ask for evidence of your authority before we act.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Please describe your request</Label>
                  <Textarea id="description" rows={5} value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Include enough detail for us to locate the information (dates, subject matter, communications)."
                    required minLength={5} />
                </div>

                {requestType === "erasure" && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Erasure is not always possible. Records required to meet legal, financial, safeguarding or governance obligations may be retained. We will explain what we can and cannot do.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Submitting…" : "Submit request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader><CardTitle className="font-serif text-lg">What happens next</CardTitle></CardHeader>
            <CardContent>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                <li>We acknowledge your request and, where necessary, ask you to confirm your identity.</li>
                <li>Our data-protection lead reviews the request against the UK GDPR.</li>
                <li>We search the relevant systems, apply any exemptions required, and prepare the response.</li>
                <li>We deliver our response securely within one calendar month, unless we tell you we need longer.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
