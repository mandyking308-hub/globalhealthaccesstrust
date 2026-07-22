import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";
const isProduction = /^https:\/\/(www\.)?globalhealthaccesstrust\.com\/?$/i.test(baseURL);
const browser = await chromium.launch({ headless: true });
const failures = [];

const publicRoutes = [
  "/",
  "/about-the-trust",
  "/trustee-biographies",
  "/governance-legal-framework",
  "/governance",
  "/our-work",
  "/how-we-work",
  "/what-we-do",
  "/support-the-trust",
  "/donor-guide",
  "/donor-recognition",
  "/frequently-asked-questions",
  "/contact-the-trust",
  "/contact",
  "/about",
  "/blog",
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

const protectedRoutes = [
  "/donor-dashboard",
  "/donation-form",
  "/volunteer-dashboard",
  "/admin/dashboard",
  "/admin/donors",
  "/admin/projects",
  "/admin/legal",
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

async function checkPage(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const pageErrors = [];
  const consoleErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      if (!text.includes("Failed to load resource") && !text.includes("ERR_NAME_NOT_RESOLVED")) {
        consoleErrors.push(text);
      }
    }
  });

  try {
    const response = await page.goto(`${baseURL}${route}`, {
      waitUntil: "networkidle",
      timeout: 30_000,
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

    if (pageErrors.length) failures.push(`${route}: page errors: ${pageErrors.join(" | ")}`);
    if (consoleErrors.length) failures.push(`${route}: console errors: ${consoleErrors.join(" | ")}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await page.close();
  }
}

for (const route of publicRoutes) await checkPage(route);

// Signed governing document: public page and the retained PDF must both be available.
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

// First public visit: cookie choice is expected; a global Terms pop-up is not.
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

// Authentication chooser and all three portal surfaces.
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

// Protected routes must not expose private dashboards to a signed-out visitor.
for (const route of protectedRoutes) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  if (!page.url().includes("/auth")) failures.push(`${route}: signed-out visitor was not redirected to /auth`);
  await page.close();
}

// Sitemap must include the core governance documents and must exclude private areas.
{
  try {
    const response = await fetch(`${baseURL}/sitemap.xml`);
    if (!response.ok) {
      failures.push(`/sitemap.xml: HTTP ${response.status}`);
    } else {
      const sitemap = await response.text();
      for (const route of requiredSitemapRoutes) {
        if (!sitemap.includes(`${baseURL.replace(/\/$/, "")}${route}`) && !sitemap.includes(`https://globalhealthaccesstrust.com${route}`)) {
          failures.push(`/sitemap.xml: missing ${route}`);
        }
      }
      for (const privateRoute of ["/auth", "/donor-dashboard", "/volunteer-dashboard", "/admin/dashboard"]) {
        if (sitemap.includes(privateRoute)) failures.push(`/sitemap.xml: private route exposed: ${privateRoute}`);
      }
    }
  } catch (error) {
    failures.push(`/sitemap.xml: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// The published site must never show legal documents as drafts.
if (isProduction) {
  for (const route of publishedLegalRoutes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    const body = await page.locator("body").innerText();
    if (/not yet published|in preparation/i.test(body)) failures.push(`${route}: published site is showing a draft or unpublished state`);
    await page.close();
  }
}

// Mobile navigation and horizontal layout safety.
for (const route of ["/", "/auth", "/legal", "/donor-project-funding-terms"]) {
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
  const report = "Release smoke tests failed:\n- " + failures.join("\n- ") + "\n";
  writeFileSync("release-smoke-failures.txt", report, "utf8");
  console.error(report);
  process.exit(1);
}

writeFileSync("release-smoke-failures.txt", "Release smoke tests passed.\n", "utf8");
console.log(`Release smoke tests passed for ${publicRoutes.length} public routes, all portal entry points, protected dashboard redirects, signed Constitution PDF, legal publication, sitemap coverage, cookie behaviour and mobile layout.`);
