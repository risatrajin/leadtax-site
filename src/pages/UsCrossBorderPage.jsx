import content from "../content/pages/us-cross-border.json";
import faqs from "../content/faqs.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Button from "../components/ui/Button.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import CrossBorderHero from "../sections/us-cross-border/CrossBorderHero.jsx";
import CrossBorderAudiences from "../sections/us-cross-border/CrossBorderAudiences.jsx";
import CrossBorderServices from "../sections/us-cross-border/CrossBorderServices.jsx";
import CrossBorderWhyUs from "../sections/us-cross-border/CrossBorderWhyUs.jsx";
import CrossBorderProcess from "../sections/us-cross-border/CrossBorderProcess.jsx";
import CrossBorderExperience from "../sections/us-cross-border/CrossBorderExperience.jsx";
import CrossBorderPricing from "../sections/us-cross-border/CrossBorderPricing.jsx";
import { crossBorderAction } from "../sections/us-cross-border/links.js";

const CTA_VARIANTS = ["primary", "outlineMuted"];

/** US Cross-Border Tax. Sets no page-specific SEO and has no <main> (known issues). */
export default function UsCrossBorderPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <CrossBorderHero hero={content.hero} />
      <CrossBorderAudiences audiences={content.audiences} />
      <CrossBorderServices services={content.services} />
      <CrossBorderWhyUs whyUs={content.whyUs} />
      <CrossBorderProcess process={content.process} />
      <CrossBorderExperience experience={content.experience} />
      <CrossBorderPricing pricing={content.pricing} />
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-center mb-12 text-gray-900">{content.faq.title}</h2>
          <FaqAccordion items={faqs.usCrossBorder} variant="compact" />
        </div>
      </section>
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900">{content.cta.title}</h2>
          <p className="text-lg text-gray-600">{content.cta.text}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {content.cta.actions.map((action, index) => (
              <Button
                key={action.label}
                {...crossBorderAction(action)}
                variant={CTA_VARIANTS[index]}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
