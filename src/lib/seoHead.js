/**
 * Everything that goes in a page's <head> for SEO: title, meta/OG/Twitter tags, canonical link
 * and JSON-LD. One source for both the browser (components/seo/Seo.jsx) and the build-time
 * pre-render (scripts/prerender.mjs), so crawlers and social previews get the same tags as the
 * running site.
 *
 * Pages that already rank keep their titles and descriptions exactly as published
 * (seo.json → pages). New entries only cover pages that used to share the generic default.
 */
import seo from "../content/seo.json";
import site from "../content/site.json";
import nav from "../content/nav.json";
import faqs from "../content/faqs.json";
import { offices } from "../content/offices.json";
import { posts } from "../content/blog/posts.json";
import servicePages from "../content/service-pages.json";
import bookkeeping from "../content/pages/bookkeeping.json";
import trustEstate from "../content/pages/trust-estate.json";
import crossBorder from "../content/pages/us-cross-border.json";
import { toE164 } from "./phone.js";

const { defaults, meta, schema, pages } = seo;

/** Cities that have an office, in office order. */
const officeCities = [...new Set(offices.map((office) => office.schema.addressLocality))];

/** Route → seo.json page key. */
const PAGE_KEYS = {
  "/": "home",
  "/about": "about",
  "/faq": "faq",
  "/tax-calculator": "taxCalculator",
  "/tax-dates": "taxDates",
  "/support": "support",
  "/drop-off": "dropOff",
  "/file-in-person": "fileInPerson",
  "/file-remotely": "fileRemotely",
  "/file-online": "fileOnline",
  "/us-cross-border": "usCrossBorder",
  "/personal-tax": "personalTax",
  "/corporate-tax": "corporateTax",
  "/bookkeeping": "bookkeeping",
  "/trust-estate-tax": "trustEstateTax",
  "/contact": "contact",
  "/pricing": "pricing",
  "/career": "career",
  "/blog": "blog",
  "/terms": "terms",
  "/privacy-policy": "privacyPolicy",
};

/**
 * The five service pages: their name for breadcrumbs and the Service schema, and the questions
 * their FAQ block shows (published as FAQPage JSON-LD for search and AI answers).
 */
export const SERVICE_PAGES = {
  "/personal-tax": { name: "Personal tax", faqs: servicePages.pages["personal-tax"].faqs },
  "/corporate-tax": { name: "Corporate tax", faqs: servicePages.pages["corporate-tax"].faqs },
  "/bookkeeping": { name: "Bookkeeping", faqs: bookkeeping.faqs },
  "/trust-estate-tax": { name: "Trust & estate tax", faqs: trustEstate.faqs },
  "/us-cross-border": { name: "US & cross-border tax", faqs: crossBorder.faq.items },
};

/** Breadcrumb names for top-level routes (URL slugs alone would read "Us Cross Border"). */
const CRUMB_NAMES = {
  "us-cross-border": "US & Cross-Border",
  "trust-estate-tax": "Trust & Estate",
  "personal-tax": "Personal Tax",
  "corporate-tax": "Corporate Tax",
  "file-in-person": "File in Person",
  "file-remotely": "File Remotely",
  "file-online": "File Online",
  "drop-off": "Drop Off",
  "tax-calculator": "Tax Calculator",
  "tax-dates": "Tax Dates",
  faq: "FAQ",
  "privacy-policy": "Privacy Policy",
};

/** Every route that has its own page, for the pre-render and the sitemap. */
export const PAGE_ROUTES = [...Object.keys(PAGE_KEYS), ...posts.map((post) => `/blog/${post.slug}`)];

const normalize = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

/** "January 8, 2026" → "2026-01-08". */
function isoDate(text) {
  const date = new Date(`${text} 12:00 UTC`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function summary(post) {
  if (post.excerpt) return post.excerpt;
  const first = post.content.find((block) => block.type === "intro" || block.type === "paragraph");
  const text = first?.text ?? "";
  return text.length > 160 ? `${text.slice(0, 157).replace(/\s+\S*$/, "")}...` : text;
}

const absolute = (url) => (url?.startsWith("/") ? `${site.siteUrl}${url}` : url);

/** Title, description and other per-page values for a path. Unknown paths get the 404 values. */
export function pageSeo(pathname) {
  const path = normalize(pathname);
  const key = PAGE_KEYS[path];
  if (key) return { ...defaults, robots: meta.robots, ...pages[key] };

  const slug = path.startsWith("/blog/") ? path.slice(6) : null;
  const post = slug && posts.find((candidate) => candidate.slug === slug);
  if (post) {
    return {
      ...defaults,
      robots: meta.robots,
      title: `${post.title} | LeadTax Blog`,
      description: summary(post),
      ogType: "article",
      ogImage: absolute(post.cardImage ?? post.image) ?? defaults.ogImage,
      article: post,
    };
  }
  return { ...defaults, ...pages.notFound, notFound: true };
}

function postalAddress(office) {
  const { streetAddress, addressLocality, addressRegion, postalCode } = office.schema;
  return { "@type": "PostalAddress", streetAddress, addressLocality, addressRegion, postalCode, addressCountry: "CA" };
}

function siteGraph(pathname, page) {
  const siteUrl = site.siteUrl;
  const mainOffice = offices.find((office) => office.schema.role === "main");
  const departments = offices
    .filter((office) => office.schema.role === "department")
    .sort((a, b) => a.schema.order - b.schema.order);

  const organizationId = `${siteUrl}/#organization`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: nav.footer.legalName,
    url: siteUrl,
    logo: absolute(site.logo),
    description: schema.organization.description,
    foundingDate: schema.organization.foundingDate,
    email: site.contact.email,
    telephone: toE164(site.contact.tollFree),
    address: postalAddress(mainOffice),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: toE164(site.contact.tollFree),
      email: site.contact.email,
      areaServed: "CA",
      availableLanguage: schema.organization.availableLanguage,
    },
    // Order differs from the footer icons; kept as published.
    sameAs: ["x", "facebook", "linkedin", "instagram", "youtube", "tiktok"].map(
      (id) => site.social.find((social) => social.id === id).url,
    ),
  };

  // No SearchAction: the site has no search page (and Google retired the sitelinks search box).
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: "en-CA",
    publisher: { "@id": organizationId },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteUrl}/#business`,
    parentOrganization: { "@id": organizationId },
    name: site.name,
    image: mainOffice.schema.image,
    url: siteUrl,
    telephone: toE164(mainOffice.phone),
    priceRange: schema.priceRange,
    address: postalAddress(mainOffice),
    geo: { "@type": "GeoCoordinates", ...mainOffice.schema.geo },
    department: departments.map((office) => ({
      "@type": "AccountingService",
      name: office.schema.name,
      url: `${siteUrl}/contact#${office.id}`,
      ...(office.schema.omitTelephone ? {} : { telephone: toE164(office.phone) }),
      address: postalAddress(office),
      ...(office.schema.geo ? { geo: { "@type": "GeoCoordinates", ...office.schema.geo } } : {}),
    })),
    areaServed: [
      ...officeCities.map((city) => ({ "@type": "City", name: city })),
      { "@type": "Country", name: "Canada" },
    ],
  };

  const servicePage = SERVICE_PAGES[normalize(pathname)];
  const service = servicePage
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: servicePage.name,
        serviceType: servicePage.name,
        description: page.description,
        url: `${siteUrl}${normalize(pathname)}`,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: [
          ...officeCities.map((city) => ({ "@type": "City", name: city })),
          { "@type": "Country", name: "Canada" },
        ],
      }
    : {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: schema.serviceType,
    provider: { "@type": "Organization", name: site.name },
    areaServed: { "@type": "Country", name: "Canada" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: schema.offerCatalogName,
      itemListElement: schema.offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
  };
  const segments = normalize(pathname).split("/").filter(Boolean);
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name:
        isLast && page.article
          ? page.article.title
          : CRUMB_NAMES[segment] ??
            segment
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
      item: `${siteUrl}/${segments.slice(0, index + 1).join("/")}`,
    });
  });

  const graph = [organization, website, localBusiness, service, breadcrumbs];

  if (page.article) {
    const post = page.article;
    const url = `${siteUrl}${normalize(pathname)}`;
    graph.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: page.description,
      image: page.ogImage,
      datePublished: isoDate(post.date),
      // Credited to the company: the personal author names on some posts are unconfirmed (question 23).
      author: { "@type": "Organization", name: site.name, url: siteUrl },
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: post.category,
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** FAQPage JSON-LD for the FAQ page (also added by FaqSchema while the page is open). */
export function faqSchema(items = faqs.faqPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * The full head for a path: { title, tags, jsonLd }. Each tag is
 * { tag: "meta", attr: "name" | "property", key, content } or { tag: "link", rel, hreflang?, href }.
 * jsonLd is a list of { id, data } (id becomes data-schema).
 */
export function buildHead(pathname) {
  const page = pageSeo(pathname);
  const url = `${site.siteUrl}${normalize(pathname)}`;
  const name = (key, content) => ({ tag: "meta", attr: "name", key, content });
  const property = (key, content) => ({ tag: "meta", attr: "property", key, content });

  const tags = [
    name("description", page.description),
    name("keywords", page.keywords),
    name("author", meta.author),
    name("robots", page.robots),
    name("language", meta.language),
    name("revisit-after", meta.revisitAfter),
    name("rating", meta.rating),
    name("distribution", meta.distribution),
    name("classification", meta.classification),
    name("copyright", `© ${new Date().getFullYear()} ${site.footer.copyright}`),
    name("google-site-verification", site.integrations.googleSiteVerification),
    name("geo.region", meta.geoRegion),
    name("geo.placename", meta.geoPlacename),
    name("geo.position", meta.geoPosition),
    name("ICBM", meta.icbm),
    name("DC.title", page.title),
    name("format-detection", "telephone=yes"),
    property("og:title", page.title),
    property("og:description", page.description),
    property("og:url", url),
    property("og:type", page.ogType),
    property("og:image", page.ogImage),
    property("og:image:width", "1200"),
    property("og:image:height", "630"),
    property("og:image:alt", meta.ogImageAlt),
    property("og:site_name", site.name),
    property("og:locale", meta.ogLocale),
    property("og:locale:alternate", meta.ogLocaleAlternate),
    name("twitter:card", "summary_large_image"),
    name("twitter:title", page.title),
    name("twitter:description", page.description),
    name("twitter:image", page.ogImage),
    name("twitter:image:alt", meta.ogImageAlt),
    name("twitter:site", meta.twitterHandle),
    name("twitter:creator", meta.twitterHandle),
    name("theme-color", meta.themeColor),
    name("apple-mobile-web-app-capable", "yes"),
    name("apple-mobile-web-app-status-bar-style", meta.appleStatusBarStyle),
    name("apple-mobile-web-app-title", site.name),
    { tag: "link", rel: "canonical", href: url },
    { tag: "link", rel: "alternate", hreflang: "en-CA", href: url },
  ];

  const jsonLd = [{ id: "site", data: siteGraph(pathname, page) }];
  if (normalize(pathname) === "/faq") jsonLd.push({ id: "faq", data: faqSchema() });
  // Service pages publish their own questions (id differs from "faq", which FaqSchema manages).
  const servicePage = SERVICE_PAGES[normalize(pathname)];
  if (servicePage?.faqs?.length) jsonLd.push({ id: "service-faq", data: faqSchema(servicePage.faqs) });

  return { title: page.title, tags, jsonLd, notFound: Boolean(page.notFound) };
}
