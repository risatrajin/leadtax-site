import seo from "../content/seo.json";
import Seo from "../components/seo/Seo.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Hero from "../sections/home/Hero.jsx";
import Services from "../sections/home/Services.jsx";
import Offices from "../sections/home/Offices.jsx";
import FirstVisit from "../sections/home/FirstVisit.jsx";
import OtherWays from "../sections/home/OtherWays.jsx";
import Reviews from "../sections/home/Reviews.jsx";
import Faq from "../sections/home/Faq.jsx";
import CtaPanel from "../sections/home/CtaPanel.jsx";

/** The homepage. The original DIY homepage is kept at /home-legacy for comparison. */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo {...seo.pages.home} />
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
