import { Check } from "lucide-react";
import { getIcon } from "../../lib/icons.js";

/** "Who this is for". Remote pages use icon cards; local pages use a check-mark list. */
export default function ServiceAudience({ variant, audience }) {
  return variant === "remote" ? <AudienceCards audience={audience} /> : <AudienceChecklist audience={audience} />;
}

function AudienceCards({ audience }) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-brand/5 to-brand-subtle/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-6">{audience.title}</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">{audience.intro}</p>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {audience.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceChecklist({ audience }) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-4">{audience.title}</h2>
        <p className="text-xl text-gray-600 text-center mb-12">{audience.intro}</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {audience.items.map((item) => (
            <div key={item.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-brand-subtle rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-brand" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
