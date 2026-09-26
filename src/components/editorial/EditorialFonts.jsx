import { useEffect } from "react";

/** Loads the editorial fonts from Google Fonts while the page is mounted, and removes them after. */
export default function EditorialFonts({ href }) {
  useEffect(() => {
    const preconnects = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].map((origin) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      if (origin.includes("gstatic")) link.crossOrigin = "anonymous";
      return link;
    });
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    const links = [...preconnects, stylesheet];
    links.forEach((link) => document.head.appendChild(link));
    return () => links.forEach((link) => link.remove());
  }, [href]);
  return null;
}
