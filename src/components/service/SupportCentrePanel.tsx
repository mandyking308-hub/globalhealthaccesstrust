import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";
import { ServiceRequestList } from "@/components/service/ServiceRequestList";
import { ServiceRequestDetail } from "@/components/service/ServiceRequestDetail";
import { REQUEST_TYPES_DONOR, REQUEST_TYPES_TEAM, PRIVATE_CONCERN_CATEGORIES } from "@/lib/serviceRequests";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface Props {
  role: "donor" | "project_team";
  currentUserId: string;
  projectOptions?: { id: string; label: string }[];
}

export const SupportCentrePanel = ({ role, currentUserId, projectOptions }: Props) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(projectOptions?.[0]?.id || null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!selectedProject && projectOptions?.length) setSelectedProject(projectOptions[0].id);
  }, [projectOptions, selectedProject]);

  const requestTypes = role === "donor" ? REQUEST_TYPES_DONOR : REQUEST_TYPES_TEAM;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-serif text-2xl mb-1">Project Support Centre</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Formal requests receive a reference number, a response service target and a full audit history.
        </p>

        {projectOptions && projectOptions.length > 0 && (
          <div className="mb-4">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Related project</label>
            <select
              value={selectedProject || ""}
              onChange={(e) => setSelectedProject(e.target.value || null)}
              className="ml-2 border rounded px-2 py-1 text-sm"
            >
              <option value="">— none —</option>
              {projectOptions.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
        )}

        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">New request</TabsTrigger>
            <TabsTrigger value="mine">My requests</TabsTrigger>
            {role === "project_team" && <TabsTrigger value="private">Report privately</TabsTrigger>}
          </TabsList>

          <TabsContent value="new" className="mt-4">
            <ServiceRequestForm
              requestTypes={requestTypes}
              projectId={selectedProject}
              onCreated={() => setRefreshKey((k) => k + 1)}
            />
          </TabsContent>

          <TabsContent value="mine" className="mt-4">
            {detailId ? (
              <ServiceRequestDetail
                requestId={detailId}
                isAdmin={false}
                currentUserId={currentUserId}
                onChanged={() => setRefreshKey((k) => k + 1)}
                onClose={() => setDetailId(null)}
              />
            ) : (
              <ServiceRequestList scope="mine" onSelect={setDetailId} refreshKey={refreshKey} />
            )}
          </TabsContent>

          {role === "project_team" && (
            <TabsContent value="private" className="mt-4">
              <div className="mb-3 border-l-4 border-primary/50 pl-4 py-2 bg-primary/5">
                <h4 className="font-serif text-lg">Report a Concern Privately</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Not anonymous — your identity is recorded but visibility is restricted to designated Trust staff (safeguarding, compliance
                  or finance). If anyone is in immediate danger, please contact your local emergency service.
                </p>
              </div>
              <ServiceRequestForm
                requestTypes={[
                  { value: "safeguarding", label: "Safeguarding concern" },
                  { value: "misuse", label: "Suspected misuse of funds" },
                  { value: "misconduct", label: "Misconduct or pressure" },
                  { value: "safety", label: "Safety concern" },
                ]}
                categoryOptions={PRIVATE_CONCERN_CATEGORIES}
                projectId={selectedProject}
                defaultConfidentiality="restricted_safeguarding"
                onCreated={() => setRefreshKey((k) => k + 1)}
              />
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </div>
  );
};
