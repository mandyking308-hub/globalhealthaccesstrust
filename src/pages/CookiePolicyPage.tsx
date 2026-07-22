import { ContentLayout } from "@/components/layout/ContentLayout";
import { Link } from "react-router-dom";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


interface RegistryRow {
  id: string;
  storage_key: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
  is_first_party: boolean;
  legal_basis: string;
  active: boolean;
}

const CookiePolicyPage = () => {
  const [rows, setRows] = useState<RegistryRow[]>([]);

  useEffect(() => {
    void supabase
      .from("cookie_registry")
      .select("id, storage_key, provider, purpose, category, duration, is_first_party, legal_basis, active")
      .eq("active", true)
      .order("category")
      .then(({ data }) => setRows((data as RegistryRow[]) ?? []));
  }, []);

  return (
    <ContentLayout>
      <SEO
        title="Cookie Notice | Global Health Access Trust"
        description="Cookie Notice v1.0 (22 July 2026) for the Global Health Access Trust website and portals."
        canonical="/cookie-policy"
      />
      <div className="max-w-[72ch] mx-auto py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif">Cookie Notice</h1>
          <p className="text-sm text-muted-foreground">Version 1.0 · Effective 22 July 2026</p>
        </header>

        <Section n="1" title="Controller">
          <p>
            This Cookie Notice is issued by Global Health Access Trust ("the Trust", "we", "us") in respect of the
            website at globalhealthaccesstrust.com and the connected donor, project team and administrator portals.
            Correspondence: 2 Harley Street, London W1G 9PA. For data-protection contact, use the{" "}
            <Link to="/data-access-request" className="underline">Data Request</Link> route.
          </p>
        </Section>

        <Section n="2" title="Cookies and similar technologies">
          <p>
            "Cookies" in this notice covers cookies and any similar technologies that read or store information on your
            device, including local storage, session storage and comparable browser storage used by the site.
          </p>
        </Section>

        <Section n="3" title="Strictly necessary storage">
          <p>
            Some storage is essential to deliver the service you request: keeping you signed in to your portal,
            remembering your cookie choices, and protecting the site against abuse. Because these items are necessary,
            they do not require consent and cannot be turned off in the settings panel.
          </p>
        </Section>

        <Section n="4" title="Functional storage">
          <p>
            Functional items remember non-essential choices, such as display preferences. They only run if you turn on
            "Functional" in the settings panel.
          </p>
        </Section>

        <Section n="5" title="Analytics">
          <p>
            We may use aggregated, privacy-respecting analytics to understand how the site is used. Analytics do not run
            until you turn on "Analytics" in the settings panel. No analytics tags, pixels, or third-party scripts are
            loaded before you consent.
          </p>
        </Section>

        <Section n="6" title="Embedded content">
          <p>
            Pages may embed content from third parties (for example, video or maps). Where embedded content would set
            cookies, it is only loaded after you turn on the corresponding category.
          </p>
        </Section>

        <Section n="7" title="Security technologies">
          <p>
            We use technical measures to detect and prevent abuse of the site and portals. These operate as strictly
            necessary and do not track you for advertising.
          </p>
        </Section>

        <Section n="8" title="Payment-provider technologies">
          <p>
            When you initiate a Direct Debit setup or bank-transfer donation, payment providers may set their own
            technologies on their hosted pages. Those pages are governed by the provider's own notices.
          </p>
        </Section>

        <Section n="9" title="Authentication">
          <p>
            When you sign in, our authentication provider sets a session token so we can recognise you across pages of
            the portal. This is strictly necessary; without it you cannot use the portal.
          </p>
        </Section>

        <Section n="10" title="Cookie duration">
          <p>
            Some items last only as long as your browser session; others persist for up to one year. Specific durations
            are shown in the inventory below.
          </p>
        </Section>

        <Section n="11" title="Third-party providers">
          <p>
            The current inventory shows which providers, if any, set data on your device, and whether they are first or
            third party. We only enable third-party items after you have consented to the relevant category.
          </p>
        </Section>

        <Section n="12" title="Consent">
          <p>
            When you first visit the site, you can Accept all, Reject non-essential, or Manage each category. No
            non-essential item runs until you consent.
          </p>
        </Section>

        <Section n="13" title="Withdrawal">
          <p>
            You can change or withdraw your consent at any time using the{" "}
            <CookieSettingsLink className="underline">Cookie settings</CookieSettingsLink> link in the footer or here.
          </p>
        </Section>

        <Section n="14" title="Browser controls">
          <p>
            You can also control storage using your browser settings. Blocking strictly necessary items may prevent
            parts of the site from working.
          </p>
        </Section>

        <Section n="15" title="Updates">
          <p>
            If we materially change this notice, we will publish a new version with an updated effective date, and where
            appropriate ask you to reconfirm your choices.
          </p>
        </Section>

        <Section n="16" title="Contact">
          <p>
            To ask about this notice or exercise your rights, use{" "}
            <Link to="/data-access-request" className="underline">Data Request</Link> or the{" "}
            <Link to="/contact-the-trust" className="underline">contact route</Link>.
          </p>
        </Section>

        <section className="pt-8 border-t">
          <h2 className="text-2xl font-serif mb-4">Current inventory</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The following items are set by the site. We do not run non-essential items until you consent.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">Key</th>
                  <th className="text-left p-2 font-medium">Provider</th>
                  <th className="text-left p-2 font-medium">Category</th>
                  <th className="text-left p-2 font-medium">Purpose</th>
                  <th className="text-left p-2 font-medium">Duration</th>
                  <th className="text-left p-2 font-medium">Party</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-3 text-muted-foreground">
                      No active items registered.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.id} className="border-t align-top">
                    <td className="p-2 font-mono text-xs">{r.storage_key}</td>
                    <td className="p-2">{r.provider}</td>
                    <td className="p-2 capitalize">{r.category}</td>
                    <td className="p-2">{r.purpose}</td>
                    <td className="p-2">{r.duration}</td>
                    <td className="p-2">{r.is_first_party ? "First" : "Third"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
};

const Section = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-serif mb-2">
      <span className="text-muted-foreground mr-3">{n}.</span>
      {title}
    </h2>
    <div className="text-[15px] leading-relaxed text-foreground/90 space-y-2">{children}</div>
  </section>
);

export default CookiePolicyPage;
