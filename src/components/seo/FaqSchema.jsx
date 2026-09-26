import { useEffect } from "react";

/** Adds FAQPage JSON-LD for the given questions while the page is mounted. */
export default function FaqSchema({ items }) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
    let script = document.querySelector('script[data-schema="faq"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", "faq");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => script?.remove();
  }, []);
  return null;
}
