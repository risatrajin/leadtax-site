import { Link } from "react-router";
import { ArrowRight, Download } from "lucide-react";
import nav from "../content/nav.json";
import { posts } from "../content/blog/posts.json";
import personalTax from "../content/pages/personal-tax.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import { CheckItem, ClosingCta, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { getIcon } from "../lib/icons.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";

const PAGES = { "personal-tax": personalTax };

/** The three ways to work with LeadTax, linking to their pages (titles and text from nav.json). */
const WAYS = ["fileInPerson", "fileRemotely", "dropOff"].map((id) => nav.links[id]);

function Hero({ hero }) {
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

/** Side panel next to the steps: a white checklist card or a navy feature panel. */
function ProcessPanel({ panel }) {
  if (panel.type === "checklist") {
    return (
      <aside className={`${CARD} p-8 md:p-10`}>
        <h3 className={CARD_TITLE}>{panel.title}</h3>
        <ul className="mt-6 space-y-3 text-gray-600">
          {panel.items.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
        <SmartLink
          href={panel.link.href}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          {panel.link.label}
        </SmartLink>
      </aside>
    );
  }
  return (
    <aside className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-10">
      <h3 className="text-2xl font-semibold">{panel.title}</h3>
      <p className="mt-4 text-brand-subtle">{panel.text}</p>
      <Button to={panel.link.to} variant="inverse" size="md" className="mt-8">
        {panel.link.label}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Button>
    </aside>
  );
}

function Process({ process }) {
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
        <ProcessPanel panel={process.panel} />
      </div>
    </section>
  );
}

function CardRow({ title, items }) {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={title} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
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

function WaysToWork() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Ways to work with us" />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {WAYS.map((way) => {
            const Icon = getIcon(way.icon);
            return (
              <li key={way.label}>
                <SmartLink to={way.to} className={`${CARD} group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0`}>
                  <div className={ICON_BADGE}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <h3 className={`mt-4 ${CARD_TITLE}`}>{way.label}</h3>
                  <p className="mt-2 flex-1 text-gray-600">{way.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand group-hover:underline">
                    {way.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Faq({ faq }) {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={faq.title} center />
        <div className="mt-10">
          <FaqAccordion items={faq.items} variant="bordered" />
        </div>
      </div>
    </section>
  );
}

function Articles({ articles, className }) {
  const list = articles.slugs.map((slug) => posts.find((post) => post.slug === slug)).filter(Boolean);
  return (
    <section className={`${className} px-4 py-16 md:px-8 md:py-24`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={articles.title} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className={`${CARD} group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0`}
              >
                <img src={post.cardImage ?? post.image} alt="" className="h-44 w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-medium text-brand-bright">{post.category}</p>
                  <h3 className={`mt-2 ${CARD_TITLE} group-hover:text-brand`}>{post.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-gray-600">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Personal tax page, in the same layout as the Trust & estate page:
 * photo hero, services, steps with a side panel, who we help, ways to work with us,
 * optional FAQ, related articles and the booking panel. Content: src/content/pages/<slug>.json.
 */
export default function ServiceLinePage({ slug }) {
  const page = PAGES[slug];
  return (
    <PageShell>
      <Hero hero={page.hero} />
      <IconCardGrid id="services" title={page.services.title} text={page.services.text} items={page.services.items} />
      <Process process={page.process} />
      <CardRow title={page.audience.title} items={page.audience.items} />
      <WaysToWork />
      {page.faq && <Faq faq={page.faq} />}
      <Articles articles={page.articles} className={page.faq ? "bg-gray-50" : "bg-white"} />
      <ClosingCta cta={page.cta} />
    </PageShell>
  );
}
