/** Renders an article's content blocks. Unknown block types render nothing (as in the original). */
function Block({ block }) {
  switch (block.type) {
    case "intro":
      return <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">{block.text}</p>;
    case "heading":
      return <h2 className="text-2xl md:text-3xl font-bold text-brand mt-12 mb-4">{block.text}</h2>;
    case "paragraph":
      return <p className="text-gray-700 leading-relaxed mb-6">{block.text}</p>;
    case "tip":
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
          <p className="text-green-900 font-medium">{block.text}</p>
        </div>
      );
    case "conclusion":
      return (
        <div className="bg-brand-subtle/30 p-8 rounded-2xl mt-12 mb-8">
          <p className="text-gray-800 leading-relaxed font-medium">{block.text}</p>
        </div>
      );
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
