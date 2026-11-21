import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircleQuestion } from "lucide-react";
import home from "../../content/homepage.json";
import { cx } from "../../lib/cx.js";

// The modal's code (and its dialog library) loads only when someone first opens it.
const loadQuickQuery = () => import("../../sections/home/QuickQuery.jsx");
const QuickQuery = lazy(loadQuickQuery);

// The pill docks in the corner once the page scrolls past DOCK_AT and comes back above UNDOCK_AT.
// The gap between the two stops it flickering back and forth around a single threshold.
const DOCK_AT = 120;
const UNDOCK_AT = 40;

/** True while the pill should sit docked in the corner. */
function useDocked() {
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setDocked((was) => (was ? window.scrollY > UNDOCK_AT : window.scrollY > DOCK_AT));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return docked;
}

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Hands off between the pill and the docked orb using only transform and opacity, so it stays smooth:
 * the pill shrinks and fades where it is while the orb, already in its own blue, flies from the
 * pill's centre to the corner. Scrolling back up plays it in reverse. Without a pill (`dockOnly`),
 * the orb just rises into the corner.
 */
function useDockMorph(pillRef, dockRef, docked) {
  const first = useRef(true);
  useLayoutEffect(() => {
    const pill = pillRef.current;
    const dock = dockRef.current;
    if (!dock) return;
    const show = (element, visible) => {
      element.style.visibility = visible ? "" : "hidden";
    };
    // Measure without any half-finished hand-off in the way (CSS animations such as the float stay).
    for (const element of [pill, dock].filter(Boolean)) {
      for (const animation of element.getAnimations()) if (!(animation instanceof CSSAnimation)) animation.cancel();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (first.current || reduceMotion) {
      first.current = false;
      if (pill) show(pill, !docked);
      show(dock, docked);
      return;
    }

    const atCorner = { transform: "translate(0, 0) scale(1)", opacity: 1 };
    if (!pill) {
      const below = { transform: "translateY(24px) scale(0.6)", opacity: 0 };
      show(dock, true);
      if (docked) dock.animate([below, atCorner], { duration: 500, easing: EASE_OUT });
      else dock.animate([atCorner, below], { duration: 250, easing: "ease-in", fill: "forwards" }).onfinish = () => show(dock, false);
      return;
    }

    const p = pill.getBoundingClientRect();
    const d = dock.getBoundingClientRect();
    const atPill = {
      transform: `translate(${p.left + p.width / 2 - (d.left + d.width / 2)}px, ${p.top + p.height / 2 - (d.top + d.height / 2)}px) scale(0.6)`,
      opacity: 0,
    };
    const pillShown = { transform: "scale(1)", opacity: 1 };
    const pillGone = { transform: "scale(0.8)", opacity: 0 };

    show(pill, true);
    show(dock, true);
    if (docked) {
      pill.animate([pillShown, pillGone], { duration: 200, easing: "ease-in", fill: "forwards" }).onfinish = () => show(pill, false);
      dock.animate([atPill, { opacity: 1, offset: 0.2 }, atCorner], { duration: 700, easing: EASE_OUT });
    } else {
      dock.animate([atCorner, { opacity: 1, offset: 0.8 }, atPill], { duration: 450, easing: "cubic-bezier(0.55, 0, 0.75, 0.2)", fill: "forwards" }).onfinish = () =>
        show(dock, false);
      pill.animate([pillGone, pillShown], { duration: 300, delay: 300, easing: EASE_OUT, fill: "backwards" });
    }
  }, [docked, pillRef, dockRef]);
}

/**
 * Floating "Quick question" pill placed over a hero image; opens the quick question modal.
 * It drifts gently up and down (paused on hover/focus, off for reduced motion). Once the page
 * scrolls, it shrinks into a blue, softly morphing orb in the bottom-right corner, and grows back
 * when the page returns to the top. `className` positions the pill inside the image's (relative) wrapper.
 * `dockOnly` leaves out the pill (pages whose hero already shows the form) and keeps just the orb.
 */
export default function QuickQueryButton({ className = "", dockOnly = false }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pillRef = useRef(null);
  const dockRef = useRef(null);
  const docked = useDocked();
  useDockMorph(pillRef, dockRef, docked);

  const label = home.hero.note.label;
  const triggerProps = {
    type: "button",
    onPointerEnter: loadQuickQuery,
    onFocus: loadQuickQuery,
    onClick: () => {
      setMounted(true);
      setOpen(true);
    },
  };

  return (
    <>
      {!dockOnly && (
        <button
          ref={pillRef}
          {...triggerProps}
          aria-hidden={docked || undefined}
          tabIndex={docked ? -1 : undefined}
          className={cx(
            "float absolute z-20 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand shadow-xl ring-1 ring-black/5 transition-colors hover:bg-brand-subtle",
            className,
          )}
        >
          <MessageCircleQuestion aria-hidden="true" className="h-5 w-5" />
          {label}
        </button>
      )}
      {/* Rendered into <body> so no hero's stacking context can put page content above it. */}
      {createPortal(
        <button
          ref={dockRef}
          {...triggerProps}
          aria-label={label}
          aria-hidden={!docked || undefined}
          tabIndex={docked ? undefined : -1}
          style={{ visibility: "hidden" }}
          className="blob fixed bottom-4 rounded-full right-4 z-30 flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden bg-brand text-white shadow-[0_12px_32px_-8px_rgb(23_127_248/0.7)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
        >
          {/* A slow swirl of lighter and deeper blues inside the orb. */}
          <span
            aria-hidden="true"
            className="blob-swirl absolute -inset-1/2 bg-[conic-gradient(from_0deg,#177ff8,#6cb8ff,#0b4fd8,#3d95ff,#177ff8)] opacity-90"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.45),transparent_55%)]" />
          <MessageCircleQuestion aria-hidden="true" className="relative h-6 w-6 md:h-7 md:w-7" />
        </button>,
        document.body,
      )}
      {mounted && (
        <Suspense fallback={null}>
          <QuickQuery open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  );
}
