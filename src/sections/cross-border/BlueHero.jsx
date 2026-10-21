import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import QuickQueryButton from "../../components/ui/QuickQueryButton.jsx";

/**
 * US & cross-border hero in the homepage style: a bright blue band, the headline in two lines with
 * the intro and actions on the left, and the U.S.–Canada collage on the right (white background
 * removed), which rises in on load and then zooms very slowly.
 */
export default function BlueHero({ hero }) {
  return (
    <section className="overflow-hidden bg-hero-blue px-4 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4">
        <div className="pb-12 pt-14 md:pt-20 lg:pb-24 lg:pt-24">
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl xl:text-[4rem]">
            {/* "Two countries." and "One life." each on their own line. */}
            {hero.titleLead.match(/[^.]+\./g).map((part) => (
              <span key={part} className="block">
                {part.trim()}
              </span>
            ))}
            <span className="block text-white/85">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">{hero.text}</p>
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
        <div className="hero-rise mx-auto w-full max-w-lg pb-12 lg:-mr-8 lg:max-w-none lg:scale-110 lg:py-10 xl:-mr-16">
          <div className="relative">
            <img src={hero.image.src} alt={hero.image.alt} className="hero-breathe w-full" />
            <QuickQueryButton className="bottom-[10%] right-2 lg:bottom-[14%] lg:right-[14%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
