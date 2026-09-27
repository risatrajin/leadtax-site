/**
 * Writes each route's SEO head into the built HTML, so crawlers and social-media previews
 * (which don't run JavaScript) see the right title, description, canonical and JSON-LD.
 *
 * Runs after `vite build`: for every route in PAGE_ROUTES it writes dist/<route>/index.html,
 * plus dist/404.html for unknown paths. The page body is still rendered by React in the browser.
 * The head values come from src/lib/seoHead.js, the same module the running site uses.
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const DIST = path.resolve("dist");
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

const escapeHtml = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
// JSON inside <script> must not contain "</script>".
const safeJson = (data) => JSON.stringify(data).replaceAll("</", "<\\/");

function renderHead({ title, tags, jsonLd }) {
  const lines = tags.map((tag) =>
    tag.tag === "meta"
      ? `<meta ${tag.attr}="${escapeHtml(tag.key)}" content="${escapeHtml(tag.content)}" />`
      : `<link rel="${tag.rel}"${tag.hreflang ? ` hreflang="${tag.hreflang}"` : ""} href="${escapeHtml(tag.href)}" />`,
  );
  for (const entry of jsonLd) {
    lines.push(`<script type="application/ld+json" data-schema="${entry.id}">${safeJson(entry.data)}</script>`);
  }
  return { title: `<title>${escapeHtml(title)}</title>`, tags: lines.map((line) => `    ${line}`).join("\n") };
}

function pageHtml(head) {
  const rendered = renderHead(head);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, rendered.title)
    .replace(/\n\s*<\/head>/, `\n${rendered.tags}\n  </head>`);
}

// Only used to load the SEO module (and its JSON imports); dependency scanning isn't needed.
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { PAGE_ROUTES, buildHead } = await vite.ssrLoadModule("/src/lib/seoHead.js");

  for (const route of PAGE_ROUTES) {
    const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, pageHtml(buildHead(route)));
  }
  fs.writeFileSync(path.join(DIST, "404.html"), pageHtml(buildHead("/404")));

  console.log(`Pre-rendered ${PAGE_ROUTES.length} pages and 404.html`);
} finally {
  await vite.close();
}
