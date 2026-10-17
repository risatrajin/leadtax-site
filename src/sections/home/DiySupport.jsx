import { ArrowRight } from "lucide-react";
import fileOnline from "../../content/pages/file-online.json";
import faqs from "../../content/faqs.json";
import { getIcon } from "../../lib/icons.js";
import { CARD, CARD_TITLE } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";
import FaqAccordion from "../../components/ui/FaqAccordion.jsx";
import { SectionTitle } from "../../components/ui/ServiceBlocks.jsx";

const SECTION = "px-4 py-16 md:px-8 md:py-24";

/** Gradient icon square used on the homepage cards. */
function IconSquare({ name }) {
  const Icon = getIcon(name);
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
      <Icon aria-hidden="true" className="h-6 w-6" />
    </span>
  );
}

const LIFT = "group transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0";

/**
 * "Tax tools to simplify your filing experience." with the expert add-ons in the same section:
 * three tool cards, then "Our experts are on standby…" as a sub-heading over the two add-on cards.
 */
export function DiyTools() {
  const { tools, expertAddons } = fileOnline;
  return (
    <section className={`${SECTION} bg-white`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={tools.title} center />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {tools.items.map((tool) => (
            <li key={tool.title} className={`${CARD} ${LIFT} p-7 text-center`}>
              <div className="flex justify-center">
                <IconSquare name={tool.icon} />
              </div>
              <h3 className={`mt-5 ${CARD_TITLE}`}>{tool.title}</h3>
              <p className="mt-2 text-gray-600">{tool.description}</p>
            </li>
          ))}
        </ul>

        <h3 className="mx-auto mt-16 max-w-3xl text-center text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {expertAddons.title}
        </h3>
        <ul className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
          {expertAddons.items.map((addon) => (
            <li key={addon.title} className={`${CARD} ${LIFT} flex gap-5 p-7`}>
              <IconSquare name={addon.icon} />
              <div>
                <h4 className={CARD_TITLE}>{addon.title}</h4>
                <p className="mt-2 text-gray-600">{addon.description}</p>
              </div>
            </li>
          ))}
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
