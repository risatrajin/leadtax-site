import { ArrowRight } from "lucide-react";
import home from "../../content/home.json";
import { filingOptions } from "../../content/services.json";
import { isExternal } from "../../lib/links.js";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";

const { filingOptions: copy } = home;

function OptionAction({ option }) {
  if (option.isComingSoon) {
    return (
      <Button
        disabled
        variant="disabled"
        size="md"
        transition={null}
        className="w-full font-semibold flex items-center justify-center gap-2"
      >
        {copy.comingSoonLabel}
      </Button>
    );
  }
  const target = isExternal(option.link)
    ? { href: option.link, target: "_blank", rel: "noopener noreferrer" }
    : { to: option.link };
  return (
    <Button
      {...target}
      variant="outline"
      size="md"
      transition="transition-all duration-300"
      className="w-full font-semibold flex items-center justify-center gap-2 group/btn"
    >
      {option.ctaText}
      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
    </Button>
  );
}

/** "Choose how you want to file" — one card per filing service. */
export default function FilingOptions() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{copy.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{copy.text}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filingOptions.map((option) => (
            <Card
              key={option.id}
              className="shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              {option.isComingSoon && (
                <div className="absolute top-4 right-4 z-10 bg-brand text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  {copy.comingSoonLabel}
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">{option.title}</h3>
                <p className="text-gray-600 leading-relaxed">{option.description}</p>
                <OptionAction option={option} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
