/**
 * Behaviour checks for SiteHeader. Usage: node scripts/check-header.mjs (dev server running)
 */
import { chromium } from "playwright-core";

const BASE = process.env.REBUILD_URL ?? "http://localhost:5173";
const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;
const check = (condition, message) => {
  if (!condition) failures++;
  console.log(`${condition ? "PASS" : "FAIL"} ${message}`);
};

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route(/intercom|googletagmanager/, (r) => r.abort());
await page.goto(BASE + "/about", { waitUntil: "networkidle" });
const tax = page.getByRole("button", { name: "Tax services", exact: true });
const locations = page.getByRole("button", { name: "Locations", exact: true });
const panelOf = async (button) => page.locator(`#${await button.getAttribute("aria-controls")}`);

check((await tax.getAttribute("aria-expanded")) === "false", "trigger starts collapsed with aria-expanded=false");
check((await tax.getAttribute("aria-controls")) === "site-menu-tax-services", "trigger has aria-controls");

await tax.hover();
await page.waitForTimeout(40);
check(!(await (await panelOf(tax)).isVisible()), "hover does not open instantly");
await page.waitForTimeout(250);
check(await (await panelOf(tax)).isVisible(), "hover opens after a short delay");
await page.mouse.move(700, 850);
await page.waitForTimeout(400);
check(!(await (await panelOf(tax)).isVisible()), "hover-opened menu closes when the pointer leaves");

await tax.click();
await page.mouse.move(700, 850);
await page.waitForTimeout(400);
check(await (await panelOf(tax)).isVisible(), "click-opened menu stays open when the pointer leaves");
await locations.click();
await page.waitForTimeout(100);
check(!(await (await panelOf(tax)).isVisible()) && (await (await panelOf(locations)).isVisible()), "only one menu open at a time");
await page.keyboard.press("Escape");
check(!(await (await panelOf(locations)).isVisible()), "Escape closes the menu");
check(await locations.evaluate((el) => el === document.activeElement), "Escape returns focus to the trigger");

await tax.click();
await page.mouse.click(700, 700);
check(!(await (await panelOf(tax)).isVisible()), "clicking outside closes the menu");

await locations.focus();
await page.keyboard.press("Enter");
check(await (await panelOf(locations)).isVisible(), "Enter opens a menu from the keyboard");
await page.keyboard.press("Tab");
check(await page.evaluate(() => document.activeElement.closest("#site-menu-locations") !== null), "Tab moves into the open panel");

await page.getByRole("link", { name: /Kingsway/ }).first().click();
await page.waitForURL("**/contact#vancouver-kingsway");
await page.waitForTimeout(400);
const top = await page.locator("#vancouver-kingsway").evaluate((el) => el.getBoundingClientRect().top);
check(top > 60 && top < 200, `office link scrolls to its card below the sticky header (top=${Math.round(top)})`);
check(!(await page.locator("#site-menu-locations").isVisible()), "navigating closes the menu");

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.route(/intercom|googletagmanager/, (r) => r.abort());
await mobile.goto(BASE + "/", { waitUntil: "networkidle" });
const menuButton = mobile.getByRole("button", { name: "Open menu" });
await menuButton.click();
const panel = mobile.locator("#site-mobile-menu");
check(await panel.isVisible(), "mobile menu opens");
check((await mobile.evaluate(() => document.body.style.overflow)) === "hidden", "page behind the mobile menu does not scroll");
const book = panel.getByRole("link", { name: "Book an appointment" });
const box = await book.boundingBox();
check(box && box.y + box.height <= 844 && box.y > 700, "booking button pinned to the bottom of the panel");
const group = panel.getByRole("button", { name: "Locations" });
await group.click();
check((await group.getAttribute("aria-expanded")) === "true", "mobile accordion sets aria-expanded");
await mobile.keyboard.press("Escape");
check(!(await panel.isVisible()), "Escape closes the mobile menu");
check(await mobile.getByRole("button", { name: "Open menu" }).evaluate((el) => el === document.activeElement), "focus returns to the menu button");

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll header checks passed");
process.exitCode = failures ? 1 : 0;
