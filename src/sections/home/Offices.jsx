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

function photoAlt(office) {
  return fill(copy.entranceAlt, { office: office.shortName });
}

function Hours({ office }) {
  return (
    <dl aria-label={copy.hoursLabel} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
      {Object.entries(copy.hours).map(([key, label]) => (
        <div key={key} className="contents">
          <dt className="text-gray-500">{label}</dt>
          <dd className="text-gray-900">{office.hours[key]}</dd>
        </div>
      ))}
    </dl>
  );
}

function Actions({ office }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button href={bookingHref(office, bookingFallback.href)} size="md" className="flex-1 whitespace-nowrap text-center text-sm font-semibold">
        {copy.bookLabel}
      </Button>
      <Button
        href={directionsHref(office)}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="md"
        className="flex-1 whitespace-nowrap text-center text-sm font-semibold"
      >
        {copy.directionsLabel}
      </Button>
    </div>
  );
}

/**
 * One office in the list. The open office shows its address and phone; below 1024px it also
 * shows the photo, hours and actions inline, since the side panel is hidden there.
 */
function OfficeItem({ office, open, onOpen }) {
  const panelId = `office-panel-${office.id}`;
  return (
    <li className="relative border-b border-gray-200">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onOpen}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="flex flex-wrap items-center gap-3">
            <span
              className={`text-xl font-semibold transition-colors md:text-2xl ${open ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"}`}
            >
              {office.shortName}
            </span>
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
      <div id={panelId} hidden={!open} className="pb-6">
        <p className="flex items-start gap-2 text-gray-600">
          <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          {office.display.address}
        </p>
        <a href={officeTel(office)} className="mt-2 flex items-center gap-2 font-semibold text-gray-900 hover:text-brand">
          <Phone aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
          {officePhone(office)}
        </a>
        <div className="mt-5 space-y-5 lg:hidden">
          <OfficePhoto office={office} alt={photoAlt(office)} className="h-56 w-full rounded-xl object-cover sm:h-72" />
          <Hours office={office} />
          <Actions office={office} />
        </div>
      </div>
      {open && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
    </li>
  );
}

/**
 * Offices as an accordion grouped by city, with the open office's photo, hours and actions in a
 * panel on the right from 1024px. Only the open office shows its buttons.
 */
export default function Offices() {
  const [activeId, setActiveId] = useState(offices[0].id);
  const active = offices.find((office) => office.id === activeId);

  return (
    <section id="offices" className="scroll-mt-24 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="max-w-lg text-lg text-gray-600">{copy.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-5">
            {groups.map((group) => (
              <div key={group.city}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{group.city}</h3>
                <ul className="mt-1">
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
            <div key={active.id} className="animate-fadeIn sticky top-28 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
              <OfficePhoto office={active} alt={photoAlt(active)} className="h-80 w-full object-cover xl:h-[26rem]" />
              <div className="grid gap-6 p-6 xl:grid-cols-[1fr_auto] xl:items-end xl:p-8">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{copy.hoursLabel}</p>
                  <div className="mt-3">
                    <Hours office={active} />
                  </div>
                </div>
                <Actions office={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
