# Known issues

Bugs and odd behaviour carried over from the original build **on purpose**. The rebuild must
render and behave exactly like the original, so none of these are fixed yet. Each entry says
where the behaviour lives in the rebuilt code.

Status legend: **kept** = reproduced in the rebuild; **phase 2** = on a page not rebuilt yet
(found in the audit, to be confirmed while rebuilding).

## Site-wide

| # | Issue | Where | Status |
|---|---|---|---|
| G1 | Fonts referenced as `Google Sans:*` / `Figtree:*` (Figma naming) are never loaded; everything renders in the system font. | inner pages' `font-[...]` classes | phase 2 |
| G2 | `index.html` title is "LeadTax Landing Page Design" until JavaScript runs; no meta description in the HTML. | `index.html` | kept |
| G3 | SEO is client-side only (set in `useEffect`); crawlers that don't run JS see an empty page. | `src/components/seo/Seo.jsx` | kept |
| G4 | `Seo` renders twice: once globally with defaults and again on pages with their own copy. Pages without their own `Seo` show the default title. | `src/App.jsx` | kept |
| G5 | `geo.position` / `ICBM` meta point to Ottawa (45.4215, -75.6972), not Vancouver. | `src/content/seo.json` → `meta` | kept |
| G6 | Meta descriptions say "4 offices"; the site lists 5. | `src/content/seo.json` | kept |
| G7 | Canonical URLs use `https://leadtax.ca`; `sitemap.xml` uses `https://www.leadtax.ca`. | `src/content/site.json`, `public/sitemap.xml` | kept |
| G8 | `sitemap.xml` lists `https://porta.leadtax.ca` (typo for `portal`) and external app subdomains. | `public/sitemap.xml` | kept |
| G9 | `og:image` (`/og-image.png`) and JSON-LD `logo` (`/logo.png`) point to files that don't exist. | `src/content/seo.json` | kept |
| G10 | JSON-LD advertises a site search at `/search?q=` that doesn't exist. | `src/content/seo.json` → `schema.searchUrlTemplate` | kept |
| G11 | JSON-LD main office (100-4350 Hastings) uses the 4125 Hastings photo; 4125 Hastings has no telephone in JSON-LD. | `src/content/offices.json` → `schema` | kept |
| G12 | Head office street is "Hastings Street" in JSON-LD but "Hasting St" (typo) on the Contact page. | `src/content/offices.json` | kept |
| G13 | No catch-all route: unknown URLs (e.g. `/get-started`) render a blank page with no header or footer. | `src/App.jsx` | kept |
| G14 | Favicon is only set by JavaScript. | `src/components/global/Favicon.jsx` | kept |
| G15 | `window.fbq` is replaced with a no-op, so any Facebook pixel in GTM does nothing. | `src/components/global/Analytics.jsx` | kept |
| G16 | `/sitemap.xml` and `/robots.txt` are also React routes; if the host doesn't serve the static files first, crawlers get an HTML page. | route table (phase 2) | phase 2 |
| G17 | Classes `shadow-3xl` and `scrollbar-hide` do nothing (not defined in Tailwind or the site CSS). | Hero image, reviews track | kept |
| G18 | Brand name written both "LeadTax" and "Lead Tax" in copy. | content files | kept |

## Header

| # | Issue | Where | Status |
|---|---|---|---|
| H1 | Desktop dropdowns open on mouse hover only; no keyboard or touch access on large screens. | `Header.jsx` | kept |
| H2 | Desktop hover state and mobile tap state share one variable per menu, so a menu opened on desktop is already expanded if the window is narrowed. | `Header.jsx` | kept |
| H3 | Desktop "Get Started" is medium weight while "Sign In" is bold. | `Header.jsx` → `ACCOUNT_BUTTONS` | kept |
| H4 | "Do It Yourself" links to `/`; the dedicated DIY page (`/diy-landing`) is not linked anywhere. | `nav.json` | kept |

## Homepage

| # | Issue | Where | Status |
|---|---|---|---|
| P1 | "Watch Demo" is an `<a href="#">` that only works once Wistia's script takes it over. | `WistiaPopover.jsx` | kept |
| P2 | Phone copy uses deprecated `document.execCommand("copy")`. | `Hero.jsx` | kept |
| P3 | Reviews are hardcoded (5 cards, "5.0 (206)") with Unsplash stock avatars, not the reviewers' photos. | `reviews.json` | kept |
| P4 | "Accounting and Bookkeeping" card is "Coming Soon" with `link: "#"`; no bookkeeping page exists. | `services.json` | kept |
| P5 | "See all Address" (grammar) on the Find Office card. | `services.json` | kept |
| P6 | "Find Drop-off Location" goes to `/drop-off`, which lists no locations. | `services.json` | kept |
| P7 | Pricing online/expert toggle was never built (empty container); expert tiers and their Calendly links are unreachable. | `DiyPricing.jsx`, `pricing.json` → `expertTiers` | kept |
| P8 | Empty `div.text-center.mt-8` under the pricing cards. | `DiyPricing.jsx` | kept |
| P9 | "Want to file taxes for previous years?" → "Get Started" button does nothing. | `PreviousYearsBanner.jsx` | kept |
| P10 | Final CTA links open in the same tab; every other app link opens a new tab. | `FinalCta.jsx` | kept |
| P11 | Footer email is plain text, not a `mailto:` link. | `Footer.jsx` | kept |

## Inner pages (phase 2, from the audit)

| # | Issue | Page |
|---|---|---|
| X1 | Contact form is hidden (`hidden` class); its submit only `console.log`s and opens `mailto:burnaby@leadtax.ca`. | `/contact` |
| X2 | Email "Vancouverd@leadtax.ca"; 4125 Hastings reuses the head office phone; two offices have no email. | `/contact` |
| X3 | Two offices share one Calendly link; Commercial Dr card has an unused `mapError` flag. | `/contact` |
| X4 | Sign-in form has no submit handler: submitting puts email and password in the URL query string. "Forgot password?" is `href="#"`. | `/sign-in` |
| X5 | Career "Apply Now" ×3 and "Submit Resume" do nothing; a Toronto job is listed although all offices are in BC. | `/career` |
| X6 | FAQ "Contact Support" does nothing. | `/faq` |
| X7 | Blog "Get Started Free" links to `/get-started`, which doesn't exist. | `/blog/:slug` |
| X8 | 5 of 11 blog posts aren't listed on `/blog` or in the sitemap (reachable via "Related Articles"). | `/blog/:slug` |
| X9 | Unknown blog slugs show "Not Found" with HTTP 200 and no `noindex`. | `/blog/:slug` |
| X10 | Prices disagree: FAQ ($19.99/$49.99/$79.99/$99.99), /pricing ($19–99 and $59.99–169.99), JSON-LD ($19–$169). | `/faq`, `/pricing` |
| X11 | /pricing "File Online" tab buttons go to the remote portal; column prices don't change with the tab. | `/pricing` |
| X12 | "Start Your Return" on the DIY landing page goes to the remote portal. | `/diy-landing` |
| X13 | Garbled copy, e.g. "Remember you, protect Advanced full service CRA representation…". | `/file-remote-landing` |
| X14 | `/dyi-landing` duplicates `/diy-landing` (typo route). | route table |
| X15 | In-app robots page text differs from `robots.txt`. | `/robots.txt` |
| X16 | 14 files in `public/images` are never used. | `public/images` |
