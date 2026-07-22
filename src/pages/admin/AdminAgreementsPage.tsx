import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AgreementView } from "@/components/agreement/AgreementView";
import { AgreementDecisionBar } from "@/components/agreement/AgreementDecisionBar";

const AdminAgreementsPage = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [agreement, setAgreement] = useState<any>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [currentVersion, setCurrentVersion] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [changeRequests, setChangeRequests] = useState<any[]>([]);
  const [draft, setDraft] = useState<any>({});

  const loadProjects = async () => {
    const { data } = await supabase.from("commissioned_projects").select("id,title,donor_id").order("created_at", { ascending: false });
    setProjects(data || []);
    if (data && data.length && !selectedProject) setSelectedProject(data[0].id);
  };

  const loadAgreement = async (projectId: string) => {
    let { data: ag } = await supabase.from("project_agreements").select("*").eq("project_id", projectId).maybeSingle();
    if (!ag) {
      const { data: created } = await supabase.from("project_agreements").insert({ project_id: projectId }).select("*").single();
      ag = created;
    }
    setAgreement(ag);

    const { data: vs } = await supabase.from("project_agreement_versions").select("*").eq("agreement_id", ag!.id).order("version_number", { ascending: false });
    setVersions(vs || []);
    const cur = ag?.current_version_id ? (vs || []).find((v: any) => v.id === ag!.current_version_id) : null;
    setCurrentVersion(cur || null);

    if (cur) {
      const [{ data: ms }, { data: ds }] = await Promise.all([
        supabase.from("project_agreement_milestones").select("*").eq("version_id", cur.id).order("sequence"),
        supabase.from("project_agreement_decisions").select("*").eq("version_id", cur.id).order("decided_at", { ascending: false }),
      ]);
      setMilestones(ms || []);
      setDecisions(ds || []);
    } else { setMilestones([]); setDecisions([]); }

    const { data: crs } = await supabase.from("project_change_requests").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    setChangeRequests(crs || []);
  };

  useEffect(() => { loadProjects(); }, []);
  useEffect(() => { if (selectedProject) loadAgreement(selectedProject); /* eslint-disable-next-line */ }, [selectedProject]);

  const createDraftVersion = async () => {
    if (!agreement) return;
    const nextNum = (versions[0]?.version_number || 0) + 1;
    const project = projects.find((p) => p.id === selectedProject);
    const { data: v, error } = await supabase.from("project_agreement_versions").insert({
      agreement_id: agreement.id,
      project_id: selectedProject!,
      version_number: nextNum,
      title: draft.title || project?.title || "Project Charter",
      purpose: draft.purpose || null,
      intended_outcomes: draft.intended_outcomes || null,
      safe_location: draft.safe_location || null,
      scope: draft.scope || null,
      exclusions: draft.exclusions || null,
      deliverables: draft.deliverables || null,
      beneficiary_group: draft.beneficiary_group || null,
      funding_target: draft.funding_target ? Number(draft.funding_target) : null,
      gross_donation: draft.gross_donation ? Number(draft.gross_donation) : null,
      operating_allocation: draft.operating_allocation ? Number(draft.operating_allocation) : null,
      delivery_allocation: draft.delivery_allocation ? Number(draft.delivery_allocation) : null,
      planned_start: draft.planned_start || null,
      planned_completion: draft.planned_completion || null,
      expected_duration: draft.expected_duration || null,
      reporting_frequency: draft.reporting_frequency || null,
      first_report_due: draft.first_report_due || null,
      evidence_requirements: draft.evidence_requirements || null,
      financial_reporting: draft.financial_reporting || null,
      communication_arrangements: draft.communication_arrangements || null,
      dependencies: draft.dependencies || null,
      risks_private: draft.risks_private || null,
      escalation_procedure: draft.escalation_procedure || null,
      change_control_procedure: draft.change_control_procedure || null,
      complaint_procedure: draft.complaint_procedure || null,
      safeguarding_route: draft.safeguarding_route || null,
      confidentiality_terms: draft.confidentiality_terms || null,
      donor_visible_status: draft.donor_visible_status || null,
    }).select("*").single();
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }

    await supabase.from("project_agreements").update({
      current_version_id: v!.id, status: "draft",
    }).eq("id", agreement.id);

    toast({ title: `Version ${nextNum} drafted` });
    setDraft({});
    loadAgreement(selectedProject!);
  };

  const issueVersion = async () => {
    if (!agreement) return;
    const { error } = await supabase.rpc("admin_issue_agreement_version", { _agreement_id: agreement.id });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: "Issued to donor and Project Team" });
    loadAgreement(selectedProject!);
  };

  const decideChange = async (id: string, status: "approved" | "rejected", reason?: string) => {
    const patch: any = { status, decision_reason: reason || null };
    if (status === "approved") { patch.approved_at = new Date().toISOString(); }
    const { error } = await supabase.from("project_change_requests").update(patch).eq("id", id);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    loadAgreement(selectedProject!);
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
      <Helmet><title>Agreements | GHAT Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Agreement Approvals</span>
        <h1 className="font-serif text-4xl mt-1">Project Charters & Delivery Agreements</h1>
      </div>

      <div className="mb-4">
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Project</label>
        <select value={selectedProject || ""} onChange={(e) => setSelectedProject(e.target.value)}
          className="ml-2 border rounded px-2 py-1 text-sm">
          {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>

      {agreement && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-serif text-2xl">Current version</h2>
                <Badge>{agreement.status}</Badge>
              </div>
              {currentVersion ? (
                <>
                  <AgreementView agreement={currentVersion} milestones={milestones} />
                  {!currentVersion.issued_at && (
                    <Button className="mt-4" onClick={issueVersion}>Issue to donor and team</Button>
                  )}
                  {currentVersion.issued_at && !currentVersion.is_trust_approved && (
                    <div className="mt-4">
                      <AgreementDecisionBar versionId={currentVersion.id} role="trust" onDecided={() => loadAgreement(selectedProject!)} />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No current version — draft one on the right.</p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-serif text-xl mb-3">Decisions on current version</h3>
              {decisions.length === 0 ? <p className="text-sm text-muted-foreground">None yet.</p> : (
                <ul className="space-y-2">
                  {decisions.map((d) => (
                    <li key={d.id} className="border rounded p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge>{d.decision}</Badge>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">{d.role}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{new Date(d.decided_at).toLocaleString()}</span>
                      </div>
                      {d.comment && <p className="mt-1 whitespace-pre-wrap">{d.comment}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-serif text-xl mb-3">Change requests</h3>
              {changeRequests.length === 0 ? <p className="text-sm text-muted-foreground">None.</p> : (
                <ul className="space-y-2">
                  {changeRequests.map((c) => (
                    <li key={c.id} className="border rounded p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge>{c.status}</Badge>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.field}</span>
                      </div>
                      <p className="mt-1">{c.reason}</p>
                      {c.status === "proposed" && (
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={() => decideChange(c.id, "approved", "Approved by Trust")}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => decideChange(c.id, "rejected", "Declined by Trust")}>Reject</Button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="font-serif text-2xl mb-4">Draft new version</h2>
            <div className="space-y-3">
              {[
                ["title", "Title", "input"],
                ["purpose", "Purpose", "textarea"],
                ["intended_outcomes", "Intended outcomes", "textarea"],
                ["safe_location", "Location (safe level)", "input"],
                ["scope", "Scope", "textarea"],
                ["exclusions", "Exclusions from scope", "textarea"],
                ["deliverables", "Deliverables", "textarea"],
                ["beneficiary_group", "Beneficiary group", "input"],
                ["funding_target", "Funding target (GBP)", "input"],
                ["gross_donation", "Donor's gross donation (GBP)", "input"],
                ["operating_allocation", "Trust operating allocation (GBP)", "input"],
                ["delivery_allocation", "Project delivery allocation (GBP)", "input"],
                ["planned_start", "Planned start", "date"],
                ["planned_completion", "Planned completion", "date"],
                ["expected_duration", "Expected duration", "input"],
                ["reporting_frequency", "Reporting frequency", "input"],
                ["first_report_due", "First report due", "date"],
                ["evidence_requirements", "Evidence requirements", "textarea"],
                ["financial_reporting", "Financial reporting", "textarea"],
                ["communication_arrangements", "Communication arrangements", "textarea"],
                ["dependencies", "Known dependencies", "textarea"],
                ["risks_private", "Known risks (private)", "textarea"],
                ["escalation_procedure", "Escalation procedure", "textarea"],
                ["change_control_procedure", "Change-control procedure", "textarea"],
                ["complaint_procedure", "Complaint procedure", "textarea"],
                ["safeguarding_route", "Safeguarding route", "textarea"],
                ["confidentiality_terms", "Confidentiality & data-protection terms", "textarea"],
                ["donor_visible_status", "Donor-visible status", "input"],
              ].map(([k, l, t]) => (
                <div key={k as string}>
                  <Label className="text-xs uppercase tracking-widest">{l as string}</Label>
                  {t === "textarea"
                    ? <Textarea rows={2} value={draft[k as string] || ""} onChange={(e) => setDraft({ ...draft, [k as string]: e.target.value })} />
                    : <Input type={t as string} value={draft[k as string] || ""} onChange={(e) => setDraft({ ...draft, [k as string]: e.target.value })} />}
                </div>
              ))}
              <Button className="mt-4" onClick={createDraftVersion}>Save draft version</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminAgreementsPage;
