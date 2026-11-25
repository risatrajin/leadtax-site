import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { HeroForm } from "../../components/ui/PageHero.jsx";
import RichText, { LINK_CLASS_ON_DARK } from "../../components/ui/RichText.jsx";
import { splitLead } from "../../lib/markup.js";

/**
 * US & cross-border hero in the homepage style: a bright blue band, the headline in two lines with
 * the intro and actions on the left, and the enquiry form on the right (HeroForm, set to
 * cross-border tax through `service`).
 */
export default function BlueHero({ hero, service }) {
  const Headline = hero.h1 ? "p" : "h1";
  return (
    <section className="overflow-hidden bg-hero-blue px-4 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4">
        <div className="pb-12 pt-14 md:pt-20 lg:pb-24 lg:pt-24">
          {/* With `hero.h1`, that short line is the page's h1 (for search) and the headline a paragraph. */}
          {hero.h1 && <h1 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-subtle">{hero.h1}</h1>}
          <Headline className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl xl:text-[4rem]">
            {/* "Two countries." and "One life." each on their own line. */}
            {hero.titleLead.match(/[^.]+\./g).map((part) => (
              <span key={part} className="block">
                {part.trim()}
              </span>
            ))}
            <span className="block text-white/85">{hero.titleAccent}</span>
          </Headline>
          {/* With search copy (h1), the hero shows the intro's first sentence; the rest sits in the page note. */}
          <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">
            <RichText
              text={hero.h1 ? splitLead(hero.text)[0] : hero.text}
              linkClassName={LINK_CLASS_ON_DARK}
            />
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button to={hero.book.to} variant="inverse" className="gap-3 sm:whitespace-nowrap">
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              {hero.book.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button href={hero.findLocation.href} variant="outlineInverseFill" className="gap-3 sm:whitespace-nowrap">
              <MapPin aria-hidden="true" className="h-5 w-5" />
              {hero.findLocation.label}
            </Button>
          </div>
        </div>
        <div className="pb-14 lg:py-16">
          <HeroForm service={service} />
        </div>
      </div>
    </section>
  );
}
