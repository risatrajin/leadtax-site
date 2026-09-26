import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import nav from "../../content/nav.json";
import site from "../../content/site.json";
import Button from "../ui/Button.jsx";

const DESKTOP_LINK = "text-gray-700 hover:text-brand transition-colors font-bold";
const DROPDOWN_PANEL =
  "bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fadeIn";
const DROPDOWN_ITEM =
  "block px-6 py-3 text-gray-700 hover:bg-brand-subtle hover:text-brand transition-colors";
const MOBILE_LINK = "text-gray-700 hover:text-brand transition-colors py-2 font-bold";
const MOBILE_SUBLINK = "text-gray-700 hover:text-brand transition-colors py-1";
const MOBILE_ACCOUNT_ITEM = "text-gray-700 hover:text-brand transition-colors py-2 px-2";

/** Button styles for the two account menus, desktop and mobile. */
const ACCOUNT_BUTTONS = {
  signIn: {
    desktop: { variant: "ghost", className: "font-bold flex items-center gap-1" },
    mobile: { variant: "outlineMuted", className: "w-full font-bold flex items-center justify-center gap-1" },
  },
  getStarted: {
    desktop: { variant: "primary", className: "flex items-center gap-1" },
    mobile: { variant: "primary", className: "w-full font-bold flex items-center justify-center gap-1" },
  },
};

const appHref = (item) => site.apps[item.app][item.target];

function Badge({ children, className }) {
  return <span className={`text-xs bg-brand text-white px-2 py-0.5 rounded-full${className ? ` ${className}` : ""}`}>{children}</span>;
}

/**
 * Site header. Desktop menus open on hover; on small screens the same menus
 * become tap-to-expand groups. Desktop and mobile share each menu's open state.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({});
  const setMenu = (id, value) => setOpen((prev) => ({ ...prev, [id]: value }));
  const toggleMenu = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={site.logo} alt={site.name} className="h-8 md:h-10" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {nav.header.map((entry) => {
              if (entry.link) {
                const link = nav.links[entry.link];
                return (
                  <Link key={entry.link} to={link.to} className={DESKTOP_LINK}>
                    {link.label}
                  </Link>
                );
              }
              return (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setMenu(entry.label, true)}
                  onMouseLeave={() => setMenu(entry.label, false)}
                >
                  <button className="text-gray-700 hover:text-brand transition-colors flex items-center gap-1 font-bold">
                    {entry.label} <ChevronDown className="w-4 h-4" />
                  </button>
                  {open[entry.label] && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className={`${entry.menuWidth} ${DROPDOWN_PANEL}`}>
                        {entry.items.map((id) => {
                          const link = nav.links[id];
                          return (
                            <Link key={id} to={link.to} className={DROPDOWN_ITEM}>
                              {link.label}
                              {link.badge && (
                                <>
                                  {" "}
                                  <Badge className="ml-2">{link.badge}</Badge>
                                </>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {nav.accountMenus.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => setMenu(menu.id, true)}
                onMouseLeave={() => setMenu(menu.id, false)}
              >
                <Button size="sm" {...ACCOUNT_BUTTONS[menu.id].desktop}>
                  {menu.label} <ChevronDown className="w-4 h-4" />
                </Button>
                {open[menu.id] && (
                  <div className="absolute top-full right-0 pt-2">
                    <div className={`w-56 ${DROPDOWN_PANEL}`}>
                      {menu.items.map((item) => (
                        <a
                          key={item.label}
                          href={appHref(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={DROPDOWN_ITEM}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              {nav.header.map((entry) => {
                if (entry.link) {
                  const link = nav.links[entry.link];
                  return (
                    <Link key={entry.link} to={link.to} onClick={closeMobile} className={MOBILE_LINK}>
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <div key={entry.label} className="py-2">
                    <button
                      onClick={() => toggleMenu(entry.label)}
                      className="text-gray-900 font-bold mb-2 flex items-center justify-between w-full"
                    >
                      {entry.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${open[entry.label] ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open[entry.label] && (
                      <div className="flex flex-col gap-2 pl-4">
                        {entry.items.map((id) => {
                          const link = nav.links[id];
                          return (
                            <Link
                              key={id}
                              to={link.to}
                              onClick={closeMobile}
                              className={link.badge ? `${MOBILE_SUBLINK} flex items-center gap-2` : MOBILE_SUBLINK}
                            >
                              {link.label}
                              {link.badge && (
                                <>
                                  {" "}
                                  <Badge>{link.badge}</Badge>
                                </>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {nav.accountMenus.map((menu) => (
                  <div key={menu.id}>
                    <Button size="md" onClick={() => toggleMenu(menu.id)} {...ACCOUNT_BUTTONS[menu.id].mobile}>
                      {menu.label}{" "}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${open[menu.id] ? "rotate-180" : ""}`}
                      />
                    </Button>
                    {open[menu.id] && (
                      <div className="flex flex-col gap-1 mt-2 pl-4">
                        {menu.items.map((item) => (
                          <a
                            key={item.label}
                            href={appHref(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={MOBILE_ACCOUNT_ITEM}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
