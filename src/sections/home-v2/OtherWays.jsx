import { ArrowRight } from "lucide-react";
import content from "../../content/home-v2.json";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";
import TextLink from "../../components/editorial/TextLink.jsx";

const { otherWays } = content;

export default function OtherWays() {
  return (
    <section className="ed-container pb-24 xl:pb-28">
      <SectionHeading size="minor" text={otherWays.title} />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {otherWays.cards.map((card) => (
          <article key={card.title} className="flex flex-col rounded-ed-card border border-ed-line p-8">
            <h3 className="text-xl font-medium tracking-[-0.01em]">{card.title}</h3>
            <p className="mt-3 text-ed-muted">{card.text}</p>
            <TextLink
              to={card.link.to}
              href={card.link.href}
              className="mt-auto inline-flex items-center gap-2 pt-6 font-medium underline-offset-4 hover:underline"
            >
              {card.link.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}
