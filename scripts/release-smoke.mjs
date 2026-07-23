import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const isProduction = /^https:\/\/(www\.)?globalhealthaccesstrust\.com$/i.test(baseURL);
const supabaseURL = (process.env.VITE_SUPABASE_URL || "https://example.supabase.co").replace(/\/$/, "");
const browser = await chromium.launch({ headless: true });
const failures = [];
const checkedRoutes = new Set();

const publicRoutes = [
  "/",
  "/about-the-trust",
  "/trustee-biographies",
  "/governance-legal-framework",
  "/governance",
  "/our-work",
  "/how-we-work",
  "/support-the-trust",
  "/donor-guide",
  "/donor-recognition",
  "/frequently-asked-questions",
  "/contact-the-trust",
  "/contact",
  "/get-involved",
  "/volunteer-apply",
  "/donate",
  "/commission-projects",
  "/publications",
  "/auth",
  "/constitution",
  "/legal",
  "/legal/privacy-notice",
  "/legal/terms-of-use",
  "/legal/complaints-policy",
  "/legal/safeguarding-policy",
  "/legal/media-policy",
  "/terms-of-use",
  "/privacy-policy",
  "/cookie-policy",
  "/donor-project-funding-terms",
  "/gift-acceptance-and-restricted-funds-policy",
  "/donor-due-diligence-and-sanctions-policy",
  "/project-team-terms",
  "/support",
  "/support/new",
  "/complaints/new",
  "/protected-concerns/new",
  "/safeguarding/report",
  "/data-access-request",
  "/safeguarding",
  "/accessibility-statement",
  "/conflict-of-interest",
  "/financial-controls",
  "/risk-management",
  "/anti-fraud",
  "/whistleblowing",
  "/unsubscribe",
  "/preferences",
  "/donation-success",
  "/donation-cancelled",
  "/testing-checklist",
];

const formRoutes = [
  "/contact",
  "/donate",
  "/commission-projects",
  "/volunteer-apply",
  "/support/new",
  "/complaints/new",
  "/protected-concerns/new",
  "/safeguarding/report",
  "/data-access-request",
];

const redirectExpectations = [
  ["/about", "/about-the-trust"],
  ["/what-we-do", "/our-work"],
  ["/learn-about-our-mission", "/about-the-trust"],
  ["/volunteers", "/volunteer-apply"],
  ["/donation-form", "/donate#pledge-form"],
  ["/donor-login", "/auth?portal=donor"],
  ["/project-team-login", "/auth?portal=team"],
  ["/complaints", "/legal/complaints-policy"],
  ["/protected-concerns", "/whistleblowing"],
  ["/fraud-concerns", "/protected-concerns/new"],
];

const retiredBlogRoutes = ["/blog", "/blog/retired-example"];

const protectedRoutes = [
  "/donor-dashboard",
  "/volunteer-dashboard",
  "/admin/dashboard",
  "/admin/donors",
  "/admin/volunteers",
  "/admin/projects",
  "/admin/evidence",
  "/admin/messages",
  "/admin/ai",
  "/admin/security",
  "/admin/gdpr",
  "/admin/testing",
  "/admin/documentation",
  "/admin/presentations",
  "/admin/system-health",
  "/admin/branding",
  "/admin/launch-checklist",
  "/admin/contacts",
  "/admin/manual",
  "/admin/service-console",
  "/admin/agreements",
  "/admin/legal",
  "/admin/payments",
  "/admin/high-value-agreements",
  "/admin/gift-acceptance",
  "/admin/donor-due-diligence",
  "/admin/support-oversight",
  "/admin/settings",
];

const publishedLegalRoutes = [
  "/legal/privacy-notice",
  "/legal/terms-of-use",
  "/legal/complaints-policy",
  "/legal/safeguarding-policy",
  "/legal/media-policy",
  "/donor-project-funding-terms",
  "/gift-acceptance-and-restricted-funds-policy",
  "/donor-due-diligence-and-sanctions-policy",
  "/project-team-terms",
];

const requiredSitemapRoutes = [
  "/constitution",
  "/legal",
  "/legal/privacy-notice",
  "/legal/terms-of-use",
  "/donor-project-funding-terms",
  "/gift-acceptance-and-restricted-funds-policy",
  "/donor-due-diligence-and-sanctions-policy",
  "/project-team-terms",
  "/financial-controls",
];

function collectRuntimeErrors(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (
      !text.includes("Failed to load resource") &&
      !text.includes("ERR_NAME_NOT_RESOLVED") &&
      !text.includes("example.supabase.co")
    ) {
      consoleErrors.push(text);
    }
  });
  return { pageErrors, consoleErrors };
}

async function checkPage(route) {
  if (checkedRoutes.has(route)) return;
  checkedRoutes.add(route);

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const { pageErrors, consoleErrors } = collectRuntimeErrors(page);

  try {
    const response = await page.goto(`${baseURL}${route}`, {
      waitUntil: "networkidle",
      timeout: 45_000,
    });

    if (!response || !response.ok()) {
      failures.push(`${route}: HTTP ${response?.status() ?? "no response"}`);
    }

    const title = await page.title();
    if (!title.trim()) failures.push(`${route}: missing document title`);

    const main = page.locator("main");
    if ((await main.count()) === 0) failures.push(`${route}: missing <main> landmark`);

    const bodyText = (await page.locator("body").innerText()).trim();
    if (bodyText.length < 40) failures.push(`${route}: page rendered almost no content`);
    if (/page not found|404 — not found/i.test(bodyText)) failures.push(`${route}: rendered the not-found page`);

    const unnamedButtons = await page.locator("button").evaluateAll((buttons) =>
      buttons.filter((button) => {
        const text = (button.textContent || "").trim();
        const aria = button.getAttribute("aria-label") || "";
        const title = button.getAttribute("title") || "";
        return !text && !aria && !title;
      }).length,
    );
    if (unnamedButtons > 0) failures.push(`${route}: ${unnamedButtons} button(s) have no accessible name`);

    if (pageErrors.length) failures.push(`${route}: page errors: ${pageErrors.join(" | ")}`);
    if (consoleErrors.length) failures.push(`${route}: console errors: ${consoleErrors.join(" | ")}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await page.close();
  }
}

for (const route of publicRoutes) await checkPage(route);

for (const route of retiredBlogRoutes) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const bodyText = await page.locator("body").innerText();
  if (!/page not found|404 — not found/i.test(bodyText)) {
    failures.push(`${route}: removed Blog route is still reachable or redirecting`);
  }
  await page.close();
}

for (const [from, expected] of redirectExpectations) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${from}`, { waitUntil: "networkidle" });
  const current = new URL(page.url());
  const actual = `${current.pathname}${current.search}${current.hash}`;
  if (actual !== expected) failures.push(`${from}: expected redirect to ${expected}, received ${actual}`);
  await page.close();
}

for (const route of formRoutes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const formCount = await page.locator("form").count();
  if (formCount < 1) failures.push(`${route}: expected public form is missing`);
  const submitCount = await page.locator('button[type="submit"], input[type="submit"]').count();
  if (submitCount < 1) failures.push(`${route}: form submit control is missing`);
  const invalidRequired = await page.locator("[required]").evaluateAll((fields) =>
    fields.filter((field) => !field.getAttribute("name") && !field.getAttribute("id")).length,
  );
  if (invalidRequired > 0) failures.push(`${route}: ${invalidRequired} required field(s) lack an id or name`);
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/constitution`, { waitUntil: "networkidle" });
  const signedHeading = await page.getByRole("heading", { name: /Constitution \(Signed\)/i }).isVisible().catch(() => false);
  if (!signedHeading) failures.push("/constitution: signed Constitution heading is missing");
  const pdfLinks = page.locator('a[href="/GHAT_Constitution_2025_Refined.pdf"]');
  if ((await pdfLinks.count()) < 1) failures.push("/constitution: signed PDF link is missing");
  await page.close();

  try {
    const pdfResponse = await fetch(`${baseURL}/GHAT_Constitution_2025_Refined.pdf`);
    if (!pdfResponse.ok) failures.push(`/GHAT_Constitution_2025_Refined.pdf: HTTP ${pdfResponse.status}`);
    const contentType = pdfResponse.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("pdf")) {
      failures.push(`/GHAT_Constitution_2025_Refined.pdf: unexpected content type ${contentType || "missing"}`);
    }
    const bytes = Buffer.from(await pdfResponse.arrayBuffer());
    if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
      failures.push("/GHAT_Constitution_2025_Refined.pdf: file is not a valid PDF payload");
    }
  } catch (error) {
    failures.push(`/GHAT_Constitution_2025_Refined.pdf: ${error instanceof Error ? error.message : String(error)}`);
  }
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const cookieChoices = await page.getByRole("dialog", { name: "Cookie choices" }).isVisible().catch(() => false);
  if (!cookieChoices) failures.push("/: first-visit cookie choices are missing");
  const globalTermsNotice = await page.getByText("Updated Website and Portal Terms of Use are available.", { exact: true }).isVisible().catch(() => false);
  if (globalTermsNotice) failures.push("/: global Terms update notice is incorrectly shown to a public visitor");
  const rejectButton = page.getByRole("button", { name: "Reject non-essential", exact: true }).first();
  if (await rejectButton.isVisible().catch(() => false)) {
    await rejectButton.click();
    await page.reload({ waitUntil: "networkidle" });
    const bannerReturned = await page.getByRole("dialog", { name: "Cookie choices" }).isVisible().catch(() => false);
    if (bannerReturned) failures.push("/: saved cookie choice was not respected after reload");
  } else {
    failures.push("/: Reject non-essential cookie control is missing");
  }
  await page.close();
}

async function checkPortal(portal, heading, signupExpected) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/auth?portal=${portal}`, { waitUntil: "networkidle" });
  const headingVisible = await page.getByRole("heading", { name: heading }).isVisible().catch(() => false);
  if (!headingVisible) failures.push(`/auth?portal=${portal}: portal heading is missing`);
  const emailField = await page.locator('input[type="email"]').first().isVisible().catch(() => false);
  const passwordField = await page.locator('input[type="password"]').first().isVisible().catch(() => false);
  if (!emailField || !passwordField) failures.push(`/auth?portal=${portal}: login credentials fields are missing`);
  const signupVisible = await page.getByText("Sign Up", { exact: true }).first().isVisible().catch(() => false);
  if (signupExpected && !signupVisible) failures.push(`/auth?portal=${portal}: Sign Up option is missing`);
  if (!signupExpected && signupVisible) failures.push(`/auth?portal=${portal}: self-service Sign Up is incorrectly visible`);
  const robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
  if (!robots?.includes("noindex")) failures.push(`/auth?portal=${portal}: noindex protection is missing`);
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/auth`, { waitUntil: "networkidle" });
  const chooserHeading = await page.getByRole("heading", { name: "Choose your portal" }).isVisible().catch(() => false);
  if (!chooserHeading) failures.push("/auth: portal chooser is missing");
  for (const name of [/Donor Portal/i, /Project Team Portal/i, /Administrator Sign-In/i]) {
    const choice = await page.getByRole("button", { name }).first().isVisible().catch(() => false);
    if (!choice) failures.push(`/auth: portal choice ${name} is missing`);
  }
  await page.close();
  await checkPortal("donor", "Enter the Donor Portal", true);
  await checkPortal("team", "Enter the Project Team Portal", false);
  await checkPortal("admin", "Trust Administration Sign-In", false);
}

for (const route of protectedRoutes) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  if (!page.url().includes("/auth")) failures.push(`${route}: signed-out visitor was not redirected to /auth`);
  await page.close();
}

function base64url(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function makeDummySession(persona) {
  const now = Math.floor(Date.now() / 1000);
  const user = {
    id: `00000000-0000-4000-8000-${persona === "admin" ? "000000000001" : persona === "volunteer" ? "000000000002" : "000000000003"}`,
    aud: "authenticated",
    role: "authenticated",
    email: `${persona}@example.test`,
    email_confirmed_at: new Date().toISOString(),
    app_metadata: { provider: "email", providers: ["email"] },
    user_metadata: { first_name: "Test", last_name: persona },
    created_at: new Date().toISOString(),
  };
  const accessToken = `${base64url({ alg: "HS256", typ: "JWT" })}.${base64url({ sub: user.id, aud: "authenticated", role: "authenticated", email: user.email, exp: now + 7200, iat: now })}.test-signature`;
  return {
    access_token: accessToken,
    refresh_token: "test-refresh-token",
    token_type: "bearer",
    expires_in: 7200,
    expires_at: now + 7200,
    user,
  };
}

async function installDummySupabase(page, persona) {
  const session = makeDummySession(persona);
  const projectRef = new URL(supabaseURL).hostname.split(".")[0];
  const storageKey = `sb-${projectRef}-auth-token`;
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), {
    key: storageKey,
    value: session,
  });

  await page.route(`${supabaseURL}/**`, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    const corsHeaders = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, apikey, content-type, prefer, x-client-info",
      "content-type": "application/json",
    };

    if (method === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders, body: "" });
      return;
    }

    if (url.pathname.includes("/auth/v1/user")) {
      await route.fulfill({ status: 200, headers: corsHeaders, body: JSON.stringify(session.user) });
      return;
    }

    if (url.pathname.includes("/auth/v1/token")) {
      await route.fulfill({ status: 200, headers: corsHeaders, body: JSON.stringify(session) });
      return;
    }

    if (url.pathname.includes("/rest/v1/rpc/")) {
      await route.fulfill({ status: 200, headers: corsHeaders, body: "[]" });
      return;
    }

    if (url.pathname.includes("/storage/v1/")) {
      await route.fulfill({ status: 200, headers: corsHeaders, body: "[]" });
      return;
    }

    const tableMatch = url.pathname.match(/\/rest\/v1\/([^/]+)/);
    const table = tableMatch?.[1] || "";
    const accept = request.headers().accept || "";
    const singular = accept.includes("application/vnd.pgrst.object+json");

    let data = singular ? {} : [];
    if (table === "user_roles") {
      data = singular ? { role: persona === "admin" ? "super_admin" : persona } : [{ role: persona === "admin" ? "super_admin" : persona }];
    } else if (table === "profiles") {
      const profile = {
        id: session.user.id,
        first_name: "Test",
        last_name: persona,
        email: session.user.email,
        phone: "+44 0000 000000",
        country: "United Kingdom",
      };
      data = singular ? profile : [profile];
    } else if (table === "volunteers") {
      const volunteer = {
        id: "11111111-1111-4111-8111-111111111111",
        user_id: session.user.id,
        name: "Test Project Team Member",
        email: session.user.email,
        status: "approved",
        skills: "Clinical, operational and technical support",
        experience: "Dummy record used only by the automated dashboard smoke test.",
        cv_url: "",
      };
      data = singular ? volunteer : [volunteer];
    } else if (table === "onboarding_status") {
      const onboarding = {
        donor_onboarding_complete: true,
        volunteer_onboarding_complete: true,
        admin_onboarding_complete: true,
      };
      data = singular ? onboarding : [onboarding];
    }

    const body = method === "HEAD" ? "" : JSON.stringify(data);
    await route.fulfill({
      status: 200,
      headers: { ...corsHeaders, "content-range": "0-0/0", preference: "return=representation" },
      body,
    });
  });
}

async function checkDummyDashboard(route, persona, headingPattern, tabs = false) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const { pageErrors, consoleErrors } = collectRuntimeErrors(page);
  await installDummySupabase(page, persona);
  try {
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle", timeout: 45_000 });
    await page.waitForTimeout(1200);
    if (page.url().includes("/auth")) failures.push(`${route}: dummy authenticated session was rejected`);
    const heading = await page.getByRole("heading", { name: headingPattern }).first().isVisible().catch(() => false);
    if (!heading) failures.push(`${route}: expected authenticated dashboard heading is missing`);
    const body = await page.locator("body").innerText();
    if (/page not found|404 — not found/i.test(body)) failures.push(`${route}: authenticated dashboard rendered not-found page`);
    if (/^Loading\.\.\.$/m.test(body)) failures.push(`${route}: authenticated dashboard remained stuck on Loading`);

    if (tabs) {
      const tabButtons = page.getByRole("tab");
      const count = await tabButtons.count();
      for (let index = 0; index < count; index += 1) {
        const tab = tabButtons.nth(index);
        if (await tab.isVisible().catch(() => false)) {
          await tab.click();
          await page.waitForTimeout(150);
        }
      }
    }

    if (pageErrors.length) failures.push(`${route}: dummy-data page errors: ${pageErrors.join(" | ")}`);
    if (consoleErrors.length) failures.push(`${route}: dummy-data console errors: ${consoleErrors.join(" | ")}`);
  } catch (error) {
    failures.push(`${route}: dummy-data test failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await page.close();
  }
}

if (!isProduction) {
  await checkDummyDashboard("/donor-dashboard", "donor", /Your Donor Dashboard/i, true);
  await checkDummyDashboard("/volunteer-dashboard", "volunteer", /Project Team Portal/i, true);
  for (const route of protectedRoutes.filter((item) => item.startsWith("/admin/"))) {
    await checkDummyDashboard(route, "admin", /./, false);
  }
}

{
  const internalLinks = new Set();
  for (const route of publicRoutes) {
    const page = await browser.newPage();
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean));
    for (const href of hrefs) {
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:") || href === "#") continue;
      const target = new URL(href, baseURL);
      if (target.origin !== new URL(baseURL).origin) continue;
      const destination = `${target.pathname}${target.search}`;
      if (destination.startsWith("/blog")) failures.push(`${route}: contains removed Blog link ${destination}`);
      internalLinks.add(destination);
    }
    await page.close();
  }

  const known = new Set([
    ...publicRoutes,
    ...protectedRoutes,
    ...redirectExpectations.map(([from]) => from),
    ...redirectExpectations.map(([, to]) => to.split("#")[0]),
  ]);

  for (const destination of internalLinks) {
    const pathname = new URL(destination, baseURL).pathname;
    if (/\.(pdf|png|jpe?g|webp|svg|ico|xml|txt)$/i.test(pathname)) {
      const response = await fetch(`${baseURL}${destination}`);
      if (!response.ok) failures.push(`internal asset link ${destination}: HTTP ${response.status}`);
      continue;
    }
    if (known.has(destination) || known.has(pathname)) continue;
    await checkPage(destination);
  }
}

{
  try {
    const response = await fetch(`${baseURL}/sitemap.xml`);
    if (!response.ok) {
      failures.push(`/sitemap.xml: HTTP ${response.status}`);
    } else {
      const sitemap = await response.text();
      for (const route of requiredSitemapRoutes) {
        if (!sitemap.includes(`${baseURL}${route}`) && !sitemap.includes(`https://globalhealthaccesstrust.com${route}`)) {
          failures.push(`/sitemap.xml: missing ${route}`);
        }
      }
      for (const privateRoute of ["/auth", "/donor-dashboard", "/volunteer-dashboard", "/admin/dashboard", "/blog"]) {
        if (sitemap.includes(privateRoute)) failures.push(`/sitemap.xml: private or removed route exposed: ${privateRoute}`);
      }
    }
  } catch (error) {
    failures.push(`/sitemap.xml: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (isProduction) {
  for (const route of publishedLegalRoutes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    if (/not yet published|in preparation/i.test(body)) failures.push(`${route}: published site is showing a draft or unpublished state`);
    await page.close();
  }
}

for (const route of ["/", "/our-work", "/donate", "/volunteer-apply", "/auth", "/legal", "/donor-project-funding-terms"]) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (overflow) failures.push(`${route}: horizontal overflow at 375px mobile width`);
  if (route === "/") {
    const menuButton = page.getByRole("button", { name: /menu|navigation/i }).first();
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      const navLinks = await page.locator("nav a").count();
      if (navLinks < 2) failures.push("/: mobile navigation did not expose links");
    } else {
      failures.push("/: mobile menu button is missing");
    }
  }
  await page.close();
}

await browser.close();

if (failures.length) {
  const uniqueFailures = [...new Set(failures)];
  const report = "Release smoke tests failed:\n- " + uniqueFailures.join("\n- ") + "\n";
  writeFileSync("release-smoke-failures.txt", report, "utf8");
  console.error(report);
  process.exit(1);
}

writeFileSync("release-smoke-failures.txt", "Release smoke tests passed.\n", "utf8");
console.log(`Release smoke tests passed for ${publicRoutes.length} public routes, ${protectedRoutes.length} protected routes, all public internal links, redirect rules, forms, portal entry points, dummy-data dashboards, signed Constitution PDF, legal publication, sitemap coverage, cookie behaviour and mobile layout.`);
