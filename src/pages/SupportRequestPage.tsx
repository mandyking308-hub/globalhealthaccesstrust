import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  { v: "donor_account", l: "Donor account" },
  { v: "payment", l: "Payment" },
  { v: "allocation", l: "Allocation" },
  { v: "project", l: "Project" },
  { v: "project_team", l: "Project Team" },
  { v: "evidence", l: "Evidence" },
  { v: "privacy", l: "Privacy" },
  { v: "technical", l: "Technical" },
  { v: "other", l: "Other" },
] as const;

type SupportPathway = typeof CATEGORIES[number]["v"];

export default function SupportRequestPage() {
  const [category, setCategory] = useState<SupportPathway>("donor_account");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (description.trim().length < 20) {
      toast({ title: "Please add more detail", description: "At least 20 characters.", variant: "destructive" });
      return;
    }

    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (user) {
        const { data: teamProfile } = await supabase
          .from("volunteers")
          .select("id")
          .eq("user_id", user.id)
          .eq("status", "approved")
          .maybeSingle();

        const requesterRole = teamProfile ? "project_team" : "donor";
        const { data, error } = await supabase
          .from("project_service_requests")
          .insert({
            requester_user_id: user.id,
            requester_role: requesterRole,
            request_type: "support",
            pathway: category,
            category,
            subject: subject.trim() || `Support: ${CATEGORIES.find((item) => item.v === category)?.l}`,
            description: description.trim(),
          })
          .select("reference_number")
          .single();

        if (error) throw error;
        setReference(data.reference_number);
        return;
      }

      if (!name.trim() || !email.trim() || !consent) {
        throw new Error("Name, email and privacy consent are required when submitting without signing in.");
      }

      const categoryLabel = CATEGORIES.find((item) => item.v === category)?.l || category;
      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: {
          name: name.trim(),
          email: email.trim(),
          phone: "",
          organisation: "",
          position: "",
          nature_of_enquiry: "General Enquiry",
          message: `Support request — ${categoryLabel}\n\n${subject.trim() ? `${subject.trim()}\n\n` : ""}${description.trim()}`,
          additional_context: "Submitted through the public Project Support form.",
          consent: true,
          honeypot: "",
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.message || "Could not submit support request");
      setReference(typeof data.reference === "string" ? data.reference : "Received");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast({ title: "Could not submit", description: message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  if (reference) {
    return (
      <div className="container-content py-16 max-w-2xl mx-auto">
        <Card>
          <CardHeader><CardTitle className="font-serif">Support request received</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Your reference number is <strong>{reference}</strong>. Please keep it for your records.</p>
            <p className="text-muted-foreground">The Trust will acknowledge your request and route it to the correct team. Signed-in requests can be tracked from your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Project Support | GHAT</title></Helmet>
      <div className="container-content py-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Project Support</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Choose the category that best matches your request. You will receive a reference number. Do not submit safeguarding, protected concerns or security incidents here — use the dedicated pathways.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as SupportPathway)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((item) => <SelectItem key={item.v} value={item.v}>{item.l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="support-subject">Subject</Label>
            <Input id="support-subject" value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={200} placeholder="Short summary" />
          </div>

          <div>
            <Label htmlFor="support-description">Description</Label>
            <Textarea id="support-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={7} maxLength={4000} required />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="support-name">Name (if not signed in)</Label>
              <Input id="support-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={200} />
            </div>
            <div>
              <Label htmlFor="support-email">Email (if not signed in)</Label>
              <Input id="support-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={320} />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="support-consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)} />
            <Label htmlFor="support-consent" className="text-sm leading-relaxed cursor-pointer">
              If I am not signed in, I consent to the Trust processing these details to respond to this support request.
            </Label>
          </div>

          <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Submit request"}</Button>
        </form>
      </div>
    </>
  );
}
