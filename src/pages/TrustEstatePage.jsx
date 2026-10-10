import page from "../content/pages/trust-estate-tax.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import { CheckItem, ClosingCta, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { getIcon } from "../lib/icons.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";

function Hero() {
  const { hero } = page;
  return (
    <PageHero title={hero.title} text={hero.text} actions={hero.actions} image={hero.image}>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-brand-subtle">
        {hero.trust.map((item) => (
          <CheckItem key={item} tone="text-white">
            {item}
          </CheckItem>
        ))}
      </ul>
    </PageHero>
  );
}

/** The four filing steps beside the navy T3 deadline panel. */
function Process() {
  const { process, deadline } = page;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <h2 className={H2}>{process.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{process.text}</p>
          <ol className="mt-8 space-y-5">
            {process.items.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-gray-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">{deadline.label}</p>
          <p className="mt-3 text-6xl font-bold tracking-tight md:text-7xl">{deadline.value}</p>
          <p className="mt-4 text-brand-subtle">{deadline.text}</p>
          <p className="mt-6 border-t border-white/15 pt-4 text-sm text-white/70">{deadline.note}</p>
        </aside>
      </div>
    </section>
  );
}

function Audience() {
  const { audience } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={audience.title} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.items.map((item) => {
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

function Faq() {
  const { faq } = page;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={faq.title} center />
        <div className="mt-10">
          <FaqAccordion items={faq.items} variant="bordered" />
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">{page.disclaimer}</p>
      </div>
    </section>
  );
}

/**
 * Trust & estate tax page. Copy from the supplied estate & trust design, laid out with the
 * site's components (content: pages/trust-estate-tax.json).
 */
export default function TrustEstatePage() {
  const { services } = page;
  return (
    <PageShell>
      <Hero />
      <IconCardGrid id="services" title={services.title} text={services.text} items={services.items} />
      <Process />
      <Audience />
      <Faq />
      <ClosingCta cta={page.cta} />
    </PageShell>
  );
}
