import { bookingHref, directionsHref, officePhone, officeTel } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import Button from "./Button.jsx";

/**
 * One office: entrance photo, address and phone, opening hours, booking and directions.
 * A single row on wide screens; a stacked card with the photo on top below that.
 */
export default function OfficeRow({ office, copy, bookingFallback }) {
  return (
    <li className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:grid-cols-3 md:gap-6 md:p-5 xl:grid-cols-12 xl:items-center xl:gap-8">
      <OfficePhoto
        office={office}
        alt={fill(copy.entranceAlt, { office: office.shortName })}
        className="h-52 w-full rounded-xl object-cover md:col-span-3 md:h-60 xl:col-span-3 xl:h-40"
      />
      <div className="xl:col-span-4">
        <h3 className="text-xl font-semibold text-gray-900">{office.shortName}</h3>
        <p className="mt-2 text-gray-600">{office.display.address}</p>
        <a href={officeTel(office)} className="mt-1 inline-block font-semibold text-gray-900 hover:text-brand">
          {officePhone(office)}
        </a>
      </div>
      <dl aria-label={copy.hoursLabel} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm xl:col-span-3">
        {Object.entries(copy.hours).map(([key, label]) => (
          <div key={key} className="contents">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-gray-900">{office.hours[key]}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2 sm:flex-row md:flex-col xl:col-span-2">
        <Button href={bookingHref(office, bookingFallback)} size="md" className="w-full text-center text-sm font-semibold">
          {copy.bookLabel}
        </Button>
        <Button
          href={directionsHref(office)}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="md"
          className="w-full text-center text-sm font-semibold"
        >
          {copy.directionsLabel}
        </Button>
      </div>
    </li>
  );
}
