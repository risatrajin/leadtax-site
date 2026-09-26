import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Questions separated by thin lines; each row is a button that reveals its answer. */
export default function FaqList({ items }) {
  const baseId = useId();
  const [open, setOpen] = useState(null);

  return (
    <ul className="border-t border-ed-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const answerId = `${baseId}-answer-${index}`;
        return (
          <li key={item.question} className="border-b border-ed-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-normal text-ed-ink md:text-xl"
            >
              {item.question}
              <Plus
                aria-hidden="true"
                className={`h-5 w-5 flex-shrink-0 text-ed-ink transition-transform ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div id={answerId} hidden={!isOpen} className="max-w-[640px] pb-6 text-ed-muted">
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
