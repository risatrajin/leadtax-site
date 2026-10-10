import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  ChartColumn,
  ChartLine,
  Check,
  CreditCard,
  HardHat,
  History,
  House,
  Landmark,
  Laptop,
  Percent,
  Receipt,
  ShoppingBag,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import page from "../content/pages/bookkeeping.json";
import PageShell from "../components/layout/PageShell.jsx";
import Button from "../components/ui/Button.jsx";
import MapleLeafIcon from "../components/ui/MapleLeafIcon.jsx";
import { cx } from "../lib/cx.js";
import { tollFreeDashed } from "../lib/phone.js";
import { fill } from "../lib/template.js";

const ICONS = {
  BookOpen, Briefcase, Building2, ChartColumn, ChartLine, CreditCard, HardHat, History, House, Landmark,
  Laptop, Percent, Receipt, ShoppingBag, Stethoscope, Truck, UtensilsCrossed, Wallet,
};

const KICKER = "text-xs font-extrabold uppercase tracking-[0.1em] text-brand-bright";
const H2 = "text-4xl font-bold leading-[1.05] tracking-tight text-brand md:text-5xl";
const SOFT_CARD = "rounded-[20px] border border-slate-200 bg-white";

function CheckDot({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cx("inline-grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600", className)}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

function SectionHead({ kicker, title, text, children }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className={KICKER}>{kicker}</p>
      <h2 className={cx(H2, "mt-3")}>{title}</h2>
      {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
      {children}
    </div>
  );
}

function Dashboard({ dashboard }) {
  return (
    <div role="img" aria-label={dashboard.label} className="relative mx-auto min-h-[480px] max-w-xl lg:min-h-[530px]">
      <div aria-hidden="true" className="absolute -right-6 -top-6 h-48 w-48 rounded-full bg-brand-subtle/70" />
      <div aria-hidden="true" className="absolute -left-6 bottom-12 h-32 w-32 rounded-full bg-emerald-50" />

      <div className="absolute -left-8 top-[270px] z-10 hidden w-48 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
        <p className="text-xs font-bold text-gray-500">{dashboard.floatTax.label}</p>
        <p className="text-lg font-extrabold text-brand">{dashboard.floatTax.value}</p>
        <p className="text-[11px] font-extrabold text-emerald-600">{dashboard.floatTax.note}</p>
      </div>

      <div className="relative z-[5] -rotate-1 rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-extrabold text-brand">{dashboard.title}</p>
            <p className="text-xs text-gray-500">{dashboard.period}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-600">{dashboard.status}</span>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {dashboard.metrics.map((metric, index) => (
            <div key={metric.label} className={cx("rounded-2xl border border-slate-200 bg-slate-50 p-3.5", index === 2 && "hidden sm:block")}>
              <p className="mb-1 text-xs font-bold text-gray-500">{metric.label}</p>
              <p className="text-xl font-bold text-brand">{metric.value}</p>
              <p className={cx("text-[11px]", metric.up ? "font-extrabold text-emerald-600" : "text-gray-500")}>{metric.note}</p>
            </div>
          ))}
        </div>
        <div className="h-48 overflow-hidden rounded-[18px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3">
          <svg viewBox="0 0 560 180" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="bookkeeping-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1459c7" stopOpacity=".25" />
                <stop offset="100%" stopColor="#1459c7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="#e8eef6" strokeWidth="1">
              <line x1="20" y1="35" x2="540" y2="35" />
              <line x1="20" y1="80" x2="540" y2="80" />
              <line x1="20" y1="125" x2="540" y2="125" />
            </g>
            <path d="M20 135 C80 120,110 126,160 98 S250 104,300 72 S405 70,455 43 S510 46,540 27 L540 165 L20 165Z" fill="url(#bookkeeping-fill)" />
            <path d="M20 135 C80 120,110 126,160 98 S250 104,300 72 S405 70,455 43 S510 46,540 27" fill="none" stroke="#1459c7" strokeWidth="5" strokeLinecap="round" />
            <circle cx="540" cy="27" r="7" fill="#1459c7" />
          </svg>
        </div>
        <div className="mt-3.5 flex items-center gap-3 rounded-2xl bg-brand px-4 py-3.5 text-white">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white/15">
            <Check aria-hidden="true" className="h-4 w-4" />
          </span>
          <span>
            <span className="block font-bold">{dashboard.reconcile.title}</span>
            <span className="text-xs text-brand-subtle">{dashboard.reconcile.text}</span>
          </span>
        </div>
      </div>

      <div className="absolute -right-5 bottom-7 z-10 hidden w-64 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
        <p className="text-xs font-bold text-gray-500">{dashboard.floatReceipt.label}</p>
        <div className="flex items-end justify-between">
          <p className="text-lg font-extrabold text-brand">{dashboard.floatReceipt.value}</p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">{dashboard.floatReceipt.status}</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { hero } = page;
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_85%_12%,rgba(20,89,199,0.16),transparent_24%),radial-gradient(circle_at_0%_60%,rgba(202,225,255,0.7),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#fff_88%)] px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-subtle/60 px-3 py-2 text-[13px] font-extrabold tracking-wide text-brand-bright">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
            {hero.eyebrow}
          </p>
          <h1 className="my-6 text-5xl font-extrabold leading-[0.98] tracking-tight text-brand sm:text-6xl lg:text-7xl">
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block bg-gradient-to-r from-brand-bright to-indigo-600 bg-clip-text text-transparent">{hero.titleAccent}</span>
          </h1>
          <p className="mb-7 max-w-2xl text-lg text-gray-600 md:text-xl">{hero.text}</p>
          <div className="mb-8 flex flex-wrap gap-3">
            <Button to={hero.primary.to} size="md">
              {hero.primary.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button href={hero.secondary.href} variant="outline" size="md" className="bg-white">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckDot />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Dashboard dashboard={hero.dashboard} />
      </div>
    </section>
  );
}

function Services() {
  const { services } = page;
  return (
    <section id="services" className="scroll-mt-28 bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={services.kicker} title={services.title} text={services.text} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className={cx(SOFT_CARD, "p-6 transition hover:-translate-y-1 hover:shadow-xl")}>
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-brand-bright">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-brand">{item.title}</h3>
                <p className="text-[15px] text-gray-600">{item.text}</p>
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
    <section className="bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={KICKER}>{together.kicker}</p>
          <h2 className={cx(H2, "mb-5 mt-3")}>
            {together.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {together.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-lg text-gray-600">
              {paragraph}
            </p>
          ))}
          <Button to={together.button.to} size="md" className="mt-2">
            {together.button.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-brand-strong to-brand p-8 text-white md:p-9">
          <span aria-hidden="true" className="absolute -right-28 -top-24 h-72 w-72 rounded-full bg-brand-bright/30" />
          <h3 className="relative mb-5 text-3xl font-bold">{together.panelTitle}</h3>
          <ul className="relative grid gap-3">
            {together.benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-3 rounded-xl bg-white/[0.07] p-3.5">
                <span aria-hidden="true" className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span>
                  <span className="block font-bold">{benefit.title}</span>
                  <span className="text-sm text-brand-subtle">{benefit.text}</span>
                </span>
              </li>
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
    <section className="bg-slate-50/60 px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={steps.kicker} title={steps.title} text={steps.text} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, index) => (
            <li key={step.title} className="border-t-[3px] border-slate-200 p-6">
              <p className="mb-4 text-[13px] font-extrabold text-brand-bright">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 text-lg font-bold text-brand">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  const { pricing } = page;
  const [annual, setAnnual] = useState(false);
  const toggle = (on) =>
    cx(
      "rounded-full border px-4 py-2.5 text-sm font-bold transition-colors",
      on ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-gray-600 hover:text-brand",
    );

  return (
    <section id="pricing" className="scroll-mt-28 bg-slate-50 px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={pricing.kicker} title={pricing.title} text={pricing.text}>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={toggle(!annual)}>
              {pricing.monthlyLabel}
            </button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={toggle(annual)}>
              {pricing.annualLabel}
            </button>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">{pricing.saveLabel}</span>
          </div>
        </SectionHead>

        <ul className="grid items-stretch gap-6 pt-2 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li
              key={plan.name}
              className={cx(
                "relative flex flex-col rounded-3xl bg-white p-7",
                plan.popular ? "border-2 border-brand-bright shadow-xl lg:-translate-y-2" : "border border-slate-200",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-bright px-3.5 py-1.5 text-xs font-extrabold uppercase text-white">
                  {pricing.popularLabel}
                </span>
              )}
              <h3 className="text-xl font-extrabold text-brand">{plan.name}</h3>
              <p className="mb-5 mt-2 min-h-11 text-sm text-gray-600">{plan.text}</p>
              <p className="flex items-end gap-1">
                <span className="text-5xl font-extrabold leading-none tracking-tight text-brand">{annual ? plan.annual : plan.monthly}</span>
                <span className="pb-1 font-semibold text-gray-500">{annual ? pricing.periodAnnual : pricing.periodMonthly}</span>
              </p>
              <p className="mb-5 mt-1 text-xs text-gray-500">{annual ? pricing.noteAnnual : pricing.noteMonthly}</p>
              <Button to={pricing.ctaTo} variant={plan.popular ? "primary" : "outline"} size="md">
                {pricing.ctaLabel}
              </Button>
              <ul className="mt-6 grid flex-1 content-start gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm text-gray-700">
                    <CheckDot />
                    {feature}
                  </li>
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

function Industries() {
  const { industries } = page;
  return (
    <section className="bg-slate-50 px-4 pb-20 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={industries.kicker} title={industries.title} />
        <ul className="flex flex-wrap justify-center gap-3">
          {industries.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.label} className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-3 font-semibold text-gray-700">
                <Icon aria-hidden="true" className="h-5 w-5 text-brand-bright" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function CatchUp() {
  const { catchUp } = page;
  return (
    <section className="bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50 px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[28px] border border-slate-200 bg-white p-7 shadow-xl md:p-11 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className={KICKER}>{catchUp.kicker}</p>
          <h2 className={cx(H2, "mt-3")}>
            {catchUp.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-gray-600">{catchUp.text}</p>
          <ul className="my-6 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
            {catchUp.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckDot />
                {item}
              </li>
            ))}
          </ul>
          <Button to={catchUp.button.to} size="md">
            {catchUp.button.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div role="img" aria-label={catchUp.progressTitle} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="mb-4 font-extrabold text-brand">{catchUp.progressTitle}</p>
          <ul className="grid gap-2.5">
            {catchUp.progress.map((row) => {
              const Icon = ICONS[row.icon];
              return (
                <li key={row.title} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-subtle/60 text-brand-bright">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-gray-900">{row.title}</span>
                      <span className="text-xs font-semibold text-gray-500">{row.note}</span>
                    </span>
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{row.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  const { tools } = page;
  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker={tools.kicker} title={tools.title} text={tools.text}>
          <ul className="mt-8 flex flex-wrap justify-center gap-3.5">
            {tools.items.map((tool) => (
              <li key={tool} className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-gray-700">
                {tool}
              </li>
            ))}
          </ul>
        </SectionHead>
      </div>
    </section>
  );
}

function CanadaPanel() {
  const { canada } = page;
  return (
    <section className="bg-white px-4 pb-6 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-brand-strong px-7 py-12 text-center text-white md:p-14">
        <span aria-hidden="true" className="absolute -left-[10%] -top-[30%] h-96 w-96 rounded-full bg-brand-bright/20" />
        <MapleLeafIcon className="relative mx-auto h-10 w-10 text-canada-red" />
        <h2 className="relative mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">{canada.title}</h2>
        <p className="relative mx-auto mb-7 mt-4 max-w-2xl text-brand-subtle">{canada.text}</p>
        <Button to={canada.button.to} variant="inverse" size="md" className="relative">
          {canada.button.label}
        </Button>
      </div>
    </section>
  );
}

function FinalCta() {
  const { cta } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[30px] bg-gradient-to-br from-brand-bright to-brand px-7 py-12 text-center text-white shadow-2xl md:p-14">
        <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">{cta.title}</h2>
        <p className="mx-auto mb-7 mt-4 max-w-2xl text-lg text-brand-subtle">{cta.text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to={cta.primary.to} variant="inverse" size="md">
            {cta.primary.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button href={`tel:${tollFreeDashed}`} variant="outlineInverse" size="md">
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Bookkeeping service page, built from the supplied bookkeeping design (content: pages/bookkeeping.json). */
export default function BookkeepingPage() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <Together />
      <Steps />
      <Pricing />
      <Industries />
      <CatchUp />
      <Tools />
      <CanadaPanel />
      <FinalCta />
    </PageShell>
  );
}
