import home from "../../content/home.json";
import { getIcon } from "../../lib/icons.js";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

const { tools } = home;

export default function TaxTools() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>{tools.title}</SectionHeading>
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tools.items.map((tool, index) => {
            const Icon = getIcon(tool.icon);
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-subtle rounded-2xl mb-4">
                  <Icon className="w-10 h-10 text-brand" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
