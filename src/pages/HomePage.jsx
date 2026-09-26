import seo from "../content/seo.json";
import Seo from "../components/seo/Seo.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero from "../sections/home/Hero.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import FilingOptions from "../sections/home/FilingOptions.jsx";
import DiyPricing from "../sections/shared/DiyPricing.jsx";
import PreviousYearsBanner from "../sections/home/PreviousYearsBanner.jsx";
import TrustFeatures from "../sections/home/TrustFeatures.jsx";
import HowItWorks from "../sections/home/HowItWorks.jsx";
import TaxTools from "../sections/home/TaxTools.jsx";
import ExpertHelpCta from "../sections/home/ExpertHelpCta.jsx";
import ExpertAddons from "../sections/home/ExpertAddons.jsx";
import HomeFaq from "../sections/home/HomeFaq.jsx";
import FinalCta from "../sections/home/FinalCta.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo {...seo.pages.home} />
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
