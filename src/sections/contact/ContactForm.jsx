import contact from "../../content/pages/contact.json";
import { CARD } from "../../lib/styles.js";
import LeadFormFrame from "../../components/ui/LeadFormFrame.jsx";
import { EYEBROW } from "../../components/ui/ServiceBlocks.jsx";

const { form } = contact;

/**
 * Lead form under the office cards: a centred heading, the three next steps in a row, and the
 * client's enquiry form centred beneath them.
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

      {/* The client's enquiry form (eTaskMe) in a card. */}
      <div className={`${CARD} mx-auto mt-12 max-w-3xl p-6 shadow-xl sm:p-8 md:p-10`}>
        <h3 className="mb-6 text-2xl font-semibold text-gray-900">{form.cardTitle}</h3>
        <LeadFormFrame title={form.cardTitle} fallbackLabel={form.fallbackLabel} loadingLabel={form.loadingLabel} />
      </div>
    </section>
  );
}
