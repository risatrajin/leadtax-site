import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import home from "../content/homepage.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import { SectionTitle, StepCards } from "../components/ui/ServiceBlocks.jsx";
import { ServiceCard } from "../sections/home/Hero.jsx";
import Offices from "../sections/home/Offices.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import { linkById } from "../components/layout/site-header/panels.jsx";
import { getIcon } from "../lib/icons.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";

const SECTION = "scroll-mt-28 px-4 py-16 md:px-8 md:py-24";
const LINK = "inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline";

/** Full-bleed seawall photo with the headline and the five services as tiles along the bottom. */
function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-highlight to-brand text-white">
      {/* Below 1280px the photo sits on top; from 1280px it covers the whole hero behind the text. */}
      <div className="relative h-64 sm:h-80 lg:h-[26rem] xl:absolute xl:inset-0 xl:h-auto">
        <img src={hero.image.src} alt={hero.image.alt} className="h-full w-full object-cover" style={{ objectPosition: hero.image.position }} />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-gray-950/60 via-gray-950/25 via-40% to-transparent to-60% xl:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 md:px-8 xl:pb-16 xl:pt-24">
        <div className="max-w-2xl xl:[text-shadow:0_1px_8px_rgb(0_0_0/0.25)]">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-subtle xl:text-white">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {hero.location.title}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-60" />
            <span className="font-medium normal-case tracking-normal opacity-90">{hero.location.text}</span>
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mt-6 text-lg text-brand-subtle md:text-xl xl:text-white/90">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row [text-shadow:none]">
            {hero.actions.map((action, index) => (
              <Button key={action.label} href={action.href} variant={index === 0 ? "inverse" : "outlineInverseFill"}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 md:px-8 xl:pb-10">
        <h2 className="sr-only">{hero.tilesTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {hero.tiles.map((tile) => (
            <ServiceCard key={tile.link} service={tile} />
          ))}
        </div>
        <p className="mt-6 text-center text-brand-subtle xl:text-white">
          {hero.help.label}{" "}
          <a href={hero.help.href} className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline">
            {hero.help.link}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-6 md:px-8">
      <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
        {home.promises.map((promise, index) => (
          <li key={promise} className="flex items-center gap-3 sm:justify-center">
            <span className="text-sm font-bold text-brand-bright">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-semibold text-gray-900">{promise}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Services() {
  const { services } = home;
  const { more } = services;
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={services.eyebrow} title={services.title} text={services.text} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.cards.map((card, index) => {
            const Icon = getIcon(card.icon);
            return (
              <li
                key={card.title}
                className={`${CARD} group flex flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-bright">{card.eyebrow}</p>
                <h3 className={`mt-2 ${CARD_TITLE}`}>{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.text}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-gray-700">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
                      {point}
                    </li>
                  ))}
                </ul>
                <SmartLink to={linkById(card.link).to} className={`${LINK} mt-6`}>
                  {card.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </SmartLink>
              </li>
            );
          })}
          <li className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-strong p-7 text-white shadow-xl">
            <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand-bright/40 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-subtle">{more.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-semibold">{more.title}</h3>
            <p className="mt-2 text-brand-subtle">{more.text}</p>
            <Button href={more.href} variant="inverse" size="md" className="mt-6 self-start">
              {more.cta}
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Ways() {
  const { ways } = home;
  return (
    <section className={`${SECTION} bg-gray-50`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={ways.eyebrow} title={ways.title} text={ways.text} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {ways.items.map((way, index) => {
            const Icon = getIcon(way.icon);
            return (
              <li key={way.title} className={`${CARD} flex flex-col p-8`}>
                <div className="flex items-center gap-4">
                  <span className={ICON_BADGE}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-brand-bright">
                    {String(index + 1).padStart(2, "0")} / {way.label}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-gray-900">{way.title}</h3>
                <p className="mt-2 flex-1 text-gray-600">{way.text}</p>
                <Button to={way.to} variant={index === 0 ? "primary" : "outline"} size="md" className="mt-6 gap-2 self-start">
                  {way.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const { process } = home;
  return (
    <section className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow={process.eyebrow} title={process.title} />
          <a href={process.cta.href} className={LINK}>
            {process.cta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <StepCards items={process.steps} />
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = home;
  return (
    <section className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow={faq.eyebrow} title={faq.title} center />
        <div className="mt-10">
          <FaqAccordion items={faq.items} variant="bordered" />
        </div>
      </div>
    </section>
  );
}

/**
 * Homepage: the five services in one place. Copy from the developer package (website/index.html),
 * laid out with the site's components; the offices section is the site's own map and office cards.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main id="main">
        <Hero />
        <Promises />
        <ReviewsCarousel className="bg-gray-50" />
        <Services />
        <Ways />
        <Process />
        <Offices />
        <Faq />
        <EnquirySection />
      </main>
      <SiteFooter />
    </div>
  );
}
