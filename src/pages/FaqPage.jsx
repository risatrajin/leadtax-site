import faq from "../content/pages/faq.json";
import faqs from "../content/faqs.json";
import seo from "../content/seo.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import FaqSchema from "../components/seo/FaqSchema.jsx";
import Button from "../components/ui/Button.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";

/** FAQ page. "Contact Support" goes to /contact. */
export default function FaqPage() {
  return (
    <>
      <PageShell seo={seo.pages.faq}>
        <PageHero title={faq.title} text={faq.intro} />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <FaqAccordion items={faqs.faqPage} variant="bordered" />
          <div className="mt-16 bg-brand-subtle rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">{faq.support.title}</h2>
            <p className="text-gray-700 mb-6">{faq.support.text}</p>
            <Button to={faq.support.buttonTo} size="wide">
              {faq.support.buttonLabel}
            </Button>
          </div>
        </div>
      </PageShell>
      <FaqSchema items={faqs.faqPage} />
    </>
  );
}
