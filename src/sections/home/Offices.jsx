import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MapPin, Phone } from "lucide-react";
import content from "../../content/home.json";
import {
  bookingHref,
  directionsHref,
  mapEmbedSrc,
  officeCities,
  officePhone,
  offices,
} from "../../lib/offices.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import { fill } from "../../lib/template.js";
import { CARD } from "../../lib/styles.js";
import Button from "../../components/ui/Button.jsx";
import ExpertPickerDialog from "../contact/ExpertPickerDialog.jsx";
import CopyText from "../../components/ui/CopyText.jsx";

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

/** Book (its own booking link, or the expert picker for the head office) and Directions. */
function Actions({ office, onPickExpert }) {
  const picker = office.booking?.type === "expertPicker";
  return (
    <div className="flex gap-3">
      {picker ? (
        <Button size="sm" className="flex-1 whitespace-nowrap" onClick={onPickExpert}>
          {copy.bookLabel}
        </Button>
      ) : (
        <Button href={bookingHref(office, bookingFallback.href)} target="_blank" rel="noopener noreferrer" size="sm" className="flex-1 whitespace-nowrap">
          {copy.bookLabel}
        </Button>
      )}
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

/** Brand-coloured map pin; its tip sits on the point it is placed at. */
function MapPinMarker({ className }) {
  return (
    <svg
      viewBox="0 0 40 52"
      aria-hidden="true"
      className={`pointer-events-none absolute h-[52px] w-10 -translate-x-1/2 -translate-y-full drop-shadow-md ${className}`}
    >
      <path d="M20 51C20 51 38 32.5 38 19.5C38 9.28 29.94 1.5 20 1.5C10.06 1.5 2 9.28 2 19.5C2 32.5 20 51 20 51Z" className="fill-brand stroke-white" strokeWidth="2.5" />
      <circle cx="20" cy="19.5" r="6.5" className="fill-white" />
    </svg>
  );
}

/**
 * Grayscale Google map centred on the office. The filter also greys Google's own pin, which we
 * can't style inside the frame, so a brand-coloured pin is drawn over it at the map's centre.
 * `offsetLeft` extends the map past the left edge (used beside the floating office card), which
 * moves the centre left by half that amount.
 */
function OfficeMap({ office, className, offsetLeft }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <iframe
        key={office.id}
        title={fill(copy.mapTitle, { office: office.shortName })}
        src={mapEmbedSrc(office)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-y-0 right-0 h-full border-0 grayscale"
        style={{ width: offsetLeft ? `calc(100% + ${offsetLeft})` : "100%" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2"
        style={{ left: offsetLeft ? `calc(50% - ${offsetLeft} / 2)` : "50%" }}
      >
        <MapPinMarker className="left-0 top-0" />
      </span>
    </div>
  );
}

/**
 * One office in the list: photo, name, address and phone. Selecting it moves the map. Below
 * 1024px, where there is no side map, the selected card also shows its map, hours and actions.
 */
function OfficeCard({ office, selected, onSelect, onPickExpert }) {
  return (
    <li id={office.id} className={`${CARD} relative scroll-mt-32 overflow-hidden transition-shadow ${selected ? "ring-2 ring-brand" : "hover:shadow-lg"}`}>
      <div className="relative flex gap-4 p-3">
        {/* One button stretched over the whole card, so a click anywhere selects the office. */}
        <button
          type="button"
          aria-pressed={selected}
          aria-label={fill(copy.selectLabel, { office: office.shortName })}
          onClick={onSelect}
          className="absolute inset-0 rounded-2xl"
        />
        <OfficePhoto office={office} alt="" className="h-24 w-28 flex-shrink-0 rounded-xl object-cover text-xs sm:w-36" />
        <div className="min-w-0 flex-1 py-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-lg font-semibold text-gray-900">{office.shortName}</span>
            {office.isHeadOffice && (
              <span className="rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand">
                {copy.headOfficeLabel}
              </span>
            )}
          </p>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            {office.display.address}
          </p>
          <CopyText
            value={officePhone(office)}
            className="mt-1 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-brand"
          >
            <Phone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-gray-400" />
            {officePhone(office)}
          </CopyText>
        </div>
      </div>
      {selected && (
        <div className="space-y-4 border-t border-gray-100 p-4 lg:hidden">
          <OfficeMap office={office} className="relative h-56 w-full rounded-xl" />
          <Hours office={office} />
          <Actions office={office} onPickExpert={onPickExpert} />
        </div>
      )}
    </li>
  );
}

/**
 * Offices: a list grouped by city on the left and, from 1024px, a grayscale Google map on the
 * right centred on the selected office, with a card showing its photo, hours and actions.
 */
export default function Offices({ className = "bg-gray-50" }) {
  // A link like /contact#vancouver-kingsway opens with that office selected.
  const { hash, key } = useLocation();
  const hashId = offices.find((office) => `#${office.id}` === hash)?.id;
  const [activeId, setActiveId] = useState(hashId ?? offices[0].id);
  const [pickerOpen, setPickerOpen] = useState(false);
  useEffect(() => {
    if (hashId) setActiveId(hashId);
  }, [hashId, key]);
  const active = offices.find((office) => office.id === activeId);

  return (
    <section id="offices" className={`scroll-mt-24 ${className} px-4 py-16 md:px-8 md:py-24`}>
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
                      onPickExpert={() => setPickerOpen(true)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 h-[calc(100vh-9rem)] max-h-[760px] min-h-[560px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md">
              {/* The map runs 22rem past the left edge, so the office pin centres in the open area left of the card. */}
              <OfficeMap office={active} offsetLeft="22rem" className="absolute inset-0" />
              <div key={active.id} className={`${CARD} animate-fadeIn absolute right-4 top-4 w-80 overflow-hidden`}>
                <OfficePhoto office={active} alt={photoAlt(active)} className="h-40 w-full object-cover" />
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{active.shortName}</p>
                    <p className="text-sm text-gray-600">{active.display.address}</p>
                  </div>
                  <Hours office={active} />
                  <Actions office={active} onPickExpert={() => setPickerOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExpertPickerDialog open={pickerOpen} onOpenChange={setPickerOpen} />
    </section>
  );
}
