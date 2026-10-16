import content from "../content/pages/us-cross-border.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero, { TrustBand } from "../sections/home/Hero.jsx";
import Offices from "../sections/home/Offices.jsx";
import FirstVisit from "../sections/home/FirstVisit.jsx";
import OtherWays from "../sections/home/OtherWays.jsx";
import Reviews from "../sections/home/Reviews.jsx";
import Faq from "../sections/home/Faq.jsx";
import CtaPanel from "../sections/home/CtaPanel.jsx";

/**
 * US & cross-border page: the redesigned homepage layout with the cross-border content
 * (content: pages/us-cross-border.json). The offices map and Google reviews are shared.
 */
export default function UsCrossBorderPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main id="main">
        <Hero content={content} />
        <TrustBand content={content} />
        <OtherWays content={content} section="situations" className="bg-white px-4 py-16 md:px-8 md:py-24" />
        <OtherWays content={content} section="services" className="bg-gray-50 px-4 py-16 md:px-8 md:py-24" />
        <FirstVisit content={content} />
        <Offices />
        <Reviews />
        <Faq content={content} />
        <CtaPanel content={content} to={content.cta.button.href} />
      </main>
      <SiteFooter />
    </div>
  );
}
