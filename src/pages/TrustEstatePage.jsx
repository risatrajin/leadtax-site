import { ArrowRight, CalendarClock } from "lucide-react";
import page from "../content/pages/trust-estate.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import OnThisPage from "../components/ui/OnThisPage.jsx";
import { EYEBROW, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import ServiceQuestions from "../sections/services/ServiceQuestions.jsx";
import { getIcon } from "../lib/icons.js";
import { CARD, SECTION } from "../lib/styles.js";
import { cx } from "../lib/cx.js";


function Hero() {
  const { hero, anchors } = page;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
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

/**
 * Decorative visual: a pastel panel with a band of teal triangles, a person rising out of its top
 * edge, and floating chips with the T3 deadline ("90 Days" · "Deadline") across the middle.
 */
function ProcessVisual({ visual }) {
  const triangles = (
    <svg viewBox="0 0 240 120" preserveAspectRatio="none" className="h-full w-full">
      {[0, 60, 120, 180].map((x) => (
        <g key={x} className="fill-teal-200/80">
          <path d={`M${x} 0 L${x + 60} 60 L${x} 120 Z`} />
          <path d={`M${x + 60} 0 L${x + 60} 120 L${x + 30} 60 Z`} opacity="0.6" />
        </g>
      ))}
    </svg>
  );
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/3.4] w-full max-w-xl">
      {/* Pastel panel, starting a little below the top so the person rises out of it. */}
      <div className="absolute inset-x-0 bottom-0 top-[16%] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_85%_15%,#bfdbfe,transparent_55%),radial-gradient(circle_at_10%_95%,#fde68a,transparent_45%),linear-gradient(160deg,#bfdbfe,#fbcfe8_55%,#bfdbfe)]">
        <div className="absolute left-0 top-[40%] h-[34%] w-[38%]">{triangles}</div>
        <div className="absolute right-0 top-[40%] h-[34%] w-[38%] -scale-x-100">{triangles}</div>
      </div>
      <img src={visual.image} alt="" width="591" height="578" loading="lazy" decoding="async" className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom" />
      {/* Chips across the middle. */}
      <div className="float absolute left-1/2 top-[60%] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap sm:top-[54%] sm:gap-3">
        {/* White bar behind the chips so they read as one connected label. */}
        <span className="absolute inset-x-6 top-1/2 h-3 -translate-y-1/2 bg-white" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-teal-300 text-gray-900 ring-4 ring-white sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-2xl sm:ring-[5px]">
          <CalendarClock className="h-6 w-6 sm:h-8 sm:w-8" />
        </span>
        <span className="relative rounded-xl bg-white px-3 py-1.5 text-lg font-semibold tracking-tight text-gray-900 sm:px-6 sm:py-3 sm:text-4xl">
          {visual.chips[0]}
        </span>
        <span className="relative rounded-xl bg-white px-3 py-1.5 font-serif text-lg text-gray-900 sm:px-6 sm:py-3 sm:text-4xl">{visual.chips[1]}</span>
      </div>
    </div>
  );
}

/** Copy and the four steps on the left; the visual with the 90-day deadline on the right. */
function Process() {
  const { process } = page;
  const { deadline } = process;
  return (
    <section id="how-it-works" className={cx(SECTION, "bg-gray-50")}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={cx(EYEBROW, "mb-3")}>{process.eyebrow}</p>
          <h2 className={H2}>{process.title}</h2>
          <p className="mt-5 text-lg text-gray-600">{process.text}</p>
          <ol className="mt-8 space-y-5">
            {process.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white shadow-md">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-gray-900">{step.title}</span>
                  <span className="mt-1 block text-gray-600">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <ProcessVisual visual={process.visual} />
          {/* The deadline rule in words, under the visual. */}
          <p className="mx-auto mt-6 max-w-xl text-gray-600">
            <span className="font-semibold text-gray-900">{deadline.label}: </span>
            {deadline.text}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400">{deadline.note}</p>
        </div>
      </div>
    </section>
  );
}

function Who() {
  const { who } = page;
  return (
    <section id="who-we-serve" className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={who.eyebrow} title={who.title} center />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {who.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.title} className={cx(CARD, "p-6")}>
                <Icon aria-hidden="true" className="h-7 w-7 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-gray-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Blue call to action with the general-information disclaimer under it. */
function Closing() {
  const { cta, disclaimer } = page;
  return (
    <section className={cx(SECTION, "bg-white")}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-gradient-to-br from-brand to-brand-strong px-6 py-12 text-white shadow-xl sm:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-lg text-white/85">{cta.text}</p>
        </div>
        <Button href={cta.action.href} variant="inverse" className="group flex-shrink-0 gap-2">
          {cta.action.label}
          <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-gray-500">{disclaimer}</p>
    </section>
  );
}

/**
 * Trust & estate page: services, how it works with the T3 deadline, who we serve, a call to action,
 * the FAQ and the enquiry form (#contact). Content: src/content/pages/trust-estate.json.
 */
export default function TrustEstatePage() {
  return (
    <PageShell>
      <Hero />
      <Services />
      <Process />
      <Who />
      <ServiceQuestions faqs={page.faqs} className="bg-gray-50" />
      <Closing />
      <EnquirySection service={page.name} className="bg-gray-50" />
    </PageShell>
  );
}
