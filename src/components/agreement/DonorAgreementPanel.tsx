import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AgreementView } from "@/components/agreement/AgreementView";
import { AgreementDecisionBar } from "@/components/agreement/AgreementDecisionBar";
import { Card } from "@/components/ui/card";

export const DonorAgreementPanel = ({ projectId, currentUserId }: { projectId: string; currentUserId: string }) => {
  const [agreement, setAgreement] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [changes, setChanges] = useState<any[]>([]);
  const [alreadyDecided, setAlreadyDecided] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.rpc("donor_project_agreement", { _project_id: projectId });
    const a = Array.isArray(data) && data.length ? data[0] : null;
    setAgreement(a);
    if (a) {
      const [{ data: ms }, { data: cs }, { data: dec }] = await Promise.all([
        supabase.from("project_agreement_milestones").select("*").eq("version_id", a.version_id).order("sequence"),
        supabase.from("project_change_requests").select("*").eq("project_id", projectId).eq("status", "approved").eq("donor_visible", true).order("approved_at", { ascending: false }),
        supabase.from("project_agreement_decisions").select("id").eq("version_id", a.version_id).eq("user_id", currentUserId).limit(1),
      ]);
      setMilestones(ms || []); setChanges(cs || []);
      setAlreadyDecided((dec || []).length > 0);
    }
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [projectId]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading agreement…</p>;
  if (!agreement) return (
    <Card className="p-6"><p className="text-sm text-muted-foreground">No agreement has been issued for this project yet. The Trust will notify you when a Project Charter is ready for your review.</p></Card>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6"><AgreementView agreement={agreement} milestones={milestones} /></Card>

      {agreement.issued_at && !alreadyDecided && (
        <Card className="p-6">
          <AgreementDecisionBar versionId={agreement.version_id} role="donor" onDecided={load} />
        </Card>
      )}

      <Card className="p-6">
        <h3 className="font-serif text-xl mb-3">Approved changes</h3>
        {changes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No approved changes to date.</p>
        ) : (
          <ul className="space-y-3">
            {changes.map((c) => (
              <li key={c.id} className="border border-foreground/10 rounded p-3">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.field}</div>
                <div className="text-sm mt-1">{c.reason}</div>
                <div className="text-xs text-muted-foreground mt-1">Approved {c.approved_at ? new Date(c.approved_at).toLocaleDateString() : ""}</div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
