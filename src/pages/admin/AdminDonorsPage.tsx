import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { calculateDonorTier } from "@/utils/donorTiers";

const formatActivityDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
};

export const AdminDonorsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [donorProjects, setDonorProjects] = useState<any[]>([]);

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profiles) {
        const donorsWithData = await Promise.all(
          profiles.map(async (profile) => {
            const [donationsRes, projectsRes] = await Promise.all([
              supabase.from("donations").select("amount").eq("donor_id", profile.id),
              supabase.from("commissioned_projects").select("id", { count: "exact", head: true }).eq("donor_id", profile.id),
            ]);

            const totalDonations = donationsRes.data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
            const tier = calculateDonorTier(totalDonations);

            return { ...profile, totalDonations, projectCount: projectsRes.count || 0, tier };
          }),
        );

        setDonors(donorsWithData);
      }
      setLoading(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load donors", variant: "destructive" });
      setLoading(false);
    }
  };

  const loadDonorDetails = async (donor: any) => {
    const { data: projects } = await supabase
      .from("commissioned_projects")
      .select("*")
      .eq("donor_id", donor.id)
      .order("created_at", { ascending: false });

    setDonorProjects(projects || []);
    setSelectedDonor(donor);
  };

  const filteredDonors = donors.filter((donor) =>
    searchTerm === "" ||
    donor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-serif text-foreground mb-2">Donor Management</h1>
        <p className="text-muted-foreground">View and manage all donors</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              aria-label="Search donors"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="font-medium">{donor.first_name} {donor.last_name}</TableCell>
                    <TableCell>{donor.email}</TableCell>
                    <TableCell><Badge variant="outline">{donor.tier?.name || "Unclassified"}</Badge></TableCell>
                    <TableCell>{donor.projectCount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatActivityDate(donor.updated_at || donor.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => loadDonorDetails(donor)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedDonor} onOpenChange={() => setSelectedDonor(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{selectedDonor?.first_name} {selectedDonor?.last_name}</DialogTitle>
          </DialogHeader>
          {selectedDonor && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedDonor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tier</p>
                  <Badge>{selectedDonor.tier?.name || "Unclassified"}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p className="font-medium">£{selectedDonor.totalDonations.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="font-medium">{selectedDonor.projectCount}</p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg mb-4">Commissioned Projects</h3>
                {donorProjects.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No projects</p>
                ) : (
                  <div className="space-y-3">
                    {donorProjects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{project.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{project.region} • {project.country}</p>
                            </div>
                            <Badge variant={project.status === "completed" ? "default" : project.status === "in_progress" ? "secondary" : "outline"}>
                              {project.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
