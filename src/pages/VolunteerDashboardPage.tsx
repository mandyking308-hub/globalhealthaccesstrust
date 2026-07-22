import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { volunteerOnboardingSteps } from "@/data/onboardingSteps";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { VolunteerAIWidget } from "@/components/ai/VolunteerAIWidget";
import { VolunteerAssignedProjects } from "@/components/volunteer/VolunteerAssignedProjects";
import { TeamAgreementPanel } from "@/components/agreement/TeamAgreementPanel";
import { SupportCentrePanel } from "@/components/service/SupportCentrePanel";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  status: string;
  skills: string;
  experience: string;
  cv_url: string;
}

export const VolunteerDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [assignedProjects, setAssignedProjects] = useState<{ id: string; label: string }[]>([]);
  const [selectedAgreementProject, setSelectedAgreementProject] = useState<string | null>(null);
  const { isComplete, isLoading: onboardingLoading, markOnboardingComplete } = useOnboarding("volunteer");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!onboardingLoading && isComplete === false && volunteer) {
      setShowOnboarding(true);
    }
  }, [onboardingLoading, isComplete, volunteer]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth?portal=team");
      return;
    }

    const { data: volunteerData, error } = await supabase
      .from("volunteers")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (error || !volunteerData) {
      toast({
        title: "Access denied",
        description: "You need to be an approved project team member to access this dashboard.",
        variant: "destructive",
      });
      navigate("/volunteer-apply");
      return;
    }

    if (volunteerData.status !== "approved") {
      toast({
        title: "Application pending",
        description: "Your project team application is still under review. You'll be notified once approved.",
      });
      navigate("/");
      return;
    }

    setVolunteer(volunteerData);
    setUserId(session.user.id);

    const { data: assignments } = await supabase
      .from("volunteer_project_assignments")
      .select("project_id, commissioned_projects(id,title)")
      .eq("volunteer_id", volunteerData.id);

    const projects = (assignments || [])
      .map((assignment: any) => assignment.commissioned_projects)
      .filter(Boolean)
      .map((project: any) => ({ id: project.id, label: project.title }));

    setAssignedProjects(projects);
    if (projects.length) setSelectedAgreementProject(projects[0].id);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!volunteer) return null;

  return (
    <>
      {showOnboarding && (
        <OnboardingTour
          steps={volunteerOnboardingSteps}
          onComplete={() => {
            markOnboardingComplete();
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      <SEO
        title="Project Team Portal - Global Health Access Trust"
        description="Secure workspace for approved project teams to manage assigned projects, submit progress, upload field evidence and communicate with the Trust."
        canonical="/volunteer-dashboard"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container-section py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Project Team Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {volunteer.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/">Return to Site</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </header>

        <main className="container-section py-8">
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">Project Team workspace</h2>
                  <p className="text-muted-foreground mb-4">
                    Access assigned projects, report progress, upload evidence, submit expenses, update milestones and communicate securely with the Trust Office.
                  </p>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    Approved Team Member
                  </Badge>
                </div>
                <div className="flex items-center gap-2 px-6 py-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div>
                    <p className="text-sm font-semibold">AI Field Support</p>
                    <p className="text-xs text-muted-foreground">Coming Online</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
            <TabsList className="flex flex-wrap gap-1 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="available-projects" className="text-xs sm:text-sm">Available Projects</TabsTrigger>
              <TabsTrigger value="my-projects" className="text-xs sm:text-sm">My Projects</TabsTrigger>
              <TabsTrigger value="agreement" className="text-xs sm:text-sm">Agreement</TabsTrigger>
              <TabsTrigger value="support" className="text-xs sm:text-sm">Support</TabsTrigger>
              <TabsTrigger value="private" className="text-xs sm:text-sm">Report Privately</TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader><CardTitle className="text-sm font-medium">Skills</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{volunteer.skills}</p></CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader><CardTitle className="text-sm font-medium">Status</CardTitle></CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Active Team Member</Badge>
                  </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader><CardTitle className="text-sm font-medium">AI Assistant</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">Coming Soon</p></CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="available-projects">
              <Card>
                <CardHeader><CardTitle>Available Projects</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-12">
                    Project listings will be available once projects are commissioned and approved by administration.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-projects">
              <VolunteerAssignedProjects volunteerId={volunteer.id} />
            </TabsContent>

            <TabsContent value="agreement">
              <Card>
                <CardContent className="pt-6">
                  {assignedProjects.length === 0 ? (
                    <p className="text-muted-foreground">You have no assigned projects yet.</p>
                  ) : (
                    <>
                      <div className="mb-4">
                        <select
                          value={selectedAgreementProject || ""}
                          onChange={(event) => setSelectedAgreementProject(event.target.value)}
                          className="border rounded px-3 py-2 text-sm"
                          aria-label="Select project team agreement"
                        >
                          {assignedProjects.map((project) => (
                            <option key={project.id} value={project.id}>{project.label}</option>
                          ))}
                        </select>
                      </div>
                      {selectedAgreementProject && (
                        <TeamAgreementPanel projectId={selectedAgreementProject} currentUserId={userId} />
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support">
              <SupportCentrePanel role="project_team" currentUserId={userId} projectOptions={assignedProjects} />
            </TabsContent>

            <TabsContent value="private">
              <Card>
                <CardHeader><CardTitle>Confidential and protected reporting</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Use the protected route for a confidential concern, or the safeguarding route where a child or adult at risk may be affected.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild><Link to="/protected-concerns/new">Raise a Protected Concern</Link></Button>
                    <Button variant="outline" asChild><Link to="/safeguarding/report">Make a Safeguarding Report</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader><CardTitle>Your Profile</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <ProfileRow label="Name" value={volunteer.name} />
                  <ProfileRow label="Email" value={volunteer.email} />
                  <ProfileRow label="Skills" value={volunteer.skills} />
                  <ProfileRow label="Experience" value={volunteer.experience} preserveWhitespace />
                  {volunteer.cv_url && (
                    <div>
                      <div className="text-sm font-medium">CV</div>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <a href={volunteer.cv_url} target="_blank" rel="noopener noreferrer">Download CV</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <VolunteerAIWidget volunteerId={volunteer.id} />
      </div>
    </>
  );
};

const ProfileRow = ({ label, value, preserveWhitespace = false }: { label: string; value: string; preserveWhitespace?: boolean }) => (
  <div>
    <div className="text-sm font-medium">{label}</div>
    <p className={`text-sm text-muted-foreground ${preserveWhitespace ? "whitespace-pre-wrap" : ""}`}>{value}</p>
  </div>
);
