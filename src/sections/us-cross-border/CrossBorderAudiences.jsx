import { getIcon } from "../../lib/icons.js";

export default function CrossBorderAudiences({ audiences }) {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-12 text-gray-900">{audiences.title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {audiences.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-brand-subtle rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
