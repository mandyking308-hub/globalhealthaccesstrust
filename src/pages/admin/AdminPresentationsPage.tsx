import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { useNavigate } from "react-router-dom";

interface PresentationData {
  id: string;
  title: string;
  type: string;
  status: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}

export const AdminPresentationsPage = () => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState<PresentationData[]>([]);
  const [globalDeck, setGlobalDeck] = useState<PresentationData | null>(null);
  const [projectDecks, setProjectDecks] = useState<PresentationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      const { data, error } = await supabase
        .from("presentations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPresentations(data || []);
      
      // Separate global deck from project decks
      const global = data?.find(p => p.type === "global_overview") || null;
      const projects = data?.filter(p => p.type === "project_deck") || [];
      
      setGlobalDeck(global);
      setProjectDecks(projects);
    } catch (error) {
      console.error("Error fetching presentations:", error);
      toast.error("Failed to load presentations");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateProjectDeck = async () => {
    toast.info("Project deck generation coming soon");
  };

  const handleExportPDF = (presentationId: string) => {
    toast.info("PDF export feature coming soon");
  };

  const handleViewPresentation = (presentationId: string) => {
    navigate(`/admin/presentations/${presentationId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-foreground">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading 
            title="GHAT Presentation Hub"
            subtitle="Professional pitch decks and project presentations"
          />
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList>
            <TabsTrigger value="global">
              
              Global Overview Deck
            </TabsTrigger>
            <TabsTrigger value="projects">
              
              Project Decks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            {globalDeck ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-2">
                      {globalDeck.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {new Date(globalDeck.updated_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: <span className="capitalize">{globalDeck.status}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPresentation(globalDeck.id)}
                    >
                      
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/presentations/${globalDeck.id}/edit`)}
                    >
                      
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleExportPDF(globalDeck.id)}
                    >
                      
                      Export PDF
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Slide Count</p>
                    <p className="text-2xl font-serif text-foreground">13</p>
                  </Card>
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="text-lg font-medium text-foreground">Master Deck</p>
                  </Card>
                  <Card className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Format</p>
                    <p className="text-lg font-medium text-foreground">PDF / Slides</p>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Deck Contents:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cover Slide</li>
                    <li>• Mission & Vision</li>
                    <li>• Global Health Gap Analysis</li>
                    <li>• GHAT's Solution</li>
                    <li>• Donor Control & Transparency</li>
                    <li>• Volunteer Collaboration</li>
                    <li>• AI Operational Intelligence</li>
                    <li>• Security & Compliance</li>
                    <li>• Impact Model</li>
                    <li>• Case Studies</li>
                    <li>• Future Roadmap</li>
                    <li>• Governance & Integrity</li>
                    <li>• Contact & Next Steps</li>
                  </ul>
                </div>

                <div className="mt-6 p-4 border border-[hsl(var(--gold))] rounded-lg bg-[hsl(var(--gold))]/5">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    
                    AI Assistance Available
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button variant="outline" size="sm">Generate Pitch Script</Button>
                    <Button variant="outline" size="sm">Generate Talking Points</Button>
                    <Button variant="outline" size="sm">Summarise for HNWI</Button>
                    <Button variant="outline" size="sm">Summarise for Corporate</Button>
                    <Button variant="outline" size="sm">Summarise for Foundation</Button>
                    <Button variant="outline" size="sm">Rewrite in Formal Tone</Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                
                <h3 className="text-xl font-serif text-foreground mb-2">
                  No Global Overview Deck Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  The master GHAT presentation deck will appear here.
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-serif text-foreground">Project Presentations</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-generated decks for commissioned projects
                </p>
              </div>
              <Button onClick={handleGenerateProjectDeck}>
                
                Generate Project Deck
              </Button>
            </div>

            {projectDecks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectDecks.map((deck) => (
                  <Card key={deck.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-serif text-foreground mb-1">
                          {deck.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(deck.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">
                        {deck.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPresentation(deck.id)}
                      >
                        
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/presentations/${deck.id}/edit`)}
                      >
                        
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleExportPDF(deck.id)}
                      >
                        
                        Export
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                
                <h3 className="text-xl font-serif text-foreground mb-2">
                  No Project Decks Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Generate presentation decks for commissioned projects to share with donors.
                </p>
                <Button onClick={handleGenerateProjectDeck}>
                  
                  Create First Project Deck
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
