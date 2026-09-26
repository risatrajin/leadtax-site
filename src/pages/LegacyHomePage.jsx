import seo from "../content/seo.json";
import Seo from "../components/seo/Seo.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero from "../sections/home-legacy/Hero.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import FilingOptions from "../sections/home-legacy/FilingOptions.jsx";
import DiyPricing from "../sections/shared/DiyPricing.jsx";
import PreviousYearsBanner from "../sections/home-legacy/PreviousYearsBanner.jsx";
import TrustFeatures from "../sections/home-legacy/TrustFeatures.jsx";
import HowItWorks from "../sections/home-legacy/HowItWorks.jsx";
import TaxTools from "../sections/home-legacy/TaxTools.jsx";
import ExpertHelpCta from "../sections/home-legacy/ExpertHelpCta.jsx";
import ExpertAddons from "../sections/home-legacy/ExpertAddons.jsx";
import HomeFaq from "../sections/home-legacy/HomeFaq.jsx";
import FinalCta from "../sections/home-legacy/FinalCta.jsx";

/** The original DIY homepage, kept at /home-legacy (noindex) to compare against the original build. */
export default function LegacyHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo {...seo.pages.home} robots={seo.pages.homeLegacy.robots} />
      <SiteHeader />
      <Hero />
      <ReviewsCarousel />
      <FilingOptions />
      <DiyPricing />
      <PreviousYearsBanner />
      <TrustFeatures />
      <HowItWorks />
      <TaxTools />
      <ExpertHelpCta />
      <ExpertAddons />
      <HomeFaq />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
