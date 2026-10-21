import { offices } from "../content/offices.json";
import { formatLocalPhone } from "./phone.js";

export { offices };

/** Where "Book" goes for an office: its own booking link, or the fallback for offices without one. */
export function bookingHref(office, fallbackHref) {
  return office.booking?.url ?? fallbackHref;
}

/** The office's full street address, as used for maps. */
export function officeQuery(office) {
  const { streetAddress, addressLocality, addressRegion, postalCode } = office.schema;
  return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

/** Keyless Google Maps embed centred on the office (one pin; several pins need a Maps API key). */
export function mapEmbedSrc(office, zoom = 15) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(officeQuery(office))}&z=${zoom}&output=embed`;
}

/** Google Maps search for the office's street address. */
export function directionsHref(office) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeQuery(office))}`;
}

/** Opening hours for the given day (0 = Sunday). */
export function hoursOn(office, date = new Date()) {
  const day = date.getDay();
  if (day === 0) return office.hours.sunday;
  if (day === 6) return office.hours.saturday;
  return office.hours.weekdays;
}

export const officePhone = (office) => formatLocalPhone(office.phone);

/** The head office's email address (where the site's enquiry forms send). */
export const headOfficeEmail = offices.find((office) => office.isHeadOffice).email;

/** Options for a "preferred location" dropdown: `anyLabel` first, then "City — Office" for each office. */
export const officeLocationOptions = (anyLabel) => [
  anyLabel,
  ...offices.map((office) => `${office.schema.addressLocality} — ${office.shortName}`),
];

/** Cities that have an office, in office order. */
export const officeCities = [...new Set(offices.map((office) => office.schema.addressLocality))];

/**
 * Offices grouped by city (cities in office order), so every list on the site shows them in the
 * same order. The JSON-LD keeps the order of offices.json.
 */
export const officesByCity = officeCities.flatMap((city) =>
  offices.filter((office) => office.schema.addressLocality === city),
);
