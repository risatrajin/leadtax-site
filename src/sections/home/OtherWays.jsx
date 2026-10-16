import { ArrowRight, Check } from "lucide-react";
import home from "../../content/home.json";
import SmartLink from "../../components/ui/SmartLink.jsx";

/**
 * A titled grid of cards, each with text, an optional checklist and a link. `section` is the
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
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              {card.tag && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-bright">{card.tag}</p>}
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
