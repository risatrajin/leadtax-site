import { Check, Download } from "lucide-react";
import home from "../../content/home.json";
import SmartLink from "../../components/ui/SmartLink.jsx";
import { CARD, CARD_TITLE } from "../../lib/styles.js";

/** Numbered steps with a checklist card beside them. The download link is optional. */
export default function FirstVisit({ content = home }) {
  const { firstVisit } = content;
  const { checklist } = firstVisit;
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 xl:grid-cols-[1fr_420px] xl:items-end xl:gap-16">
        <div>
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{firstVisit.title}</h2>
          <ol className="mt-12 border-t border-gray-200">
            {firstVisit.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-gray-200 py-6">
                <span
                  aria-hidden="true"
                  className="col-span-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-white md:col-span-1"
                >
                  {index + 1}
                </span>
                <h3 className="col-span-10 self-center text-lg font-semibold text-gray-900 md:col-span-4">{step.title}</h3>
                <p className="col-span-10 col-start-3 text-gray-600 md:col-span-7 md:col-start-auto">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className={`${CARD} p-8 md:p-10`}>
          <h3 className={CARD_TITLE}>{checklist.title}</h3>
          <ul className="mt-6 space-y-3 text-gray-600">
            {checklist.items.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-bright" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {checklist.download && (
          <SmartLink
            href={checklist.download.href}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {checklist.download.label}
          </SmartLink>
          )}
        </aside>
      </div>
    </section>
  );
}
