import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Minimal safe markdown renderer: headings, paragraphs, lists, bold/italic, blockquotes.
// Deliberately no HTML injection; content authored by admins only.
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
    if (/^>\s?/.test(line)) { flushList(); out.push(`<blockquote>${escape(line.replace(/^>\s?/, ""))}</blockquote>`); continue; }
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${escape(line.replace(/^[-*]\s+/, ""))}</li>`); continue;
    }
    if (line.trim() === "") { flushList(); out.push(""); continue; }
    flushList();
    const html = escape(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
    out.push(`<p>${html}</p>`);
  }
  flushList();
  return out.join("\n");
}

export const LegalDocumentPage = () => {
  const { slug } = useParams();
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const loadDocument = async () => {
      setLoading(true);
      setLoadFailed(false);

      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc("current_legal_version", { _slug: slug });
        const rpcDocument = Array.isArray(rpcData) && rpcData.length ? rpcData[0] : null;

        if (!rpcError && rpcDocument) {
          if (active) setDoc(rpcDocument);
          return;
        }

        // Public read-only fallback. The legal index already uses legal_documents;
        // this follows its current_published_version_id and reads only that version.
        const { data: legalDocument, error: documentError } = await supabase
          .from("legal_documents")
          .select("id,title,category,current_published_version_id")
          .eq("slug", slug || "")
          .maybeSingle();

        if (documentError) throw documentError;
        if (!legalDocument?.current_published_version_id) {
          if (active) setDoc(null);
          return;
        }

        const { data: publishedVersion, error: versionError } = await supabase
          .from("legal_document_versions")
          .select("version_number,body_markdown,summary,effective_date,published_at")
          .eq("id", legalDocument.current_published_version_id)
          .maybeSingle();

        if (versionError) throw versionError;
        if (active) setDoc(publishedVersion ? { ...legalDocument, ...publishedVersion } : null);
      } catch (error) {
        console.error("Unable to load published legal document", error);
        if (active) {
          setDoc(null);
          setLoadFailed(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDocument();
    return () => { active = false; };
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-14">
      <Helmet>
        <title>{doc ? `${doc.title} | Global Health Access Trust` : "Legal | Global Health Access Trust"}</title>
        {doc && <meta name="description" content={doc.summary || `${doc.title} — Global Health Access Trust`} />}
      </Helmet>
      <Link to="/legal" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">← Legal Centre</Link>
      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading…</p>
      ) : loadFailed ? (
        <div className="mt-6">
          <h1 className="font-serif text-3xl">Document temporarily unavailable</h1>
          <p className="mt-3 text-muted-foreground">
            The published document could not be loaded. Please use the Legal Centre or contact the Trust for assistance.
          </p>
        </div>
      ) : !doc ? (
        <div className="mt-6">
          <h1 className="font-serif text-3xl">Not yet published</h1>
          <p className="mt-3 text-muted-foreground">
            This document is being prepared by the Trust and has not yet been published for public reference.
            Please check back shortly or contact the Trust for details.
          </p>
        </div>
      ) : (
        <article className="mt-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{doc.category}</div>
          <h1 className="font-serif text-4xl mt-1">{doc.title}</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Version {doc.version_number} · Effective {doc.effective_date || new Date(doc.published_at).toLocaleDateString()}
          </p>
          {doc.summary && <p className="mt-4 text-lg text-muted-foreground">{doc.summary}</p>}
          <div className="prose prose-neutral mt-6 max-w-none legal-body"
               dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.body_markdown || "") }} />
        </article>
      )}
    </div>
  );
};

export default LegalDocumentPage;
