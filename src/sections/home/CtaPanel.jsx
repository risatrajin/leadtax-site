import { ArrowRight, Phone } from "lucide-react";
import home from "../../content/home.json";
import { tollFreeDashed } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";

/**
 * Closing booking panel: a navy card with soft light glows, a faint grid and, when `cta.image` is
 * set, a photo fading in from the right. On the homepage it jumps to the offices list; other pages
 * pass their own `to` (e.g. /contact) and section background.
 */
export default function CtaPanel({ to, className = "bg-white", content = home }) {
  const { cta } = content;
  return (
    <section id={cta.id} className={`scroll-mt-28 ${className} px-4 pb-16 md:px-8 md:pb-24`}>
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-strong px-8 py-14 text-white shadow-2xl md:px-14 md:py-20">
        {cta.image && (
          <img
            src={cta.image.src}
            alt=""
            loading="lazy"
            className="absolute inset-y-0 right-0 -z-10 hidden h-full w-3/5 object-cover opacity-40 mix-blend-luminosity [mask-image:linear-gradient(to_left,black_20%,transparent)] lg:block"
            style={{ objectPosition: cta.image.position }}
          />
        )}
        {/* Light glows and a faint grid behind the text. */}
        <div aria-hidden="true" className="absolute -left-24 -top-32 -z-10 h-80 w-80 rounded-full bg-brand-bright/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 right-1/4 -z-10 h-96 w-96 rounded-full bg-brand-fade/25 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />

        <div className="max-w-2xl">
          {cta.eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-brand-subtle backdrop-blur">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
              {cta.eyebrow}
            </p>
          )}
          <h2 className="mt-5 text-4xl first:mt-0 font-semibold leading-tight tracking-tight md:text-5xl">{cta.title}</h2>
          {cta.text && <p className="mt-5 text-lg text-brand-subtle">{cta.text}</p>}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button {...(to ? { to } : { href: cta.button.href })} variant="inverse" className="group gap-2">
              {cta.button.label}
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <a
              href={`tel:${tollFreeDashed}`}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              {fill(cta.callLabel, { phone: tollFreeDashed })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
