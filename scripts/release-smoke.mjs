import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const failures = [];

const publicRoutes = [
  "/",
  "/about-the-trust",
  "/our-work",
  "/how-we-work",
  "/support-the-trust",
  "/commission-projects",
  "/donor-guide",
  "/auth",
  "/constitution",
  "/publications",
  "/legal",
  "/terms-of-use",
  "/privacy-policy",
  "/cookie-policy",
  "/donor-project-funding-terms",
  "/gift-acceptance-and-restricted-funds-policy",
  "/donor-due-diligence-and-sanctions-policy",
  "/project-team-terms",
  "/legal/complaints-policy",
  "/legal/safeguarding-policy",
  "/legal/media-policy",
  "/safeguarding",
  "/accessibility-statement",
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

// Authentication: the chooser must be present, then the donor portal must expose login and signup.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/auth`, { waitUntil: "networkidle" });

  const chooserHeading = await page.getByRole("heading", { name: "Choose your portal" }).isVisible().catch(() => false);
  if (!chooserHeading) failures.push("/auth: portal chooser is missing");

  const donorPortalButton = page.getByRole("button", { name: /Donor Portal/i }).first();
  if (await donorPortalButton.isVisible().catch(() => false)) {
    await donorPortalButton.click();
    await page.waitForURL(/\/auth\?portal=donor/, { timeout: 5_000 }).catch(() => undefined);

    const loginVisible = await page.getByText("Login", { exact: true }).first().isVisible().catch(() => false);
    const signUpVisible = await page.getByText("Sign Up", { exact: true }).first().isVisible().catch(() => false);
    const emailField = await page.locator('input[type="email"]').first().isVisible().catch(() => false);
    const passwordField = await page.locator('input[type="password"]').first().isVisible().catch(() => false);
    if (!loginVisible) failures.push("/auth?portal=donor: Login option is not visible");
    if (!signUpVisible) failures.push("/auth?portal=donor: Sign Up option is not visible");
    if (!emailField || !passwordField) failures.push("/auth?portal=donor: login credentials fields are missing");
  } else {
    failures.push("/auth: Donor Portal choice is missing");
  }
  await page.close();
}

// Protected donor routes must not expose private pages to a signed-out visitor.
for (const route of ["/donor-dashboard", "/donation-form"]) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  if (!page.url().includes("/auth")) failures.push(`${route}: signed-out visitor was not redirected to /auth`);
  await page.close();
}

// Mobile navigation and horizontal layout safety.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (overflow) failures.push("/: horizontal overflow at 375px mobile width");

  const menuButton = page.getByRole("button", { name: /menu|navigation/i }).first();
  if (await menuButton.isVisible().catch(() => false)) {
    await menuButton.click();
    const navLinks = await page.locator("nav a").count();
    if (navLinks < 2) failures.push("/: mobile navigation did not expose links");
  } else {
    failures.push("/: mobile menu button is missing");
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
console.log(`Release smoke tests passed for ${publicRoutes.length} public routes, signed Constitution PDF, legal pages, cookie behaviour, protected donor redirects, authentication controls and mobile layout.`);
