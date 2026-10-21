import home from "../content/homepage.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import QuickQueryButton from "../components/ui/QuickQueryButton.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import { SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { ServiceCard } from "../sections/home/Hero.jsx";
import WaysShowcase from "../sections/home/WaysShowcase.jsx";
import ProcessShowcase from "../sections/home/ProcessShowcase.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import PreviousYearsBanner from "../sections/file-online/PreviousYearsBanner.jsx";
import ConfidenceCarousel from "../sections/home/ConfidenceCarousel.jsx";
import HowItWorks from "../sections/file-online/HowItWorks.jsx";
import { DiyExpertCta, DiyFaq, DiyTools } from "../sections/home/DiySupport.jsx";

const SECTION = "scroll-mt-28 px-4 py-16 md:px-8 md:py-24";

/**
 * Bright blue hero: a three-line headline and the actions on the left, the portrait on the right
 * (its blue backdrop matches the section), and the five services as tiles in front of the
 * portrait. On large screens the portrait runs down to the bottom edge of the blue band.
 */
function Hero() {
  const { hero } = home;
  const lines = hero.title.match(/[^.]+\./g);
  return (
    <section className="relative overflow-x-clip bg-hero-blue px-4 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl items-end lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-8">
        <div className="relative z-10 pb-10 pt-14 md:pt-20 lg:col-start-1 lg:row-start-1 lg:pb-24 lg:pt-24">
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {lines.map((line) => (
              <span key={line} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">{hero.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {hero.actions.map((action, index) => (
              <Button key={action.label} to={action.to} href={action.href} variant={index === 0 ? "inverse" : "outlineInverseFill"}>
                {action.label}
              </Button>
            ))}
            <SmartLink
              to={hero.textLink.to}
              className="inline-flex min-h-12 items-center justify-center px-2 font-semibold text-white underline-offset-4 hover:underline"
            >
              {hero.textLink.label}
            </SmartLink>
          </div>
        </div>
        {/* The portrait (still). On large screens it spans both rows and fills the band's full height,
            behind the tiles; anything wider than the column is clipped at the page edge. A floating
            "Quick question" button on it opens a short question form in a modal. */}
        <div className="relative mx-auto w-full max-w-sm self-end sm:max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-stretch">
          <div className="lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-0 lg:flex lg:justify-center">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="-mb-px w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_6%)] lg:h-full lg:w-auto lg:max-w-none"
            />
          </div>
          <QuickQueryButton className="right-0 top-[40%] sm:-right-4 lg:right-0" />
        </div>

        <div className="relative z-10 -mt-12 pb-12 md:pb-[50px] lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mt-0">
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
        <ConfidenceCarousel slides={home.confidence.slides} />
        <HowItWorks />
        <DiyTools />
        <DiyExpertCta />
        <DiyFaq />
      </main>
      <SiteFooter />
    </div>
  );
}
