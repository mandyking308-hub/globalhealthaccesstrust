// Lightweight, non-blocking source of truth for public legal document metadata.
// This is a factual index. It does not imply solicitor or trustee approval.

export type LegalAudience = "public" | "donor" | "project_team" | "admin";

export interface LegalDocumentRecord {
  slug: string;
  title: string;
  version: string;
  effectiveDate: string; // ISO date
  route: string;
  audience: LegalAudience[];
  active: boolean;
}

export const LEGAL_DOCUMENTS: LegalDocumentRecord[] = [
  {
    slug: "terms-of-use",
    title: "Website and Portal Terms of Use",
    version: "1.0",
    effectiveDate: "2026-07-22",
    route: "/terms-of-use",
    audience: ["public", "donor", "project_team", "admin"],
    active: true,
  },
  {
    slug: "privacy-notice",
    title: "Privacy Notice",
    version: "1.0",
    effectiveDate: "2026-07-22",
    route: "/privacy-policy",
    audience: ["public", "donor", "project_team", "admin"],
    active: true,
  },
];

export const getLegalDocument = (slug: string): LegalDocumentRecord | undefined =>
  LEGAL_DOCUMENTS.find((d) => d.slug === slug);
