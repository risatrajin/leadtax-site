import site from "../content/site.json";

/** Toll-free number as shown in the hero: "1 877 453 2382". */
export const tollFreeSpaced = site.contact.tollFree.replaceAll("-", " ");

/** Toll-free number as shown in the footer: "1-877-453-2382". */
export const tollFreeDashed = site.contact.tollFree;

/** Office phone as shown on the Contact page: "(604) 978-4850". */
export function formatLocalPhone(digits) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Office phone as published in JSON-LD: "+16049784850". */
export function toE164(digits) {
  return `+1${digits}`;
}
