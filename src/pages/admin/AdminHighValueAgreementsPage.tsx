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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Agreement = {
  id: string;
  reference: string | null;
  donor_display_name: string | null;
  status: string;
  designation_reasons: string[];
  current_version_id: string | null;
  created_at: string;
};

type Version = Record<string, any>;

const REASONS = [
  "amount","donor_profile","restrictions","source_of_funds","complexity",
  "international_features","reputational_risk","payment_schedule","project_dependency",
] as const;

const STATUSES = [
  "draft","due_diligence","trustee_review","legal_review_requested",
  "approved_for_signature","signed","active","completed","terminated",
] as const;

const APPROVAL_TYPES = ["due_diligence","trustee_review","legal_review","approved_for_signature"] as const;
const DECISIONS = ["approved","changes_requested","declined","noted"] as const;

const SECTION_FIELDS: { key: string; label: string; sensitive?: boolean; long?: boolean }[] = [
  { key: "trust_party_name", label: "1a. Trust party name" },
  { key: "donor_party_name", label: "1b. Donor party name" },
  { key: "background", label: "2. Background", long: true },
  { key: "charitable_purpose", label: "3. Charitable purpose", long: true },
  { key: "donation_amount_minor", label: "4. Donation amount (minor units)" },
  { key: "currency", label: "4a. Currency" },
  { key: "payment_schedule_narrative", label: "5. Payment schedule (narrative)", long: true },
  { key: "payment_route", label: "6. Payment route" },
  { key: "conditions_precedent_narrative", label: "7. Conditions precedent (narrative)", long: true },
  { key: "donor_identity_details", label: "8a. Donor identity", sensitive: true, long: true },
  { key: "donor_authority_details", label: "8b. Donor authority", sensitive: true, long: true },
  { key: "beneficial_ownership_details", label: "9. Beneficial ownership", sensitive: true, long: true },
  { key: "source_of_funds_representation", label: "10. Source of funds", sensitive: true, long: true },
  { key: "source_of_wealth_information", label: "11. Source of wealth (proportionate)", sensitive: true, long: true },
  { key: "sanctions_representation", label: "12. Sanctions representation", long: true },
  { key: "anti_fraud_representation", label: "13. Anti-fraud representation", long: true },
  { key: "no_unlawful_or_third_party_funds", label: "14. No unlawful / third-party funds", long: true },
  { key: "intended_project_or_purpose", label: "15. Intended project or purpose", long: true },
  { key: "restriction_details", label: "16. Restriction details (if restricted)", long: true },
  { key: "operating_allocation_pct", label: "17. Operating allocation %" },
  { key: "delivery_allocation_pct", label: "18. Delivery allocation %" },
  { key: "project_budget", label: "19. Project budget", long: true },
  { key: "trustee_discretion_clause", label: "20. Trustee discretion", long: true },
  { key: "no_donor_ownership_or_control_clause", label: "21. No donor ownership/control", long: true },
  { key: "project_changes_clause", label: "22. Project changes", long: true },
  { key: "reallocation_clause", label: "23. Reallocation", long: true },
  { key: "reporting_clause", label: "24. Reporting", long: true },
  { key: "approved_evidence_clause", label: "25. Approved evidence", long: true },
  { key: "beneficiary_privacy_clause", label: "26. Beneficiary privacy", long: true },
  { key: "publicity_and_recognition_clause", label: "27. Publicity and recognition", long: true },
  { key: "confidentiality_clause", label: "28. Confidentiality", long: true },
  { key: "data_protection_clause", label: "29. Data protection", long: true },
  { key: "tax_and_gift_aid_clause", label: "30. Tax and Gift Aid limitations", long: true },
  { key: "warranties_clause", label: "31. Warranties", long: true },
  { key: "suspension_clause", label: "32. Suspension", long: true },
  { key: "refusal_clause", label: "33. Refusal", long: true },
  { key: "return_of_funds_clause", label: "34. Return of funds", long: true },
  { key: "refund_limitations_clause", label: "35. Refund limitations", long: true },
  { key: "termination_clause", label: "36. Termination", long: true },
  { key: "force_majeure_clause", label: "37. Force majeure", long: true },
  { key: "notices_clause", label: "38. Notices", long: true },
  { key: "no_partnership_agency_clause", label: "39. No partnership/agency/investment", long: true },
  { key: "entire_agreement_clause", label: "40. Entire agreement", long: true },
  { key: "amendments_clause", label: "41. Amendments", long: true },
  { key: "governing_law_clause", label: "42. Governing law", long: true },
  { key: "signature_block_notes", label: "43. Signature block notes", long: true },
  { key: "legal_review_firm", label: "Legal review — firm" },
  { key: "legal_review_reference", label: "Legal review — reference" },
  { key: "legal_review_notes", label: "Legal review — notes", long: true },
];

export default function AdminHighValueAgreementsPage() {
  const [rows, setRows] = useState<Agreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("high_value_donation_agreements")
      .select("id,reference,donor_display_name,status,designation_reasons,current_version_id,created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif">High-Value Donation Agreements</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            Restricted to finance/compliance administrators and trustees. Sensitive due-diligence
            fields (identity, beneficial ownership, source of funds and wealth) are never visible
            to donors or general users. Trustee approval must be recorded before signature.
          </p>
        </div>
        <OpenAgreementDialog onDone={load} />
      </div>

      <Card>
        <CardHeader><CardTitle>Cases</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No agreements yet.</p>
          ) : (
            <div className="space-y-2">
              {rows.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className="w-full text-left border rounded p-3 hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs">{r.reference}</div>
                      <div className="text-sm">{r.donor_display_name ?? "—"}</div>
                    </div>
                    <Badge variant="secondary">{r.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Reasons: {r.designation_reasons.join(", ") || "—"}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedId && (
        <AgreementDetail id={selectedId} onClose={() => setSelectedId(null)} onChange={load} />
      )}
    </div>
  );
}

function OpenAgreementDialog({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [notes, setNotes] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (reasons.length === 0) { toast.error("Select at least one designation reason"); return; }
    setSaving(true);
    const { error } = await supabase.rpc("hvda_open", {
      _donor_user_id: null,
      _donor_display_name: donorName || null,
      _related_draft_id: null,
      _related_project_id: null,
      _reasons: reasons as any,
      _designation_notes: notes || null,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Agreement opened");
    setOpen(false); setDonorName(""); setNotes(""); setReasons([]);
    onDone();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Open new agreement</Button></DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Designate a high-value donation</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Donor display name</Label>
            <Input value={donorName} onChange={(e) => setDonorName(e.target.value)} />
          </div>
          <div>
            <Label>Designation reasons</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {REASONS.map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={reasons.includes(r)}
                    onCheckedChange={(v) => setReasons((prev) => v ? [...prev, r] : prev.filter((x) => x !== r))}
                  />
                  {r.replace(/_/g, " ")}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={saving}>Open</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AgreementDetail({ id, onClose, onChange }: { id: string; onClose: () => void; onChange: () => void; }) {
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [signatures, setSignatures] = useState<any[]>([]);
  const [amendments, setAmendments] = useState<any[]>([]);

  const load = async () => {
    const { data: a } = await supabase.from("high_value_donation_agreements")
      .select("*").eq("id", id).maybeSingle();
    setAgreement(a as any);
    if (a?.current_version_id) {
      const { data: v } = await supabase.from("hvda_versions")
        .select("*").eq("id", a.current_version_id).maybeSingle();
      setVersion(v as any);
    }
    const [{ data: ap }, { data: sg }, { data: am }] = await Promise.all([
      supabase.from("hvda_approvals").select("*").eq("agreement_id", id).order("decided_at", { ascending: false }),
      supabase.from("hvda_signatures").select("*").eq("agreement_id", id).order("signed_at", { ascending: false }),
      supabase.from("hvda_amendments").select("*").eq("agreement_id", id).order("created_at", { ascending: false }),
    ]);
    setApprovals(ap ?? []); setSignatures(sg ?? []); setAmendments(am ?? []);
  };

  useEffect(() => { load(); }, [id]);

  const saveField = async (key: string, value: any) => {
    if (!version) return;
    const { error } = await supabase.from("hvda_versions").update({ [key]: value }).eq("id", version.id);
    if (error) toast.error(error.message);
  };

  const setStatus = async (s: string) => {
    const { error } = await supabase.rpc("hvda_set_status", { _agreement_id: id, _new_status: s as any, _note: null });
    if (error) { toast.error(error.message); return; }
    toast.success(`Status → ${s}`);
    await load(); onChange();
  };

  const recordApproval = async (type: string, decision: string, comment: string, reference: string) => {
    const { error } = await supabase.rpc("hvda_record_approval", {
      _agreement_id: id, _approval_type: type as any, _decision: decision as any,
      _comment: comment || null, _reference: reference || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Approval recorded"); await load();
  };

  const recordSignature = async (role: string, name: string, title: string, method: string, evidence: string) => {
    const { error } = await supabase.rpc("hvda_record_signature", {
      _agreement_id: id, _signatory_role: role as any, _signatory_name: name,
      _signatory_title: title || null, _signatory_user_id: null,
      _method: method || "manual", _evidence_reference: evidence || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Signature recorded"); await load();
  };

  const createAmendment = async (reason: string, summary: string) => {
    const { error } = await supabase.rpc("hvda_create_amendment", {
      _agreement_id: id, _reason: reason, _summary: summary,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Amendment version created"); await load(); onChange();
  };

  const previewDonorCopy = async () => {
    const { data, error } = await supabase.rpc("hvda_donor_safe_copy", { _agreement_id: id });
    if (error) { toast.error(error.message); return; }
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<pre style="font-family:ui-monospace,monospace;padding:24px;white-space:pre-wrap">${
        JSON.stringify(data, null, 2).replace(/</g, "&lt;")
      }</pre>`);
      win.document.title = "Donor-safe agreement preview";
    }
  };

  if (!agreement) return null;
  const locked = !!version?.is_locked;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {agreement.reference} — {agreement.donor_display_name ?? "—"}
            <Badge className="ml-2" variant="secondary">{agreement.status}</Badge>
            {locked && <Badge className="ml-2" variant="outline">version locked</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 items-center">
          <Label className="text-xs">Set status</Label>
          <Select onValueChange={setStatus}>
            <SelectTrigger className="w-64"><SelectValue placeholder="Change status" /></SelectTrigger>
            <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <Button variant="outline" onClick={previewDonorCopy}>Preview donor-safe copy</Button>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Agreement template — v{version?.version_number}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Fields marked <em>sensitive</em> are never included in the donor-safe copy or exposed
              outside authorised staff.
            </p>
            {SECTION_FIELDS.map((f) => (
              <div key={f.key}>
                <Label className="text-xs">
                  {f.label}{f.sensitive && <span className="ml-2 text-amber-700 font-medium">sensitive</span>}
                </Label>
                {f.long ? (
                  <Textarea
                    defaultValue={version?.[f.key] ?? ""}
                    disabled={locked}
                    onBlur={(e) => e.target.value !== (version?.[f.key] ?? "") && saveField(f.key, e.target.value || null)}
                  />
                ) : (
                  <Input
                    defaultValue={version?.[f.key] ?? ""}
                    disabled={locked}
                    onBlur={(e) => {
                      const v = e.target.value;
                      const cur = version?.[f.key] ?? "";
                      if (String(v) === String(cur)) return;
                      const parsed = f.key.endsWith("_pct") || f.key === "donation_amount_minor"
                        ? (v === "" ? null : Number(v)) : (v || null);
                      saveField(f.key, parsed);
                    }}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <ApprovalsPanel approvals={approvals} onSubmit={recordApproval} />
        <SignaturesPanel signatures={signatures} onSubmit={recordSignature} />
        <AmendmentsPanel amendments={amendments} onSubmit={createAmendment} />
      </DialogContent>
    </Dialog>
  );
}

function ApprovalsPanel({ approvals, onSubmit }: { approvals: any[]; onSubmit: (t: string, d: string, c: string, r: string) => void; }) {
  const [type, setType] = useState<string>("trustee_review");
  const [decision, setDecision] = useState<string>("approved");
  const [comment, setComment] = useState(""); const [ref, setRef] = useState("");
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Approvals</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{APPROVAL_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={decision} onValueChange={setDecision}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{DECISIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
          <Input placeholder="Supporting reference" value={ref} onChange={(e) => setRef(e.target.value)} />
          <Button onClick={() => { onSubmit(type, decision, comment, ref); setComment(""); setRef(""); }}>
            Record approval
          </Button>
        </div>
        <Textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <div className="space-y-1">
          {approvals.map((a) => (
            <div key={a.id} className="text-xs border rounded p-2">
              <strong>{a.approval_type}</strong> — {a.decision} · {new Date(a.decided_at).toLocaleString()}
              {a.supporting_reference && <> · ref: {a.supporting_reference}</>}
              {a.comment && <div className="mt-1">{a.comment}</div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SignaturesPanel({ signatures, onSubmit }: { signatures: any[]; onSubmit: (role: string, name: string, title: string, method: string, ev: string) => void; }) {
  const [role, setRole] = useState("donor");
  const [name, setName] = useState(""); const [title, setTitle] = useState("");
  const [method, setMethod] = useState("manual"); const [ev, setEv] = useState("");
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Signatures</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="donor">donor</SelectItem><SelectItem value="trust">trust</SelectItem></SelectContent>
          </Select>
          <Input placeholder="Signatory name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Method" value={method} onChange={(e) => setMethod(e.target.value)} />
          <Input placeholder="Evidence ref" value={ev} onChange={(e) => setEv(e.target.value)} />
        </div>
        <Button onClick={() => { if (!name) { toast.error("Name required"); return; } onSubmit(role, name, title, method, ev); setName(""); setTitle(""); setEv(""); }}>
          Record signature
        </Button>
        <div className="space-y-1">
          {signatures.map((s) => (
            <div key={s.id} className="text-xs border rounded p-2">
              <strong>{s.signatory_role}</strong>: {s.signatory_name}
              {s.signatory_title && <> ({s.signatory_title})</>} · {s.method} · {new Date(s.signed_at).toLocaleString()}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AmendmentsPanel({ amendments, onSubmit }: { amendments: any[]; onSubmit: (reason: string, summary: string) => void; }) {
  const [reason, setReason] = useState(""); const [summary, setSummary] = useState("");
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Amendments</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        <Textarea placeholder="Summary of changes" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <Button onClick={() => { if (!reason || !summary) { toast.error("Reason and summary required"); return; } onSubmit(reason, summary); setReason(""); setSummary(""); }}>
          Create amendment version
        </Button>
        <div className="space-y-1">
          {amendments.map((a) => (
            <div key={a.id} className="text-xs border rounded p-2">
              {new Date(a.created_at).toLocaleString()} — <strong>{a.reason}</strong>
              <div>{a.summary_of_changes}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
