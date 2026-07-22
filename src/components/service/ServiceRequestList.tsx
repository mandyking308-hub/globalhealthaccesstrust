import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { STATUS_LABEL, PRIORITY_LABEL, slaState, formatDueIn } from "@/lib/serviceRequests";
import { Badge } from "@/components/ui/badge";

interface Props {
  scope: "mine" | "admin" | "admin-bucket";
  bucket?: string;
  onSelect: (id: string) => void;
  refreshKey?: number;
}

export const ServiceRequestList = ({ scope, bucket, onSelect, refreshKey }: Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [scope, bucket, refreshKey]);

  const load = async () => {
    setLoading(true);
    let q = supabase.from("project_service_requests").select("*").order("created_at", { ascending: false }).limit(100);
    if (scope === "admin-bucket" && bucket) {
      switch (bucket) {
        case "new": q = q.eq("status", "new"); break;
        case "unassigned": q = q.is("assigned_user_id", null); break;
        case "awaiting_first_response": q = q.is("first_responded_at", null).neq("status", "closed"); break;
        case "awaiting_donor": q = q.eq("waiting_on", "donor"); break;
        case "awaiting_team": q = q.eq("waiting_on", "project_team"); break;
        case "investigating": q = q.eq("status", "investigating"); break;
        case "overdue": q = q.lt("resolution_due_at", new Date().toISOString()).not("status", "in", "(resolved,closed)"); break;
        case "escalated": q = q.eq("status", "escalated"); break;
        case "complaints": q = q.eq("request_type", "complaint"); break;
        case "safeguarding": q = q.in("confidentiality_level", ["restricted_safeguarding", "identity_restricted"]); break;
        case "finance": q = q.eq("confidentiality_level", "restricted_finance"); break;
        case "resolved": q = q.in("status", ["resolved", "closed"]); break;
      }
    }
    const { data } = await q;
    setItems(data || []);
    setLoading(false);
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (items.length === 0) return <p className="text-sm text-muted-foreground">No requests.</p>;

  return (
    <div className="space-y-2">
      {items.map((r) => {
        const sla = slaState(r.resolution_due_at);
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="w-full text-left border border-foreground/10 rounded p-3 hover:bg-foreground/5"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-primary">{r.reference_number}</span>
              <Badge variant="outline">{STATUS_LABEL[r.status] || r.status}</Badge>
              <Badge variant="outline">{PRIORITY_LABEL[r.priority]}</Badge>
              {r.confidentiality_level !== "standard" && (
                <Badge variant="destructive">Confidential</Badge>
              )}
              <span className={`text-xs ml-auto ${sla === "breached" ? "text-destructive" : sla === "warn" ? "text-amber-600" : "text-muted-foreground"}`}>
                Resolution: {formatDueIn(r.resolution_due_at)}
              </span>
            </div>
            <div className="mt-1 font-medium">{r.subject}</div>
            <div className="text-xs text-muted-foreground truncate">{r.description}</div>
          </button>
        );
      })}
    </div>
  );
};
