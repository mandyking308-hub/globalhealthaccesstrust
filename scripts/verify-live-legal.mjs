const requiredSlugs = [
  "terms-of-use",
  "privacy-notice",
  "complaints-policy",
  "safeguarding-policy",
  "media-policy",
  "donor-project-funding-terms",
  "gift-acceptance-and-restricted-funds-policy",
  "donor-due-diligence-and-sanctions-policy",
  "project-team-terms",
];

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !anonKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
  "Content-Type": "application/json",
};

const failures = [];

async function fetchPublishedDocumentDirectly(slug) {
  const documentResponse = await fetch(
    `${supabaseUrl}/rest/v1/legal_documents?slug=eq.${encodeURIComponent(slug)}&select=id,title,category,current_published_version_id&limit=1`,
    { headers },
  );

  if (!documentResponse.ok) {
    throw new Error(`direct document lookup returned HTTP ${documentResponse.status} ${await documentResponse.text()}`);
  }

  const documents = await documentResponse.json();
  const document = Array.isArray(documents) ? documents[0] : null;
  if (!document?.current_published_version_id) return null;

  const versionResponse = await fetch(
    `${supabaseUrl}/rest/v1/legal_document_versions?id=eq.${encodeURIComponent(document.current_published_version_id)}&select=version_number,body_markdown,summary,effective_date,published_at&limit=1`,
    { headers },
  );

  if (!versionResponse.ok) {
    throw new Error(`direct version lookup returned HTTP ${versionResponse.status} ${await versionResponse.text()}`);
  }

  const versions = await versionResponse.json();
  const version = Array.isArray(versions) ? versions[0] : null;
  return version ? { ...document, ...version } : null;
}

for (const slug of requiredSlugs) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/current_legal_version`, {
      method: "POST",
      headers,
      body: JSON.stringify({ _slug: slug }),
    });

    let row = null;
    let accessPath = "RPC";

    if (response.ok) {
      const payload = await response.json();
      row = Array.isArray(payload) ? payload[0] : payload;
    } else {
      accessPath = "public table fallback";
      row = await fetchPublishedDocumentDirectly(slug);
    }

    if (!row) {
      failures.push(`${slug}: no published version returned by ${accessPath}`);
      continue;
    }

    if (!String(row.title || "").trim()) failures.push(`${slug}: missing title`);
    if (!String(row.version_number || "").trim()) failures.push(`${slug}: missing version number`);
    if (String(row.body_markdown || "").trim().length < 100) failures.push(`${slug}: published body is missing or too short`);

    if (!failures.some((failure) => failure.startsWith(`${slug}:`))) {
      console.log(`Published legal document verified via ${accessPath}: ${slug}`);
    }
  } catch (error) {
    failures.push(`${slug}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("Live legal publication checks failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Live legal publication checks passed for ${requiredSlugs.length} required documents.`);
