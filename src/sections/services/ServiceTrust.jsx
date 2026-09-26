import { getIcon } from "../../lib/icons.js";

const STYLES = {
  remote: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-white",
    title: "text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-12",
    grid: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
    well: "w-14 h-14 bg-brand-subtle rounded-full flex items-center justify-center mx-auto mb-4",
    icon: "w-7 h-7 text-brand",
    itemTitle: "text-lg text-gray-900 mb-2",
  },
  local: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-surface-tint to-white",
    title: "text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-4",
    grid: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8",
    well: "w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md",
    icon: "w-8 h-8 text-brand",
    itemTitle: "text-xl text-gray-900 mb-2",
  },
};

/** Trust / security row of four centred icon items. */
export default function ServiceTrust({ variant, trust }) {
  const style = STYLES[variant];
  return (
    <section className={style.section}>
      <div className="max-w-7xl mx-auto">
        <h2 className={style.title}>{trust.title}</h2>
        {trust.intro && <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">{trust.intro}</p>}
        <div className={style.grid}>
          {trust.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className="text-center">
                <div className={style.well}>
                  <Icon className={style.icon} />
                </div>
                <h3 className={style.itemTitle}>{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
