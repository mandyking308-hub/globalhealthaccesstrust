import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { STATUS_LABEL, PRIORITY_LABEL, formatDueIn } from "@/lib/serviceRequests";

interface Props {
  requestId: string;
  isAdmin: boolean;
  currentUserId: string;
  onChanged?: () => void;
  onClose?: () => void;
}

export const ServiceRequestDetail = ({ requestId, isAdmin, currentUserId, onChanged, onClose }: Props) => {
  const { toast } = useToast();
  const [req, setReq] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [body, setBody] = useState("");
  const [commentType, setCommentType] = useState<"requester_comment" | "trust_response" | "internal_note" | "resolution">(
    isAdmin ? "trust_response" : "requester_comment"
  );
  const [visibility, setVisibility] = useState<"donor_trust" | "team_trust" | "shared_project" | "trust_internal">("shared_project");
  const [resolutionSummary, setResolutionSummary] = useState("");
  const [satisfactionScore, setSatisfactionScore] = useState<number>(5);
  const [satisfactionFeedback, setSatisfactionFeedback] = useState("");

  const load = async () => {
    const [{ data: r }, { data: c }, { data: e }] = await Promise.all([
      supabase.from("project_service_requests").select("*").eq("id", requestId).maybeSingle(),
      supabase.from("project_service_request_comments").select("*").eq("request_id", requestId).order("created_at"),
      supabase.from("project_service_request_events").select("*").eq("request_id", requestId).order("created_at"),
    ]);
    setReq(r); setComments(c || []); setEvents(e || []);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [requestId]);

  const post = async () => {
    if (!body.trim()) return;
    const { error } = await supabase.rpc("add_service_request_comment", {
      _request_id: requestId,
      _body: body.trim(),
      _comment_type: commentType,
      _visibility: visibility,
    });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    setBody("");
    await load();
    onChanged?.();
  };

  const propose = async () => {
    if (!resolutionSummary.trim()) return;
    const { error } = await supabase.rpc("resolve_service_request", {
      _request_id: requestId, _summary: resolutionSummary.trim(), _category: null,
    });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: "Resolution proposed" });
    setResolutionSummary("");
    await load();
    onChanged?.();
  };

  const confirmResolution = async () => {
    const { error } = await supabase.rpc("confirm_service_resolution", {
      _request_id: requestId, _score: satisfactionScore, _feedback: satisfactionFeedback,
    });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: "Request closed. Thank you for your feedback." });
    await load(); onChanged?.();
  };

  const reopen = async () => {
    const reason = window.prompt("Reason for reopening?");
    if (!reason) return;
    const { error } = await supabase.rpc("reopen_service_request", { _request_id: requestId, _reason: reason });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    await load(); onChanged?.();
  };

  if (!req) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const isRequester = req.requester_user_id === currentUserId;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-primary">{req.reference_number}</div>
          <h3 className="font-serif text-2xl">{req.subject}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline">{STATUS_LABEL[req.status]}</Badge>
            <Badge variant="outline">{PRIORITY_LABEL[req.priority]}</Badge>
            {req.confidentiality_level !== "standard" && <Badge variant="destructive">Confidential</Badge>}
            <span className="text-xs text-muted-foreground">Response due: {formatDueIn(req.first_response_due_at)}</span>
            <span className="text-xs text-muted-foreground">Resolution due: {formatDueIn(req.resolution_due_at)}</span>
          </div>
        </div>
        {onClose && <Button variant="ghost" onClick={onClose}>Close</Button>}
      </div>

      <div className="border border-foreground/10 rounded p-3 text-sm whitespace-pre-wrap">{req.description}</div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider">Discussion</h4>
        {comments.length === 0 && <p className="text-sm text-muted-foreground">No responses yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className={`border rounded p-3 ${c.author_role === "trust" ? "bg-primary/5 border-primary/20" : "border-foreground/10"}`}>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <strong className="uppercase tracking-wider">{c.author_role === "trust" ? "Trust" : c.author_role.replace("_", " ")}</strong>
              <span>·</span>
              <span>{new Date(c.created_at).toLocaleString()}</span>
              <Badge variant="outline" className="ml-auto text-[10px]">{c.comment_type}</Badge>
            </div>
            <p className="mt-2 text-sm whitespace-pre-wrap">{c.body}</p>
          </div>
        ))}
      </div>

      {req.status !== "closed" && (
        <div className="border-t pt-4 space-y-2">
          <Textarea rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a response…" />
          {isAdmin && (
            <div className="flex gap-2">
              <Select value={commentType} onValueChange={(v) => setCommentType(v as typeof commentType)}>
                <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="trust_response">Trust response</SelectItem>
                  <SelectItem value="internal_note">Internal note</SelectItem>
                  <SelectItem value="request_for_information">Request for information</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                </SelectContent>
              </Select>
              <Select value={visibility} onValueChange={(v) => setVisibility(v as typeof visibility)}>
                <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="shared_project">Shared with requester</SelectItem>
                  <SelectItem value="trust_internal">Trust internal only</SelectItem>
                  <SelectItem value="donor_trust">Donor + Trust</SelectItem>
                  <SelectItem value="team_trust">Team + Trust</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={post} disabled={!body.trim()}>Post</Button>
        </div>
      )}

      {isAdmin && req.status !== "closed" && req.status !== "proposed_resolution" && (
        <div className="border-t pt-4 space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Propose resolution</h4>
          <Textarea rows={2} value={resolutionSummary} onChange={(e) => setResolutionSummary(e.target.value)} placeholder="Summary of resolution" />
          <Button variant="outline" onClick={propose}>Propose resolution</Button>
        </div>
      )}

      {isRequester && req.status === "proposed_resolution" && (
        <div className="border-t pt-4 space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Confirm resolution</h4>
          <p className="text-sm">Trust response: {req.resolution_summary}</p>
          {req.confidentiality_level === "standard" && (
            <>
              <div>
                <label className="text-xs">Satisfaction (1–5)</label>
                <input type="number" min={1} max={5} value={satisfactionScore} onChange={(e) => setSatisfactionScore(Number(e.target.value))}
                  className="ml-2 border rounded px-2 py-1 w-20 text-sm" />
              </div>
              <Textarea rows={2} value={satisfactionFeedback} onChange={(e) => setSatisfactionFeedback(e.target.value)} placeholder="Optional feedback" />
            </>
          )}
          <div className="flex gap-2">
            <Button onClick={confirmResolution}>Confirm resolved</Button>
            <Button variant="outline" onClick={reopen}>Problem remains — reopen</Button>
          </div>
        </div>
      )}

      {req.status === "closed" && isRequester && (
        <Button variant="outline" onClick={reopen}>Reopen this request</Button>
      )}

      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer">Audit history ({events.length})</summary>
        <ul className="mt-2 space-y-1">
          {events.map((e) => (
            <li key={e.id}>{new Date(e.created_at).toLocaleString()} · {e.actor_role || "system"} · <strong>{e.event_type}</strong></li>
          ))}
        </ul>
      </details>
    </div>
  );
};
