import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Button from "../../components/ui/Button.jsx";

/**
 * US & cross-border hero in the homepage style: a bright blue band, the headline in two lines with
 * the intro and actions on the left, and the cut-out photo standing on the band's bottom edge on
 * the right (it rises in on load).
 */
export default function BlueHero({ hero }) {
  return (
    <section className="bg-hero-blue px-4 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="pb-12 pt-14 md:pt-20 lg:pb-24 lg:pt-24">
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl xl:text-[4rem]">
            <span className="block">{hero.titleLead}</span>
            <span className="block text-white/85">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">{hero.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button to={hero.book.to} variant="inverse" className="gap-3">
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              {hero.book.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button href={hero.findLocation.href} variant="outlineInverseFill" className="gap-3">
              <MapPin aria-hidden="true" className="h-5 w-5" />
              {hero.findLocation.label}
            </Button>
          </div>
        </div>
        <div className="hero-rise mx-auto w-full max-w-md self-end lg:max-w-none">
          <img src={hero.image.src} alt={hero.image.alt} className="-mb-px w-full" />
        </div>
      </div>
    </section>
  );
}
