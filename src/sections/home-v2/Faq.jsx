import content from "../../content/home-v2.json";
import FaqList from "../../components/editorial/FaqList.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";

const { faq } = content;

export default function Faq() {
  return (
    <section className="ed-container py-24 xl:py-28">
      <div className="grid gap-10 xl:grid-cols-[400px_1fr] xl:gap-16">
        <SectionHeading text={faq.title} className="xl:max-w-[400px]" />
        <FaqList items={faq.items} />
      </div>
    </section>
  );
}
