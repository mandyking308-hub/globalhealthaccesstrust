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
        <meta name="description" content="Official Terms, Privacy Notice, Complaints Policy, Safeguarding Policy and other governance documents of the Global Health Access Trust." />
      </Helmet>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Trust Governance</span>
      <h1 className="font-serif text-5xl mt-2">Legal, Privacy & Governance</h1>
      <p className="mt-4 text-muted-foreground text-lg">
        The following documents govern the relationship between the Trust, its supporters, its project teams and the beneficiaries it serves.
        Each document is versioned and published only after trustee approval.
      </p>

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
