import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const failures = [];

const publicRoutes = [
  "/",
  "/about-the-trust",
  "/trustee-biographies",
  "/governance-legal-framework",
  "/constitution",
  "/financial-controls",
  "/risk-management",
  "/anti-fraud",
  "/whistleblowing",
  "/safeguarding",
  "/support",
  "/complaints",
  "/legal/complaints-policy",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-use",
  "/support-the-trust",
  "/donate",
  "/frequently-asked-questions",
  "/contact-the-trust",
  "/contact",
  "/publications",
  "/legal",
  "/our-work",
  "/what-we-do",
  "/how-we-work",
  "/donor-project-funding-terms",
  "/gift-acceptance-and-restricted-funds-policy",
  "/donor-due-diligence-and-sanctions-policy",
  "/project-team-terms",
  "/legal/safeguarding-policy",
  "/legal/media-policy",
  "/accessibility-statement",
  "/auth",
];

const publicEmailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const sortCodePattern = /\b\d{2}-\d{2}-\d{2}\b/g;
const ibanPattern = /\bGB\d{2}[A-Z0-9]{10,30}\b/gi;

async function checkPage(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const pageErrors = [];
  const consoleErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      if (
        !text.includes("Failed to load resource") &&
        !text.includes("ERR_NAME_NOT_RESOLVED") &&
        !text.includes("example.supabase.co")
      ) {
        consoleErrors.push(text);
      }
    }
  });

  try {
    const response = await page.goto(`${baseURL}${route}`, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    if (!response || !response.ok()) failures.push(`${route}: HTTP ${response?.status() ?? "no response"}`);

    const title = await page.title();
    if (!title.trim()) failures.push(`${route}: missing document title`);

    const main = page.locator("main");
    if ((await main.count()) === 0) failures.push(`${route}: missing <main> landmark`);

    const bodyText = (await page.locator("body").innerText()).trim();
    if (bodyText.length < 40) failures.push(`${route}: page rendered almost no content`);

    const publicEmails = [...new Set(bodyText.match(publicEmailPattern) || [])];
    if (publicEmails.length) failures.push(`${route}: public email address displayed: ${publicEmails.join(", ")}`);

    if ((await page.locator('a[href^="mailto:"]').count()) > 0) failures.push(`${route}: public mailto link is present`);

    const oldDomainInText = /globalhealthaccesstrust\.org/i.test(bodyText);
    const oldDomainLinks = await page.locator('a[href*="globalhealthaccesstrust.org"]').count();
    if (oldDomainInText || oldDomainLinks > 0) failures.push(`${route}: obsolete .org identity is exposed`);

    const sortCodes = bodyText.match(sortCodePattern) || [];
    const ibans = bodyText.match(ibanPattern) || [];
    if (sortCodes.length || ibans.length) failures.push(`${route}: public bank identifiers may be displayed`);

    if (/AFEX/i.test(bodyText)) failures.push(`${route}: Nigeria organisation is named without confirmed permission`);
    if (/registered correspondence address/i.test(bodyText)) failures.push(`${route}: correspondence address is incorrectly labelled as registered`);

    if (pageErrors.length) failures.push(`${route}: page errors: ${pageErrors.join(" | ")}`);
    if (consoleErrors.length) failures.push(`${route}: console errors: ${consoleErrors.join(" | ")}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await page.close();
  }
}

for (const route of publicRoutes) await checkPage(route);

// Core bank-facing facts must be present without overstating legal history or impact.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  for (const required of ["2019", "1 December 2024", "12", "40+", "thousands"]) {
    if (!text.includes(required)) failures.push(`/: required history or network fact is missing: ${required}`);
  }
  if (!/formally established under its Trust Deed/i.test(text)) failures.push("/: formal Trust Deed establishment wording is missing");
  await page.close();
}

// Trustees and full adviser panel must remain visible, with adviser authority limits.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${baseURL}/trustee-biographies`, { waitUntil: "networkidle" });
  const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  for (const name of ["Mandy King", "Dr Jagdev Thukral", "John O'Sullivan BA FCA", "Rachael Duff", "Dr Joy Wong", "Richard Banyard"]) {
    if (!text.includes(name)) failures.push(`/trustee-biographies: missing ${name}`);
  }
  if (!/are not Trustees/i.test(text) || !/do not control Trust funds/i.test(text) || !/cannot bind/i.test(text)) {
    failures.push("/trustee-biographies: adviser authority limitations are incomplete");
  }
  await page.close();
}

// Financial-controls page must state the application position, not an existing account or completed audit.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${baseURL}/financial-controls`, { waitUntil: "networkidle" });
  const text = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  if (!/applying for a UK bank account/i.test(text)) failures.push("/financial-controls: bank-account application wording is missing");
  if (/The Trust holds accounts in its name/i.test(text)) failures.push("/financial-controls: false existing-bank-account claim remains");
  if (!/does not currently operate a Gift Aid scheme/i.test(text)) failures.push("/financial-controls: current Gift Aid position is missing");
  await page.close();
}

// Signed governing document: public page and retained PDF must both be available.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/constitution`, { waitUntil: "networkidle" });
  const signedHeading = await page.getByRole("heading", { name: /Constitution \(Signed\)/i }).isVisible().catch(() => false);
  if (!signedHeading) failures.push("/constitution: signed Constitution heading is missing");
  const bodyText = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  if (!bodyText.includes("1 December 2024")) failures.push("/constitution: effective date is missing");
  if (!bodyText.includes("GHAT-CONSTITUTION-1.0")) failures.push("/constitution: document reference is missing");
  const pdfLinks = page.locator('a[href="/GHAT_Constitution_2025_Refined.pdf"]');
  if ((await pdfLinks.count()) < 1) failures.push("/constitution: signed PDF link is missing");
  await page.close();

  try {
    const pdfResponse = await fetch(`${baseURL}/GHAT_Constitution_2025_Refined.pdf`);
    if (!pdfResponse.ok) failures.push(`/GHAT_Constitution_2025_Refined.pdf: HTTP ${pdfResponse.status}`);
    const contentType = pdfResponse.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("pdf")) failures.push(`/GHAT_Constitution_2025_Refined.pdf: unexpected content type ${contentType || "missing"}`);
    const bytes = Buffer.from(await pdfResponse.arrayBuffer());
    if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") failures.push("/GHAT_Constitution_2025_Refined.pdf: file is not a valid PDF payload");
  } catch (error) {
    failures.push(`/GHAT_Constitution_2025_Refined.pdf: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Public contact surface: secure CTA, no attachment input and no mailbox.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${baseURL}/contact-the-trust`, { waitUntil: "networkidle" });
  const secureCta = page.getByRole("link", { name: /Open the Secure Contact Form/i });
  if (!(await secureCta.isVisible().catch(() => false))) failures.push("/contact-the-trust: secure contact-form CTA is missing");
  const addressText = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  if (!addressText.includes("2 Harley Street")) failures.push("/contact-the-trust: canonical correspondence address is missing");
  await page.goto(`${baseURL}/contact`, { waitUntil: "networkidle" });
  if ((await page.locator('input[type="file"]').count()) > 0) failures.push("/contact: public attachment input remains enabled");
  await page.close();
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

// Authentication chooser must remain available.
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
    if (!emailField || !passwordField) failures.push("/auth?portal=donor: login credential fields are missing");
  } else {
    failures.push("/auth: Donor Portal choice is missing");
  }
  await page.close();
}

// Signed-out visitors must not reach donor, Project Team or admin data.
for (const route of ["/donor-dashboard", "/volunteer-dashboard", "/admin", "/admin-dashboard"]) {
  const page = await browser.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  if (!page.url().includes("/auth")) failures.push(`${route}: signed-out visitor was not redirected to /auth`);
  await page.close();
}

// Donation collection is deliberately disabled until banking is verified.
{
  const page = await browser.newPage();
  await page.goto(`${baseURL}/donation-form`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  if (!page.url().includes("/donate")) failures.push("/donation-form: disabled collection route did not redirect to /donate");
  await page.close();
}

// Mobile layout and navigation on key bank-facing routes.
for (const route of ["/", "/about-the-trust", "/trustee-biographies", "/governance-legal-framework", "/constitution", "/financial-controls", "/contact-the-trust"]) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (overflow) failures.push(`${route}: horizontal overflow at 375px mobile width`);
  if (route === "/") {
    const menuButton = page.getByRole("button", { name: /menu|navigation/i }).first();
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      const visibleLinks = await page.locator("a:visible").count();
      if (visibleLinks < 4) failures.push("/: mobile navigation did not expose sufficient links");
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
console.log(`Release smoke tests passed for ${publicRoutes.length} public routes, core legal facts, adviser visibility, financial claims, signed Constitution PDF, contact privacy, disabled payments, protected routes and mobile layouts.`);
