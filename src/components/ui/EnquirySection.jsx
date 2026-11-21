import { ArrowRight, ArrowUpRight, Copy, Mail, MapPin, Phone } from "lucide-react";
import enquiry from "../../content/enquiry.json";
import site from "../../content/site.json";
import { formatLocalPhone } from "../../lib/phone.js";
import { officeCities, offices } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import SmartLink from "./SmartLink.jsx";
import CopyText from "./CopyText.jsx";
import LeadFormFrame from "./LeadFormFrame.jsx";
import { EYEBROW } from "./ServiceBlocks.jsx";

const { form, contacts } = enquiry;
const EMAIL = site.contact.email;
const PHONE = fill(contacts.call.detail, { phone: formatLocalPhone(enquiry.phone) });
const ROW = "group flex items-center gap-4 py-5";

/** A contact row's icon, label and value; `trailing` is the icon on the right. */
function RowBody({ Icon, label, detail, extra, trailing }) {
  return (
    <>
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-gray-600">{label}</span>
        <span className="block text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand">{detail}</span>
        {extra && <span className="mt-1 block text-sm text-gray-500">{extra}</span>}
      </span>
      {trailing}
    </>
  );
}

const COPY_ICON = <Copy aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors group-hover:text-brand" />;

/**
 * Closing "Let's make tax feel clearer" section: ways to reach us on the left (phone and email copy
 * to the clipboard; the office row links to the offices) and the remote filing link, and the
 * client's enquiry form (eTaskMe) on the right. `service` (the page's name) preselects the form's
 * "Interested service" through form.serviceTypes.
 */
export default function EnquirySection({ service, className = "bg-gray-50" }) {
  return (
    <section id={enquiry.id} className={`scroll-mt-32 px-4 py-16 md:scroll-mt-40 md:px-8 md:py-24 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-center lg:gap-16">
        <div>
          <p className={EYEBROW}>{enquiry.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{enquiry.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{enquiry.text}</p>
          <ul className="mt-10 divide-y lg:max-w-xl divide-gray-200 border-y border-gray-200">
            <li>
              <CopyText value={PHONE} className={`${ROW} w-full text-left`}>
                <RowBody Icon={Phone} label={contacts.call.label} detail={PHONE} trailing={COPY_ICON} />
              </CopyText>
            </li>
            <li>
              <CopyText value={EMAIL} className={`${ROW} w-full text-left`}>
                <RowBody Icon={Mail} label={contacts.email.label} detail={fill(contacts.email.detail, { email: EMAIL })} trailing={COPY_ICON} />
              </CopyText>
            </li>
            <li>
              <SmartLink to={contacts.visit.to} className={ROW}>
                <RowBody
                  Icon={MapPin}
                  label={contacts.visit.label}
                  detail={fill(contacts.visit.detail, { count: offices.length, cities: officeCities.join(" & ") })}
                  extra={offices.map((office) => office.shortName).join(" · ")}
                  trailing={
                    <ArrowRight aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-brand" />
                  }
                />
              </SmartLink>
            </li>
          </ul>
          <p className="mt-6 text-gray-600">
            {enquiry.readyLabel}{" "}
            <SmartLink to={enquiry.remote.to} className="inline-flex items-center gap-1 font-semibold text-brand underline-offset-4 hover:underline">
              {enquiry.remote.label}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </SmartLink>
          </p>
        </div>

        <div className={`${CARD} p-8 shadow-xl md:p-10`}>
          <h3 className="mb-6 text-2xl font-semibold text-gray-900">{form.title}</h3>
          <LeadFormFrame
            key={service}
            title={form.title}
            service={form.serviceTypes[service]}
            fallbackLabel={form.fallbackLabel}
            loadingLabel={form.loadingLabel}
          />
        </div>
      </div>
    </section>
  );
}
