import content from "../content/home-v2.json";
import EditorialFonts from "../components/editorial/EditorialFonts.jsx";
import HeaderV2 from "../components/layout/HeaderV2.jsx";
import FooterV2 from "../components/layout/FooterV2.jsx";
import Hero from "../sections/home-v2/Hero.jsx";
import Services from "../sections/home-v2/Services.jsx";
import Offices from "../sections/home-v2/Offices.jsx";
import FirstVisit from "../sections/home-v2/FirstVisit.jsx";
import OtherWays from "../sections/home-v2/OtherWays.jsx";
import Reviews from "../sections/home-v2/Reviews.jsx";
import Faq from "../sections/home-v2/Faq.jsx";
import CtaPanel from "../sections/home-v2/CtaPanel.jsx";
import LocalLinks from "../sections/home-v2/LocalLinks.jsx";

/** "Light editorial" homepage redesign. Lives beside the current homepage at /home-v2. */
export default function HomeV2Page() {
  return (
    <div className="editorial min-h-screen bg-ed-page font-ed-sans text-ed-ink antialiased">
      <EditorialFonts href={content.fontsHref} />
      <HeaderV2 />
      <main id="main">
        <Hero />
        <Services />
        <Offices />
        <FirstVisit />
        <OtherWays />
        <Reviews />
        <Faq />
        <CtaPanel />
        <LocalLinks />
      </main>
      <FooterV2 />
    </div>
  );
}
