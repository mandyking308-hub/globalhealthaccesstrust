import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type Evidence = {
  id: string; project_id: string; uploaded_by: string | null;
  caption: string | null; activity_description: string | null;
  approved_general_location: string | null; date_taken: string | null;
  consent_status: string; safeguarding_status: string; review_status: string;
  donor_visible: boolean; storage_path: string; created_at: string;
  rejection_reason: string | null; withdrawn_at: string | null; withdrawal_reason: string | null;
  commissioned_projects: { id: string; title: string; country: string } | null;
};

const STATUS_TABS = ["awaiting_review", "under_review", "approved", "rejected", "withdrawn"] as const;

export const AdminEvidencePage = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<typeof STATUS_TABS[number]>("awaiting_review");
  const [items, setItems] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Evidence | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");
  const [donorCaption, setDonorCaption] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("project_field_evidence")
      .select("*, commissioned_projects(id, title, country)")
      .eq("review_status", tab)
      .order("created_at", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    else {
      const list = (data as any as Evidence[]) || [];
      setItems(list);
      const map: Record<string, string> = {};
      await Promise.all(list.map(async (e) => {
        const { data: signed } = await supabase.storage.from("field-evidence").createSignedUrl(e.storage_path, 60 * 60);
        if (signed?.signedUrl) map[e.id] = signed.signedUrl;
      }));
      setUrls(map);
    }
    setLoading(false);
  };

  useEffect(() => { load(); setSelected(null); }, [tab]);

  const openReview = (e: Evidence) => {
    setSelected(e);
    setDonorCaption(e.caption || "");
    setRejectReason("");
    setWithdrawReason("");
  };

  const approve = async (donorVisible: boolean) => {
    if (!selected) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("project_field_evidence").update({
      review_status: "approved",
      safeguarding_status: "cleared",
      donor_visible: donorVisible,
      caption: donorCaption || null,
      approved_by: user?.id,
      approved_at: new Date().toISOString(),
    }).eq("id", selected.id);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    else { toast({ title: donorVisible ? "Approved for donor view" : "Approved (internal only)" }); setSelected(null); load(); }
  };

  const reject = async () => {
    if (!selected || !rejectReason.trim()) { toast({ variant: "destructive", title: "Reason required" }); return; }
    const { error } = await supabase.from("project_field_evidence").update({
      review_status: "rejected", donor_visible: false, rejection_reason: rejectReason.trim(),
    }).eq("id", selected.id);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    else { toast({ title: "Rejected" }); setSelected(null); load(); }
  };

  const withdraw = async () => {
    if (!selected || !withdrawReason.trim()) { toast({ variant: "destructive", title: "Reason required" }); return; }
    const { error } = await supabase.from("project_field_evidence").update({
      review_status: "withdrawn", donor_visible: false,
      withdrawn_at: new Date().toISOString(), withdrawal_reason: withdrawReason.trim(),
    }).eq("id", selected.id);
    if (error) toast({ variant: "destructive", title: "Failed", description: error.message });
    else { toast({ title: "Withdrawn" }); setSelected(null); load(); }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-1">Evidence Review</h1>
        <p className="text-muted-foreground text-sm">
          Central approval gate for volunteer-submitted photos and field media. Nothing reaches donors without safeguarding and consent clearance.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 mb-6 border-b">
        {STATUS_TABS.map((s) => (
          <button key={s}
            onClick={() => setTab(s)}
            className={`px-4 py-2 text-sm capitalize border-b-2 -mb-px ${tab === s ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed rounded-md p-12 text-center text-muted-foreground">
          Nothing in this queue.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((e) => (
            <button key={e.id} onClick={() => openReview(e)} className="text-left border rounded-md overflow-hidden hover:border-primary transition">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
                {urls[e.id]
                  ? <img src={urls[e.id]} alt={e.caption || "Evidence"} className="w-full h-full object-cover" />
                  : <span className="text-xs text-muted-foreground">Preview loading…</span>}
              </div>
              <div className="p-3 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {e.commissioned_projects?.title || "Project"}
                </p>
                <p className="text-sm font-medium line-clamp-1">{e.caption || "Untitled evidence"}</p>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <Badge variant="outline">consent: {e.consent_status}</Badge>
                  <Badge variant="outline">{e.approved_general_location || "no location"}</Badge>
                  {e.donor_visible && <Badge>donor visible</Badge>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-background max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-md" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-muted flex items-center justify-center">
              {urls[selected.id] && <img src={urls[selected.id]} alt="" className="w-full h-full object-contain" />}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {selected.commissioned_projects?.title} · {selected.date_taken ? format(new Date(selected.date_taken), "d MMM yyyy") : "no date"}
                </p>
                <p className="text-sm mt-1"><b>Location:</b> {selected.approved_general_location || "—"}</p>
                <p className="text-sm"><b>Consent:</b> {selected.consent_status}</p>
                {selected.activity_description && <p className="text-sm mt-2">{selected.activity_description}</p>}
              </div>

              <div>
                <Label>Donor-facing caption</Label>
                <Input value={donorCaption} onChange={(e) => setDonorCaption(e.target.value)} placeholder="Shown in donor gallery" />
              </div>

              {tab !== "approved" && tab !== "withdrawn" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button onClick={() => approve(true)}>Approve for donor gallery</Button>
                  <Button variant="outline" onClick={() => approve(false)}>Approve (internal only)</Button>
                </div>
              )}

              {tab === "approved" && (
                <div className="space-y-2 border-t pt-4">
                  <Label>Withdrawal reason (safeguarding, consent revoked, etc.)</Label>
                  <Textarea value={withdrawReason} onChange={(e) => setWithdrawReason(e.target.value)} rows={2} />
                  <Button variant="destructive" onClick={withdraw}>Withdraw from donor view</Button>
                </div>
              )}

              {tab !== "approved" && tab !== "withdrawn" && (
                <div className="space-y-2 border-t pt-4">
                  <Label>Rejection reason</Label>
                  <Textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={2} />
                  <Button variant="outline" onClick={reject}>Reject</Button>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
