import { ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import page from "../content/pages/tax-dates.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { CARD, CARD_TITLE } from "../lib/styles.js";

const MONTH = new Intl.DateTimeFormat("en-CA", { month: "short", timeZone: "UTC" });
const DAY = new Intl.DateTimeFormat("en-CA", { day: "numeric", timeZone: "UTC" });
const FULL = new Intl.DateTimeFormat("en-CA", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Important tax dates: the year's CRA deadlines as a timeline, grouped by season. */
export default function TaxDatesPage() {
  const { hero, groups, corporate, source } = page;
  return (
    <PageShell>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} decor />

      <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <SectionTitle title={group.title} />
              <ol className="mt-8 space-y-4">
                {group.items.map((item) => {
                  const date = new Date(`${item.date}T00:00:00Z`);
                  return (
                    <li key={item.date + item.title} className={`${CARD} flex items-center gap-5 p-5 md:gap-7 md:p-6`}>
                      <time
                        dateTime={item.date}
                        className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-brand text-white shadow-md"
                      >
                        <span className="text-sm font-semibold uppercase">{MONTH.format(date)}</span>
                        <span className="text-3xl font-bold leading-none">{DAY.format(date)}</span>
                      </time>
                      <div>
                        <h3 className={CARD_TITLE}>{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.text}</p>
                        <p className="mt-1.5 text-sm font-medium text-brand">{FULL.format(date)}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}

          <div className={`${CARD} flex flex-col gap-5 p-7 md:flex-row md:items-start`}>
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
              <Building2 aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{corporate.title}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-600">
                {corporate.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <SmartLink to={corporate.link.to} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
                {corporate.link.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </SmartLink>
            </div>
          </div>

          <p className="text-center text-gray-600">
            {source.text}{" "}
            <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">
              {source.label}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
