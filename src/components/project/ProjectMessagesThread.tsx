import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Role = "donor" | "volunteer" | "admin";

interface Msg {
  id: string;
  project_id: string;
  sender_id: string;
  sender_role: Role;
  body: string;
  created_at: string;
  visibility?: string | null;
  approval_status?: string | null;
}

interface Props {
  projectId: string;
  currentUserId: string;
  currentRole: Role;
}

const labelFor = (viewerRole: Role, senderRole: Role, isSelf: boolean): string => {
  if (isSelf) return "You";
  if (viewerRole === "admin") {
    return senderRole === "donor" ? "Donor" : senderRole === "volunteer" ? "Volunteer" : "Trust Office";
  }
  if (viewerRole === "donor") {
    return senderRole === "volunteer" ? "Field Team" : senderRole === "admin" ? "Trust Office" : "Sponsor";
  }
  return senderRole === "donor" ? "Project Sponsor" : senderRole === "admin" ? "Trust Office" : "Field Team";
};

const VISIBILITY_LABEL: Record<string, string> = {
  internal_only: "Internal only",
  admin_and_donor: "Admin ⇄ Donor",
  admin_and_team: "Admin ⇄ Field team",
  shared_project_thread: "Full project thread",
};

export const ProjectMessagesThread = ({ projectId, currentUserId, currentRole }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState<string>(
    currentRole === "admin" ? "admin_and_donor"
      : currentRole === "donor" ? "admin_and_donor"
      : "admin_and_team"
  );
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const endRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("project_messages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });
    if (error) {
      toast({ variant: "destructive", title: "Error loading messages", description: error.message });
    } else {
      setMessages((data || []) as Msg[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel(`project_messages:${projectId}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "project_messages", filter: `project_id=eq.${projectId}` },
        () => load()
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setSending(true);
    // Admin messages auto-approved; donor/volunteer messages pending admin review
    const approval_status = currentRole === "admin" ? "auto" : "pending";
    const { error } = await supabase.from("project_messages").insert({
      project_id: projectId,
      sender_id: currentUserId,
      sender_role: currentRole,
      body: trimmed,
      visibility,
      approval_status,
    });
    if (error) {
      toast({ variant: "destructive", title: "Could not send", description: error.message });
    } else {
      setBody("");
      if (currentRole !== "admin") {
        toast({ title: "Sent for review", description: "The Trust Office will review before it becomes visible to the other party." });
      }
    }
    setSending(false);
  };

  const moderate = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("project_messages")
      .update({ approval_status: status, reviewed_by: currentUserId, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast({ variant: "destructive", title: "Update failed", description: error.message });
    else load();
  };

  const changeVisibility = async (id: string, v: string) => {
    const { error } = await supabase.from("project_messages").update({ visibility: v }).eq("id", id);
    if (error) toast({ variant: "destructive", title: "Update failed", description: error.message });
    else load();
  };

  const visibleMessages = currentRole === "admin"
    ? messages
    : messages.filter((m) => {
        if (m.sender_id === currentUserId) return true;
        if (m.approval_status !== "approved" && m.approval_status !== "auto") return false;
        if (currentRole === "donor") return m.visibility === "admin_and_donor" || m.visibility === "shared_project_thread";
        return m.visibility === "admin_and_team" || m.visibility === "shared_project_thread";
      });

  return (
    <div className="border border-foreground/10 bg-background">
      <div className="px-5 py-4 border-b border-foreground/10">
        <span className="portal-eyebrow">Project Thread</span>
        <p className="text-xs text-muted-foreground mt-1">
          {currentRole === "admin"
            ? "Admin can moderate visibility and approve messages before donor or field team see them."
            : "All messages are reviewed by the Trust Office before they become visible to the other party."}
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-5 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : visibleMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Start the conversation below.</p>
        ) : (
          visibleMessages.map((m) => {
            const isSelf = m.sender_id === currentUserId;
            const label = labelFor(currentRole, m.sender_role, isSelf);
            const pending = m.approval_status === "pending";
            return (
              <div key={m.id} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 border ${isSelf ? "border-primary/40 bg-primary/5" : "border-foreground/10 bg-secondary/40"} ${pending ? "border-dashed opacity-90" : ""}`}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-primary">{label}</span>
                    <span className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap text-foreground/90">{m.body}</p>

                  {currentRole === "admin" && (
                    <div className="mt-3 pt-2 border-t border-foreground/10 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-muted-foreground">Visibility:</span>
                      <Select value={m.visibility ?? "internal_only"} onValueChange={(v) => changeVisibility(m.id, v)}>
                        <SelectTrigger className="h-7 w-[180px] text-[11px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(VISIBILITY_LABEL).map(([k, v]) => (
                            <SelectItem key={k} value={k}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="ml-2 text-muted-foreground">Status: <b>{m.approval_status}</b></span>
                      {pending && (
                        <>
                          <Button size="sm" className="h-7 text-[11px]" onClick={() => moderate(m.id, "approved")}>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => moderate(m.id, "rejected")}>Reject</Button>
                        </>
                      )}
                    </div>
                  )}
                  {isSelf && currentRole !== "admin" && pending && (
                    <p className="mt-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Awaiting Trust Office review</p>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <div className="p-5 border-t border-foreground/10 space-y-3">
        {currentRole === "admin" && (
          <div>
            <label className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Send as</label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="internal_only">Internal admin note only</SelectItem>
                <SelectItem value="admin_and_donor">To donor</SelectItem>
                <SelectItem value="admin_and_team">To field team</SelectItem>
                <SelectItem value="shared_project_thread">Shared project thread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={currentRole === "admin" ? "Write a message…" : "Write a message to the Trust Office…"}
          rows={3}
        />
        <div className="flex justify-end">
          <Button onClick={send} disabled={sending || !body.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[12px] font-semibold uppercase h-10 px-6">
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </div>
      </div>
    </div>
  );
};
