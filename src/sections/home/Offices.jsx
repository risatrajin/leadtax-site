import { useState } from "react";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import content from "../../content/home.json";
import { bookingHref, directionsHref, officeCities, officePhone, officeTel, offices } from "../../lib/offices.js";
import { OfficePhoto } from "../../lib/officePhoto.jsx";
import { fill } from "../../lib/template.js";
import Button from "../../components/ui/Button.jsx";

const { offices: copy, bookingFallback } = content;

/** Offices grouped by city, in office order, so several offices in one city sit under one heading. */
const groups = officeCities.map((city) => ({
  city,
  offices: offices.filter((office) => office.schema.addressLocality === city),
}));

const photoAlt = (office) => fill(copy.entranceAlt, { office: office.shortName });
const officeCount = (count) => (count === 1 ? copy.officeCountOne : fill(copy.officeCountOther, { count }));

const ACTION_CLASSES = "whitespace-nowrap";

function Hours({ office }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{copy.hoursLabel}</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
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
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button href={bookingHref(office, bookingFallback.href)} size="md" className={ACTION_CLASSES}>
        {copy.bookLabel}
      </Button>
      <Button
        href={directionsHref(office)}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="md"
        className={ACTION_CLASSES}
      >
        {copy.directionsLabel}
      </Button>
    </div>
  );
}

/**
 * One office in the list. The open office becomes a white card showing its address and phone;
 * below 1024px it also shows the photo, hours and actions, since the side panel is hidden there.
 */
function OfficeItem({ office, open, onOpen }) {
  const panelId = `office-panel-${office.id}`;
  return (
    <li
      className={`relative rounded-xl transition-colors ${open ? "bg-white shadow-sm ring-1 ring-gray-200" : "hover:bg-white/70"}`}
    >
      {open && <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-full bg-brand" />}
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onOpen}
          className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left"
        >
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={`text-lg font-semibold ${open ? "text-gray-900" : "text-gray-600"}`}>{office.shortName}</span>
            {office.isHeadOffice && (
              <span className="rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand">
                {copy.headOfficeLabel}
              </span>
            )}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 flex-shrink-0 transition-transform ${open ? "rotate-180 text-brand" : "text-gray-400"}`}
          />
        </button>
      </h4>
      <div id={panelId} hidden={!open} className="px-5 pb-5">
        <p className="flex items-start gap-2.5 text-gray-600">
          <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          {office.display.address}
        </p>
        <a href={officeTel(office)} className="mt-2 flex items-center gap-2.5 font-semibold text-gray-900 hover:text-brand">
          <Phone aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
          {officePhone(office)}
        </a>
        <div className="mt-5 space-y-5 lg:hidden">
          <OfficePhoto office={office} alt={photoAlt(office)} className="h-56 w-full rounded-lg object-cover sm:h-72" />
          <Hours office={office} />
          <Actions office={office} />
        </div>
      </div>
    </li>
  );
}

/**
 * Offices as an accordion grouped by city. From 1024px the open office's photo, hours and actions
 * sit in a panel on the right that matches the list's height. Only the open office shows buttons.
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

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-5">
            {groups.map((group) => (
              <div key={group.city}>
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand">{group.city}</h3>
                  <span className="text-xs text-gray-500">{officeCount(group.offices.length)}</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {group.offices.map((office) => (
                    <OfficeItem
                      key={office.id}
                      office={office}
                      open={office.id === activeId}
                      onOpen={() => setActiveId(office.id)}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              <div key={active.id} className="animate-fadeIn relative min-h-72 flex-1">
                <OfficePhoto office={active} alt={photoAlt(active)} className="absolute inset-0 h-full w-full object-cover" />
                <p className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow">
                  {active.shortName}
                  <span className="font-normal text-gray-500"> · {active.schema.addressLocality}</span>
                </p>
              </div>
              <div className="flex flex-col gap-5 border-t border-gray-100 p-6 xl:flex-row xl:items-end xl:justify-between xl:gap-6">
                <Hours office={active} />
                <Actions office={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
