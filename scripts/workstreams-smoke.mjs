import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const baseURL = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const canonicalBase = "https://globalhealthaccesstrust.com";
const browser = await chromium.launch({ headless: true });
const failures = [];
mkdirSync("workstream-previews", { recursive: true });

const workstreams = [
  {
    slug: "africa-food-agriculture-resilient-systems",
    title: "Africa: Food, Agriculture and Resilient Systems",
    markers: ["306m", "Farmer capability and agricultural literacy", "AI-assisted seasonal decision support"],
  },
  {
    slug: "asia-children-without-family-care",
    title: "Asia: Children Without Family Care and Vulnerable Children",
    markers: ["48.8m", "Family preservation and appropriate care", "Preparation for adulthood"],
  },
  {
    slug: "conflict-war-zone-recovery-support",
    title: "Conflict, War-Zone and Recovery Support",
    markers: ["117.8m", "Emergency response and recovery cannot be separated", "Trusted local delivery"],
  },
  {
    slug: "ai-first-human-first-youth-enterprise-employment",
    title: "AI First, Human First: Young People, Enterprise and Employment",
    markers: ["~40%", "Project-based learning", "Enterprise and employment"],
  },
  {
    slug: "global-mental-health-neurodiversity-suicide-prevention",
    title: "Global Mental Health, Neurodiversity and Suicide Prevention",
    markers: ["727,000", "Male mental-health and suicide-prevention literacy", "Responsible neurodiversity pathways"],
  },
];

const containsText = (body, expected) => body.toLocaleLowerCase().includes(expected.toLocaleLowerCase());

function watchErrors(page, route) {
  page.on("pageerror", (error) => failures.push(`${route}: page error: ${error.message}`));
  page.on("console", (message) => {
    const text = message.text();
    if (
      message.type() === "error" &&
      !text.includes("Failed to load resource") &&
      !text.includes("ERR_NAME_NOT_RESOLVED") &&
      !text.includes("example.supabase.co")
    ) {
      failures.push(`${route}: console error: ${text}`);
    }
  });
}

async function open(route, viewport = { width: 1440, height: 1000 }) {
  const page = await browser.newPage({ viewport });
  watchErrors(page, route);
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle", timeout: 45_000 });
  if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status() ?? "no response"}`);
  return page;
}

{
  const page = await open("/");
  const body = await page.locator("body").innerText();
  if (!containsText(body, "Five Current Workstreams")) failures.push("/: current-workstreams homepage heading is missing");
  for (const workstream of workstreams) {
    const href = `/current-workstreams/${workstream.slug}`;
    if ((await page.locator(`a[href="${href}"]`).count()) < 1) failures.push(`/: missing homepage link ${href}`);
  }
  if ((await page.locator('section[aria-labelledby="home-workstreams-heading"] img').count()) < 5) {
    failures.push("/: fewer than five workstream images are displayed");
  }
  await page.screenshot({ path: "workstream-previews/homepage-current-workstreams.png", fullPage: true });
  await page.close();
}

{
  const page = await open("/current-workstreams");
  const body = await page.locator("body").innerText();
  if (!containsText(body, "Practical work. Responsible delivery. Lasting public benefit.")) failures.push("/current-workstreams: hero statement is missing");
  if (!containsText(body, "Evidence without overstatement")) failures.push("/current-workstreams: evidence standard is missing");
  if ((await page.locator('a[href^="/current-workstreams/"]').count()) < 5) failures.push("/current-workstreams: fewer than five project links");
  await page.screenshot({ path: "workstream-previews/current-workstreams-index.png", fullPage: true });
  await page.close();
}

for (const workstream of workstreams) {
  const route = `/current-workstreams/${workstream.slug}`;
  const page = await open(route);
  const body = await page.locator("body").innerText();
  if (!containsText(body, workstream.title)) failures.push(`${route}: title is missing`);
  for (const marker of workstream.markers) {
    if (!containsText(body, marker)) failures.push(`${route}: missing content marker: ${marker}`);
  }
  for (const required of [
    "The scale of the challenge",
    "Why GHAT is acting",
    "The project plan",
    "What the project will produce",
    "How impact will be measured",
    "Governance and safeguards",
    "Evidence and progress",
    "Sources used on this page",
  ]) {
    if (!containsText(body, required)) failures.push(`${route}: required section missing: ${required}`);
  }
  if ((await page.locator("img").count()) < 1) failures.push(`${route}: project image is missing`);
  if ((await page.locator('a[target="_blank"][rel~="noreferrer"]').count()) < 1) failures.push(`${route}: source links are missing`);
  if ((await page.locator(`a[href="/donate?workstream=${workstream.slug}#pledge-form"]`).count()) < 1) failures.push(`${route}: pledge route is missing`);
  if ((await page.locator(`a[href="/volunteer-apply?workstream=${workstream.slug}"]`).count()) < 1) failures.push(`${route}: contributor route is missing`);
  if ((await page.locator(`a[href="/contact?workstream=${workstream.slug}"]`).count()) < 1) failures.push(`${route}: enquiry route is missing`);
  await page.screenshot({ path: `workstream-previews/${workstream.slug}.png`, fullPage: true });
  await page.close();
}

{
  const slug = workstreams[0].slug;
  for (const route of [`/donate?workstream=${slug}`, `/contact?workstream=${slug}`]) {
    const page = await open(route);
    const body = await page.locator("body").innerText();
    if (!containsText(body, "Linked to Workstream 01")) failures.push(`${route}: selected-project context is missing`);
    await page.close();
  }
}

for (const route of ["/our-history", "/our-history/1991-1999", "/our-history/2000-2009"]) {
  const page = await open(route);
  const body = await page.locator("body").innerText();
  if (/page not found|404 — not found/i.test(body)) failures.push(`${route}: historical archive route is not available`);
  if (!containsText(body, route === "/our-history" ? "Our history" : route.split("/").pop()?.replace("-", "–") ?? "")) {
    failures.push(`${route}: expected historical period is missing`);
  }
  await page.close();
}

{
  const page = await open("/blog");
  const body = await page.locator("body").innerText();
  if (!/page not found|404 — not found/i.test(body)) failures.push("/blog: retired Blog route does not show Not Found");
  await page.close();
}

{
  const response = await fetch(`${baseURL}/sitemap.xml`);
  const sitemap = await response.text();
  if (!response.ok) failures.push(`/sitemap.xml: HTTP ${response.status}`);
  for (const route of [
    "/current-workstreams",
    "/our-history",
    "/our-history/1991-1999",
    "/our-history/2000-2009",
    ...workstreams.map((item) => `/current-workstreams/${item.slug}`),
  ]) {
    if (!sitemap.includes(`<loc>${canonicalBase}${route}</loc>`)) failures.push(`/sitemap.xml: missing ${route}`);
  }
  if (sitemap.includes("/blog")) failures.push("/sitemap.xml: retired Blog route is present");
}

for (const workstream of workstreams) {
  const route = `/current-workstreams/${workstream.slug}`;
  const page = await open(route, { width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (overflow) failures.push(`${route}: horizontal overflow on mobile`);
  const mainText = (await page.locator("main").innerText()).trim();
  if (mainText.length < 1000) failures.push(`${route}: mobile page rendered insufficient content`);
  await page.close();
}

await browser.close();

if (failures.length) {
  console.error("Current workstreams smoke test failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Current workstreams smoke test passed for ${workstreams.length} full project pages, homepage cards, forms, history, sitemap, Blog retirement and mobile layout.`);
