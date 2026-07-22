import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { donorOnboardingSteps } from "@/data/onboardingSteps";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { DonorTierBadge } from "@/components/donor/DonorTierBadge";
import { DonationHistoryTable } from "@/components/donor/DonationHistoryTable";
import { MessagesPanel } from "@/components/donor/MessagesPanel";
import { calculateDonorTier } from "@/utils/donorTiers";
import { CommissionProjectForm } from "@/components/donor/CommissionProjectForm";
import { CommissionedProjectsList } from "@/components/donor/CommissionedProjectsList";
import { DonorAIWidget } from "@/components/ai/DonorAIWidget";
import { DonorAgreementPanel } from "@/components/agreement/DonorAgreementPanel";
import { SupportCentrePanel } from "@/components/service/SupportCentrePanel";

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
  const [myProjects, setMyProjects] = useState<{ id: string; title: string }[]>([]);
  const [selectedAgreementProject, setSelectedAgreementProject] = useState<string | null>(null);
  const [profileEdit, setProfileEdit] = useState({ first_name: "", last_name: "", email: "" });
  const { isComplete, isLoading: onboardingLoading, markOnboardingComplete } = useOnboarding("donor");
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
    const { data: projs } = await supabase.from("commissioned_projects").select("id,title").eq("donor_id", session.user.id).order("created_at", { ascending: false });
    if (projs) { setMyProjects(projs); if (projs.length) setSelectedAgreementProject(projs[0].id); }

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

  if (loading) return <div className="min-h-screen flex items-center justify-center donor-portal"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

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

      <div className="min-h-screen donor-portal">
        <Helmet><title>Donor Dashboard | Global Health Access Trust</title><meta name="robots" content="noindex, nofollow" /></Helmet>

        {/* Portal header — editorial, ivory, deep-emerald identity */}
        <header className="bg-background border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6">
            <div>
              <span className="portal-eyebrow">Secure Donor Portal</span>
              <p className="mt-1 text-[15px] text-foreground">Welcome back, {profile?.first_name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" className="h-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/70 hover:text-primary">Return to Site</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="h-10 border-foreground/20 text-[13px] font-semibold uppercase tracking-[0.08em]">Logout</Button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">

          {/* Editorial welcome band */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-14 mb-12 pb-12 border-b border-foreground/10">
            <span className="portal-eyebrow md:mt-2">Donor Portal</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <h1 className="no-display text-foreground mb-4" style={{ fontFamily: "var(--font-serif)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1 }}>
                  Welcome to Your Donor Dashboard
                </h1>
                <p className="text-[16px] text-muted-foreground leading-relaxed mb-5">
                  Thank you for your support. View contributions, track impact, and manage preferences.
                </p>
                <DonorTierBadge tierName={donorTier.name} totalDonated={totalDonated} />
              </div>
              <Link to="/donor-guide">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.12em] text-[12px] font-semibold uppercase h-11 px-6">
                  Donor Guide
                </Button>
              </Link>
            </div>
          </section>

          {/* Stat strip — bordered archive band, not floating cards */}
          <section className="portal-stat-strip mb-12">
            <div className="portal-stat">
              <div className="portal-stat-label">Total Donated</div>
              <div className="portal-stat-value">£{totalDonated.toLocaleString()}</div>
              <p className="mt-2 text-xs text-muted-foreground">All time</p>
            </div>
            <div className="portal-stat">
              <div className="portal-stat-label">Donations</div>
              <div className="portal-stat-value">{donations.length}</div>
            </div>
            <div className="portal-stat">
              <div className="portal-stat-label">Tier</div>
              <div className="portal-stat-value" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>{donorTier.name}</div>
            </div>
            <div className="portal-stat">
              <div className="portal-stat-label">Recent</div>
              <div className="portal-stat-value" style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}>
                {donations.length > 0 ? new Date(donations[0].created_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </section>

          {/* Tabs — underlined editorial navigation */}
          <Tabs defaultValue="donate" className="portal-tabs space-y-8">
            <TabsList className="w-full flex flex-wrap justify-start">
              <TabsTrigger value="donate">Make a Donation</TabsTrigger>
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="commission">Commission a New Project</TabsTrigger>
              <TabsTrigger value="history">Donation History</TabsTrigger>
              <TabsTrigger value="messages">Project Messages</TabsTrigger>
              <TabsTrigger value="profile">Account &amp; Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="donate">
              <div className="portal-panel">
                <span className="portal-eyebrow mb-3">Make a Donation</span>
                <h2 className="text-foreground mt-2 mb-3" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>Ready to Make a Difference?</h2>
                <Link to="/donation-form">
                  <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase h-11 px-8">
                    Start Donation
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="projects"><CommissionedProjectsList /></TabsContent>

            <TabsContent value="agreements">
              <div className="portal-panel">
                <span className="portal-eyebrow mb-3">Project Charter</span>
                {myProjects.length === 0 ? (
                  <p className="text-muted-foreground mt-4">You have no commissioned projects yet.</p>
                ) : (
                  <>
                    <div className="mb-4">
                      <select value={selectedAgreementProject || ""} onChange={(e) => setSelectedAgreementProject(e.target.value)} className="border rounded px-3 py-2 text-sm">
                        {myProjects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                    {selectedAgreementProject && user && (
                      <DonorAgreementPanel projectId={selectedAgreementProject} currentUserId={user.id} />
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="commission"><CommissionProjectForm /></TabsContent>


            <TabsContent value="history">
              <div className="portal-panel">
                <span className="portal-eyebrow mb-4">Donation History</span>
                <h2 className="text-foreground mt-2 mb-6" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>Donation History</h2>
                {donations.length === 0
                  ? <p className="text-muted-foreground">No donations yet</p>
                  : <DonationHistoryTable donations={donations} donorName={`${profile?.first_name} ${profile?.last_name}`} />}
              </div>
            </TabsContent>

            <TabsContent value="messages">{user && <MessagesPanel userId={user.id} />}</TabsContent>

            <TabsContent value="support">
              {user && (
                <SupportCentrePanel
                  role="donor"
                  currentUserId={user.id}
                  projectOptions={myProjects.map((p) => ({ id: p.id, label: p.title }))}
                />
              )}
            </TabsContent>



            <TabsContent value="profile" className="space-y-6">
              <div className="portal-panel">
                <span className="portal-eyebrow mb-4">Personal Information</span>
                <h2 className="text-foreground mt-2 mb-6" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>Personal Information</h2>
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">First Name</Label>
                    <Input value={profileEdit.first_name} onChange={(e) => setProfileEdit({ ...profileEdit, first_name: e.target.value })} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Last Name</Label>
                    <Input value={profileEdit.last_name} onChange={(e) => setProfileEdit({ ...profileEdit, last_name: e.target.value })} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">Email</Label>
                    <Input value={profileEdit.email} onChange={(e) => setProfileEdit({ ...profileEdit, email: e.target.value })} className="h-11" />
                  </div>
                  <Button onClick={handleProfileUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-[0.1em] text-[13px] font-semibold uppercase h-11 px-6 mt-2">
                    Update Profile
                  </Button>
                </div>
              </div>

              <div className="portal-panel">
                <span className="portal-eyebrow mb-4">Donor Benefits</span>
                <h2 className="text-foreground mt-2 mb-4" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>Donor Benefits</h2>
                <p className="text-foreground mb-3">As a {donorTier.name}, you receive:</p>
                <ul className="space-y-2 pl-5 list-disc marker:text-primary text-muted-foreground">
                  {donorTier.benefits.map((b, i) => <li key={i} className="text-[15px] leading-relaxed">{b}</li>)}
                </ul>
              </div>

              <div className="portal-panel">
                <span className="portal-eyebrow mb-4">GDPR & Privacy</span>
                <h2 className="text-foreground mt-2 mb-6" style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 500 }}>GDPR & Privacy</h2>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={handleDataExport} className="border-foreground/20 tracking-[0.08em] text-[12px] font-semibold uppercase">Export Data</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="tracking-[0.08em] text-[12px] font-semibold uppercase">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will submit a deletion request processed within 30 days.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAccountDeletion}>Submit Request</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {user && <DonorAIWidget donorId={user.id} />}
      </div>
    </>
  );
};
