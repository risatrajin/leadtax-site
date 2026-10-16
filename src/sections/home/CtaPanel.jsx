import home from "../../content/home.json";
import { tollFreeDashed } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";


/**
 * Closing booking panel. On the homepage it jumps to the offices list; other pages pass their own
 * `to` (e.g. /contact) and section background.
 */
export default function CtaPanel({ to, className = "bg-white", content = home }) {
  const { cta } = content;
  return (
    <section id={cta.id} className={`scroll-mt-28 ${className} px-4 pb-16 md:px-8 md:pb-24`}>
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-8 py-12 text-white shadow-xl md:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{cta.title}</h2>
          {cta.text && <p className="mt-4 text-brand-subtle">{cta.text}</p>}
        </div>
        <div className="flex flex-col items-start gap-4">
          <Button {...(to ? { to } : { href: cta.button.href })} variant="inverse">
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
