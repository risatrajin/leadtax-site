import home from "../../content/home-legacy.json";
import { getIcon } from "../../lib/icons.js";
import Card from "../../components/ui/Card.jsx";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

const { trust } = home;

export default function TrustFeatures() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>{trust.title}</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {trust.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <Card key={index} className="p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-brand-subtle rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
