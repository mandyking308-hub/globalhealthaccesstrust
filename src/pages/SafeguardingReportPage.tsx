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
import { AlertTriangle } from "lucide-react";

const AGE_BANDS = ["under 13", "13–17", "18–24", "25–64", "65+"];

export default function SafeguardingReportPage() {
  const [immediate_danger, setDanger] = useState(false);
  const [allegation, setAllegation] = useState("");
  const [location, setLoc] = useState("");
  const [initials, setInitials] = useState("");
  const [age_band, setAge] = useState(AGE_BANDS[3]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [anonymous, setAnon] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ reference_number: string; urgent: boolean } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (allegation.trim().length < 20) {
      toast({ title: "Please add more detail", description: "At least 20 characters.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.rpc("safeguarding_report", {
      _allegation: allegation,
      _immediate_danger: immediate_danger,
      _location: location || null,
      _person_initials: initials || null,
      _person_age_band: age_band,
      _reporter_name: anonymous ? null : name || null,
      _reporter_contact: anonymous ? null : contact || null,
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
          <CardHeader><CardTitle className="font-serif">Safeguarding report received</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>Reference: <strong>{result.reference_number}</strong></p>
            {result.urgent && <Alert className="border-destructive/40 bg-destructive/5"><AlertDescription>You flagged immediate danger. If not already done, contact local emergency services now.</AlertDescription></Alert>}
            <p className="text-muted-foreground">Your report will be handled by a designated safeguarding officer under restricted access. It is not visible to donors or ordinary administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Report a Safeguarding Concern | GHAT</title></Helmet>
      <div className="container-content py-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Report a safeguarding concern</h1>
        <Alert className="mb-6 border-destructive/40 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>If a person is in immediate danger, contact local emergency services first.</strong> Use
            this form to record the concern with the Trust so a designated officer can act.
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground mb-6">
          Please give initials only for the person at risk. Do not paste medical records or identifying
          documents here — the officer will contact you if further evidence is needed.
        </p>
        <form onSubmit={submit} className="space-y-5">
          <div className="flex items-center gap-2 border border-destructive/40 rounded-md p-3 bg-destructive/5">
            <Checkbox id="danger" checked={immediate_danger} onCheckedChange={(v) => setDanger(v === true)} />
            <Label htmlFor="danger" className="text-sm font-normal">The person is in immediate danger right now</Label>
          </div>
          <div>
            <Label htmlFor="safeguarding-concern">What has happened / your concern</Label>
            <Textarea id="safeguarding-concern" name="allegation" value={allegation} onChange={(e) => setAllegation(e.target.value)} rows={8} maxLength={4000} required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="safeguarding-location">Location</Label><Input id="safeguarding-location" name="location" value={location} onChange={(e) => setLoc(e.target.value)} maxLength={200} /></div>
            <div>
              <Label htmlFor="person-age-band">Person at risk — age band</Label>
              <Select value={age_band} onValueChange={setAge}>
                <SelectTrigger id="person-age-band" aria-label="Person at risk age band"><SelectValue /></SelectTrigger>
                <SelectContent>{AGE_BANDS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="person-initials">Person at risk — initials only</Label>
            <Input id="person-initials" name="person_initials" value={initials} onChange={(e) => setInitials(e.target.value)} maxLength={10} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="anon" checked={anonymous} onCheckedChange={(v) => setAnon(v === true)} />
            <Label htmlFor="anon" className="text-sm font-normal">Submit anonymously (the officer cannot contact you)</Label>
          </div>
          {!anonymous && (
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label htmlFor="safeguarding-reporter-name">Your name</Label><Input id="safeguarding-reporter-name" name="reporter_name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} /></div>
              <div><Label htmlFor="safeguarding-reporter-contact">Your contact</Label><Input id="safeguarding-reporter-contact" name="reporter_contact" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={200} /></div>
            </div>
          )}
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Submit safeguarding report"}</Button>
        </form>
      </div>
    </>
  );
}
