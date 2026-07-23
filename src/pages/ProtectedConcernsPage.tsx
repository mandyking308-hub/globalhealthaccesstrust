import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const TYPES = [
  { v: "wrongdoing", l: "Wrongdoing" },
  { v: "fraud", l: "Fraud" },
  { v: "misuse_of_funds", l: "Misuse of funds" },
  { v: "safeguarding", l: "Safeguarding failure" },
  { v: "retaliation", l: "Retaliation" },
  { v: "conflicts", l: "Undisclosed conflicts of interest" },
  { v: "governance", l: "Serious governance failure" },
  { v: "legal", l: "Legal or regulatory breach" },
];

export default function ProtectedConcernsPage() {
  const [concern_type, setType] = useState("wrongdoing");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [anonymous, setAnon] = useState(true);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ reference_number: string; ack_token?: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (detail.trim().length < 30) {
      toast({ title: "Please add more detail", description: "At least 30 characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.rpc("concern_submit", {
      _concern_type: concern_type,
      _summary: summary,
      _detail: detail,
      _anonymous: anonymous,
      _reporter_name: name || null,
      _reporter_contact: contact || null,
    });
    setBusy(false);
    if (error) return toast({ title: "Could not submit", description: error.message, variant: "destructive" });
    setResult(data as any);
  };

  if (result) {
    return (
      <div className="container-content py-16 max-w-2xl mx-auto">
        <Card>
          <CardHeader><CardTitle className="font-serif">Concern received</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Reference number: <strong>{result.reference_number}</strong></p>
            {result.ack_token && (
              <p>Status-check token: <code className="text-xs break-all">{result.ack_token}</code>
                <br /><span className="text-muted-foreground">This is the only way to check status without signing in. Save it now.</span></p>
            )}
            <p className="text-muted-foreground">Your concern will be reviewed by a small number of designated officers. Confidentiality is protected as far as safety and legal duties permit.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Protected Concerns (Whistleblowing) | GHAT</title></Helmet>
      <div className="container-content py-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Raise a protected concern</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Use this pathway to raise serious concerns about wrongdoing, fraud, misuse of funds, safeguarding
          failure, retaliation, undisclosed conflicts, governance failure, or legal or regulatory breach.
        </p>
        <Alert className="mb-6">
          <AlertDescription className="text-sm">
            Access is restricted to a small number of designated officers. Confidentiality is protected as far
            as safety and legal obligations allow — it cannot be absolute. Retaliation is prohibited.
          </AlertDescription>
        </Alert>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="concern-type">Type of concern</Label>
            <Select value={concern_type} onValueChange={setType}>
              <SelectTrigger id="concern-type" aria-label="Type of concern"><SelectValue /></SelectTrigger>
              <SelectContent>{TYPES.map((t) => <SelectItem key={t.v} value={t.v}>{t.l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="concern-summary">Short summary</Label>
            <Input id="concern-summary" name="summary" value={summary} onChange={(e) => setSummary(e.target.value)} maxLength={200} required />
          </div>
          <div>
            <Label htmlFor="concern-detail">Full detail (dates, people, evidence references)</Label>
            <Textarea id="concern-detail" name="detail" value={detail} onChange={(e) => setDetail(e.target.value)} rows={9} maxLength={6000} required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="anon" checked={anonymous} onCheckedChange={(v) => setAnon(v === true)} />
            <Label htmlFor="anon" className="text-sm font-normal">Submit anonymously</Label>
          </div>
          {!anonymous && (
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label htmlFor="reporter-name">Name</Label><Input id="reporter-name" name="reporter_name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} /></div>
              <div><Label htmlFor="reporter-contact">Contact (email or phone)</Label><Input id="reporter-contact" name="reporter_contact" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={200} /></div>
            </div>
          )}
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Submit concern"}</Button>
        </form>
      </div>
    </>
  );
}
