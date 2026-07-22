import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userId, setUserId] = useState<string>("");
  const [assignedProjects, setAssignedProjects] = useState<{ id: string; label: string }[]>([]);
  const [selectedAgreementProject, setSelectedAgreementProject] = useState<string | null>(null);
  const { isComplete, isLoading: onboardingLoading, markOnboardingComplete, resetOnboarding } = useOnboarding("volunteer");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
      navigate("/auth");
      return;
    }

    // Fetch volunteer profile
    const { data: volunteerData, error } = await supabase
      .from("volunteers")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (error || !volunteerData) {
      toast({
        title: "Access denied",
        description: "You need to be an approved volunteer to access this dashboard.",
        variant: "destructive",
      });
      navigate("/volunteer-apply");
      return;
    }

    if (volunteerData.status !== 'approved') {
      toast({
        title: "Application pending",
        description: "Your volunteer application is still under review. You'll be notified once approved.",
      });
      navigate("/");
      return;
    }

    setVolunteer(volunteerData);
    setUserId(session.user.id);

    // Load assigned projects (agreement selector)
    const { data: assigns } = await supabase
      .from("volunteer_project_assignments")
      .select("project_id, commissioned_projects(id,title)")
      .eq("volunteer_id", volunteerData.id);
    const list = (assigns || [])
      .map((a: any) => a.commissioned_projects)
      .filter(Boolean)
      .map((p: any) => ({ id: p.id, label: p.title }));
    setAssignedProjects(list);
    if (list.length) setSelectedAgreementProject(list[0].id);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container-section py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Project Team Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {volunteer.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="container-section py-8">
          {/* Welcome Card */}
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

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Available Projects</span>
                <span className="sm:hidden">Available</span>
              </TabsTrigger>
              <TabsTrigger value="my-projects" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">My Assigned Projects</span>
                <span className="sm:hidden">Mine</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-xs sm:text-sm">
                
                <span className="hidden sm:inline">Messages</span>
                <span className="sm:hidden">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm">
                
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{volunteer.skills}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      Active Team Member
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      
                      <span>Coming Soon</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Available Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-12">
                    Project listings will be available once projects are commissioned and approved by admin.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-projects">
              <VolunteerAssignedProjects volunteerId={volunteer.id} />
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-12">
                    All messages are coordinated through the admin team for privacy and compliance.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{volunteer.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Skills</Label>
                    <p className="text-sm text-muted-foreground">{volunteer.skills}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{volunteer.experience}</p>
                  </div>
                  {volunteer.cv_url && (
                    <div>
                      <Label className="text-sm font-medium">CV</Label>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <a href={volunteer.cv_url} target="_blank" rel="noopener noreferrer">
                          Download CV
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* AI Assistant Widget */}
        {volunteer && <VolunteerAIWidget volunteerId={volunteer.id} />}
      </div>
    </>
  );
};

// Label component for profile section
const Label = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);