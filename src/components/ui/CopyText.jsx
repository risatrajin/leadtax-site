import { useEffect, useState } from "react";
import site from "../../content/site.json";
import { fill } from "../../lib/template.js";

const { copyHint, copied: copiedText, copyLabel } = site.contact;

/** Copies with the Clipboard API, or a hidden textarea where that isn't available (e.g. plain http). */
async function writeClipboard(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall through to the textarea method.
    }
  }
  const focused = document.activeElement;
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = "position:fixed;left:-9999px;top:0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  focused?.focus?.();
  return ok;
}

/** `copy()` puts `value` on the clipboard; `copied` stays true for two seconds after. */
export function useCopy(value) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  const copy = async () => {
    if (await writeClipboard(value)) setCopied(true);
  };
  return { copied, copy };
}

/**
 * A phone number or email address that copies `value` to the clipboard when clicked, instead of
 * opening the dialler or the email app. Shows "Click to copy" on hover and "Copied!" after a click.
 * Styled entirely by `className`, so it can stand in for the link it replaces. `tip` places the
 * tooltip "above" (default) or "below" the text.
 */
export default function CopyText({ value, className = "", tip = "above", children }) {
  const { copied, copy } = useCopy(value);

  const place = tip === "below" ? "top-full mt-2" : "bottom-full mb-2";
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={fill(copyLabel, { value })}
      className={`group/copy relative cursor-pointer ${className}`}
    >
      {children ?? value}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold text-white shadow-lg transition-opacity ${place} ${
          copied ? "bg-green-600 opacity-100" : "bg-gray-900 opacity-0 group-hover/copy:opacity-100 group-focus-visible/copy:opacity-100"
        }`}
      >
        {copied ? copiedText : copyHint}
      </span>
      <span role="status" className="sr-only">
        {copied ? copiedText : ""}
      </span>
    </button>
  );
}
