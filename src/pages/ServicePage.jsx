import { useEffect, useState } from "react";
import { Check, Download } from "lucide-react";
import content from "../content/service-pages.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import Collapse from "../components/ui/Collapse.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";
import { SectionTitle, StepCards } from "../components/ui/ServiceBlocks.jsx";
import { getIcon } from "../lib/icons.js";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";
import OnThisPage from "../components/ui/OnThisPage.jsx";
import ServiceQuestions from "../sections/services/ServiceQuestions.jsx";
import { SECTION } from "../lib/styles.js";


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
      <OnThisPage anchors={content.anchors} />
    </>
  );
}

/** How long each item stays open before the next opens on its own (wide screens only). */
const STEP_MS = 6000;

/**
 * "What we help with" as a feature switcher: the items as a list on the left (the open one shows
 * its text and a progress bar), and a large pastel panel on the right with the open item as a card.
 * On wide screens the next item opens when the bar fills; hovering or focusing pauses it.
 */
function Scope({ scope }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const item = scope.items[active];
  const Icon = getIcon(item.icon);

  useEffect(() => {
    setAutoplay(Boolean(window.matchMedia?.("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches));
  }, []);

  return (
    <section
      id="included"
      className={cx(SECTION, "bg-white")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={content.scopeEyebrow} title={scope.title} text={scope.text} center />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ul className="border-t border-gray-200">
            {scope.items.map((entry, index) => {
              const open = index === active;
              const EntryIcon = getIcon(entry.icon);
              return (
                <li key={entry.title} className="relative border-b border-gray-200">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`scope-panel-${index}`}
                      onClick={() => setActive(index)}
                      className={cx(
                        "flex w-full items-center gap-4 py-6 text-left text-xl font-semibold transition-colors md:text-2xl",
                        open ? "text-gray-900" : "text-gray-400 hover:text-gray-700",
                      )}
                    >
                      <EntryIcon aria-hidden="true" className={cx("h-6 w-6 flex-shrink-0", open && "text-brand")} />
                      {entry.title}
                    </button>
                  </h3>
                  <Collapse id={`scope-panel-${index}`} open={open} className="pb-6 pl-10 text-lg text-gray-600">
                    {entry.text}
                  </Collapse>
                  {open && (
                    <span
                      aria-hidden="true"
                      onAnimationEnd={() => setActive((current) => (current + 1) % scope.items.length)}
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand"
                      style={
                        autoplay
                          ? { animation: `situation-progress ${STEP_MS}ms linear`, animationPlayState: paused ? "paused" : "running" }
                          : undefined
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div aria-hidden="true" className="relative isolate hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-subtle via-sky-100 to-indigo-100 p-8 sm:p-12 lg:block">
            <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
            <div key={item.title} className="situation-in rounded-3xl bg-white p-7 shadow-2xl sm:p-9">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  {String(active + 1).padStart(2, "0")} / {String(scope.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 text-2xl font-semibold text-gray-900">{item.title}</p>
              <p className="mt-3 text-gray-600">{item.text}</p>
              <div className="mt-8 space-y-3">
                {[100, 82, 64].map((width) => (
                  <div key={width} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="h-2.5 rounded-full bg-gray-100" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {content.fitPoints.map((point) => (
                <span key={point} className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur">
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
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
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
          {/* App-window bar with progress, in the style of a scheduling app. */}
          <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="h-3 w-3 rounded-full bg-gray-300" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${(done.size / page.docs.length) * 100}%` }} />
            </div>
            <span aria-live="polite" className="text-sm font-semibold text-gray-700">
              {done.size} / {page.docs.length}
            </span>
          </div>
          <ul className="divide-y divide-gray-100 px-6 md:px-8">
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
          <p className="border-t border-gray-100 px-6 py-4 text-sm text-gray-500 md:px-8">{prepare.privacy}</p>
        </div>
      </div>
    </section>
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

/** The shared steps, centred, with big numbers joined by a line on wide screens. */
function Process({ className }) {
  const { process } = content;
  return (
    <section className={cx(SECTION, className)}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={process.eyebrow} title={process.title} text={process.text} center />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-8 hidden border-t-2 border-dashed border-brand/30 md:block" />
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white shadow-lg"
              >
                {index + 1}
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand">{step.label}</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Service page (Personal tax, Corporate tax; Bookkeeping and Trust & estate have their own pages). Copy from the developer
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
      <ServiceQuestions faqs={page.faqs} className={tones[1]} />
      <EnquirySection service={page.name} className={tones[0]} />
    </PageShell>
  );
}
