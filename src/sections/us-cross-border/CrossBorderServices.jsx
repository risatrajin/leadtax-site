import { Check } from "lucide-react";

export default function CrossBorderServices({ services }) {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-gray-900">{services.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{services.intro}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.items.map((item) => (
            <div key={item.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
