import { useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx.js";

/**
 * "On this page" links that stick under the site header. Plain text links; the one for the
 * section being read turns the primary colour and gets an underline. One swipeable row on phones.
 * `anchors` are { label, href: "#id" }.
 */
export default function OnThisPage({ anchors }) {
  const [current, setCurrent] = useState(null);
  const navRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const sections = anchors.map((anchor) => document.getElementById(anchor.href.slice(1)));
    let frame = 0;
    const update = () => {
      frame = 0;
      // A section is current once its top passes a little below this bar.
      const line = navRef.current.getBoundingClientRect().bottom + 24;
      let found = null;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= line) found = anchors[index].href.slice(1);
      });
      // At the very bottom the last section may never reach the line, so pick it there.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) found = anchors.at(-1).href.slice(1);
      setCurrent(found);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [anchors]);

  // On phones, keep the current link in view in the swipeable row.
  useEffect(() => {
    const link = current && listRef.current?.querySelector(`a[href="#${current}"]`);
    if (!link) return;
    const list = listRef.current;
    if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
  }, [current]);

  return (
    <nav ref={navRef} aria-label="On this page" className="sticky top-[var(--header-h)] z-40 border-b border-gray-200 bg-white px-4 md:px-8">
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-1 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-24px),transparent)] [scrollbar-width:none] md:gap-8 md:[mask-image:none]"
      >
        {anchors.map((anchor) => {
          const active = anchor.href === `#${current}`;
          return (
            <li key={anchor.href}>
              <a
                href={anchor.href}
                aria-current={active ? "location" : undefined}
                className={cx(
                  "relative inline-flex whitespace-nowrap py-4 text-sm font-semibold transition-colors md:text-base",
                  active ? "text-brand" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {anchor.label}
                <span
                  aria-hidden="true"
                  className={cx("absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand transition-opacity", active ? "opacity-100" : "opacity-0")}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
