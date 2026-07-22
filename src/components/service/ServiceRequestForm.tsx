import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PRIORITIES, CONFIDENTIALITY } from "@/lib/serviceRequests";

interface Props {
  requestTypes: readonly { value: string; label: string }[];
  projectId?: string | null;
  defaultType?: string;
  defaultConfidentiality?: "standard" | "restricted_finance" | "restricted_safeguarding" | "identity_restricted";
  onCreated?: (id: string) => void;
  categoryOptions?: string[];
  compact?: boolean;
}

export const ServiceRequestForm = ({
  requestTypes,
  projectId,
  defaultType,
  defaultConfidentiality = "standard",
  onCreated,
  categoryOptions,
  compact,
}: Props) => {
  const { toast } = useToast();
  const [type, setType] = useState(defaultType || requestTypes[0].value);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"routine" | "normal" | "high" | "urgent" | "critical">("normal");
  const [confidentiality, setConfidentiality] = useState(defaultConfidentiality);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!subject.trim() || !description.trim()) {
      toast({ variant: "destructive", title: "Subject and description are required" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.rpc("create_service_request", {
      _request_type: type,
      _category: category || null,
      _subject: subject.trim(),
      _description: description.trim(),
      _priority: priority,
      _confidentiality: confidentiality,
      _project_id: projectId || null,
      _milestone_id: null,
      _expense_id: null,
      _evidence_id: null,
      _donation_id: null,
    });
    setSubmitting(false);
    if (error) {
      toast({ variant: "destructive", title: "Could not submit", description: error.message });
      return;
    }
    toast({ title: "Request submitted", description: "You will receive a reference and response." });
    setSubject(""); setDescription(""); setCategory("");
    if (data && onCreated) onCreated(data as string);
  };

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <Label>Request type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {requestTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {categoryOptions && (
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
            <SelectContent>
              {categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label>Subject</Label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={4000} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Confidentiality</Label>
          <Select value={confidentiality} onValueChange={(v) => setConfidentiality(v as typeof confidentiality)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CONFIDENTIALITY.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {confidentiality !== "standard" && (
        <p className="text-xs text-muted-foreground border-l-2 border-primary/40 pl-3">
          This report is <strong>Confidential / Identity restricted</strong>. It is not anonymous. Metadata (your account) is retained
          and visible only to designated Trust staff for safeguarding, compliance or finance purposes. If anyone is in immediate danger,
          please contact your local emergency service — this portal is not an emergency service.
        </p>
      )}

      <Button onClick={submit} disabled={submitting} className="bg-primary text-primary-foreground">
        {submitting ? "Submitting…" : "Submit request"}
      </Button>
    </div>
  );
};
