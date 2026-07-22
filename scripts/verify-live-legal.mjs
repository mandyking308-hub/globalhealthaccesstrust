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

const failures = [];

for (const slug of requiredSlugs) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/current_legal_version`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _slug: slug }),
    });

    if (!response.ok) {
      failures.push(`${slug}: HTTP ${response.status} ${await response.text()}`);
      continue;
    }

    const payload = await response.json();
    const row = Array.isArray(payload) ? payload[0] : payload;
    if (!row) {
      failures.push(`${slug}: no published version returned`);
      continue;
    }

    if (!String(row.title || "").trim()) failures.push(`${slug}: missing title`);
    if (!String(row.version_number || "").trim()) failures.push(`${slug}: missing version number`);
    if (String(row.body_markdown || "").trim().length < 100) failures.push(`${slug}: published body is missing or too short`);

    if (!failures.some((failure) => failure.startsWith(`${slug}:`))) {
      console.log(`Published legal document verified: ${slug}`);
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
