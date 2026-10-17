import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero from "../sections/file-online/Hero.jsx";
import ReviewsCarousel from "../sections/shared/ReviewsCarousel.jsx";
import DiyPricing from "../sections/shared/DiyPricing.jsx";
import PreviousYearsBanner from "../sections/file-online/PreviousYearsBanner.jsx";
import TrustFeatures from "../sections/file-online/TrustFeatures.jsx";
import HowItWorks from "../sections/file-online/HowItWorks.jsx";
import TaxTools from "../sections/file-online/TaxTools.jsx";
import ExpertHelpCta from "../sections/file-online/ExpertHelpCta.jsx";
import ExpertAddons from "../sections/file-online/ExpertAddons.jsx";
import HomeFaq from "../sections/file-online/HomeFaq.jsx";
import FinalCta from "../sections/file-online/FinalCta.jsx";

/**
 * "File online yourself" landing page: the original DIY homepage (online software, packages,
 * how it works, tools, expert add-ons, FAQ), moved here when "/" became the services homepage.
 */
export default function FileOnlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main id="main">
        <Hero />
        <ReviewsCarousel />
        <DiyPricing />
        <PreviousYearsBanner />
        <TrustFeatures />
        <HowItWorks />
        <TaxTools />
        <ExpertHelpCta />
        <ExpertAddons />
        <HomeFaq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
