import home from "../../content/pages/file-online.json";
import faqs from "../../content/faqs.json";
import FaqAccordion from "../../components/ui/FaqAccordion.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

export default function HomeFaq() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>{home.faq.title}</SectionHeading>
        <FaqAccordion items={faqs.home} />
      </div>
    </section>
  );
}
