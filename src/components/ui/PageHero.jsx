import { CircleCheckBig } from "lucide-react";
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
 * without one the text is centred. `decor` adds soft light glows and a faint grid. `imageNote` ({ title, text }) adds a white note card over the photo.
 */
export default function PageHero({ title, text, actions = [], image, imageNote, decor, children }) {
  return (
    <section className={cx("bg-gradient-to-br from-brand to-brand-strong px-4 py-16 text-white md:px-8 md:py-24", decor && "relative isolate overflow-hidden")}>
      {decor && (
        <>
          <div aria-hidden="true" className="absolute -left-32 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-bright/40 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-48 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-fade/20 blur-3xl" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
          />
        </>
      )}
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
          <div className="relative">
            <img
              src={image.src}
              alt={image.alt}
              className={cx("h-64 w-full object-cover shadow-2xl md:h-96", decor ? "rounded-3xl ring-1 ring-white/15" : "rounded-2xl")}
            />
            {imageNote && (
              <div className="relative mx-4 -mt-10 flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-xl sm:absolute sm:-bottom-8 sm:left-6 sm:mx-0 sm:mt-0 sm:max-w-sm">
                <CircleCheckBig aria-hidden="true" className="h-9 w-9 flex-shrink-0 text-brand-bright" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{imageNote.title}</p>
                  <p className="text-sm text-gray-600">{imageNote.text}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
