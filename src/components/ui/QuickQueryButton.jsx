import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import home from "../../content/homepage.json";
import QuickQuery from "../../sections/home/QuickQuery.jsx";

/**
 * Floating "Quick question" pill placed over a hero image; opens the quick question modal.
 * It drifts gently up and down (paused on hover/focus, off for reduced motion).
 * `className` positions it inside the image's (relative) wrapper.
 */
export default function QuickQueryButton({ className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`float absolute z-20 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-brand shadow-xl ring-1 ring-black/5 transition-colors hover:bg-brand-subtle ${className}`}
      >
        <MessageCircleQuestion aria-hidden="true" className="h-5 w-5" />
        {home.hero.note.label}
      </button>
      <QuickQuery open={open} onOpenChange={setOpen} />
    </>
  );
}
