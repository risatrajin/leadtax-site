import { ArrowRight } from "lucide-react";
import { cx } from "../../lib/cx.js";
import { CARD, CARD_TITLE, LIFT } from "../../lib/styles.js";
import { getIcon } from "../../lib/icons.js";

/** Building blocks shared by the homepage and the service pages. */

export const H2 = "text-3xl text-gray-900 md:text-4xl lg:text-5xl";

/** Small blue label above a section heading. */
export const EYEBROW = "text-sm font-semibold uppercase tracking-wider text-brand-bright";

/** Section heading with an optional label and intro. */
export function SectionTitle({ eyebrow, title, text, center }) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={cx(EYEBROW, "mb-3")}>{eyebrow}</p>}
      <h2 className={H2}>{title}</h2>
      {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
    </div>
  );
}

/** Numbered cards: "01 / Label", a title and text, with an optional link to the enquiry form. */
export function StepCards({ items, linkHref }) {
  return (
    <ol className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className={`${CARD} flex flex-col p-7`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-bright">
            {String(index + 1).padStart(2, "0")} / {item.label}
          </p>
          <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
          <p className="mt-2 flex-1 text-gray-600">{item.text}</p>
          {item.link && (
            <a href={linkHref} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline">
              {item.link}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Three-up grid of cards, each with an icon tile, a title and text. `items` are { icon, title, text }. */
export function IconCardGrid({ items }) {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <li key={item.title} className={cx(CARD, LIFT, "p-7")}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-subtle text-brand">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
