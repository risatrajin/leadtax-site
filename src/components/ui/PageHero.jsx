import Button from "./Button.jsx";
import { cx } from "../../lib/cx.js";

/** Link props for a hero action: a router path, or a URL that may open in a new tab. */
export function actionProps(action) {
  if (action.to) return { to: action.to };
  return action.newTab ? { href: action.href, target: "_blank", rel: "noopener noreferrer" } : { href: action.href };
}

/**
 * The one hero used by inner pages: a navy band with a white title, a light-blue intro and up to
 * two actions (white, then white outline). An action is { label, to | href, newTab } or
 * { label, props } with ready-made link props. With an image the text sits left and the photo right;
 * without one the text is centred.
 */
export default function PageHero({ title, text, actions = [], image, children }) {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-strong px-4 py-16 text-white md:px-8 md:py-24">
      <div className={cx("mx-auto max-w-7xl", image && "grid items-center gap-12 lg:grid-cols-2")}>
        <div className={cx(!image && "mx-auto max-w-3xl text-center")}>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
          {text && <p className="mt-6 text-lg text-brand-subtle md:text-xl">{text}</p>}
          {actions.length > 0 && (
            <div className={cx("mt-10 flex flex-col gap-4 sm:flex-row", !image && "sm:justify-center")}>
              {actions.map((action, index) => (
                <Button
                  key={action.label}
                  {...(action.props ?? actionProps(action))}
                  variant={index === 0 ? "inverse" : "outlineInverseFill"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          {children}
        </div>
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            className="h-64 w-full rounded-2xl object-cover shadow-2xl md:h-96"
          />
        )}
      </div>
    </section>
  );
}
