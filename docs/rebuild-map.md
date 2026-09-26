# Rebuild map

The source of truth is the minified bundle in `original-build/assets/index-ZBPKqb17.js`.
Line numbers below refer to a Prettier-formatted copy of that file (`npx prettier --parser babel`),
which is how the bundle was read. Library code (React, react-dom, react-router, lucide-react) was
not rebuilt; those packages are installed from npm at the same versions.

| Package | Bundle version | Installed |
|---|---|---|
| react / react-dom | 18.3.1 | 18.3.1 |
| react-router | 7.18.2 | 7.18.2 |
| lucide-react | 0.487.0 | 0.487.0 |
| tailwindcss | 4.1.12 | 4.1.12 |

## Routes

Status: **done** = rebuilt and verified pixel-identical; **pending** = phase 2.

| Route | Minified | Line | New file | Status |
|---|---|---|---|---|
| `/` | `K0` | 14753 | `src/pages/HomePage.jsx` | done |
| `/diy-landing`, `/dyi-landing` | `ap` | 15246 | `src/pages/DiyLandingPage.jsx` | pending |
| `/file-remote-landing` | `_1` | 16030 | `src/pages/FileRemoteLandingPage.jsx` | pending |
| `/file-remotely` | `V1` | 16771 | `src/pages/FileRemotelyPage.jsx` | pending |
| `/drop-off` | `av` | 17137 | `src/pages/DropOffPage.jsx` | pending |
| `/file-in-person` | `hv` | 17507 | `src/pages/FileInPersonPage.jsx` | pending |
| `/us-cross-border` | `Ow` | 24343 | `src/pages/UsCrossBorderPage.jsx` | pending |
| `/contact` | `Dw` | 20708 | `src/pages/ContactPage.jsx` | pending |
| `/about` | `Pw` | 21169 | `src/pages/AboutPage.jsx` | pending |
| `/career` | `Fw` | 21356 | `src/pages/CareerPage.jsx` | pending |
| `/blog` | `Lw` | 21655 | `src/pages/BlogPage.jsx` | pending |
| `/blog/:slug` | `Mw` | 21802 | `src/pages/BlogPostPage.jsx` | pending |
| `/faq` | `_w` | 23134 | `src/pages/FaqPage.jsx` | pending |
| `/terms` | `Iw` | 23309 | `src/pages/TermsPage.jsx` | pending |
| `/privacy-policy` | `zw` | 23865 | `src/pages/PrivacyPolicyPage.jsx` | pending |
| `/sign-in` | `Hw` | 25696 | `src/pages/SignInPage.jsx` | pending |
| `/pricing` | `$w` | 26043 | `src/pages/PricingPage.jsx` | pending |
| `/sitemap`, `/sitemap.xml` | `Np` | 26406 | `src/pages/SitemapPage.jsx` | pending |
| `/robots.txt` | `Uw` | 26581 | `src/pages/RobotsPage.jsx` | pending |

## App shell

| Minified | Line | New file | Role |
|---|---|---|---|
| `Gw` | 26706 | `src/App.jsx` | Router, global components, route table |
| `qw` | 26664 | `src/components/global/Favicon.jsx` | Sets favicon + apple-touch-icon at runtime |
| `Dt` | 14448 | `src/components/seo/Seo.jsx` | Title, meta, canonical, JSON-LD |
| `Yw` | 26655 | `src/components/global/ScrollToTop.jsx` | Scroll to top on path change |
| `Vw` | 26683 | `src/components/global/Analytics.jsx` | GTM loader + `fbq` stub |
| `Vg` | 11300 | `src/components/global/IntercomWidget.jsx` | Intercom launcher |
| `Ze` | 12167 | `src/components/layout/Header.jsx` | Header, desktop dropdowns, mobile menu |
| `Qe` | 14151 | `src/components/layout/Footer.jsx` | Footer |

## Homepage sections (`K0`)

| Order | Minified | Line | New file |
|---|---|---|---|
| 1 | `M0` | 12655 | `src/sections/home/Hero.jsx` (+ `src/components/media/WistiaPopover.jsx`) |
| 2 | `pl` | 12847 | `src/sections/shared/ReviewsCarousel.jsx` (also used by `/diy-landing`) |
| 3 | `I0` | 13197 | `src/sections/home/FilingOptions.jsx` |
| 4 | `im` | 13372 | `src/sections/shared/DiyPricing.jsx` (also used by `/diy-landing`) |
| 5 | `H0` | 13589 | `src/sections/home/PreviousYearsBanner.jsx` |
| 6 | `W0` | 13649 | `src/sections/home/TrustFeatures.jsx` |
| 7 | `U0` | 13716 | `src/sections/home/HowItWorks.jsx` |
| 8 | `q0` | 13778 | `src/sections/home/TaxTools.jsx` |
| 9 | `V0` | 13822 | `src/sections/home/ExpertHelpCta.jsx` |
| 10 | `X0` | 13880 | `src/sections/home/ExpertAddons.jsx` |
| 11 | `Q0` | 14042 | `src/sections/home/HomeFaq.jsx` |
| 12 | `J0` | 14094 | `src/sections/home/FinalCta.jsx` |

## Shared UI components

Copy-pasted markup in the bundle, now one component each.

| Component | Replaces |
|---|---|
| `src/components/ui/Button.jsx` | ~15 inline pill buttons/links (variants: primary, inverse, outline, outlineMuted, outlineInverse, ghost, disabled) |
| `src/components/ui/Card.jsx` | White `rounded-2xl` surfaces (filing options, trust features, pricing, reviews) |
| `src/components/ui/SectionHeading.jsx` | The repeated `text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 mb-12` heading |
| `src/components/ui/FaqAccordion.jsx` | FAQ list in `Q0` (other pages' FAQs to be merged in phase 2) |
| `src/components/ui/PricingCard.jsx` | The four hand-written cards in `im` |
| `src/components/ui/CtaBanner.jsx` | Split photo/copy panels `V0` and `J0` |
| `src/components/ui/TikTokIcon.jsx` | Inline TikTok SVG in the footer |
| `OfficeCard` | Contact page office cards — phase 2 |

## Data → content files

| Minified | Line | Content file |
|---|---|---|
| image constants `sm`, `np`, `b0`… | 12147 | paths inlined into the JSON files below; images copied to `public/images/` |
| nav links (inline in `Ze`, `Qe`) | 12194, 14249 | `src/content/nav.json` (header, mobile menu and footer all read it) |
| phone / email (inline ×3) | 12661, 12780, 14414 | `src/content/site.json` → `contact` |
| app URLs (inline, many) | — | `src/content/site.json` → `apps` (content refers to them as `app:diy.register` etc.) |
| social links | 14184 | `src/content/site.json` → `social` |
| reviews `a` | 12848 | `src/content/reviews.json` |
| `_0` | 13132 | `src/content/services.json` |
| `z0`, `O0` | 13304 | `src/content/pricing.json` |
| `B0`, `$0`, `Y0`, `G0` + section copy | 13622–13868 | `src/content/home.json` |
| `Z0` | 13925 | `src/content/faqs.json` → `home` |
| JSON-LD offices, contact-page offices `f` | 14601, 20734 | `src/content/offices.json` (one record per office) |
| SEO defaults, per-page SEO, meta values | 14448–14764 | `src/content/seo.json` |

## Design tokens

`src/styles/tokens.css` defines every brand colour as a Tailwind theme colour.

| Token | Was | Role |
|---|---|---|
| `brand` | `#033D76` | Primary brand: buttons, brand text, footer |
| `brand-strong` | `#022A54` | Hover/pressed state, gradient ends |
| `brand-subtle` | `#CAE1FF` | Tints, icon wells, text on brand backgrounds |
| `brand-raised` | `#044385` | Raised brand surfaces (inner pages) |
| `brand-highlight` | `#044994` | Highlight stop in the hero gradient |
| `brand-fade` | `#81ABDC` | End of the "Need Expert Help?" gradient |
| `rating` | `#FDB022` | Review stars |
| `google`, `google-hover` | `#1A73E8`, `#1557B0` | Google review button/link |
| `promo-from`, `promo-to` | `#84CC16`, `#65A30D` | Green backdrop in the final CTA |

`src/styles/globals.css` reproduces the Figma Make / shadcn base layer from the original CSS
(heading sizes, `--radius` scale, `animate-fadeIn`). Remaining hex values used only on inner
pages (`#5E5E5E`, `#E8F4F8`, `#E8A020`, `#4E4E4E`, `#233E85`, `#1A263A`, `#022D5A`, `#F8F9FB`)
get tokens in phase 2.
