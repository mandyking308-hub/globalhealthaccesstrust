import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

const documents = [
  {
    title: "Constitution (Signed)",
    status: "Authoritative governing document",
    detail: "Effective 1 December 2024 · Version 1.0 · Reference GHAT-CONSTITUTION-1.0",
    href: "/constitution",
  },
  {
    title: "Governance and Legal Framework",
    status: "Public governance summary",
    detail: "Legal identity, trustee authority, banking, due diligence and accountability.",
    href: "/governance-legal-framework",
  },
  {
    title: "Financial Controls",
    status: "Public control summary",
    detail: "Banking application status, cleared-funds treatment, Gift Aid position, approvals and reporting.",
    href: "/financial-controls",
  },
  {
    title: "Donor Due Diligence and Sanctions Policy",
    status: "Public policy",
    detail: "Risk-based identity, authority, source-of-funds, sanctions and related checks.",
    href: "/donor-due-diligence-and-sanctions-policy",
  },
  {
    title: "Gift Acceptance and Restricted Funds Policy",
    status: "Public policy",
    detail: "Trustee approval, restrictions, refusal, return and reallocation principles.",
    href: "/gift-acceptance-and-restricted-funds-policy",
  },
  {
    title: "Support, Complaints and Protected Concerns",
    status: "Public reporting routes",
    detail: "Dedicated routes for complaints, safeguarding, fraud, whistleblowing and other concerns.",
    href: "/support",
  },
  {
    title: "Legal Centre",
    status: "Versioned legal documents",
    detail: "Published terms, privacy, cookies, safeguarding, complaints and Project Team documents.",
    href: "/legal",
  },
];

export const PublicationsPage = () => (
  <ContentLayout>
    <SEO
      title="Publications and Documents"
      description="Verified public governance documents and policy routes for Global Health Access Trust."
      canonical="/publications"
    />
    <h1>Publications and Documents</h1>
    <p className="featured-text">Verified documents and public governance information only.</p>

    <p>
      This register does not use placeholder publications, invented checksums or illustrative annual reports. A document is described as published only where it is genuinely available through the website or the versioned Legal Centre.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {documents.map((document) => (
        <Card key={document.title} className="card-professional">
          <CardContent className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{document.status}</p>
            <h2 className="mt-3 text-2xl">{document.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{document.detail}</p>
            <Button asChild variant="outline" className="mt-6">
              <Link to={document.href}>View Document</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="section-container">
      <h2>Signed Constitution PDF</h2>
      <p>
        The signed Constitution remains available at <code>/GHAT_Constitution_2025_Refined.pdf</code>. The PDF has not been replaced or altered as part of the bank-readiness work.
      </p>
      <Button asChild>
        <a href="/GHAT_Constitution_2025_Refined.pdf" target="_blank" rel="noopener noreferrer">Open Signed PDF</a>
      </Button>
    </div>

    <div className="section-container">
      <h2>Accounts and external review</h2>
      <p>
        The website does not claim that annual accounts, an independent examination, an audit or a regulatory filing has already been completed or published. Such documents will be added only when they actually exist and are approved for public release.
      </p>
    </div>

    <div className="section-container">
      <h2>Due-diligence documents</h2>
      <p>
        Banks, professional advisers and other authorised reviewers may request appropriate private governance records through the secure contact route. Confidential resolutions, mandates and identity evidence are not published openly.
      </p>
      <Link to="/contact-the-trust" className="text-primary hover:underline">Request due-diligence information securely →</Link>
    </div>
  </ContentLayout>
);
