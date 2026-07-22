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

const categories = [
  { value: "donor_account", label: "Donor account" },
  { value: "payment", label: "Payment" },
  { value: "allocation", label: "Allocation" },
  { value: "project", label: "Project" },
  { value: "project_team", label: "Project Team" },
  { value: "evidence", label: "Evidence" },
  { value: "privacy", label: "Privacy" },
  { value: "technical", label: "Technical" },
  { value: "other", label: "Other" },
] as const;

export default function SupportRequestPage() {
  const [category, setCategory] = useState("donor_account");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
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
            subject: subject.trim() || `Support: ${categories.find((item) => item.value === category)?.label}`,
            description: description.trim(),
          })
          .select("reference_number")
          .single();

        if (error) throw error;
        setReference(data.reference_number);
        return;
      }

      if (!name.trim() || !email.trim()) {
        toast({ title: "Contact details required", description: "Please provide your name and email, or sign in.", variant: "destructive" });
        return;
      }

      const categoryLabel = categories.find((item) => item.value === category)?.label || "Other";
      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: {
          name,
          email,
          phone: "",
          organisation: "",
          position: "",
          nature_of_enquiry: "General Enquiry",
          message: `Support category: ${categoryLabel}\n\n${subject.trim() ? `${subject.trim()}\n\n` : ""}${description.trim()}`,
          additional_context: "Submitted through the public support-request route.",
          consent: true,
          honeypot,
        },
      });

      if (error || !data?.success) throw new Error(data?.message || error?.message || "Submission failed");
      setReference(typeof data.reference === "string" ? data.reference : "Received");
    } catch (error) {
      console.error("Support request failed", error);
      toast({ title: "Could not submit", description: "Please try again later.", variant: "destructive" });
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
            <p className="text-muted-foreground">The request will be reviewed and routed according to its category. Signed-in requests can be tracked from the relevant portal.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Project Support | Global Health Access Trust</title></Helmet>
      <div className="container-content py-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Project Support</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Choose the category that best matches your request. Do not submit safeguarding concerns, protected concerns or security incidents here; use the dedicated restricted pathways.
        </p>
        <form onSubmit={submit} className="space-y-5">
          <input type="text" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Subject</Label>
            <Input value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={200} placeholder="Short summary" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={7} maxLength={4000} required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name (if not signed in)</Label>
              <Input value={name} onChange={(event) => setName(event.target.value)} maxLength={200} autoComplete="name" />
            </div>
            <div>
              <Label>Email (if not signed in)</Label>
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={320} autoComplete="email" />
            </div>
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Submit request"}</Button>
        </form>
      </div>
    </>
  );
}
