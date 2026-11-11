# LeadTax website

Marketing site for LeadTax (tax filing in Vancouver and Burnaby). React 18, React Router 7,
Vite 7 and Tailwind CSS 4. All copy lives in JSON under `src/content/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

`npm run build` also:
- pre-renders each page's SEO head (title, meta, canonical, JSON-LD) into `dist/<route>/index.html`
  and writes `dist/404.html`, so crawlers and social previews don't depend on JavaScript;
- lists every placeholder that still needs the client's input, and fails if any enabled link
  points to "#".

## Project layout

| Path | What's there |
|---|---|
| `src/pages/` | One component per route (routes are in `src/App.jsx`) |
| `src/sections/` | Page sections, grouped by page |
| `src/components/` | Shared layout (header, footer), UI pieces, SEO |
| `src/content/` | All site copy and data (offices, navigation, reviews, pricing, SEO) |
| `src/lib/` | Small helpers (links, offices, icons, shared card styles) |
| `src/styles/` | Design tokens and base styles |
| `public/` | Images, `robots.txt`, host configs (`.htaccess`, `_redirects`) |
| `scripts/` | Build steps and checks: pre-render, placeholders, header behaviour, screenshot comparison |
| `docs/` | Open questions for the client, known issues, placeholders, image inventory, rebuild notes |

## Before launch

- `docs/questions-for-client.md`: answers needed (legal name, photos, booking links). Hours,
  bookkeeping prices and the enquiry inbox (info@) are answered.
- `docs/placeholders.md` and `npm run placeholders`: every value still marked `[TBD]` or unconfirmed.
- `docs/known-issues.md`: issues carried over from the original site and what was fixed.

Links to pages that don't exist yet are switched off with `"enabled": false` in
`src/content/nav.json`; switch them on when the page is added.

## Checks

```bash
npm run check:header    # 20 header menu behaviour checks (dev server running)
npm run baseline:save   # store screenshots of every route
npm run compare         # compare the site with the stored screenshots
```

## Deploy (Coolify or any Docker host)

The `Dockerfile` builds the site and serves `dist/` with nginx (`deploy/nginx.conf`):
- every page is served from its pre-rendered HTML; unknown paths return a real 404 with the
  site's 404 page;
- 301 redirects: `www.leadtax.ca` → `leadtax.ca` (the host Google indexes), trailing slashes,
  and the removed pages `/sign-in`, `/file-remote-landing`, `/diy-landing` and `/dyi-landing`
  (→ `/file-online`), `/home-v2`, `/home-legacy`, `/home-redesign` (→ `/us-cross-border`);
- security headers (HSTS, nosniff, frame and referrer policies) and a Content-Security-Policy
  in **report-only** mode. Check the browser console on the live site for CSP reports (tags
  added in Google Tag Manager may need more sources), then switch the header to
  `Content-Security-Policy`;
- long-lived caching for hashed assets, gzip.

In Coolify: add both `leadtax.ca` and `www.leadtax.ca` to the app, build pack "Dockerfile", port 80.

## Deploy on Vercel

`vercel.json` holds the same setup as the nginx config: build `npm run build`, output `dist/`,
clean URLs without trailing slashes, the 301 redirects (removed pages, `www` → `leadtax.ca`),
security headers (CSP in report-only mode) and asset caching. Vercel serves `dist/404.html` with
a 404 status for unknown paths. Import the repo in Vercel; no framework preset is needed.

## Deploy anywhere else (Apache / cPanel, Netlify, Cloudflare Pages, any static host)

`npm run build` writes a complete static site to `dist/`; upload its contents. Host config for
the same rules ships inside `dist/`:

| Host | File | Notes |
|---|---|---|
| Apache, cPanel, LiteSpeed (most shared hosting) | `.htaccess` | needs `mod_rewrite`; tested on Apache 2.4 |
| Netlify | `_redirects` | the `www` rule is Netlify-only |
| Cloudflare Pages | `_redirects` | set `www` → `leadtax.ca` as a Bulk Redirect in Cloudflare |
| Docker / Coolify | `deploy/nginx.conf` | see above |
| Vercel | `vercel.json` | see above |

Whatever the host, these must hold for SEO (check them after the first deploy):

1. `https://www.leadtax.ca/...` and `http://...` answer **301** to `https://leadtax.ca/...`
   (the host Google indexes).
2. `/about` serves `about/index.html` with status 200, and `/about/` redirects to `/about`.
3. Unknown paths return **404** with `404.html`, not the homepage.
4. The old addresses (`/business-tax`, `/sign-in`, `/diy-landing` …) answer 301.
5. `/sitemap.xml`, `/robots.txt` and `/llms.txt` load.

## SEO and AI search (GEO)

- Every page's `<head>` (title, description, canonical, Open Graph, JSON-LD) is pre-rendered by
  `scripts/prerender.mjs` from `src/lib/seoHead.js` and `src/content/seo.json`. Titles and
  descriptions of pages that already rank are kept as published; change them only on purpose.
- JSON-LD: Organization, WebSite, AccountingService with each office, BreadcrumbList on every
  page; a Service and FAQPage on the five service pages; BlogPosting on posts; FAQPage on /faq.
- Generated on every build, so they always match the pages:
  - `sitemap.xml`: every page; posts use their publish date.
  - `/sitemap`: a human-readable list of every page.
  - `llms.txt`: a plain-text summary for AI assistants (services, offices, contact, key pages).
- `public/robots.txt` allows search engines and AI search crawlers and points to the sitemap.

After launch on the final domain:
1. Add `https://leadtax.ca` to Google Search Console and Bing Webmaster Tools and submit
   `https://leadtax.ca/sitemap.xml`.
2. Check a few pages in Google's Rich Results Test (structured data) and URL Inspection.
3. Keep office details (address, phone, hours) the same here, on Google Business Profile and in
   directories; AI search compares them.
