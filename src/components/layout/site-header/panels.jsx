import nav from "../../../content/nav.json";
import { offices, officePhone } from "../../../lib/offices.js";
import { fill } from "../../../lib/template.js";
import Button from "../../ui/Button.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

export const linkById = (id) => {
  const link = nav.links[id];
  if (!link) throw new Error(`nav.json: unknown link "${id}"`);
  return link;
};

const COLUMN_TITLE = "text-xs font-semibold uppercase tracking-wider text-gray-500";
const PANEL_LINK = "block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-brand-subtle/40 hover:text-brand";

function FeatureCard({ feature }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <img
        src={feature.image}
        alt={feature.imageAlt}
        className="h-40 w-full object-cover"
        style={{ objectPosition: feature.imagePosition }}
      />
      <div className="p-5">
        <p className="text-lg font-semibold text-gray-900">{feature.title}</p>
        {feature.text && <p className="mt-1 text-sm text-gray-600">{feature.text}</p>}
        <Button to={feature.cta.to} size="md" className="mt-4 inline-block text-sm font-semibold">
          {feature.cta.label}
        </Button>
      </div>
    </div>
  );
}

function OfficeLinks({ item, onNavigate }) {
  return (
    <ul className="grid gap-1 sm:grid-cols-2">
      {offices.map((office) => (
        <li key={office.id}>
          <SmartLink to={fill(item.officeHref, { id: office.id })} onClick={onNavigate} className={`${PANEL_LINK} py-3`}>
            <span className="block font-semibold text-gray-900">{office.shortName}</span>
            <span className="block text-sm text-gray-600">{office.display.address}</span>
            <span className="block text-sm text-brand">{officePhone(office)}</span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

/** Full-width panel under the header for "Tax services" and "Locations". */
export function MegaPanel({ item, id, onNavigate }) {
  return (
    <div id={id} className="absolute inset-x-0 top-full border-t border-gray-200 bg-white shadow-xl animate-fadeIn">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 py-8">
        {item.offices ? (
          <div className="col-span-8">
            <p className={`${COLUMN_TITLE} mb-3 px-3`}>{item.label}</p>
            <OfficeLinks item={item} onNavigate={onNavigate} />
          </div>
        ) : (
          item.columns.map((column) => (
            <div key={column.title} className="col-span-4">
              <p className={`${COLUMN_TITLE} mb-3 px-3`}>{column.title}</p>
              <ul>
                {column.items.map((linkId) => {
                  const link = linkById(linkId);
                  return (
                    <li key={linkId}>
                      <SmartLink to={link.to} href={link.href} onClick={onNavigate} className={PANEL_LINK}>
                        {link.label}
                      </SmartLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
        <div className="col-span-4">
          <FeatureCard feature={item.feature} />
        </div>
      </div>
    </div>
  );
}

/** Small dropdown for "Resources", "About" and "Client login". */
export function DropdownPanel({ id, links, align = "left", onNavigate }) {
  return (
    <div id={id} className={`absolute top-full pt-2 ${align === "right" ? "right-0" : "left-0"}`}>
      <ul className="w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg animate-fadeIn">
        {links.map((link) => (
          <li key={link.label}>
            <SmartLink
              to={link.to}
              href={link.href}
              onClick={onNavigate}
              className="block px-5 py-2.5 text-gray-700 transition-colors hover:bg-brand-subtle hover:text-brand"
            >
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Client login items resolved to hrefs. */
export const clientLoginLinks = nav.header.clientLogin.items.map((item) => ({
  label: item.label,
  href: `app:${item.app}.${item.target}`,
}));
