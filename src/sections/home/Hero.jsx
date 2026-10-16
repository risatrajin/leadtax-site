import { ArrowRight, CalendarDays, MapPin, Star } from "lucide-react";
import home from "../../content/home.json";
import reviews from "../../content/reviews.json";
import { getIcon } from "../../lib/icons.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";
import GoogleLogo from "../../components/ui/GoogleLogo.jsx";
import { isEnabled, linkById } from "../../components/layout/site-header/panels.jsx";

const reviewCount = reviews.count.replace(/[()]/g, "");

function TrustRow({ hero }) {
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

const CARD_CLASSES =
  "flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-md lg:flex-col lg:items-center lg:gap-0 lg:px-4 lg:py-5 lg:text-center";

/** A service tile. It links to the service page when that page exists, otherwise it is plain content. */
export function ServiceCard({ service }) {
  // A nav.json link id, or a direct `to` / `href` on the tile.
  const link = service.link ? linkById(service.link) : service;
  const Icon = getIcon(service.icon);
  const body = (
    <>
      <Icon aria-hidden="true" strokeWidth={1.5} className="h-9 w-9 flex-shrink-0 text-brand-bright" />
      <div className="min-w-0 flex-1 lg:flex-none">
        <h3 className="text-base font-semibold leading-snug text-gray-900 lg:mt-3">{service.title}</h3>
        <p className="mt-1 text-sm leading-snug text-gray-600">{service.text}</p>
      </div>
    </>
  );
  if (!isEnabled(link)) return <div className={CARD_CLASSES}>{body}</div>;
  return (
    <SmartLink to={link.to} href={link.href} className={`group ${CARD_CLASSES} transition-shadow hover:shadow-xl`}>
      {body}
    </SmartLink>
  );
}

/**
 * Homepage hero (client mockup): headline and actions on the left, a photo behind them, and
 * the five services as cards along the bottom.
 * From 1280px the photo covers the whole section behind the text and cards, with no overlay.
 * The people stand on the right of the photo, leaving open sky behind the left-aligned text.
 * The text is left-aligned; on the photo it is white over a dark left-to-right gradient.
 * Below 1280px the photo sits on top, full width. The trust row is a separate band (TrustBand).
 */
export default function Hero({ content = home }) {
  const { hero } = content;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div className="relative h-64 sm:h-80 lg:h-[26rem] xl:absolute xl:inset-0 xl:h-auto">
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.image.position }}
        />
        {/* Darkens the sky behind the white text; the people on the right stay untouched. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-gray-950/70 via-gray-950/35 via-45% to-transparent to-65% xl:block"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8 xl:pb-16 xl:pt-[104px]">
        <div className="max-w-3xl xl:text-white xl:[text-shadow:0_1px_8px_rgb(0_0_0/0.25)]">
          <h1 id="hero-title" className="text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-7xl xl:text-white">
            {hero.titleLead} <span className="text-brand-bright xl:text-white">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-gray-600 md:text-2xl xl:max-w-xl xl:text-white">{hero.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row [text-shadow:none]">
            <Button to={hero.book.to} className="gap-3">
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              {hero.book.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
            <Button
              href={hero.findLocation.href}
              variant="outline"
              className="gap-3 bg-white"
            >
              <MapPin aria-hidden="true" className="h-5 w-5" />
              {hero.findLocation.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {hero.services ? (
        <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24 xl:mt-[42px] xl:pb-[46px]">
          <h2 className="sr-only">{hero.servicesTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {hero.services.map((service) => (
              <ServiceCard key={service.link ?? service.title} service={service} />
            ))}
          </div>
        </div>
      ) : (
        // Without tiles the photo still needs room below the buttons on wide screens.
        <div aria-hidden="true" className="xl:h-40" />
      )}
    </section>
  );
}

/** Rating and trust points in a centered three-column grid directly under the hero. */
export function TrustBand({ content = home }) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-8 md:px-8">
      <TrustRow hero={content.hero} />
    </div>
  );
}
