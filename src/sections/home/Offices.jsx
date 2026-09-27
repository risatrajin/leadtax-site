import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import content from "../../content/home.json";
import {
  bookingHref,
  directionsHref,
  mapEmbedSrc,
  officeCities,
  officePhone,
  officeTel,
  offices,
} from "../../lib/offices.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";

const { offices: copy, bookingFallback } = content;

/** Offices grouped by city, in office order, so several offices in one city sit under one heading. */
const groups = officeCities.map((city) => ({
  city,
  offices: offices.filter((office) => office.schema.addressLocality === city),
}));

const photoAlt = (office) => fill(copy.entranceAlt, { office: office.shortName });
const officeCount = (count) => (count === 1 ? copy.officeCountOne : fill(copy.officeCountOther, { count }));

function Hours({ office }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{copy.hoursLabel}</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-sm">
        {Object.entries(copy.hours).map(([key, label]) => (
          <div key={key} className="contents">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-gray-900">{office.hours[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Actions({ office }) {
  return (
    <div className="flex gap-3">
      <Button href={bookingHref(office, bookingFallback.href)} size="sm" className="flex-1 whitespace-nowrap">
        {copy.bookLabel}
      </Button>
      <Button
        href={directionsHref(office)}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="sm"
        className="flex-1 whitespace-nowrap"
      >
        {copy.directionsLabel}
      </Button>
    </div>
  );
}

/** Grayscale Google map centred on the office. */
function OfficeMap({ office, className }) {
  return (
    <iframe
      key={office.id}
      title={fill(copy.mapTitle, { office: office.shortName })}
      src={mapEmbedSrc(office)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`border-0 grayscale ${className}`}
    />
  );
}

/**
 * One office in the list: photo, name, address and phone. Selecting it moves the map. Below
 * 1024px, where there is no side map, the selected card also shows its map, hours and actions.
 */
function OfficeCard({ office, selected, onSelect }) {
  return (
    <li className={`${CARD} overflow-hidden transition-shadow ${selected ? "ring-2 ring-brand" : "hover:shadow-lg"}`}>
      <div className="flex gap-4 p-3">
        <button
          type="button"
          aria-pressed={selected}
          aria-label={fill(copy.selectLabel, { office: office.shortName })}
          onClick={onSelect}
          className="flex-shrink-0 rounded-xl"
        >
          <OfficePhoto office={office} alt="" className="h-24 w-28 rounded-xl object-cover text-xs sm:w-36" />
        </button>
        <div className="min-w-0 flex-1 py-1">
          <button type="button" onClick={onSelect} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-left" tabIndex={-1}>
            <span className="text-lg font-semibold text-gray-900">{office.shortName}</span>
            {office.isHeadOffice && (
              <span className="rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand">
                {copy.headOfficeLabel}
              </span>
            )}
          </button>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            {office.display.address}
          </p>
          <a
            href={officeTel(office)}
            className="mt-1 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-brand"
          >
            <Phone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-gray-400" />
            {officePhone(office)}
          </a>
        </div>
      </div>
      {selected && (
        <div className="space-y-4 border-t border-gray-100 p-4 lg:hidden">
          <OfficeMap office={office} className="h-56 w-full rounded-xl" />
          <Hours office={office} />
          <Actions office={office} />
        </div>
      )}
    </li>
  );
}

/**
 * Offices: a list grouped by city on the left and, from 1024px, a grayscale Google map on the
 * right centred on the selected office, with a card showing its photo, hours and actions.
 */
export default function Offices() {
  const [activeId, setActiveId] = useState(offices[0].id);
  const active = offices.find((office) => office.id === activeId);

  return (
    <section id="offices" className="scroll-mt-24 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:col-span-5 lg:text-5xl">{copy.title}</h2>
          <p className="max-w-xl text-lg text-gray-600 lg:col-span-7">{copy.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-8 lg:col-span-5">
            {groups.map((group) => (
              <div key={group.city}>
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand">{group.city}</h3>
                  <span className="text-xs text-gray-500">{officeCount(group.offices.length)}</span>
                </div>
                <ul className="mt-4 space-y-4">
                  {group.offices.map((office) => (
                    <OfficeCard
                      key={office.id}
                      office={office}
                      selected={office.id === activeId}
                      onSelect={() => setActiveId(office.id)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 h-[calc(100vh-9rem)] max-h-[760px] min-h-[560px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md">
              {/* The map runs 22rem past the left edge, so the office pin centres in the open area left of the card. */}
              <OfficeMap office={active} className="absolute inset-y-0 -left-[22rem] h-full w-[calc(100%+22rem)]" />
              <div key={active.id} className={`${CARD} animate-fadeIn absolute right-4 top-4 w-80 overflow-hidden`}>
                <OfficePhoto office={active} alt={photoAlt(active)} className="h-40 w-full object-cover" />
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{active.shortName}</p>
                    <p className="text-sm text-gray-600">{active.display.address}</p>
                  </div>
                  <Hours office={active} />
                  <Actions office={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
