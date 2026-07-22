import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ServiceRequestList } from "@/components/service/ServiceRequestList";
import { ServiceRequestDetail } from "@/components/service/ServiceRequestDetail";

const BUCKETS = [
  { key: "new", label: "New" },
  { key: "unassigned", label: "Unassigned" },
  { key: "awaiting_first_response", label: "Awaiting first response" },
  { key: "awaiting_donor", label: "Awaiting donor" },
  { key: "awaiting_team", label: "Awaiting team" },
  { key: "investigating", label: "Investigating" },
  { key: "overdue", label: "Overdue" },
  { key: "escalated", label: "Escalated" },
  { key: "complaints", label: "Complaints" },
  { key: "safeguarding", label: "Safeguarding" },
  { key: "finance", label: "Finance" },
  { key: "resolved", label: "Resolved" },
];

const AdminServiceConsolePage = () => {
  const [tab, setTab] = useState("new");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUid(data.user?.id || ""));
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
      <Helmet><title>Service Console | GHAT Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Service Console</span>
        <h1 className="font-serif text-4xl mt-1">Project Support Queue</h1>
      </div>

      <Card className="p-4">
        <Tabs value={tab} onValueChange={(v) => { setTab(v); setDetailId(null); }}>
          <TabsList className="flex-wrap h-auto">
            {BUCKETS.map((b) => (
              <TabsTrigger key={b.key} value={b.key}>{b.label}</TabsTrigger>
            ))}
          </TabsList>
          {BUCKETS.map((b) => (
            <TabsContent key={b.key} value={b.key} className="mt-4">
              {detailId ? (
                <ServiceRequestDetail
                  requestId={detailId}
                  isAdmin={true}
                  currentUserId={uid}
                  onChanged={() => setRefreshKey((k) => k + 1)}
                  onClose={() => setDetailId(null)}
                />
              ) : (
                <ServiceRequestList scope="admin-bucket" bucket={b.key} onSelect={setDetailId} refreshKey={refreshKey} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminServiceConsolePage;
