import { getIcon } from "../../lib/icons.js";

const STYLES = {
  remote: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-white",
    grid: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
    card: "bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100",
    well: "w-14 h-14 bg-brand-subtle rounded-full flex items-center justify-center mb-4",
    icon: "w-7 h-7 text-brand",
    title: "text-lg text-gray-900 mb-2",
  },
  local: {
    section: "py-16 md:py-24 px-4 md:px-8 bg-gray-50",
    grid: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8",
    card: "bg-white p-6 rounded-2xl shadow-sm",
    well: "w-12 h-12 bg-brand-subtle rounded-full flex items-center justify-center mb-4",
    icon: "w-6 h-6 text-brand",
    title: "text-xl text-gray-900 mb-2",
  },
};

/** "Why choose …" grid of four benefit cards. */
export default function ServiceBenefits({ variant, benefits }) {
  const style = STYLES[variant];
  return (
    <section className={style.section}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-12">{benefits.title}</h2>
        <div className={style.grid}>
          {benefits.items.map((benefit) => {
            const Icon = getIcon(benefit.icon);
            return (
              <div key={benefit.title} className={style.card}>
                <div className={style.well}>
                  <Icon className={style.icon} />
                </div>
                <h3 className={style.title}>{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
