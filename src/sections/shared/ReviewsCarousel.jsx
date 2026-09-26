import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CircleCheck, Star } from "lucide-react";
import reviews from "../../content/reviews.json";
import Card from "../../components/ui/Card.jsx";

const SCROLL_STEP = 300;

function GoogleLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Stars({ size }) {
  return [...Array(5)].map((_, index) => (
    <Star key={index} className={`${size} fill-rating text-rating`} />
  ));
}

function ScrollButton({ position, enabled, onClick, label, Icon }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors ${enabled ? "" : "opacity-50 cursor-not-allowed"}`}
      aria-label={label}
      disabled={!enabled}
    >
      <Icon className="w-5 h-5 text-gray-600" />
    </button>
  );
}

/** Google rating summary and a horizontally scrolling row of review cards. */
export default function ReviewsCarousel() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollBy = (left) => trackRef.current?.scrollBy({ left, behavior: "smooth" });

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 mb-12">{reviews.heading}</h2>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoogleLogo />
              <span className="font-semibold text-gray-900">{reviews.sourceLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{reviews.rating}</span>
              <div className="flex gap-0.5">
                <Stars size="w-5 h-5" />
              </div>
              <span className="text-gray-600">{reviews.count}</span>
            </div>
          </div>
          <a
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-google hover:bg-google-hover text-white px-6 py-2.5 rounded-md font-medium transition-colors whitespace-nowrap"
          >
            {reviews.reviewButtonLabel}
          </a>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.items.map((review) => (
              <Card
                as="a"
                key={review.id}
                href={reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 p-6 flex-shrink-0 w-[280px] sm:w-[320px] hover:shadow-lg transition-shadow cursor-pointer block no-underline"
              >
                <div className="flex items-start gap-3 mb-4">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {review.initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-900 truncate">{review.name}</h3>
                      {review.verified && <CircleCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-500">{review.timeAgo}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  <Stars size="w-4 h-4" />
                </div>
                <p className="text-gray-700 mb-2 leading-relaxed">{review.text}</p>
                <span className="text-google text-sm font-medium hover:underline">{reviews.readMoreLabel}</span>
              </Card>
            ))}
          </div>
          <ScrollButton position="left-0" enabled={canScrollLeft} onClick={() => scrollBy(-SCROLL_STEP)} label="Scroll left" Icon={ChevronLeft} />
          <ScrollButton position="right-0" enabled={canScrollRight} onClick={() => scrollBy(SCROLL_STEP)} label="Scroll right" Icon={ChevronRight} />
        </div>
      </div>
    </section>
  );
}
