import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type Project = {
  id: string;
  donor_id: string;
  title: string;
  region: string;
  country: string;
  project_type: string;
  description: string;
  budget_range: string;
  urgency: string;
  status: string;
  funding_target: number | null;
  currency: string;
  approved_at: string | null;
  created_at: string;
};

type Donation = {
  id: string;
  donor_id: string | null;
  amount: number;
  currency: string;
  purpose: string;
  status: string;
  created_at: string;
};

type Allocation = {
  id: string;
  donation_id: string;
  project_id: string | null;
  project_name: string;
  amount: number;
  created_at: string;
};

type Expense = {
  id: string;
  project_id: string;
  amount: number;
  currency: string;
  category: string;
  description: string | null;
  incurred_on: string;
  created_at: string;
};

const money = (n: number, ccy = "GBP") =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(n || 0);

export const AdminProjectsPage = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("commissioned_projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ variant: "destructive", title: "Load failed", description: error.message });
    } else {
      setProjects((data as Project[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const selected = projects.find((p) => p.id === selectedId) || null;

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-1">Projects</h1>
        <p className="text-muted-foreground text-sm">Commissioned project oversight, funding and expenditure.</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : selected ? (
        <ProjectDetail
          project={selected}
          onBack={() => { setSelectedId(null); load(); }}
          onChanged={load}
        />
      ) : (
        <ProjectTable projects={projects} onOpen={setSelectedId} />
      )}
    </div>
  );
};

const ProjectTable = ({ projects, onOpen }: { projects: Project[]; onOpen: (id: string) => void }) => {
  if (!projects.length) {
    return (
      <div className="border border-dashed rounded-md p-12 text-center text-muted-foreground">
        No commissioned projects yet.
      </div>
    );
  }
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Target</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-muted/20">
              <td className="px-4 py-3 font-medium">{p.title}</td>
              <td className="px-4 py-3">{p.country}, {p.region}</td>
              <td className="px-4 py-3 capitalize">{p.status.replace(/_/g, " ")}</td>
              <td className="px-4 py-3 text-right">{p.funding_target ? money(p.funding_target, p.currency) : "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{format(new Date(p.created_at), "d MMM yyyy")}</td>
              <td className="px-4 py-3 text-right">
                <Button size="sm" variant="outline" onClick={() => onOpen(p.id)}>Open</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const STATUS_OPTIONS = ["pending", "approved", "in_progress", "completed", "cancelled"];

const ProjectDetail = ({
  project,
  onBack,
  onChanged,
}: {
  project: Project;
  onBack: () => void;
  onChanged: () => void;
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(project.status);
  const [target, setTarget] = useState<string>(project.funding_target?.toString() ?? "");
  const [currency] = useState(project.currency || "GBP");
  const [saving, setSaving] = useState(false);

  const [allocations, setAllocations] = useState<(Allocation & { donations: Donation | null })[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [availableDonations, setAvailableDonations] = useState<Donation[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [approvedVolunteers, setApprovedVolunteers] = useState<any[]>([]);
  const [volunteerId, setVolunteerId] = useState("");
  const [volRole, setVolRole] = useState("Field lead");

  // allocation form
  const [donationId, setDonationId] = useState<string>("");
  const [allocAmount, setAllocAmount] = useState<string>("");

  // expense form
  const [expAmount, setExpAmount] = useState("");
  const [expCategory, setExpCategory] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expDate, setExpDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const loadRelated = async () => {
    const [allocRes, expRes, donRes, assignRes, volRes] = await Promise.all([
      supabase
        .from("fund_allocations")
        .select("*, donations(*)")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("project_expenses")
        .select("*")
        .eq("project_id", project.id)
        .order("incurred_on", { ascending: false }),
      supabase
        .from("donations")
        .select("*")
        .eq("status", "completed")
        .order("created_at", { ascending: false }),
      supabase
        .from("volunteer_project_assignments")
        .select("id, assigned_role, created_at, volunteers(id, name, email)")
        .eq("project_id", project.id),
      supabase
        .from("volunteers")
        .select("id, name, email, status")
        .eq("status", "approved")
        .order("name"),
    ]);
    if (allocRes.data) setAllocations(allocRes.data as any);
    if (expRes.data) setExpenses(expRes.data as Expense[]);
    if (donRes.data) setAvailableDonations(donRes.data as Donation[]);
    if (assignRes.data) setAssignments(assignRes.data as any);
    if (volRes.data) setApprovedVolunteers(volRes.data as any);
  };

  useEffect(() => { loadRelated(); }, [project.id]);

  const totalAllocated = allocations.reduce((s, a) => s + Number(a.amount || 0), 0);
  const totalSpent = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const balance = totalAllocated - totalSpent;
  const targetNum = Number(target) || 0;
  const percentFunded = targetNum > 0 ? Math.min(100, (totalAllocated / targetNum) * 100) : 0;

  const saveHeader = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const patch: any = {
      status,
      funding_target: target ? Number(target) : null,
    };
    if (status === "approved" && !project.approved_at) {
      patch.approved_at = new Date().toISOString();
      patch.approved_by = user?.id;
    }
    const { error } = await supabase
      .from("commissioned_projects")
      .update(patch)
      .eq("id", project.id);
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Save failed", description: error.message });
    } else {
      toast({ title: "Project updated" });
      onChanged();
    }
  };

  const addAllocation = async () => {
    const amt = Number(allocAmount);
    if (!donationId || !amt || amt <= 0) {
      toast({ variant: "destructive", title: "Missing fields", description: "Choose a donation and enter an amount." });
      return;
    }
    const donation = availableDonations.find((d) => d.id === donationId);
    if (!donation) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("fund_allocations").insert({
      donation_id: donationId,
      project_id: project.id,
      project_name: project.title,
      amount: amt,
      allocated_by: user?.id,
    });
    if (error) {
      toast({ variant: "destructive", title: "Allocation failed", description: error.message });
    } else {
      toast({ title: "Allocation recorded" });
      setDonationId("");
      setAllocAmount("");
      loadRelated();
    }
  };

  const addExpense = async () => {
    const amt = Number(expAmount);
    if (!amt || amt <= 0 || !expCategory) {
      toast({ variant: "destructive", title: "Missing fields", description: "Amount and category are required." });
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("project_expenses").insert({
      project_id: project.id,
      amount: amt,
      currency,
      category: expCategory,
      description: expDesc || null,
      incurred_on: expDate,
      recorded_by: user?.id,
    });
    if (error) {
      toast({ variant: "destructive", title: "Expense failed", description: error.message });
    } else {
      toast({ title: "Expense recorded" });
      setExpAmount(""); setExpCategory(""); setExpDesc("");
      loadRelated();
    }
  };

  const assignVolunteer = async () => {
    if (!volunteerId || !volRole.trim()) {
      toast({ variant: "destructive", title: "Missing fields", description: "Pick a volunteer and a role." });
      return;
    }
    const { error } = await supabase.from("volunteer_project_assignments").insert({
      project_id: project.id,
      volunteer_id: volunteerId,
      assigned_role: volRole.trim(),
    });
    if (error) {
      toast({ variant: "destructive", title: "Assignment failed", description: error.message });
    } else {
      toast({ title: "Volunteer assigned" });
      setVolunteerId("");
      loadRelated();
    }
  };

  const removeAssignment = async (id: string) => {
    const { error } = await supabase.from("volunteer_project_assignments").delete().eq("id", id);
    if (error) toast({ variant: "destructive", title: "Remove failed", description: error.message });
    else { toast({ title: "Assignment removed" }); loadRelated(); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>← Back to projects</Button>
      </div>

      <header className="border-b pb-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{project.project_type}</p>
        <h2 className="text-3xl font-serif mb-2">{project.title}</h2>
        <p className="text-sm text-muted-foreground">{project.country}, {project.region} · {project.urgency} urgency · budget band {project.budget_range}</p>
        <p className="mt-4 text-[15px] max-w-3xl">{project.description}</p>
      </header>

      {/* Funding summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryStat label="Funding target" value={targetNum ? money(targetNum, currency) : "—"} />
        <SummaryStat label="Allocated" value={money(totalAllocated, currency)} sub={targetNum ? `${percentFunded.toFixed(0)}% of target` : undefined} />
        <SummaryStat label="Spent" value={money(totalSpent, currency)} />
        <SummaryStat label="Balance" value={money(balance, currency)} />
      </section>

      {/* Header edit */}
      <section className="border rounded-md p-6 space-y-4">
        <h3 className="font-medium">Status & funding target</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Funding target ({currency})</Label>
            <Input type="number" min="0" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. 50000" />
          </div>
          <div className="flex items-end">
            <Button onClick={saveHeader} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          </div>
        </div>
      </section>

      {/* Allocations */}
      <section className="border rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Fund allocations</h3>
          <span className="text-sm text-muted-foreground">{allocations.length} record{allocations.length === 1 ? "" : "s"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_140px] gap-3 items-end">
          <div>
            <Label>Donation</Label>
            <Select value={donationId} onValueChange={setDonationId}>
              <SelectTrigger><SelectValue placeholder="Select a completed donation" /></SelectTrigger>
              <SelectContent>
                {availableDonations.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {money(Number(d.amount), d.currency)} · {d.purpose} · {format(new Date(d.created_at), "d MMM yyyy")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount ({currency})</Label>
            <Input type="number" min="0" value={allocAmount} onChange={(e) => setAllocAmount(e.target.value)} />
          </div>
          <Button onClick={addAllocation}>Allocate</Button>
        </div>

        {allocations.length > 0 && (
          <table className="w-full text-sm mt-4">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2">Date</th><th>Donation</th><th className="text-right">Amount</th></tr>
            </thead>
            <tbody className="divide-y">
              {allocations.map((a) => (
                <tr key={a.id}>
                  <td className="py-2">{format(new Date(a.created_at), "d MMM yyyy")}</td>
                  <td>{a.donations ? `${money(Number(a.donations.amount), a.donations.currency)} · ${a.donations.purpose}` : "—"}</td>
                  <td className="text-right">{money(Number(a.amount), currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Expenses */}
      <section className="border rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Project expenses</h3>
          <span className="text-sm text-muted-foreground">{expenses.length} record{expenses.length === 1 ? "" : "s"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div>
            <Label>Amount</Label>
            <Input type="number" min="0" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} />
          </div>
          <div>
            <Label>Category</Label>
            <Input value={expCategory} onChange={(e) => setExpCategory(e.target.value)} placeholder="e.g. Supplies" />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Input value={expDesc} onChange={(e) => setExpDesc(e.target.value)} />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
          </div>
        </div>
        <Button onClick={addExpense}>Record expense</Button>

        {expenses.length > 0 && (
          <table className="w-full text-sm mt-4">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2">Date</th><th>Category</th><th>Description</th><th className="text-right">Amount</th></tr>
            </thead>
            <tbody className="divide-y">
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td className="py-2">{format(new Date(e.incurred_on), "d MMM yyyy")}</td>
                  <td>{e.category}</td>
                  <td className="text-muted-foreground">{e.description || "—"}</td>
                  <td className="text-right">{money(Number(e.amount), e.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Volunteer assignments */}
      <section className="border rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Volunteer assignments</h3>
          <span className="text-sm text-muted-foreground">{assignments.length} assigned</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_140px] gap-3 items-end">
          <div>
            <Label>Volunteer</Label>
            <Select value={volunteerId} onValueChange={setVolunteerId}>
              <SelectTrigger><SelectValue placeholder="Select approved volunteer" /></SelectTrigger>
              <SelectContent>
                {approvedVolunteers
                  .filter((v) => !assignments.some((a) => a.volunteers?.id === v.id))
                  .map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.name} · {v.email}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Role</Label>
            <Input value={volRole} onChange={(e) => setVolRole(e.target.value)} placeholder="e.g. Field lead" />
          </div>
          <Button onClick={assignVolunteer}>Assign</Button>
        </div>

        {assignments.length > 0 && (
          <ul className="divide-y border-t mt-4">
            {assignments.map((a) => (
              <li key={a.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{a.volunteers?.name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground">{a.volunteers?.email} · {a.assigned_role}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeAssignment(a.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const SummaryStat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="border rounded-md p-4">
    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="text-2xl font-serif mt-1">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);
