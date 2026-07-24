import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const LegalIndexPage = () => {
  const [docs, setDocs] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("legal_documents")
        .select("slug,title,category,current_published_version_id")
        .order("category").order("title");
      setDocs(data || []);
    })();
  }, []);

  const grouped = docs.reduce<Record<string, any[]>>((acc, d) => {
    (acc[d.category] ||= []).push(d); return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">
      <Helmet>
        <title>Legal, Privacy & Governance | Global Health Access Trust</title>
        <meta name="description" content="The signed Constitution, Updated Trust Deed, terms, privacy, complaints, safeguarding and other governance documents published by Global Health Access Trust." />
      </Helmet>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Trust Governance</span>
      <h1 className="font-serif text-5xl mt-2">Legal, Privacy & Governance</h1>
      <p className="mt-4 text-muted-foreground text-lg">
        The following documents explain the relationship between the Trust, its supporters, its project teams and the beneficiaries it serves.
        The status shown beside each document indicates whether a current version is available for public reference.
      </p>

      <section className="mt-10">
        <h2 className="font-serif text-2xl border-b pb-2">Governing documents</h2>
        <ul className="mt-4 divide-y">
          <li className="py-3 flex items-center justify-between gap-4">
            <a href="/GHAT_Constitution_2025_Refined.pdf" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Signed Constitution - June 2025</a>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Published</span>
          </li>
          <li className="py-3 flex items-center justify-between gap-4">
            <a href="/GHAT_Updated_Trust_Deed_24_July_2026.html" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">Updated Trust Deed - 24 July 2026</a>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Published</span>
          </li>
          <li className="py-3 flex items-center justify-between gap-4">
            <Link to="/constitution" className="font-medium hover:underline">How the governing documents work together</Link>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Current</span>
          </li>
        </ul>
      </section>

      {Object.entries(grouped).map(([cat, list]) => (
        <section key={cat} className="mt-10">
          <h2 className="font-serif text-2xl border-b pb-2">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
          <ul className="mt-4 divide-y">
            {list.map((d) => (
              <li key={d.slug} className="py-3 flex items-center justify-between">
                <Link to={`/legal/${d.slug}`} className="font-medium hover:underline">{d.title}</Link>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {d.current_published_version_id ? "Published" : "In preparation"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default LegalIndexPage;