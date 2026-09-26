/**
 * Visual parity check: screenshots every route on the original build and the
 * rebuild at desktop and mobile widths, diffs them pixel by pixel, and compares
 * the SEO output (title, meta tags, JSON-LD).
 *
 * Usage:
 *   npm run original            # serves original-build on :8081
 *   npm run dev                 # serves the rebuild on :5173
 *   node scripts/compare-screenshots.mjs [/route ...]
 *
 * Output goes to verification-output/ (git-ignored).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ORIGINAL = process.env.ORIGINAL_URL ?? "http://localhost:8081";
const REBUILD = process.env.REBUILD_URL ?? "http://localhost:5173";
const OUT = path.resolve("verification-output");

const ALL_ROUTES = [
  "/", "/diy-landing", "/dyi-landing", "/file-remote-landing", "/file-remotely",
  "/drop-off", "/file-in-person", "/us-cross-border", "/contact", "/about", "/career",
  "/blog", "/blog/2026-tax-filing-deadlines", "/faq", "/terms", "/privacy-policy",
  "/sign-in", "/pricing", "/sitemap",
];
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ALL_ROUTES;
const WIDTHS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Third-party overlays that load at random times; blocked on both sides.
const BLOCKED = [/intercom/, /googletagmanager/, /google-analytics/];
// Freeze motion so both sides are captured in the same state.
const FREEZE_CSS = "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}";

const slug = (route) => (route === "/" ? "home" : route.slice(1).replaceAll("/", "__"));

async function capture(browser, baseUrl, route, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await context.route("**/*", (request) =>
    BLOCKED.some((pattern) => pattern.test(request.request().url())) ? request.abort() : request.continue(),
  );
  const page = await context.newPage();
  await page.goto(baseUrl + route, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const png = await page.screenshot({ fullPage: true });
  const seo = await page.evaluate(() => ({
    title: document.title,
    meta: [...document.head.querySelectorAll("meta[name],meta[property]")].map(
      (m) => `${m.getAttribute("name") ?? m.getAttribute("property")}=${m.getAttribute("content")}`,
    ),
    links: [...document.head.querySelectorAll("link[rel=canonical],link[rel=alternate]")].map((l) => `${l.rel}:${l.href}`),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  }));
  await context.close();
  return { png: PNG.sync.read(png), seo };
}

/** Pad an image to the given size with magenta so height differences show up in the diff. */
function pad(image, width, height) {
  if (image.width === width && image.height === height) return image;
  const out = new PNG({ width, height });
  out.data.fill(0);
  for (let i = 0; i < out.data.length; i += 4) out.data.set([255, 0, 255, 255], i);
  PNG.bitblt(image, out, 0, 0, image.width, image.height, 0, 0);
  return out;
}

const browser = await chromium.launch({ channel: "chrome" });
fs.mkdirSync(OUT, { recursive: true });
const results = [];

for (const route of routes) {
  for (const viewport of WIDTHS) {
    const [a, b] = await Promise.all([
      capture(browser, ORIGINAL, route, viewport),
      capture(browser, REBUILD, route, viewport),
    ]);
    const width = Math.max(a.png.width, b.png.width);
    const height = Math.max(a.png.height, b.png.height);
    const left = pad(a.png, width, height);
    const right = pad(b.png, width, height);
    const diff = new PNG({ width, height });
    const changed = pixelmatch(left.data, right.data, diff.data, width, height, { threshold: 0.1 });

    const base = path.join(OUT, `${slug(route)}.${viewport.name}`);
    fs.writeFileSync(`${base}.original.png`, PNG.sync.write(a.png));
    fs.writeFileSync(`${base}.rebuild.png`, PNG.sync.write(b.png));
    fs.writeFileSync(`${base}.diff.png`, PNG.sync.write(diff));

    const seoDiffs = [];
    if (a.seo.title !== b.seo.title) seoDiffs.push(`title: "${a.seo.title}" vs "${b.seo.title}"`);
    const metaA = new Set(a.seo.meta), metaB = new Set(b.seo.meta);
    for (const m of metaA) if (!metaB.has(m)) seoDiffs.push(`meta only in original: ${m}`);
    for (const m of metaB) if (!metaA.has(m)) seoDiffs.push(`meta only in rebuild: ${m}`);
    const norm = (links, base) => links.map((l) => l.replace(base, ""));
    if (norm(a.seo.links, ORIGINAL).join() !== norm(b.seo.links, REBUILD).join()) seoDiffs.push("canonical/alternate links differ");
    const ld = (s, origin) => s.jsonLd.join("\n").replaceAll(origin, "<origin>");
    if (ld(a.seo, ORIGINAL) !== ld(b.seo, REBUILD)) seoDiffs.push("JSON-LD differs");

    const result = {
      route,
      viewport: viewport.name,
      size: `${a.png.width}x${a.png.height} vs ${b.png.width}x${b.png.height}`,
      changedPixels: changed,
      changedPercent: +((changed / (width * height)) * 100).toFixed(4),
      seoDiffs,
    };
    results.push(result);
    console.log(
      `${route.padEnd(36)} ${viewport.name.padEnd(8)} ${result.size.padEnd(24)} diff ${String(changed).padStart(8)} px (${result.changedPercent}%)` +
        (seoDiffs.length ? `  SEO: ${seoDiffs.length} difference(s)` : "  SEO: identical"),
    );
  }
}

fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
await browser.close();
