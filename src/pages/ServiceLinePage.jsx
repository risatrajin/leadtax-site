import { ArrowRight } from "lucide-react";
import nav from "../content/nav.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FirstVisit from "../sections/home/FirstVisit.jsx";
import CtaPanel from "../sections/home/CtaPanel.jsx";
import { getIcon } from "../lib/icons.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";
import personalTax from "../content/pages/personal-tax.json";
import businessTax from "../content/pages/business-tax.json";
import trustEstateTax from "../content/pages/trust-estate-tax.json";

const PAGES = {
  "personal-tax": personalTax,
  "business-tax": businessTax,
  "trust-estate-tax": trustEstateTax,
};

/** The three ways to work with LeadTax, linking to their pages (titles and text from nav.json). */
const WAYS = ["fileInPerson", "fileRemotely", "dropOff"].map((id) => nav.links[id]);

function ServicesGrid({ services }) {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{services.title}</h2>
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

function WaysToWork({ title }) {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{title}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {WAYS.map((way) => {
            const Icon = getIcon(way.icon);
            return (
              <li key={way.label}>
                <SmartLink to={way.to} className={`${CARD} group flex h-full flex-col p-6 transition-shadow hover:shadow-lg`}>
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

/**
 * A service page (Personal tax, Business tax, Trust & estate): hero, what the service
 * covers, the ways to work with LeadTax and a booking panel. Content: src/content/pages/<slug>.json.
 */
export default function ServiceLinePage({ slug }) {
  const page = PAGES[slug];
  return (
    <PageShell>
      <PageHero title={page.hero.title} text={page.hero.text} actions={page.hero.actions} />
      <ServicesGrid services={page.services} />
      {page.firstVisit && <FirstVisit />}
      <WaysToWork title={page.waysTitle} />
      <div className="pt-16 md:pt-24">
        <CtaPanel to={page.cta.to} />
      </div>
    </PageShell>
  );
}
