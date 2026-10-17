import home from "../content/homepage.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Button from "../components/ui/Button.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import { SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { ServiceCard } from "../sections/home/Hero.jsx";
import Offices from "../sections/home/Offices.jsx";
import WaysShowcase from "../sections/home/WaysShowcase.jsx";
import ProcessShowcase from "../sections/home/ProcessShowcase.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import PreviousYearsBanner from "../sections/file-online/PreviousYearsBanner.jsx";
import TrustFeatures from "../sections/file-online/TrustFeatures.jsx";
import HowItWorks from "../sections/file-online/HowItWorks.jsx";

const SECTION = "scroll-mt-28 px-4 py-16 md:px-8 md:py-24";

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
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
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
          {/* The portrait rises in on load, then zooms very slowly in and out from its bottom edge. */}
          <div className="hero-rise mx-auto w-full max-w-sm self-end sm:max-w-md lg:max-w-none">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="hero-breathe -mb-px w-full origin-bottom [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_6%)]"
            />
          </div>
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
        <WaysShowcase ways={home.ways} />
        <ProcessShowcase process={home.process} tiles={home.hero.tiles} />
        <Faq />
        <PreviousYearsBanner className="bg-gray-50" image={home.previousYears.image} />
        <TrustFeatures />
        <HowItWorks />
        <Offices className="bg-white" />
        <EnquirySection />
      </main>
      <SiteFooter />
    </div>
  );
}
