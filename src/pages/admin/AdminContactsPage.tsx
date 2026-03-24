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
import { Search, Eye, RefreshCw, Paperclip } from "lucide-react";

type InboundContact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  position: string | null;
  nature_of_enquiry: string;
  message: string;
  additional_context: string | null;
  gdpr_consent: boolean;
  status: string;
  priority: string;
  attachment_url: string | null;
  admin_notes: string | null;
  created_at: string;
};

const STATUS_OPTIONS = ["New", "In Progress", "Closed"] as const;
const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const;

const statusColor = (status: string) => {
  switch (status) {
    case "New": return "bg-amber-100 text-amber-800 border-amber-300";
    case "In Progress": return "bg-blue-100 text-blue-800 border-blue-300";
    case "Closed": return "bg-green-100 text-green-800 border-green-300";
    default: return "bg-muted text-muted-foreground";
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800 border-red-300";
    case "Medium": return "bg-amber-100 text-amber-800 border-amber-300";
    case "Low": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground";
  }
};

export const AdminContactsPage = () => {
  const [contacts, setContacts] = useState<InboundContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [enquiryFilter, setEnquiryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selected, setSelected] = useState<InboundContact | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inbound_contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load enquiries");
    } else {
      setContacts((data as InboundContact[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchContacts(); }, []);

  const filtered = contacts.filter((c) => {
    const matchesSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.organisation || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesEnquiry = enquiryFilter === "all" || c.nature_of_enquiry === enquiryFilter;
    const matchesPriority = priorityFilter === "all" || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesEnquiry && matchesPriority;
  });

  const newCount = contacts.filter((c) => c.status === "New").length;
  const highCount = contacts.filter((c) => c.priority === "High" && c.status !== "Closed").length;

  const openDetail = (contact: InboundContact) => {
    setSelected(contact);
    setEditStatus(contact.status);
    setEditPriority(contact.priority || "Low");
    setEditNotes(contact.admin_notes || "");
  };

  const saveChanges = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("inbound_contacts")
      .update({ status: editStatus, priority: editPriority, admin_notes: editNotes || null } as any)
      .eq("id", selected.id);
    if (error) {
      toast.error("Failed to save changes");
    } else {
      toast.success("Enquiry updated");
      setContacts((prev) =>
        prev.map((c) =>
          c.id === selected.id ? { ...c, status: editStatus, priority: editPriority, admin_notes: editNotes || null } : c
        )
      );
      setSelected((prev) => prev ? { ...prev, status: editStatus, priority: editPriority, admin_notes: editNotes || null } : null);
    }
    setSaving(false);
  };

  const enquiryTypes = Array.from(new Set(contacts.map((c) => c.nature_of_enquiry)));

  return (
    <div className="space-y-6">
      <SEO title="Contact Enquiries | Admin" description="Admin panel for managing inbound contact enquiries." noindex />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-left">Contact Enquiries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage inbound enquiries from the contact form
            {newCount > 0 && <Badge className="ml-2 bg-amber-500 text-white">{newCount} New</Badge>}
            {highCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{highCount} High Priority</Badge>}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchContacts} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, email, organisation…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {PRIORITY_OPTIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={enquiryFilter} onValueChange={setEnquiryFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Enquiry Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {enquiryTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
              <TableHead>Nature of Enquiry</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No enquiries found</TableCell></TableRow>
            ) : (
              filtered.map((c) => (
                <TableRow key={c.id} className={c.priority === "High" && c.status !== "Closed" ? "bg-red-50/50" : c.status === "New" ? "bg-amber-50/50" : ""}>
                  <TableCell className="text-sm whitespace-nowrap">{format(new Date(c.created_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="font-medium">
                    {c.name}
                    {c.attachment_url && <Paperclip className="inline h-3 w-3 ml-1 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="text-sm">{c.email}</TableCell>
                  <TableCell className="text-sm">{c.nature_of_enquiry}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${priorityColor(c.priority)}`}>
                      {c.priority || "Low"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openDetail(c)}>
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
                <SheetTitle className="text-left font-serif">Enquiry Detail</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-muted-foreground text-xs">Full Name</Label><p className="font-medium">{selected.name}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{selected.email}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium">{selected.phone || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Organisation</Label><p className="font-medium">{selected.organisation || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Position / Role</Label><p className="font-medium">{selected.position || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Nature of Enquiry</Label><p className="font-medium">{selected.nature_of_enquiry}</p></div>
                </div>
                <div><Label className="text-muted-foreground text-xs">Date Received</Label><p className="font-medium">{format(new Date(selected.created_at), "dd MMMM yyyy, HH:mm")}</p></div>
                <div><Label className="text-muted-foreground text-xs">Summary of Enquiry</Label><p className="mt-1 whitespace-pre-wrap leading-relaxed">{selected.message}</p></div>
                {selected.additional_context && (
                  <div><Label className="text-muted-foreground text-xs">Additional Context</Label><p className="mt-1 whitespace-pre-wrap leading-relaxed">{selected.additional_context}</p></div>
                )}
                {selected.attachment_url && (
                  <div>
                    <Label className="text-muted-foreground text-xs">Attachment</Label>
                    <a href={selected.attachment_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline mt-1">
                      <Paperclip className="h-4 w-4" /> View Attachment
                    </a>
                  </div>
                )}
                <hr className="my-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={editPriority} onValueChange={setEditPriority}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PRIORITY_OPTIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Internal Notes</Label>
                    <Textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={4} placeholder="Add internal notes about this enquiry…" />
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
