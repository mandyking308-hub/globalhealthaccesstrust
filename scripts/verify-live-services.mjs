import { writeFileSync } from "node:fs";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const reportPath = "live-service-failures.txt";

if (!supabaseUrl || !anonKey) {
  const report = "Live service checks failed:\n- Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY\n";
  writeFileSync(reportPath, report, "utf8");
  console.error(report);
  process.exit(1);
}

const failures = [];
const origin = "https://globalhealthaccesstrust.com";

async function checkFunction(name, acceptedStatuses) {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/${name}`, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "authorization,apikey,content-type,x-client-info",
      },
    });

    if (!acceptedStatuses.includes(response.status)) {
      failures.push(`${name}: preflight returned HTTP ${response.status}`);
      return;
    }

    const allowOrigin = response.headers.get("access-control-allow-origin");
    if (name === "contact-notification" && allowOrigin !== origin) {
      failures.push(`${name}: expected restricted CORS origin ${origin}, received ${allowOrigin || "none"}`);
      return;
    }

    console.log(`Live Edge Function verified: ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkRpc(name, body, validate) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      failures.push(`${name}: HTTP ${response.status} ${await response.text()}`);
      return;
    }

    const payload = await response.json();
    if (!validate(payload)) {
      failures.push(`${name}: unexpected response ${JSON.stringify(payload)}`);
      return;
    }

    console.log(`Live RPC verified: ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

await checkFunction("contact-notification", [200, 204]);
await checkFunction("gocardless-create-flow", [200, 204]);
await checkRpc("gocardless_enabled", {}, (payload) => typeof payload === "boolean");

if (failures.length) {
  const report = "Live service checks failed:\n- " + failures.join("\n- ") + "\n";
  writeFileSync(reportPath, report, "utf8");
  console.error(report);
  process.exit(1);
}

writeFileSync(reportPath, "Live service checks passed.\n", "utf8");
console.log("Live service checks passed.");
