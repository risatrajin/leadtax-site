import { ArrowRight } from "lucide-react";
import content from "../../content/service-pages.json";
import SmartLink from "../../components/ui/SmartLink.jsx";
import FaqAccordion from "../../components/ui/FaqAccordion.jsx";
import { SectionTitle } from "../../components/ui/ServiceBlocks.jsx";
import { SECTION } from "../../lib/styles.js";
import { cx } from "../../lib/cx.js";
import { Sources } from "../../components/ui/RichText.jsx";

const LINK = "inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline";

/** The service FAQ block: shared heading and closing line, the page's own questions. */
export default function ServiceQuestions({ faqs, className, heading, sources }) {
  // A page may give its own heading (title, eyebrow, text, link); the rest comes from the shared one.
  const faq = { ...content.faq, ...heading };
  return (
    <section id="questions" className={cx(SECTION, className)}>
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow={faq.eyebrow} title={faq.title} center />
        <div className="mt-10">
          <FaqAccordion items={faqs} variant="bordered" />
        </div>
        <p className="mt-8 text-center text-lg text-gray-600">
          {faq.text}{" "}
          <SmartLink href={faq.link.href} className={LINK}>
            {faq.link.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </SmartLink>
        </p>
        <Sources sources={sources} />
      </div>
    </section>
  );
}

