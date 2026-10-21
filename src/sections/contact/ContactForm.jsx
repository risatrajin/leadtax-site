import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import contact from "../../content/pages/contact.json";
import enquiry from "../../content/enquiry.json";
import { headOfficeEmail, officeLocationOptions } from "../../lib/offices.js";
import { openMailDraft } from "../../lib/links.js";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";
import { SelectField, TextAreaField, TextField } from "../../components/ui/FormFields.jsx";
import { EYEBROW } from "../../components/ui/ServiceBlocks.jsx";

const { form } = contact;
const LOCATIONS = officeLocationOptions(enquiry.form.locationAny);

/**
 * The Contact page's lead form. There is no backend yet, so submitting opens an email draft to the
 * head office. `title` is shown above the fields when given; `className` styles the <form>.
 */
function LeadForm({ title, className = "" }) {
  const [status, setStatus] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    openMailDraft(headOfficeEmail, fill(form.subject, values), fill(form.body, values));
    setStatus(fill(form.status, { email: headOfficeEmail }));
  };

  return (
      <form onSubmit={submit} className={`space-y-4 ${className}`}>
        {title && <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>}
        <TextField name="name" label={form.fields.name} autoComplete="name" />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="email" label={form.fields.email} type="email" autoComplete="email" />
          <TextField name="phone" label={form.fields.phone} type="tel" autoComplete="tel" required={false} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField name="service" label={form.fields.service} options={enquiry.form.services} />
          <SelectField name="location" label={form.fields.location} options={LOCATIONS} />
        </div>
        <TextAreaField name="message" label={form.fields.message} placeholder={form.fields.messagePlaceholder} />
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
          <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-brand" />
          {form.consent}
        </label>
        <Button type="submit" size="block" className="group gap-2">
          {form.submitLabel}
          <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="flex gap-2.5 text-sm text-gray-600">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
          {form.privacyNote}
        </p>
        {status && (
          <p role="status" className="rounded-xl bg-brand-subtle/50 p-3 text-sm text-brand">
            {status}
          </p>
        )}
      </form>
  );
}

/**
 * Lead form under the office cards: a centred heading, the three next steps in a row, and the form
 * centred beneath them.
 */
export default function ContactForm() {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className={EYEBROW}>{form.eyebrow}</p>
        <h2 id="enquiry-title" className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">
          {form.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">{form.text}</p>
      </div>

      <ol className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
        {form.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 text-left sm:flex-col sm:items-center sm:gap-3 sm:text-center">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle font-semibold text-brand">
              {index + 1}
            </span>
            <span>
              <span className="block font-semibold text-gray-900">{step.title}</span>
              <span className="mt-1 block text-sm text-gray-600">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>

      <LeadForm title={form.cardTitle} className={`${CARD} mx-auto mt-12 max-w-3xl p-6 shadow-xl sm:p-8 md:p-10`} />
    </section>
  );
}
