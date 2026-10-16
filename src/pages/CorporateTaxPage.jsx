import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin } from "lucide-react";
import page from "../content/pages/corporate-tax.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import { CheckItem, EYEBROW, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";
import { CARD } from "../lib/styles.js";

function Hero() {
  const { hero } = page;
  return (
    <>
      <PageHero title={hero.title} text={hero.text} actions={hero.actions} image={hero.image} imageNote={hero.imageNote}>
        <p className="mt-6 text-sm text-brand-subtle">{hero.note}</p>
      </PageHero>
      <div className="border-b border-gray-200 bg-white px-4 py-8 md:px-8">
        <ul className="mx-auto grid max-w-7xl gap-3 font-semibold text-gray-900 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
          {hero.trust.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>
    </>
  );
}

function Planning({ onTopic }) {
  const { planning } = page;
  const { timeline } = planning;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={EYEBROW}>{planning.eyebrow}</p>
          <h2 className={`mt-3 ${H2}`}>{planning.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{planning.text}</p>
          <ol className="mt-8 space-y-4">
            {planning.points.map((point, index) => (
              <li key={point} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
                >
                  {index + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ol>
          <Button href={planning.button.href} size="md" className="mt-8" onClick={() => onTopic(planning.button.topic)}>
            {planning.button.label}
          </Button>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-10">
          <h3 className="text-2xl font-semibold">{timeline.title}</h3>
          <ul className="mt-6 divide-y divide-white/15">
            {timeline.rows.map((row) => (
              <li key={row.title} className="flex gap-6 py-6">
                <p className="w-20 flex-shrink-0 text-4xl font-bold leading-none">
                  {row.value}
                  <span className="mt-1 block text-sm font-normal text-brand-subtle">{row.unit}</span>
                </p>
                <div>
                  <p className="text-lg font-semibold">{row.title}</p>
                  <p className="mt-1 text-brand-subtle">{row.text}</p>
                  <a
                    href={row.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    {row.link.label}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="border-t border-white/15 pt-6 text-sm text-brand-subtle">{timeline.note}</p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { process } = page;
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={process.eyebrow} title={process.title} text={process.text} />
        <ol className="relative mt-10 grid gap-6 md:grid-cols-3">
          <span aria-hidden="true" className="absolute left-10 right-10 top-11 hidden h-px bg-gray-200 md:block" />
          {process.items.map((step, index) => (
            <li key={step.title} className={`${CARD} relative p-6`}>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-white ring-8 ring-white"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Checklist() {
  const { checklist } = page;
  const [done, setDone] = useState(() => new Set());
  const toggle = (item) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  const progress = (done.size / checklist.items.length) * 100;

  return (
    <section id="checklist" className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className={EYEBROW}>{checklist.eyebrow}</p>
          <h2 className={`mt-3 ${H2}`}>{checklist.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{checklist.text}</p>
          <p className="mt-4 text-gray-600">{checklist.note}</p>
          <Button href={checklist.button.href} variant="outline" size="md" className="mt-8">
            {checklist.button.label}
          </Button>
        </div>
        <div className={`${CARD} p-6 md:p-8`}>
          <ul className="divide-y divide-gray-100">
            {checklist.items.map((item) => {
              const checked = done.has(item);
              return (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-4 py-4">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item)}
                      className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded accent-brand"
                    />
                    <span className={cx("transition-colors", checked ? "text-gray-400 line-through" : "text-gray-800")}>
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-gray-100 pt-5">
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-brand-bright transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p aria-live="polite" className="mt-3 text-sm font-semibold text-brand">
              {fill(checklist.countLabel, { done: done.size, total: checklist.items.length })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = page;
  return (
    <section id="faq" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className={EYEBROW}>{faq.eyebrow}</p>
          <h2 className={`mt-3 ${H2}`}>{faq.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{faq.text}</p>
          <Button href={faq.button.href} variant="outline" size="md" className="mt-8">
            {faq.button.label}
          </Button>
        </div>
        <FaqAccordion items={faq.items} variant="bordered" />
      </div>
    </section>
  );
}

const FIELD =
  "min-h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition placeholder:text-gray-400 hover:border-brand focus:border-brand";

function Contact({ topic, onTopic }) {
  const { contact } = page;
  const { form } = contact;
  const [status, setStatus] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const values = { ...data, topic };
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(fill(form.emailSubject, values))}&body=${encodeURIComponent(fill(form.emailBody, values))}`;
    setStatus(fill(form.status, { email: contact.email }));
  };

  return (
    <section id={contact.id} className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-center lg:gap-16">
        <div>
          <p className={EYEBROW}>{contact.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {contact.titleLead} <span className="block text-brand-bright">{contact.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{contact.text}</p>
          <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <li className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-900">{contact.officeLabel}</p>
                {contact.officeAddress.map((line) => (
                  <p key={line} className="text-sm text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="group flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{contact.serviceLabel}</p>
                  <p className="truncate text-sm text-brand group-hover:underline">{contact.email}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className={`${CARD} space-y-4 p-8 shadow-xl md:p-10`}>
          <h3 className="text-2xl font-semibold text-gray-900">{form.title}</h3>
          {[
            ["name", form.nameLabel, form.namePlaceholder, "text", "name"],
            ["email", form.emailLabel, form.emailPlaceholder, "email", "email"],
            ["company", form.companyLabel, form.companyPlaceholder, "text", "organization"],
          ].map(([name, label, placeholder, type, autoComplete]) => (
            <label key={name} className="block">
              <span className="text-sm font-semibold text-gray-900">{label}</span>
              <input name={name} type={type} required autoComplete={autoComplete} placeholder={placeholder} className={`mt-2 ${FIELD}`} />
            </label>
          ))}
          <label className="block">
            <span className="text-sm font-semibold text-gray-900">{form.topicLabel}</span>
            <span className="relative mt-2 block">
              <select value={topic} onChange={(event) => onTopic(event.target.value)} className={`${FIELD} cursor-pointer appearance-none pr-12`}>
                {form.topics.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </span>
          </label>
          <Button type="submit" size="block" className="group gap-2">
            {form.button}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-sm text-gray-600">{form.note}</p>
          {status && (
            <p role="status" className="rounded-xl bg-brand-subtle/50 p-3 text-sm text-brand">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/**
 * Corporate tax page. Copy from the supplied corporate page design, laid out with the site's
 * components: navy hero with a photo and note card, service cards, the year-end timeline, numbered
 * steps, an interactive checklist, the FAQ and an enquiry form that prepares an email draft.
 */
export default function CorporateTaxPage() {
  // The enquiry topic lives here so the tax planning button can preselect it in the form.
  const [topic, setTopic] = useState(page.contact.form.topics[0]);
  return (
    <PageShell>
      <Hero />
      <IconCardGrid id="services" eyebrow={page.services.eyebrow} title={page.services.title} text={page.services.text} items={page.services.items} />
      <Planning onTopic={setTopic} />
      <Process />
      <Checklist />
      <Faq />
      <Contact topic={topic} onTopic={setTopic} />
    </PageShell>
  );
}
