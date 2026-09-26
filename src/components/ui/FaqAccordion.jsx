import { useState } from "react";
import { ChevronDown } from "lucide-react";

/** List of expandable questions. Each question toggles independently. */
export default function FaqAccordion({ items }) {
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
