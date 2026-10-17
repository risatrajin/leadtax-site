import { useState } from "react";
import { ArrowRight, Check, Printer } from "lucide-react";
import page from "../content/pages/personal-tax.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero, { actionProps } from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import { CheckItem, EYEBROW, H2, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { enabledLinks } from "../components/layout/site-header/panels.jsx";
import CtaPanel from "../sections/home/CtaPanel.jsx";
import { getIcon } from "../lib/icons.js";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../lib/styles.js";

function Hero() {
  const { hero, strip } = page;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} actions={hero.actions} image={hero.image} imageNote={hero.imageNote} decor>
        <ul className="mt-8 flex flex-wrap gap-2">
          {hero.trust.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur"
            >
              <Check aria-hidden="true" className="h-4 w-4 text-brand-subtle" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>
      <div className="bg-white px-4 pt-10 md:px-8">
        <ul className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {strip.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.title} className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-brand-bright shadow-sm">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function Services() {
  const { services } = page;
  return (
    <section id="services" className="scroll-mt-28 bg-white px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={services.eyebrow} title={services.title} text={services.text} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li
                key={item.title}
                className={`${CARD} group flex flex-col p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-fade hover:shadow-xl motion-reduce:hover:translate-y-0`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
                <p className="mt-2 flex-1 text-gray-600">{item.text}</p>
                <p className="mt-5 self-start rounded-full bg-brand-subtle/60 px-3 py-1 text-xs font-semibold text-brand">{item.tag}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Numbered steps joined by a thin line, each with a title and text. */
function Steps({ items }) {
  return (
    <ol>
      {items.map((step, index) => (
        <li
          key={step.title}
          className="relative flex gap-4 pb-7 last:pb-0 [&:not(:last-child)]:before:absolute [&:not(:last-child)]:before:bottom-0 [&:not(:last-child)]:before:left-5 [&:not(:last-child)]:before:top-12 [&:not(:last-child)]:before:w-px [&:not(:last-child)]:before:bg-gray-200"
        >
          <span
            aria-hidden="true"
            className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white ring-4 ring-gray-50"
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
  );
}

function Process() {
  const { process } = page;
  const { panel } = process;
  return (
    <section id="process" className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow={process.eyebrow} title={process.title} text={process.text} />
          <div className="mt-8">
            <Steps items={process.steps} />
          </div>
        </div>
        <aside className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-2xl md:p-10">
          <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-brand-bright/40 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">{panel.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{panel.title}</h3>
          <p className="mt-3 text-brand-subtle">{panel.text}</p>
          <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
            {panel.items.map((item) => (
              <li key={item} className="flex items-center gap-3 py-3.5">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-brand-subtle">{panel.note}</p>
        </aside>
      </div>
    </section>
  );
}

const TAB = "rounded-full px-4 py-2 text-sm font-semibold transition-all";

function Checklist() {
  const { checklist } = page;
  const [tabId, setTabId] = useState(checklist.tabs[0].id);
  const [done, setDone] = useState(() => new Set());
  const tab = checklist.tabs.find((t) => t.id === tabId);
  const key = (item) => `${tabId}:${item}`;
  const toggle = (item) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(key(item)) ? next.delete(key(item)) : next.add(key(item));
      return next;
    });
  const count = tab.items.filter((item) => done.has(key(item))).length;

  // Arrow keys move between tabs, as in the supplied design.
  const onTabKey = (event, index) => {
    const last = checklist.tabs.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setTabId(checklist.tabs[next].id);
    event.currentTarget.parentElement.children[next].focus();
  };

  const print = () => {
    document.body.classList.add("print-checklist");
    window.print();
    document.body.classList.remove("print-checklist");
  };

  return (
    <section id="checklist" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="print:hidden">
          <SectionTitle eyebrow={checklist.eyebrow} title={checklist.title} text={checklist.text} />
          <p className="mt-4 text-gray-600">{checklist.note}</p>
          <Button variant="outline" size="md" className="mt-8 gap-2" onClick={print}>
            <Printer aria-hidden="true" className="h-5 w-5" />
            {checklist.printLabel}
          </Button>
        </div>
        <div className={`${CARD} p-6 md:p-8 print:border-0 print:shadow-none`}>
          <h3 className={CARD_TITLE}>{checklist.cardTitle}</h3>
          <div role="tablist" aria-label="Document categories" className="mt-5 inline-flex flex-wrap gap-1 rounded-3xl bg-gray-100 p-1.5 print:hidden">
            {checklist.tabs.map((t, index) => {
              const selected = t.id === tabId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`checklist-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="checklist-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTabId(t.id)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  className={cx(TAB, selected ? "bg-white text-brand shadow-md" : "text-gray-600 hover:text-gray-900")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <p className="mt-5 hidden font-semibold print:block">{tab.label}</p>
          <ul id="checklist-panel" role="tabpanel" aria-labelledby={`checklist-tab-${tabId}`} className="mt-4 divide-y divide-gray-100">
            {tab.items.map((item) => {
              const checked = done.has(key(item));
              return (
                <li key={key(item)}>
                  <label className="flex cursor-pointer items-start gap-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-brand"
                    />
                    <span className={cx("transition-colors", checked ? "text-gray-400 line-through" : "text-gray-800")}>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-gray-100 pt-5 print:hidden">
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-brand-bright transition-[width] duration-300"
                style={{ width: `${(count / tab.items.length) * 100}%` }}
              />
            </div>
            <p aria-live="polite" className="mt-3 text-sm font-semibold text-brand">
              {fill(checklist.countLabel, { done: count, total: tab.items.length })}
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-500">{checklist.privacy}</p>
        </div>
      </div>
    </section>
  );
}

/** Ways to work with us as separate cards; an option may link to related service pages. */
function Options({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((option) => {
        const Icon = getIcon(option.icon);
        return (
          <li
            key={option.title}
            className={`${CARD} flex gap-5 p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0`}
          >
            <span className={ICON_BADGE}>
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
              <p className="mt-1 text-gray-600">{option.text}</p>
              {option.links && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {enabledLinks(option.links).map((link) => (
                    <li key={link.to}>
                      <SmartLink
                        to={link.to}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white"
                      >
                        {link.label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Remote() {
  const { remote } = page;
  return (
    <section id="remote" className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow={remote.eyebrow} title={remote.title} text={remote.text} />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {remote.actions.map((action, index) => (
              <Button key={action.label} {...actionProps(action)} variant={index === 0 ? "primary" : "outline"} size="md">
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <Options items={remote.options} />
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = page;
  return (
    <section id="faq" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className={cx(EYEBROW, "text-center")}>{faq.eyebrow}</p>
        <h2 className={cx(H2, "mt-3 text-center")}>{faq.title}</h2>
        <div className="mt-10">
          <FaqAccordion items={faq.items} variant="bordered" />
        </div>
      </div>
    </section>
  );
}

/**
 * Personal tax page. Copy from the supplied Canadian tax page design, laid out with the site's
 * components: navy hero with a photo and note card, service cards, steps beside a navy
 * deductions panel, a tabbed document checklist that prints on its own, ways to work with us,
 * the FAQ and the closing booking panel (an email draft, nothing is sent from the site).
 */
export default function PersonalTaxPage() {
  const { contact } = page;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(contact.emailBody)}`;
  return (
    <PageShell>
      <Hero />
      <Services />
      <Process />
      <Checklist />
      <Remote />
      <Faq />
      <CtaPanel content={{ cta: { ...contact, button: { label: contact.button, href: mailto } } }} className="bg-white print:hidden" />
    </PageShell>
  );
}
