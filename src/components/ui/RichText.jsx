import { Fragment } from "react";
import SmartLink from "./SmartLink.jsx";
import { MARKUP } from "../../lib/markup.js";

/**
 * Inline links stay quiet: the surrounding text's colour and weight with a light underline, turning
 * brand blue on hover. ON_DARK is the same for white text on blue.
 */
export const LINK_CLASS = "underline decoration-gray-300 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";
export const LINK_CLASS_ON_DARK = "underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white";

/** Renders a content string, turning its inline markup (lib/markup.js) into links and bold text. */
export default function RichText({ text = "", linkClassName = LINK_CLASS }) {
  if (typeof text !== "string") return text;
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(MARKUP)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, bold, label, target] = match;
    if (bold) {
      parts.push(
        <strong key={match.index} className="font-semibold text-gray-900">
          {bold}
        </strong>,
      );
    } else {
      const internal = target.startsWith("/");
      parts.push(
        <SmartLink
          key={match.index}
          {...(internal ? { to: target } : { href: target })}
          className={target.startsWith("tel:") ? `${linkClassName} whitespace-nowrap` : linkClassName}
        >
          {label}
        </SmartLink>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

/** A short "Sources" list under a section; renders nothing when there are none. */
export function Sources({ sources, className = "mt-10" }) {
  if (!sources?.items?.length) return null;
  return (
    <div className={`${className} text-sm text-gray-500`}>
      <h3 className="font-semibold text-gray-700">{sources.title}</h3>
      <ul className="mt-2 space-y-1">
        {sources.items.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
