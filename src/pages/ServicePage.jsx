import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import content from "../content/service-pages.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import { EYEBROW, H2, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { getIcon } from "../lib/icons.js";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";
import { CARD, CARD_TITLE } from "../lib/styles.js";

const SECTION = "scroll-mt-28 px-4 py-16 md:px-8 md:py-24";
const LINK = "inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline";

function Hero({ page }) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.titleLines.join(" ")}
        text={page.intro}
        actions={content.heroActions}
        image={page.image}
        imageNote={{ title: page.fit, text: content.fitPoints.join(" · ") }}
        decor
      />
      <nav aria-label="On this page" className="border-b border-gray-200 bg-white px-4 py-4 md:px-8">
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {content.anchors.map((anchor) => (
            <li key={anchor.href}>
              <a
                href={anchor.href}
                className="inline-flex rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-brand hover:text-brand"
              >
                {anchor.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function Scope({ scope }) {
  return (
    <section id="included" className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={content.scopeEyebrow} title={scope.title} text={scope.text} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {scope.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.title}
                className={`${CARD} group p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className={`mt-5 ${CARD_TITLE}`}>{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Saves the checklist as a plain-text file, as the package's "Download your checklist" does. */
function downloadChecklist(page) {
  const { prepare } = content;
  const text = [
    fill(prepare.fileHeader, { name: page.name.toUpperCase() }),
    "",
    ...page.docs.map((doc) => `[ ] ${doc}`),
    "",
    prepare.fileFooter,
  ].join("\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `leadtax-${page.slug}-checklist.txt`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Prepare({ page }) {
  const { prepare } = content;
  const [done, setDone] = useState(() => new Set());
  const toggle = (doc) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(doc) ? next.delete(doc) : next.add(doc);
      return next;
    });

  return (
    <section id="prepare" className={cx(SECTION, "bg-gray-50")}>
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionTitle eyebrow={prepare.eyebrow} title={prepare.title} text={prepare.text} />
          <Button variant="outline" size="md" className="mt-8 gap-2" onClick={() => downloadChecklist(page)}>
            <Download aria-hidden="true" className="h-5 w-5" />
            {prepare.download}
          </Button>
        </div>
        <div className={`${CARD} p-6 md:p-8`}>
          <ul className="divide-y divide-gray-100">
            {page.docs.map((doc) => {
              const checked = done.has(doc);
              return (
                <li key={doc}>
                  <label className="flex cursor-pointer items-start gap-4 py-4">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(doc)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-brand"
                    />
                    <span className={cx("transition-colors", checked ? "text-gray-400 line-through" : "text-gray-800")}>{doc}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">{prepare.privacy}</p>
        </div>
      </div>
    </section>
  );
}

/** Numbered cards: "01 / Label", a title and text, with an optional link to the enquiry form. */
function StepCards({ items, linkHref }) {
  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className={`${CARD} flex flex-col p-7`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-bright">
            {String(index + 1).padStart(2, "0")} / {item.label}
          </p>
          <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
          <p className="mt-2 flex-1 text-gray-600">{item.text}</p>
          {item.link && (
            <a href={linkHref} className={cx(LINK, "mt-6")}>
              {item.link}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}

function Pace({ pace }) {
  return (
    <section className={cx(SECTION, "bg-white")}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={pace.eyebrow} title={pace.title} />
        <StepCards items={pace.items} linkHref="#contact" />
        <p className="mt-8 text-sm text-gray-500">{pace.note}</p>
      </div>
    </section>
  );
}

function Process({ className }) {
  const { process } = content;
  return (
    <section className={cx(SECTION, className)}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={process.eyebrow} title={process.title} text={process.text} />
        <StepCards items={process.steps} />
      </div>
    </section>
  );
}

function Questions({ faqs, className }) {
  const { faq } = content;
  return (
    <section id="questions" className={cx(SECTION, className)}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className={EYEBROW}>{faq.eyebrow}</p>
          <h2 className={`mt-3 ${H2}`}>{faq.title}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {faq.text}{" "}
            <SmartLink href={faq.link.href} className={LINK}>
              {faq.link.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </SmartLink>
          </p>
        </div>
        <FaqAccordion items={faqs} variant="bordered" />
      </div>
    </section>
  );
}

/**
 * Service page (Personal tax, Corporate tax, Bookkeeping, Trust & estate). Copy from the developer
 * package, laid out with the site's components: hero with a "made for" note, in-page links, what we
 * help with, a preparation checklist, an optional "support at your pace" row, the shared steps,
 * the FAQ and the enquiry form. Content: src/content/service-pages.json.
 */
export default function ServicePage({ slug }) {
  const page = { slug, ...content.pages[slug] };
  // Section backgrounds alternate white and grey whether or not the page has the pace row.
  const tones = page.pace ? ["bg-gray-50", "bg-white"] : ["bg-white", "bg-gray-50"];
  return (
    <PageShell>
      <Hero page={page} />
      <Scope scope={page.scope} />
      <Prepare page={page} />
      {page.pace && <Pace pace={page.pace} />}
      <Process className={tones[0]} />
      <Questions faqs={page.faqs} className={tones[1]} />
      <EnquirySection service={page.name} className={tones[0]} />
    </PageShell>
  );
}
