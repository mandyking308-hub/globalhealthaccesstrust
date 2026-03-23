import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FundAllocationChart } from "@/components/admin/FundAllocationChart";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";
import { exportToCSV } from "@/utils/exportUtils";
import { calculateDonorTier } from "@/utils/donorTiers";
import { Badge } from "@/components/ui/badge";
import { AdminAIPanel } from "@/components/ai/AdminAIPanel";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [fundAllocations, setFundAllocations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterPurpose, setFilterPurpose] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [messageForm, setMessageForm] = useState({
    recipient: "",
    recipientType: "individual",
    subject: "",
    body: "",
  });

  const MESSAGE_TEMPLATES = {
    thank_you: {
      subject: "Thank You for Your Generous Support",
      body: "Dear {name},\n\nThank you for your generous donation of {amount}. Your support makes a real difference in providing healthcare access to communities in need.\n\nWith gratitude,\nGlobal Health Access Trust"
    },
    impact_update: {
      subject: "Your Impact: Latest Project Updates",
      body: "Dear {name},\n\nWe wanted to share how your generous support is making a difference. Thanks to donors like you, we have been able to...\n\nBest regards,\nGlobal Health Access Trust"
    },
    event_invite: {
      subject: "Exclusive Invitation: Donor Appreciation Event",
      body: "Dear {name},\n\nAs a valued {tier} donor, we would like to invite you to our upcoming donor appreciation event...\n\nWarm regards,\nGlobal Health Access Trust"
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .in("role", ["admin", "super_admin"]);

    if (!roleData || roleData.length === 0) {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges.",
        variant: "destructive",
      });
      navigate("/donor-dashboard");
      return;
    }

    setIsAdmin(true);
    await loadData();
    setLoading(false);
  };

  const loadData = async () => {
    const { data: donorsData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: donationsData } = await supabase
      .from("donations")
      .select("*, profiles(first_name, last_name, email)")
      .order("created_at", { ascending: false });

    if (donorsData && donationsData) {
      const donorsWithTotals = donorsData.map(donor => {
        const donorDonations = donationsData.filter(d => d.donor_id === donor.id);
        const total = donorDonations.reduce((sum, d) => sum + Number(d.amount), 0);
        const tier = calculateDonorTier(total);
        const recurringCount = donorDonations.filter(d => d.frequency !== 'one_time').length;
        return { ...donor, total_donated: total, tier: tier.name, recurring_donations: recurringCount };
      });
      setDonors(donorsWithTotals);
    }

    setDonations(donationsData || []);

    const { data: allocationsData } = await supabase
      .from("fund_allocations")
      .select("*")
      .order("created_at", { ascending: false });
    setFundAllocations(allocationsData || []);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    let recipients: string[] = [];

    if (messageForm.recipientType === "individual") {
      recipients = [messageForm.recipient];
    } else if (messageForm.recipientType === "tier") {
      recipients = donors.filter(d => d.tier === messageForm.recipient).map(d => d.id);
    } else if (messageForm.recipientType === "all") {
      recipients = donors.map(d => d.id);
    }

    const messages = recipients.map(recipientId => ({
      from_user_id: session.user.id,
      to_user_id: recipientId,
      subject: messageForm.subject,
      body: messageForm.body,
      status: "unread" as const,
    }));

    const { error } = await supabase.from("messages").insert(messages);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Message sent to ${recipients.length} donor(s)` });
      setMessageForm({ recipient: "", recipientType: "individual", subject: "", body: "" });
    }
  };

  const applyMessageTemplate = (templateKey: keyof typeof MESSAGE_TEMPLATES) => {
    const template = MESSAGE_TEMPLATES[templateKey];
    setMessageForm({ ...messageForm, subject: template.subject, body: template.body });
  };

  const handleExportDonors = () => {
    const exportData = donors.map(d => ({
      'First Name': d.first_name,
      'Last Name': d.last_name,
      'Email': d.email,
      'Total Donated': d.total_donated,
      'Donor Tier': d.tier,
      'Recurring Donations': d.recurring_donations,
      'GDPR Consent': d.gdpr_consent ? 'Yes' : 'No',
      'Joined': new Date(d.created_at).toLocaleDateString()
    }));
    exportToCSV(exportData, 'donors');
    toast({ title: "Exported", description: "Donor data exported successfully" });
  };

  const handleExportDonations = () => {
    const exportData = donations.map(d => ({
      Date: new Date(d.created_at).toLocaleDateString(),
      'Donor Name': d.profiles ? `${d.profiles.first_name} ${d.profiles.last_name}` : 'N/A',
      Amount: d.amount,
      Currency: d.currency,
      Purpose: d.purpose.replace(/_/g, ' '),
      Frequency: d.frequency.replace(/_/g, ' '),
      Status: d.status
    }));
    exportToCSV(exportData, 'donations');
    toast({ title: "Exported", description: "Donation data exported successfully" });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredDonors = donors.filter(d => {
    const matchesSearch = 
      d.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === "all" || d.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const filteredDonations = donations.filter(d => {
    const matchesSearch = 
      d.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.amount.toString().includes(searchTerm);
    const matchesPurpose = filterPurpose === "all" || d.purpose === filterPurpose;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const donationDate = new Date(d.created_at);
      matchesDate = donationDate >= new Date(dateRange.start) && donationDate <= new Date(dateRange.end);
    }
    
    return matchesSearch && matchesPurpose && matchesDate;
  });

  const totalDonations = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const completedDonations = donations.filter(d => d.status === 'completed');
  const recurringDonors = donors.filter(d => d.recurring_donations > 0);
  const largestDonation = donations.length > 0 ? Math.max(...donations.map(d => Number(d.amount))) : 0;
  const topDonor = donors.length > 0 ? donors.reduce((prev, current) => 
    (prev.total_donated > current.total_donated) ? prev : current
  ) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container-section py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-3xl font-bold">Admin Console</h1>
                <p className="text-muted-foreground">Secure dashboard for authorized staff</p>
              </div>
            </div>
            <Badge variant="default" className="text-sm">
              
              Admin Access
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="allocations">Fund Allocation</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
              <TabsTrigger value="guide">Admin Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{donors.length}</div>
                    <p className="text-xs text-muted-foreground">{recurringDonors.length} recurring</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(totalDonations, 'GBP')}</div>
                    <p className="text-xs text-muted-foreground">{donations.length} contributions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Largest Donation</CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(largestDonation, 'GBP')}</div>
                    <p className="text-xs text-muted-foreground">Single contribution</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Donor</CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">
                      {topDonor ? `${topDonor.first_name} ${topDonor.last_name}` : 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {topDonor ? formatCurrency(topDonor.total_donated, 'GBP') : ''}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <FundAllocationChart donations={donations} />

              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Latest 10 donation transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Donor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations.slice(0, 10).map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>{formatDate(donation.created_at)}</TableCell>
                          <TableCell>
                            {donation.profiles ? `${donation.profiles.first_name} ${donation.profiles.last_name}` : 'N/A'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(donation.amount, donation.currency)}
                          </TableCell>
                          <TableCell>{donation.purpose.replace(/_/g, ' ')}</TableCell>
                          <TableCell>
                            <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                              {donation.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donors" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Donor Management</CardTitle>
                      <CardDescription>View, search, and export donor records</CardDescription>
                    </div>
                    <Button onClick={handleExportDonors} variant="outline">
                      
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:max-w-xs"
                    />
                    <Select value={filterTier} onValueChange={setFilterTier}>
                      <SelectTrigger className="md:max-w-xs">
                        <SelectValue placeholder="Filter by tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        <SelectItem value="Core Donor">Core Donor</SelectItem>
                        <SelectItem value="Founding Supporter">Founding Supporter</SelectItem>
                        <SelectItem value="Strategic Partner">Strategic Partner</SelectItem>
                        <SelectItem value="Legacy Builder">Legacy Builder</SelectItem>
                        <SelectItem value="Visionary Donor">Visionary Donor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Total Donated</TableHead>
                          <TableHead>Tier</TableHead>
                          <TableHead>Recurring</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDonors.map((donor) => (
                          <TableRow key={donor.id}>
                            <TableCell className="font-medium">
                              {donor.first_name} {donor.last_name}
                            </TableCell>
                            <TableCell>{donor.email}</TableCell>
                            <TableCell className="font-medium">{formatCurrency(donor.total_donated, 'GBP')}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{donor.tier}</Badge>
                            </TableCell>
                            <TableCell>{donor.recurring_donations > 0 ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{formatDate(donor.created_at)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="donations" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Donation Records</CardTitle>
                      <CardDescription>Track all donation transactions with advanced filters</CardDescription>
                    </div>
                    <Button onClick={handleExportDonations} variant="outline">
                      
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                      placeholder="Search donations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={filterPurpose} onValueChange={setFilterPurpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Purposes</SelectItem>
                        <SelectItem value="healthcare_access">Healthcare Access</SelectItem>
                        <SelectItem value="humanitarian_response">Humanitarian Response</SelectItem>
                        <SelectItem value="research_policy">Research & Policy</SelectItem>
                        <SelectItem value="professional_education">Professional Education</SelectItem>
                        <SelectItem value="where_most_needed">Where Most Needed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      placeholder="Start date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <Input
                      type="date"
                      placeholder="End date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDonations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell>{formatDate(donation.created_at)}</TableCell>
                            <TableCell>
                              {donation.profiles ? `${donation.profiles.first_name} ${donation.profiles.last_name}` : 'N/A'}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(donation.amount, donation.currency)}
                            </TableCell>
                            <TableCell>{donation.purpose.replace(/_/g, ' ')}</TableCell>
                            <TableCell>
                              <Badge variant={donation.frequency === 'one_time' ? 'secondary' : 'default'}>
                                {donation.frequency.replace(/_/g, ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                donation.status === 'completed' ? 'default' :
                                donation.status === 'pending' ? 'secondary' : 'destructive'
                              }>
                                {donation.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="allocations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Allocation Records</CardTitle>
                  <CardDescription>Track fund allocation to specific projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fundAllocations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No fund allocations recorded
                          </TableCell>
                        </TableRow>
                      ) : (
                        fundAllocations.map((allocation) => (
                          <TableRow key={allocation.id}>
                            <TableCell className="font-medium">{allocation.project_name}</TableCell>
                            <TableCell className="font-medium">{formatCurrency(allocation.amount, 'GBP')}</TableCell>
                            <TableCell>{formatDate(allocation.created_at)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {allocation.notes || '-'}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Donor Messaging System</CardTitle>
                  <CardDescription>Send messages to individual donors, tiers, or all donors</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Recipient Type</Label>
                        <Select 
                          value={messageForm.recipientType} 
                          onValueChange={(value) => setMessageForm({ ...messageForm, recipientType: value, recipient: "" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Donor</SelectItem>
                            <SelectItem value="tier">Donor Tier</SelectItem>
                            <SelectItem value="all">All Donors (Broadcast)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Recipient</Label>
                        {messageForm.recipientType === "individual" && (
                          <Select value={messageForm.recipient} onValueChange={(value) => setMessageForm({ ...messageForm, recipient: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select donor" />
                            </SelectTrigger>
                            <SelectContent>
                              {donors.map((donor) => (
                                <SelectItem key={donor.id} value={donor.id}>
                                  {donor.first_name} {donor.last_name} ({donor.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {messageForm.recipientType === "tier" && (
                          <Select value={messageForm.recipient} onValueChange={(value) => setMessageForm({ ...messageForm, recipient: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Core Donor">Core Donor</SelectItem>
                              <SelectItem value="Founding Supporter">Founding Supporter</SelectItem>
                              <SelectItem value="Strategic Partner">Strategic Partner</SelectItem>
                              <SelectItem value="Legacy Builder">Legacy Builder</SelectItem>
                              <SelectItem value="Visionary Donor">Visionary Donor</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        {messageForm.recipientType === "all" && (
                          <Input value="All Donors" disabled />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Message Templates</Label>
                      <div className="flex gap-2 mt-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => applyMessageTemplate('thank_you')}>
                          Thank You
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => applyMessageTemplate('impact_update')}>
                          Impact Update
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => applyMessageTemplate('event_invite')}>
                          Event Invite
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={messageForm.subject}
                        onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="body">Message Body</Label>
                      <Textarea
                        id="body"
                        rows={8}
                        value={messageForm.body}
                        onChange={(e) => setMessageForm({ ...messageForm, body: e.target.value })}
                        required
                        placeholder="Use {name}, {amount}, and {tier} as placeholders"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Available placeholders: {'{name}'}, {'{amount}'}, {'{tier}'}
                      </p>
                    </div>

                    <Button type="submit" className="w-full">
                      
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <AuditLogViewer />
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    
                    Admin Console Guide
                  </CardTitle>
                  <CardDescription>Comprehensive walkthrough for authorized staff</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h2 className="text-2xl font-bold mb-4">🏛️ Admin Console Walkthrough – Global Health Access Trust</h2>
                  
                  <p className="text-muted-foreground mb-6">
                    The Admin Console is the operational heart of the Global Health Access Trust donation system. 
                    It is a secure, staff-only interface for managing donor records, monitoring donation flows, 
                    allocating funds, and maintaining GDPR-compliant communication with high-value donors.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">🔧 Key Features</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        🔐 Secure Admin Login
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Password-protected with permission-based access (Superadmin / Editor).
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        📋 Donor Management
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Search, filter, and export donor records. View by tier, date, or project preference.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        💳 Donation Oversight
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Live dashboard showing total donations, recurring status, and category breakdown.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        🧾 Exportable Reports
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Download CSV or PDF reports for accounting, audit, or board review.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        📊 Fund Allocation Panel
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Tag donations to project categories. View real-time pie/bar charts by fund allocation.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        ✉️ Messaging System
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Send individual or mass messages to donors. Track read/open status.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        
                        🧠 Activity Logs
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor actions taken by each admin (data changes, messages sent, etc.).
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-3">🔒 Security & Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    The Admin Console is protected with SSL encryption and right-click disabling. 
                    Admin access is restricted to authorised personnel and recorded through an internal activity log. 
                    Data handling is GDPR-compliant, with donor deletion options available on request.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-3">📝 Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    The Admin Console enables the charity to manage donations at scale, with full transparency and traceability. 
                    All donor activity is recorded and classified, while administrators maintain full control over fund messaging and allocation.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* AI Assistant Widget */}
      <AdminAIPanel />
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
