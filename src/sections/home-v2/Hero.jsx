import { useState } from "react";
import { ChevronDown } from "lucide-react";
import content from "../../content/home-v2.json";
import reviews from "../../content/reviews.json";
import { bookingHref, directionsHref, hoursOn, offices, officePhone, officeTel } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";

const { hero, bookingFallback } = content;
const reviewCount = reviews.count.replace(/[()]/g, "");

function OfficeCard({ office, className }) {
  const { card } = hero;
  return (
    <div aria-live="polite" className={`rounded-2xl bg-white p-6 text-gray-900 shadow-2xl ${className}`}>
      <p className="text-xs text-gray-500">{card.label}</p>
      <p className="mt-1 text-xl font-semibold">{office.shortName}</p>
      <p className="mt-1 text-sm text-gray-600">{office.display.address}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 text-sm">
        <a href={officeTel(office)} className="whitespace-nowrap font-semibold hover:text-brand">
          {officePhone(office)}
        </a>
        <span className="text-right text-gray-600">
          {card.todayLabel} {hoursOn(office)}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <Button href={bookingHref(office, bookingFallback.href)} size="sm" className="text-sm font-semibold">
          {card.bookLabel}
        </Button>
        <SmartLink href={directionsHref(office)} className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
          {card.directionsLabel}
        </SmartLink>
      </div>
    </div>
  );
}

/** Hero with an office picker. The select, the dots and the card share one selected office. */
export default function Hero() {
  const [officeId, setOfficeId] = useState(offices[0].id);
  const office = offices.find((candidate) => candidate.id === officeId);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-highlight to-brand px-4 py-16 text-white md:px-8 md:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-subtle blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge tone="onBrand">{hero.badge}</Badge>
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-subtle md:text-xl">{hero.text}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <label htmlFor="hero-office" className="sr-only">
              {hero.officeSelectLabel}
            </label>
            <div className="relative">
              <select
                id="hero-office"
                value={officeId}
                onChange={(event) => setOfficeId(event.target.value)}
                className="h-12 w-full appearance-none rounded-full bg-white pl-5 pr-11 font-semibold text-gray-900 sm:w-auto"
              >
                {offices.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.shortName}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              />
            </div>
            <Button href={bookingHref(office, bookingFallback.href)} variant="inverse" size="md" className="text-center font-semibold">
              {hero.bookLabel}
            </Button>
            <Button href={hero.findOffice.href} variant="outlineInverse" size="md" className="text-center font-semibold">
              {hero.findOffice.label}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div aria-hidden="true" className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full bg-brand-subtle ring-2 ring-brand" />
              <span className="h-7 w-7 rounded-full bg-brand-subtle/70 ring-2 ring-brand" />
              <span className="h-7 w-7 rounded-full bg-brand-subtle/40 ring-2 ring-brand" />
            </div>
            <p className="text-brand-subtle">
              <span className="font-semibold text-white">{fill(hero.ratingLead, { rating: reviews.rating })}</span>
              {fill(hero.ratingTail, { count: reviewCount })}
            </p>
          </div>
        </div>

        <div>
          <div className="relative lg:pl-10">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="h-[300px] w-full rounded-3xl object-cover shadow-2xl ring-4 ring-white/10 md:h-[440px] lg:h-[500px]"
            />
            <OfficeCard office={office} className="mt-4 lg:absolute lg:-bottom-12 lg:left-0 lg:mt-0 lg:w-[320px]" />
          </div>
          <div role="group" aria-label={hero.dotsLabel} className="mt-6 flex items-center justify-center gap-2 lg:mt-8 lg:justify-end">
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
                  <span className={`block h-2 rounded-full transition-all ${active ? "w-[22px] bg-white" : "w-2 bg-white/40"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
