import { Badge } from "@/components/ui/badge";

interface Field { label: string; value: any; }

export const AgreementView = ({ agreement, milestones }: { agreement: any; milestones: any[] }) => {
  if (!agreement) return null;

  const money = (n: any) => n == null ? "—" : `£${Number(n).toLocaleString()}`;
  const date = (d: any) => d ? new Date(d).toLocaleDateString() : "—";

  const fields: Field[] = [
    { label: "Purpose", value: agreement.purpose },
    { label: "Intended outcomes", value: agreement.intended_outcomes },
    { label: "Location (safe level)", value: agreement.safe_location },
    { label: "Scope", value: agreement.scope },
    { label: "Exclusions from scope", value: agreement.exclusions },
    { label: "Deliverables", value: agreement.deliverables },
    { label: "Beneficiary group", value: agreement.beneficiary_group },
    { label: "Funding target", value: money(agreement.funding_target) },
    { label: "Gross donation", value: money(agreement.gross_donation) },
    { label: "Trust operating allocation", value: money(agreement.operating_allocation) },
    { label: "Project delivery allocation", value: money(agreement.delivery_allocation) },
    { label: "Planned start", value: date(agreement.planned_start) },
    { label: "Planned completion", value: date(agreement.planned_completion) },
    { label: "Expected duration", value: agreement.expected_duration },
    { label: "Reporting frequency", value: agreement.reporting_frequency },
    { label: "First report due", value: date(agreement.first_report_due) },
    { label: "Evidence requirements", value: agreement.evidence_requirements },
    { label: "Financial reporting", value: agreement.financial_reporting },
    { label: "Communication arrangements", value: agreement.communication_arrangements },
    { label: "Complaint procedure", value: agreement.complaint_procedure },
    { label: "Safeguarding route", value: agreement.safeguarding_route },
    { label: "Confidentiality & data-protection terms", value: agreement.confidentiality_terms },
  ].filter((f) => f.value != null && f.value !== "");

  return (
    <article className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Project Charter & Delivery Agreement</div>
          <h2 className="font-serif text-3xl mt-1">{agreement.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">Version {agreement.version_number}</Badge>
            <Badge variant={agreement.status === "active" ? "default" : "outline"}>{agreement.status}</Badge>
            {agreement.is_donor_accepted && <Badge variant="outline">Donor accepted</Badge>}
            {agreement.is_team_accepted && <Badge variant="outline">Team accepted</Badge>}
            {agreement.is_trust_approved && <Badge variant="outline">Trust approved</Badge>}
          </div>
        </div>
      </header>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {fields.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{f.label}</dt>
            <dd className="mt-1 text-sm whitespace-pre-wrap">{f.value}</dd>
          </div>
        ))}
      </dl>

      {milestones && milestones.length > 0 && (
        <section>
          <h3 className="font-serif text-xl mb-2">Milestones</h3>
          <ol className="space-y-2">
            {milestones.map((m) => (
              <li key={m.id} className="border border-foreground/10 rounded p-3 flex justify-between">
                <div>
                  <div className="font-medium">{m.sequence}. {m.title}</div>
                  <div className="text-xs text-muted-foreground">Weight {m.weight}</div>
                </div>
                <div className="text-sm">{m.target_date ? new Date(m.target_date).toLocaleDateString() : "—"}</div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  );
};
