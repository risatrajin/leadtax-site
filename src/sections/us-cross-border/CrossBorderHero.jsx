import Button from "../../components/ui/Button.jsx";
import { crossBorderAction } from "./links.js";

// The primary button is navy on a navy gradient, so it barely stands out (kept from the original).
const ACTION_VARIANTS = ["primary", "outlineInverse"];

export default function CrossBorderHero({ hero }) {
  return (
    <section className="relative bg-gradient-to-br from-brand to-brand-strong text-white py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{hero.title}</h1>
          <p className="text-lg md:text-xl text-brand-subtle">{hero.text}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {hero.actions.map((action, index) => (
              <Button
                key={action.label}
                {...crossBorderAction(action)}
                variant={ACTION_VARIANTS[index]}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="rounded-2xl shadow-2xl w-full h-[250px] md:h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
