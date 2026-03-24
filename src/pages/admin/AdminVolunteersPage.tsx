import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search, Eye, RefreshCw, FileDown } from "lucide-react";

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  skills: string;
  experience: string;
  languages: string;
  cv_url: string | null;
  notes: string | null;
  status: string;
  availability: string | null;
  area_of_interest: string | null;
  motivation: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
};

const STATUS_OPTIONS = ["pending", "under_review", "accepted", "rejected"] as const;

const statusLabel = (s: string) => {
  switch (s) {
    case "pending": return "Pending";
    case "under_review": return "Under Review";
    case "accepted": return "Accepted";
    case "rejected": return "Rejected";
    default: return s;
  }
};

const statusColor = (s: string) => {
  switch (s) {
    case "pending": return "bg-amber-100 text-amber-800 border-amber-300";
    case "under_review": return "bg-blue-100 text-blue-800 border-blue-300";
    case "accepted": return "bg-green-100 text-green-800 border-green-300";
    case "rejected": return "bg-red-100 text-red-800 border-red-300";
    default: return "bg-muted text-muted-foreground";
  }
};

export const AdminVolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Volunteer | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchVolunteers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load volunteers");
    } else {
      setVolunteers((data as Volunteer[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchVolunteers(); }, []);

  const filtered = volunteers.filter((v) => {
    const matchesSearch = !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.country.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = volunteers.filter((v) => v.status === "pending").length;

  const openDetail = (vol: Volunteer) => {
    setSelected(vol);
    setEditStatus(vol.status);
    setEditNotes(vol.notes || "");
  };

  const saveChanges = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("volunteers")
      .update({ status: editStatus, notes: editNotes || null })
      .eq("id", selected.id);
    if (error) {
      toast.error("Failed to save changes");
    } else {
      toast.success("Volunteer updated");
      setVolunteers((prev) =>
        prev.map((v) => v.id === selected.id ? { ...v, status: editStatus, notes: editNotes || null } : v)
      );
      setSelected((prev) => prev ? { ...prev, status: editStatus, notes: editNotes || null } : null);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <SEO title="Volunteers | Admin" description="Admin panel for managing volunteer applications." noindex />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-left">Volunteer Applications</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Review and manage volunteer applications
            {pendingCount > 0 && <Badge className="ml-2 bg-amber-500 text-white">{pendingCount} Pending</Badge>}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchVolunteers} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, email, country…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{statusLabel(s)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Area of Interest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No volunteers found</TableCell></TableRow>
            ) : (
              filtered.map((v) => (
                <TableRow key={v.id} className={v.status === "pending" ? "bg-amber-50/50" : ""}>
                  <TableCell className="text-sm whitespace-nowrap">{format(new Date(v.created_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-sm">{v.email}</TableCell>
                  <TableCell className="text-sm">{v.country}</TableCell>
                  <TableCell className="text-sm">{v.area_of_interest || "—"}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColor(v.status)}`}>
                      {statusLabel(v.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openDetail(v)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Side Panel */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left font-serif">Volunteer Detail</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-muted-foreground text-xs">Full Name</Label><p className="font-medium">{selected.name}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{selected.email}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{selected.phone || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Country</Label><p className="font-medium">{selected.country}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Availability</Label><p className="font-medium">{selected.availability || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Area of Interest</Label><p className="font-medium">{selected.area_of_interest || "—"}</p></div>
                </div>

                <div><Label className="text-muted-foreground text-xs">Applied</Label><p className="font-medium">{format(new Date(selected.created_at), "dd MMMM yyyy, HH:mm")}</p></div>
                <div><Label className="text-muted-foreground text-xs">Skills / Profession</Label><p className="mt-1">{selected.skills}</p></div>
                <div><Label className="text-muted-foreground text-xs">Relevant Experience</Label><p className="mt-1 whitespace-pre-wrap">{selected.experience}</p></div>
                <div><Label className="text-muted-foreground text-xs">Languages</Label><p className="mt-1">{selected.languages}</p></div>

                {selected.motivation && (
                  <div><Label className="text-muted-foreground text-xs">Motivation Statement</Label><p className="mt-1 whitespace-pre-wrap">{selected.motivation}</p></div>
                )}

                {selected.cv_url && (
                  <div>
                    <Label className="text-muted-foreground text-xs">CV</Label>
                    <a href={selected.cv_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline mt-1">
                      <FileDown className="h-4 w-4" /> Download CV
                    </a>
                  </div>
                )}

                <hr className="my-4" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{statusLabel(s)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Internal Notes</Label>
                    <Textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={4} placeholder="Add internal notes…" />
                  </div>
                  <Button onClick={saveChanges} disabled={saving} className="w-full">
                    {saving ? "Saving…" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
