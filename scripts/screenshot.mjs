/**
 * Full-page screenshots of rebuild routes at given widths.
 * Usage: node scripts/screenshot.mjs / 1440 390 [1024]
 */
import fs from "node:fs";
import { chromium } from "playwright-core";

const BASE = process.env.REBUILD_URL ?? "http://localhost:5173";
const [route, ...widths] = process.argv.slice(2);
const out = "verification-output/screens";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
for (const width of widths.map(Number)) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.route(/intercom|googletagmanager/, (r) => r.abort());
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const file = `${out}/${route.replace(/\W+/g, "_").replace(/^_/, "") || "home"}-${width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await page.close();
}
await browser.close();
