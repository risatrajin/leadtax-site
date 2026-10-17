import { ArrowRight } from "lucide-react";
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
import { CARD, CARD_TITLE } from "../lib/styles.js";

const SECTION = "scroll-mt-28 px-4 py-16 md:px-8 md:py-24";
const LINK = "inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline";

/**
 * Bright blue hero: a three-line headline and the actions on the left, the portrait on the right
 * (its blue backdrop matches the section), and the five services as tiles overlapping the
 * bottom edge of the blue band.
 */
function Hero() {
  const { hero } = home;
  const lines = hero.title.match(/[^.]+\./g);
  return (
    <section className="relative bg-gray-50">
      <div className="bg-hero-blue px-4 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="pb-10 pt-14 md:pt-20 lg:pb-40 lg:pt-24">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line.trim()}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">{hero.text}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {hero.actions.map((action, index) => (
                <Button key={action.label} href={action.href} variant={index === 0 ? "inverse" : "outlineInverseFill"}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="mx-auto -mb-px w-full max-w-sm self-end [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_6%)] sm:max-w-md lg:max-w-none"
          />
        </div>
      </div>

      {/* Same column as the text above: padding outside, a 1280px column inside. */}
      <div className="relative z-10 -mt-12 px-4 md:px-8 lg:-mt-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">{hero.tilesTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {hero.tiles.map((tile) => (
              <ServiceCard key={tile.link} service={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The four ways to file as cards; titles, text, icons and links come from nav.json. */
function Ways() {
  const { ways } = home;
  return (
    <section id="services" className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={ways.eyebrow} title={ways.title} text={ways.text} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ways.items.map((item, index) => {
            const link = linkById(item.link);
            const Icon = getIcon(link.icon);
            return (
              <li key={item.link}>
                <SmartLink
                  to={link.to}
                  href={link.href}
                  className={`${CARD} group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-300">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`mt-5 ${CARD_TITLE}`}>{link.label}</h3>
                  <p className="mt-2 flex-1 text-gray-600">{link.description}</p>
                  <span className={`${LINK} mt-6`}>
                    {item.cta}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </SmartLink>
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
    <section className={`${SECTION} bg-gray-50`}>
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
        <ReviewsCarousel className="bg-gray-50" />
        <Ways />
        <Process />
        <Faq />
        <Offices />
        <EnquirySection className="bg-white" />
      </main>
      <SiteFooter />
    </div>
  );
}
