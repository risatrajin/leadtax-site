import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";
import Collapse from "../../components/ui/Collapse.jsx";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";

/** How long each situation stays open before the next one opens on its own. */
const STEP_MS = 7000;

/** Auto-advance only on wide screens (where the card sits beside the list) and without reduced motion. */
const canAutoplay = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;

/** The open situation's details in a white card on a navy gradient panel. */
function Showcase({ item }) {
  const Icon = getIcon(item.icon);
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-subtle via-brand-fade to-brand-strong p-6 sm:p-10 lg:p-12">
      {/* Soft vertical lines behind the card, echoing the border between two countries. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 h-40 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.35)_0_2px,transparent_2px_22px)] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />
      <div key={item.label} className="situation-in relative rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Icon above the heading on phones, beside it from 640px up. */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand-bright">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-bright">{item.tag}</p>
            <p className="mt-1 text-xl font-semibold leading-snug text-gray-900">{item.title}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-2 rounded-2xl bg-gray-50 p-3">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm">
              <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-bright" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Button to={item.link.to} href={item.link.href} size="block" className="mt-6 gap-2">
          {item.link.label}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

/**
 * "Choose your situation": a showcase card on the left and the situations as a list on the
 * right. The open situation shows its summary and a progress bar; when the bar fills, the next
 * situation opens. Hovering or focusing the section pauses it, clicking a situation opens it,
 * and on small screens or with reduced motion nothing advances on its own.
 */
export default function Situations({ situations }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const sectionRef = useRef(null);
  const items = situations.cards;

  useEffect(() => {
    setAutoplay(Boolean(canAutoplay()));
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const running = autoplay && inView && !paused;
  const next = () => setActive((index) => (index + 1) % items.length);

  return (
    <section
      ref={sectionRef}
      id="situations"
      className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <Showcase item={items[active]} />
        </div>

        <div className="order-1 lg:order-2">
          {situations.eyebrow && (
            <p className="inline-flex rounded-full bg-brand-subtle px-3 py-1 text-sm font-semibold text-brand">
              {situations.eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl text-gray-900 md:text-4xl lg:text-5xl">{situations.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{situations.text}</p>

          <ul className="mt-8">
            {items.map((item, index) => {
              const open = index === active;
              const Icon = getIcon(item.icon);
              const panelId = `situation-panel-${index}`;
              return (
                <li key={item.label} className="relative border-b border-gray-200">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(index)}
                      className={cx(
                        "flex w-full items-center gap-4 py-5 text-left text-lg font-semibold transition-colors md:text-xl",
                        open ? "text-gray-900" : "text-gray-400 hover:text-gray-700",
                      )}
                    >
                      <Icon aria-hidden="true" className={cx("h-6 w-6 flex-shrink-0", open && "text-brand-bright")} />
                      {item.label}
                    </button>
                  </h3>
                  <Collapse id={panelId} open={open} className="flex items-start gap-6 pb-6 pl-10">
                    <p className="flex-1 text-gray-600">{item.text}</p>
                    <SmartLink
                      to={item.link.to}
                      href={item.link.href}
                      aria-label={`${item.link.label}: ${item.label}`}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-brand shadow-sm transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                    </SmartLink>
                  </Collapse>
                  {open && (
                    <span
                      aria-hidden="true"
                      onAnimationEnd={next}
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand-bright"
                      style={
                        autoplay
                          ? {
                              animation: `situation-progress ${STEP_MS}ms linear`,
                              animationPlayState: running ? "running" : "paused",
                            }
                          : undefined
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
