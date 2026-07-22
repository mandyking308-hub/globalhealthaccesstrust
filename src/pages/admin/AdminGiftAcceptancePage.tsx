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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const GIFT_TYPES = ["cash","electronic_payment","direct_debit","bank_transfer","foreign_currency","non_cash","conditional","anonymous","third_party","other"] as const;
const CLASSIFICATIONS = ["unclassified","unrestricted","restricted","high_value","refused"] as const;
const STATUSES = ["draft","under_review","pending_decision","decided","actioned","closed"] as const;
const DECISIONS = ["accept","accept_with_conditions","refuse","return","reallocate","suspend","hold"] as const;
const RISK_KEYS = ["conflicts","source_of_funds","sanctions","fraud","reputational","donor_control","private_benefit","third_party","anonymous","international","non_cash_high_risk"];
const CHANGE_TYPES = ["allocate","commit","spend","refund","reallocate","amend","close"] as const;

const fmt = (m: number | null | undefined, cur: string) =>
  m == null ? "—" : new Intl.NumberFormat("en-GB", { style: "currency", currency: cur || "GBP" }).format(m / 100);

export default function AdminGiftAcceptancePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif">Gift Acceptance &amp; Restricted Funds</h1>
        <p className="text-sm text-muted-foreground max-w-3xl mt-1">
          Internal workflow implementing the Gift Acceptance and Restricted Funds Policy. Restricted
          to finance officers, admins and trustees. A donor preference is never a binding
          restriction — a restriction exists only when the trustees expressly accept a specific
          wording, at which point it is written to the canonical restricted-funds ledger.
        </p>
      </div>
      <Tabs defaultValue="proposals">
        <TabsList>
          <TabsTrigger value="proposals">Gift proposals</TabsTrigger>
          <TabsTrigger value="ledger">Restricted-funds ledger</TabsTrigger>
        </TabsList>
        <TabsContent value="proposals" className="mt-4"><ProposalsPanel /></TabsContent>
        <TabsContent value="ledger" className="mt-4"><LedgerPanel /></TabsContent>
      </Tabs>
    </div>
  );
}

// ================================================================
// Proposals
// ================================================================
function ProposalsPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("gift_proposals")
      .select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><NewProposalDialog onDone={load} /></div>
      <Card>
        <CardHeader><CardTitle>Proposals</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p>
            : rows.length === 0 ? <p className="text-sm text-muted-foreground">No gift proposals yet.</p>
            : <div className="space-y-2">
                {rows.map((r) => (
                  <button key={r.id} onClick={() => setSelected(r.id)}
                    className="w-full text-left border rounded p-3 hover:bg-muted/50">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-mono text-xs">{r.reference}</div>
                        <div className="text-sm">{r.donor_display_name ?? "—"} · {fmt(r.amount_minor, r.currency)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{r.gift_type}</Badge>
                        <Badge variant="secondary">{r.classification}</Badge>
                        <Badge>{r.status}</Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>}
        </CardContent>
      </Card>
      {selected && <ProposalDetail id={selected} onClose={() => setSelected(null)} onChange={load} />}
    </div>
  );
}

function NewProposalDialog({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    donor_display_name: "", gift_type: "cash", currency: "GBP",
    amount: "", non_cash_description: "", donor_preference_notes: "",
  });
  const submit = async () => {
    const { error } = await supabase.rpc("gift_proposal_create", {
      _donor_user_id: null, _donor_display_name: form.donor_display_name || null,
      _related_draft_id: null, _related_project_id: null,
      _gift_type: form.gift_type as any, _currency: form.currency || "GBP",
      _amount_minor: form.amount ? Math.round(Number(form.amount) * 100) : null,
      _non_cash_description: form.non_cash_description || null,
      _donor_preference_notes: form.donor_preference_notes || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Proposal opened"); setOpen(false); onDone();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Open new gift proposal</Button></DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle>Open gift proposal</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Donor display name</Label><Input value={form.donor_display_name} onChange={(e) => setForm({ ...form, donor_display_name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Gift type</Label>
              <Select value={form.gift_type} onValueChange={(v) => setForm({ ...form, gift_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{GIFT_TYPES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Currency</Label><Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase().slice(0,3) })} /></div>
          </div>
          <div><Label>Amount (major units, e.g. 500.00)</Label><Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
          <div><Label>Non-cash description (if applicable)</Label><Textarea value={form.non_cash_description} onChange={(e) => setForm({ ...form, non_cash_description: e.target.value })} /></div>
          <div>
            <Label>Donor preference notes</Label>
            <Textarea value={form.donor_preference_notes} onChange={(e) => setForm({ ...form, donor_preference_notes: e.target.value })} />
            <p className="text-xs text-amber-700 mt-1">A donor preference is recorded but is never a legally binding restriction.</p>
          </div>
        </div>
        <DialogFooter><Button onClick={submit}>Open</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProposalDetail({ id, onClose, onChange }: { id: string; onClose: () => void; onChange: () => void; }) {
  const [p, setP] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [wf, setWf] = useState<any>({});
  const [dec, setDec] = useState<any>({
    decision: "accept", decision_reason: "", decision_conditions: "",
    accepted_restriction_wording: "", accepted_restriction_purpose: "", approval_reference: "",
  });

  const load = async () => {
    const { data } = await supabase.from("gift_proposals").select("*").eq("id", id).maybeSingle();
    setP(data);
    setWf({
      classification: data?.classification ?? "unclassified",
      proposed_restriction_wording: data?.proposed_restriction_wording ?? "",
      proposed_restriction_purpose: data?.proposed_restriction_purpose ?? "",
      risk_flags: data?.risk_flags ?? {},
      due_diligence_notes: data?.due_diligence_notes ?? "",
      financial_review_notes: data?.financial_review_notes ?? "",
      project_feasibility_notes: data?.project_feasibility_notes ?? "",
      status: data?.status ?? "draft",
    });
    const { data: ev } = await supabase.from("gift_proposal_events")
      .select("*").eq("proposal_id", id).order("created_at", { ascending: false });
    setEvents(ev ?? []);
  };
  useEffect(() => { load(); }, [id]);

  if (!p) return null;

  const saveWf = async () => {
    const { error } = await supabase.rpc("gift_proposal_update_workflow", {
      _proposal_id: id,
      _classification: wf.classification, _proposed_restriction_wording: wf.proposed_restriction_wording || null,
      _proposed_restriction_purpose: wf.proposed_restriction_purpose || null,
      _risk_flags: wf.risk_flags, _due_diligence_notes: wf.due_diligence_notes || null,
      _financial_review_notes: wf.financial_review_notes || null,
      _project_feasibility_notes: wf.project_feasibility_notes || null,
      _status: wf.status,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Saved"); await load(); onChange();
  };

  const recordDecision = async () => {
    const { error } = await supabase.rpc("gift_proposal_trustee_decision", {
      _proposal_id: id, _decision: dec.decision, _decision_reason: dec.decision_reason,
      _decision_conditions: dec.decision_conditions || null,
      _accepted_restriction_wording: dec.accepted_restriction_wording || null,
      _accepted_restriction_purpose: dec.accepted_restriction_purpose || null,
      _approval_reference: dec.approval_reference || null,
      _related_donation_id: null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Decision recorded"); await load(); onChange();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {p.reference} — {p.donor_display_name ?? "—"}
            <Badge className="ml-2" variant="secondary">{p.classification}</Badge>
            <Badge className="ml-2">{p.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader><CardTitle className="text-base">Gift</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div><strong>Type:</strong> {p.gift_type}</div>
            <div><strong>Amount:</strong> {fmt(p.amount_minor, p.currency)}</div>
            {p.non_cash_description && <div><strong>Non-cash:</strong> {p.non_cash_description}</div>}
            {p.donor_preference_notes && (
              <div className="mt-2 p-2 border rounded bg-amber-50 text-amber-900">
                <div className="text-xs uppercase tracking-wide">Donor preference (not binding)</div>
                <div>{p.donor_preference_notes}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Workflow</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Classification</Label>
                <Select value={wf.classification} onValueChange={(v) => setWf({ ...wf, classification: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CLASSIFICATIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={wf.status} onValueChange={(v) => setWf({ ...wf, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Proposed restriction wording</Label>
              <Textarea value={wf.proposed_restriction_wording}
                onChange={(e) => setWf({ ...wf, proposed_restriction_wording: e.target.value })} />
              <p className="text-xs text-muted-foreground mt-1">
                Proposed only. Not binding until the trustee decision records it.
              </p>
            </div>
            <div><Label>Proposed restriction purpose</Label>
              <Input value={wf.proposed_restriction_purpose}
                onChange={(e) => setWf({ ...wf, proposed_restriction_purpose: e.target.value })} /></div>
            <div>
              <Label>Risk flags</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {RISK_KEYS.map((k) => (
                  <label key={k} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={!!wf.risk_flags?.[k]}
                      onCheckedChange={(v) => setWf({ ...wf, risk_flags: { ...(wf.risk_flags || {}), [k]: !!v } })} />
                    {k.replace(/_/g, " ")}
                  </label>
                ))}
              </div>
            </div>
            <div><Label>Due diligence notes</Label><Textarea value={wf.due_diligence_notes} onChange={(e) => setWf({ ...wf, due_diligence_notes: e.target.value })} /></div>
            <div><Label>Financial review notes</Label><Textarea value={wf.financial_review_notes} onChange={(e) => setWf({ ...wf, financial_review_notes: e.target.value })} /></div>
            <div><Label>Project feasibility notes</Label><Textarea value={wf.project_feasibility_notes} onChange={(e) => setWf({ ...wf, project_feasibility_notes: e.target.value })} /></div>
            <Button onClick={saveWf}>Save workflow</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Trustee decision</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {p.decided_at && (
              <div className="text-xs text-muted-foreground">
                Previous decision: <strong>{p.decision}</strong> · {new Date(p.decided_at).toLocaleString()}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Decision</Label>
                <Select value={dec.decision} onValueChange={(v) => setDec({ ...dec, decision: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DECISIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Approval reference (minute etc.)</Label>
                <Input value={dec.approval_reference} onChange={(e) => setDec({ ...dec, approval_reference: e.target.value })} /></div>
            </div>
            <div><Label>Reason</Label><Textarea value={dec.decision_reason} onChange={(e) => setDec({ ...dec, decision_reason: e.target.value })} /></div>
            <div><Label>Conditions</Label><Textarea value={dec.decision_conditions} onChange={(e) => setDec({ ...dec, decision_conditions: e.target.value })} /></div>
            {wf.classification === "restricted" && (
              <div className="border rounded p-3 space-y-2 bg-muted/30">
                <p className="text-xs text-muted-foreground">
                  A restricted-funds ledger entry will be opened only when accepting a restricted
                  proposal with a specific accepted wording, purpose and approval reference.
                </p>
                <div><Label>Accepted restriction wording</Label>
                  <Textarea value={dec.accepted_restriction_wording}
                    onChange={(e) => setDec({ ...dec, accepted_restriction_wording: e.target.value })} /></div>
                <div><Label>Accepted purpose</Label>
                  <Input value={dec.accepted_restriction_purpose}
                    onChange={(e) => setDec({ ...dec, accepted_restriction_purpose: e.target.value })} /></div>
              </div>
            )}
            <Button onClick={recordDecision}>Record trustee decision</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">History</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {events.map((e) => (
              <div key={e.id} className="text-xs border rounded p-2">
                <strong>{e.event_type}</strong> · {new Date(e.created_at).toLocaleString()}
                <pre className="mt-1 whitespace-pre-wrap">{JSON.stringify(e.detail, null, 2)}</pre>
              </div>
            ))}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// ================================================================
// Restricted-funds ledger
// ================================================================
function LedgerPanel() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("restricted_funds_ledger")
      .select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>Canonical restricted-funds ledger</CardTitle></CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No restricted-funds entries yet. Entries are opened automatically by an accepted, restricted trustee decision.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="text-left p-2">Reference</th>
                    <th className="text-left p-2">Purpose</th>
                    <th className="text-right p-2">Original</th>
                    <th className="text-right p-2">Allocated</th>
                    <th className="text-right p-2">Committed</th>
                    <th className="text-right p-2">Spent</th>
                    <th className="text-right p-2">Refunded</th>
                    <th className="text-right p-2">Reallocated</th>
                    <th className="text-right p-2">Remaining</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t cursor-pointer hover:bg-muted/50" onClick={() => setSelected(r.id)}>
                      <td className="p-2 font-mono">{r.reference}</td>
                      <td className="p-2">{r.purpose}</td>
                      <td className="p-2 text-right">{fmt(r.original_amount_minor, r.currency)}</td>
                      <td className="p-2 text-right">{fmt(r.allocated_minor, r.currency)}</td>
                      <td className="p-2 text-right">{fmt(r.committed_minor, r.currency)}</td>
                      <td className="p-2 text-right">{fmt(r.spent_minor, r.currency)}</td>
                      <td className="p-2 text-right">{fmt(r.refunded_minor, r.currency)}</td>
                      <td className="p-2 text-right">{fmt(r.reallocated_minor, r.currency)}</td>
                      <td className="p-2 text-right font-medium">{fmt(r.remaining_minor, r.currency)}</td>
                      <td className="p-2"><Badge variant="secondary">{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      {selected && <LedgerDetail id={selected} onClose={() => setSelected(null)} onChange={load} />}
    </div>
  );
}

function LedgerDetail({ id, onClose, onChange }: { id: string; onClose: () => void; onChange: () => void; }) {
  const [l, setL] = useState<any>(null);
  const [changes, setChanges] = useState<any[]>([]);
  const [form, setForm] = useState({ change_type: "allocate", amount: "", reason: "", approval_reference: "" });

  const load = async () => {
    const { data } = await supabase.from("restricted_funds_ledger").select("*").eq("id", id).maybeSingle();
    setL(data);
    const { data: c } = await supabase.from("restricted_funds_ledger_changes")
      .select("*").eq("ledger_id", id).order("created_at", { ascending: false });
    setChanges(c ?? []);
  };
  useEffect(() => { load(); }, [id]);

  const apply = async () => {
    const delta = form.change_type === "close" ? 0 : Math.round(Number(form.amount || 0) * 100);
    const { error } = await supabase.rpc("restricted_fund_record_change", {
      _ledger_id: id, _change_type: form.change_type as any,
      _delta_amount_minor: delta, _reason: form.reason,
      _approval_reference: form.approval_reference || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Change recorded"); setForm({ change_type: "allocate", amount: "", reason: "", approval_reference: "" });
    await load(); onChange();
  };

  if (!l) return null;
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{l.reference} <Badge className="ml-2" variant="secondary">{l.status}</Badge></DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader><CardTitle className="text-base">Accepted restriction</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div><strong>Purpose:</strong> {l.purpose}</div>
            <div className="whitespace-pre-wrap">{l.accepted_restriction}</div>
            <div className="text-xs text-muted-foreground mt-1">Approval reference: {l.approval_reference}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Balances</CardTitle></CardHeader>
          <CardContent className="text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>Original: <strong>{fmt(l.original_amount_minor, l.currency)}</strong></div>
            <div>Allocated: {fmt(l.allocated_minor, l.currency)}</div>
            <div>Committed: {fmt(l.committed_minor, l.currency)}</div>
            <div>Spent: {fmt(l.spent_minor, l.currency)}</div>
            <div>Refunded: {fmt(l.refunded_minor, l.currency)}</div>
            <div>Reallocated: {fmt(l.reallocated_minor, l.currency)}</div>
            <div>Remaining: <strong>{fmt(l.remaining_minor, l.currency)}</strong></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Record a change</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Select value={form.change_type} onValueChange={(v) => setForm({ ...form, change_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CHANGE_TYPES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Input placeholder="Amount (major)" type="number" step="0.01" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })} disabled={form.change_type === "close"} />
              <Input placeholder="Approval reference (required for refund/reallocate)"
                value={form.approval_reference} onChange={(e) => setForm({ ...form, approval_reference: e.target.value })} />
              <Button onClick={apply}>Apply</Button>
            </div>
            <Textarea placeholder="Reason (required)" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Change history</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {changes.map((c) => (
              <div key={c.id} className="text-xs border rounded p-2">
                <div><strong>{c.change_type}</strong> · {fmt(c.delta_amount_minor, l.currency)} · {new Date(c.created_at).toLocaleString()}</div>
                <div className="mt-1">{c.reason}</div>
                {c.approval_reference && <div className="text-muted-foreground">Approval: {c.approval_reference}</div>}
              </div>
            ))}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
