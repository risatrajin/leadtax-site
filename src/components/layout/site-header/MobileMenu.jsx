import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import nav from "../../../content/nav.json";
import { officesByCity, officePhone } from "../../../lib/offices.js";
import { tollFreeDashed } from "../../../lib/phone.js";
import { fill } from "../../../lib/template.js";
import Button from "../../ui/Button.jsx";
import SmartLink from "../../ui/SmartLink.jsx";
import { clientLoginLinks, linkById } from "./panels.jsx";

const ROW = "flex w-full items-center justify-between border-b border-gray-200 py-4 text-left text-lg font-semibold text-gray-900";
const SUBLINK = "block py-2 text-gray-700 hover:text-brand";

/** Groups shown as accordions: each header item plus Client login. */
function groupsFor() {
  const groups = nav.header.items.map((item) => {
    if (item.type === "link") return { id: item.link, link: linkById(item.link) };
    if (item.type === "dropdown") return { id: item.id, label: item.label, sections: [{ links: item.items.map(linkById) }] };
    if (item.offices) {
      return {
        id: item.id,
        label: item.label,
        sections: [
          {
            links: officesByCity.map((office) => ({
              label: office.shortName,
              detail: `${office.display.address} · ${officePhone(office)}`,
              to: fill(item.officeHref, { id: office.id }),
            })),
          },
          { links: [item.feature.cta] },
        ],
      };
    }
    return {
      id: item.id,
      label: item.label,
      sections: item.columns.map((column) => ({ title: column.title, links: column.items.map(linkById) })),
    };
  });
  groups.push({ id: "client-login", label: nav.header.clientLogin.label, sections: [{ links: clientLoginLinks }] });
  return groups;
}

/** Full-height panel below 1024px. Escape closes it and returns focus to the menu button. */
export default function MobileMenu({ id, onClose, returnFocusTo }) {
  const [openGroup, setOpenGroup] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        returnFocusTo.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector("a, button")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, returnFocusTo]);

  return (
    <div
      id={id}
      ref={panelRef}
      className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-white md:top-20 lg:hidden"
    >
      <nav aria-label={nav.header.navLabel} className="flex-1 overflow-y-auto px-4 md:px-8">
        <ul>
          {groupsFor().map((group) => {
            if (group.link) {
              return (
                <li key={group.id}>
                  <SmartLink to={group.link.to} href={group.link.href} onClick={onClose} className={ROW}>
                    {group.link.label}
                  </SmartLink>
                </li>
              );
            }
            const expanded = openGroup === group.id;
            const contentId = `${id}-${group.id}`;
            return (
              <li key={group.id}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={contentId}
                  onClick={() => setOpenGroup(expanded ? null : group.id)}
                  className={ROW}
                >
                  {group.label}
                  <ChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div id={contentId} hidden={!expanded} className="border-b border-gray-200 py-3">
                  {group.sections.map((section, index) => (
                    <div key={section.title ?? index} className={index > 0 ? "mt-3" : ""}>
                      {section.title && (
                        <p className="py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</p>
                      )}
                      <ul>
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <SmartLink to={link.to} href={link.href} onClick={onClose} className={SUBLINK}>
                              {link.label}
                              {link.detail && <span className="block text-sm text-gray-500">{link.detail}</span>}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col gap-3 border-t border-gray-200 bg-white p-4 md:px-8">
        <a href={`tel:${tollFreeDashed}`} className="text-center font-semibold text-gray-900">
          {tollFreeDashed}
        </a>
        <Button to={nav.header.cta.to} size="md" onClick={onClose} className="w-full">
          {nav.header.cta.label}
        </Button>
      </div>
    </div>
  );
}
