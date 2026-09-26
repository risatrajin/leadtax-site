# Known issues

Bugs and odd behaviour carried over from the original build **on purpose**. The rebuild must
render and behave exactly like the original, so none of these are fixed yet. Each entry says
where the behaviour lives in the rebuilt code.

Items that only the client can answer are collected as plain questions in
[questions-for-client.md](questions-for-client.md).

Status: **kept** = reproduced in the rebuild; **dropped** = on a page that was not rebuilt
(copy archived in `src/content/archive/`); **resolved** = no longer applies after a scope decision;
**fixed** = deliberately corrected after the rebuild.

## Site-wide

| # | Issue | Where | Status |
|---|---|---|---|
| G1 | The CSS names `Google Sans:*` / `Figtree:*` fonts (Figma naming) that are never loaded. Only the archived DIY landing page used them; every rebuilt page renders in the system font. | archived page | dropped |
| G2 | `index.html` title is "LeadTax Landing Page Design" until JavaScript runs; no meta description in the HTML. | `index.html` | kept |
| G3 | SEO is client-side only (set in `useEffect`); crawlers that don't run JS see an empty page. | `src/components/seo/Seo.jsx` | kept |
| G4 | `Seo` renders twice: globally with defaults and again on pages with their own copy. Pages without their own SEO show the default title and description: `/file-remotely`, `/us-cross-border`, `/career`, `/blog`, every blog post, `/terms`, `/privacy-policy`. | `src/App.jsx`, `src/content/seo.json` | kept |
| G5 | `geo.position` / `ICBM` meta point to Ottawa (45.4215, -75.6972), not Vancouver. | `src/content/seo.json` → `meta` | kept |
| G6 | Meta descriptions say "4 offices" (site default, home, about, in person, contact); the site lists 5. | `src/content/seo.json` | kept |
| G7 | Canonical URLs use `https://leadtax.ca`; `sitemap.xml` uses `https://www.leadtax.ca`. | `src/content/site.json`, `public/sitemap.xml` | kept |
| G8 | `sitemap.xml` lists `https://porta.leadtax.ca` (typo for `portal`) and external app subdomains. | `public/sitemap.xml` | kept |
| G9 | `og:image` (`/og-image.png`) and JSON-LD `logo` (`/logo.png`) point to files that don't exist. | `src/content/seo.json` | kept |
| G10 | JSON-LD advertises a site search at `/search?q=` that doesn't exist. | `src/content/seo.json` → `schema.searchUrlTemplate` | kept |
| G11 | JSON-LD main office (100-4350 Hastings) uses the 4125 Hastings photo; 4125 Hastings has no telephone in JSON-LD. | `src/content/offices.json` → `schema` | kept |
| G12 | Head office street is "Hastings Street" in JSON-LD but "Hasting St" (typo) on the Contact page. | `src/content/offices.json` | kept |
| G13 | No catch-all route: unknown URLs render a blank page with no header or footer. This now also applies to the four archived routes and to `/sitemap`. | `src/App.jsx` | kept |
| G14 | Favicon is only set by JavaScript. | `src/components/global/Favicon.jsx` | kept |
| G15 | `window.fbq` is replaced with a no-op, so any Facebook pixel in GTM does nothing. | `src/components/global/Analytics.jsx` | kept |
| G16 | `/sitemap.xml` and `/robots.txt` were also React routes that could shadow the static files. | — | resolved: React routes not recreated; static files in `public/` |
| G17 | Classes `shadow-3xl`, `scrollbar-hide`, `prose`, `prose-lg` do nothing (not defined; no typography plugin). | Hero, reviews, About, legal pages, blog posts | kept |
| G18 | Brand name written "LeadTax", "Lead Tax" and "Lead TAX" in copy. | content files | kept |
| G19 | Company legal name differs: "Lead Tax Group Inc." (Terms, Privacy intro) vs "Lead Tax Inc." (Privacy §1 and contact box). | `src/content/pages/terms.json`, `privacy-policy.json` | kept |
| G20 | Several pages have no `<main>` element: home, service pages, US cross-border, pricing. | page components | kept |
| G21 | Footer link "Sitemap" went to `/sitemap`, which was not rebuilt and rendered blank. | — | resolved: the site-wide footer has no Sitemap link (`public/sitemap.html` still exists) |
| G22 | Pricing disagrees across the site (see P7, X10, X11, X16). | several | kept |

## Header and footer

The original header and footer were replaced by one site-wide `SiteHeader` and `SiteFooter` (step 2 of the redesign), so these entries no longer apply.

| # | Issue | Where | Status |
|---|---|---|---|
| H1 | Desktop dropdowns opened on mouse hover only; no keyboard or touch access on large screens. | — | fixed: menus open on click or hover, close on Escape |
| H2 | Desktop hover state and mobile tap state shared one variable per menu. | — | resolved |
| H3 | Desktop "Get Started" was medium weight while "Sign In" was bold. | — | resolved |
| H4 | "Do It Yourself" linked to `/`. | — | resolved: "File online yourself" goes to the DIY app |
| H5 | Footer email was plain text, not a `mailto:` link. | — | fixed |
| H6 | The logo's navy "Lead" was hard to read on the navy footer (same as the original footer). | `SiteFooter.jsx` | fixed for now: rendered white with a CSS filter until a reversed logo file arrives (question 35) |

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
| P9 | "Want to file taxes for previous years?" → "Get Started" does nothing. | `PreviousYearsBanner.jsx` | kept |
| P10 | Final CTA links open in the same tab; other app links open a new tab. | `FinalCta.jsx` | kept |

## Inner pages

| # | Issue | Page / where | Status |
|---|---|---|---|
| X1 | Contact form is hidden (`hidden` class); its submit only `console.log`s and opens `mailto:` to the head office email. | `/contact`, `ContactForm.jsx` | kept |
| X2 | Office email "Vancouverd@leadtax.ca" (odd capital and letter); 4125 Hastings reuses the head office phone; Kingsway and 4125 Hastings have no email. | `offices.json` | kept |
| X3 | Commercial Dr and 4125 Hastings share one Calendly link; Commercial Dr has an unused `mapError` flag; only the head office opens the expert picker. | `offices.json` | kept |
| X4 | Expert picker lists "US Tax Expert" and "Tax Expert" as names. | `contact.json` | kept |
| X5 | Career "Apply Now" ×3 and "Submit Resume" do nothing; a Toronto job is listed although all offices are in BC. | `/career` | kept |
| X6 | FAQ page "Contact Support" does nothing. | `/faq` | kept |
| X7 | Blog "Get Started Free" links to `/get-started`, which doesn't exist. | `blog.json` → `post.cta` | kept |
| X8 | 5 of 11 blog posts aren't listed on `/blog` or in the sitemap (reachable via "Related Articles"). | `posts.json` (no `excerpt`) | kept |
| X9 | Unknown blog slugs show "Not Found" with HTTP 200 and no `noindex`. | `BlogPostPage.jsx` | kept |
| X10 | FAQ page prices ($19.99 / $49.99 / $79.99 / $99.99) disagree with the homepage and /pricing ($19 / $39 / $69 / $99, expert $59.99–$169.99) and JSON-LD ("$19 - $169"). | `faqs.json` → `faqPage` | kept |
| X11 | /pricing: both tabs' "Get Started" go to the remote portal; the File Remotely tab shows no prices; "Review and file" add-on prices appear only on the File Online tab. | `pricing.json` → `comparison` | kept |
| X12 | Two different refund guarantees: /faq "refund your service fee and pay any difference" vs /pricing "reimburse penalties and interest up to $1,000". | `faqs.json`, `pages/pricing.json` | kept |
| X13 | Related Articles cards show a gradient placeholder instead of the post photo. | `RelatedArticles.jsx` | kept |
| X14 | Six blog posts credit named authors (Sarah Johnson, Michael Chen, Emily Rodriguez, David Thompson "CPA", Jennifer Lee, Robert Martinez) who look like placeholders. | `posts.json` | kept |
| X15 | US cross-border hero "Schedule Consultation" is navy on a navy gradient (very low contrast). | `CrossBorderHero.jsx` | kept |
| X16 | US cross-border prices $299 / $599 / $999 CAD; "Most Popular" is Professional there but Deluxe on /pricing. | `us-cross-border.json` | kept |
| X17 | US cross-border claims "15+ Years of Experience" while JSON-LD says founded 2020; also "IRS-Certified Experts", "500+", "98%", "100% Compliance Guarantee". | `us-cross-border.json` | kept |
| X18 | Drop-off: audience item "Prefer in-person handling — For those who value personal service without in-person meetings" contradicts itself; "during our business hours" but hours are never listed. | `drop-off.json` | kept |
| X19 | In Person: "Local offices across Canada" (all offices are in BC); "CRA and Revenu Québec compliant". | `file-in-person.json` | kept |
| X20 | In Person hero's first button has an extra `block` class (only difference from Drop-off). | `file-in-person.json` → `block: true` | kept |
| X21 | "What to bring", "Drop off your documents" and cross-border "Learn More" download files from Google Drive. | `site.json` → `downloads` | kept |
| X24 | The Commercial Dr photo is a gallery screenshot with carousel arrows baked in; no crop hides them at every breakpoint. The office shows a flagged photo placeholder on /contact and /home-v2 until a clean photo arrives (question 38). | `offices.json` → `photo` | fixed |
| X23 | Blog card images were shifted: "2026 Tax Filing Deadlines" showed the estate-tax artwork and "Avoid Heavy Estate Taxes" showed the e-commerce artwork. Now each post shows its own artwork; the deadlines card uses its article photo. | `posts.json` → `cardImage` | fixed |
| X22 | About stats "10K+ / 99% / 24/7" and FAQ claims (French support, "regularly audited") are unverified. | `about.json`, `faqs.json` | kept |

## Dropped pages (archived, from the audit)

| # | Issue | Page | Status |
|---|---|---|---|
| D1 | Sign-in form had no submit handler: submitting put email and password in the URL. | `/sign-in` | dropped |
| D2 | "Start Your Return" on the DIY landing page went to the remote portal. | `/diy-landing` | dropped |
| D3 | Garbled copy, e.g. "Remember you, protect Advanced full service CRA representation…". | `/file-remote-landing` | dropped |
| D4 | `/dyi-landing` duplicated `/diy-landing` (typo route). | route table | dropped |
| D5 | In-app robots page text differed from `robots.txt`. | `/robots.txt` React route | resolved |

## Assets

| # | Issue | Where | Status |
|---|---|---|---|
| A1 | 14 files in `public/images` are never used. | `public/images` | kept |
