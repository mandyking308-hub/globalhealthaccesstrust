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

const ABOUT = ["a person", "a project", "a decision", "the Trust", "other"];
const CATS = [
  { v: "conduct", l: "Conduct" },
  { v: "process", l: "Process" },
  { v: "delivery", l: "Delivery" },
  { v: "finance", l: "Finance" },
  { v: "privacy", l: "Privacy" },
  { v: "safeguarding_signpost", l: "Safeguarding signposting" },
  { v: "other", l: "Other" },
];

export default function ComplaintsIntakePage() {
  const [complaint_about, setAbout] = useState(ABOUT[0]);
  const [category, setCategory] = useState("conduct");
  const [description, setDescription] = useState("");
  const [requested_remedy, setRemedy] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accessibility, setAccess] = useState("");
  const [anonymous, setAnon] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ reference_number: string; ack_token?: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 20) {
      toast({ title: "Please add more detail", description: "At least 20 characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.rpc("complaint_submit", {
      _complaint_about: complaint_about,
      _category: category,
      _description: description,
      _requested_remedy: requested_remedy || null,
      _complainant_name: name || null,
      _complainant_email: email || null,
      _complainant_phone: phone || null,
      _accessibility_needs: accessibility || null,
      _anonymous: anonymous,
    });
    setBusy(false);
    if (error) return toast({ title: "Could not submit", description: error.message, variant: "destructive" });
    setResult(data as any);
  };

  if (result) {
    return (
      <div className="container-content py-16 max-w-2xl mx-auto">
        <Card>
          <CardHeader><CardTitle className="font-serif">Complaint received</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Reference number: <strong>{result.reference_number}</strong></p>
            {result.ack_token && (
              <p>Anonymous status-check token: <code className="text-xs break-all">{result.ack_token}</code>
                <br /><span className="text-muted-foreground">Save this. It is the only way to check status without signing in.</span></p>
            )}
            <p className="text-muted-foreground">The Trust will acknowledge your complaint and investigate fairly. Non-retaliation applies. Confidentiality is protected as far as safety and legal duties allow.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Make a complaint | GHAT</title></Helmet>
      <div className="container-content py-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Make a complaint</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Anyone may complain — donors, project teams, beneficiaries and members of the public. Complaints
          are acknowledged, investigated fairly, answered in writing and can be escalated. Non-retaliation
          applies. See the <a className="underline" href="/legal/complaints-policy">complaints policy</a>.
        </p>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="complaint-about">Complaint is about</Label>
            <Select value={complaint_about} onValueChange={setAbout}>
              <SelectTrigger id="complaint-about" aria-label="Complaint is about"><SelectValue /></SelectTrigger>
              <SelectContent>{ABOUT.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="complaint-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="complaint-category" aria-label="Complaint category"><SelectValue /></SelectTrigger>
              <SelectContent>{CATS.map((c) => <SelectItem key={c.v} value={c.v}>{c.l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="complaint-description">What happened</Label>
            <Textarea id="complaint-description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={7} maxLength={4000} required />
          </div>
          <div>
            <Label htmlFor="requested-remedy">What outcome would you like</Label>
            <Textarea id="requested-remedy" name="requested_remedy" value={requested_remedy} onChange={(e) => setRemedy(e.target.value)} rows={3} maxLength={1000} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="anon" checked={anonymous} onCheckedChange={(v) => setAnon(v === true)} />
            <Label htmlFor="anon" className="text-sm font-normal">Submit anonymously (we cannot contact you but you will get a token)</Label>
          </div>
          {!anonymous && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="complainant-name">Name</Label><Input id="complainant-name" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} /></div>
                <div><Label htmlFor="complainant-email">Email</Label><Input id="complainant-email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="complainant-phone">Phone (optional)</Label><Input id="complainant-phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} /></div>
                <div><Label htmlFor="accessibility-needs">Accessibility needs (optional)</Label><Input id="accessibility-needs" name="accessibility_needs" value={accessibility} onChange={(e) => setAccess(e.target.value)} maxLength={200} /></div>
              </div>
            </div>
          )}
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Submit complaint"}</Button>
        </form>
      </div>
    </>
  );
}
