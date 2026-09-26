import seo from "../content/seo.json";
import Seo from "../components/seo/Seo.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero from "../sections/home-v2/Hero.jsx";
import Services from "../sections/home-v2/Services.jsx";
import Offices from "../sections/home-v2/Offices.jsx";
import FirstVisit from "../sections/home-v2/FirstVisit.jsx";
import OtherWays from "../sections/home-v2/OtherWays.jsx";
import Reviews from "../sections/home-v2/Reviews.jsx";
import Faq from "../sections/home-v2/Faq.jsx";
import CtaPanel from "../sections/home-v2/CtaPanel.jsx";

/** Homepage redesign, in the site's own look. Lives beside the current homepage at /home-v2 (noindex). */
export default function HomeV2Page() {
  return (
    <div className="min-h-screen bg-white">
      <Seo {...seo.pages.homeV2} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <Offices />
        <FirstVisit />
        <OtherWays />
        <Reviews />
        <Faq />
        <CtaPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
