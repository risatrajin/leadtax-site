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

/*
 * Pages are loaded on demand (React.lazy in src/App.jsx). So the browser doesn't wait for the main
 * script before asking for a page's own chunk, each HTML file preloads that chunk and its imports.
 * Route → page file comes from App.jsx; page file → chunk files from Vite's build manifest.
 */
const manifest = JSON.parse(fs.readFileSync(path.join(DIST, ".vite", "manifest.json"), "utf8"));
const appSource = fs.readFileSync(path.resolve("src/App.jsx"), "utf8");
const lazyFiles = Object.fromEntries(
  [...appSource.matchAll(/const (\w+) = lazy\(\(\) => import\("\.\/([^"]+)"\)\)/g)].map(([, name, file]) => [name, `src/${file}`]),
);
const routeFiles = Object.fromEntries(
  [...appSource.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)].map(([, route, name]) => [route, lazyFiles[name]]),
);
const entryImports = new Set(manifest["index.html"]?.imports ?? []);

function chunksFor(route) {
  const file = routeFiles[route] ?? (route.startsWith("/blog/") ? routeFiles["/blog/:slug"] : undefined);
  if (!file || !manifest[file]) return [];
  const found = new Set();
  const walk = (key) => {
    const chunk = manifest[key];
    if (!chunk || found.has(chunk.file)) return;
    found.add(chunk.file);
    for (const dep of chunk.imports ?? []) if (dep !== "index.html" && !entryImports.has(dep)) walk(dep);
  };
  walk(file);
  return [...found];
}

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

function pageHtml(head, route) {
  const rendered = renderHead(head);
  const preloads = chunksFor(route).map((file) => `    <link rel="modulepreload" crossorigin href="/${file}" />`);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, rendered.title)
    .replace(/\n\s*<\/head>/, `\n${[rendered.tags, ...preloads].join("\n")}\n  </head>`);
}

const SITE_URL = "https://leadtax.ca";
const readJson = (file) => JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
const xmlEscape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** "January 8, 2026" → "2026-01-08". */
function isoDate(text) {
  const date = new Date(`${text} 12:00 UTC`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

/**
 * sitemap.xml for every pre-rendered page, so it never drifts from the routes. Blog posts carry
 * their publish date; other pages the build date. (Google ignores changefreq and priority.)
 */
function sitemapXml(routes) {
  const { posts } = readJson("src/content/blog/posts.json");
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map((route) => {
    const post = route.startsWith("/blog/") && posts.find((candidate) => `/blog/${candidate.slug}` === route);
    const lastmod = (post && isoDate(post.date)) || today;
    return `  <url>\n    <loc>${xmlEscape(SITE_URL + (route === "/" ? "/" : route))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

/**
 * llms.txt (llmstxt.org): a plain-text summary of the business for AI assistants and AI search,
 * built from the same content as the site so the facts always match.
 */
function llmsTxt(routes, buildHead, servicePages) {
  const site = readJson("src/content/site.json");
  const nav = readJson("src/content/nav.json");
  const seo = readJson("src/content/seo.json");
  const { offices } = readJson("src/content/offices.json");
  const page = (route) => {
    const head = buildHead(route);
    const description = head.tags.find((tag) => tag.key === "description")?.content ?? "";
    return `- [${head.title.replace(/\s*\|.*$/, "")}](${SITE_URL}${route === "/" ? "/" : route}): ${description}`;
  };
  const group = (title, list) => [`## ${title}`, "", ...list.map(page), ""];
  const officeLine = (office) => {
    const { streetAddress, addressLocality, addressRegion, postalCode } = office.schema;
    const phone = office.schema.omitTelephone ? "" : `, phone ${office.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`;
    return `- ${office.shortName}${office.isHeadOffice ? " (head office)" : ""}: ${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}${phone}. Details: ${SITE_URL}/contact#${office.id}`;
  };
  return [
    `# ${site.name}`,
    "",
    `> ${seo.schema.organization.description}`,
    "",
    `${site.name} (${nav.footer.legalName}) helps individuals, families, business owners, executors and trustees with Canadian tax. Clients can file in person at an office, drop off documents, work with a tax expert remotely, or file themselves with the LeadTax online software.`,
    "",
    "## Contact",
    "",
    `- Phone (toll-free): ${site.contact.tollFree}`,
    `- Email: ${site.contact.email}`,
    `- Website: ${SITE_URL}`,
    `- Contact page: ${SITE_URL}/contact`,
    "",
    `## Offices (${offices.length})`,
    "",
    ...offices.map(officeLine),
    "",
    ...pageGroups(routes, servicePages).flatMap(([name, list]) => group(name === "Legal" ? "Optional" : name, list)),
  ].join("\n");
}

/** The groups of pages both llms.txt and sitemap.html list, in order. */
function pageGroups(routes, servicePages) {
  const keep = (list) => list.filter((route) => routes.includes(route));
  return [
    ["Services", keep(Object.keys(servicePages))],
    ["Ways to file", keep(["/file-in-person", "/drop-off", "/file-remotely", "/file-online"])],
    ["Pricing and help", keep(["/pricing", "/faq", "/tax-dates", "/tax-calculator", "/support"])],
    ["About", keep(["/", "/about", "/contact", "/career", "/blog"])],
    ["Blog", routes.filter((route) => route.startsWith("/blog/"))],
    ["Legal", keep(["/terms", "/privacy-policy"])],
  ];
}

/** A plain, human-readable sitemap page with every page, grouped like the site's menus. */
function sitemapHtml(routes, buildHead, servicePages) {
  const title = (route) => escapeHtml(buildHead(route).title.replace(/\s*\|.*$/, ""));
  const sections = pageGroups(routes, servicePages)
    .map(([name, list]) => `    <section>\n      <h2>${name}</h2>\n      <ul>\n${list.map((route) => `        <li><a href="${route}">${title(route)}</a></li>`).join("\n")}\n      </ul>\n    </section>`)
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sitemap | LeadTax</title>
  <meta name="description" content="Every page on the LeadTax website: tax services, ways to file, pricing, help and the blog." />
  <link rel="canonical" href="${SITE_URL}/sitemap" />
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; color: #111827; background: #f9fafb; }
    header { background: #1769ff; color: #fff; padding: 24px; }
    header a { color: #fff; font-weight: 700; text-decoration: none; font-size: 22px; }
    main { max-width: 960px; margin: 0 auto; padding: 32px 24px; display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
    h1 { grid-column: 1 / -1; margin: 0; font-size: 32px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: .08em; color: #1769ff; margin: 0 0 8px; }
    ul { list-style: none; margin: 0; padding: 0; }
    li { padding: 6px 0; }
    a { color: #111827; }
    a:hover { color: #1769ff; }
  </style>
</head>
<body>
  <header><a href="/">LeadTax</a></header>
  <main>
    <h1>Sitemap</h1>
${sections}
  </main>
</body>
</html>
`;
}

// Only used to load the SEO module (and its JSON imports); dependency scanning isn't needed.
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { PAGE_ROUTES, SERVICE_PAGES, buildHead } = await vite.ssrLoadModule("/src/lib/seoHead.js");

  for (const route of PAGE_ROUTES) {
    const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, pageHtml(buildHead(route), route));
  }
  fs.writeFileSync(path.join(DIST, "404.html"), pageHtml(buildHead("/404"), "*"));

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapXml(PAGE_ROUTES));
  fs.writeFileSync(path.join(DIST, "llms.txt"), llmsTxt(PAGE_ROUTES, buildHead, SERVICE_PAGES));
  // /sitemap/index.html so the page has the same clean URL (/sitemap) on every host.
  fs.mkdirSync(path.join(DIST, "sitemap"), { recursive: true });
  fs.writeFileSync(path.join(DIST, "sitemap", "index.html"), sitemapHtml(PAGE_ROUTES, buildHead, SERVICE_PAGES));

  console.log(`Pre-rendered ${PAGE_ROUTES.length} pages and 404.html; wrote sitemap.xml, /sitemap and llms.txt`);
} finally {
  await vite.close();
}
