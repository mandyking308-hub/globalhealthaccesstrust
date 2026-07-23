// Public page for the Donor and Project Funding Terms legal document.
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function renderMarkdown(md: string): string {
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const output: string[] = [];
  let inList = false;

  const flushList = () => {
    if (inList) {
      output.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^#\s+/.test(line)) {
      flushList();
      output.push(`<h1>${escape(line.replace(/^#\s+/, ""))}</h1>`);
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushList();
      output.push(`<h2>${escape(line.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }
    if (/^###\s+/.test(line)) {
      flushList();
      output.push(`<h3>${escape(line.replace(/^###\s+/, ""))}</h3>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        output.push("<ul>");
        inList = true;
      }
      output.push(`<li>${escape(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (line.trim() === "") {
      flushList();
      output.push("");
      continue;
    }
    flushList();
    const html = escape(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    output.push(`<p>${html}</p>`);
  }

  flushList();
  return output.join("\n");
}

export default function DonorFundingTermsPage() {
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("current_legal_version", { _slug: "donor-project-funding-terms" });
      setDoc(Array.isArray(data) && data.length ? data[0] : null);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
      <Helmet>
        <title>{doc ? `${doc.title} | Global Health Access Trust` : "Donor and Project Funding Terms | Global Health Access Trust"}</title>
        <meta
          name="description"
          content={
            doc?.summary ||
            "Terms governing the review, acceptance, allocation, use, reporting and stewardship of financial and project contributions to Global Health Access Trust."
          }
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/donor-project-funding-terms" />
      </Helmet>

      <Link to="/legal" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
        ← Legal Centre
      </Link>

      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      ) : !doc ? (
        <div className="mt-6">
          <h1 className="font-serif text-3xl">Not yet published</h1>
          <p className="mt-3 text-muted-foreground">
            These Terms are being prepared by the Trust and have not yet been published.
          </p>
        </div>
      ) : (
        <article className="mt-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Contributions and Project Funding</div>
          <h1 className="font-serif text-4xl mt-1">{doc.title}</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Version {doc.version_number} · Effective {doc.effective_date || new Date(doc.published_at).toLocaleDateString()}
          </p>
          {doc.summary && <p className="mt-4 text-lg text-muted-foreground">{doc.summary}</p>}
          <div
            className="prose prose-neutral mt-6 max-w-none legal-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.body_markdown || "") }}
          />
        </article>
      )}
    </div>
  );
}
