import content from "../content/home-v2.json";
import EditorialFonts from "../components/editorial/EditorialFonts.jsx";
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

/** "Light editorial" homepage redesign. Lives beside the current homepage at /home-v2. */
export default function HomeV2Page() {
  return (
    <div className="editorial min-h-screen bg-ed-page font-ed-sans text-ed-ink antialiased">
      <EditorialFonts href={content.fontsHref} />
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
