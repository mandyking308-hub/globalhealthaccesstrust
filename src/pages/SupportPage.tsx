import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, LifeBuoy, MessageSquare, ShieldAlert, Shield, Server } from "lucide-react";

const pathways = [
  {
    to: "/support/new",
    icon: LifeBuoy,
    title: "Project Support",
    body: "Questions about your donor account, a payment, an allocation, a project, the project team, evidence, privacy or technical matters. Categorised routing and a reference number.",
  },
  {
    to: "/complaints/new",
    icon: MessageSquare,
    title: "Complaints",
    body: "Formal complaint about a person, a project, a decision or the Trust. Acknowledged, investigated fairly and answered in writing. Escalation available.",
  },
  {
    to: "/safeguarding/report",
    icon: ShieldAlert,
    title: "Safeguarding",
    body: "A person is at risk of harm, abuse or neglect. Handled by designated safeguarding officers under highly restricted access. Emergency services first if life is at risk.",
    accent: true,
  },
  {
    to: "/protected-concerns/new",
    icon: Shield,
    title: "Protected Concerns (Whistleblowing)",
    body: "Wrongdoing, fraud, misuse of funds, retaliation, conflicts, serious governance failure or legal breach. Named or anonymous submission. Restricted to a small group.",
  },
  {
    to: "/fraud-concerns",
    icon: AlertTriangle,
    title: "Fraud Concerns",
    body: "Report suspected financial fraud, misuse of donations or supplier irregularities. Routes to the same restricted queue as protected concerns.",
  },
  {
    to: "/protected-concerns/new",
    icon: Server,
    title: "Security and Data Incidents",
    body: "Report a suspected security or data breach affecting Trust systems or personal data. The report enters the restricted protected-concerns queue for designated officers.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Helmet>
        <title>Support and Concerns | Global Health Access Trust</title>
        <meta
          name="description"
          content="Choose the correct pathway: project support, complaints, safeguarding, protected concerns, fraud or security incidents."
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/support" />
      </Helmet>
      <div className="container-content py-16 max-w-6xl mx-auto">
        <header className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Support &amp; concerns</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Pick the pathway that fits your matter.</h1>
          <p className="text-lg text-muted-foreground">
            The Trust operates dedicated pathways so each matter reaches the right people. Each pathway issues a reference number and confirms next steps. If a person is in immediate danger, contact local emergency services first.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map(({ to, icon: Icon, title, body, accent }) => (
            <Link
              key={title}
              to={to}
              className={`block rounded-lg border transition-colors hover:border-primary ${
                accent ? "border-destructive/40 bg-destructive/5" : "border-border"
              }`}
            >
              <Card className="border-0 shadow-none bg-transparent h-full">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Icon className="h-6 w-6 mt-1 shrink-0" />
                  <CardTitle className="text-xl font-serif">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground max-w-3xl">
          The Trust does not publish guaranteed resolution times. Acknowledgement is normally within a small number of working days. Confidentiality is protected as far as safety and legal obligations allow, but is not absolute.
        </p>
      </div>
    </>
  );
}
