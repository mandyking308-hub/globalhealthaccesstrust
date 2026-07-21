import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface CommissionedProject {
  id: string;
  title: string;
  region: string;
  country: string;
  project_type: string;
  description: string;
  budget_range: string;
  status: string;
  created_at: string;
  updated_at: string;
  start_date?: string;
  end_date?: string;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "portal-status portal-status--pending";
    case "approved": return "portal-status portal-status--approved";
    case "in_progress": return "portal-status portal-status--progress";
    case "completed": return "portal-status portal-status--completed";
    default: return "portal-status";
  }
};

const getStatusLabel = (status: string) => {
  return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

export const CommissionedProjectsList = () => {
  const [projects, setProjects] = useState<CommissionedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("commissioned_projects")
        .select("*")
        .eq("donor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="portal-panel text-center py-16">
        <span className="portal-eyebrow mb-4">My Projects</span>
        <p className="text-foreground mt-3 mb-2 text-[16.5px]">You haven't commissioned any projects yet.</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Commission your first project to start making a targeted impact with complete transparency.
        </p>
      </div>
    );
  }

  return (
    <div className="portal-panel space-y-0 divide-y divide-foreground/10 p-0">
      <div className="px-8 py-6">
        <span className="portal-eyebrow">My Projects</span>
      </div>
      {projects.map((project, idx) => (
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
                  <span className={getStatusClass(project.status)}>
                    {getStatusLabel(project.status)}
                  </span>
                  <span className="portal-status text-foreground/60">
                    {project.project_type}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-5 max-w-3xl">
                {project.description}
              </p>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm border-t border-foreground/10 pt-4">
                <div className="flex justify-between md:justify-start md:gap-4">
                  <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-foreground/60">Location</dt>
                  <dd className="text-foreground">{project.country}, {project.region}</dd>
                </div>
                <div className="flex justify-between md:justify-start md:gap-4">
                  <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-foreground/60">Budget</dt>
                  <dd className="text-foreground">{project.budget_range}</dd>
                </div>
                <div className="flex justify-between md:justify-start md:gap-4">
                  <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-foreground/60">Requested</dt>
                  <dd className="text-foreground">{format(new Date(project.created_at), "MMM d, yyyy")}</dd>
                </div>
                {project.status !== "pending" && (
                  <div className="flex justify-between md:justify-start md:gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.16em] font-semibold text-foreground/60">Updated</dt>
                    <dd className="text-foreground">{format(new Date(project.updated_at), "MMM d, yyyy")}</dd>
                  </div>
                )}
              </dl>

              {project.status === "in_progress" && (
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-[0.14em] font-semibold text-foreground/60">
                    <span>Progress</span>
                    <span>In Development</span>
                  </div>
                  <Progress value={45} className="h-1 rounded-none" />
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
