import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
];

export default function SupportRequestPage() {
  const [category, setCategory] = useState("donor_account");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 20) {
      toast({ title: "Please add more detail", description: "At least 20 characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { data: userData } = await supabase.auth.getUser();
    // Prefer authenticated support requests through the existing service_requests system.
    if (userData?.user) {
      const { data, error } = await supabase
        .from("project_service_requests")
        .insert({
          requester_user_id: userData.user.id,
          requester_role: "donor",
          request_type: "support",
          pathway: category as
            | "donor_account"
            | "payment"
            | "allocation"
            | "project"
            | "project_team"
            | "evidence"
            | "privacy"
            | "technical"
            | "other",
          category,
          subject: subject || `Support: ${CATEGORIES.find((c) => c.v === category)?.l}`,
          description,
        })
        .select("reference_number")
        .single();
      setBusy(false);
      if (error) return toast({ title: "Could not submit", description: error.message, variant: "destructive" });
      setRef(data.reference_number);
      return;
    }
    // Anonymous / not signed in — send to inbound_contacts for admin triage.
    const { error } = await supabase.from("inbound_contacts").insert([{
      name: name || "Anonymous",
      email: email || "no-reply@example.com",
      nature_of_enquiry: `Support: ${category}`,
      message: `${subject ? subject + "\n\n" : ""}${description}`,
      internal_tags: ["support", category],
    }]);
    setBusy(false);
    if (error) return toast({ title: "Could not submit", description: error.message, variant: "destructive" });
    setRef("Received");
  };

  if (ref) {
    return (
      <div className="container-content py-16 max-w-2xl mx-auto">
        <Card>
          <CardHeader><CardTitle className="font-serif">Support request received</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Your reference number is <strong>{ref}</strong>. Please keep it for your records.</p>
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
          Choose the category that best matches your request. You will receive a reference number. Do not submit
          safeguarding, protected concerns or security incidents here — use the dedicated pathways.
        </p>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.v} value={c.v}>{c.l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} placeholder="Short summary" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={7} maxLength={4000} required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name (if not signed in)</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={200} />
            </div>
            <div>
              <Label>Email (if not signed in)</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} />
            </div>
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Submit request"}</Button>
        </form>
      </div>
    </>
  );
}
