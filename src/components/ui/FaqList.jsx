import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Questions as cards; each is a button that reveals its answer. One open at a time. */
export default function FaqList({ items }) {
  const baseId = useId();
  const [open, setOpen] = useState(null);

  return (
    <ul className="space-y-4">
      {items.map((item, index) => {
        const isOpen = open === index;
        const answerId = `${baseId}-answer-${index}`;
        return (
          <li key={item.question} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              <Plus aria-hidden="true" className={`h-5 w-5 flex-shrink-0 text-brand transition-transform ${isOpen ? "rotate-45" : ""}`} />
            </button>
            <div id={answerId} hidden={!isOpen} className="px-6 pb-6 leading-relaxed text-gray-600">
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
