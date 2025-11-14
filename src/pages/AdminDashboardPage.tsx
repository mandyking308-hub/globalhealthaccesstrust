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
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [fundAllocations, setFundAllocations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Message form state
  const [messageForm, setMessageForm] = useState({
    recipient: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
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
    // Load donors
    const { data: donorsData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setDonors(donorsData || []);

    // Load donations
    const { data: donationsData } = await supabase
      .from("donations")
      .select("*, profiles(first_name, last_name, email)")
      .order("created_at", { ascending: false });
    setDonations(donationsData || []);

    // Load fund allocations
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

    const { error } = await supabase
      .from("messages")
      .insert({
        from_user_id: session.user.id,
        to_user_id: messageForm.recipient,
        subject: messageForm.subject,
        body: messageForm.body,
        status: "unread",
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Message sent successfully.",
      });
      setMessageForm({ recipient: "", subject: "", body: "" });
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const filteredDonors = donors.filter(donor => 
    donor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDonations = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const donationsByPurpose = donations.reduce((acc: any, d) => {
    acc[d.purpose] = (acc[d.purpose] || 0) + parseFloat(d.amount);
    return acc;
  }, {});

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="allocations">Fund Allocation</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Donors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{donors.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formatCurrency(totalDonations, 'GBP')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{donations.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Donations by Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(donationsByPurpose).map(([purpose, amount]: [string, any]) => (
                    <div key={purpose} className="flex justify-between items-center">
                      <span className="capitalize">{purpose.replace(/_/g, ' ')}</span>
                      <span className="font-semibold">{formatCurrency(amount, 'GBP')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donor Management</CardTitle>
                <CardDescription>View and manage registered donors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>GDPR Consent</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell>{donor.first_name} {donor.last_name}</TableCell>
                        <TableCell>{donor.email}</TableCell>
                        <TableCell>{donor.gdpr_consent ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{formatDate(donor.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>All donations received</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          {donation.profiles?.first_name} {donation.profiles?.last_name}
                        </TableCell>
                        <TableCell>{formatCurrency(donation.amount, donation.currency)}</TableCell>
                        <TableCell className="capitalize">{donation.purpose.replace(/_/g, ' ')}</TableCell>
                        <TableCell className="capitalize">{donation.frequency.replace(/_/g, ' ')}</TableCell>
                        <TableCell>{formatDate(donation.created_at)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {donation.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Allocation</CardTitle>
                <CardDescription>Track how donations are allocated to projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fundAllocations.map((allocation) => (
                      <TableRow key={allocation.id}>
                        <TableCell>{allocation.project_name}</TableCell>
                        <TableCell>{formatCurrency(allocation.amount, 'GBP')}</TableCell>
                        <TableCell>{formatDate(allocation.created_at)}</TableCell>
                        <TableCell>{allocation.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Message to Donor</CardTitle>
                <CardDescription>Communicate with donors</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <select
                      id="recipient"
                      className="w-full border rounded-md p-2"
                      value={messageForm.recipient}
                      onChange={(e) => setMessageForm({ ...messageForm, recipient: e.target.value })}
                      required
                    >
                      <option value="">Select a donor</option>
                      {donors.map((donor) => (
                        <option key={donor.id} value={donor.id}>
                          {donor.first_name} {donor.last_name} ({donor.email})
                        </option>
                      ))}
                    </select>
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
                    <Label htmlFor="body">Message</Label>
                    <Textarea
                      id="body"
                      rows={6}
                      value={messageForm.body}
                      onChange={(e) => setMessageForm({ ...messageForm, body: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
