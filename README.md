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
| `public/` | Images, `robots.txt`, `sitemap.xml` |
| `scripts/` | Build steps and checks: pre-render, placeholders, header behaviour, screenshot comparison |
| `docs/` | Open questions for the client, known issues, placeholders, image inventory, rebuild notes |

## Before launch

- `docs/questions-for-client.md`: answers needed (hours, prices, legal name, photos, booking links).
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
  and the removed pages `/sign-in`, `/diy-landing`, `/dyi-landing`, `/file-remote-landing`,
  `/home-v2`, `/home-legacy`, `/home-redesign` (→ `/us-cross-border`);
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
