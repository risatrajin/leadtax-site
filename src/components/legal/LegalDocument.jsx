import site from "../../content/site.json";
import PageShell from "../layout/PageShell.jsx";

const PARAGRAPH_GAP = { sm: "mb-3", md: "mb-4" };

function Paragraph({ block }) {
  const classes = ["text-gray-700 leading-relaxed"];
  if (block.gap) classes.push(PARAGRAPH_GAP[block.gap]);
  if (block.emphasis) classes.push("font-semibold");
  return <p className={classes.join(" ")}>{block.text}</p>;
}

function ContactCard({ company }) {
  return (
    <div className="mt-4 p-4 bg-brand-subtle rounded-lg">
      <p className="text-gray-700">
        <strong>{company}</strong>
        <br />
        <strong>Email:</strong> {site.contact.email}
        <br />
        <strong>Website:</strong> {site.contact.websiteDisplay}
      </p>
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "subheading":
      return <h3 className="text-xl font-bold text-gray-900 mb-3">{block.text}</h3>;
    case "list":
      return (
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "contactCard":
      return <ContactCard company={block.company} />;
    default:
      throw new Error(`Unknown legal block type "${block.type}"`);
  }
}

/** Renders a legal page (Terms, Privacy Policy) from its content JSON. */
export default function LegalDocument({ document: doc, seo }) {
  return (
    <PageShell seo={seo}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4">{doc.title}</h1>
          <p className="text-lg text-gray-600">{doc.lastUpdated}</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 space-y-8">
            {doc.intro.map((block, index) => (
              <Paragraph key={index} block={block} />
            ))}
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-brand mb-4">{section.title}</h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
