import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { donorOnboardingSteps } from "@/data/onboardingSteps";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User as UserIcon, Heart, History, MessageSquare, LogOut, DollarSign, Shield, Download, Trash2, BookOpen, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DonorTierBadge } from "@/components/donor/DonorTierBadge";
import { DonationHistoryTable } from "@/components/donor/DonationHistoryTable";
import { MessagesPanel } from "@/components/donor/MessagesPanel";
import { calculateDonorTier } from "@/utils/donorTiers";
import { CommissionProjectForm } from "@/components/donor/CommissionProjectForm";
import { CommissionedProjectsList } from "@/components/donor/CommissionedProjectsList";
import { DonorAIWidget } from "@/components/ai/DonorAIWidget";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  gdpr_consent: boolean;
  two_factor_enabled: boolean;
}

export const DonorDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileEdit, setProfileEdit] = useState({ first_name: "", last_name: "", email: "" });
  const { isComplete, isLoading: onboardingLoading, markOnboardingComplete, resetOnboarding } = useOnboarding("donor");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") navigate("/auth");
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!onboardingLoading && isComplete === false && user) {
      setShowOnboarding(true);
    }
  }, [onboardingLoading, isComplete, user]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }
    setUser(session.user);
    
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
    if (profileData) {
      setProfile(profileData);
      setProfileEdit({ first_name: profileData.first_name, last_name: profileData.last_name, email: profileData.email });
    }

    const { data: donationsData } = await supabase.from("donations").select("*").eq("donor_id", session.user.id).order("created_at", { ascending: false });
    if (donationsData) {
      setDonations(donationsData);
      setTotalDonated(donationsData.reduce((sum, d) => sum + Number(d.amount), 0));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
    navigate("/");
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(profileEdit).eq("id", user.id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Profile updated" });
      setProfile({ ...profile!, ...profileEdit });
    }
  };

  const handleDataExport = () => {
    const blob = new Blob([JSON.stringify({ profile, donations, exported_at: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `my-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast({ title: "Data exported" });
  };

  const handleAccountDeletion = async () => {
    if (!user) return;
    const { error } = await supabase.from("gdpr_requests").insert({ user_id: user.id, request_type: "deletion", status: "pending" });
    if (!error) toast({ title: "Deletion request submitted" });
  };

  const donorTier = calculateDonorTier(totalDonated);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <>
      {showOnboarding && (
        <OnboardingTour
          steps={donorOnboardingSteps}
          onComplete={() => {
            markOnboardingComplete();
            setShowOnboarding(false);
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10">
      <header className="bg-background border-b">
        <div className="container-section py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <div><h1 className="text-2xl font-bold">Donor Portal</h1><p className="text-sm text-muted-foreground">Welcome back, {profile?.first_name}!</p></div>
          </div>
          <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>
      </header>

      <div className="container-section py-8">
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Welcome to Your Donor Dashboard</h2>
                <p className="text-muted-foreground mb-4">Thank you for your support. View contributions, track impact, and manage preferences.</p>
                <DonorTierBadge tierName={donorTier.name} totalDonated={totalDonated} />
              </div>
              <Link to="/donor-guide"><Button variant="outline"><BookOpen className="w-4 h-4 mr-2" />Donor Guide</Button></Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">£{totalDonated.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tier</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-lg font-bold">{donorTier.name}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-lg font-bold">{donations.length > 0 ? new Date(donations[0].created_at).toLocaleDateString() : 'N/A'}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="donate" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="donate" className="text-xs sm:text-sm">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Donate</span>
              <span className="sm:hidden">Give</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">My Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="commission" className="text-xs sm:text-sm">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Commission</span>
              <span className="sm:hidden">New</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <History className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Messages</span>
              <span className="sm:hidden">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donate"><Card><CardHeader><CardTitle>Make a Donation</CardTitle></CardHeader><CardContent><div className="text-center py-12"><Heart className="w-16 h-16 text-primary mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">Ready to Make a Difference?</h3><Link to="/donation-form"><Button size="lg">Start Donation</Button></Link></div></CardContent></Card></TabsContent>
          
          <TabsContent value="projects"><CommissionedProjectsList /></TabsContent>
          
          <TabsContent value="commission"><CommissionProjectForm /></TabsContent>
          
          <TabsContent value="history"><Card><CardHeader><CardTitle>Donation History</CardTitle></CardHeader><CardContent>{donations.length === 0 ? <p className="text-muted-foreground">No donations yet</p> : <DonationHistoryTable donations={donations} donorName={`${profile?.first_name} ${profile?.last_name}`} />}</CardContent></Card></TabsContent>
          
          <TabsContent value="messages">{user && <MessagesPanel userId={user.id} />}</TabsContent>
          
          <TabsContent value="profile" className="space-y-4">
            <Card><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label>First Name</Label><Input value={profileEdit.first_name} onChange={(e) => setProfileEdit({ ...profileEdit, first_name: e.target.value })} /></div><div><Label>Last Name</Label><Input value={profileEdit.last_name} onChange={(e) => setProfileEdit({ ...profileEdit, last_name: e.target.value })} /></div><div><Label>Email</Label><Input value={profileEdit.email} onChange={(e) => setProfileEdit({ ...profileEdit, email: e.target.value })} /></div><Button onClick={handleProfileUpdate}>Update Profile</Button></CardContent></Card>
            <Card><CardHeader><CardTitle>Donor Benefits</CardTitle></CardHeader><CardContent><p className="font-medium mb-2">As a {donorTier.name}, you receive:</p><ul className="list-disc list-inside">{donorTier.benefits.map((b, i) => <li key={i} className="text-sm text-muted-foreground">{b}</li>)}</ul></CardContent></Card>
            <Card><CardHeader><CardTitle>GDPR & Privacy</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex gap-2"><Button variant="outline" size="sm" onClick={handleDataExport}><Download className="w-4 h-4 mr-2" />Export Data</Button><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-2" />Delete Account</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will submit a deletion request processed within 30 days.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleAccountDeletion}>Submit Request</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* AI Assistant Widget */}
      {user && <DonorAIWidget donorId={user.id} />}
    </div>
    </>
  );
};
