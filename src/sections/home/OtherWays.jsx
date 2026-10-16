import { ArrowRight, Check } from "lucide-react";
import home from "../../content/home.json";
import SmartLink from "../../components/ui/SmartLink.jsx";
import { cx } from "../../lib/cx.js";

/**
 * A titled grid of cards, each with text, an optional photo, badge and checklist, and a link. `section` is the
 * content key to show (default "otherWays"); `className` sets the section background and spacing.
 */
export default function OtherWays({ content = home, section = "otherWays", className = "bg-white px-4 pb-16 md:px-8 md:pb-24" }) {
  const otherWays = content[section];
  return (
    <section id={otherWays.id} className={`scroll-mt-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{otherWays.title}</h2>
        {otherWays.text && <p className="mt-4 max-w-3xl text-lg text-gray-600">{otherWays.text}</p>}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {otherWays.cards.map((card) => (
            <article
              key={card.title}
              className={cx(
                "group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0",
                card.image ? "p-3 pb-8 [&>*:not(:first-child)]:mx-5" : "p-8",
              )}
            >
              {card.image && (
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                </div>
              )}
              {card.badge && (
                <p className="mb-4 self-start rounded-full bg-brand-subtle px-3 py-1 text-sm font-semibold text-brand">{card.badge}</p>
              )}
              {card.tag &&<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-bright">{card.tag}</p>}
              <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-3 text-gray-600">{card.text}</p>
              {card.points && (
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-bright" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <SmartLink
                to={card.link.to}
                href={card.link.href}
                className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-brand underline-offset-4 hover:underline"
              >
                {card.link.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </SmartLink>
            </article>
          ))}
        </div>
        {otherWays.note && <p className="mt-8 text-center text-sm text-gray-500">{otherWays.note}</p>}
      </div>
    </section>
  );
}
