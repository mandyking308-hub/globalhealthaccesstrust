import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://globalhealthaccesstrust.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().split("T")[0];

// Include only canonical, public and indexable routes. Redirects, portals,
// intake forms, admin routes and unpublished Blog content are deliberately excluded.
const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/about-the-trust", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/trustee-biographies", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/governance-legal-framework", changefreq: "yearly", priority: "0.8", lastmod: today },
  { path: "/governance", changefreq: "yearly", priority: "0.7", lastmod: today },
  { path: "/our-work", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/how-we-work", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/support-the-trust", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/donate", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/commission-projects", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/get-involved", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/volunteer-apply", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/donor-guide", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/donor-recognition", changefreq: "monthly", priority: "0.6", lastmod: today },
  { path: "/frequently-asked-questions", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/contact-the-trust", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/contact", changefreq: "monthly", priority: "0.6", lastmod: today },
  { path: "/publications", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/constitution", changefreq: "yearly", priority: "0.7", lastmod: today },
  { path: "/legal", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/legal/privacy-notice", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/legal/terms-of-use", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/legal/complaints-policy", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/legal/safeguarding-policy", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/legal/media-policy", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/accessibility-statement", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/safeguarding", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/conflict-of-interest", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/financial-controls", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/risk-management", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/anti-fraud", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/whistleblowing", changefreq: "yearly", priority: "0.5", lastmod: today },
  { path: "/donor-project-funding-terms", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/gift-acceptance-and-restricted-funds-policy", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/donor-due-diligence-and-sanctions-policy", changefreq: "yearly", priority: "0.6", lastmod: today },
  { path: "/project-team-terms", changefreq: "yearly", priority: "0.6", lastmod: today },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((entry) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${entry.path}</loc>`,
      entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : null,
      entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
      entry.priority ? `    <priority>${entry.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written with ${entries.length} canonical public entries`);
