import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import nav from "../../content/nav.json";
import site from "../../content/site.json";
import { tollFreeDashed } from "../../lib/phone.js";
import Button from "../ui/Button.jsx";
import SmartLink from "../ui/SmartLink.jsx";
import MobileMenu from "./site-header/MobileMenu.jsx";
import { DropdownPanel, MegaPanel, clientLoginLinks, enabledLinks, isEnabled, linkById } from "./site-header/panels.jsx";
import useDesktopMenus from "./site-header/useDesktopMenus.js";

const { header } = nav;
const TRIGGER =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[14px] font-semibold transition-colors hover:text-brand xl:px-2.5 xl:text-[15px]";

/**
 * The one header used on every page: a small utility bar (client login, phone on
 * smaller desktops) and the main row with logo, menus, phone and booking button.
 */
export default function SiteHeader() {
  const containerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { openId, close, itemProps, triggerProps, onBlur } = useDesktopMenus(containerRef);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const trigger = (id, label, panelId) => (
    <button {...triggerProps(id, panelId)} className={`${TRIGGER} ${openId === id ? "text-brand" : "text-gray-700"}`}>
      {label}
      <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${openId === id ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <div ref={containerRef} onBlur={onBlur} className="contents">
      <div className="relative z-[60] hidden border-b border-gray-200 bg-gray-50 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-6 px-8 text-sm text-gray-600">
          <a href={`tel:${tollFreeDashed}`} className="hover:text-brand xl:hidden">
            {tollFreeDashed}
          </a>
          <div className="relative" {...itemProps("client-login")}>
            <button
              {...triggerProps("client-login", "site-menu-client-login")}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand"
            >
              {header.clientLogin.label}
              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
            {openId === "client-login" && (
              <DropdownPanel id="site-menu-client-login" links={clientLoginLinks} align="right" onNavigate={close} />
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="relative">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8 xl:gap-5">
            <Link to="/" aria-label={header.homeLabel} className="flex-shrink-0">
              <img src={site.logo} alt={site.name} className="h-8 md:h-10 lg:h-8 xl:h-10" />
            </Link>

            <nav aria-label={header.navLabel} className="hidden lg:block">
              <ul className="flex items-center xl:gap-1">
                {header.items.map((item) => {
                  if (item.type === "link") {
                    const link = linkById(item.link);
                    if (!isEnabled(link)) return null;
                    return (
                      <li key={item.link}>
                        <SmartLink to={link.to} href={link.href} className={`${TRIGGER} text-gray-700`}>
                          {link.label}
                        </SmartLink>
                      </li>
                    );
                  }
                  const panelId = `site-menu-${item.id}`;
                  const isMega = item.type === "mega";
                  return (
                    <li key={item.id} className={isMega ? "" : "relative"} {...itemProps(item.id)}>
                      {trigger(item.id, item.label, panelId)}
                      {openId === item.id &&
                        (isMega ? (
                          <MegaPanel item={item} id={panelId} onNavigate={close} />
                        ) : (
                          <DropdownPanel id={panelId} links={enabledLinks(item.items)} rich={item.rich} onNavigate={close} />
                        ))}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-4 lg:flex xl:gap-5">
              <a href={`tel:${tollFreeDashed}`} className="hidden whitespace-nowrap font-semibold text-gray-700 hover:text-brand xl:inline">
                {tollFreeDashed}
              </a>
              <Button to={header.cta.to} size="header" className="whitespace-nowrap">
                {header.cta.label}
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-menu"
              aria-label={mobileOpen ? header.menuCloseLabel : header.menuOpenLabel}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
            >
              {mobileOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && <MobileMenu id="site-mobile-menu" onClose={closeMobile} returnFocusTo={menuButtonRef} />}
      </header>
    </div>
  );
}
