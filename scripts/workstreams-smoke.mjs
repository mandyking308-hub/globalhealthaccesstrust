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

async function settleLazyImages(page) {
  await page.locator("img").evaluateAll((elements) => {
    for (const element of elements) {
      if (element instanceof HTMLImageElement) element.loading = "eager";
    }
  });

  await page.evaluate(async () => {
    const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    const step = Math.max(400, Math.floor(window.innerHeight * 0.75));
    const maximum = document.documentElement.scrollHeight;

    for (let y = 0; y <= maximum; y += step) {
      window.scrollTo(0, y);
      await wait(75);
    }

    window.scrollTo(0, 0);
  });

  await page.waitForTimeout(500);
}

async function checkImages(page, selector, route, expectedMinimum) {
  await settleLazyImages(page);
  const images = page.locator(selector);
  const count = await images.count();
  if (count < expectedMinimum) failures.push(`${route}: expected at least ${expectedMinimum} images, found ${count}`);
  const broken = await images.evaluateAll((elements) =>
    elements.filter((element) => !(element instanceof HTMLImageElement) || !element.complete || element.naturalWidth < 200).length,
  );
  if (broken) failures.push(`${route}: ${broken} image(s) failed to load at usable resolution`);
}

{
  const page = await open("/");
  const body = await page.locator("body").innerText();
  for (const marker of [
    "Building the systems that make health, safety and opportunity possible.",
    "Five current workstreams",
    "Health depends on the systems around it.",
    "From a defined need to accountable delivery.",
    "Permanent mandate",
    "Evidence, independence and charitable control.",
    "Turn concern into a responsible next step.",
  ]) {
    if (!containsText(body, marker)) failures.push(`/: homepage story marker is missing: ${marker}`);
  }
  if (containsText(body, "Work and Institutional Learning")) failures.push("/: retired institutional-learning section remains visible");

  const order = [
    "Building the systems that make health, safety and opportunity possible.",
    "Five current workstreams",
    "Health depends on the systems around it.",
    "From a defined need to accountable delivery.",
    "The wider charitable scope behind today’s five workstreams.",
    "Evidence, independence and charitable control.",
    "Turn concern into a responsible next step.",
  ];
  let cursor = -1;
  for (const marker of order) {
    const next = body.toLocaleLowerCase().indexOf(marker.toLocaleLowerCase(), cursor + 1);
    if (next < 0) failures.push(`/: homepage order marker is missing: ${marker}`);
    else if (next < cursor) failures.push(`/: homepage section order is incorrect at: ${marker}`);
    else cursor = next;
  }

  for (const workstream of workstreams) {
    const href = `/current-workstreams/${workstream.slug}`;
    if ((await page.locator(`a[href="${href}"]`).count()) < 1) failures.push(`/: missing homepage link ${href}`);
  }
  await checkImages(page, 'section[aria-labelledby="home-workstreams-heading"] img', "/", 5);
  await checkImages(page, "main img", "/", 9);
  await page.screenshot({ path: "workstream-previews/homepage-current-workstreams.png", fullPage: true });
  await page.close();
}

for (const viewport of [
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
]) {
  const page = await open("/", viewport);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  if (overflow) failures.push(`/: horizontal overflow at ${viewport.width}px tablet width`);
  await checkImages(page, "main img", `/:${viewport.width}`, 9);
  await page.close();
}

{
  const page = await open("/current-workstreams");
  const body = await page.locator("body").innerText();
  if (!containsText(body, "Practical work. Responsible delivery. Lasting public benefit.")) failures.push("/current-workstreams: hero statement is missing");
  if (!containsText(body, "Claims follow evidence, not ambition.")) failures.push("/current-workstreams: evidence standard is missing");
  if ((await page.locator('a[href^="/current-workstreams/"]').count()) < 5) failures.push("/current-workstreams: fewer than five project links");
  await checkImages(page, "main img", "/current-workstreams", 5);
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
  await checkImages(page, "main img", route, 1);
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

for (const route of ["/our-history", "/our-history/1991-1999", "/our-history/2000-2009", "/our-history/2010-2019", "/our-history/2020-2026"]) {
  const page = await open(route);
  const body = await page.locator("body").innerText();
  if (/page not found|404 — not found/i.test(body)) failures.push(`${route}: historical archive route is not available`);
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
    "/our-history/2010-2019",
    "/our-history/2020-2026",
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

console.log(`Current workstreams smoke test passed for the homepage story, ${workstreams.length} full project pages, project images, tablet and mobile layouts, forms, history, sitemap and Blog retirement.`);
