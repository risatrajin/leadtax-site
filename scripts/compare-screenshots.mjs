/**
 * Visual regression checks at desktop (1440) and mobile (390) widths.
 *
 * Modes:
 *   node scripts/compare-screenshots.mjs [--body] [/route ...]
 *       Original build vs rebuild. Also compares SEO output (title, meta tags, JSON-LD).
 *       --body compares only what sits between the header and the footer, because the
 *       rebuild now has its own site-wide header and footer.
 *   node scripts/compare-screenshots.mjs --save-baseline [/route ...]
 *       Saves full-page screenshots of the rebuild to verification-output/baseline/.
 *   node scripts/compare-screenshots.mjs --baseline [/route ...]
 *       Rebuild vs the saved baseline.
 *
 * Servers: `npm run original` (original build on :8081) and `npm run dev` (rebuild on :5173).
 * Output goes to verification-output/ (git-ignored). The original build's full-page
 * screenshots from before the site-wide header are kept in verification-output/baseline-original/.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ORIGINAL = process.env.ORIGINAL_URL ?? "http://localhost:8081";
const REBUILD = process.env.REBUILD_URL ?? "http://localhost:5173";
const OUT = path.resolve("verification-output");
const BASELINE_DIR = path.join(OUT, "baseline");

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const mode = flags.has("--save-baseline") ? "save-baseline" : flags.has("--baseline") ? "baseline" : "original";
const bodyOnly = flags.has("--body");

const ORIGINAL_ROUTES = [
  "/", "/file-remotely", "/drop-off", "/file-in-person", "/us-cross-border", "/contact", "/about",
  "/career", "/blog", "/faq", "/terms", "/privacy-policy", "/pricing",
  ...JSON.parse(fs.readFileSync("src/content/blog/posts.json", "utf8")).posts.map((post) => `/blog/${post.slug}`),
  "/blog/no-such-post",
];
// Pages that only exist in the rebuild are part of the baseline, not the original comparison.
const REBUILD_ONLY_ROUTES = ["/home-v2"];
const requested = args.filter((arg) => !arg.startsWith("--"));
const routes = requested.length ? requested : mode === "original" ? ORIGINAL_ROUTES : [...ORIGINAL_ROUTES, ...REBUILD_ONLY_ROUTES];

const WIDTHS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Third-party overlays that load at random times; blocked on both sides.
const BLOCKED = [/intercom/, /googletagmanager/, /google-analytics/];
// Freeze motion so both sides are captured in the same state.
const FREEZE_CSS = "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}";

const slug = (route) => (route === "/" ? "home" : route.slice(1).replaceAll("/", "__"));

function crop(image, top, bottom) {
  const height = Math.max(0, Math.min(bottom, image.height) - top);
  const out = new PNG({ width: image.width, height });
  PNG.bitblt(image, out, 0, top, image.width, height, 0, 0);
  return out;
}

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
  const png = PNG.sync.read(await page.screenshot({ fullPage: true }));
  const bounds = await page.evaluate(() => {
    const header = document.querySelector("header");
    const footers = document.querySelectorAll("footer");
    const footer = footers[footers.length - 1];
    return {
      top: header ? Math.round(header.getBoundingClientRect().bottom + window.scrollY) : 0,
      bottom: footer ? Math.round(footer.getBoundingClientRect().top + window.scrollY) : document.documentElement.scrollHeight,
    };
  });
  const seo = await page.evaluate(() => ({
    title: document.title,
    meta: [...document.head.querySelectorAll("meta[name],meta[property]")].map(
      (m) => `${m.getAttribute("name") ?? m.getAttribute("property")}=${m.getAttribute("content")}`,
    ),
    links: [...document.head.querySelectorAll("link[rel=canonical],link[rel=alternate]")].map((l) => `${l.rel}:${l.href}`),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  }));
  await context.close();
  return { png: bodyOnly ? crop(png, bounds.top, bounds.bottom) : png, seo };
}

/** Pad an image to the given size with magenta so height differences show up in the diff. */
function pad(image, width, height) {
  if (image.width === width && image.height === height) return image;
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) out.data.set([255, 0, 255, 255], i);
  PNG.bitblt(image, out, 0, 0, image.width, image.height, 0, 0);
  return out;
}

function seoDifferences(a, b, originA, originB) {
  const diffs = [];
  if (a.title !== b.title) diffs.push(`title: "${a.title}" vs "${b.title}"`);
  const metaA = new Set(a.meta);
  const metaB = new Set(b.meta);
  for (const m of metaA) if (!metaB.has(m)) diffs.push(`meta only in original: ${m}`);
  for (const m of metaB) if (!metaA.has(m)) diffs.push(`meta only in rebuild: ${m}`);
  const norm = (links, origin) => links.map((l) => l.replace(origin, ""));
  if (norm(a.links, originA).join() !== norm(b.links, originB).join()) diffs.push("canonical/alternate links differ");
  const ld = (s, origin) => s.jsonLd.join("\n").replaceAll(origin, "<origin>");
  if (ld(a, originA) !== ld(b, originB)) diffs.push("JSON-LD differs");
  return diffs;
}

const browser = await chromium.launch({ channel: "chrome" });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(BASELINE_DIR, { recursive: true });
const results = [];

for (const route of routes) {
  for (const viewport of WIDTHS) {
    const base = `${slug(route)}.${viewport.name}${bodyOnly ? ".body" : ""}`;

    if (mode === "save-baseline") {
      const { png } = await capture(browser, REBUILD, route, viewport);
      fs.writeFileSync(path.join(BASELINE_DIR, `${base}.png`), PNG.sync.write(png));
      console.log(`${route.padEnd(36)} ${viewport.name.padEnd(8)} saved ${png.width}x${png.height}`);
      continue;
    }

    let reference;
    let seoDiffs = [];
    const current = await capture(browser, REBUILD, route, viewport);
    if (mode === "baseline") {
      const file = path.join(BASELINE_DIR, `${base}.png`);
      if (!fs.existsSync(file)) {
        console.log(`${route.padEnd(36)} ${viewport.name.padEnd(8)} no baseline (run --save-baseline)`);
        continue;
      }
      reference = PNG.sync.read(fs.readFileSync(file));
    } else {
      const original = await capture(browser, ORIGINAL, route, viewport);
      reference = original.png;
      seoDiffs = seoDifferences(original.seo, current.seo, ORIGINAL, REBUILD);
    }

    const width = Math.max(reference.width, current.png.width);
    const height = Math.max(reference.height, current.png.height);
    const left = pad(reference, width, height);
    const right = pad(current.png, width, height);
    const diff = new PNG({ width, height });
    const changed = pixelmatch(left.data, right.data, diff.data, width, height, { threshold: 0.1 });

    const prefix = path.join(OUT, `${base}${mode === "baseline" ? ".vs-baseline" : ""}`);
    fs.writeFileSync(`${prefix}.reference.png`, PNG.sync.write(reference));
    fs.writeFileSync(`${prefix}.rebuild.png`, PNG.sync.write(current.png));
    fs.writeFileSync(`${prefix}.diff.png`, PNG.sync.write(diff));

    const result = {
      route,
      viewport: viewport.name,
      size: `${reference.width}x${reference.height} vs ${current.png.width}x${current.png.height}`,
      changedPixels: changed,
      changedPercent: +((changed / (width * height)) * 100).toFixed(4),
      seoDiffs,
    };
    results.push(result);
    const seoNote = mode === "baseline" ? "" : seoDiffs.length ? `  SEO: ${seoDiffs.length} difference(s)` : "  SEO: identical";
    console.log(
      `${route.padEnd(36)} ${viewport.name.padEnd(8)} ${result.size.padEnd(24)} diff ${String(changed).padStart(8)} px (${result.changedPercent}%)${seoNote}`,
    );
  }
}

if (results.length) fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
await browser.close();
