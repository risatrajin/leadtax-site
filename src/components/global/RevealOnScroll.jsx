import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Fades page sections in as they scroll into view. Any section that is in view or already
 * scrolled past is shown, so a fast scroll or a jump to an anchor never leaves one hidden.
 * Skipped for people who prefer reduced motion and for automated browsers (screenshots,
 * crawlers that don't scroll). The first section of each page (the hero) is never animated.
 */
export default function RevealOnScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (navigator.webdriver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let pending = [];
    let frame = 0;

    const check = () => {
      frame = 0;
      const trigger = window.innerHeight * 0.9;
      pending = pending.filter((section) => {
        if (section.getBoundingClientRect().top > trigger) return true;
        section.classList.add("is-visible");
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const start = requestAnimationFrame(() => {
      pending = [...document.querySelectorAll("#root section")]
        .filter((section) => !section.closest("header, footer") && !section.parentElement.closest("section"))
        .slice(1)
        .filter((section) => !section.classList.contains("is-visible"));
      pending.forEach((section) => section.classList.add("reveal"));
      window.addEventListener("scroll", onScroll, { passive: true });
      check();
    });

    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
