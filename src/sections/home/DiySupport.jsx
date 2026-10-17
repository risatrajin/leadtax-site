import { ArrowRight } from "lucide-react";
import fileOnline from "../../content/pages/file-online.json";
import faqs from "../../content/faqs.json";
import { getIcon } from "../../lib/icons.js";
import Button from "../../components/ui/Button.jsx";
import FaqAccordion from "../../components/ui/FaqAccordion.jsx";
import { SectionTitle } from "../../components/ui/ServiceBlocks.jsx";

const SECTION = "px-4 py-16 md:px-8 md:py-24";

/**
 * "Tax tools to simplify your filing experience." merged with the expert add-ons: the add-ons' line
 * ("Our experts are on standby…") is the intro, and the five items sit in one minimal row (icon,
 * title, text, thin dividers; no cards).
 */
export function DiyTools() {
  const { tools, expertAddons } = fileOnline;
  const items = [...tools.items, ...expertAddons.items];
  return (
    <section className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={tools.title} text={expertAddons.title} center />
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.title} className="text-center lg:px-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mx-auto h-8 w-8 text-brand" />
                <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * "Need Expert Help?" A blue card in the hero's colour with soft glows: the photo on the left,
 * the heading, text and a white button on the right.
 */
export function DiyExpertCta() {
  const { expertCta } = fileOnline;
  return (
    <section className={`${SECTION} bg-gray-50`}>
      <div className="relative isolate mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-hero-blue text-white shadow-2xl md:grid-cols-2">
        <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 right-1/4 -z-10 h-80 w-80 rounded-full bg-brand-strong/50 blur-3xl" />
        <img src={expertCta.image.src} alt={expertCta.image.alt} className="h-64 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">{expertCta.title}</h2>
          <p className="mt-5 text-lg text-white/90 md:text-xl">{expertCta.text}</p>
          <Button to={expertCta.cta.to} variant="inverse" className="group mt-8 gap-2 self-start">
            {expertCta.cta.label}
            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/** "Frequently Asked Questions" about the DIY software, in the site's bordered accordion. */
export function DiyFaq() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Do it yourself" title={fileOnline.faq.title} center />
        <div className="mt-10">
          <FaqAccordion items={faqs.home} variant="bordered" />
        </div>
      </div>
    </section>
  );
}
