import { Star } from "lucide-react";
import content from "../../content/home-v2.json";
import reviews from "../../content/reviews.json";
import { fill } from "../../lib/template.js";
import PillButton from "../../components/editorial/PillButton.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";

const { reviews: copy } = content;
const reviewCount = reviews.count.replace(/[()]/g, "");

/**
 * First three Google reviews from reviews.json, using the snippet the current site shows.
 * (reviews.json also has a longer `fullText`, but it was never shown and its endings look invented.)
 */
export default function Reviews() {
  return (
    <section className="bg-ed-surface">
      <div className="ed-container py-24 xl:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading text={copy.title} />
          <PillButton href={reviews.googleUrl} variant="outline" className="self-start bg-white md:self-auto">
            {fill(copy.allLabel, { count: reviewCount })}
          </PillButton>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.items.slice(0, copy.count).map((review) => (
            <figure key={review.id} className="flex flex-col rounded-ed-card bg-white p-8">
              <div role="img" aria-label={copy.starsLabel} className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} aria-hidden="true" className="h-4 w-4 fill-ed-ink text-ed-ink" />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed">“{review.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <span aria-hidden="true" className="h-9 w-9 flex-shrink-0 rounded-full bg-ed-sky" />
                <span>
                  <span className="block font-medium">{review.name}</span>
                  <span className="block text-sm text-ed-muted">{copy.reviewerOffice}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
