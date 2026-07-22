import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Role = "donor" | "volunteer" | "admin";

interface Msg {
  id: string;
  project_id: string;
  sender_id: string;
  sender_role: Role;
  body: string;
  created_at: string;
}

interface Props {
  projectId: string;
  currentUserId: string;
  currentRole: Role;
}

/**
 * Identity is masked between donor & volunteer per security model.
 * Donors see volunteer posts as "Field Team" and admin as "Trust Office".
 * Volunteers see donor posts as "Project Sponsor" and admin as "Trust Office".
 * Admin sees actual roles.
 */
const labelFor = (viewerRole: Role, senderRole: Role, isSelf: boolean): string => {
  if (isSelf) return "You";
  if (viewerRole === "admin") {
    return senderRole === "donor" ? "Donor" : senderRole === "volunteer" ? "Volunteer" : "Trust Office";
  }
  if (viewerRole === "donor") {
    return senderRole === "volunteer" ? "Field Team" : senderRole === "admin" ? "Trust Office" : "Sponsor";
  }
  // volunteer
  return senderRole === "donor" ? "Project Sponsor" : senderRole === "admin" ? "Trust Office" : "Field Team";
};

export const ProjectMessagesThread = ({ projectId, currentUserId, currentRole }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [body, setBody] = useState("");
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
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "project_messages", filter: `project_id=eq.${projectId}` },
        (payload) => setMessages((prev) => [...prev, payload.new as Msg])
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setSending(true);
    const { error } = await supabase.from("project_messages").insert({
      project_id: projectId,
      sender_id: currentUserId,
      sender_role: currentRole,
      body: trimmed,
    });
    if (error) {
      toast({ variant: "destructive", title: "Could not send", description: error.message });
    } else {
      setBody("");
    }
    setSending(false);
  };

  return (
    <div className="border border-foreground/10 bg-background">
      <div className="px-5 py-4 border-b border-foreground/10">
        <span className="portal-eyebrow">Project Thread</span>
        <p className="text-xs text-muted-foreground mt-1">
          Messages are visible to the Trust Office, the sponsor and the assigned field team for this project only.
        </p>
      </div>

      <div className="max-h-[360px] overflow-y-auto p-5 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Start the conversation below.</p>
        ) : (
          messages.map((m) => {
            const isSelf = m.sender_id === currentUserId;
            const label = labelFor(currentRole, m.sender_role, isSelf);
            return (
              <div key={m.id} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 border ${isSelf ? "border-primary/40 bg-primary/5" : "border-foreground/10 bg-secondary/40"}`}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-primary">{label}</span>
                    <span className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap text-foreground/90">{m.body}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <div className="p-5 border-t border-foreground/10 space-y-3">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message to the Trust Office…"
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
