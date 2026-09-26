import { ArrowRight, CalendarDays, MapPin, Star } from "lucide-react";
import content from "../../content/home.json";
import nav from "../../content/nav.json";
import reviews from "../../content/reviews.json";
import { getIcon } from "../../lib/icons.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";

const { hero } = content;
const reviewCount = reviews.count.replace(/[()]/g, "");

function GoogleLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function TrustRow() {
  return (
    <ul className="mx-auto grid max-w-xs gap-6 sm:max-w-5xl sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gray-200">
      <li className="flex items-center gap-3 sm:justify-center sm:px-6">
        <GoogleLogo className="h-9 w-9 flex-shrink-0" />
        <div>
          <div role="img" aria-label={hero.rating.starsLabel} className="flex gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star key={index} aria-hidden="true" className="h-4 w-4 fill-rating text-rating" />
            ))}
          </div>
          <p className="font-semibold text-gray-900">
            {fill(hero.rating.label, { rating: reviews.rating })}{" "}
            <span className="text-sm font-normal text-gray-600">{fill(hero.rating.count, { count: reviewCount })}</span>
          </p>
        </div>
      </li>
      {hero.trust.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <li key={item.title} className="flex items-center gap-3 sm:justify-center sm:px-6">
            <Icon className={`h-8 w-8 flex-shrink-0 ${item.icon === "MapleLeaf" ? "text-canada-red" : "text-brand-bright"}`} />
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceCard({ service }) {
  const link = nav.links[service.link];
  const Icon = getIcon(service.icon);
  return (
    <SmartLink
      to={link.to}
      href={link.href}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-xl lg:flex-col lg:items-center lg:gap-0 lg:px-4 lg:py-5 lg:text-center"
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className="h-9 w-9 flex-shrink-0 text-brand-bright" />
      <div className="min-w-0 flex-1 lg:flex-none">
        <h3 className="text-base font-semibold leading-snug text-gray-900 lg:mt-3">{service.title}</h3>
        <p className="mt-1 text-sm leading-snug text-gray-600">{service.text}</p>
      </div>
    </SmartLink>
  );
}

/**
 * Homepage hero (client mockup): headline and actions on the left, a photo behind them, and
 * the five services as cards along the bottom.
 * From 1280px the photo covers the whole section behind the text and cards, with no overlay.
 * The people stand on the right of the photo, leaving open sky behind the left-aligned text.
 * The text is left-aligned; on the photo it is white with a soft shadow for contrast.
 * Below 1280px the photo sits on top, full width. The trust row is a separate band (TrustBand).
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div className="relative h-64 sm:h-80 lg:h-[26rem] xl:absolute xl:inset-0 xl:h-auto">
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.image.position }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8 xl:pb-16 xl:pt-[104px]">
        <div className="max-w-3xl xl:text-white xl:[text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
          <h1 id="hero-title" className="text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-7xl xl:text-white">
            {hero.titleLead} <span className="text-brand-bright xl:text-white">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-gray-600 md:text-2xl xl:max-w-xl xl:text-white">{hero.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row [text-shadow:none]">
            <Button to={hero.book.to} className="inline-flex items-center justify-center gap-3 font-semibold">
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              {hero.book.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button
              href={hero.findLocation.href}
              variant="outline"
              className="inline-flex items-center justify-center gap-3 bg-white font-semibold"
            >
              <MapPin aria-hidden="true" className="h-5 w-5" />
              {hero.findLocation.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24 xl:mt-[42px] xl:pb-[46px]">
        <h2 className="sr-only">{hero.servicesTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {hero.services.map((service) => (
            <ServiceCard key={service.link} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Rating and trust points in a centered three-column grid directly under the hero. */
export function TrustBand() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-8 md:px-8">
      <TrustRow />
    </div>
  );
}
