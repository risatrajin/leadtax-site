import site from "../content/site.json";

/** Toll-free number as shown in the hero: "1 877 453 2382". */
export const tollFreeSpaced = site.contact.tollFree.replaceAll("-", " ");

/** Toll-free number as shown in the footer: "1-877-453-2382". */
export const tollFreeDashed = site.contact.tollFree;

/** Office phone as shown on the Contact page: "(604) 978-4850". */
export function formatLocalPhone(digits) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Phone as published in JSON-LD and tel: links: "6049784850" or "1-877-453-2382" → "+16049784850". */
export function toE164(phone) {
  const digits = String(phone).replace(/\D/g, "");
  return `+${digits.length === 10 ? `1${digits}` : digits}`;
}
