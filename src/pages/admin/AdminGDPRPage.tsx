import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const fmt = (v: any) => (v ? new Date(v).toLocaleDateString("en-GB") : "—");
const fmtDT = (v: any) => (v ? new Date(v).toLocaleString("en-GB") : "—");
const StatusBadge = ({ s }: { s?: string | null }) =>
  <Badge variant="outline" className="capitalize">{(s ?? "—").replace(/_/g, " ")}</Badge>;

/* ============================================================
   1. OVERVIEW
   ============================================================ */
const OverviewTab = () => {
  const [counts, setCounts] = useState({
    requests_open: 0, requests_overdue: 0,
    activities_draft: 0, providers: 0, transfers: 0,
    holds_active: 0, reviews_due: 0, retention_rules: 0,
  });
  useEffect(() => {
    (async () => {
      const [r1, r2, r3, r4, r5, r6, r7, r8] = await Promise.all([
        supabase.from("gdpr_requests").select("id", { count: "exact", head: true }).not("status", "in", "(completed,refused,withdrawn)"),
        supabase.from("gdpr_requests").select("id", { count: "exact", head: true }).lt("due_at", new Date().toISOString()).not("status", "in", "(completed,refused,withdrawn)"),
        supabase.from("privacy_processing_activities").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("privacy_service_providers").select("id", { count: "exact", head: true }),
        supabase.from("privacy_international_transfers").select("id", { count: "exact", head: true }),
        supabase.from("privacy_retention_holds").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("privacy_retention_reviews").select("id", { count: "exact", head: true }).eq("status", "due"),
        supabase.from("privacy_retention_rules").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        requests_open: r1.count ?? 0,
        requests_overdue: r2.count ?? 0,
        activities_draft: r3.count ?? 0,
        providers: r4.count ?? 0,
        transfers: r5.count ?? 0,
        holds_active: r6.count ?? 0,
        reviews_due: r7.count ?? 0,
        retention_rules: r8.count ?? 0,
      });
    })();
  }, []);
  const tile = (label: string, value: number, sub?: string) => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-serif mt-2">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tile("Rights requests open", counts.requests_open)}
        {tile("Overdue", counts.requests_overdue, "past due date")}
        {tile("Activities in draft", counts.activities_draft)}
        {tile("Retention rules", counts.retention_rules, "seeded from Privacy Notice §18")}
        {tile("Providers on register", counts.providers)}
        {tile("International transfers", counts.transfers)}
        {tile("Active retention holds", counts.holds_active)}
        {tile("Reviews due", counts.reviews_due)}
      </div>
      <Card>
        <CardHeader><CardTitle className="font-serif">About this area</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>This is the Trust's internal privacy and records centre. It preserves the earlier data-access-request queue while adding processing activities, service providers, international transfers, retention rules, holds, review queue, rights requests and the legal-events audit trail.</p>
          <p>No records are ever deleted automatically. Retention reviews propose actions for a person to confirm.</p>
          <p>Privacy Notice, Cookie Notice and Terms are managed in the <Link to="/admin/legal" className="underline">Legal Centre</Link>.</p>
        </CardContent>
      </Card>
    </div>
  );
};

/* ============================================================
   2. PROCESSING ACTIVITIES
   ============================================================ */
const ProcessingTab = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<any | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("privacy_processing_activities").select("*").order("activity_code");
    setRows(data ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!edit) return;
    const { id, created_at, updated_at, ...patch } = edit;
    const { error } = await supabase.from("privacy_processing_activities").update(patch).eq("id", id);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved" }); setEdit(null); load(); }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="font-serif">Record of Processing Activities</CardTitle></CardHeader>
      <CardContent>
        {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Code</TableHead><TableHead>Activity</TableHead>
              <TableHead>Risk</TableHead><TableHead>Status</TableHead>
              <TableHead>Next review</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.activity_code}</TableCell>
                <TableCell>{r.activity_name}</TableCell>
                <TableCell><StatusBadge s={r.risk_level} /></TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
                <TableCell>{fmt(r.next_review_at)}</TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => setEdit(r)}>Edit</Button></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
        <Dialog open={!!edit} onOpenChange={o => !o && setEdit(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Edit processing activity</DialogTitle>
              <DialogDescription>{edit?.activity_code}</DialogDescription></DialogHeader>
            {edit && (
              <div className="space-y-3">
                <div><Label>Activity name</Label>
                  <Input value={edit.activity_name ?? ""} onChange={e => setEdit({ ...edit, activity_name: e.target.value })} /></div>
                <div><Label>Description</Label>
                  <Textarea value={edit.description ?? ""} onChange={e => setEdit({ ...edit, description: e.target.value })} /></div>
                <div><Label>Purpose</Label>
                  <Textarea value={edit.purpose ?? ""} onChange={e => setEdit({ ...edit, purpose: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Risk level</Label>
                    <Select value={edit.risk_level} onValueChange={v => setEdit({ ...edit, risk_level: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["low","medium","high","very_high"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select></div>
                  <div><Label>Status</Label>
                    <Select value={edit.status} onValueChange={v => setEdit({ ...edit, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["draft","active","under_review","retired"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select></div>
                </div>
                <div><Label>Security measures summary</Label>
                  <Textarea value={edit.security_measures_summary ?? ""} onChange={e => setEdit({ ...edit, security_measures_summary: e.target.value })} /></div>
              </div>
            )}
            <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button onClick={save}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

/* ============================================================
   3. SERVICE PROVIDERS
   ============================================================ */
const ProvidersTab = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ provider_name: "", provider_role: "processor", contract_status: "not_started", security_review_status: "not_started", status: "prospective" });
  const load = async () => setRows((await supabase.from("privacy_service_providers").select("*").order("provider_name")).data ?? []);
  useEffect(() => { load(); }, []);
  const save = async () => {
    if (!form.provider_name) return toast({ title: "Name required", variant: "destructive" });
    const { error } = await supabase.from("privacy_service_providers").insert(form);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Added" }); setOpen(false); setForm({ provider_name: "", provider_role: "processor", contract_status: "not_started", security_review_status: "not_started", status: "prospective" }); load(); }
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif">Service providers & processors</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>Add provider</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add provider</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Provider name</Label><Input value={form.provider_name} onChange={e => setForm({ ...form, provider_name: e.target.value })} /></div>
              <div><Label>Role</Label>
                <Select value={form.provider_role} onValueChange={v => setForm({ ...form, provider_role: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["processor","independent_controller","joint_controller","professional_adviser","other"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Service description</Label><Textarea value={form.service_description ?? ""} onChange={e => setForm({ ...form, service_description: e.target.value })} /></div>
            </div>
            <DialogFooter><Button onClick={save}>Add</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No providers recorded yet. Add each provider you use for processing personal data.</p>
        ) : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Provider</TableHead><TableHead>Role</TableHead><TableHead>Contract</TableHead><TableHead>Security review</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.provider_name}</TableCell>
                <TableCell><StatusBadge s={r.provider_role} /></TableCell>
                <TableCell><StatusBadge s={r.contract_status} /></TableCell>
                <TableCell><StatusBadge s={r.security_review_status} /></TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* ============================================================
   4. INTERNATIONAL TRANSFERS
   ============================================================ */
const TransfersTab = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ recipient_name: "", recipient_role: "processor", transfer_mechanism: "not_yet_determined", status: "proposed" });
  const load = async () => setRows((await supabase.from("privacy_international_transfers").select("*").order("created_at", { ascending: false })).data ?? []);
  useEffect(() => { load(); }, []);
  const save = async () => {
    if (!form.recipient_name) return toast({ title: "Recipient required", variant: "destructive" });
    const { data: refData } = await supabase.rpc("generate_transfer_reference");
    const { error } = await supabase.from("privacy_international_transfers").insert({ ...form, transfer_reference: refData as string });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Added" }); setOpen(false); load(); }
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif">International transfers</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>Add transfer</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add international transfer</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Recipient name</Label><Input value={form.recipient_name} onChange={e => setForm({ ...form, recipient_name: e.target.value })} /></div>
              <div><Label>Destination country</Label><Input value={form.destination_country ?? ""} onChange={e => setForm({ ...form, destination_country: e.target.value })} /></div>
              <div><Label>Purpose</Label><Textarea value={form.purpose ?? ""} onChange={e => setForm({ ...form, purpose: e.target.value })} /></div>
              <div><Label>Transfer mechanism</Label>
                <Select value={form.transfer_mechanism} onValueChange={v => setForm({ ...form, transfer_mechanism: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["adequacy","UK_IDTA","UK_Addendum","binding_corporate_rules","statutory_instrument","permitted_exception","not_yet_determined"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select></div>
            </div>
            <DialogFooter><Button onClick={save}>Add</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">No international transfers recorded.</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Reference</TableHead><TableHead>Recipient</TableHead><TableHead>Country</TableHead><TableHead>Mechanism</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.transfer_reference}</TableCell>
                <TableCell>{r.recipient_name}</TableCell>
                <TableCell>{r.destination_country ?? "—"}</TableCell>
                <TableCell><StatusBadge s={r.transfer_mechanism} /></TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* ============================================================
   5. RETENTION SCHEDULE
   ============================================================ */
const RetentionTab = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("privacy_retention_rules").select("*").order("rule_code").then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <Card>
      <CardHeader><CardTitle className="font-serif">Retention schedule</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Seeded from Privacy Notice §18. All periods trigger a review — nothing is deleted automatically.</p>
        <Table>
          <TableHeader><TableRow>
            <TableHead>Code</TableHead><TableHead>Category</TableHead><TableHead>Period</TableHead><TableHead>Action</TableHead><TableHead>Auto-delete</TableHead>
          </TableRow></TableHeader>
          <TableBody>{rows.map(r => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-xs">{r.rule_code}</TableCell>
              <TableCell>{r.record_category}</TableCell>
              <TableCell>{r.default_retention_value ? `${r.default_retention_value} ${r.default_retention_unit}` : r.default_retention_unit}</TableCell>
              <TableCell><StatusBadge s={r.ordinary_action} /></TableCell>
              <TableCell>{r.automatic_deletion_allowed ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

/* ============================================================
   6. RETENTION HOLDS
   ============================================================ */
const HoldsTab = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ scope_type: "individual", reason: "litigation", detailed_reason: "" });
  const load = async () => setRows((await supabase.from("privacy_retention_holds").select("*").order("applied_at", { ascending: false })).data ?? []);
  useEffect(() => { load(); }, []);
  const save = async () => {
    const { data: ref } = await supabase.rpc("generate_hold_reference");
    const { error } = await supabase.from("privacy_retention_holds").insert({ ...form, hold_reference: ref as string });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Hold applied" }); setOpen(false); load(); }
  };
  const release = async (id: string) => {
    const reason = prompt("Reason for releasing this hold?"); if (!reason) return;
    const { error } = await supabase.from("privacy_retention_holds").update({ status: "released", released_at: new Date().toISOString(), release_reason: reason }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else load();
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif">Retention holds</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>Apply hold</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Apply retention hold</DialogTitle>
              <DialogDescription>Holds block deletion or anonymisation of any linked record until released.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div><Label>Scope</Label>
                <Select value={form.scope_type} onValueChange={v => setForm({ ...form, scope_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["individual","user","project","donation","complaint","service_request","safeguarding_case","data_category","system","other"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Reason</Label>
                <Select value={form.reason} onValueChange={v => setForm({ ...form, reason: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["litigation","threatened_claim","investigation","safeguarding","regulatory_request","fraud","audit","protected_concern","legal_advice","other"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Detailed reason</Label><Textarea value={form.detailed_reason} onChange={e => setForm({ ...form, detailed_reason: e.target.value })} /></div>
            </div>
            <DialogFooter><Button onClick={save}>Apply hold</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">No holds currently in place.</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Reference</TableHead><TableHead>Scope</TableHead><TableHead>Reason</TableHead><TableHead>Applied</TableHead><TableHead>Status</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.hold_reference}</TableCell>
                <TableCell><StatusBadge s={r.scope_type} /></TableCell>
                <TableCell><StatusBadge s={r.reason} /></TableCell>
                <TableCell>{fmt(r.applied_at)}</TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
                <TableCell>{r.status === "active" && <Button size="sm" variant="outline" onClick={() => release(r.id)}>Release</Button>}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* ============================================================
   7. RETENTION REVIEWS
   ============================================================ */
const ReviewsTab = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { supabase.from("privacy_retention_reviews").select("*").order("review_due_at", { nullsFirst: false }).then(({ data }) => setRows(data ?? [])); }, []);
  return (
    <Card>
      <CardHeader><CardTitle className="font-serif">Retention review queue</CardTitle></CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">The queue is empty. Reviews are added when records reach the trigger period defined by the retention schedule. Reviews propose an action for a person to confirm; no records are deleted automatically.</p>
        ) : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Reference</TableHead><TableHead>Record</TableHead><TableHead>Due</TableHead><TableHead>Sensitivity</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.review_reference}</TableCell>
                <TableCell>{r.record_summary ?? r.record_type}</TableCell>
                <TableCell>{fmt(r.review_due_at)}</TableCell>
                <TableCell><StatusBadge s={r.sensitivity} /></TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* ============================================================
   8. RIGHTS REQUESTS (extended gdpr_requests)
   ============================================================ */
const RightsTab = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [detail, setDetail] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const load = async () => setRows((await supabase.from("gdpr_requests").select("*").order("received_at", { ascending: false, nullsFirst: false })).data ?? []);
  useEffect(() => { load(); }, []);
  const openDetail = async (r: any) => {
    setDetail(r);
    const { data } = await supabase.from("gdpr_request_events").select("*").eq("request_id", r.id).order("created_at");
    setEvents(data ?? []);
  };
  const patch = async (fields: any, eventType: string, eventDetail: any = {}) => {
    if (!detail) return;
    const { error } = await supabase.from("gdpr_requests").update(fields).eq("id", detail.id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    await supabase.rpc("rr_add_event", { _request_id: detail.id, _event_type: eventType, _detail: eventDetail });
    toast({ title: "Updated" }); load(); openDetail({ ...detail, ...fields });
  };
  const startClock = async () => {
    if (!detail) return;
    const now = new Date().toISOString();
    const { error } = await supabase.rpc("rr_set_clock_start", { _request_id: detail.id, _start: now });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    load(); openDetail({ ...detail, clock_start_at: now });
  };
  const extend = async () => {
    if (!detail) return;
    const reason = prompt("Reason for extension?"); if (!reason) return;
    const months = Number(prompt("Extend by how many months? (1 or 2)", "1"));
    const { error } = await supabase.rpc("rr_apply_extension", { _request_id: detail.id, _reason: reason, _months: months });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Extension applied", description: "Now record the notification to the requester using \"Record extension notice\"." });
    load(); openDetail(detail);
  };
  const recordExtNotice = async () => {
    if (!detail) return;
    if (!detail.extension_applied) return toast({ title: "Apply an extension first", variant: "destructive" });
    const channel = prompt("Channel? portal / secure_email / post / telephone_confirmed / other", "secure_email");
    if (!channel) return;
    const note = prompt("Optional note (leave blank to skip)", "") || null;
    const { error } = await supabase.rpc("rr_record_extension_notification", {
      _request_id: detail.id, _notified_at: new Date().toISOString(), _channel: channel, _note: note,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Notification recorded" });
    load(); openDetail(detail);
  };


  return (
    <Card>
      <CardHeader><CardTitle className="font-serif">Data-protection rights requests</CardTitle></CardHeader>
      <CardContent>
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">No requests received.</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Reference</TableHead><TableHead>Type</TableHead><TableHead>Received</TableHead><TableHead>Due</TableHead><TableHead>Status</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>{rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.reference_number ?? r.id.slice(0,8)}</TableCell>
                <TableCell><StatusBadge s={r.request_type} /></TableCell>
                <TableCell>{fmt(r.received_at ?? r.created_at)}</TableCell>
                <TableCell>{fmt(r.extended_due_at ?? r.due_at)}</TableCell>
                <TableCell><StatusBadge s={r.status} /></TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => openDetail(r)}>Open</Button></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}

        <Dialog open={!!detail} onOpenChange={o => !o && setDetail(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            {detail && (
              <>
                <DialogHeader>
                  <DialogTitle>{detail.reference_number ?? "Request"}</DialogTitle>
                  <DialogDescription>{detail.request_type} · received {fmt(detail.received_at ?? detail.created_at)}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><strong>Name:</strong> {detail.requester_name || "—"}</div>
                    <div><strong>Contact:</strong> {detail.requester_contact ?? detail.email ?? "—"}</div>
                    <div><strong>Representative:</strong> {detail.representative_name || "—"}</div>
                    <div><strong>Channel:</strong> {detail.channel ?? "—"}</div>
                    <div><strong>Identity:</strong> <StatusBadge s={detail.identity_status} /></div>
                    <div><strong>Status:</strong> <StatusBadge s={detail.status} /></div>
                    <div><strong>Due:</strong> {fmt(detail.due_at)}</div>
                    <div><strong>Extended due:</strong> {fmt(detail.extended_due_at)}</div>
                  </div>

                  {(() => {
                    const warns: string[] = [];
                    const eff = detail.extended_due_at ?? detail.due_at;
                    if (eff) {
                      const ms = new Date(eff).getTime() - Date.now();
                      const days = ms / 86400000;
                      if (days < 0) warns.push("Overdue");
                      else if (days < 3) warns.push("Due within 3 days");
                      else if (days < 7) warns.push("Due within 7 days");
                    }
                    if (detail.extension_applied && !detail.extension_notified_at) warns.push("Extension applied but notification not recorded");
                    if (detail.identity_status === "requested" && !detail.identity_verified_at) warns.push("Identity requested but not resolved");
                    if (detail.clock_paused_at && !detail.pause_reason) warns.push("Clock paused without a reason");
                    if (["completed","refused","refused_in_part"].includes(detail.status) && !detail.secure_delivery_method) warns.push("Completed without secure-delivery information");
                    return warns.length ? (
                      <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm">
                        <strong>Attention:</strong> {warns.join(" · ")}
                      </div>
                    ) : null;
                  })()}

                  <div><Label>Request description</Label><Textarea readOnly value={detail.request_details ?? ""} rows={3} /></div>


                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => patch({ identity_status: "requested", identity_requested_at: new Date().toISOString() }, "identity_requested")}>Request identity</Button>
                    <Button size="sm" variant="outline" onClick={() => patch({ identity_status: "verified", identity_verified_at: new Date().toISOString() }, "identity_verified")}>Mark identity verified</Button>
                    <Button size="sm" variant="outline" onClick={startClock}>Start clock</Button>
                    <Button size="sm" variant="outline" onClick={extend}>Apply extension</Button>
                    <Button size="sm" variant="outline" onClick={recordExtNotice} disabled={!detail.extension_applied}>Record extension notice</Button>
                    <Button size="sm" variant="outline" onClick={() => patch({ status: "searching" }, "status_change", { to: "searching" })}>Begin search</Button>
                    <Button size="sm" variant="outline" onClick={() => patch({ status: "response_ready" }, "response_ready")}>Response ready</Button>

                    <Button size="sm" onClick={() => patch({ status: "completed", decision: "fulfil", completed_at: new Date().toISOString() }, "completed", { decision: "fulfil" })}>Complete – fulfil</Button>
                    <Button size="sm" variant="destructive" onClick={() => {
                      const reason = prompt("Refusal reason?"); if (!reason) return;
                      patch({ status: "refused", decision: "refuse", completed_at: new Date().toISOString(), response_summary: reason }, "refused", { reason });
                    }}>Refuse</Button>
                  </div>

                  <div>
                    <Label>Internal notes (not shown to the requester)</Label>
                    <Textarea value={detail.internal_notes ?? ""} rows={3}
                      onChange={e => setDetail({ ...detail, internal_notes: e.target.value })}
                      onBlur={() => patch({ internal_notes: detail.internal_notes }, "note_updated")} />
                  </div>

                  <div>
                    <h4 className="font-serif text-lg mb-2">History</h4>
                    {events.length === 0 ? <p className="text-sm text-muted-foreground">No events yet.</p> : (
                      <ul className="space-y-1 text-sm">
                        {events.map(e => (
                          <li key={e.id} className="flex gap-3">
                            <span className="text-muted-foreground w-40">{fmtDT(e.created_at)}</span>
                            <span className="font-medium">{e.event_type}</span>
                            <span className="text-muted-foreground">{e.actor_role}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

/* ============================================================
   9. LEGAL EVENTS (uses existing legal_acceptances table)
   ============================================================ */
const LegalEventsTab = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("legal_acceptances")
      .select("id, event_type, acceptance_context, role, created_at, document_id, version_id, user_id, legal_documents(title, slug), legal_document_versions(version_number)")
      .order("created_at", { ascending: false }).limit(200)
      .then(({ data }) => setRows(data ?? []));
  }, []);
  return (
    <Card>
      <CardHeader><CardTitle className="font-serif">Legal events ledger</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Most recent 200 events. This is the immutable record of user acceptances and acknowledgements for versioned legal documents.</p>
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">No events recorded.</p> : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>When</TableHead><TableHead>Document</TableHead><TableHead>Version</TableHead><TableHead>Event</TableHead><TableHead>Context</TableHead><TableHead>Role</TableHead>
            </TableRow></TableHeader>
            <TableBody>{rows.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell>{fmtDT(r.created_at)}</TableCell>
                <TableCell>{r.legal_documents?.title ?? r.document_id?.slice(0,8)}</TableCell>
                <TableCell>{r.legal_document_versions?.version_number ?? "—"}</TableCell>
                <TableCell><StatusBadge s={r.event_type} /></TableCell>
                <TableCell><StatusBadge s={r.acceptance_context} /></TableCell>
                <TableCell><StatusBadge s={r.role} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

/* ============================================================
   PAGE
   ============================================================ */
export const AdminGDPRPage = () => {
  return (
    <>
      <SEO title="Privacy & Records | Admin" description="Administrative privacy, retention and rights-request centre." />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-serif">Privacy & Records</h1>
          <p className="text-muted-foreground">Rights requests, processing register, providers, transfers, retention and legal events. Admin only.</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Processing Activities</TabsTrigger>
            <TabsTrigger value="providers">Service Providers</TabsTrigger>
            <TabsTrigger value="transfers">International Transfers</TabsTrigger>
            <TabsTrigger value="retention">Retention Schedule</TabsTrigger>
            <TabsTrigger value="holds">Retention Holds</TabsTrigger>
            <TabsTrigger value="reviews">Retention Reviews</TabsTrigger>
            <TabsTrigger value="rights">Rights Requests</TabsTrigger>
            <TabsTrigger value="events">Legal Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="activities"><ProcessingTab /></TabsContent>
          <TabsContent value="providers"><ProvidersTab /></TabsContent>
          <TabsContent value="transfers"><TransfersTab /></TabsContent>
          <TabsContent value="retention"><RetentionTab /></TabsContent>
          <TabsContent value="holds"><HoldsTab /></TabsContent>
          <TabsContent value="reviews"><ReviewsTab /></TabsContent>
          <TabsContent value="rights"><RightsTab /></TabsContent>
          <TabsContent value="events"><LegalEventsTab /></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminGDPRPage;
