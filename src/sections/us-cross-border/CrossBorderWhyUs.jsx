import { getIcon } from "../../lib/icons.js";

export default function CrossBorderWhyUs({ whyUs }) {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-brand to-brand-strong text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-12">{whyUs.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUs.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-subtle rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-brand-subtle">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
