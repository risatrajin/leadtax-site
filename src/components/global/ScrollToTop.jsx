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
      window.scrollTo(0, 0);
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
