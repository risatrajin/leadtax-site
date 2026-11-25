import { CARD } from "../../lib/styles.js";
import FaqAccordion from "../../components/ui/FaqAccordion.jsx";
import RichText, { Sources } from "../../components/ui/RichText.jsx";

/** Renders an article's content blocks. Unknown block types render nothing (as in the original). */
function Block({ block }) {
  switch (block.type) {
    case "intro":
      return (
        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
          <RichText text={block.text} />
        </p>
      );
    case "heading":
      return <h2 className="text-2xl md:text-3xl font-bold text-brand mt-12 mb-4">{block.text}</h2>;
    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed mb-6">
          <RichText text={block.text} />
        </p>
      );
    case "tip":
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
          <p className="text-green-900 font-medium">{block.text}</p>
        </div>
      );
    case "conclusion":
      return (
        <div className={`${CARD} p-8 mt-12 mb-8`}>
          <p className="text-gray-800 leading-relaxed font-medium">{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700 marker:text-brand">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "faq":
      return (
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-brand mb-6">{block.title}</h2>
          <FaqAccordion items={block.items} variant="bordered" />
        </section>
      );
    case "sources":
      return <Sources sources={block} className="mt-10" />;
    default:
      return null;
  }
}

export default function PostBody({ content }) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
