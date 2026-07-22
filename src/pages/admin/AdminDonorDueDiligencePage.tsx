import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const DONOR_TYPES = ["individual","organisation","trust","estate","anonymous","third_party_payer"] as const;
const RISK_LEVELS = ["low","medium","high","prohibited_or_escalated"] as const;
const STATUSES = ["draft","information_requested","under_review","trustee_escalation","approved","declined","returned","on_hold","closed"] as const;
const RISK_FACTORS = [
  "amount","frequency","country","donor_type","payment_route","anonymity","intermediaries",
  "complex_ownership","unusual_restrictions","project_location","adverse_information",
  "sanctions_exposure","urgency_or_pressure","inconsistent_source_information",
];
const IDENTITY_TYPES = ["individual","organisation","representative","beneficial_owner","third_party_payer"] as const;
const SCREENING_TYPES = ["sanctions","pep","adverse_media","watchlist"] as const;
const SCREENING_RESULTS = ["clear","possible_match","confirmed_match","false_positive","not_performed"] as const;
const EVIDENCE_TYPES = ["source_of_funds","source_of_wealth","adverse_information","fraud_indicator","conflict_of_interest","payment_route_evidence","other"] as const;

const fmt = (m: number | null | undefined, cur: string) =>
  m == null ? "—" : new Intl.NumberFormat("en-GB", { style: "currency", currency: cur || "GBP" }).format(m / 100);

export default function AdminDonorDueDiligencePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif">Donor Due Diligence, Source of Funds & Sanctions</h1>
        <p className="text-sm text-muted-foreground max-w-3xl mt-1">
          Restricted compliance workspace for finance officers, admins and trustees. Proportionate,
          risk-based checks in line with the Donor Due Diligence and Sanctions Policy. Not every
          donor receives a PEP, source-of-wealth or automated sanctions check. Where no screening
          provider is configured, all checks are recorded as manual documented workflows.
        </p>
      </div>
      <Tabs defaultValue="cases">
        <TabsList>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="holds">Compliance holds</TabsTrigger>
        </TabsList>
        <TabsContent value="cases" className="mt-4"><CasesPanel /></TabsContent>
        <TabsContent value="holds" className="mt-4"><HoldsPanel /></TabsContent>
      </Tabs>
    </div>
  );
}

function CasesPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).from("donor_dd_cases").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{rows.length} case{rows.length === 1 ? "" : "s"}</p>
        <OpenCaseDialog onOpened={load} />
      </div>
      {loading ? <p className="text-muted-foreground">Loading…</p> : rows.length === 0 ? (
        <Card><CardContent className="p-6 text-muted-foreground">No cases yet.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <Card key={r.id} className="cursor-pointer hover:border-primary" onClick={() => setSelected(r.id)}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{r.case_reference}</div>
                  <div className="font-medium">{r.donor_display_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.donor_type} · {r.primary_country || "—"} · {fmt(r.amount_minor, r.currency)}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {r.overall_risk && <Badge variant={r.overall_risk === "prohibited_or_escalated" ? "destructive" : r.overall_risk === "high" ? "destructive" : "secondary"}>{r.overall_risk}</Badge>}
                  <Badge>{r.status}</Badge>
                  {r.trustee_escalation_required && <Badge variant="destructive">trustee</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {selected && <CaseDialog caseId={selected} onClose={() => { setSelected(null); load(); }} />}
    </div>
  );
}

function OpenCaseDialog({ onOpened }: { onOpened: () => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<any>({
    donor_display_name: "", donor_type: "individual", primary_country: "",
    amount_minor: 0, currency: "GBP", trigger_reason: "",
    is_anonymous: false, is_third_party_payer: false,
  });
  const submit = async () => {
    if (!f.donor_display_name || !f.trigger_reason) { toast.error("Donor display name and trigger reason are required"); return; }
    const { error } = await (supabase as any).rpc("dd_open_case", {
      _donor_display_name: f.donor_display_name,
      _donor_type: f.donor_type,
      _primary_country: f.primary_country || null,
      _amount_minor: Number(f.amount_minor) || null,
      _currency: f.currency,
      _trigger_reason: f.trigger_reason,
      _is_anonymous: f.is_anonymous,
      _is_third_party_payer: f.is_third_party_payer,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Case opened"); setOpen(false); onOpened();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Open new case</Button></DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Open compliance case</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Donor display name</Label><Input value={f.donor_display_name} onChange={(e) => setF({ ...f, donor_display_name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Donor type</Label>
              <Select value={f.donor_type} onValueChange={(v) => setF({ ...f, donor_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DONOR_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Primary country</Label><Input value={f.primary_country} onChange={(e) => setF({ ...f, primary_country: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Amount (minor units)</Label><Input type="number" value={f.amount_minor} onChange={(e) => setF({ ...f, amount_minor: e.target.value })} /></div>
            <div><Label>Currency</Label><Input value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })} /></div>
          </div>
          <div><Label>Trigger reason</Label><Textarea value={f.trigger_reason} onChange={(e) => setF({ ...f, trigger_reason: e.target.value })} /></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={f.is_anonymous} onCheckedChange={(v) => setF({ ...f, is_anonymous: !!v })} /> Anonymous</label>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={f.is_third_party_payer} onCheckedChange={(v) => setF({ ...f, is_third_party_payer: !!v })} /> Third-party payer</label>
          </div>
        </div>
        <DialogFooter><Button onClick={submit}>Open case</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CaseDialog({ caseId, onClose }: { caseId: string; onClose: () => void }) {
  const [c, setC] = useState<any>(null);
  const [identities, setIdentities] = useState<any[]>([]);
  const [screenings, setScreenings] = useState<any[]>([]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [riskFlags, setRiskFlags] = useState<Record<string, boolean>>({});
  const [rationale, setRationale] = useState("");
  const [riskLevel, setRiskLevel] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [escalation, setEscalation] = useState(false);
  const [nextReview, setNextReview] = useState<string>("");
  const [recheck, setRecheck] = useState<string>("");
  const [decision, setDecision] = useState<string>("approve");
  const [decisionReason, setDecisionReason] = useState("");

  const load = async () => {
    setLoading(true);
    const [{ data: caseRow }, { data: idsRow }, { data: scr }, { data: ev }, { data: evts }] = await Promise.all([
      (supabase as any).from("donor_dd_cases").select("*").eq("id", caseId).single(),
      (supabase as any).from("donor_dd_identity_records").select("*").eq("case_id", caseId).order("created_at"),
      (supabase as any).from("donor_dd_screening").select("*").eq("case_id", caseId).order("performed_at", { ascending: false }),
      (supabase as any).from("donor_dd_evidence").select("*").eq("case_id", caseId).order("recorded_at", { ascending: false }),
      (supabase as any).from("donor_dd_events").select("*").eq("case_id", caseId).order("created_at", { ascending: false }),
    ]);
    setC(caseRow); setIdentities(idsRow || []); setScreenings(scr || []); setEvidence(ev || []); setEvents(evts || []);
    if (caseRow) {
      setRiskFlags(caseRow.risk_factors || {});
      setRationale(caseRow.risk_rationale || "");
      setRiskLevel(caseRow.overall_risk || "");
      setStatus(caseRow.status || "");
      setEscalation(!!caseRow.trustee_escalation_required);
      setNextReview(caseRow.next_review_due || "");
      setRecheck(caseRow.expiry_or_recheck_date || "");
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, [caseId]);

  const saveRisk = async () => {
    const { error } = await (supabase as any).rpc("dd_set_risk_and_status", {
      _case_id: caseId,
      _overall_risk: riskLevel || null,
      _risk_factors: riskFlags,
      _risk_rationale: rationale || null,
      _status: status || null,
      _trustee_escalation_required: escalation,
      _next_review_due: nextReview || null,
      _expiry_or_recheck_date: recheck || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Risk & status saved"); load();
  };
  const submitDecision = async () => {
    if (!decisionReason.trim()) { toast.error("Reason required"); return; }
    const { error } = await (supabase as any).rpc("dd_record_decision", {
      _case_id: caseId, _decision: decision, _decision_reason: decisionReason,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Decision recorded"); setDecisionReason(""); load();
  };

  if (loading || !c) return (
    <Dialog open onOpenChange={onClose}><DialogContent><p>Loading…</p></DialogContent></Dialog>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="font-mono text-xs">{c.case_reference}</span>
            <span>·</span><span>{c.donor_display_name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="risk" className="mt-2">
          <TabsList>
            <TabsTrigger value="risk">Risk & decision</TabsTrigger>
            <TabsTrigger value="identity">Identity ({identities.length})</TabsTrigger>
            <TabsTrigger value="screening">Screening ({screenings.length})</TabsTrigger>
            <TabsTrigger value="evidence">Evidence ({evidence.length})</TabsTrigger>
            <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="risk" className="space-y-4 mt-4">
            <Card><CardHeader><CardTitle className="text-base">Risk factors</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {RISK_FACTORS.map((k) => (
                  <label key={k} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={!!riskFlags[k]} onCheckedChange={(v) => setRiskFlags({ ...riskFlags, [k]: !!v })} />
                    {k.replace(/_/g, " ")}
                  </label>
                ))}
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Overall risk</Label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{RISK_LEVELS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Next review due</Label><Input type="date" value={nextReview} onChange={(e) => setNextReview(e.target.value)} /></div>
              <div><Label>Expiry / recheck</Label><Input type="date" value={recheck} onChange={(e) => setRecheck(e.target.value)} /></div>
            </div>
            <div><Label>Rationale</Label><Textarea value={rationale} onChange={(e) => setRationale(e.target.value)} /></div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={escalation} onCheckedChange={(v) => setEscalation(!!v)} /> Trustee escalation required
            </label>
            <Button onClick={saveRisk}>Save risk & status</Button>

            <Card className="mt-4">
              <CardHeader><CardTitle className="text-base">Record decision</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Decision</Label>
                    <Select value={decision} onValueChange={setDecision}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["approve","decline","return","hold"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Reason (required)</Label><Textarea value={decisionReason} onChange={(e) => setDecisionReason(e.target.value)} /></div>
                <Button onClick={submitDecision}>Record decision</Button>
                <p className="text-xs text-muted-foreground">
                  A prohibited or escalated case cannot be approved. Decisions are immutable events.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identity" className="mt-4">
            <IdentityPanel caseId={caseId} rows={identities} onChange={load} />
          </TabsContent>
          <TabsContent value="screening" className="mt-4">
            <ScreeningPanel caseId={caseId} identities={identities} rows={screenings} onChange={load} />
          </TabsContent>
          <TabsContent value="evidence" className="mt-4">
            <EvidencePanel caseId={caseId} rows={evidence} onChange={load} />
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <div className="space-y-2">
              {events.map((e) => (
                <Card key={e.id}><CardContent className="p-3 text-sm">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{e.event_type}</span><span>{new Date(e.created_at).toLocaleString()}</span>
                  </div>
                  <pre className="text-xs mt-1 whitespace-pre-wrap">{JSON.stringify(e.detail, null, 2)}</pre>
                </CardContent></Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function IdentityPanel({ caseId, rows, onChange }: any) {
  const [f, setF] = useState<any>({ record_type: "individual", full_name: "", role_or_title: "", country_of_residence: "", organisation_name: "", registration_number: "", ownership_percent: "", identity_evidence_summary: "" });
  const add = async () => {
    if (!f.full_name) { toast.error("Full name required"); return; }
    const { error } = await (supabase as any).from("donor_dd_identity_records").insert({
      case_id: caseId, ...f,
      ownership_percent: f.ownership_percent ? Number(f.ownership_percent) : null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Added"); setF({ ...f, full_name: "", organisation_name: "", ownership_percent: "" }); onChange();
  };
  return (
    <div className="space-y-4">
      <Card><CardHeader><CardTitle className="text-base">Add identity record</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Type</Label>
              <Select value={f.record_type} onValueChange={(v) => setF({ ...f, record_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{IDENTITY_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Full name</Label><Input value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} /></div>
            <div><Label>Role / title</Label><Input value={f.role_or_title} onChange={(e) => setF({ ...f, role_or_title: e.target.value })} /></div>
            <div><Label>Country of residence</Label><Input value={f.country_of_residence} onChange={(e) => setF({ ...f, country_of_residence: e.target.value })} /></div>
            <div><Label>Organisation name</Label><Input value={f.organisation_name} onChange={(e) => setF({ ...f, organisation_name: e.target.value })} /></div>
            <div><Label>Registration number</Label><Input value={f.registration_number} onChange={(e) => setF({ ...f, registration_number: e.target.value })} /></div>
            <div><Label>Ownership %</Label><Input type="number" value={f.ownership_percent} onChange={(e) => setF({ ...f, ownership_percent: e.target.value })} /></div>
          </div>
          <div><Label>Identity evidence summary</Label><Textarea value={f.identity_evidence_summary} onChange={(e) => setF({ ...f, identity_evidence_summary: e.target.value })} /></div>
          <Button onClick={add}>Add</Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {rows.map((r: any) => (
          <Card key={r.id}><CardContent className="p-3 text-sm">
            <div className="flex justify-between"><span className="font-medium">{r.full_name}</span><Badge>{r.record_type}</Badge></div>
            <div className="text-xs text-muted-foreground">
              {[r.role_or_title, r.organisation_name, r.country_of_residence, r.ownership_percent && `${r.ownership_percent}%`].filter(Boolean).join(" · ")}
            </div>
            {r.identity_evidence_summary && <div className="text-xs mt-1">{r.identity_evidence_summary}</div>}
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}

function ScreeningPanel({ caseId, identities, rows, onChange }: any) {
  const [f, setF] = useState<any>({ identity_record_id: "", screening_type: "sanctions", method: "manual_documented", provider: "", result: "not_performed", match_details: "", false_positive_reason: "", evidence_reference: "", recheck_due: "" });
  const add = async () => {
    const { error } = await (supabase as any).from("donor_dd_screening").insert({
      case_id: caseId,
      identity_record_id: f.identity_record_id || null,
      screening_type: f.screening_type, method: f.method, provider: f.provider || null,
      result: f.result, match_details: f.match_details || null,
      false_positive_reason: f.false_positive_reason || null,
      evidence_reference: f.evidence_reference || null,
      recheck_due: f.recheck_due || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Screening recorded"); setF({ ...f, match_details: "", false_positive_reason: "", evidence_reference: "" }); onChange();
  };
  return (
    <div className="space-y-4">
      <Card><CardHeader><CardTitle className="text-base">Record screening</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            No automated screening provider is configured. All results below are manual documented checks unless a provider is named.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Identity record</Label>
              <Select value={f.identity_record_id} onValueChange={(v) => setF({ ...f, identity_record_id: v })}>
                <SelectTrigger><SelectValue placeholder="(case-level)" /></SelectTrigger>
                <SelectContent>{identities.map((i: any) => <SelectItem key={i.id} value={i.id}>{i.full_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Type</Label>
              <Select value={f.screening_type} onValueChange={(v) => setF({ ...f, screening_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SCREENING_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Method</Label><Input value={f.method} onChange={(e) => setF({ ...f, method: e.target.value })} /></div>
            <div><Label>Provider</Label><Input value={f.provider} onChange={(e) => setF({ ...f, provider: e.target.value })} placeholder="none configured" /></div>
            <div><Label>Result</Label>
              <Select value={f.result} onValueChange={(v) => setF({ ...f, result: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SCREENING_RESULTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Recheck due</Label><Input type="date" value={f.recheck_due} onChange={(e) => setF({ ...f, recheck_due: e.target.value })} /></div>
          </div>
          <div><Label>Match details</Label><Textarea value={f.match_details} onChange={(e) => setF({ ...f, match_details: e.target.value })} /></div>
          <div><Label>False-positive reason (if applicable)</Label><Textarea value={f.false_positive_reason} onChange={(e) => setF({ ...f, false_positive_reason: e.target.value })} /></div>
          <div><Label>Evidence reference</Label><Input value={f.evidence_reference} onChange={(e) => setF({ ...f, evidence_reference: e.target.value })} /></div>
          <Button onClick={add}>Record</Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {rows.map((r: any) => (
          <Card key={r.id}><CardContent className="p-3 text-sm">
            <div className="flex justify-between">
              <span>{r.screening_type} · {r.method}{r.provider ? ` · ${r.provider}` : ""}</span>
              <Badge variant={r.result === "confirmed_match" ? "destructive" : r.result === "possible_match" ? "secondary" : "outline"}>{r.result}</Badge>
            </div>
            {r.match_details && <div className="text-xs mt-1">{r.match_details}</div>}
            {r.false_positive_reason && <div className="text-xs mt-1 italic">FP: {r.false_positive_reason}</div>}
            <div className="text-xs text-muted-foreground mt-1">{new Date(r.performed_at).toLocaleString()}{r.recheck_due ? ` · recheck ${r.recheck_due}` : ""}</div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}

function EvidencePanel({ caseId, rows, onChange }: any) {
  const [f, setF] = useState<any>({ evidence_type: "source_of_funds", summary: "", detail: "", document_reference: "", obtained_from: "", proportionality_note: "" });
  const add = async () => {
    if (!f.summary) { toast.error("Summary required"); return; }
    const { error } = await (supabase as any).from("donor_dd_evidence").insert({ case_id: caseId, ...f });
    if (error) { toast.error(error.message); return; }
    toast.success("Evidence recorded"); setF({ ...f, summary: "", detail: "", document_reference: "" }); onChange();
  };
  return (
    <div className="space-y-4">
      <Card><CardHeader><CardTitle className="text-base">Record evidence</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Type</Label>
              <Select value={f.evidence_type} onValueChange={(v) => setF({ ...f, evidence_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{EVIDENCE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Obtained from</Label><Input value={f.obtained_from} onChange={(e) => setF({ ...f, obtained_from: e.target.value })} /></div>
          </div>
          <div><Label>Summary</Label><Input value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} /></div>
          <div><Label>Detail</Label><Textarea value={f.detail} onChange={(e) => setF({ ...f, detail: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Document reference</Label><Input value={f.document_reference} onChange={(e) => setF({ ...f, document_reference: e.target.value })} /></div>
            <div><Label>Proportionality note</Label><Input value={f.proportionality_note} onChange={(e) => setF({ ...f, proportionality_note: e.target.value })} /></div>
          </div>
          <Button onClick={add}>Record evidence</Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {rows.map((r: any) => (
          <Card key={r.id}><CardContent className="p-3 text-sm">
            <div className="flex justify-between"><span className="font-medium">{r.evidence_type}</span><span className="text-xs text-muted-foreground">{new Date(r.recorded_at).toLocaleString()}</span></div>
            <div>{r.summary}</div>
            {r.detail && <div className="text-xs text-muted-foreground mt-1">{r.detail}</div>}
            {r.document_reference && <div className="text-xs mt-1">Ref: {r.document_reference}</div>}
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}

function HoldsPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [releaseId, setReleaseId] = useState<string | null>(null);
  const [releaseReason, setReleaseReason] = useState("");
  const [finalStatus, setFinalStatus] = useState("released");

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).from("donor_dd_holds").select("*").order("placed_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const release = async () => {
    if (!releaseReason.trim()) { toast.error("Reason required"); return; }
    const { error } = await (supabase as any).rpc("dd_release_hold", {
      _hold_id: releaseId, _release_reason: releaseReason, _final_status: finalStatus,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Hold resolved"); setReleaseId(null); setReleaseReason(""); load();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        A pending or high-risk donation may be held here. Held donations are not treated as available
        project money and cannot be allocated to a project until the hold is resolved.
      </p>
      {loading ? <p className="text-muted-foreground">Loading…</p> : rows.length === 0 ? (
        <Card><CardContent className="p-6 text-muted-foreground">No compliance holds.</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {rows.map((h) => (
            <Card key={h.id}><CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{h.reason}</div>
                <div className="text-xs text-muted-foreground">
                  {fmt(h.amount_minor, h.currency)} · placed {new Date(h.placed_at).toLocaleString()}
                </div>
                {h.release_reason && <div className="text-xs mt-1">Released: {h.release_reason}</div>}
              </div>
              <div className="flex gap-2 items-center">
                <Badge variant={h.status === "active" ? "destructive" : "outline"}>{h.status}</Badge>
                {h.status === "active" && (
                  <Button size="sm" variant="outline" onClick={() => setReleaseId(h.id)}>Resolve</Button>
                )}
              </div>
            </CardContent></Card>
          ))}
        </div>
      )}
      <Dialog open={!!releaseId} onOpenChange={(v) => !v && setReleaseId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Resolve compliance hold</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Final status</Label>
              <Select value={finalStatus} onValueChange={setFinalStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["released","converted_to_return","converted_to_decline"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Reason (required)</Label><Textarea value={releaseReason} onChange={(e) => setReleaseReason(e.target.value)} /></div>
          </div>
          <DialogFooter><Button onClick={release}>Resolve</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
