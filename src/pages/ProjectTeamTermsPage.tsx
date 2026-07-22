// Public page for the "Project Team Terms" legal document (v1.0).
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function renderMarkdown(md: string): string {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  const flushList = () => { if (inList) { out.push("</ul>"); inList = false; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^#\s+/.test(line)) { flushList(); out.push(`<h1>${escape(line.replace(/^#\s+/, ""))}</h1>`); continue; }
    if (/^##\s+/.test(line)) { flushList(); out.push(`<h2>${escape(line.replace(/^##\s+/, ""))}</h2>`); continue; }
    if (/^###\s+/.test(line)) { flushList(); out.push(`<h3>${escape(line.replace(/^###\s+/, ""))}</h3>`); continue; }
    if (/^---\s*$/.test(line)) { flushList(); out.push("<hr />"); continue; }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${escape(line.replace(/^[-*]\s+/, ""))}</li>`); continue;
    }
    if (line.trim() === "") { flushList(); out.push(""); continue; }
    flushList();
    const html = escape(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
    out.push(`<p>${html}</p>`);
  }
  flushList();
  return out.join("\n");
}

export default function ProjectTeamTermsPage() {
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("current_legal_version", { _slug: "project-team-terms" });
      setDoc(Array.isArray(data) && data.length ? data[0] : null);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
      <Helmet>
        <title>{doc ? `${doc.title} | Global Health Access Trust` : "Project Team Terms | Global Health Access Trust"}</title>
        <meta
          name="description"
          content={doc?.summary || "Terms governing eligibility, conduct, safeguarding, evidence, expenses and confidentiality for Global Health Access Trust project team members."}
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/project-team-terms" />
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
            These terms are being prepared by the Trust and have not yet been published.
          </p>
        </div>
      ) : (
        <article className="mt-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Project Team</div>
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
