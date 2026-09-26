import content from "../../content/home.json";
import FaqList from "../../components/ui/FaqList.jsx";

const { faq } = content;

export default function Faq() {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[400px_1fr] xl:gap-16">
        <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{faq.title}</h2>
        <FaqList items={faq.items} />
      </div>
    </section>
  );
}
