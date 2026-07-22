import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ProjectMessagesThread } from "@/components/project/ProjectMessagesThread";

type Assignment = {
  id: string;
  project_id: string;
  assigned_role: string;
  responsibilities: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_at: string;
  commissioned_projects: {
    id: string; title: string; country: string; region: string; status: string; description: string;
  } | null;
};

type Evidence = {
  id: string; project_id: string; caption: string | null; activity_description: string | null;
  approved_general_location: string | null; date_taken: string | null;
  consent_status: string; safeguarding_status: string; review_status: string; donor_visible: boolean;
  storage_path: string; created_at: string;
};

export const VolunteerAssignedProjects = ({ volunteerId }: { volunteerId: string }) => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [evidenceByProject, setEvidenceByProject] = useState<Record<string, Evidence[]>>({});
  const [milestonesByProject, setMilestonesByProject] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [threadOpen, setThreadOpen] = useState<string | null>(null);

  // upload form state
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [activity, setActivity] = useState("");
  const [dateTaken, setDateTaken] = useState(format(new Date(), "yyyy-MM-dd"));
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState("confirmed");
  const [milestoneId, setMilestoneId] = useState<string>("");
  const [posting, setPosting] = useState(false);

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null)); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("volunteer_project_assignments")
      .select("id, project_id, assigned_role, responsibilities, start_date, end_date, status, created_at, commissioned_projects(id, title, country, region, status, description)")
      .eq("volunteer_id", volunteerId)
      .order("created_at", { ascending: false });
    if (error) { toast({ variant: "destructive", title: "Load failed", description: error.message }); setLoading(false); return; }
    const list = (data as any as Assignment[]) || [];
    setAssignments(list);

    if (list.length) {
      const ids = list.map((a) => a.project_id);
      const [ev, ms] = await Promise.all([
        supabase.from("project_field_evidence").select("*").in("project_id", ids).order("created_at", { ascending: false }),
        supabase.from("project_milestones").select("*").in("project_id", ids).order("sequence", { ascending: true }),
      ]);
      const evGrouped: Record<string, Evidence[]> = {};
      (ev.data || []).forEach((e: any) => { (evGrouped[e.project_id] ||= []).push(e); });
      setEvidenceByProject(evGrouped);
      const msGrouped: Record<string, any[]> = {};
      (ms.data || []).forEach((m: any) => { (msGrouped[m.project_id] ||= []).push(m); });
      setMilestonesByProject(msGrouped);
    }
    setLoading(false);
  };

  useEffect(() => { if (volunteerId) load(); }, [volunteerId]);

  const submitEvidence = async () => {
    if (!activeProjectId || !file) {
      toast({ variant: "destructive", title: "Photo required", description: "Attach an image or media file." });
      return;
    }
    setPosting(true);
    const path = `${activeProjectId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("field-evidence").upload(path, file);
    if (upErr) { toast({ variant: "destructive", title: "Upload failed", description: upErr.message }); setPosting(false); return; }
    const { error } = await supabase.from("project_field_evidence").insert({
      project_id: activeProjectId,
      uploaded_by: userId,
      date_taken: dateTaken,
      approved_general_location: location || null,
      caption: caption || null,
      activity_description: activity || null,
      milestone_id: milestoneId || null,
      consent_status: consent,
      storage_path: path,
    });
    setPosting(false);
    if (error) {
      toast({ variant: "destructive", title: "Submission failed", description: error.message });
    } else {
      toast({ title: "Submitted for review", description: "Trust Office will review before donor visibility." });
      setFile(null); setCaption(""); setActivity(""); setLocation(""); setMilestoneId("");
      load();
    }
  };

  if (loading) return <p className="text-muted-foreground py-6">Loading assignments…</p>;
  if (!assignments.length) {
    return <Card><CardContent className="py-12 text-center text-muted-foreground">
      You have not been assigned to any projects yet.
    </CardContent></Card>;
  }

  return (
    <div className="space-y-4">
      {assignments.map((a) => {
        const p = a.commissioned_projects;
        if (!p) return null;
        const isActive = activeProjectId === p.id;
        const evidence = evidenceByProject[p.id] || [];
        const milestones = milestonesByProject[p.id] || [];
        return (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.country}, {p.region} · Role: {a.assigned_role}
                    {a.start_date && <> · From {format(new Date(a.start_date), "d MMM yyyy")}</>}
                    {a.end_date && <> · to {format(new Date(a.end_date), "d MMM yyyy")}</>}
                  </p>
                  {a.responsibilities && (
                    <p className="text-sm text-foreground/80 mt-2 max-w-2xl">{a.responsibilities}</p>
                  )}
                </div>
                <Badge variant="outline" className="capitalize">{a.status.replace(/_/g, " ")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{p.description}</p>

              {milestones.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Milestones</h4>
                  <ol className="space-y-1 text-sm">
                    {milestones.map((m) => (
                      <li key={m.id} className="flex justify-between gap-3">
                        <span>
                          <span className="text-muted-foreground mr-2">{String(m.sequence).padStart(2, "0")}</span>
                          {m.milestone_title}
                          {m.evidence_required && <span className="ml-2 text-xs uppercase tracking-widest text-primary">Evidence required</span>}
                        </span>
                        <span className="capitalize text-xs text-muted-foreground">{m.status?.replace(/_/g, " ")}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Field evidence ({evidence.length})</h4>
                  <Button size="sm" variant={isActive ? "secondary" : "outline"} onClick={() => setActiveProjectId(isActive ? null : p.id)}>
                    {isActive ? "Cancel" : "Upload evidence"}
                  </Button>
                </div>

                {isActive && (
                  <div className="space-y-3 mb-4 p-4 border rounded-md bg-muted/20">
                    <div>
                      <Label>Photo, video or document *</Label>
                      <Input type="file" accept="image/*,video/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label>Date taken</Label>
                        <Input type="date" value={dateTaken} onChange={(e) => setDateTaken(e.target.value)} />
                      </div>
                      <div>
                        <Label>Approved general location</Label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Southern Ukraine border region" />
                      </div>
                    </div>
                    <div>
                      <Label>Caption</Label>
                      <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Short description shown to donors after approval" />
                    </div>
                    <div>
                      <Label>Activity description</Label>
                      <Textarea value={activity} onChange={(e) => setActivity(e.target.value)} rows={3} placeholder="What was delivered, to whom (no identifying detail)" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Label>Related milestone (optional)</Label>
                        <Select value={milestoneId} onValueChange={setMilestoneId}>
                          <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                          <SelectContent>
                            {milestones.map((m) => <SelectItem key={m.id} value={m.id}>{m.milestone_title}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Consent status</Label>
                        <Select value={consent} onValueChange={setConsent}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed – consent obtained</SelectItem>
                            <SelectItem value="not_required">Not required – no identifiable persons</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={submitEvidence} disabled={posting}>
                      {posting ? "Submitting…" : "Submit for Trust Office review"}
                    </Button>
                  </div>
                )}

                {evidence.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No evidence submitted yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {evidence.map((e) => (
                      <li key={e.id} className="text-sm border-l-2 border-primary/30 pl-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="uppercase tracking-widest">{e.review_status.replace(/_/g, " ")}</span>
                          <span>·</span>
                          <span>{e.date_taken ? format(new Date(e.date_taken), "d MMM yyyy") : format(new Date(e.created_at), "d MMM yyyy")}</span>
                          {e.donor_visible && <Badge variant="outline" className="text-[10px]">Donor visible</Badge>}
                        </div>
                        {e.caption && <p className="mt-1 font-medium">{e.caption}</p>}
                        {e.activity_description && <p className="text-muted-foreground text-xs mt-0.5">{e.activity_description}</p>}
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
