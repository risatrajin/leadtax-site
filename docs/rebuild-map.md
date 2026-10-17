# Rebuild map

The site was rebuilt from a minified Vite bundle (`index-ZBPKqb17.js`). That bundle was used for
the rebuild and the pixel comparison and has since been removed from the project (it is still in
the git history). Line numbers below refer to a Prettier-formatted copy of it. Library code (React, react-dom, react-router, lucide-react,
Radix Dialog) was not rebuilt; those packages are installed from npm.

| Package | Bundle version | Installed |
|---|---|---|
| react / react-dom | 18.3.1 | 18.3.1 |
| react-router | 7.18.2 | 7.18.2 |
| lucide-react | 0.487.0 | 0.487.0 |
| tailwindcss | 4.1.12 | 4.1.12 |
| @radix-ui/react-dialog, clsx, tailwind-merge | unknown (bundled) | latest 1.x / 2.x / 3.x |

## Routes

Status: **done** = rebuilt and verified pixel-identical at 1440px and 390px with identical SEO output;
**archived** = not rebuilt, will be dropped, copy kept in `src/content/archive/`;
**static** = served as a file from `public/`; **open** = not rebuilt, needs a decision.

| Route | Minified | Line | New file | Status |
|---|---|---|---|---|
| `/` | — | — | `src/pages/HomePage.jsx` (the redesign, see below) | new homepage |
| `/` | `K0` | 14753 | `src/pages/HomePage.jsx` (service-focused homepage from the developer package; the original DIY homepage was removed, see git history) | done |
| `/home-v2`, `/home-legacy` | — | — | redirect to `/` (keep query and hash) | redirect |
| `/file-remotely` | `V1` | 16771 | `src/pages/FileRemotelyPage.jsx` | done |
| `/drop-off` | `av` | 17137 | `src/pages/DropOffPage.jsx` | done |
| `/file-in-person` | `hv` | 17507 | `src/pages/FileInPersonPage.jsx` | done |
| `/us-cross-border` | — | — | `src/pages/HomePage.jsx` (the redesigned homepage; the rebuilt original cross-border page was removed, see git history) | replaced |
| `/contact` | `Dw` | 20708 | `src/pages/ContactPage.jsx` | done |
| `/about` | `Pw` | 21169 | `src/pages/AboutPage.jsx` | done |
| `/career` | `Fw` | 21356 | `src/pages/CareerPage.jsx` | done |
| `/blog` | `Lw` | 21655 | `src/pages/BlogPage.jsx` | done |
| `/blog/:slug` | `Mw` | 21802 | `src/pages/BlogPostPage.jsx` (all 11 posts + not-found) | done |
| `/faq` | `_w` | 23134 | `src/pages/FaqPage.jsx` | done |
| `/terms` | `Iw` | 23309 | `src/pages/TermsPage.jsx` | done |
| `/privacy-policy` | `zw` | 23865 | `src/pages/PrivacyPolicyPage.jsx` | done |
| `/pricing` | `$w` | 26043 | `src/pages/PricingPage.jsx` | done |
| `/diy-landing`, `/dyi-landing` | `ap` | 15246 | `src/content/archive/diy-landing.json` | archived — not rebuilt, will be dropped |
| `/file-remote-landing` | `_1` | 16030 | `src/content/archive/file-remote-landing.json` | archived — not rebuilt, will be dropped |
| `/sign-in` | `Hw` | 25696 | `src/content/archive/sign-in.json` | archived — not rebuilt, will be dropped |
| `/sitemap.xml` | `Np` | 26406 | `public/sitemap.xml` | static (React route not recreated) |
| `/robots.txt` | `Uw` | 26581 | `public/robots.txt` | static (React route not recreated) |
| `/sitemap` | `Np` | 26406 | — | **open**: not in either list for phase 2. The footer links here and it now renders a blank page. `public/sitemap.html` exists as a static alternative. |

Archived routes now render a blank page in the rebuild (no catch-all route, same as any unknown URL).
Each archive file holds the page's SEO copy, its content in reading order (headings, text, links,
images, form fields) and `otherText`: every other human-readable string from the component source
(hidden accordion answers, alternate states), checked so that nothing was dropped.

## App shell

| Minified | Line | New file | Role |
|---|---|---|---|
| `Gw` | 26706 | `src/App.jsx` | Router, global components, route table |
| `qw` | 26664 | `src/components/global/Favicon.jsx` | Sets favicon + apple-touch-icon at runtime |
| `Dt` | 14448 | `src/components/seo/Seo.jsx` | Title, meta, canonical, JSON-LD |
| `Yw` | 26655 | `src/components/global/ScrollToTop.jsx` | Scroll to top on path change |
| `Vw` | 26683 | `src/components/global/Analytics.jsx` | GTM loader + `fbq` stub |
| `Vg` | 11300 | `src/components/global/IntercomWidget.jsx` | Intercom launcher |
| `Ze` | 12167 | replaced by `src/components/layout/SiteHeader.jsx` | Site-wide header (see below) |
| `Qe` | 14151 | replaced by `src/components/layout/SiteFooter.jsx` | Site-wide footer (see below) |
| — | — | `src/components/layout/PageShell.jsx` | Shared inner-page frame (`min-h-screen flex flex-col` + header, `<main>`, footer) |

## Page sections

### Original homepage (`K0`) — removed

The original DIY homepage and its sections were replaced by the developer package homepage. The table records where they lived before removal.

| Order | Minified | Line | New file |
|---|---|---|---|
| 1 | `M0` | 12655 | `src/sections/home-legacy/Hero.jsx` (+ `src/components/media/WistiaPopover.jsx`) |
| 2 | `pl` | 12847 | `src/sections/shared/ReviewsCarousel.jsx` |
| 3 | `I0` | 13197 | `src/sections/home-legacy/FilingOptions.jsx` |
| 4 | `im` | 13372 | `src/sections/shared/DiyPricing.jsx` |
| 5 | `H0` | 13589 | `src/sections/home-legacy/PreviousYearsBanner.jsx` |
| 6 | `W0` | 13649 | `src/sections/home-legacy/TrustFeatures.jsx` |
| 7 | `U0` | 13716 | `src/sections/home-legacy/HowItWorks.jsx` |
| 8 | `q0` | 13778 | `src/sections/home-legacy/TaxTools.jsx` |
| 9 | `V0` | 13822 | `src/sections/home-legacy/ExpertHelpCta.jsx` |
| 10 | `X0` | 13880 | `src/sections/home-legacy/ExpertAddons.jsx` |
| 11 | `Q0` | 14042 | `src/sections/home-legacy/HomeFaq.jsx` |
| 12 | `J0` | 14094 | `src/sections/home-legacy/FinalCta.jsx` |

### Service pages (`V1`, `av`, `hv`)

The three pages share one template, `src/sections/services/ServicePage.jsx`, with
`variant: "remote"` (File Remotely) or `"local"` (Drop-off, In Person).

| File Remotely | Drop-off | In Person | New file |
|---|---|---|---|
| `I1` 16429 | `G1` 16786 | `sv` 17159 | `src/sections/services/ServiceHero.jsx` |
| `O1` 16480 | `Z1` 16845 | `ov` 17216 | `src/sections/services/ServiceSteps.jsx` |
| `B1` 16550 | `J1` 16915 | `cv` 17286 | `src/sections/services/ServiceBenefits.jsx` |
| `$1` 16620 | `ev` 16979 | `dv` 17351 | `src/sections/services/ServiceAudience.jsx` |
| `Y1` 16702 | `nv` 17060 | `mv` 17432 | `src/sections/services/ServiceTrust.jsx` |
| `q1` 16745 | `rv` 17110 | `fv` 17482 | `src/sections/services/ServiceCta.jsx` |

### Other pages

| Page | New files |
|---|---|
| Contact (`Dw`) | `src/components/ui/OfficeCard.jsx`, `src/sections/contact/ContactForm.jsx`, `src/sections/contact/ExpertPickerDialog.jsx`, `src/components/ui/Dialog.jsx` (shadcn wrapper, bundle lines 20643–20707) |
| Blog post (`Mw`) | `src/sections/blog/PostHeader.jsx`, `PostBody.jsx`, `PostCta.jsx`, `RelatedArticles.jsx` |
| Terms, Privacy (`Iw`, `zw`) | `src/components/legal/LegalDocument.jsx` renders both from JSON |
| Pricing (`$w`) | `src/sections/pricing/ComparisonTable.jsx` |
| FAQ (`_w`) | `src/components/seo/FaqSchema.jsx` (FAQPage JSON-LD) |

## Shared UI components

| Component | Replaces |
|---|---|
| `src/components/ui/Button.jsx` | ~40 inline pill buttons/links. Variants: primary, inverse, inverseTint, outline, outlineMuted, outlineInverse, outlineInverseFill, ghost, disabled. Sizes: sm, md, lg, wide, xl, block |
| `src/components/ui/Card.jsx` | White `rounded-2xl` surfaces |
| `src/components/ui/SectionHeading.jsx` | The repeated homepage section heading |
| `src/components/ui/FaqAccordion.jsx` | FAQ styles: `simple` (homepage), `bordered` (/faq) |
| `src/components/ui/PricingCard.jsx` | DIY package cards |
| `src/components/ui/OfficeCard.jsx` | Contact page office cards (reads `offices.json`) |
| `src/components/ui/CtaBanner.jsx` | Split photo/copy panels on the homepage |
| `src/components/ui/Dialog.jsx` | shadcn Dialog on Radix |
| `src/components/ui/TikTokIcon.jsx` | Inline TikTok SVG |

## Data → content files

| Content | File |
|---|---|
| Phone, email, website, app URLs, downloads, social links, integrations | `src/content/site.json` (content refers to URLs as `app:diy.register`, `download:whatToBring`) |
| Nav links (header, mobile menu, footer) | `src/content/nav.json` |
| Offices (display, JSON-LD, photo, booking link) | `src/content/offices.json` — one record per office |
| SEO defaults and per-page SEO | `src/content/seo.json` |
| FAQs: homepage, /faq | `src/content/faqs.json` |
| DIY tiers, expert tiers, /pricing comparison rows | `src/content/pricing.json` |
| Reviews | `src/content/reviews.json` |
| Homepage copy | `src/content/homepage.json` |
| Service pages (Personal, Corporate, Bookkeeping, Trust & estate) | `src/content/service-pages.json` |
| Closing enquiry form | `src/content/enquiry.json` |
| All 11 blog posts (listing + article) | `src/content/blog/posts.json` |
| Page copy | `src/content/home.json`, `src/content/pages/*.json` |
| Dropped pages | `src/content/archive/*.json` |

## Design tokens

`src/styles/tokens.css` defines every brand colour as a Tailwind theme colour.

| Token | Was | Role |
|---|---|---|
| `brand` | `#033D76` (also `rgb(3,61,118)`) | Primary brand: buttons, brand text, footer |
| `brand-strong` | `#022A54` | Hover/pressed state, gradient ends |
| `brand-subtle` | `#CAE1FF` | Tints, icon wells, text on brand backgrounds |
| `brand-raised` | `#044385` | Reserved (used only on the archived DIY landing page) |
| `brand-highlight` | `#044994` | Highlight stop in hero/CTA gradients |
| `brand-fade` | `#81ABDC` | Drop-off / In Person hero, "Need Expert Help?" gradient |
| `surface-tint` | `#E8F4F8` | Start of soft section gradients |
| `popular` | `#E8A020` | "Most Popular" badge on /pricing |
| `rating` | `#FDB022` | Review stars |
| `google`, `google-hover` | `#1A73E8`, `#1557B0` | Google review button/link |
| `promo-from`, `promo-to` | `#84CC16`, `#65A30D` | Green backdrop in the final homepage CTA |

The remaining hex values in the bundle (`#5E5E5E`, `#4E4E4E`, `#233E85`, `#1A263A`, `#022D5A`,
`#F8F9FB`) appear only on the archived `/diy-landing` and `/file-remote-landing` pages, so no tokens
were added for them.

`src/styles/globals.css` reproduces the Figma Make / shadcn base layer from the original CSS
(heading sizes, `--radius` scale, `animate-fadeIn`).

## Verification

- During the rebuild, every route and 16 interaction states were compared with the original
  build at 1440px and 390px: 0 px different, SEO identical.
- Now: `npm run baseline:save` stores screenshots of every route; `npm run compare` diffs the
  site against them. `npm run check:header` runs 20 header behaviour checks.

## Site-wide header and footer (redesign step 2)

The original header and footer (and the /home-v2 draft's own pair) were replaced by one
`SiteHeader` and one `SiteFooter`, used on every route. Everything they link to comes from
`src/content/nav.json`; offices from `offices.json`; phone, email, social links from `site.json`.

| File | Role |
|---|---|
| `src/components/layout/SiteHeader.jsx` | Utility bar (Client login, phone below 1280px), logo, menus, phone, "Book an appointment" |
| `src/components/layout/site-header/panels.jsx` | Mega-menu panels (Tax services, Locations), dropdowns, feature cards |
| `src/components/layout/site-header/useDesktopMenus.js` | Open/close behaviour: click or hover, Escape, outside click, one menu at a time |
| `src/components/layout/site-header/MobileMenu.jsx` | Full-height panel below 1024px with accordions and a pinned booking button |
| `src/components/layout/SiteFooter.jsx` | Logo, tagline, contact, social, link columns, offices, local links, legal |
| `src/components/ui/SmartLink.jsx` | Link for content records (`to` route or `href` URL/ref) |

Decisions:
- **Client login** sits in a slim utility bar above the main row. The main row doesn't have room
  for it next to five menus, the phone number and the booking button, even at 1440px (content is
  1280px wide). Below 1280px the phone number also moves into the utility bar.
- The original header's "Get started" (register) links are gone from the header; the header links
  to the two portals' login pages. Register links remain in page content (pricing, homepage).
- Office links go to `/contact#<office-id>`; the Contact page's office cards now carry those ids and
  `ScrollToTop` scrolls to a URL hash.

Verification: `node scripts/check-header.mjs` runs 20 behaviour and accessibility checks on the
header.

## Redesigned homepage (built as /home-v2, now the US & cross-border page at `/us-cross-border`)

Same sections, order, copy and behaviour as the first draft, restyled with the site's rules:
brand navy tokens, the system font, the site's heading sizes and weights, `Button` variants,
16px-radius cards with the site's shadows, `py-16 md:py-24` sections in a 1280px container.

| Section | File | Notes |
|---|---|---|
| Hero | `src/sections/home/Hero.jsx` | Navy gradient like the site hero; fixed photo #15; office card, select and dots share state |
| Services | `src/sections/home/Services.jsx` | Two navy tiles (no photo, see image-inventory.md), three white cards |
| Offices | `src/sections/home/Offices.jsx` | Office cards grouped by city (photo, name, address, phone). From 1024px a sticky grayscale Google map (keyless embed, one pin, centred on the selected office) sits on the right with a floating card for the selected office: photo, hours, Book/Directions. Below that the selected card expands with its map, hours and buttons. Showing all offices as pins at once needs a Google Maps API key. |
| First visit | `src/sections/home/FirstVisit.jsx` | Navy number circles, checklist on the brand-subtle panel |
| Other ways to file | `src/sections/home/OtherWays.jsx` | |
| Reviews | `src/sections/home/Reviews.jsx` | Initials instead of stock faces |
| FAQ | `src/sections/home/Faq.jsx`, `src/components/ui/FaqList.jsx` | |
| CTA | `src/sections/home/CtaPanel.jsx` | |

Removed: the `ed-*` tokens, Geist / Instrument Serif and the accent letters, `editorial.css`, and the
`src/components/editorial/` components. The "Tax services near you" grid now lives in the site footer.
`Seo` gained a `robots` prop.
A brand-coloured `:focus-visible` outline now applies site-wide.

## Developer package pages

- `/`, `/personal-tax`, `/corporate-tax`, `/bookkeeping` and `/trust-estate-tax` use the copy from the
  developer package (`LeadTax-Website-Developer-Package/website`), laid out with the site's components.
  The homepage keeps its existing title and description. The cross-border page follows the package's
  newer `cross-border-latest` page at `/us-cross-border`.

## Homepage switch (historical)

- `/` renders the redesign (`src/pages/HomePage.jsx`, copy in `src/content/home.json`, sections in
  `src/sections/home/`). It uses the site's homepage SEO from `seo.json` → `pages.home` and is indexable;
  the structured data (Organization, WebSite, offices, Service, breadcrumbs) comes from `Seo` as on every page.
- `/home-legacy` renders the original DIY homepage (`src/pages/LegacyHomePage.jsx`, copy in
  `src/content/home-legacy.json`, sections in `src/sections/home-legacy/`) with `noindex, follow`.
- `/home-v2` redirects to `/` in the browser (`RedirectTo`, keeps query and hash, replaces history).
  **When deployed, the host should also answer `/home-v2` with a 301 to `/`**, because a client-side
  redirect is invisible to crawlers and link checkers.
- The Personal tax tile on the homepage used to link to `/` (the DIY homepage). It now points to `#`
  and is flagged, like the Personal tax links in the header and footer.
- Comparisons: `/home-legacy` is compared with the original build's `/`; the new `/` is only
  compared with the saved baseline.

## Homepage hero from the client mockup

The hero follows the client's homepage mockup: "Canadian & US Taxes. Simplified.", the subtitle,
"Book an Appointment" and "Find a Location" buttons, a trust row (Google rating from `reviews.json`,
Proudly Canadian, Trusted & Secure), and the five services as cards inside the hero. The separate
"What we can do for you" section was removed (its heading stays in the hero for screen readers).
The office picker that used to be in the hero is gone; each office is still bookable from the
"Visit an office" section.

- Copy: `src/content/home.json` → `hero` (source: client mockup). Service links come from `nav.json`.
- Colours: two new tokens, `brand-bright` (#1459C7, accent word, icons, arrows) and `canada-red`
  (#D52B1E, maple leaf). Buttons stay in the site's navy pill style rather than the mockup's
  square bright-blue buttons.
- Icons: lucide has no flags or maple leaf. The maple leaf is an inline SVG (`MapleLeafIcon`);
  the US & Cross-Border card uses a globe instead of the mockup's two flags.
- Photo: `hero-cross-border-friends-wide.webp` (supplied, Lummi Pro). From 1280px it covers the whole hero with no overlay; the people stand on the right, so the left-aligned white text sits on open sky. The trust row is a separate band under the hero (`TrustBand`). Below 1280px the photo sits on top.
