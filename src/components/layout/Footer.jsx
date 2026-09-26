import { Link } from "react-router";
import nav from "../../content/nav.json";
import site from "../../content/site.json";
import { getIcon } from "../../lib/icons.js";
import { tollFreeDashed } from "../../lib/phone.js";

const COLUMN_TITLE = "text-white text-sm tracking-wider uppercase";
const FOOTER_LINK = "text-white/70 hover:text-white transition-colors text-sm";

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={site.logo} alt={site.name} className="h-8" />
            </Link>
            <p className="text-white/70 text-sm">{site.footer.tagline}</p>
            <div className="flex items-center gap-3 pt-2">
              {site.social.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {nav.footer.map((column) => (
            <div key={column.title}>
              <h3 className={`${COLUMN_TITLE} mb-4`}>{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((id) => {
                  const link = nav.links[id];
                  return (
                    <li key={id}>
                      <Link to={link.to} className={FOOTER_LINK}>
                        {link.footerLabel ?? link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {column.appendContact && (
                <div className="mt-6">
                  <h3 className={`${COLUMN_TITLE} mb-3`}>{nav.footerContactTitle}</h3>
                  <p className="text-white/70 text-sm">{site.contact.email}</p>
                  <a
                    href={`tel:${tollFreeDashed}`}
                    className="text-white/70 text-sm mt-1 block hover:text-white transition-colors"
                  >
                    {tollFreeDashed}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()}
            {` ${site.footer.copyright}`}
          </p>
          <p className="text-white/50 text-xs">{site.footer.compliance}</p>
        </div>
      </div>
    </footer>
  );
}
