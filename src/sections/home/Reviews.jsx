import { Star } from "lucide-react";
import content from "../../content/home.json";
import reviews from "../../content/reviews.json";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";

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

/**
 * First three Google reviews from reviews.json, using the snippet the current site shows.
 * (reviews.json also has a longer `fullText`, but it was never shown and its endings look invented.)
 * Avatars are initials, not the stock photos in reviews.json.
 */
export default function Reviews() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{copy.title}</h2>
          <Button
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
            className="self-start bg-white md:self-auto"
          >
            {fill(copy.allLabel, { count: reviewCount })}
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.items.slice(0, copy.count).map((review) => (
            <figure key={review.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
              <div role="img" aria-label={copy.starsLabel} className="flex gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} aria-hidden="true" className="h-5 w-5 fill-rating text-rating" />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-gray-700">“{review.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle font-semibold text-brand"
                >
                  {initialsOf(review.name)}
                </span>
                <span>
                  <span className="block font-semibold text-gray-900">{review.name}</span>
                  <span className="block text-sm text-gray-500">{copy.reviewerOffice}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
