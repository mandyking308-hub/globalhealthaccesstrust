import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { all50BlogPosts } from "@/data/complete50BlogPosts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SiteSearchResult {
  type: "page" | "blog" | "document";
  title: string;
  url: string;
  excerpt: string;
  date?: string;
  keywords?: string;
}

const PAGE_INDEX: SiteSearchResult[] = [
  { type: "page", title: "About the Trust", url: "/about-the-trust", excerpt: "The Trust's purpose, history, structure and approach to healthcare access.", keywords: "mission history charity charitable trust" },
  { type: "page", title: "Trustee Biographies", url: "/trustee-biographies", excerpt: "Trustees, constitutional signatories and specialist contributors.", keywords: "board governance advisers people" },
  { type: "page", title: "Our Work", url: "/our-work", excerpt: "Healthcare access, capacity building, health systems, research and emergency relief.", keywords: "countries network programmes projects" },
  { type: "page", title: "How We Work", url: "/how-we-work", excerpt: "How projects, partnerships, oversight and reporting are structured.", keywords: "delivery partners monitoring" },
  { type: "page", title: "Support the Trust", url: "/support-the-trust", excerpt: "Ways to engage with and support the Trust's work.", keywords: "funding donation legacy gift" },
  { type: "page", title: "Donor Portal Guide", url: "/donor-guide", excerpt: "How the secure Donor Portal works.", keywords: "dashboard login contribution" },
  { type: "page", title: "Project Team Application", url: "/volunteer-apply", excerpt: "Apply to join a commissioned project delivery team.", keywords: "volunteer field worker clinician cv" },
  { type: "page", title: "Contact the Trust", url: "/contact", excerpt: "Submit a secure general, partnership, funding, legal or media enquiry.", keywords: "message address enquiry" },
  { type: "page", title: "Frequently Asked Questions", url: "/frequently-asked-questions", excerpt: "Answers to common questions about the Trust and its work.", keywords: "faq help" },
  { type: "page", title: "Publications and Documents", url: "/publications", excerpt: "Governance, policy and public documents.", keywords: "reports policies" },
  { type: "document", title: "Signed Constitution", url: "/constitution", excerpt: "The Trust's authoritative governing document, effective 1 December 2024.", keywords: "trust deed governing document GHAT-CONSTITUTION-1.0" },
  { type: "document", title: "Legal, Privacy and Governance Centre", url: "/legal", excerpt: "Versioned terms, policies, privacy and governance documents.", keywords: "legal centre" },
  { type: "document", title: "Privacy Notice", url: "/legal/privacy-notice", excerpt: "How the Trust processes and protects personal data.", keywords: "UK GDPR data protection" },
  { type: "document", title: "Website and Portal Terms of Use", url: "/legal/terms-of-use", excerpt: "Terms governing use of the public website and secure portals.", keywords: "website portal terms" },
  { type: "document", title: "Donor and Project Funding Terms", url: "/donor-project-funding-terms", excerpt: "Terms governing structured gifts, allocation, use, reporting and refunds.", keywords: "donation funding 20 80" },
  { type: "document", title: "Gift Acceptance and Restricted Funds Policy", url: "/gift-acceptance-and-restricted-funds-policy", excerpt: "How gifts are accepted, refused, restricted, suspended or returned.", keywords: "restricted unrestricted gift policy" },
  { type: "document", title: "Donor Due Diligence and Sanctions Policy", url: "/donor-due-diligence-and-sanctions-policy", excerpt: "Risk-based donor checks, source of funds and sanctions controls.", keywords: "KYC AML PEP compliance" },
  { type: "document", title: "Project Team Terms", url: "/project-team-terms", excerpt: "Conduct, safeguarding, evidence, expenses and confidentiality terms for project teams.", keywords: "volunteer staff terms" },
  { type: "document", title: "Complaints Policy", url: "/legal/complaints-policy", excerpt: "How complaints are received, investigated, answered and escalated.", keywords: "complaint grievance" },
  { type: "document", title: "Safeguarding", url: "/safeguarding", excerpt: "The Trust's safeguarding framework and reporting route.", keywords: "child adult risk report concern" },
  { type: "document", title: "Financial Controls", url: "/financial-controls", excerpt: "The Trust's financial control and oversight framework.", keywords: "banking accounts audit budget" },
  { type: "document", title: "Risk Management", url: "/risk-management", excerpt: "How operational, financial, legal and safeguarding risks are managed.", keywords: "risk register controls" },
  { type: "document", title: "Whistleblowing", url: "/whistleblowing", excerpt: "Protected reporting and non-retaliation arrangements.", keywords: "fraud wrongdoing concern" },
  { type: "page", title: "Project Support", url: "/support", excerpt: "Support, complaints, protected concerns and safeguarding pathways.", keywords: "help incident issue" },
  { type: "page", title: "Data-protection Rights Request", url: "/data-access-request", excerpt: "Exercise access, correction, erasure and other UK GDPR rights.", keywords: "subject access SAR privacy data" },
];

const BLOG_INDEX: SiteSearchResult[] = all50BlogPosts.map((post) => ({
  type: "blog",
  title: post.title,
  url: `/blog/${post.slug}`,
  excerpt: post.summary,
  date: post.publishDate,
  keywords: [...post.categories, ...post.tags, post.region, post.programArea].filter(Boolean).join(" "),
}));

const SEARCH_INDEX = [...PAGE_INDEX, ...BLOG_INDEX];

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
          <DialogTitle className="sr-only">Search GHAT Website</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              aria-label="Search pages, articles and documents"
              placeholder="Search pages, articles, and documents..."
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
                    {result.date && <p className="text-xs text-muted-foreground mt-2">{new Date(result.date).toLocaleDateString("en-GB")}</p>}
                  </Link>
                ))}
              </>
            )}

            {!query && (
              <div className="text-center py-8 text-muted-foreground">Start typing to search pages, articles, and documents</div>
            )}
          </div>

          <div className="text-xs text-muted-foreground border-t pt-4">
            <p><strong>Search tips:</strong> Search by subject, region, policy name, programme or document title.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
