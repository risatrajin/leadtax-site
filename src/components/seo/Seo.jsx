import { useEffect } from "react";
import { useLocation } from "react-router";
import seo from "../../content/seo.json";
import site from "../../content/site.json";
import { offices } from "../../content/offices.json";
import { toE164 } from "../../lib/phone.js";

const { defaults, meta, schema } = seo;

/** Find a <meta> by selector, creating it (with its name/property) if missing, then set content. */
function setMeta(selector, attribute, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (attribute === "name" || attribute === "property") {
      element.setAttribute(attribute, selector.match(/\[.*?="(.*?)"\]/)?.[1] || "");
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(selector, create) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    create(element);
    document.head.appendChild(element);
  }
  return element;
}

function postalAddress(office) {
  const { streetAddress, addressLocality, addressRegion, postalCode } = office.schema;
  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry: "CA",
  };
}

function buildStructuredData(pathname) {
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
      itemListElement: schema.offers.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
  };
  const segments = pathname.split("/").filter(Boolean);
  segments.forEach((segment, index) => {
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      item: `${siteUrl}/${segments.slice(0, index + 1).join("/")}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness, service, breadcrumbs],
  };
}

/**
 * Client-side SEO: sets the document title, meta/OG/Twitter tags, canonical link
 * and JSON-LD after render. Rendered once globally with defaults and again by
 * pages that override title/description/keywords (and `robots`, e.g. to noindex a draft).
 */
export default function Seo({
  title = defaults.title,
  description = defaults.description,
  keywords = defaults.keywords,
  ogImage = defaults.ogImage,
  ogType = defaults.ogType,
  robots = meta.robots,
}) {
  const { pathname } = useLocation();
  const url = `${site.siteUrl}${pathname}`;

  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[name="keywords"]', "name", keywords);
    setMeta('meta[name="author"]', "name", meta.author);
    setMeta('meta[name="robots"]', "name", robots);
    setMeta('meta[name="language"]', "name", meta.language);
    setMeta('meta[name="revisit-after"]', "name", meta.revisitAfter);
    setMeta('meta[name="rating"]', "name", meta.rating);
    setMeta('meta[name="distribution"]', "name", meta.distribution);
    setMeta('meta[name="classification"]', "name", meta.classification);
    setMeta('meta[name="copyright"]', "name", `© ${new Date().getFullYear()} ${site.footer.copyright}`);
    setMeta('meta[name="google-site-verification"]', "name", site.integrations.googleSiteVerification);
    setMeta('meta[name="geo.region"]', "name", meta.geoRegion);
    setMeta('meta[name="geo.placename"]', "name", meta.geoPlacename);
    setMeta('meta[name="geo.position"]', "name", meta.geoPosition);
    setMeta('meta[name="ICBM"]', "name", meta.icbm);
    setMeta('meta[name="DC.title"]', "name", title);
    setMeta('meta[name="format-detection"]', "name", "telephone=yes");
    setMeta('meta[name="viewport"]', "name", "width=device-width, initial-scale=1.0");
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:url"]', "property", url);
    setMeta('meta[property="og:type"]', "property", ogType);
    setMeta('meta[property="og:image"]', "property", ogImage);
    setMeta('meta[property="og:image:width"]', "property", "1200");
    setMeta('meta[property="og:image:height"]', "property", "630");
    setMeta('meta[property="og:image:alt"]', "property", meta.ogImageAlt);
    setMeta('meta[property="og:site_name"]', "property", site.name);
    setMeta('meta[property="og:locale"]', "property", meta.ogLocale);
    setMeta('meta[property="og:locale:alternate"]', "property", meta.ogLocaleAlternate);
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", ogImage);
    setMeta('meta[name="twitter:image:alt"]', "name", meta.ogImageAlt);
    setMeta('meta[name="twitter:site"]', "name", meta.twitterHandle);
    setMeta('meta[name="twitter:creator"]', "name", meta.twitterHandle);

    const canonical = upsertLink('link[rel="canonical"]', (link) => {
      link.rel = "canonical";
    });
    canonical.href = url;

    const alternate = upsertLink('link[rel="alternate"][hreflang="en-CA"]', (link) => {
      link.rel = "alternate";
      link.hreflang = "en-CA";
    });
    alternate.href = url;

    setMeta('meta[name="theme-color"]', "name", meta.themeColor);
    setMeta('meta[name="apple-mobile-web-app-capable"]', "name", "yes");
    setMeta('meta[name="apple-mobile-web-app-status-bar-style"]', "name", meta.appleStatusBarStyle);
    setMeta('meta[name="apple-mobile-web-app-title"]', "name", site.name);

    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(buildStructuredData(pathname));
  }, [title, description, keywords, ogImage, ogType, robots, url, pathname]);

  return null;
}
