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
import faqs from "../content/faqs.json";
import { offices } from "../content/offices.json";
import { posts } from "../content/blog/posts.json";
import { toE164 } from "./phone.js";

const { defaults, meta, schema, pages } = seo;

/** Route → seo.json page key. */
const PAGE_KEYS = {
  "/": "home",
  "/about": "about",
  "/faq": "faq",
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

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: schema.organization.logo,
    description: schema.organization.description,
    foundingDate: schema.organization.foundingDate,
    address: { "@type": "PostalAddress", addressCountry: "CA", addressRegion: "Canada" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "CA",
      availableLanguage: schema.organization.availableLanguage,
    },
    // Order differs from the footer icons; kept as published.
    sameAs: ["x", "facebook", "linkedin", "instagram", "youtube", "tiktok"].map(
      (id) => site.social.find((social) => social.id === id).url,
    ),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: schema.searchUrlTemplate },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.name,
    image: mainOffice.schema.image,
    url: siteUrl,
    telephone: toE164(mainOffice.phone),
    priceRange: schema.priceRange,
    address: postalAddress(mainOffice),
    geo: { "@type": "GeoCoordinates", ...mainOffice.schema.geo },
    department: departments.map((office) => ({
      "@type": "FinancialService",
      name: office.schema.name,
      ...(office.schema.omitTelephone ? {} : { telephone: toE164(office.phone) }),
      address: postalAddress(office),
    })),
    areaServed: { "@type": "Country", name: "Canada" },
  };

  const service = {
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
          : segment
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
      publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: schema.organization.logo } },
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

  return { title: page.title, tags, jsonLd, notFound: Boolean(page.notFound) };
}
