import { ChevronRight } from "lucide-react";
import nav from "../../../content/nav.json";
import { officesByCity, officePhone } from "../../../lib/offices.js";
import { fill } from "../../../lib/template.js";
import { getIcon } from "../../../lib/icons.js";
import Button from "../../ui/Button.jsx";
import SmartLink from "../../ui/SmartLink.jsx";

export const linkById = (id) => {
  const link = nav.links[id];
  if (!link) throw new Error(`nav.json: unknown link "${id}"`);
  return link;
};

/** A link is shown only when its target page exists; entries with "enabled": false are kept but hidden. */
export const isEnabled = (link) => link.enabled !== false;

/** The enabled links for a list of nav.json ids. */
export const enabledLinks = (ids) => ids.map(linkById).filter(isEnabled);

/**
 * Menu or footer columns with disabled links removed. Empty columns are dropped, and a column
 * left with a single link is merged into the start of the next column (or the end of the
 * previous one) instead of showing a one-item column.
 */
export function visibleColumns(columns) {
  const result = columns
    .map((column) => ({ title: column.title, links: enabledLinks(column.items) }))
    .filter((column) => column.links.length > 0);
  for (let index = 0; index < result.length && result.length > 1; index += 1) {
    if (result[index].links.length !== 1) continue;
    const [single] = result.splice(index, 1);
    const target = result[index] ?? result[index - 1];
    if (result[index]) target.links.unshift(...single.links);
    else target.links.push(...single.links);
    index -= 1;
  }
  return result;
}

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
        <Button to={feature.cta.to} size="sm" className="mt-4">
          {feature.cta.label}
        </Button>
      </div>
    </div>
  );
}

function OfficeLinks({ item, onNavigate }) {
  return (
    <ul className="grid gap-1 sm:grid-cols-2">
      {officesByCity.map((office) => (
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

/** Mega-menu link: icon, title and a one-line description (plain title when there is none). */
function MenuLink({ link, onNavigate }) {
  const Icon = link.icon ? getIcon(link.icon) : null;
  return (
    <SmartLink
      to={link.to}
      href={link.href}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50"
    >
      {Icon && (
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block font-semibold text-gray-900 group-hover:text-brand">{link.label}</span>
        {link.description && <span className="mt-0.5 block text-sm leading-snug text-gray-500">{link.description}</span>}
      </span>
    </SmartLink>
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
          visibleColumns(item.columns).map((column, _index, all) => (
            <div key={column.title} className={all.length === 1 ? "col-span-8" : "col-span-4"}>
              <p className={`${COLUMN_TITLE} mb-3 px-3`}>{column.title}</p>
              <ul className={all.length === 1 ? "grid grid-cols-2 gap-1" : "space-y-1"}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <MenuLink link={link} onNavigate={onNavigate} />
                  </li>
                ))}
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

/** Small dropdown for "Resources", "About" and "Client login". `rich` shows icon tiles, text and arrows. */
export function DropdownPanel({ id, links, align = "left", rich, onNavigate }) {
  if (rich) {
    return (
      <div id={id} className={`absolute top-full pt-2 ${align === "right" ? "right-0" : "left-0"}`}>
        <ul className="w-[26rem] space-y-1 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl animate-fadeIn">
          {links.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <li key={link.label}>
                <SmartLink
                  to={link.to}
                  href={link.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                >
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="h-7 w-7" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold text-gray-900">{link.label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-gray-500">{link.description}</span>
                  </span>
                  <ChevronRight aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
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
