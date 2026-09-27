import { useEffect } from "react";
import { useLocation } from "react-router";
import { buildHead } from "../../lib/seoHead.js";

/** Find or create the <meta> or <link> for a head tag, then set its value. */
function applyTag(tag) {
  if (tag.tag === "meta") {
    let element = document.head.querySelector(`meta[${tag.attr}="${tag.key}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(tag.attr, tag.key);
      document.head.appendChild(element);
    }
    element.setAttribute("content", tag.content);
    return;
  }
  const selector = tag.hreflang ? `link[rel="${tag.rel}"][hreflang="${tag.hreflang}"]` : `link[rel="${tag.rel}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = tag.rel;
    if (tag.hreflang) element.hreflang = tag.hreflang;
    document.head.appendChild(element);
  }
  element.href = tag.href;
}

function applyJsonLd({ id, data }) {
  let script = document.head.querySelector(`script[data-schema="${id}"]`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Keeps the document head in sync with the current route. The values come from lib/seoHead.js,
 * which the build also uses to pre-render each page's head (scripts/prerender.mjs).
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildHead(pathname);
    document.title = head.title;
    head.tags.forEach(applyTag);
    // The FAQ schema is managed by FaqSchema while the FAQ page is open.
    head.jsonLd.filter((entry) => entry.id !== "faq").forEach(applyJsonLd);
  }, [pathname]);

  return null;
}
