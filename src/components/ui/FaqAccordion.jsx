import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Expandable question list. Two styles exist on the site:
 * - "simple" (homepage): any number of answers open at once; answers keep line breaks.
 * - "bordered" (/faq): one answer open at a time.
 * - "compact" (/us-cross-border): one answer open at a time, smaller text on mobile, chevron flips icon.
 */
export default function FaqAccordion({ items, variant = "simple" }) {
  if (variant === "bordered") return <BorderedFaq items={items} />;
  if (variant === "compact") return <CompactFaq items={items} />;
  return <SimpleFaq items={items} />;
}

function SimpleFaq({ items }) {
  const [open, setOpen] = useState({});
  const toggle = (question) => setOpen((prev) => ({ ...prev, [question]: !prev[question] }));

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggle(item.question)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg text-gray-900 pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${open[item.question] ? "rotate-180" : ""}`}
            />
          </button>
          {open[item.question] && (
            <div className="px-6 pb-5 text-gray-600 whitespace-pre-line">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function BorderedFaq({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-brand transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CompactFaq({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-900 pr-4 text-sm md:text-base">{item.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-brand flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-brand flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-4 md:px-6 pb-4 md:pb-5 text-sm md:text-base text-gray-600">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
