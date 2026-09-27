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

`npm run build` also lists every placeholder that still needs the client's input, and fails if
any enabled link points to "#".

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
| `scripts/` | Checks: placeholders, header behaviour, screenshot comparison |
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
