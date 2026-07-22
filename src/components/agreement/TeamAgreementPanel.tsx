import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AgreementView } from "@/components/agreement/AgreementView";
import { AgreementDecisionBar } from "@/components/agreement/AgreementDecisionBar";
import { Card } from "@/components/ui/card";

export const TeamAgreementPanel = ({ projectId, currentUserId }: { projectId: string; currentUserId: string }) => {
  const [agreement, setAgreement] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [alreadyDecided, setAlreadyDecided] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.rpc("team_project_agreement", { _project_id: projectId });
    const a = Array.isArray(data) && data.length ? data[0] : null;
    setAgreement(a);
    if (a) {
      const [{ data: ms }, { data: dec }] = await Promise.all([
        supabase.from("project_agreement_milestones").select("*").eq("version_id", a.version_id).order("sequence"),
        supabase.from("project_agreement_decisions").select("id").eq("version_id", a.version_id).eq("user_id", currentUserId).limit(1),
      ]);
      setMilestones(ms || []);
      setAlreadyDecided((dec || []).length > 0);
    }
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [projectId]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading agreement…</p>;
  if (!agreement) return <Card className="p-6"><p className="text-sm text-muted-foreground">No agreement issued yet.</p></Card>;

  return (
    <div className="space-y-6">
      <Card className="p-6"><AgreementView agreement={agreement} milestones={milestones} /></Card>
      {agreement.issued_at && !alreadyDecided && (
        <Card className="p-6"><AgreementDecisionBar versionId={agreement.version_id} role="project_team" onDecided={load} /></Card>
      )}
    </div>
  );
};
