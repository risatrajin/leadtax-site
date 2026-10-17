import { useEffect, useRef, useState } from "react";
import fileOnline from "../../content/pages/file-online.json";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";

/** How long each item stays in the centre before the next slides in. */
const STEP_MS = 5000;

/** Side thumbnails: distance from the centre → size and placement. */
const SIDES = [
  { offset: -2, className: "left-[1%] h-[46%] w-[6%]" },
  { offset: -1, className: "left-[9%] h-[72%] w-[9%]" },
  { offset: 1, className: "right-[9%] h-[72%] w-[9%]" },
  { offset: 2, className: "right-[1%] h-[46%] w-[6%]" },
];

/**
 * "File your tax return with confidence." as a carousel in the style of Calendly's customer
 * stories: a blue gradient band, the current item as a large card (icon, title and text on the
 * left, a photo on the right), and the neighbouring items as photo cards peeking at the sides.
 * It moves on every few seconds while in view; hovering or focusing pauses it, and the side
 * cards and dots jump straight to an item. Items: pages/file-online.json trust.items.
 */
export default function ConfidenceCarousel({ images }) {
  const { trust } = fileOnline;
  const items = trust.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setAutoplay(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || paused || !inView) return undefined;
    const timer = setTimeout(() => setActive((index) => (index + 1) % count), STEP_MS);
    return () => clearTimeout(timer);
  }, [autoplay, paused, inView, active, count]);

  const at = (offset) => (active + offset + count) % count;
  const item = items[active];
  const Icon = getIcon(item.icon);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={trust.title}
      className="overflow-hidden bg-gradient-to-b from-brand via-sky-300 to-sky-50 px-4 py-16 md:px-8 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setPaused(false)}
    >
      <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
        {trust.title}
      </h2>

      <div className="relative mx-auto mt-12 max-w-7xl lg:h-[34rem]">
        {/* Neighbouring items as photo cards, from 1280px. */}
        {SIDES.map((side) => {
          const index = at(side.offset);
          return (
            <button
              key={side.offset}
              type="button"
              onClick={() => setActive(index)}
              aria-label={items[index].title}
              className={cx(
                "absolute top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-2xl bg-white p-2 shadow-lg transition-all duration-700 ease-out hover:scale-105 xl:block",
                side.className,
              )}
            >
              <img key={index} src={images[index].src} alt="" className="situation-in h-full w-full rounded-xl object-cover" />
            </button>
          );
        })}

        {/* The current item. */}
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} / ${count}`}
          className="relative mx-auto grid h-full max-w-3xl overflow-hidden rounded-3xl bg-white p-3 shadow-2xl md:grid-cols-2"
        >
          <div key={`text-${active}`} className="situation-in flex flex-col p-6 md:p-9">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-4xl">{item.title}</h3>
            <p className="mt-6 text-xl leading-snug text-gray-700 md:mt-auto md:text-2xl">“{item.description}”</p>
          </div>
          <img
            key={`image-${active}`}
            src={images[active].src}
            alt={images[active].alt}
            className="situation-in order-first h-56 w-full rounded-2xl object-cover sm:h-72 md:order-none md:h-full"
          />
        </div>
      </div>

      {/* Dots: one per item, the current one wide. */}
      <div className="mt-10 flex justify-center gap-2">
        {items.map((entry, index) => (
          <button
            key={entry.title}
            type="button"
            onClick={() => setActive(index)}
            aria-label={entry.title}
            aria-current={index === active}
            className={cx(
              "h-2.5 rounded-full transition-all duration-500",
              index === active ? "w-8 bg-brand" : "w-2.5 bg-brand/30 hover:bg-brand/60",
            )}
          />
        ))}
      </div>
    </section>
  );
}
