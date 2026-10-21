import { useState } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import page from "../content/pages/bookkeeping.json";
import site from "../content/site.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button, { buttonClasses } from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import CopyText from "../components/ui/CopyText.jsx";
import LogoOrbit from "../components/ui/LogoOrbit.jsx";
import { QuickBooksLogo, ShopifyLogo, SquareLogo, StripeLogo } from "../components/ui/BrandLogos.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import { EYEBROW, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import ServiceQuestions from "../sections/services/ServiceQuestions.jsx";
import { getIcon } from "../lib/icons.js";
import { tollFreeDashed } from "../lib/phone.js";
import { CARD, SECTION } from "../lib/styles.js";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";
import OnThisPage from "../components/ui/OnThisPage.jsx";

/** Brand logos for the tools row, by the "logo" key in the content. */
const LOGOS = { QuickBooks: QuickBooksLogo, Square: SquareLogo, Stripe: StripeLogo, Shopify: ShopifyLogo };


/** Small round tick used in the lists. */
function Tick({ className = "" }) {
  return (
    <span className={cx("flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand", className)}>
      <Check aria-hidden="true" className="h-3.5 w-3.5" />
    </span>
  );
}

function Hero() {
  const { hero, anchors } = page;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.titleLines.map((line) => (
          <span key={line} className="block">
            {line}{" "}
          </span>
        ))}
        text={hero.text}
        actions={hero.actions}
        image={hero.image}
        imageNote={hero.note}
        decor
      />
      <OnThisPage anchors={anchors} />
    </>
  );
}

/** The six services as icon cards. */
function Services() {
  const { services } = page;
  return (
    <section id="services" className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={services.eyebrow} title={services.title} text={services.text} center />
        <IconCardGrid items={services.items} />
      </div>
    </section>
  );
}

/** Bookkeeping + tax: the case on the left, the benefits on a blue panel on the right. */
function Together() {
  const { together } = page;
  return (
    <section className={cx(SECTION, "bg-gray-50")}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={cx(EYEBROW, "mb-3")}>{together.eyebrow}</p>
          <h2 className={H2}>{together.title}</h2>
          {together.paragraphs.map((text) => (
            <p key={text} className="mt-5 text-lg text-gray-600">
              {text}
            </p>
          ))}
          <Button href={together.action.href} className="group mt-8 gap-2">
            {together.action.label}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl sm:p-10">
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <h3 className="text-2xl font-semibold sm:text-3xl">{together.panelTitle}</h3>
          <ul className="mt-6 space-y-3">
            {together.benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-3 rounded-2xl bg-white/10 p-4">
                <Tick className="bg-white text-brand" />
                <span>
                  <span className="block font-semibold">{benefit.title}</span>
                  <span className="block text-sm text-white/80">{benefit.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Four numbered steps joined by a line on wide screens. */
function Steps() {
  const { steps } = page;
  return (
    <section id="how-it-works" className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={steps.eyebrow} title={steps.title} text={steps.text} center />
        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-brand/30 lg:block" />
          {steps.items.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white shadow-lg"
              >
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Three plans with a Monthly / Annual switch, in the style of the main pricing page. */
function Pricing() {
  const { pricing } = page;
  const [periodId, setPeriodId] = useState(pricing.periods[0].id);
  const period = pricing.periods.find((candidate) => candidate.id === periodId);

  return (
    <section id="pricing" className={cx(SECTION, "bg-gray-50")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={pricing.eyebrow} title={pricing.title} text={pricing.text} center />
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="inline-flex rounded-full bg-gray-200/70 p-1">
            {pricing.periods.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                aria-pressed={candidate.id === periodId}
                onClick={() => setPeriodId(candidate.id)}
                className={cx(
                  "min-h-10 rounded-full px-5 py-2 text-sm font-semibold transition-all sm:text-base",
                  candidate.id === periodId ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900",
                )}
              >
                {candidate.label}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">{pricing.saveBadge}</span>
        </div>

        <ul className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li
              key={plan.name}
              className={cx(
                "relative flex flex-col rounded-3xl border bg-white p-7 sm:p-8",
                plan.popular ? "border-brand ring-1 ring-brand shadow-xl" : "border-gray-200",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  {pricing.popularLabel}
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-600 lg:min-h-[2.75rem]">{plan.text}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight text-gray-900">{plan.price[periodId]}</span>
                <span className="font-medium text-gray-500">{period.suffix}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">{period.note}</p>
              <a
                href={pricing.getStartedHref}
                className={buttonClasses({ variant: plan.popular ? "primary" : "outline", size: "block", className: "mt-6" })}
              >
                {pricing.getStartedLabel}
              </a>
              <ul className="mt-6 flex-1 space-y-3 border-t border-gray-100 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <Tick />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-500">{pricing.footnote}</p>
      </div>
    </section>
  );
}

function Industries() {
  const { industries } = page;
  return (
    <section className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={industries.eyebrow} title={industries.title} center />
        <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {industries.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm"
              >
                <Icon aria-hidden="true" className="h-5 w-5 text-brand" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Catch-up offer with a checklist, beside a "catch-up progress" card. */
function CatchUp() {
  const { catchUp } = page;
  return (
    <section id="catch-up" className={cx(SECTION, "bg-gradient-to-br from-brand-subtle/60 via-white to-green-50")}>
      <div className={cx(CARD, "mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 p-7 shadow-xl sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12")}>
        <div>
          <p className={cx(EYEBROW, "mb-3")}>{catchUp.eyebrow}</p>
          <h2 className={H2}>{catchUp.title}</h2>
          <p className="mt-5 text-lg text-gray-600">{catchUp.text}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {catchUp.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-gray-700">
                <Tick />
                {point}
              </li>
            ))}
          </ul>
          <Button href={catchUp.action.href} className="group mt-8 gap-2">
            {catchUp.action.label}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div aria-hidden="true" className="rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
          <p className="font-semibold text-gray-900">{catchUp.progressTitle}</p>
          <ul className="mt-4 space-y-3">
            {catchUp.progress.map((row) => {
              const Icon = getIcon(row.icon);
              return (
                <li key={row.title} className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-gray-900">{row.title}</span>
                      <span className="block text-sm text-gray-500">
                        {row.detail}
                        {/* Phones: the status sits in this line, so the title has the full width. */}
                        <span className="font-semibold text-green-700 sm:hidden"> · {row.status}</span>
                      </span>
                    </span>
                  </span>
                  <span className="hidden flex-shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 sm:inline">{row.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Tool logo (or icon tile) at the given size. */
function ToolMark({ tool, size }) {
  const Logo = LOGOS[tool.logo];
  if (Logo) return <Logo className={size} />;
  const Icon = getIcon(tool.icon);
  return <Icon aria-hidden="true" className={cx(size, "text-brand")} />;
}

/** Centred heading, then the tools turning around the LeadTax mark. */
function Tools() {
  const { tools } = page;
  return (
    <section className={cx(SECTION, "overflow-hidden bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={tools.eyebrow} title={tools.title} text={tools.text} center />
        <div className="mt-10">
          <LogoOrbit
            mark={tools.mark}
            markAlt={site.name}
            hint={tools.hint}
            items={tools.items.map((tool) => ({ label: tool.label, text: tool.info, node: <ToolMark tool={tool} size="h-[48%] w-[48%]" /> }))}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * "Canadian bookkeeping" as a feature split (maple badge, copy and a link on the left, four point
 * cards on the right), so it reads differently from the blue call to action that follows.
 */
function Canada() {
  const { canada } = page;
  const MapleLeaf = getIcon("MapleLeaf");
  return (
    <section className={cx(SECTION, "bg-gray-50")}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <MapleLeaf aria-hidden="true" className="h-7 w-7" />
          </span>
          <p className={cx(EYEBROW, "mb-3 mt-6")}>{canada.eyebrow}</p>
          <h2 className={H2}>{canada.title}</h2>
          <p className="mt-5 text-lg text-gray-600">{canada.text}</p>
          <SmartLink to={canada.action.to} className="group mt-8 inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline">
            {canada.action.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {canada.points.map((point) => {
            const Icon = getIcon(point.icon);
            return (
              <li key={point.title} className={cx(CARD, "p-6")}>
                <Icon aria-hidden="true" className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-semibold text-gray-900">{point.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{point.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Blue closing call to action. */
function Closing() {
  const { cta } = page;
  return (
    <section className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-br from-brand to-brand-strong px-6 py-14 text-center text-white shadow-xl sm:px-12">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold md:text-4xl lg:text-5xl">{cta.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{cta.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={cta.action.href} variant="inverse" className="group gap-2">
            {cta.action.label}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <CopyText value={tollFreeDashed} className={buttonClasses({ variant: "outlineInverseFill", className: "gap-2" })}>
            <Phone aria-hidden="true" className="h-5 w-5" />
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </CopyText>
        </div>
      </div>
    </section>
  );
}

/**
 * Bookkeeping page: services, bookkeeping + tax together, how it works, plans, industries,
 * catch-up, tools, a Canadian panel and a closing call to action, then the FAQ and the enquiry
 * form (#contact). Content: src/content/pages/bookkeeping.json.
 */
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
      <Canada />
      <Closing />
      <ServiceQuestions faqs={page.faqs} className="bg-gray-50" />
      <EnquirySection service={page.name} className="bg-white" />
    </PageShell>
  );
}
