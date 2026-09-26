import faq from "../content/pages/faq.json";
import faqs from "../content/faqs.json";
import seo from "../content/seo.json";
import PageShell from "../components/layout/PageShell.jsx";
import FaqSchema from "../components/seo/FaqSchema.jsx";
import Button from "../components/ui/Button.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";

/** FAQ page. "Contact Support" goes to /contact. */
export default function FaqPage() {
  return (
    <>
      <PageShell seo={seo.pages.faq}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4">{faq.title}</h1>
            <p className="text-lg text-gray-600">{faq.intro}</p>
          </div>
          <FaqAccordion items={faqs.faqPage} variant="bordered" />
          <div className="mt-16 bg-brand-subtle rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-brand mb-4">{faq.support.title}</h2>
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
