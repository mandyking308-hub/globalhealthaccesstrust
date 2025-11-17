import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { MapPin, Calendar, TrendingUp, CheckCircle } from "lucide-react";

interface CommissionedProject {
  id: string;
  title: string;
  region: string;
  country: string;
  project_type: string;
  description: string;
  budget_range: string;
  status: string;
  created_at: string;
  updated_at: string;
  start_date?: string;
  end_date?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "approved":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "in_progress":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusLabel = (status: string) => {
  return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

export const CommissionedProjectsList = () => {
  const [projects, setProjects] = useState<CommissionedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("commissioned_projects")
        .select("*")
        .eq("donor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="shadow-soft">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-muted-foreground mb-4">You haven't commissioned any projects yet.</p>
          <p className="text-sm text-muted-foreground">
            Commission your first project to start making a targeted impact with complete transparency.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id} className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="font-serif text-xl mb-2">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getStatusColor(project.status)} variant="outline">
                    {getStatusLabel(project.status)}
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {project.project_type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-2">{project.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{project.country}, {project.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span>{project.budget_range}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Requested: {format(new Date(project.created_at), "MMM d, yyyy")}</span>
              </div>
              {project.status !== "pending" && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <span>Updated: {format(new Date(project.updated_at), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>

            {project.status === "in_progress" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">In Development</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};