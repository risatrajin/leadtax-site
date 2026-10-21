import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import SmartLink from "./SmartLink.jsx";
import Collapse from "./Collapse.jsx";

/**
 * Expandable question list. Two styles exist on the site:
 * - "simple" (homepage): any number of answers open at once; answers keep line breaks.
 * - "bordered" (/faq): one answer open at a time; an item may add a `link` ({ label, to | href }).
 */
export default function FaqAccordion({ items, variant = "simple" }) {
  if (variant === "bordered") return <BorderedFaq items={items} />;
  return <SimpleFaq items={items} />;
}

function SimpleFaq({ items }) {
  const uid = useId();
  const [open, setOpen] = useState({});
  const toggle = (question) => setOpen((prev) => ({ ...prev, [question]: !prev[question] }));

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            type="button"
            aria-expanded={Boolean(open[item.question])}
            aria-controls={`${uid}-${index}`}
            onClick={() => toggle(item.question)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg text-gray-900 pr-4">{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${open[item.question] ? "rotate-180" : ""}`}
            />
          </button>
          <Collapse id={`${uid}-${index}`} open={Boolean(open[item.question])} className="px-6 pb-5 text-gray-600 whitespace-pre-line">
            {item.answer}
          </Collapse>
        </div>
      ))}
    </div>
  );
}

function BorderedFaq({ items }) {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <button
            type="button"
            aria-expanded={openIndex === index}
            aria-controls={`${uid}-${index}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className={`w-5 h-5 text-brand transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          <Collapse id={`${uid}-${index}`} open={openIndex === index} className="px-6 pb-6">
            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            {item.link && (
              <SmartLink
                to={item.link.to}
                href={item.link.href}
                {...(item.link.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-3 inline-flex items-center gap-1 font-semibold text-brand underline-offset-4 hover:underline"
              >
                {item.link.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </SmartLink>
            )}
          </Collapse>
        </div>
      ))}
    </div>
  );
}
