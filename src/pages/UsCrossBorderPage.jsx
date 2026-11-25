import content from "../content/pages/us-cross-border.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import { TrustBand } from "../sections/home/Hero.jsx";
import BlueHero from "../sections/cross-border/BlueHero.jsx";
import Offices from "../sections/home/Offices.jsx";
import FirstVisit from "../sections/home/FirstVisit.jsx";
import OtherWays from "../sections/home/OtherWays.jsx";
import Situations from "../sections/home/Situations.jsx";
import Reviews from "../sections/home/Reviews.jsx";
import Faq from "../sections/home/Faq.jsx";
import ContactEnquiry from "../sections/home/ContactEnquiry.jsx";
import Deadlines from "../sections/cross-border/Deadlines.jsx";
import PageNote from "../components/ui/PageNote.jsx";
import { splitLead } from "../lib/markup.js";

/**
 * US & cross-border page: the redesigned homepage layout with the cross-border content
 * (content: pages/us-cross-border.json). The offices map and Google reviews are shared.
 */
export default function UsCrossBorderPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main id="main">
        <BlueHero hero={content.hero} service={content.name} />
        <TrustBand content={content} />
        <Situations situations={content.situations} />
        <OtherWays content={content} section="services" className="bg-gray-50 px-4 py-16 md:px-8 md:py-24" />
        {content.deadlines && <Deadlines deadlines={content.deadlines} />}
        <FirstVisit content={content} className={content.deadlines ? "bg-gray-50" : "bg-white"} />
        <Offices className={content.deadlines ? "bg-white" : "bg-gray-50"} title={content.offices?.title} intro={content.offices?.intro} />
        <Reviews />
        <ContactEnquiry contact={content.contact} />
        <Faq content={content} className="bg-gray-50" />
        <PageNote text={content.hero.h1 ? splitLead(content.hero.text)[1] : undefined} blocks={[content.intro]} />
      </main>
      <SiteFooter />
    </div>
  );
}
