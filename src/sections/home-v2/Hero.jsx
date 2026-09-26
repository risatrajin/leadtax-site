import { useState } from "react";
import { ChevronDown } from "lucide-react";
import content from "../../content/home-v2.json";
import reviews from "../../content/reviews.json";
import { bookingHref, directionsHref, hoursOn, offices, officePhone, officeTel } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import ImagePlaceholder from "../../components/editorial/ImagePlaceholder.jsx";
import PillBadge from "../../components/editorial/PillBadge.jsx";
import PillButton from "../../components/editorial/PillButton.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";
import TextLink from "../../components/editorial/TextLink.jsx";

const { hero, bookingFallback } = content;
const reviewCount = reviews.count.replace(/[()]/g, "");

function OfficeCard({ office, className }) {
  const { card } = hero;
  return (
    <div aria-live="polite" className={`rounded-ed-float bg-white p-6 shadow-ed-card ${className}`}>
      <p className="text-xs text-ed-muted">{card.label}</p>
      <p className="mt-1 text-[20px] font-semibold tracking-[-0.01em]">{office.shortName}</p>
      <p className="mt-1 text-sm text-ed-muted">{office.display.address}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-ed-line pt-4 text-sm">
        <a href={officeTel(office)} className="whitespace-nowrap text-ed-ink underline-offset-4 hover:underline">
          {officePhone(office)}
        </a>
        <span className="text-right text-ed-muted">
          {card.todayLabel} {hoursOn(office)}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <PillButton href={bookingHref(office, bookingFallback.href)} size="sm">
          {card.bookLabel}
        </PillButton>
        <TextLink href={directionsHref(office)} className="text-sm font-medium underline underline-offset-4">
          {card.directionsLabel}
        </TextLink>
      </div>
    </div>
  );
}

/** Hero with an office picker. The select, the dots and the card share one selected office. */
export default function Hero() {
  const [officeId, setOfficeId] = useState(offices[0].id);
  const office = offices.find((candidate) => candidate.id === officeId);

  return (
    <section className="ed-container py-14 md:py-20 xl:py-24">
      <div className="grid items-center gap-12 xl:grid-cols-[1fr_620px] xl:gap-12">
        <div>
          <PillBadge>{hero.badge}</PillBadge>
          <SectionHeading as="h1" size="display" text={hero.title} className="mt-6 max-w-[620px]" />
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-ed-muted">{hero.text}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <label htmlFor="hero-office" className="sr-only">
              {hero.officeSelectLabel}
            </label>
            <div className="relative">
              <select
                id="hero-office"
                value={officeId}
                onChange={(event) => setOfficeId(event.target.value)}
                className="h-12 w-full appearance-none rounded-full bg-ed-surface pl-5 pr-11 text-[15px] text-ed-ink sm:w-auto"
              >
                {offices.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.shortName}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ed-muted"
              />
            </div>
            <PillButton href={bookingHref(office, bookingFallback.href)}>{hero.bookLabel}</PillButton>
            <PillButton href={hero.findOffice.href} variant="outline">
              {hero.findOffice.label}
            </PillButton>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div aria-hidden="true" className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full bg-ed-sky ring-2 ring-white" />
              <span className="h-7 w-7 rounded-full bg-ed-sky/70 ring-2 ring-white" />
              <span className="h-7 w-7 rounded-full bg-ed-sky/40 ring-2 ring-white" />
            </div>
            <p className="text-[15px] text-ed-muted">
              <span className="font-semibold text-ed-ink">{fill(hero.ratingLead, { rating: reviews.rating })}</span>
              {fill(hero.ratingTail, { count: reviewCount })}
            </p>
          </div>
        </div>

        <div className="xl:w-[620px]">
          <div className="relative xl:pl-10">
            <ImagePlaceholder
              label={fill(hero.imageLabel, { office: office.shortName })}
              className="h-[300px] rounded-ed-panel shadow-ed-float md:h-[440px] xl:h-[500px] xl:w-[580px]"
            />
            <OfficeCard office={office} className="mt-4 xl:absolute xl:-bottom-12 xl:left-0 xl:mt-0 xl:w-[320px]" />
          </div>
          <div
            role="group"
            aria-label={hero.dotsLabel}
            className="mt-6 flex items-center justify-center gap-2 xl:mt-8 xl:justify-end"
          >
            {offices.map((candidate) => {
              const active = candidate.id === officeId;
              return (
                <button
                  key={candidate.id}
                  type="button"
                  aria-label={fill(hero.dotLabel, { office: candidate.shortName })}
                  aria-pressed={active}
                  onClick={() => setOfficeId(candidate.id)}
                  className="flex h-6 items-center justify-center px-0.5"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${active ? "w-[22px] bg-ed-ink" : "w-2 bg-ed-outline"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
