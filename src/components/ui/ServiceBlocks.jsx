import { ArrowRight, Check } from "lucide-react";
import Button from "./Button.jsx";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";
import { tollFreeDashed } from "../../lib/phone.js";
import { CARD, CARD_TITLE, ICON_BADGE } from "../../lib/styles.js";
import { fill } from "../../lib/template.js";

/** Building blocks shared by the service pages (Bookkeeping, Trust & estate). */

export const H2 = "text-3xl text-gray-900 md:text-4xl lg:text-5xl";

/** Section heading with an optional intro; `small` for headings inside cards. */
export function SectionTitle({ title, text, center, small }) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center")}>
      <h2 className={small ? "text-2xl text-gray-900 md:text-3xl" : H2}>
        {title}
      </h2>
      {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
    </div>
  );
}

/** List item with a check icon. */
export function CheckItem({ children, tone = "text-brand-bright" }) {
  return (
    <li className="flex items-start gap-3">
      <Check
        aria-hidden="true"
        className={cx("mt-0.5 h-5 w-5 flex-shrink-0", tone)}
      />
      <span>{children}</span>
    </li>
  );
}

/** Grid of white cards, each with an icon badge, title and text. */
export function IconCardGrid({
  id,
  title,
  text,
  items,
  className = "bg-white",
}) {
  return (
    <section
      id={id}
      className={cx("scroll-mt-28 px-4 py-16 md:px-8 md:py-24", className)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={title} text={text} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li key={item.title} className={`${CARD} p-6`}>
                <div className={ICON_BADGE}>
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Closing navy panel: title, text, a booking button and the phone number. */
export function ClosingCta({ cta }) {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-8 py-12 text-white shadow-xl md:px-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-brand-subtle">{cta.text}</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Button to={cta.primary.to} variant="inverse">
            {cta.primary.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <a
            href={`tel:${tollFreeDashed}`}
            className="text-brand-subtle underline-offset-4 hover:text-white hover:underline"
          >
            {fill(cta.callLabel, { phone: tollFreeDashed })}
          </a>
        </div>
      </div>
    </section>
  );
}
