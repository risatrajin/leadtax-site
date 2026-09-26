import { offices } from "../content/offices.json";
import { formatLocalPhone } from "./phone.js";

export { offices };

/** Where "Book" goes for an office: its own booking link, or the fallback for offices without one. */
export function bookingHref(office, fallbackHref) {
  return office.booking?.url ?? fallbackHref;
}

/** Google Maps search for the office's street address. */
export function directionsHref(office) {
  const { streetAddress, addressLocality, addressRegion, postalCode } = office.schema;
  const query = `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Opening hours for the given day (0 = Sunday). */
export function hoursOn(office, date = new Date()) {
  const day = date.getDay();
  if (day === 0) return office.hours.sunday;
  if (day === 6) return office.hours.saturday;
  return office.hours.weekdays;
}

export const officePhone = (office) => formatLocalPhone(office.phone);
export const officeTel = (office) => `tel:+1${office.phone}`;

/** Cities that have an office, in office order. */
export const officeCities = [...new Set(offices.map((office) => office.schema.addressLocality))];
