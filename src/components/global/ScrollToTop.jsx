import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the top whenever the path changes, or to the element named in the
 * URL hash (e.g. /contact#vancouver-kingsway) once it has rendered.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      // Jump, don't glide, to the top of a new page (in-page links still scroll smoothly).
      window.scrollTo({ top: 0, behavior: "instant" });
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
