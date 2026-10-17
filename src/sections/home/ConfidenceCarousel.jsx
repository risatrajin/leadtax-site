import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import fileOnline from "../../content/pages/file-online.json";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";

/** How long each item stays in the centre before the next slides in. */
const STEP_MS = 3500;

/**
 * Wide-screen layout: where each card sits by its distance from the current one. `x` is the card's
 * centre across the row (%), `w`/`h` its size. Cards move between these with a CSS transition, so
 * the current card shrinks to the side while the clicked one grows into the middle.
 */
const SLOTS = {
  "-2": { x: 4, w: "6%", h: "46%", z: 10 },
  "-1": { x: 13.5, w: "9%", h: "72%", z: 20 },
  0: { x: 50, w: "60%", h: "100%", z: 30 },
  1: { x: 86.5, w: "9%", h: "72%", z: 20 },
  2: { x: 96, w: "6%", h: "46%", z: 10 },
};

/** The text half of the current card. */
function SlideText({ item, slide, index, count }) {
  const Icon = getIcon(item.icon);
  return (
    <div className="flex h-full flex-col p-6 md:p-9">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-7 text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-4xl">{item.title}</h3>
      <p className="mt-4 text-lg text-gray-600">{slide.text}</p>
      <ul className="mt-5 space-y-2">
        {slide.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-gray-700">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand">
              <Check aria-hidden="true" className="h-3 w-3" />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-gray-100 pt-5 text-lg font-medium leading-snug text-gray-900 md:mt-auto">“{item.description}”</p>
    </div>
  );
}

/**
 * "File your tax return with confidence." as a carousel in the style of Calendly's customer
 * stories: a blue gradient band, the current item as a large card (icon, title and text on the
 * left, a photo on the right), and from 1280px the neighbouring items as photo cards at the sides.
 * Changing slide animates every card to its new place: the current one shrinks to the side as the
 * next grows into the middle.
 * Each slide adds a short text and two points (homepage.json); it moves on every few seconds while in view; hovering or focusing pauses it, and the side
 * cards and dots jump straight to an item. Items: pages/file-online.json trust.items.
 */
export default function ConfidenceCarousel({ slides }) {
  const { trust } = fileOnline;
  const items = trust.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [wide, setWide] = useState(false);
  const sectionRef = useRef(null);
  const lastOffsets = useRef({});

  useEffect(() => {
    setAutoplay(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    const query = window.matchMedia("(min-width: 1280px)");
    const syncWide = () => setWide(query.matches);
    syncWide();
    query.addEventListener("change", syncWide);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", syncWide);
    };
  }, []);

  useEffect(() => {
    if (!autoplay || paused || !inView) return undefined;
    const timer = setTimeout(() => setActive((index) => (index + 1) % count), STEP_MS);
    return () => clearTimeout(timer);
  }, [autoplay, paused, inView, active, count]);

  const item = items[active];
  const slide = slides[active];
  // Distance of each card from the current one, -2…2 (wrapping round).
  const offsetOf = (index) => ((index - active + count + 2) % count) - 2;

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

      {wide ? (
        <div className="relative mx-auto mt-12 h-[36rem] max-w-7xl">
          {items.map((entry, index) => {
            const offset = offsetOf(index);
            const slot = SLOTS[offset];
            const current = offset === 0;
            // A card wrapping from one end to the other jumps instead of sliding across the middle.
            const jumped = Math.abs(offset - (lastOffsets.current[index] ?? offset)) > 2;
            lastOffsets.current[index] = offset;
            return (
              <div
                key={entry.title}
                role={current ? "group" : undefined}
                aria-roledescription={current ? "slide" : undefined}
                aria-label={current ? `${index + 1} / ${count}` : undefined}
                className={cx(
                  "absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white shadow-xl ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                  jumped ? "transition-none" : "transition-all duration-700",
                  current ? "rounded-3xl p-3 shadow-2xl" : "rounded-2xl p-2",
                )}
                style={{ left: `${slot.x}%`, width: slot.w, height: slot.h, zIndex: slot.z }}
              >
                {/* Text half: grows open on the current card, closes on the others. */}
                <div
                  aria-hidden={!current}
                  className={cx("h-full flex-shrink-0 overflow-hidden", current ? "w-1/2 opacity-100" : "w-0 opacity-0")}
                  style={{
                    // Opening: the space widens, then the text fades in. Closing: the text fades out quickly.
                    transition: current
                      ? "width 700ms cubic-bezier(0.2,0.7,0.2,1), opacity 400ms ease 300ms"
                      : "width 700ms cubic-bezier(0.2,0.7,0.2,1), opacity 150ms ease",
                  }}
                >
                  <div className="h-full w-[372px]">
                    <SlideText item={entry} slide={slides[index]} index={index} count={count} />
                  </div>
                </div>
                <img
                  src={slides[index].image.src}
                  alt={current ? slides[index].image.alt : ""}
                  className={cx("h-full min-w-0 flex-1 object-cover transition-[border-radius] duration-700", current ? "rounded-2xl" : "rounded-xl")}
                />
                {!current && (
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={entry.title}
                    className="absolute inset-0 rounded-2xl transition hover:bg-white/10"
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} / ${count}`}
          className="relative mx-auto mt-12 grid max-w-3xl overflow-hidden rounded-3xl bg-white p-3 shadow-2xl md:min-h-[36rem] md:grid-cols-2"
        >
          <div key={`text-${active}`} className="situation-in">
            <SlideText item={item} slide={slide} index={active} count={count} />
          </div>
          <img
            key={`image-${active}`}
            src={slide.image.src}
            alt={slide.image.alt}
            className="situation-in order-first h-56 w-full rounded-2xl object-cover sm:h-72 md:order-none md:h-full"
          />
        </div>
      )}

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
