import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SiteSearchResult {
  type: "page" | "document";
  title: string;
  url: string;
  excerpt: string;
  keywords?: string;
}

const SEARCH_INDEX: SiteSearchResult[] = [
  {
    type: "page",
    title: "About the Trust",
    url: "/about-the-trust",
    excerpt: "The Trust's purpose, history, structure and approach to enabling better healthcare.",
    keywords: "mission history charitable trust public benefit",
  },
  {
    type: "page",
    title: "Trustee Biographies",
    url: "/trustee-biographies",
    excerpt: "The Trustees, constitutional signatories and specialist advisers supporting the Trust.",
    keywords: "Mandy King Jagdev Thukral John O'Sullivan board governance advisers",
  },
  {
    type: "page",
    title: "Our Work",
    url: "/our-work",
    excerpt: "Public-benefit work spanning healthcare access, infrastructure, housing, food systems, education, livelihoods, responsible technology and humanitarian response.",
    keywords: "projects countries systems AI agriculture water logistics research community",
  },
  {
    type: "page",
    title: "How We Work",
    url: "/how-we-work",
    excerpt: "How needs are scoped, projects structured, contributors verified and delivery evidenced.",
    keywords: "delivery partners milestones safeguards monitoring evidence",
  },
  {
    type: "page",
    title: "Support the Trust",
    url: "/support-the-trust",
    excerpt: "Support through funding, time, expertise, equipment, premises, technology, services or relationships.",
    keywords: "support pledge contribution donor gift legacy resources",
  },
  {
    type: "page",
    title: "Pledge a Contribution",
    url: "/donate",
    excerpt: "Pledge money, time, expertise, equipment, premises, technology, services or other practical support for review.",
    keywords: "donate funding volunteer equipment land premises due diligence verification",
  },
  {
    type: "page",
    title: "Commission a Public-Benefit Project",
    url: "/commission-projects",
    excerpt: "Propose and help shape a structured charitable project for scoping and Trustee review.",
    keywords: "commission project infrastructure housing food education AI humanitarian research",
  },
  {
    type: "page",
    title: "Get Involved",
    url: "/get-involved",
    excerpt: "Routes for professional contributors, volunteers, organisations, supporters and project propositions.",
    keywords: "partnership contributor expert volunteer organisation",
  },
  {
    type: "page",
    title: "Project Team & Contributor Application",
    url: "/volunteer-apply",
    excerpt: "Register interest in contributing professional, technical, practical or local capability to approved work.",
    keywords: "application volunteer clinician engineer researcher technologist CV experience",
  },
  {
    type: "page",
    title: "Donor Portal Guide",
    url: "/donor-guide",
    excerpt: "How the secure supporter workspace, verification process, commissioned projects and contribution records operate.",
    keywords: "dashboard login pledge contribution agreement due diligence",
  },
  {
    type: "page",
    title: "Donor Recognition",
    url: "/donor-recognition",
    excerpt: "Recognition, dedication, privacy and anonymity choices for accepted support.",
    keywords: "anonymous acknowledgement family organisation dedication",
  },
  {
    type: "page",
    title: "Contact the Trust",
    url: "/contact-the-trust",
    excerpt: "Find the appropriate route for general, partnership, project, support, governance or legal matters.",
    keywords: "contact enquiry help partnership",
  },
  {
    type: "page",
    title: "Secure Contact Form",
    url: "/contact",
    excerpt: "Submit a secure enquiry to the Trust for review and response.",
    keywords: "message form enquiry organisation",
  },
  {
    type: "page",
    title: "Frequently Asked Questions",
    url: "/frequently-asked-questions",
    excerpt: "Answers to common questions about the Trust, its scope, governance and engagement routes.",
    keywords: "FAQ help questions",
  },
  {
    type: "page",
    title: "Publications & Documents",
    url: "/publications",
    excerpt: "Approved governing documents, policies, reports and institutional material.",
    keywords: "publication reports policies documents",
  },
  {
    type: "document",
    title: "Trust Deed",
    url: "/constitution",
    excerpt: "The Trust's authoritative governing document, effective 1 December 2024.",
    keywords: "constitution governing document objects advance health relieve illness preserve life",
  },
  {
    type: "document",
    title: "Legal, Privacy and Governance Centre",
    url: "/legal",
    excerpt: "Versioned terms, policies, privacy and governance documents.",
    keywords: "legal centre compliance",
  },
  {
    type: "document",
    title: "Privacy Notice",
    url: "/legal/privacy-notice",
    excerpt: "How the Trust processes and protects personal data.",
    keywords: "UK GDPR data protection privacy",
  },
  {
    type: "document",
    title: "Website and Portal Terms of Use",
    url: "/legal/terms-of-use",
    excerpt: "Terms governing use of the public website and secure portals.",
    keywords: "website portal terms",
  },
  {
    type: "document",
    title: "Donor and Project Funding Terms",
    url: "/donor-project-funding-terms",
    excerpt: "Terms governing the review, acceptance, use, reporting and stewardship of contributions and project funding.",
    keywords: "donor contribution funding terms restriction acceptance",
  },
  {
    type: "document",
    title: "Gift Acceptance and Restricted Funds Policy",
    url: "/gift-acceptance-and-restricted-funds-policy",
    excerpt: "How contributions are accepted, refused, restricted, suspended or returned.",
    keywords: "restricted unrestricted gift contribution policy",
  },
  {
    type: "document",
    title: "Donor Due Diligence and Sanctions Policy",
    url: "/donor-due-diligence-and-sanctions-policy",
    excerpt: "Risk-based donor checks, source-of-funds review and sanctions controls.",
    keywords: "KYC AML PEP compliance verification",
  },
  {
    type: "document",
    title: "Project Team Terms",
    url: "/project-team-terms",
    excerpt: "Conduct, safeguarding, evidence, expenses and confidentiality terms for project contributors.",
    keywords: "volunteer professional contributor staff terms",
  },
  {
    type: "document",
    title: "Complaints Policy",
    url: "/legal/complaints-policy",
    excerpt: "How complaints are received, investigated, answered and escalated.",
    keywords: "complaint grievance",
  },
  {
    type: "document",
    title: "Safeguarding",
    url: "/safeguarding",
    excerpt: "The Trust's safeguarding framework and reporting route.",
    keywords: "child adult risk report concern",
  },
  {
    type: "document",
    title: "Financial Controls",
    url: "/financial-controls",
    excerpt: "The Trust's financial-control and oversight framework.",
    keywords: "banking accounts audit budget finance",
  },
  {
    type: "document",
    title: "Risk Management",
    url: "/risk-management",
    excerpt: "How operational, financial, legal and safeguarding risks are managed.",
    keywords: "risk register controls",
  },
  {
    type: "document",
    title: "Whistleblowing",
    url: "/whistleblowing",
    excerpt: "Protected reporting and non-retaliation arrangements.",
    keywords: "fraud wrongdoing concern protected disclosure",
  },
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    return SEARCH_INDEX
      .map((result) => {
        const haystack = `${result.title} ${result.excerpt} ${result.keywords || ""}`.toLowerCase();
        const score = terms.reduce((total, term) => {
          if (result.title.toLowerCase().includes(term)) return total + 4;
          if (haystack.includes(term)) return total + 1;
          return total;
        }, 0);
        const allTermsMatch = terms.every((term) => haystack.includes(term));
        return { result, score, allTermsMatch };
      })
      .filter(({ score, allTermsMatch }) => score > 0 && allTermsMatch)
      .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
      .slice(0, 12)
      .map(({ result }) => result);
  }, [query]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search the GHAT website</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              aria-label="Search pages and documents"
              placeholder="Search pages and documents..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto" aria-live="polite">
            {query && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No results found for “{query}”</div>
            )}

            {results.length > 0 && (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </div>
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.url}`}
                    to={result.url}
                    onClick={onClose}
                    className="block p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <h3 className="font-medium text-foreground">{result.title}</h3>
                      <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded">{result.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt}</p>
                  </Link>
                ))}
              </>
            )}

            {!query && (
              <div className="text-center py-8 text-muted-foreground">Start typing to search pages and documents</div>
            )}
          </div>

          <div className="text-xs text-muted-foreground border-t pt-4">
            <p><strong>Search tips:</strong> Search by subject, project area, policy name or document title.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
