import Button from "../../components/ui/Button.jsx";
import { cx } from "../../lib/cx.js";

/**
 * Service page hero. "remote" = light gradient with navy text and one navy button;
 * "local" = soft-blue background, white text, white + outlined buttons.
 */
const STYLES = {
  remote: {
    section: "bg-gradient-to-br from-white via-brand-subtle/10 to-white",
    title: "text-brand",
    text: "text-gray-600",
    actions: [{ variant: "primary", className: "text-lg text-center" }],
  },
  local: {
    section: "bg-brand-fade",
    title: "text-white",
    text: "text-white/90",
    actions: [
      { variant: "inverse", className: "text-lg font-medium text-center" },
      { variant: "outlineInverseFill", className: "text-lg font-medium text-center" },
    ],
  },
};

function actionProps(action) {
  if (action.to) return { to: action.to };
  return action.newTab
    ? { href: action.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: action.href };
}

export default function ServiceHero({ variant, hero }) {
  const style = STYLES[variant];
  return (
    <section className={cx("py-16 md:py-24 px-4 md:px-8", style.section)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={cx("text-4xl md:text-5xl lg:text-6xl mb-6", style.title)}>{hero.title}</h1>
            <p className={cx("text-lg md:text-xl mb-8", style.text)}>{hero.text}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {hero.actions.map((action, index) => (
                <Button
                  key={action.label}
                  {...actionProps(action)}
                  variant={style.actions[index].variant}
                  className={cx(style.actions[index].className, action.block && "block")}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={hero.image.src} alt={hero.image.alt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export { actionProps };
