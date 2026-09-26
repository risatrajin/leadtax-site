import { formatLocalPhone } from "../../lib/phone.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import { buttonClasses } from "./Button.jsx";

const BOOK_BUTTON = buttonClasses({ size: "block", className: "mt-auto" });

/**
 * One office: photo, name (+ "Head Office" badge), address, email, phone and a booking action.
 * `onPickExpert` is called for offices whose booking opens the expert picker instead of a link.
 */
export default function OfficeCard({ office, bookLabel, onPickExpert }) {
  const { display, booking } = office;
  return (
    <div
      id={office.id}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col scroll-mt-32"
    >
      <OfficePhoto office={office} alt={`${display.title} office`} className="h-48 w-full object-cover" />
      <div className="p-6 space-y-3 flex flex-col flex-1">
        <div>
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            {display.title}
            {display.subtitle && (
              <span className="text-xs font-normal bg-brand-subtle text-brand px-2 py-1 rounded">{display.subtitle}</span>
            )}
          </h3>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{display.address}</p>
        {office.email && <p className="text-gray-700 text-sm">{office.email}</p>}
        <p className="text-gray-900 font-semibold">{formatLocalPhone(office.phone)}</p>
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
