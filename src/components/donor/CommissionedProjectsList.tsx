import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ProjectMessagesThread } from "@/components/project/ProjectMessagesThread";

interface CommissionedProject {
  id: string; title: string; region: string; country: string; project_type: string;
  description: string; budget_range: string; status: string; created_at: string; updated_at: string;
  funding_target: number | null; currency: string;
}
interface ProjectFinance { allocated: number; committed: number; spent: number; remaining: number; delivery: number; }
type Evidence = {
  id: string; project_id: string; caption: string | null; activity_description: string | null;
  approved_general_location: string | null; date_taken: string | null; storage_path: string;
};
type TeamMember = {
  assignment_id: string;
  project_id: string;
  assigned_role: string;
  responsibilities: string | null;
  donor_visibility_mode: string;
  display_name: string;
};

const money = (n: number, ccy = "GBP") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(n || 0);

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "portal-status portal-status--pending";
    case "approved": return "portal-status portal-status--approved";
    case "in_progress": return "portal-status portal-status--progress";
    case "completed": return "portal-status portal-status--completed";
    default: return "portal-status";
  }
};
const getStatusLabel = (s: string) => s.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

// Display-name derivation now happens server-side in the donor_project_team RPC.


export const CommissionedProjectsList = () => {
  const [projects, setProjects] = useState<CommissionedProject[]>([]);
  const [finance, setFinance] = useState<Record<string, ProjectFinance>>({});
  const [evidence, setEvidence] = useState<Record<string, (Evidence & { url?: string })[]>>({});
  const [teams, setTeams] = useState<Record<string, TeamMember[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data, error } = await supabase
        .from("commissioned_projects").select("*")
        .eq("donor_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      const list = (data as CommissionedProject[]) || [];
      setProjects(list);

      if (list.length) {
        const ids = list.map((p) => p.id);
        const [allocs, exps, milestones, ev, team] = await Promise.all([
          supabase.from("fund_allocations").select("project_id, amount").in("project_id", ids),
          supabase.from("project_expenses").select("project_id, amount, status, donor_visible").in("project_id", ids),
          supabase.from("project_milestones").select("project_id, status, weight, donor_visible").in("project_id", ids),
          supabase.from("project_field_evidence").select("*").in("project_id", ids)
            .eq("donor_visible", true).eq("review_status", "approved").is("withdrawn_at", null)
            .order("date_taken", { ascending: false }),
          supabase.rpc("donor_project_team", { _project_ids: ids }),
        ]);

        const fin: Record<string, ProjectFinance> = {};
        list.forEach((p) => { fin[p.id] = { allocated: 0, committed: 0, spent: 0, remaining: 0, delivery: 0 }; });
        (allocs.data || []).forEach((a: any) => {
          if (a.project_id && fin[a.project_id]) fin[a.project_id].allocated += Number(a.amount || 0);
        });
        (exps.data || []).forEach((e: any) => {
          if (!fin[e.project_id] || !e.donor_visible) return;
          if (e.status === "paid") fin[e.project_id].spent += Number(e.amount || 0);
          else if (["approved", "committed"].includes(e.status)) fin[e.project_id].committed += Number(e.amount || 0);
        });
        Object.values(fin).forEach((f) => { f.remaining = f.allocated - f.spent - f.committed; });
        const msByProj: Record<string, any[]> = {};
        (milestones.data || []).forEach((m: any) => { (msByProj[m.project_id] ||= []).push(m); });
        Object.entries(msByProj).forEach(([pid, ms]) => {
          const total = ms.reduce((s, m) => s + Number(m.weight || 0), 0);
          const done = ms.filter((m) => m.status === "completed").reduce((s, m) => s + Number(m.weight || 0), 0);
          if (fin[pid]) fin[pid].delivery = total > 0 ? (done / total) * 100 : 0;
        });
        setFinance(fin);

        // Sign evidence URLs
        const evGrouped: Record<string, (Evidence & { url?: string })[]> = {};
        for (const e of (ev.data || []) as Evidence[]) {
          const { data: signed } = await supabase.storage.from("field-evidence").createSignedUrl(e.storage_path, 60 * 60);
          (evGrouped[e.project_id] ||= []).push({ ...e, url: signed?.signedUrl });
        }
        setEvidence(evGrouped);

        const teamGrouped: Record<string, TeamMember[]> = {};
        (team.data || []).forEach((t: any) => { (teamGrouped[t.project_id] ||= []).push(t); });
        setTeams(teamGrouped);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>;
  }

  if (projects.length === 0) {
    return (
      <div className="portal-panel text-center py-16">
        <span className="portal-eyebrow mb-4">My Projects</span>
        <p className="text-foreground mt-3 mb-2 text-[16.5px]">You haven't commissioned any projects yet.</p>
      </div>
    );
  }

  return (
    <div className="portal-panel space-y-0 divide-y divide-foreground/10 p-0">
      <div className="px-8 py-6"><span className="portal-eyebrow">My Projects</span></div>
      {projects.map((project, idx) => {
        const f = finance[project.id] || { allocated: 0, committed: 0, spent: 0, remaining: 0, delivery: 0 };
        const ccy = project.currency || "GBP";
        const target = Number(project.funding_target || 0);
        const percent = target > 0 ? Math.min(100, (f.allocated / target) * 100) : 0;
        const projEvidence = evidence[project.id] || [];
        const team = teams[project.id] || [];
        const detailOpen = openDetail === project.id;
        return (
          <article key={project.id} className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6">
              <span className="font-serif text-primary text-[22px] font-black tracking-tight">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="text-foreground m-0" style={{ fontSize: "clamp(19px, 1.6vw, 24px)", fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={getStatusClass(project.status)}>{getStatusLabel(project.status)}</span>
                    <span className="portal-status text-foreground/60">{project.project_type}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-5 max-w-3xl">{project.description}</p>

                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm border-t border-foreground/10 pt-4">
                  <Row label="Location" value={`${project.country}, ${project.region}`} />
                  <Row label="Budget band" value={project.budget_range} />
                  <Row label="Funding target" value={target > 0 ? money(target, ccy) : "Not yet set"} />
                  <Row label="Project allocation" value={money(f.allocated, ccy)} />
                  <Row label="Amount committed" value={money(f.committed, ccy)} />
                  <Row label="Amount spent" value={money(f.spent, ccy)} />
                  <Row label="Amount remaining" value={money(f.remaining, ccy)} />
                  <Row label="Requested" value={format(new Date(project.created_at), "MMM d, yyyy")} />
                </dl>

                {target > 0 && (
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs uppercase tracking-[0.14em] font-semibold text-foreground/60">
                      <span>Funding progress</span><span>{percent.toFixed(0)}%</span>
                    </div>
                    <Progress value={percent} className="h-1 rounded-none" />
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-[0.14em] font-semibold text-foreground/60">
                    <span>Delivery progress</span><span>{f.delivery.toFixed(0)}%</span>
                  </div>
                  <Progress value={f.delivery} className="h-1 rounded-none" />
                  <p className="text-[11px] text-muted-foreground">Weighted from completed milestones. Independent from funding.</p>
                </div>

                <div className="mt-6 pt-5 border-t border-foreground/10 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="tracking-[0.1em] text-[11.5px] font-semibold uppercase h-9"
                    onClick={() => setOpenDetail(detailOpen ? null : project.id)}>
                    {detailOpen ? "Hide detail" : "View team & evidence"}
                  </Button>
                  <Button variant="outline" size="sm" className="tracking-[0.1em] text-[11.5px] font-semibold uppercase h-9"
                    onClick={() => setOpenThread(openThread === project.id ? null : project.id)}>
                    {openThread === project.id ? "Hide messages" : "Messages with Trust Office"}
                  </Button>
                </div>

                {detailOpen && (
                  <div className="mt-5 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="portal-eyebrow mb-3">Project team</h4>
                      {team.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Team not yet assigned.</p>
                      ) : (
                        <ul className="space-y-2 text-sm">
                          {team.map((t) => (
                            <li key={t.assignment_id} className="border-l-2 border-primary/40 pl-3">
                              <p className="font-medium">{t.display_name}</p>
                              <p className="text-xs text-muted-foreground">{t.assigned_role}</p>
                              {t.responsibilities ? (
                                <p className="text-xs text-muted-foreground mt-1">{t.responsibilities}</p>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <h4 className="portal-eyebrow mb-3">Field evidence gallery</h4>
                      {projEvidence.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No approved evidence yet.</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {projEvidence.map((e) => (
                            <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer" className="block border">
                              {e.url && <img src={e.url} alt={e.caption || ""} className="w-full aspect-[4/3] object-cover" />}
                              {e.caption && <p className="text-[11px] p-1 text-muted-foreground line-clamp-2">{e.caption}</p>}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {openThread === project.id && userId && (
                  <div className="mt-4"><ProjectMessagesThread projectId={project.id} currentUserId={userId} currentRole="donor" /></div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between md:justify-start md:gap-4">
    <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-foreground/60">{label}</dt>
    <dd className="text-foreground">{value}</dd>
  </div>
);
