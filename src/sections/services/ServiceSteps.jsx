import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";

const BACKGROUND = { remote: "bg-gray-50", local: "bg-white" };

/** "How it works" row of four icon steps. */
export default function ServiceSteps({ variant, steps }) {
  return (
    <section className={cx("py-16 md:py-24 px-4 md:px-8", BACKGROUND[variant])}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-12">{steps.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.items.map((step) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={step.text} className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-brand-subtle rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-brand" />
                  </div>
                </div>
                <p className="text-lg text-gray-900">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
