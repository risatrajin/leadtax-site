import { CalendarClock } from "lucide-react";
import { SectionTitle } from "../../components/ui/ServiceBlocks.jsx";
import RichText from "../../components/ui/RichText.jsx";
import { CARD, CARD_TITLE } from "../../lib/styles.js";

/** Key deadlines and thresholds as four cards, with an optional note under them. */
export default function Deadlines({ deadlines, className = "bg-white" }) {
  return (
    <section className={`${className} px-4 py-16 md:px-8 md:py-24`}>
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow={deadlines.eyebrow} title={deadlines.title} text={deadlines.text} center />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deadlines.items.map((item) => (
            <li key={item.title} className={`${CARD} flex flex-col p-7`}>
              <CalendarClock aria-hidden="true" className="h-7 w-7 text-brand-bright" />
              <h3 className={`mt-4 ${CARD_TITLE}`}>{item.title}</h3>
              <p className="mt-2 text-gray-600">
                <RichText text={item.text} />
              </p>
            </li>
          ))}
        </ul>
        {deadlines.note && (
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg text-gray-600">
            <RichText text={deadlines.note} />
          </p>
        )}
      </div>
    </section>
  );
}
