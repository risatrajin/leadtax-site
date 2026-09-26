import content from "../../content/home-v2.json";
import { tollFreeDashed } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import PillButton from "../../components/editorial/PillButton.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";

const { cta } = content;

export default function CtaPanel() {
  return (
    <section className="ed-container pb-24 xl:pb-28">
      <div className="grid gap-10 rounded-ed-cta bg-ed-ink px-8 py-12 text-white md:px-14 md:py-16 xl:grid-cols-[1fr_auto] xl:items-end xl:px-20 xl:py-20">
        <SectionHeading size="cta" text={cta.title} className="max-w-[640px]" />
        <div className="flex flex-col items-start gap-4">
          <PillButton href={cta.button.href} variant="inverse">
            {cta.button.label}
          </PillButton>
          <a href={`tel:${tollFreeDashed}`} className="text-white/70 underline-offset-4 hover:text-white hover:underline">
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </a>
        </div>
      </div>
    </section>
  );
}
