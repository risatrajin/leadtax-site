import { Check } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { crossBorderAction } from "./links.js";

const STYLES = {
  standard: {
    card: "bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow",
    name: "text-2xl font-bold text-gray-900 mb-2",
    price: "text-4xl font-bold text-brand mb-2",
    unit: "text-gray-600",
    check: "w-5 h-5 text-green-600 flex-shrink-0 mt-0.5",
    feature: "text-gray-700",
    button: "primary",
  },
  featured: {
    card: "bg-brand text-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative",
    name: "text-2xl font-bold mb-2",
    price: "text-4xl font-bold mb-2",
    unit: "text-brand-subtle",
    check: "w-5 h-5 text-green-400 flex-shrink-0 mt-0.5",
    feature: undefined,
    button: "inverse",
  },
};

function PlanCard({ plan, isLast }) {
  const style = plan.featured ? STYLES.featured : STYLES.standard;
  return (
    <div className={isLast ? `${style.card} sm:col-span-2 md:col-span-1` : style.card}>
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
          {plan.badge}
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className={style.name}>{plan.name}</h3>
        <div className={style.price}>{plan.price}</div>
        <p className={style.unit}>{plan.unit}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check className={style.check} />
            <span className={style.feature}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        {...crossBorderAction({ href: "consultation" })}
        variant={style.button}
        size="block"
      >
        {plan.ctaLabel}
      </Button>
    </div>
  );
}

export default function CrossBorderPricing({ pricing }) {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-gray-900">{pricing.title}</h2>
          <p className="text-lg text-gray-600">{pricing.intro}</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pricing.plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} isLast={index === pricing.plans.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
