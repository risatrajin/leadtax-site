import { Link } from "react-router";
import nav from "../../content/nav.json";
import site from "../../content/site.json";
import { getIcon } from "../../lib/icons.js";
import { officeCities, officesByCity, officePhone, officeTel } from "../../lib/offices.js";
import { tollFreeDashed } from "../../lib/phone.js";
import { fill } from "../../lib/template.js";
import SmartLink from "../ui/SmartLink.jsx";
import { linkById } from "./site-header/panels.jsx";

const { footer, localLinks } = nav;
const COLUMN_TITLE = "mb-4 text-sm uppercase tracking-wider text-white";
const LINK = "text-sm text-white/70 transition-colors hover:text-white";
// Extra cities whose name is still a placeholder are left out, so "[TBD: city]" never shows.
const cities = [
  ...officeCities,
  ...localLinks.extraCities.filter((city) => !city._placeholders?.includes("name")).map((city) => city.name),
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h2 className={COLUMN_TITLE}>{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <SmartLink to={link.to} href={link.href} className={LINK}>
              {link.footerLabel ?? link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The one footer used on every page. */
export default function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-4">
            <Link to="/" className="inline-block" aria-label={nav.header.homeLabel}>
              {/* White version via CSS filter until the client supplies a reversed logo file. */}
              <img src={site.logo} alt={site.name} className="h-8 brightness-0 invert" />
            </Link>
            <p className="max-w-sm text-sm text-white/70">{site.footer.tagline}</p>
            <div className="space-y-1 text-sm">
              <a href={`tel:${tollFreeDashed}`} className="block text-white hover:underline">
                {tollFreeDashed}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block text-white/70 hover:text-white">
                {site.contact.email}
              </a>
            </div>
            <ul aria-label={footer.socialLabel} className="flex items-center gap-3 pt-2">
              {site.social.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {footer.columns.map((column) => (
              <LinkColumn key={column.title} title={column.title} links={column.items.map(linkById)} />
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-10">
          <h2 className={COLUMN_TITLE}>{footer.officesTitle}</h2>
          <ul className="grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-5">
            {officesByCity.map((office) => (
              <li key={office.id}>
                <Link to={`/contact#${office.id}`} className="font-semibold text-white hover:underline">
                  {office.shortName}
                </Link>
                <p className="text-white/70">{office.display.address}</p>
                <a href={officeTel(office)} className={LINK}>
                  {officePhone(office)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="text-lg font-semibold text-white">{localLinks.title}</h2>
          {cities.map((city) => (
            <div key={city}>
              <h3 className="mb-3 text-sm font-semibold text-white">{city}</h3>
              <ul className="space-y-2">
                {localLinks.services.map((service) => (
                  <li key={service.label}>
                    <SmartLink href={service.href} className={LINK}>
                      {fill(service.label, { city })}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} {footer.legalName}
            </p>
            <p className="text-xs text-white/50">{site.footer.compliance}</p>
          </div>
          <ul className="flex gap-6">
            {footer.legal.map((id) => {
              const link = linkById(id);
              return (
                <li key={id}>
                  <SmartLink to={link.to} href={link.href} className={LINK}>
                    {link.label}
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
