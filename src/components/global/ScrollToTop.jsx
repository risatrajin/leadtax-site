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
    // Pages load on demand, so the target may appear a moment later: keep looking for up to 3s.
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    const started = performance.now();
    const seek = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      else if (performance.now() - started < 3000) frame = requestAnimationFrame(seek);
    };
    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
