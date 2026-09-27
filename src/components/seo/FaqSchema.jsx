import { useEffect } from "react";
import { faqSchema } from "../../lib/seoHead.js";

/** Keeps the FAQPage JSON-LD in the head while the FAQ page is open (the build pre-renders it too). */
export default function FaqSchema({ items }) {
  useEffect(() => {
    let script = document.head.querySelector('script[data-schema="faq"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "faq");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema(items));
    return () => script?.remove();
  }, [items]);
  return null;
}
