import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import page from "../content/pages/bookkeeping.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import { getIcon } from "../lib/icons.js";
import { cx } from "../lib/cx.js";
import { tollFreeDashed } from "../lib/phone.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";
import { fill } from "../lib/template.js";

const H2 = "text-3xl text-gray-900 md:text-4xl lg:text-5xl";

function SectionTitle({ title, text, center }) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center")}>
      <h2 className={H2}>{title}</h2>
      {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
    </div>
  );
}

function CheckItem({ children, tone = "text-brand-bright" }) {
  return (
    <li className="flex items-start gap-3">
      <Check aria-hidden="true" className={cx("mt-0.5 h-5 w-5 flex-shrink-0", tone)} />
      <span>{children}</span>
    </li>
  );
}

function Hero() {
  const { hero } = page;
  return (
    <PageHero title={hero.title} text={hero.text} actions={hero.actions}>
      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-brand-subtle">
        {hero.trust.map((item) => (
          <CheckItem key={item} tone="text-white">
            {item}
          </CheckItem>
        ))}
      </ul>
    </PageHero>
  );
}

function Services() {
  const { services } = page;
  return (
    <section id="services" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={services.title} text={services.text} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.title} className={`${CARD} p-6`}>
                <div className={ICON_BADGE}>
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Together() {
  const { together } = page;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className={H2}>{together.title}</h2>
          {together.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg text-gray-600">
              {paragraph}
            </p>
          ))}
          <Button to={together.button.to} size="md" className="mt-8">
            {together.button.label}
          </Button>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-10">
          <h3 className="text-2xl font-semibold">{together.panelTitle}</h3>
          <ul className="mt-6 space-y-5">
            {together.benefits.map((benefit) => (
              <CheckItem key={benefit.title} tone="text-brand-subtle">
                <span className="block font-semibold">{benefit.title}</span>
                <span className="text-brand-subtle">{benefit.text}</span>
              </CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const { steps } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={steps.title} text={steps.text} />
        <ol className="mt-10 border-t border-gray-200">
          {steps.items.map((step, index) => (
            <li key={step.title} className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-gray-200 py-6">
              <span
                aria-hidden="true"
                className="col-span-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-white md:col-span-1"
              >
                {index + 1}
              </span>
              <h3 className="col-span-10 self-center text-lg font-semibold text-gray-900 md:col-span-4">{step.title}</h3>
              <p className="col-span-10 col-start-3 text-gray-600 md:col-span-7 md:col-start-auto">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const TAB = "min-h-10 rounded-full px-6 py-2 text-sm font-semibold transition-all sm:text-base";

function Pricing() {
  const { pricing } = page;
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={pricing.title} text={pricing.text} center />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1.5 shadow-lg">
            {[
              [false, pricing.monthlyLabel],
              [true, pricing.annualLabel],
            ].map(([isAnnual, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={annual === isAnnual}
                onClick={() => setAnnual(isAnnual)}
                className={cx(TAB, annual === isAnnual ? "bg-brand text-white shadow-md" : "text-gray-600 hover:text-gray-900")}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-brand-subtle px-3 py-1 text-sm font-medium text-brand">{pricing.saveLabel}</span>
        </div>

        <ul className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li key={plan.name} className={cx(CARD, "relative flex flex-col p-7", plan.popular && "ring-2 ring-brand")}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-popular px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
                  {pricing.popularLabel}
                </span>
              )}
              <h3 className={CARD_TITLE}>{plan.name}</h3>
              <p className="mt-2 min-h-12 text-gray-600">{plan.text}</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-brand">{annual ? plan.annual : plan.monthly}</span>
                <span className="text-gray-600">{annual ? pricing.periodAnnual : pricing.periodMonthly}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">{annual ? pricing.noteAnnual : pricing.noteMonthly}</p>
              <Button to={pricing.ctaTo} variant={plan.popular ? "primary" : "outline"} size="block" className="mt-6">
                {pricing.ctaLabel}
              </Button>
              <ul className="mt-6 flex-1 space-y-3 border-t border-gray-100 pt-6 text-gray-700">
                {plan.features.map((feature) => (
                  <CheckItem key={feature} tone="text-green-600">
                    {feature}
                  </CheckItem>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-gray-500">{pricing.footnote}</p>
      </div>
    </section>
  );
}

function Chips({ items }) {
  return (
    <ul className="mt-10 flex flex-wrap gap-3">
      {items.map((item) => {
        const Icon = item.icon ? getIcon(item.icon) : null;
        const label = item.label ?? item;
        return (
          <li key={label} className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 shadow-sm">
            {Icon && <Icon aria-hidden="true" className="h-5 w-5 text-brand-bright" />}
            {label}
          </li>
        );
      })}
    </ul>
  );
}

function IndustriesAndTools() {
  const { industries, tools } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <div>
          <SectionTitle title={industries.title} />
          <Chips items={industries.items} />
        </div>
        <div>
          <SectionTitle title={tools.title} text={tools.text} />
          <Chips items={tools.items} />
        </div>
      </div>
    </section>
  );
}

function CatchUp() {
  const { catchUp } = page;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className={`${CARD} mx-auto grid max-w-7xl gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center`}>
        <div>
          <h2 className={H2}>{catchUp.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{catchUp.text}</p>
          <Button to={catchUp.button.to} size="md" className="mt-8">
            {catchUp.button.label}
          </Button>
        </div>
        <ul className="grid gap-4 text-gray-700 sm:grid-cols-2">
          {catchUp.items.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClosingCta() {
  const { cta } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-8 py-12 text-white shadow-xl md:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-brand-subtle">{cta.text}</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Button to={cta.primary.to} variant="inverse">
            {cta.primary.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <a href={`tel:${tollFreeDashed}`} className="text-brand-subtle underline-offset-4 hover:text-white hover:underline">
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Bookkeeping service page. Copy from the supplied bookkeeping design, laid out with the site's
 * components: PageHero, white cards, numbered steps, pricing cards and the navy booking panel.
 */
export default function BookkeepingPage() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <Together />
      <Steps />
      <Pricing />
      <IndustriesAndTools />
      <CatchUp />
      <ClosingCta />
    </PageShell>
  );
}
