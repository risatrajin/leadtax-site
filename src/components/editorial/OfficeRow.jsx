import { bookingHref, directionsHref, officePhone, officeTel } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import PillButton from "./PillButton.jsx";

/**
 * One office: entrance photo, address and phone, opening hours, and booking/directions.
 * A 12-column row on wide screens; a stacked card with the photo on top below that.
 */
export default function OfficeRow({ office, copy, bookingFallback }) {
  const days = Object.entries(copy.hours);
  return (
    <li className="grid gap-5 rounded-ed-row bg-white p-4 md:grid-cols-3 md:gap-6 md:p-5 xl:grid-cols-12 xl:items-center xl:gap-8">
      <ImagePlaceholder
        label={fill(copy.entranceImageLabel, { office: office.shortName })}
        className="h-[200px] md:col-span-3 md:h-[240px] xl:col-span-3 xl:h-[160px]"
      />
      <div className="xl:col-span-4">
        <h3 className="text-xl font-medium tracking-[-0.01em]">{office.shortName}</h3>
        <p className="mt-2 text-ed-muted">{office.display.address}</p>
        <a href={officeTel(office)} className="mt-1 inline-block text-ed-ink underline-offset-4 hover:underline">
          {officePhone(office)}
        </a>
      </div>
      <dl aria-label={copy.hoursLabel} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm xl:col-span-3">
        {days.map(([key, label]) => (
          <div key={key} className="contents">
            <dt className="text-ed-muted">{label}</dt>
            <dd className="text-ed-ink">{office.hours[key]}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2 sm:flex-row md:flex-col xl:col-span-2">
        <PillButton href={bookingHref(office, bookingFallback)} size="sm" className="w-full">
          {copy.bookLabel}
        </PillButton>
        <PillButton href={directionsHref(office)} variant="outline" size="sm" className="w-full">
          {copy.directionsLabel}
        </PillButton>
      </div>
    </li>
  );
}
