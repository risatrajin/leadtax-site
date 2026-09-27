/**
 * Lists every content value that is invented or still unconfirmed by the client.
 *
 * Flags live on the record that owns the value:
 *   "_placeholder": true             the whole record is a placeholder
 *   "_placeholders": ["field", ...]  only these fields (dotted paths allowed, e.g. "display.address")
 * Visible "[TBD: ...]" text is listed too.
 *
 * It also enforces the link rule: a link only appears if its target page exists. Any record
 * whose "href", "to" or "link" is "#" must carry "enabled": false (the site then hides it).
 *
 * Usage: node scripts/list-placeholders.mjs [--quiet]
 * Runs after `npm run build`. Placeholders never fail the build; problems with the flags are
 * printed as warnings. An enabled "#" link fails the build (exit code 1).
 */
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve("src/content");
// Archived pages are not rendered, so their copy isn't tracked here.
const SKIP_DIRS = new Set(["archive"]);
const quiet = process.argv.includes("--quiet");

function jsonFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : jsonFiles(full);
    return entry.name.endsWith(".json") ? [full] : [];
  });
}

const join = (base, key) => (typeof key === "number" ? `${base}[${key}]` : base ? `${base}.${key}` : key);

function getPath(object, dotted) {
  return dotted.split(".").reduce(
    (value, key) => (value != null && Object.hasOwn(value, key) ? value[key] : undefined),
    object,
  );
}

function preview(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (text === undefined) return "";
  return text.length > 70 ? `${text.slice(0, 67)}...` : text;
}

const found = [];
const warnings = [];
const deadLinks = [];
const LINK_KEYS = ["href", "to", "link"];

function walk(node, file, at) {
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, file, join(at, index)));
    return;
  }
  if (node && typeof node === "object") {
    if (node._placeholder === true) {
      found.push({ file, path: at || "(file)", kind: "record", value: node.title ?? node.name ?? node.label ?? node.id });
    }
    if (node._placeholders !== undefined) {
      if (!Array.isArray(node._placeholders)) warnings.push(`${file} ${at}: _placeholders must be an array`);
      else
        for (const field of node._placeholders) {
          const value = getPath(node, field);
          if (value === undefined) warnings.push(`${file} ${join(at, field)}: flagged field does not exist`);
          found.push({ file, path: join(at, field), kind: "field", value });
        }
    }
    for (const key of LINK_KEYS) {
      if (node[key] === "#" && node.enabled !== false) deadLinks.push(`${file} ${join(at, key)}`);
    }
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith("_")) continue;
      walk(value, file, join(at, key));
    }
    return;
  }
  if (typeof node === "string" && node.includes("[TBD:")) {
    found.push({ file, path: at, kind: "tbd", value: node });
  }
}

for (const file of jsonFiles(CONTENT_DIR)) {
  const relative = path.relative(process.cwd(), file);
  walk(JSON.parse(fs.readFileSync(file, "utf8")), relative, "");
}

if (!quiet) {
  let lastFile = null;
  for (const item of found) {
    if (item.file !== lastFile) {
      console.log(`\n${item.file}`);
      lastFile = item.file;
    }
    const tag = item.kind === "record" ? "[record]" : item.kind === "tbd" ? "[TBD]   " : "        ";
    console.log(`  ${tag} ${item.path}  ${item.value === undefined ? "" : `— ${preview(item.value)}`}`);
  }
}
for (const warning of warnings) console.warn(`warning: ${warning}`);

const count = (kind) => found.filter((item) => item.kind === kind).length;
console.log(
  `\nPlaceholders: ${found.length} (${count("field")} fields, ${count("record")} records, ${count("tbd")} [TBD] texts)` +
    (warnings.length ? `, ${warnings.length} warning(s)` : ""),
);

if (deadLinks.length) {
  console.error(`\nerror: ${deadLinks.length} enabled link(s) point to "#". Add "enabled": false until the page exists:`);
  for (const link of deadLinks) console.error(`  ${link}`);
  process.exit(1);
}
