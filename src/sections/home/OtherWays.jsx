import { ArrowRight } from "lucide-react";
import content from "../../content/home.json";
import SmartLink from "../../components/ui/SmartLink.jsx";

const { otherWays } = content;

export default function OtherWays() {
  return (
    <section className="bg-white px-4 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{otherWays.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {otherWays.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-3 text-gray-600">{card.text}</p>
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
      </div>
    </section>
  );
}
