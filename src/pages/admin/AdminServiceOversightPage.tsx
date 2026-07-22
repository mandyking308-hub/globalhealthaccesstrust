import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

type Row = Record<string, any>;

function List({ table, cols }: { table: string; cols: { key: string; label: string }[] }) {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    (supabase.from as any)(table).select("*").order("created_at", { ascending: false }).limit(200)
      .then(({ data, error }: any) => {
        if (error) toast({ title: `Cannot load ${table}`, description: error.message, variant: "destructive" });
        else setRows(data || []);
      });
  }, [table]);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader><TableRow>{cols.map((c) => <TableHead key={c.key}>{c.label}</TableHead>)}</TableRow></TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow><TableCell colSpan={cols.length} className="text-center text-muted-foreground py-8">No records.</TableCell></TableRow>
          ) : rows.map((r) => (
            <TableRow key={r.id}>
              {cols.map((c) => (
                <TableCell key={c.key} className="text-xs">
                  {c.key === "status" ? <Badge variant="secondary">{String(r[c.key] ?? "")}</Badge>
                    : c.key === "created_at" ? new Date(r[c.key]).toLocaleString()
                    : c.key === "immediate_danger" ? (r[c.key] ? <Badge variant="destructive">URGENT</Badge> : "")
                    : c.key === "is_anonymous" ? (r[c.key] ? "anon" : "named")
                    : String(r[c.key] ?? "").slice(0, 120)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function IncidentOpener({ onOpened }: { onOpened: () => void }) {
  const [kind, setKind] = useState("security_incident");
  const [severity, setSev] = useState("medium");
  const [summary, setSummary] = useState("");
  const [detail, setDetail] = useState("");
  const [systems, setSystems] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <Card className="mb-4">
      <CardHeader><CardTitle className="text-base font-sans">Open new incident</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label>Kind</Label>
            <Select value={kind} onValueChange={setKind}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["security_incident","personal_data_breach","payment_incident","fraud","availability_outage","unauthorised_access","evidence_disclosure","lost_device","provider_incident"].map((k) =>
                  <SelectItem key={k} value={k}>{k.replaceAll("_"," ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Severity</Label>
            <Select value={severity} onValueChange={setSev}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["low","medium","high","critical"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div><Label>Short summary</Label><Input value={summary} onChange={(e) => setSummary(e.target.value)} maxLength={200} /></div>
        <div><Label>Detail</Label><Textarea value={detail} onChange={(e) => setDetail(e.target.value)} rows={4} maxLength={4000} /></div>
        <div><Label>Affected systems</Label><Input value={systems} onChange={(e) => setSystems(e.target.value)} maxLength={400} /></div>
        <Button
          disabled={busy || summary.length < 3 || detail.length < 10}
          onClick={async () => {
            setBusy(true);
            const { error } = await supabase.rpc("incident_open", {
              _kind: kind as any, _severity: severity as any,
              _short_summary: summary, _detail: detail, _affected_systems: systems || null,
            });
            setBusy(false);
            if (error) return toast({ title: "Could not open", description: error.message, variant: "destructive" });
            toast({ title: "Incident opened" });
            setSummary(""); setDetail(""); setSystems(""); onOpened();
          }}
        >{busy ? "Opening..." : "Open incident"}</Button>
      </CardContent>
    </Card>
  );
}

export default function AdminServiceOversightPage() {
  const [tick, setTick] = useState(0);
  return (
    <>
      <Helmet><title>Support &amp; Incidents | Admin</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif">Support &amp; Incidents Oversight</h1>
          <p className="text-sm text-muted-foreground mt-1">Complaints, protected concerns, safeguarding and incidents. Access is scoped by role: complaints officers, safeguarding officers, concerns officers (super admin), incident officers.</p>
        </div>
        <Tabs defaultValue="complaints">
          <TabsList>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="concerns">Protected Concerns</TabsTrigger>
            <TabsTrigger value="safeguarding">Safeguarding</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>
          <TabsContent value="complaints">
            <List key={`c${tick}`} table="complaints" cols={[
              { key: "reference_number", label: "Ref" },
              { key: "category", label: "Category" },
              { key: "status", label: "Status" },
              { key: "is_anonymous", label: "Submitter" },
              { key: "description", label: "Description" },
              { key: "created_at", label: "Received" },
            ]} />
          </TabsContent>
          <TabsContent value="concerns">
            <List key={`p${tick}`} table="protected_concerns" cols={[
              { key: "reference_number", label: "Ref" },
              { key: "concern_type", label: "Type" },
              { key: "status", label: "Status" },
              { key: "is_anonymous", label: "Reporter" },
              { key: "summary", label: "Summary" },
              { key: "created_at", label: "Received" },
            ]} />
          </TabsContent>
          <TabsContent value="safeguarding">
            <List key={`s${tick}`} table="safeguarding_cases" cols={[
              { key: "reference_number", label: "Ref" },
              { key: "immediate_danger", label: "Danger" },
              { key: "status", label: "Status" },
              { key: "person_at_risk_initials", label: "Person" },
              { key: "location", label: "Location" },
              { key: "created_at", label: "Received" },
            ]} />
          </TabsContent>
          <TabsContent value="incidents">
            <IncidentOpener onOpened={() => setTick((t) => t + 1)} />
            <List key={`i${tick}`} table="incidents" cols={[
              { key: "reference_number", label: "Ref" },
              { key: "kind", label: "Kind" },
              { key: "severity", label: "Severity" },
              { key: "status", label: "Status" },
              { key: "short_summary", label: "Summary" },
              { key: "created_at", label: "Opened" },
            ]} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
