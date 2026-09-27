import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import content from "../../content/home.json";
import reviews from "../../content/reviews.json";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";
import GoogleLogo from "../../components/ui/GoogleLogo.jsx";

const { reviews: copy } = content;
const reviewCount = reviews.count.replace(/[()]/g, "");

/** "Radheeka Per..." → "RP", "CHRIS LUCIUK" → "CL". */
const initialsOf = (name) =>
  name
    .replace(/\.+$/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

function Stars({ className }) {
  return (
    <div role="img" aria-label={copy.starsLabel} className="flex gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star key={index} aria-hidden="true" className={`${className} fill-rating text-rating`} />
      ))}
    </div>
  );
}

function ArrowButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
    >
      {children}
    </button>
  );
}

/**
 * Google reviews: the rating summary with a "Review us on Google" button, then every review in
 * reviews.json as a card in a row that scrolls sideways (arrows by the title from 768px, swipe on phones).
 * Cards use the snippet the current site shows and open the Google reviews page. Avatars are
 * initials, not the stock photos in reviews.json; the hard-coded dates and verified ticks are left out.
 */
export default function Reviews() {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () =>
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{copy.title}</h2>
          <div className="hidden gap-3 md:flex">
            <ArrowButton label={copy.previousLabel} disabled={edges.start} onClick={() => scroll(-1)}>
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </ArrowButton>
            <ArrowButton label={copy.nextLabel} disabled={edges.end} onClick={() => scroll(1)}>
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </ArrowButton>
          </div>
        </div>

        <div className={`${CARD} mt-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2">
              <GoogleLogo className="h-7 w-7" />
              <span className="font-semibold text-gray-900">{copy.sourceLabel}</span>
            </span>
            <span
              className="flex items-center gap-2"
              aria-label={fill(copy.ratingLabel, { rating: reviews.rating, count: reviewCount })}
            >
              <span aria-hidden="true" className="text-2xl font-bold text-gray-900">
                {reviews.rating}
              </span>
              <span aria-hidden="true">
                <Stars className="h-5 w-5" />
              </span>
              <span aria-hidden="true" className="text-gray-600">
                {reviews.count}
              </span>
            </span>
          </div>
          <Button href={reviews.googleUrl} target="_blank" rel="noopener noreferrer" size="md" className="self-start sm:self-auto">
            {copy.writeLabel}
          </Button>
        </div>

        <ul
          ref={trackRef}
          className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.items.map((review) => (
            <li key={review.id} className="w-[85%] flex-shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]">
              <a
                href={reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD} group flex h-full flex-col p-6 transition-shadow hover:shadow-lg`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle font-semibold text-brand"
                  >
                    {initialsOf(review.name)}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-gray-900">{review.name}</span>
                  <GoogleLogo className="h-5 w-5 flex-shrink-0" />
                </span>
                <span className="mt-4">
                  <Stars className="h-4 w-4" />
                </span>
                <span className="mt-3 flex-1 leading-relaxed text-gray-700">{review.text}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:underline">
                  {copy.readLabel}
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
