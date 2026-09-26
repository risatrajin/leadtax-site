import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import content from "../../content/home-v2.json";
import { tollFreeDashed } from "../../lib/phone.js";
import PillButton from "../editorial/PillButton.jsx";
import TextLink from "../editorial/TextLink.jsx";

const { header } = content;
const NAV_LINK = "text-[15px] text-ed-muted transition-colors hover:text-ed-ink";

/** Header for the editorial homepage. The nav collapses into a menu below 1280px. */
export default function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="border-b border-ed-line bg-ed-page">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ed-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {header.skipLabel}
      </a>
      <div className="ed-container flex h-[76px] items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link to={header.homeTo} aria-label={header.homeLabel} className="text-[22px] font-semibold tracking-[-0.03em]">
            {header.wordmark}
          </Link>
          <span aria-hidden="true" className="hidden h-6 w-px bg-ed-line xl:block" />
          <nav aria-label={header.navLabel} className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {header.links.map((link) => (
                <li key={link.label}>
                  <TextLink to={link.to} href={link.href} className={NAV_LINK}>
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-6 xl:flex">
          <a href={`tel:${tollFreeDashed}`} className={NAV_LINK}>
            {tollFreeDashed}
          </a>
          <PillButton href={header.cta.href} variant="outline" size="sm">
            {header.cta.label}
          </PillButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="home-v2-menu"
          aria-label={menuOpen ? header.menuCloseLabel : header.menuOpenLabel}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ed-outline xl:hidden"
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div id="home-v2-menu" className="border-t border-ed-line xl:hidden">
          <nav aria-label={header.navLabel} className="ed-container py-6">
            <ul className="flex flex-col gap-4">
              {header.links.map((link) => (
                <li key={link.label}>
                  <TextLink to={link.to} href={link.href} onClick={close} className="text-lg text-ed-ink">
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 border-t border-ed-line pt-6 sm:flex-row sm:items-center">
              <PillButton href={header.cta.href} onClick={close}>
                {header.cta.label}
              </PillButton>
              <a href={`tel:${tollFreeDashed}`} className="text-ed-muted">
                {tollFreeDashed}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
