import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, CheckCircle2, FileText, LockKeyhole } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LEGAL_DOCUMENTS,
  REQUIRED_HIGH_VALUE_READINESS_CHECKS,
  legalStatusLabel,
} from "@/lib/legalReadiness";

const categoryOrder = [
  "Donor & Funding",
  "Project Delivery",
  "Privacy & Data",
  "Integrity & Protection",
  "Website",
] as const;

export const LegalGovernanceCentrePage = () => {
  return (
    <div className="py-16">
      <Helmet>
        <title>Legal, Privacy & Governance Centre | Global Health Access Trust</title>
        <meta
          name="description"
          content="Legal, privacy, donor, project-delivery and governance documents for Global Health Access Trust."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container-content space-y-10">
        <header className="max-w-4xl">
          <div className="flex items-center gap-3 text-primary mb-4">
            <LockKeyhole className="h-5 w-5" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Governance control centre</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight">
            Legal, Privacy & Governance
          </h1>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            This register controls the documents required before GHAT accepts, allocates or releases high-value donations.
            Draft documents are not published terms and must not be represented as solicitor-approved or trustee-approved.
          </p>
        </header>

        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
              High-value donation journey is not yet legally ready
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              The public website may continue to explain the Trust's purpose, but a substantial or bespoke donation must remain
              subject to legal-entity verification, due diligence, sanctions review, trustee approval and transaction-specific terms.
            </p>
            <p>
              No document below is treated as approved merely because it exists in the codebase. Publication status and legal acceptance
              must be controlled by versioned records and named approvals.
            </p>
          </CardContent>
        </Card>

        {categoryOrder.map((category) => {
          const docs = LEGAL_DOCUMENTS.filter((document) => document.category === category);
          if (!docs.length) return null;
          return (
            <section key={category} className="space-y-4">
              <div className="flex items-end justify-between gap-4 border-b pb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Document register</span>
                  <h2 className="text-2xl font-serif mt-1">{category}</h2>
                </div>
                <span className="text-xs text-muted-foreground">{docs.length} document{docs.length === 1 ? "" : "s"}</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {docs.map((document) => (
                  <Card key={document.slug} className="h-full">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <FileText className="h-5 w-5 text-primary mt-1" />
                        <Badge variant={document.status === "published" ? "default" : "outline"}>
                          {legalStatusLabel(document.status)} · {document.version}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{document.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{document.summary}</p>
                      <dl className="text-xs grid gap-2">
                        <div>
                          <dt className="uppercase tracking-wider text-muted-foreground">Audience</dt>
                          <dd className="mt-1">{document.audience}</dd>
                        </div>
                        <div>
                          <dt className="uppercase tracking-wider text-muted-foreground">Approvals required</dt>
                          <dd className="mt-1">
                            {document.requiresTrusteeApproval ? "Trustee approval" : "Internal approval"}
                            {document.requiresSolicitorReview ? " · Solicitor review" : ""}
                          </dd>
                        </div>
                      </dl>
                      <Link
                        to={document.route}
                        className="inline-flex text-sm font-semibold text-primary hover:underline"
                      >
                        {document.sections ? "Open draft framework" : "Open current page"}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        <section className="space-y-4">
          <div className="border-b pb-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Launch control</span>
            <h2 className="text-2xl font-serif mt-1">High-Value Donation Readiness</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <ol className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {REQUIRED_HIGH_VALUE_READINESS_CHECKS.map((check, index) => (
                  <li key={check} className="flex items-start gap-3 text-sm">
                    <span className="h-6 w-6 shrink-0 rounded-full border flex items-center justify-center text-[11px] text-muted-foreground">
                      {index + 1}
                    </span>
                    <span>{check}</span>
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-2 mt-6 pt-5 border-t text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                Readiness must be evidenced in the Admin Console; a visual checklist alone is not approval.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
