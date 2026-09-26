/**
 * Screenshots of the site header menus (desktop) and the mobile menu panel.
 * Usage: node scripts/screenshot-menus.mjs [route]
 */
import fs from "node:fs";
import { chromium } from "playwright-core";

const BASE = process.env.REBUILD_URL ?? "http://localhost:5173";
const route = process.argv[2] ?? "/contact";
const out = "verification-output/screens";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.route(/intercom|googletagmanager/, (r) => r.abort());
await desktop.goto(BASE + route, { waitUntil: "networkidle" });
for (const label of ["Tax services", "Locations", "Resources", "About", "Client login"]) {
  await desktop.getByRole("button", { name: label, exact: true }).click();
  await desktop.mouse.move(1400, 880);
  await desktop.waitForTimeout(400);
  const file = `${out}/menu-${label.toLowerCase().replace(/\s+/g, "-")}-1440.png`;
  await desktop.screenshot({ path: file });
  console.log(file);
  await desktop.keyboard.press("Escape");
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.route(/intercom|googletagmanager/, (r) => r.abort());
await mobile.goto(BASE + route, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Open menu" }).click();
await mobile.getByRole("button", { name: "Tax services" }).click();
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: `${out}/menu-mobile-390.png` });
console.log(`${out}/menu-mobile-390.png`);
await browser.close();
