import home from "../../content/pages/file-online.json";
import { getIcon } from "../../lib/icons.js";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

const { expertAddons } = home;

export default function ExpertAddons() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>{expertAddons.title}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-8">
          {expertAddons.items.map((addon, index) => {
            const Icon = getIcon(addon.icon);
            return (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-3">{addon.title}</h3>
                <p className="text-lg text-gray-600">{addon.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
