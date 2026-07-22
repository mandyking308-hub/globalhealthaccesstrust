export const REQUEST_TYPES_DONOR = [
  { value: "question", label: "Ask the Trust a Question" },
  { value: "concern", label: "Raise a Project Concern" },
  { value: "funding_query", label: "Query Funding or Expenditure" },
  { value: "evidence_query", label: "Query Evidence or Progress" },
  { value: "clarification", label: "Request Clarification" },
  { value: "complaint", label: "Make a Complaint" },
  { value: "technical", label: "Report a Technical or Account Problem" },
] as const;

export const REQUEST_TYPES_TEAM = [
  { value: "support", label: "Ask the Trust for Support" },
  { value: "delay", label: "Report a Delay" },
  { value: "resource", label: "Report a Resource Problem" },
  { value: "timeline_change", label: "Request a Timeline Change" },
  { value: "scope_clarification", label: "Request a Scope Clarification" },
  { value: "missing_information", label: "Report Missing Information" },
  { value: "financial", label: "Report a Financial or Expense Problem" },
  { value: "safety", label: "Report a Safety Concern" },
  { value: "safeguarding", label: "Report a Safeguarding Concern" },
  { value: "misconduct", label: "Report Misconduct or Pressure" },
  { value: "misuse", label: "Report Suspected Misuse of Funds" },
  { value: "technical", label: "Report a Technical Problem" },
] as const;

export const PRIVATE_CONCERN_CATEGORIES = [
  "project delay",
  "unsafe working conditions",
  "safeguarding",
  "suspected financial misuse",
  "fraud concern",
  "misconduct",
  "pressure to provide inaccurate information",
  "falsification of evidence",
  "data-protection concern",
  "discrimination or harassment",
  "retaliation concern",
  "conflict of interest",
  "other serious concern",
];

export const PRIORITIES = [
  { value: "routine", label: "Routine" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
  { value: "critical", label: "Critical" },
] as const;

export const CONFIDENTIALITY = [
  { value: "standard", label: "Standard – visible to normal Trust administrators" },
  { value: "restricted_finance", label: "Finance / Compliance restricted" },
  { value: "restricted_safeguarding", label: "Safeguarding restricted" },
  { value: "identity_restricted", label: "Identity restricted (visible only to safeguarding staff)" },
] as const;

export const STATUS_LABEL: Record<string, string> = {
  new: "New",
  triage: "Triage",
  assigned: "Assigned",
  investigating: "Investigating",
  awaiting_trust: "Awaiting Trust",
  awaiting_donor: "Awaiting Donor",
  awaiting_project_team: "Awaiting Project Team",
  awaiting_third_party: "Awaiting Third Party",
  proposed_resolution: "Proposed Resolution",
  resolved: "Resolved",
  closed: "Closed",
  reopened: "Reopened",
  escalated: "Escalated",
};

export const PRIORITY_LABEL: Record<string, string> = {
  routine: "Routine",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
  critical: "Critical",
};

export function slaState(dueAt: string | null | undefined): "none" | "ok" | "warn" | "breached" {
  if (!dueAt) return "none";
  const diff = new Date(dueAt).getTime() - Date.now();
  if (diff < 0) return "breached";
  if (diff < 1000 * 60 * 60 * 4) return "warn";
  return "ok";
}

export function formatDueIn(dueAt: string | null | undefined): string {
  if (!dueAt) return "—";
  const diff = new Date(dueAt).getTime() - Date.now();
  const abs = Math.abs(diff);
  const hours = Math.round(abs / (1000 * 60 * 60));
  if (hours < 24) return `${diff < 0 ? "overdue " : ""}${hours}h`;
  const days = Math.round(hours / 24);
  return `${diff < 0 ? "overdue " : ""}${days}d`;
}
