import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Copy, Mail, Phone, ShieldCheck } from "lucide-react";
import site from "../../content/site.json";
import { formatLocalPhone } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";
import CopyText from "../../components/ui/CopyText.jsx";

const DIRECT_LINK =
  "group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md motion-reduce:hover:translate-y-0";

/**
 * Closing contact section: headline, direct phone and email on the left, and a card that prepares
 * a consultation email for the chosen situation (a mailto: draft, nothing is sent from the site).
 */
export default function ContactEnquiry({ contact }) {
  const { card } = contact;
  const [topic, setTopic] = useState(card.options[0]);
  const email = site.contact.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(fill(card.emailSubject, { topic }))}&body=${encodeURIComponent(fill(card.emailBody, { topic }))}`;

  return (
    <section id={contact.id} className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-center lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-bright">{contact.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {contact.titleLead} <span className="block text-brand-bright">{contact.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{contact.text}</p>

          <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <li>
              <CopyText value={formatLocalPhone(contact.phone)} className={`${DIRECT_LINK} w-full text-left`}>
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="flex-1 font-semibold text-gray-900">{formatLocalPhone(contact.phone)}</span>
                <Copy aria-hidden="true" className="h-4 w-4 text-gray-400 transition group-hover:text-brand" />
              </CopyText>
            </li>
            <li>
              <CopyText value={email} className={`${DIRECT_LINK} w-full text-left`}>
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="flex-1 font-semibold text-gray-900">{email}</span>
                <Copy aria-hidden="true" className="h-4 w-4 text-gray-400 transition group-hover:text-brand" />
              </CopyText>
            </li>
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{contact.location}</p>
        </div>

        <div className={`${CARD} p-8 shadow-xl md:p-10`}>
          <p className="inline-flex rounded-full bg-brand-subtle px-3 py-1 text-sm font-semibold text-brand">{card.tag}</p>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900">{card.title}</h3>
          <p className="mt-3 text-gray-600">{card.text}</p>

          <label htmlFor="enquiry-topic" className="mt-8 block text-sm font-semibold text-gray-900">
            {card.selectLabel}
          </label>
          <div className="relative mt-2">
            <select
              id="enquiry-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="min-h-14 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-4 pr-12 text-gray-900 transition hover:border-brand focus:border-brand"
            >
              {card.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>

          <Button href={mailto} size="block" className="group mt-4 gap-2">
            {card.button}
            <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Button>
          <p className="mt-4 flex gap-2.5 text-sm text-gray-600">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
            {card.fine}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">{card.remoteLabel}</p>
            <SmartLink
              to={card.remoteLink.to}
              className="inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
            >
              {card.remoteLink.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
