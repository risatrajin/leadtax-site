/**
 * Makes smaller copies of the site's large photos so phones and small cards don't download the
 * full-size file, and lists them in src/content/image-variants.json (lib/images.js turns that list
 * into srcset attributes).
 *
 *   npm run images
 *
 * A dev tool, run after adding or replacing a large photo; the copies are committed with the site.
 * Needs macOS `sips` (reads image sizes) and `cwebp` (brew install webp).
 * Every image referenced from src/ that is at least MIN_WIDTH wide and MIN_KB in size gets WebP
 * copies at each of WIDTHS that is narrower than the original, named "<name>-<width>w.webp".
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const WIDTHS = [480, 800, 1200];
const MIN_WIDTH = 600;
const MIN_KB = 40;
const PUBLIC = path.resolve("public");
const OUT = path.resolve("src/content/image-variants.json");

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "archive" ? [] : sourceFiles(full);
    return /\.(jsx?|json)$/.test(entry.name) && full !== OUT ? [full] : [];
  });
}

const referenced = new Set(
  sourceFiles(path.resolve("src")).flatMap((file) => fs.readFileSync(file, "utf8").match(/\/images\/[\w./-]+\.(?:webp|png|jpe?g)/g) ?? []),
);

const widthOf = (file) => Number(execFileSync("sips", ["-g", "pixelWidth", file], { encoding: "utf8" }).match(/pixelWidth: (\d+)/)[1]);

const variants = {};
for (const src of [...referenced].sort()) {
  const file = path.join(PUBLIC, src);
  if (!fs.existsSync(file) || /-\d+w\.webp$/.test(src)) continue;
  // A JPEG/PNG that also has a WebP copy in use only needs the WebP's variants.
  if (!src.endsWith(".webp") && referenced.has(src.replace(/\.\w+$/, ".webp"))) continue;
  const width = widthOf(file);
  if (width < MIN_WIDTH || fs.statSync(file).size < MIN_KB * 1024) continue;
  const sizes = WIDTHS.filter((w) => w < width * 0.9);
  if (!sizes.length) continue;
  variants[src] = { width, sizes };
  for (const w of sizes) {
    const target = file.replace(/\.\w+$/, `-${w}w.webp`);
    if (!fs.existsSync(target)) execFileSync("cwebp", ["-quiet", "-q", "78", "-resize", String(w), "0", file, "-o", target]);
  }
}

fs.writeFileSync(OUT, `${JSON.stringify(variants, null, 2)}\n`);
console.log(`Variants for ${Object.keys(variants).length} images written to ${path.relative(process.cwd(), OUT)}`);
