/**
 * Visual regression check at desktop (1440) and mobile (390) widths.
 *
 *   node scripts/compare-screenshots.mjs --save-baseline [/route ...]
 *       Saves full-page screenshots of the site to verification-output/baseline/.
 *   node scripts/compare-screenshots.mjs [/route ...]
 *       Compares the site with the saved baseline and writes diff images.
 *
 * Needs the dev server (`npm run dev`, http://localhost:5173). Output goes to
 * verification-output/ (git-ignored).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const SITE = process.env.SITE_URL ?? "http://localhost:5173";
const OUT = path.resolve("verification-output");
const BASELINE_DIR = path.join(OUT, "baseline");

const args = process.argv.slice(2);
const saveBaseline = args.includes("--save-baseline");
const requested = args.filter((arg) => !arg.startsWith("--"));

const ROUTES = [
  "/", "/file-remotely", "/drop-off", "/file-in-person", "/us-cross-border", "/contact", "/about",
  "/career", "/blog", "/faq", "/terms", "/privacy-policy", "/pricing", "/home-redesign",
  ...JSON.parse(fs.readFileSync("src/content/blog/posts.json", "utf8")).posts.map((post) => `/blog/${post.slug}`),
  "/blog/no-such-post",
];
const routes = requested.length ? requested : ROUTES;

const WIDTHS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Third-party overlays and the embedded Google map load at random times, so they are blocked.
const BLOCKED = [/intercom/, /googletagmanager/, /google-analytics/, /maps\.google\.com/, /google\.com\/maps/];
// Freeze motion so every run captures the same state.
const FREEZE_CSS = "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}";

const slug = (route) => (route === "/" ? "home" : route.slice(1).replaceAll("/", "__"));

async function capture(browser, route, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await context.route("**/*", (request) =>
    BLOCKED.some((pattern) => pattern.test(request.request().url())) ? request.abort() : request.continue(),
  );
  const page = await context.newPage();
  await page.goto(SITE + route, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const png = PNG.sync.read(await page.screenshot({ fullPage: true }));
  await context.close();
  return png;
}

/** Pad an image to the given size with magenta so height differences show up in the diff. */
function pad(image, width, height) {
  if (image.width === width && image.height === height) return image;
  const out = new PNG({ width, height });
  for (let i = 0; i < out.data.length; i += 4) out.data.set([255, 0, 255, 255], i);
  PNG.bitblt(image, out, 0, 0, image.width, image.height, 0, 0);
  return out;
}

const browser = await chromium.launch({ channel: "chrome" });
fs.mkdirSync(BASELINE_DIR, { recursive: true });

for (const route of routes) {
  for (const viewport of WIDTHS) {
    const base = `${slug(route)}.${viewport.name}`;
    const current = await capture(browser, route, viewport);

    if (saveBaseline) {
      fs.writeFileSync(path.join(BASELINE_DIR, `${base}.png`), PNG.sync.write(current));
      console.log(`${route.padEnd(36)} ${viewport.name.padEnd(8)} saved ${current.width}x${current.height}`);
      continue;
    }

    const file = path.join(BASELINE_DIR, `${base}.png`);
    if (!fs.existsSync(file)) {
      console.log(`${route.padEnd(36)} ${viewport.name.padEnd(8)} no baseline (run with --save-baseline)`);
      continue;
    }
    const reference = PNG.sync.read(fs.readFileSync(file));
    const width = Math.max(reference.width, current.width);
    const height = Math.max(reference.height, current.height);
    const diff = new PNG({ width, height });
    const changed = pixelmatch(pad(reference, width, height).data, pad(current, width, height).data, diff.data, width, height, {
      threshold: 0.1,
    });
    fs.writeFileSync(path.join(OUT, `${base}.diff.png`), PNG.sync.write(diff));
    const percent = ((changed / (width * height)) * 100).toFixed(4);
    console.log(`${route.padEnd(36)} ${viewport.name.padEnd(8)} diff ${String(changed).padStart(8)} px (${percent}%)`);
  }
}

await browser.close();
