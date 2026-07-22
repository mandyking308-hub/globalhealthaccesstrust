import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { adminOnboardingSteps } from "@/data/onboardingSteps";

const MetricCard = ({ title, value, color, onClick }: { title: string; value: number; color: string; onClick: () => void }) => (
  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
    <CardContent className="pt-6">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { isComplete, isLoading: onboardingLoading, markOnboardingComplete } = useOnboarding("admin");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [metrics, setMetrics] = useState({
    totalDonors: 0,
    totalVolunteers: 0,
    activeProjects: 0,
    pendingProjects: 0,
    completedProjects: 0,
    pendingEvidence: 0,
    pendingVolunteerApps: 0,
    overdueMilestones: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (!onboardingLoading && isComplete === false && !loading) {
      setShowOnboarding(true);
    }
  }, [onboardingLoading, isComplete, loading]);

  const loadDashboardData = async () => {
    try {
      // Load metrics
      const [donorsRes, volunteersRes, projectsRes, evidenceRes, milestonesRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("volunteers").select("id", { count: "exact", head: true }),
        supabase.from("commissioned_projects").select("status", { count: "exact" }),
        supabase.from("project_updates").select("id", { count: "exact", head: true }),
        supabase.from("project_milestones").select("is_completed", { count: "exact" }),
      ]);

      const projects = projectsRes.data || [];
      
      setMetrics({
        totalDonors: donorsRes.count || 0,
        totalVolunteers: volunteersRes.count || 0,
        activeProjects: projects.filter(p => p.status === "in_progress").length,
        pendingProjects: projects.filter(p => p.status === "pending").length,
        completedProjects: projects.filter(p => p.status === "completed").length,
        pendingEvidence: evidenceRes.count || 0,
        pendingVolunteerApps: 0, // Will be calculated from volunteers with status=pending
        overdueMilestones: 0, // Will be calculated based on due dates
      });

      // Load recent activity
      const { data: updates } = await supabase
        .from("project_updates")
        .select("*, commissioned_projects(title)")
        .order("created_at", { ascending: false })
        .limit(10);

      setRecentActivity(updates || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, icon: Icon, color, onClick }: any) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon ? <Icon className={`h-5 w-5 ${color}`} /> : null}
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold font-serif ${!Icon ? color : ''}`}>{value}</div>
      </CardContent>
    </Card>
  );


  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {showOnboarding && (
        <OnboardingTour
          steps={adminOnboardingSteps}
          onComplete={() => {
            markOnboardingComplete();
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}
      
      <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-serif text-foreground mb-2">Command Hub</h1>
        <p className="text-muted-foreground">Admin Operations Overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Donors"
          value={metrics.totalDonors}
          
          color="text-blue-600"
          onClick={() => navigate("/admin/donors")}
        />
        <MetricCard
          title="Total Volunteers"
          value={metrics.totalVolunteers}
          
          color="text-green-600"
          onClick={() => navigate("/admin/volunteers")}
        />
        <MetricCard
          title="Active Projects"
          value={metrics.activeProjects}
          
          color="text-purple-600"
          onClick={() => navigate("/admin/projects")}
        />
        <MetricCard
          title="Pending Evidence"
          value={metrics.pendingEvidence}
          
          color="text-orange-600"
          onClick={() => navigate("/admin/evidence")}
        />
        <MetricCard
          title="Pending Projects"
          value={metrics.pendingProjects}
          
          color="text-yellow-600"
          onClick={() => navigate("/admin/projects")}
        />
        <MetricCard
          title="Completed Projects"
          value={metrics.completedProjects}
          
          color="text-emerald-600"
          onClick={() => navigate("/admin/projects")}
        />
        <MetricCard
          title="Volunteer Apps"
          value={metrics.pendingVolunteerApps}
          
          color="text-indigo-600"
          onClick={() => navigate("/admin/volunteers")}
        />
        <MetricCard
          title="Overdue Milestones"
          value={metrics.overdueMilestones}
          
          color="text-red-600"
          onClick={() => navigate("/admin/projects")}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/admin/projects")} variant="outline">
            Review Project Requests
          </Button>
          <Button onClick={() => navigate("/admin/volunteers")} variant="outline">
            Review Volunteer Applications
          </Button>
          <Button onClick={() => navigate("/admin/evidence")} variant="outline">
            Evidence Approval Queue
          </Button>
          <Button onClick={() => navigate("/admin/projects")} variant="outline">
            Add Milestone
          </Button>
          <Button onClick={() => navigate("/admin/projects")} variant="outline">
            Project Overview
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.update_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.commissioned_projects?.title || "Unknown Project"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
};
