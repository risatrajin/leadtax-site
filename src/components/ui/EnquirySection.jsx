import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import enquiry from "../../content/enquiry.json";
import site from "../../content/site.json";
import { formatLocalPhone, toE164 } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "./Button.jsx";
import SmartLink from "./SmartLink.jsx";
import { EYEBROW } from "./ServiceBlocks.jsx";

const FIELD =
  "min-h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition placeholder:text-gray-400 hover:border-brand focus:border-brand";

/**
 * Closing "Let's make tax feel clearer" section: a call button and the remote filing link on the
 * left, and a form on the right that prepares an email draft (nothing is submitted from the site).
 * `service` preselects the form's topic.
 */
export default function EnquirySection({ service = enquiry.form.services.at(-1), className = "bg-gray-50" }) {
  const { form } = enquiry;
  const email = site.contact.email;
  const [status, setStatus] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(fill(form.emailSubject, values))}&body=${encodeURIComponent(fill(form.emailBody, values))}`;
    setStatus(fill(form.status, { email }));
  };

  return (
    <section id={enquiry.id} className={`scroll-mt-28 px-4 py-16 md:px-8 md:py-24 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-center lg:gap-16">
        <div>
          <p className={EYEBROW}>{enquiry.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{enquiry.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{enquiry.text}</p>
          <Button href={`tel:${toE164(enquiry.phone)}`} className="mt-8 gap-2">
            <Phone aria-hidden="true" className="h-5 w-5" />
            {fill(enquiry.call, { phone: formatLocalPhone(enquiry.phone) })}
          </Button>
          <p className="mt-6 text-gray-600">
            {enquiry.readyLabel}{" "}
            <SmartLink to={enquiry.remote.to} className="inline-flex items-center gap-1 font-semibold text-brand underline-offset-4 hover:underline">
              {enquiry.remote.label}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </SmartLink>
          </p>
        </div>

        <form key={service} onSubmit={submit} className={`${CARD} space-y-4 p-8 shadow-xl md:p-10`}>
          <h3 className="text-2xl font-semibold text-gray-900">{form.title}</h3>
          {[
            ["name", form.nameLabel, "text", "name"],
            ["email", form.emailLabel, "email", "email"],
          ].map(([name, label, type, autoComplete]) => (
            <label key={name} className="block">
              <span className="text-sm font-semibold text-gray-900">{label}</span>
              <input name={name} type={type} required autoComplete={autoComplete} className={`mt-2 ${FIELD}`} />
            </label>
          ))}
          <label className="block">
            <span className="text-sm font-semibold text-gray-900">{form.serviceLabel}</span>
            <span className="relative mt-2 block">
              <select name="service" defaultValue={service} className={`${FIELD} cursor-pointer appearance-none pr-12`}>
                {form.services.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-gray-900">{form.messageLabel}</span>
            <textarea name="message" rows={3} className={`mt-2 ${FIELD} resize-y`} />
          </label>
          <Button type="submit" size="block" className="group gap-2">
            {form.button}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="flex gap-2.5 text-sm text-gray-600">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
            {form.note}
          </p>
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
