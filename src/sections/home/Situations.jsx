import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import SmartLink from "../../components/ui/SmartLink.jsx";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";
import { CARD } from "../../lib/styles.js";
import Collapse from "../../components/ui/Collapse.jsx";

/**
 * "Choose your situation" as an accordion: the title and intro on the left, the situations on the
 * right. One situation is open at a time; it shows its summary, checklist and a link.
 */
export default function Situations({ situations }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="situations" className="scroll-mt-28 bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{situations.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{situations.text}</p>
        </div>
        <ul className="space-y-4">
          {situations.cards.map((item, index) => {
            const open = index === openIndex;
            const Icon = getIcon(item.icon);
            const panelId = `situation-panel-${index}`;
            return (
              <li key={item.label} className={cx(CARD, "overflow-hidden transition-shadow", open ? "ring-2 ring-brand" : "hover:shadow-lg")}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex-1 text-lg font-semibold text-gray-900">{item.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cx("h-5 w-5 flex-shrink-0 transition-transform", open ? "rotate-180 text-brand" : "text-gray-400")}
                    />
                  </button>
                </h3>
                <Collapse id={panelId} open={open} className="border-t border-gray-100 px-5 pb-6 pt-5 sm:pl-20">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-bright">{item.tag}</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-3 text-gray-600">{item.text}</p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-bright" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <SmartLink
                    to={item.link.to}
                    href={item.link.href}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
                  >
                    {item.link.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </SmartLink>
                </Collapse>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
