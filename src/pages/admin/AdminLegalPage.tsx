import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const REVIEW_STATUSES = [
  "draft", "internal_review", "solicitor_review", "trustee_approved", "published", "superseded",
];

const AdminLegalPage = () => {
  const { toast } = useToast();
  const [entity, setEntity] = useState<any>(null);
  const [entityEdit, setEntityEdit] = useState<any>({});
  const [docs, setDocs] = useState<any[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [editingVersion, setEditingVersion] = useState<any>(null);

  const loadEntity = async () => {
    const { data } = await supabase.from("legal_entity_settings").select("*").single();
    setEntity(data); setEntityEdit(data || {});
  };
  const loadDocs = async () => {
    const { data } = await supabase.from("legal_documents").select("*").order("category").order("title");
    setDocs(data || []);
    if (!selectedDocId && data?.length) setSelectedDocId(data[0].id);
  };
  const loadVersions = async (docId: string) => {
    const { data } = await supabase.from("legal_document_versions").select("*").eq("document_id", docId).order("version_number", { ascending: false });
    setVersions(data || []);
  };

  useEffect(() => { loadEntity(); loadDocs(); }, []);
  useEffect(() => { if (selectedDocId) loadVersions(selectedDocId); }, [selectedDocId]);

  const saveEntity = async () => {
    const payload = { ...entityEdit };
    delete payload.id; delete payload.singleton; delete payload.created_at; delete payload.updated_at;
    const { error } = await supabase.from("legal_entity_settings").update(payload).eq("id", entity.id);
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: "Legal entity details saved" });
    loadEntity();
  };

  const markVerified = async () => {
    if (!window.confirm("Confirm the details are correct against the Trust's official records. This unlocks publishing of legal documents.")) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("legal_entity_settings").update({ verified_at: new Date().toISOString(), verified_by: user?.id }).eq("id", entity.id);
    toast({ title: "Legal entity marked verified" });
    loadEntity();
  };
  const revokeVerified = async () => {
    await supabase.from("legal_entity_settings").update({ verified_at: null, verified_by: null }).eq("id", entity.id);
    toast({ title: "Verification revoked" });
    loadEntity();
  };

  const createNewDraft = async () => {
    if (!selectedDocId) return;
    const next = (versions[0]?.version_number || 0) + 1;
    const base = versions[0];
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("legal_document_versions").insert({
      document_id: selectedDocId, version_number: next,
      title: base?.title || docs.find((d) => d.id === selectedDocId)?.title || "Untitled",
      body_markdown: base?.body_markdown || "", acceptance_text: base?.acceptance_text || null,
      created_by: user?.id, review_status: "draft",
    });
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: `Version ${next} drafted` });
    loadVersions(selectedDocId);
  };

  const saveVersion = async () => {
    if (!editingVersion) return;
    const patch = {
      title: editingVersion.title, summary: editingVersion.summary,
      body_markdown: editingVersion.body_markdown, acceptance_text: editingVersion.acceptance_text,
      material_change: editingVersion.material_change, effective_date: editingVersion.effective_date,
      review_status: editingVersion.review_status, reviewer_note: editingVersion.reviewer_note,
    };
    if (editingVersion.review_status === "trustee_approved" && !editingVersion.approved_at) {
      const { data: { user } } = await supabase.auth.getUser();
      (patch as any).approved_by = user?.id;
      (patch as any).approved_at = new Date().toISOString();
    }
    const { error } = await supabase.from("legal_document_versions").update(patch).eq("id", editingVersion.id);
    if (error) { toast({ variant: "destructive", title: "Failed", description: error.message }); return; }
    toast({ title: "Version saved" });
    setEditingVersion(null); loadVersions(selectedDocId!);
  };

  const publish = async (versionId: string) => {
    const { error } = await supabase.rpc("publish_legal_version", { _version_id: versionId });
    if (error) { toast({ variant: "destructive", title: "Cannot publish", description: error.message }); return; }
    toast({ title: "Published" });
    loadVersions(selectedDocId!); loadDocs();
  };

  const verified = !!entity?.verified_at && entity?.legal_name && entity?.legal_status && entity?.registered_address && entity?.governing_law;

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
      <Helmet><title>Legal Centre | GHAT Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Legal, Privacy & Governance</span>
        <h1 className="font-serif text-4xl mt-1">Legal Centre</h1>
      </div>

      <Tabs defaultValue="entity">
        <TabsList>
          <TabsTrigger value="entity">Legal Entity</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="entity" className="mt-4">
          <Card className="p-6">
            {!verified && (
              <div className="mb-4 border-l-4 border-destructive bg-destructive/5 p-3">
                <strong className="text-destructive">UNVERIFIED — publication of legal documents is blocked.</strong>
                <p className="text-sm mt-1">Complete legal name, legal status, registered address and governing law, then click Mark Verified.</p>
              </div>
            )}
            {verified && (
              <div className="mb-4 border-l-4 border-primary bg-primary/5 p-3 flex items-center justify-between">
                <div>
                  <strong>Verified</strong>
                  <p className="text-sm">Confirmed on {new Date(entity.verified_at).toLocaleString()}</p>
                </div>
                <Button variant="outline" onClick={revokeVerified}>Revoke verification</Button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["legal_name", "Legal name"], ["trading_name", "Trading name"],
                ["legal_status", "Legal status (e.g. Charitable Trust)"],
                ["company_number", "Company number (if any)"],
                ["charity_number", "Charity number (if any)"],
                ["regulator", "Regulator"],
                ["registered_address", "Registered address"],
                ["contact_email", "Contact email"],
                ["insurance_summary", "Insurance summary"],
                ["governing_law", "Governing law"], ["jurisdiction", "Jurisdiction"],
                ["high_value_threshold", "High-value donation threshold (GBP)"],
                ["enhanced_dd_threshold", "Enhanced due-diligence threshold (GBP)"],
                ["trustee_approval_threshold", "Trustee approval threshold (GBP)"],
              ].map(([k, label]) => (
                <div key={k} className={k === "registered_address" || k === "insurance_summary" ? "md:col-span-2" : ""}>
                  <Label className="text-xs uppercase tracking-widest">{label}</Label>
                  {k === "registered_address" || k === "insurance_summary"
                    ? <Textarea rows={2} value={entityEdit[k] || ""} onChange={(e) => setEntityEdit({ ...entityEdit, [k]: e.target.value })} />
                    : <Input value={entityEdit[k] ?? ""} onChange={(e) => setEntityEdit({ ...entityEdit, [k]: e.target.value })} />}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={saveEntity}>Save details</Button>
              {!verified && <Button variant="secondary" onClick={markVerified}>Mark verified</Button>}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            <Card className="p-3 h-fit">
              {docs.map((d) => (
                <button key={d.id} onClick={() => { setSelectedDocId(d.id); setEditingVersion(null); }}
                  className={`w-full text-left p-3 rounded text-sm ${selectedDocId === d.id ? "bg-primary/10" : "hover:bg-foreground/5"}`}>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{d.category}</div>
                  {d.current_published_version_id
                    ? <Badge variant="outline" className="mt-1">Published</Badge>
                    : <Badge variant="destructive" className="mt-1">No published version</Badge>}
                </button>
              ))}
            </Card>

            <div className="space-y-4">
              <Card className="p-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl">{docs.find((d) => d.id === selectedDocId)?.title || "—"}</h2>
                  <p className="text-xs text-muted-foreground">Versioned document — draft, review, trustee approval, publish.</p>
                </div>
                <Button onClick={createNewDraft}>New draft version</Button>
              </Card>

              {editingVersion ? (
                <Card className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-xl">Editing version {editingVersion.version_number}</h3>
                    <Button variant="ghost" onClick={() => setEditingVersion(null)}>Cancel</Button>
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest">Title</Label>
                    <Input value={editingVersion.title} onChange={(e) => setEditingVersion({ ...editingVersion, title: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest">Summary</Label>
                    <Textarea rows={2} value={editingVersion.summary || ""} onChange={(e) => setEditingVersion({ ...editingVersion, summary: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest">Body (Markdown)</Label>
                    <Textarea rows={20} className="font-mono text-sm" value={editingVersion.body_markdown} onChange={(e) => setEditingVersion({ ...editingVersion, body_markdown: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest">Acceptance wording (shown when the user accepts)</Label>
                    <Textarea rows={2} value={editingVersion.acceptance_text || ""} onChange={(e) => setEditingVersion({ ...editingVersion, acceptance_text: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs uppercase tracking-widest">Effective date</Label>
                      <Input type="date" value={editingVersion.effective_date || ""} onChange={(e) => setEditingVersion({ ...editingVersion, effective_date: e.target.value })} />
                    </div>
                    <div>
                      <Label className="text-xs uppercase tracking-widest">Review status</Label>
                      <Select value={editingVersion.review_status} onValueChange={(v) => setEditingVersion({ ...editingVersion, review_status: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {REVIEW_STATUSES.filter((s) => s !== "published" && s !== "superseded").map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Switch checked={editingVersion.material_change} onCheckedChange={(v) => setEditingVersion({ ...editingVersion, material_change: v })} />
                      <Label className="text-xs">Material change (users must re-accept)</Label>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest">Reviewer note</Label>
                    <Textarea rows={2} value={editingVersion.reviewer_note || ""} onChange={(e) => setEditingVersion({ ...editingVersion, reviewer_note: e.target.value })} />
                  </div>
                  <Button onClick={saveVersion}>Save version</Button>
                </Card>
              ) : (
                <Card className="p-4">
                  <ul className="space-y-3">
                    {versions.map((v) => (
                      <li key={v.id} className="border rounded p-3 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex gap-2 items-center">
                            <strong>v{v.version_number}</strong>
                            <Badge variant="outline">{v.review_status}</Badge>
                            {v.material_change && <Badge>Material change</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {v.effective_date ? `Effective ${v.effective_date}` : "No effective date"}
                            {v.approved_at ? ` · Trustee-approved ${new Date(v.approved_at).toLocaleDateString()}` : ""}
                            {v.published_at ? ` · Published ${new Date(v.published_at).toLocaleDateString()}` : ""}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingVersion(v)}>Edit</Button>
                          {v.review_status === "trustee_approved" && (
                            <Button size="sm" onClick={() => publish(v.id)} disabled={!verified}>
                              Publish
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!verified && (
                    <p className="text-xs text-destructive mt-3">Publication blocked until legal entity details are verified.</p>
                  )}
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLegalPage;
