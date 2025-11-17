import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Briefcase, FolderOpen, MessageSquare, Bot, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { VolunteerAIWidget } from "@/components/ai/VolunteerAIWidget";

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

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

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
      navigate("/volunteers");
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
      <SEO
        title="Volunteer Dashboard - Global Health Access Trust"
        description="Your volunteer portal for managing projects and updates"
        canonical="/volunteer-dashboard"
      />

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container-section py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Volunteer Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {volunteer.name}!</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
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
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Volunteer Dashboard</h2>
                  <p className="text-muted-foreground mb-4">
                    View available projects, manage your assignments, and coordinate with the GHAT team.
                  </p>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Approved Volunteer
                  </Badge>
                </div>
                <div className="flex items-center gap-2 px-6 py-4 bg-accent/10 rounded-lg border border-accent/20">
                  <Bot className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-sm font-semibold">AI Field Support</p>
                    <p className="text-xs text-muted-foreground">Coming Online</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">
                <Briefcase className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects">
                <FolderOpen className="w-4 h-4 mr-2" />
                Available Projects
              </TabsTrigger>
              <TabsTrigger value="my-projects">
                <CheckCircle className="w-4 h-4 mr-2" />
                My Projects
              </TabsTrigger>
              <TabsTrigger value="messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{volunteer.skills}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      Active Volunteer
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bot className="w-4 h-4 text-accent" />
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
              <Card>
                <CardHeader>
                  <CardTitle>My Assigned Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-12">
                    No projects assigned yet. Check the Available Projects tab to request assignments.
                  </p>
                </CardContent>
              </Card>
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