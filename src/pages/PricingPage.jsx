import { Check } from "lucide-react";
import content from "../content/pages/pricing.json";
import seo from "../content/seo.json";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import Seo from "../components/seo/Seo.jsx";
import ComparisonTable from "../sections/pricing/ComparisonTable.jsx";
import PageHero from "../components/ui/PageHero.jsx";

/** Pricing: plan comparison table and accuracy guarantee. Has no <main> (kept from the original). */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Seo {...seo.pages.pricing} />
      <SiteHeader />
      <PageHero title={content.title} text={content.intro} />
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ComparisonTable />
          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">{content.guarantee.title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">{content.guarantee.text}</p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-700">
              {content.guarantee.points.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
