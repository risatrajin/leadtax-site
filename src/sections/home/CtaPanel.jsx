import content from "../../content/home.json";
import { tollFreeDashed } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";

const { cta } = content;

export default function CtaPanel() {
  return (
    <section className="bg-white px-4 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-8 py-12 text-white shadow-xl md:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 className="max-w-2xl text-3xl md:text-4xl">{cta.title}</h2>
        <div className="flex flex-col items-start gap-4">
          <Button href={cta.button.href} variant="inverse">
            {cta.button.label}
          </Button>
          <a href={`tel:${tollFreeDashed}`} className="text-brand-subtle underline-offset-4 hover:text-white hover:underline">
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </a>
        </div>
      </div>
    </section>
  );
}
