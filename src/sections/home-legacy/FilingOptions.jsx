import { ArrowRight } from "lucide-react";
import home from "../../content/home-legacy.json";
import { linkById } from "../../components/layout/site-header/panels.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";

const { filingOptions: copy } = home;

/** Where a card goes: a nav.json link id (`link`) or a route (`to`). */
function cardTarget(card) {
  if (!card.link) return { to: card.to };
  const link = linkById(card.link);
  return link.to ? { to: link.to } : { href: link.href };
}

/** "Our tax services": one card per service, each linking to its page, plus a "Find an office" card. */
export default function FilingOptions() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{copy.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{copy.text}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {copy.cards.map((card) => (
            <Card
              key={card.title}
              className="shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6 flex flex-1 flex-col gap-4">
                <h3 className="text-2xl font-semibold text-gray-900">{card.title}</h3>
                <p className="flex-1 text-gray-600 leading-relaxed">{card.description}</p>
                <Button
                  {...cardTarget(card)}
                  variant="outline"
                  size="md"
                  transition="transition-all duration-300"
                  className="w-full group/btn"
                >
                  {card.cta}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
