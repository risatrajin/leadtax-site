/**
 * Content strings may carry two bits of inline markup:
 *   [label](/path)   a link (a site path, an external URL or tel:)
 *   **text**         bold text
 * components/ui/RichText.jsx renders them; plainText strips them.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Matches either markup: group 1 is bold text, groups 2 and 3 a link's label and target. */
export const MARKUP = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The text without its markup, for places that need plain text (meta tags, structured data). */
export const plainText = (text = "") => text.replace(LINK, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

/**
 * Splits a paragraph after its first sentence: [first sentence, the rest]. Long hero copy shows its
 * first sentence in the hero and the rest further down the page, so no words change.
 */
export function splitLead(text = "") {
  const match = text.match(/^(.+?[.!?])\s+(\S[\s\S]*)$/);
  return match ? [match[1], match[2]] : [text, ""];
}
