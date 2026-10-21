import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import contact from "../content/pages/contact.json";
import site from "../content/site.json";
import { fill } from "../lib/template.js";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import { useCopy } from "../components/ui/CopyText.jsx";
import Offices from "../sections/home/Offices.jsx";
import ContactForm from "../sections/contact/ContactForm.jsx";

const QUICK_LINK =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold transition-colors";
const SOLID = `${QUICK_LINK} bg-white text-brand hover:bg-gray-100`;
const OUTLINE = `${QUICK_LINK} border-2 border-white/70 text-white hover:bg-white hover:text-brand`;

/** Hero pill that copies `value` to the clipboard and briefly says so in place of the value. */
function CopyPill({ Icon, value, label, className }) {
  const { copied, copy } = useCopy(value);
  return (
    <button type="button" onClick={copy} aria-label={label} className={`${className} cursor-pointer`}>
      {copied ? <Check aria-hidden="true" className="h-5 w-5" /> : <Icon aria-hidden="true" className="h-5 w-5" />}
      <span>{copied ? site.contact.copied : value}</span>
      {!copied && <Copy aria-hidden="true" className="h-4 w-4 opacity-70" />}
      <span role="status" className="sr-only">
        {copied ? site.contact.copied : ""}
      </span>
    </button>
  );
}

/**
 * Contact page: a hero whose phone and email pills copy to the clipboard, the office finder
 * (office list beside the map; /contact#office-id selects that office), then the lead form.
 */
export default function ContactPage() {
  const { quick } = contact;
  const { tollFree, email } = site.contact;

  return (
    <PageShell>
      <PageHero title={contact.title} text={contact.intro}>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <CopyPill Icon={Phone} value={tollFree} label={fill(quick.copyPhone, { phone: tollFree })} className={SOLID} />
          <CopyPill Icon={Mail} value={email} label={fill(quick.copyEmail, { email })} className={OUTLINE} />
          <a href="#offices" className={OUTLINE}>
            <MapPin aria-hidden="true" className="h-5 w-5" />
            {quick.offices}
          </a>
        </div>
      </PageHero>

      <Offices className="bg-white" />

      <div className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
        <ContactForm />
      </div>
    </PageShell>
  );
}
