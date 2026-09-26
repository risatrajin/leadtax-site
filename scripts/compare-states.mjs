/**
 * Interaction parity check: opens menus, expands FAQs and
 * shows tooltips on both builds, then diffs viewport screenshots.
 * Usage: node scripts/compare-states.mjs   (both servers running, see compare-screenshots.mjs)
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ORIGINAL = process.env.ORIGINAL_URL ?? "http://localhost:8081";
const REBUILD = process.env.REBUILD_URL ?? "http://localhost:5173";
const OUT = path.resolve("verification-output/states");
const FREEZE_CSS = "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}";

const STATES = [
  { name: "desktop-file-remotely-menu", viewport: { width: 1440, height: 900 }, run: (p) => p.hover("header nav button:has-text('File Remotely')") },
  { name: "desktop-resources-menu", viewport: { width: 1440, height: 900 }, run: (p) => p.hover("header nav button:has-text('Resources')") },
  { name: "desktop-sign-in-menu", viewport: { width: 1440, height: 900 }, run: (p) => p.hover("header button:has-text('Sign In')") },
  { name: "desktop-get-started-menu", viewport: { width: 1440, height: 900 }, run: (p) => p.hover("header button:has-text('Get Started')") },
  { name: "desktop-phone-tooltip", viewport: { width: 1440, height: 900 }, run: (p) => p.hover("section button:has-text('1 877 453 2382')") },
  {
    name: "mobile-menu-all-open", viewport: { width: 390, height: 1400 },
    run: async (p) => {
      await p.click("button[aria-label='Toggle menu']");
      for (const label of ["File Remotely", "Resources", "Sign In", "Get Started"]) {
        await p.locator("header div[class*='border-t'] nav button", { hasText: label }).first().click();
      }
    },
  },
  {
    name: "desktop-faq-open", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      const q = p.locator("button", { hasText: "Who is Lead Tax DIY for?" });
      await q.click();
      await p.locator("button", { hasText: "How much does Lead Tax DIY cost?" }).click();
      await q.scrollIntoViewIfNeeded();
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "desktop-reviews-scrolled", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      await p.locator("button[aria-label='Scroll right']").scrollIntoViewIfNeeded();
      await p.click("button[aria-label='Scroll right']");
      await p.waitForTimeout(800);
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "faq-page-item-open", route: "/faq", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      await p.locator("button", { hasText: "How much does LeadTax cost?" }).click();
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "contact-expert-picker-open", route: "/contact", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      await p.locator("button", { hasText: "Book an Appointment" }).click();
      await p.waitForTimeout(500);
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "contact-expert-picker-mobile", route: "/contact", viewport: { width: 390, height: 844 },
    run: async (p) => {
      await p.locator("button", { hasText: "Book an Appointment" }).click();
      await p.waitForTimeout(500);
    },
  },
  {
    name: "cross-border-tab-for-businesses", route: "/us-cross-border", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      const tab = p.locator("button", { hasText: "For Businesses" });
      await tab.click();
      await tab.scrollIntoViewIfNeeded();
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "cross-border-tab-property-owners", route: "/us-cross-border", viewport: { width: 1440, height: 900 },
    run: async (p) => {
      const tab = p.locator("button", { hasText: "Property Owners" });
      await tab.click();
      await tab.scrollIntoViewIfNeeded();
      await p.mouse.move(0, 0);
    },
  },
  {
    name: "cross-border-faq-open", route: "/us-cross-border", viewport: { width: 390, height: 844 },
    run: async (p) => {
      const q = p.locator("button", { hasText: "What is FBAR and do I need to file it?" });
      await q.click();
      await q.scrollIntoViewIfNeeded();
    },
  },
  ...[{ width: 1440, height: 1600 }, { width: 390, height: 1400 }].map((viewport) => ({
    name: `pricing-expert-tab-${viewport.width}`, route: "/pricing", viewport,
    run: async (p) => {
      await p.locator("section button", { hasText: "File Remotely" }).click();
      await p.mouse.move(0, 0);
    },
  })),
];

const only = process.argv.slice(2);
const selected = only.length ? STATES.filter((s) => only.some((o) => s.name.includes(o) || s.route === o)) : STATES;

async function shoot(browser, base, state) {
  const context = await browser.newContext({ viewport: state.viewport, deviceScaleFactor: 1 });
  await context.route(/intercom|googletagmanager/, (r) => r.abort());
  const page = await context.newPage();
  await page.goto(base + (state.route ?? "/"), { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE_CSS });
  await state.run(page);
  await page.waitForTimeout(400);
  const png = PNG.sync.read(await page.screenshot());
  await context.close();
  return png;
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
for (const state of selected) {
  const [a, b] = await Promise.all([shoot(browser, ORIGINAL, state), shoot(browser, REBUILD, state)]);
  const diff = new PNG({ width: a.width, height: a.height });
  const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  for (const [k, img] of Object.entries({ original: a, rebuild: b, diff })) {
    fs.writeFileSync(path.join(OUT, `${state.name}.${k}.png`), PNG.sync.write(img));
  }
  console.log(`${state.name.padEnd(32)} diff ${changed} px`);
}
await browser.close();
