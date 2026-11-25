import { CircleCheckBig, MessagesSquare } from "lucide-react";
import Button from "./Button.jsx";
import { cx } from "../../lib/cx.js";
import { openDropoff } from "../../lib/links.js";
import QuickQueryButton from "./QuickQueryButton.jsx";
import LeadFormFrame from "./LeadFormFrame.jsx";
import enquiry from "../../content/enquiry.json";
import { imgProps } from "../../lib/images.js";
import RichText, { LINK_CLASS_ON_DARK } from "./RichText.jsx";

/**
 * Where the "Quick question" pill sits on the hero photo, set per page with `image.quickQuery`.
 * Below lg it stays inside the photo's top corner (clear of the note card); from lg it straddles
 * the photo's edge, like on the homepage. Pick the corner that keeps it off faces.
 */
const QUICK_QUERY_POSITIONS = {
  "top-right": "right-3 top-4 lg:-right-6 lg:top-10",
  "top-left": "left-3 top-4 lg:-left-6 lg:top-10",
  "bottom-right": "right-3 top-4 lg:-right-6 lg:bottom-10 lg:top-auto",
  "bottom-left": "left-3 top-4 lg:-left-6 lg:bottom-10 lg:top-auto",
};

const DOTS = "bg-[radial-gradient(rgb(255_255_255/0.7)_2px,transparent_2px)] bg-[size:16px_16px]";

/**
 * The enquiry form in a white card for a service page hero, with dotted patches peeking out behind
 * it. `service` is the page's name (it preselects the matching service through
 * enquiry.form.serviceTypes). The page also gets the docked "Quick question" orb once it scrolls.
 */
export function HeroForm({ service }) {
  const { hero, serviceTypes, fallbackLabel, loadingLabel } = enquiry.form;
  return (
    <div className="relative">
      <div aria-hidden="true" className={cx("absolute -bottom-8 -right-8 hidden h-48 w-48 lg:block", DOTS)} />
      <div aria-hidden="true" className={cx("absolute -left-8 -top-8 hidden h-28 w-28 opacity-60 lg:block", DOTS)} />
      <QuickQueryButton dockOnly />
      <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-5 text-left text-gray-900 shadow-[0_30px_60px_-15px_rgb(3_20_60/0.45)] ring-1 ring-black/5 sm:p-7 sm:pb-3">
        {/* Soft blue glow in the card's top corner. */}
        <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-subtle/70 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
            <MessagesSquare aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{hero.title}</h2>
            <p className="text-sm text-gray-500">{hero.text}</p>
          </div>
        </div>
        <div aria-hidden="true" className="relative mt-5 h-px bg-gray-100" />
        <LeadFormFrame
          compact
          title={hero.title}
          service={serviceTypes[service]}
          fallbackLabel={fallbackLabel}
          loadingLabel={loadingLabel}
          className="relative mt-4"
        />
      </div>
    </div>
  );
}

/**
 * Link props for a hero action: a router path, or a URL that may open in a new tab. With
 * `dropoff`, a click opens the document drop-off dialog instead (the href stays as the direct link
 * for new-tab clicks).
 */
export function actionProps(action) {
  if (action.to) return { to: action.to };
  if (action.dropoff) {
    return {
      href: action.href,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        openDropoff();
      },
    };
  }
  return action.newTab ? { href: action.href, target: "_blank", rel: "noopener noreferrer" } : { href: action.href };
}

/**
 * The one hero used by inner pages: a navy band with an optional small label, a white title, a light-blue intro and up to
 * two actions (white, then white outline). An action is { label, to | href, newTab } or
 * { label, props } with ready-made link props. With an image the text sits left and the photo right;
 * without one the text is centred. `decor` adds soft light glows and a faint grid. `imageNote` ({ title, text }) adds a white note card over the photo;
 * `image.quickQuery` picks the corner for the "Quick question" pill (see QUICK_QUERY_POSITIONS).
 * With `formService` (the page's name) the enquiry form takes the photo's place (HeroForm).
 */
export default function PageHero({ eyebrow, heading, title, text, actions = [], image, imageNote, formService, decor, children }) {
  const form = Boolean(formService);
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
      <div className={cx("mx-auto max-w-7xl", (image || form) && "grid items-center gap-12 lg:grid-cols-2", form && "lg:items-start")}>
        {/* Beside the form, the text sits centred to its height. */}
        <div className={cx(!image && !form && "mx-auto max-w-3xl text-center", form && "lg:self-center")}>
          {/* With a `heading`, that short line is the page's h1 (for search) and the big title is a
              plain paragraph; otherwise the title is the h1, under the optional eyebrow. */}
          {heading ? (
            <>
              <h1 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-subtle">{heading}</h1>
              <p className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</p>
            </>
          ) : (
            <>
              {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-subtle">{eyebrow}</p>}
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h1>
            </>
          )}
          {text && (
            <p className={cx("mt-6 text-lg text-brand-subtle", !heading && "md:text-xl")}>
              <RichText text={text} linkClassName={LINK_CLASS_ON_DARK} />
            </p>
          )}
          {actions.length > 0 && (
            <div className={cx("mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap", !image && !form && "sm:justify-center")}>
              {actions.map((action, index) => (
                <Button
                  key={action.label}
                  {...(action.props ?? actionProps(action))}
                  variant={index === 0 ? "inverse" : "outlineInverseFill"}
                  className="sm:whitespace-nowrap"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          {children}
        </div>
        {form && <HeroForm service={formService} />}
        {image && !form && (
          <div className="relative">
            <QuickQueryButton className={cx("whitespace-nowrap", QUICK_QUERY_POSITIONS[image.quickQuery ?? "top-right"])} />
            <img
              {...imgProps(image.src, "(min-width: 1024px) 50vw, 100vw")}
              fetchpriority="high"
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
