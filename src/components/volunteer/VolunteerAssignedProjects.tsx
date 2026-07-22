import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ProjectMessagesThread } from "@/components/project/ProjectMessagesThread";

type Assignment = {
  id: string;
  project_id: string;
  assigned_role: string;
  created_at: string;
  commissioned_projects: {
    id: string;
    title: string;
    country: string;
    region: string;
    status: string;
    description: string;
  } | null;
};

type ProjectUpdate = {
  id: string;
  project_id: string;
  update_type: string;
  note_text: string | null;
  file_url: string | null;
  created_at: string;
};

export const VolunteerAssignedProjects = ({ volunteerId }: { volunteerId: string }) => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [updates, setUpdates] = useState<Record<string, ProjectUpdate[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [noteType, setNoteType] = useState("field_note");
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [threadOpen, setThreadOpen] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("volunteer_project_assignments")
      .select("id, project_id, assigned_role, created_at, commissioned_projects(id, title, country, region, status, description)")
      .eq("volunteer_id", volunteerId)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ variant: "destructive", title: "Load failed", description: error.message });
      setLoading(false);
      return;
    }
    const list = (data as any as Assignment[]) || [];
    setAssignments(list);

    if (list.length) {
      const projectIds = list.map((a) => a.project_id);
      const { data: upd } = await supabase
        .from("project_updates")
        .select("*")
        .in("project_id", projectIds)
        .order("created_at", { ascending: false });
      const grouped: Record<string, ProjectUpdate[]> = {};
      (upd || []).forEach((u: any) => {
        grouped[u.project_id] = grouped[u.project_id] || [];
        grouped[u.project_id].push(u);
      });
      setUpdates(grouped);
    }
    setLoading(false);
  };

  useEffect(() => { if (volunteerId) load(); }, [volunteerId]);

  const submitUpdate = async () => {
    if (!activeProjectId || (!noteText.trim() && !file)) {
      toast({ variant: "destructive", title: "Nothing to submit", description: "Add a note or attach a file." });
      return;
    }
    setPosting(true);
    const { data: { user } } = await supabase.auth.getUser();
    let fileUrl: string | null = null;
    if (file) {
      const path = `${activeProjectId}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("evidence-packs").upload(path, file);
      if (upErr) {
        toast({ variant: "destructive", title: "Upload failed", description: upErr.message });
        setPosting(false);
        return;
      }
      const { data: signed } = await supabase.storage.from("evidence-packs").createSignedUrl(path, 60 * 60 * 24 * 365);
      fileUrl = signed?.signedUrl ?? null;
    }
    const { error } = await supabase.from("project_updates").insert({
      project_id: activeProjectId,
      update_type: noteType,
      note_text: noteText.trim() || null,
      file_url: fileUrl,
      created_by: user?.id,
    });
    setPosting(false);
    if (error) {
      toast({ variant: "destructive", title: "Submit failed", description: error.message });
    } else {
      toast({ title: "Update submitted" });
      setNoteText(""); setFile(null);
      load();
    }
  };

  if (loading) return <p className="text-muted-foreground py-6">Loading assignments…</p>;

  if (!assignments.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          You have not been assigned to any projects yet. Admin will assign you when a suitable project is approved.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((a) => {
        const p = a.commissioned_projects;
        if (!p) return null;
        const isActive = activeProjectId === p.id;
        const list = updates[p.id] || [];
        return (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.country}, {p.region} · Role: {a.assigned_role}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">{p.status.replace(/_/g, " ")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{p.description}</p>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Field updates ({list.length})</h4>
                  <Button size="sm" variant={isActive ? "secondary" : "outline"} onClick={() => setActiveProjectId(isActive ? null : p.id)}>
                    {isActive ? "Cancel" : "Submit update"}
                  </Button>
                </div>

                {isActive && (
                  <div className="space-y-3 mb-4 p-4 border rounded-md bg-muted/20">
                    <div>
                      <Label>Type</Label>
                      <select
                        className="mt-1 w-full h-10 border rounded-md px-3 bg-background"
                        value={noteType}
                        onChange={(e) => setNoteType(e.target.value)}
                      >
                        <option value="field_note">Field note</option>
                        <option value="milestone_evidence">Milestone evidence</option>
                        <option value="photo">Photo</option>
                        <option value="report">Report</option>
                      </select>
                    </div>
                    <div>
                      <Label>Note</Label>
                      <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={4} />
                    </div>
                    <div>
                      <Label>Attachment (optional)</Label>
                      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    </div>
                    <Button onClick={submitUpdate} disabled={posting}>
                      {posting ? "Submitting…" : "Submit update"}
                    </Button>
                  </div>
                )}

                {list.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No updates yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {list.map((u) => (
                      <li key={u.id} className="text-sm border-l-2 border-primary/30 pl-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="uppercase tracking-widest">{u.update_type.replace(/_/g, " ")}</span>
                          <span>·</span>
                          <span>{format(new Date(u.created_at), "d MMM yyyy, HH:mm")}</span>
                        </div>
                        {u.note_text && <p className="mt-1">{u.note_text}</p>}
                        {u.file_url && (
                          <a href={u.file_url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">
                            View attachment
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Project messages</h4>
                  <Button size="sm" variant="outline" onClick={() => setThreadOpen(threadOpen === p.id ? null : p.id)}>
                    {threadOpen === p.id ? "Hide" : "Open thread"}
                  </Button>
                </div>
                {threadOpen === p.id && userId && (
                  <ProjectMessagesThread projectId={p.id} currentUserId={userId} currentRole="volunteer" />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
