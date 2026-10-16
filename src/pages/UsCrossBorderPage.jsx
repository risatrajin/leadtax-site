import { useState } from "react";
import { ArrowRight, ArrowLeftRight, ExternalLink, Mail, Phone } from "lucide-react";
import page from "../content/pages/us-cross-border.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import FaqAccordion from "../components/ui/FaqAccordion.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { CheckItem, H2, IconCardGrid, SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { cx } from "../lib/cx.js";
import { formatLocalPhone } from "../lib/phone.js";
import { CARD, CARD_TITLE } from "../lib/styles.js";
import { fill } from "../lib/template.js";

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

/** "Choose your situation": a list of situations on the left, the selected one's details on the right. */
function Situations() {
  const { situations } = page;
  const [activeId, setActiveId] = useState(situations.items[0].id);
  const active = situations.items.find((item) => item.id === activeId);
  return (
    <section id="situations" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={situations.title} text={situations.text} />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div role="group" aria-label={situations.title} className="space-y-3">
            {situations.items.map((item, index) => {
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="situation-detail"
                  onClick={() => setActiveId(item.id)}
                  className={cx(
                    CARD,
                    "flex w-full items-center gap-4 p-4 text-left transition-shadow",
                    selected ? "ring-2 ring-brand" : "hover:shadow-lg",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold",
                      selected ? "bg-brand text-white" : "bg-brand-subtle text-brand",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className={cx("flex-1 font-semibold", selected ? "text-gray-900" : "text-gray-700")}>{item.label}</span>
                  <ArrowRight aria-hidden="true" className={cx("h-5 w-5", selected ? "text-brand" : "text-gray-400")} />
                </button>
              );
            })}
          </div>
          <div
            id="situation-detail"
            aria-live="polite"
            className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">{active.tag}</p>
            <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{active.title}</h3>
            <p className="mt-4 text-brand-subtle">{active.text}</p>
            <ul className="mt-6 space-y-3">
              {active.points.map((point) => (
                <CheckItem key={point} tone="text-brand-subtle">
                  {point}
                </CheckItem>
              ))}
            </ul>
            <Button href="#contact" variant="inverse" size="md" className="mt-8">
              {situations.linkLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { services } = page;
  return (
    <>
      <IconCardGrid id="services" title={services.title} text={services.text} items={services.items} className="bg-gray-50" />
      <p className="-mt-10 bg-gray-50 px-4 pb-16 text-center text-sm text-gray-500 md:-mt-14 md:px-8 md:pb-24">{services.note}</p>
    </>
  );
}

/** Navy panel with the Canada ↔ United States graphic and the "whole story" copy. */
function Perspective() {
  const { perspective } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-12 lg:grid-cols-2 lg:gap-16">
        <div aria-hidden="true" className="rounded-2xl border border-white/15 bg-white/5 p-8">
          <div className="flex items-center justify-between gap-4 text-sm font-semibold uppercase tracking-wider">
            <span>{perspective.left}</span>
            <span className="flex-1 border-t border-dashed border-white/30" />
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand">
              <ArrowLeftRight className="h-5 w-5" />
            </span>
            <span className="flex-1 border-t border-dashed border-white/30" />
            <span>{perspective.right}</span>
          </div>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-brand-subtle">{perspective.caption}</p>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">{perspective.title}</h2>
          {perspective.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-brand-subtle">
              {paragraph}
            </p>
          ))}
          <Button href={perspective.button.href} variant="inverse" size="md" className="mt-8">
            {perspective.button.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { process } = page;
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={process.title} />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {process.items.map((step, index) => (
            <li key={step.title} className={`${CARD} p-6`}>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className={`mt-5 ${CARD_TITLE}`}>{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className={`${CARD} mt-6 flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8 md:p-8`}>
          <h3 className={`${CARD_TITLE} md:w-64 md:flex-shrink-0`}>{process.prepare.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {process.prepare.items.map((item) => (
              <li key={item} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = page;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className={H2}>{faq.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{faq.text}</p>
        </div>
        <div>
          <FaqAccordion items={faq.items} variant="bordered" />
          <p className="mt-6 text-sm text-gray-500">
            {faq.sources.text}{" "}
            {faq.sources.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " and "}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/** Closing panel with direct contact details and an enquiry card that prepares an email draft. */
function Contact() {
  const { contact } = page;
  const { card } = contact;
  const [topic, setTopic] = useState(card.options[0]);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(fill(card.subject, { topic }))}&body=${encodeURIComponent(
    fill(card.body, { topic }),
  )}`;
  return (
    <section id="contact" className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl md:p-12 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">{contact.title}</h2>
          <p className="mt-4 text-brand-subtle">{contact.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <a href={`tel:+1${contact.phone}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
              <Phone aria-hidden="true" className="h-5 w-5 text-brand-subtle" />
              {formatLocalPhone(contact.phone)}
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
              <Mail aria-hidden="true" className="h-5 w-5 text-brand-subtle" />
              {contact.email}
            </a>
          </div>
          <p className="mt-6 text-sm uppercase tracking-wider text-brand-subtle">{contact.locations}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-gray-900 md:p-8">
          <h3 className={CARD_TITLE}>{card.title}</h3>
          <p className="mt-2 text-gray-600">{card.text}</p>
          <label htmlFor="cross-border-topic" className="mt-6 block text-sm font-semibold text-gray-700">
            {card.selectLabel}
          </label>
          <select
            id="cross-border-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
          >
            {card.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <Button href={mailto} size="block" className="mt-5">
            {card.button}
          </Button>
          <p className="mt-3 text-xs text-gray-500">{card.fine}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5 text-sm">
            <span className="text-gray-600">{card.remoteLabel}</span>
            <div className="flex gap-5">
              <SmartLink to={card.bookLink.to} className="font-semibold text-brand hover:underline">
                {card.bookLink.label}
              </SmartLink>
              <SmartLink to={card.remoteLink.to} className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">
                {card.remoteLink.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * US & cross-border tax page, from the supplied cross-border design, laid out with the site's
 * components (content: pages/us-cross-border.json).
 */
export default function UsCrossBorderPage() {
  return (
    <PageShell>
      <Hero />
      <Situations />
      <Services />
      <Perspective />
      <Process />
      <Faq />
      <Contact />
    </PageShell>
  );
}
