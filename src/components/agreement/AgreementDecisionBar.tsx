import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Props {
  versionId: string;
  role: "donor" | "project_team" | "trust";
  alreadyDecided?: boolean;
  onDecided?: () => void;
}

export const AgreementDecisionBar = ({ versionId, alreadyDecided, onDecided, role }: Props) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [action, setAction] = useState<"accept" | "request_changes" | "decline" | "trust_approve" | null>(null);

  const submit = async (decision: "accept" | "request_changes" | "decline" | "trust_approve") => {
    setBusy(true);
    const { error } = await supabase.rpc("submit_agreement_decision", {
      _version_id: versionId,
      _decision: decision,
      _comment: comment || null,
    });
    setBusy(false);
    if (error) { toast({ variant: "destructive", title: "Could not submit", description: error.message }); return; }
    toast({ title: "Decision recorded" });
    setComment(""); setAction(null);
    onDecided?.();
  };

  if (alreadyDecided) return <p className="text-sm text-muted-foreground">Your decision on this version is recorded.</p>;

  return (
    <div className="border-t pt-4 space-y-3">
      <h4 className="font-serif text-lg">Your decision on this agreement</h4>
      <p className="text-xs text-muted-foreground">
        {role === "donor" && "Acceptance confirms agreement with the donor-facing brief, allocation, reporting and timetable. It does not give legal control over Trust operations."}
        {role === "project_team" && "Acceptance confirms agreement to your role, responsibilities, deliverables, reporting duties and timescale."}
        {role === "trust" && "Trust approval finalises this version once other parties have accepted."}
      </p>
      {action && action !== "accept" && action !== "trust_approve" && (
        <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder={action === "request_changes" ? "Explain the changes you require" : "Reason for declining"} />
      )}
      <div className="flex gap-2 flex-wrap">
        {!action && (
          <>
            <Button onClick={() => submit("accept")} disabled={busy}>Accept</Button>
            <Button variant="outline" onClick={() => setAction("request_changes")}>Request changes</Button>
            <Button variant="destructive" onClick={() => setAction("decline")}>Decline</Button>
            {role === "trust" && <Button variant="secondary" onClick={() => submit("trust_approve")}>Trust approve</Button>}
          </>
        )}
        {action && (
          <>
            <Button onClick={() => submit(action)} disabled={busy || !comment.trim()}>Submit</Button>
            <Button variant="ghost" onClick={() => { setAction(null); setComment(""); }}>Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
};
