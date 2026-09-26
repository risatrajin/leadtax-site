import { formatLocalPhone } from "../../lib/phone.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import { buttonClasses } from "./Button.jsx";

const BOOK_BUTTON = buttonClasses({ size: "block", className: "mt-auto" });

/**
 * One office: photo, street name (+ "Head office" badge) and city, address, email, phone and a booking action.
 * `onPickExpert` is called for offices whose booking opens the expert picker instead of a link.
 */
export default function OfficeCard({ office, bookLabel, headOfficeLabel, onPickExpert }) {
  const { display, booking } = office;
  return (
    <div
      id={office.id}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col scroll-mt-32"
    >
      <OfficePhoto office={office} alt={`${office.shortName} office entrance`} className="h-48 w-full object-cover" />
      <div className="p-6 space-y-3 flex flex-col flex-1">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex flex-wrap items-center gap-2">
            {office.shortName}
            {office.isHeadOffice && (
              <span className="rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand">{headOfficeLabel}</span>
            )}
          </h2>
          <p className="text-sm text-gray-500">{office.schema.addressLocality}</p>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{display.address}</p>
        {office.email && (
          <a href={`mailto:${office.email}`} className="inline-block py-1.5 text-gray-700 text-sm hover:text-brand">
            {office.email}
          </a>
        )}
        <a href={`tel:+1${office.phone}`} className="text-gray-900 font-semibold hover:text-brand">
          {formatLocalPhone(office.phone)}
        </a>
        {booking.type === "expertPicker" ? (
          <button onClick={onPickExpert} className={`${BOOK_BUTTON} cursor-pointer`}>
            {bookLabel}
          </button>
        ) : (
          <a href={booking.url} target="_blank" rel="noopener noreferrer" className={BOOK_BUTTON}>
            {bookLabel}
          </a>
        )}
      </div>
    </div>
  );
}
