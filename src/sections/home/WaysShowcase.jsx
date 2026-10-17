import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileText, Mic, Video } from "lucide-react";
import inPerson from "../../content/pages/file-in-person.json";
import remotely from "../../content/pages/file-remotely.json";
import dropOff from "../../content/pages/drop-off.json";
import fileOnline from "../../content/pages/file-online.json";
import pricing from "../../content/pricing.json";
import { offices, officePhone } from "../../lib/offices.js";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";
import SmartLink from "../../components/ui/SmartLink.jsx";
import { SectionTitle } from "../../components/ui/ServiceBlocks.jsx";
import { linkById } from "../../components/layout/site-header/panels.jsx";

/** How long each tab stays open before the next opens on its own (wide screens only). */
const STEP_MS = 7000;

/** Skeleton lines standing in for text inside the mock cards. */
function Lines({ widths }) {
  return widths.map((width) => (
    <div key={width} className="flex items-center gap-3">
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand">
        <Check className="h-3 w-3" />
      </span>
      <span className="h-2.5 rounded-full bg-gray-100" style={{ width: `${width}%` }} />
    </div>
  ));
}

function InPersonMock() {
  const office = offices[0];
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
      <img src={office.photo} alt="" className="h-36 w-full rounded-2xl object-cover" />
      <p className="mt-4 text-lg font-semibold text-gray-900">{office.shortName}</p>
      <p className="text-sm text-gray-600">{office.display.address}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{officePhone(office)}</p>
      <div className="mt-4 rounded-full bg-brand py-2.5 text-center text-sm font-semibold text-white">{linkById("fileInPerson").label}</div>
    </div>
  );
}

function RemoteMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
      <div className="grid grid-cols-2 gap-3">
        {["LT", "You"].map((who) => (
          <div key={who} className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-brand shadow">{who}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-3">
        {[Mic, Video].map((Icon, index) => (
          <span key={index} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Icon className="h-5 w-5" />
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
        <Lines widths={[90, 72, 58]} />
      </div>
    </div>
  );
}

function DropOffMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg">
          <FileText className="h-7 w-7" />
        </span>
        <div className="flex-1 space-y-2">
          <span className="block h-3 w-3/4 rounded-full bg-gray-200" />
          <span className="block h-2.5 w-1/2 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <Lines widths={[100, 84, 92, 66]} />
      </div>
    </div>
  );
}

function OnlineMock() {
  const tier = pricing.diyTiers[0];
  return (
    <div className="w-full max-w-xs rounded-2xl bg-white p-7 text-center shadow-2xl">
      <img src={tier.image} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
      <p className="mt-4 text-xl font-semibold text-gray-900">{tier.title}</p>
      <p className="mt-2 text-5xl font-bold text-gray-900">{tier.price}</p>
      <p className="text-sm text-gray-500">{pricing.perReturnLabel.trim()}</p>
      <p className="mt-4 text-sm text-gray-600">{tier.description}</p>
    </div>
  );
}

/**
 * The four ways to file. Each tab's title and text come from that page's hero, and its label,
 * icon and link from nav.json. The mock on the right is decorative; it uses the site's own data
 * (the head office, the Basic online package).
 */
const TABS = [
  { link: "fileInPerson", hero: inPerson.hero, Mock: InPersonMock, tint: "bg-brand-subtle/70", glow: "from-sky-200 via-blue-200 to-indigo-200" },
  { link: "fileRemotely", hero: remotely.hero, Mock: RemoteMock, tint: "bg-indigo-100", glow: "from-indigo-200 via-violet-200 to-sky-200" },
  { link: "dropOff", hero: dropOff.hero, Mock: DropOffMock, tint: "bg-sky-100", glow: "from-blue-200 via-sky-200 to-cyan-200" },
  { link: "fileOnline", hero: fileOnline.hero, Mock: OnlineMock, tint: "bg-cyan-100", glow: "from-cyan-200 via-sky-200 to-blue-200" },
];

/**
 * Ways to file as a tabbed showcase: pill tabs on a soft gradient that widens to the full screen
 * as it scrolls into view, and under them one large card
 * with the open tab's text on the left and a mock on the right. On wide screens the next tab opens
 * on its own; hovering or focusing the section pauses it.
 */
export default function WaysShowcase({ ways }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const stageRef = useRef(null);
  const backdropRef = useRef(null);

  // Widen the backdrop with scroll: inset and corner radius go from the column's to zero.
  useEffect(() => {
    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const width = window.innerWidth;
      const gutter = width >= 768 ? 32 : 16;
      const column = Math.min(1280, width - gutter * 2);
      const startInset = (width - column) / 2;
      const top = stage.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const progress = still ? 1 : Math.min(1, Math.max(0, (vh * 0.8 - top) / (vh * 0.6)));
      backdrop.style.setProperty("--inset", `${startInset * (1 - progress)}px`);
      backdrop.style.setProperty("--radius", `${40 * (1 - progress)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setAutoplay(Boolean(window.matchMedia?.("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches));
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return undefined;
    const timer = setTimeout(() => setActive((index) => (index + 1) % TABS.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [autoplay, paused, active]);

  const tab = TABS[active];
  const link = linkById(tab.link);
  const Icon = getIcon(link.icon);
  const item = ways.items.find((entry) => entry.link === tab.link);

  return (
    <section
      id="services"
      className="scroll-mt-28 bg-white pt-16 md:pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle eyebrow={ways.eyebrow} title={ways.title} text={ways.text} center />
      </div>

      {/* The gradient starts as a rounded panel the width of the column and widens to the full
          screen as the section scrolls into view; the content keeps its column. */}
      <div ref={stageRef} className="relative mt-12">
        <div
          ref={backdropRef}
          aria-hidden="true"
          className={cx("absolute inset-y-0 bg-gradient-to-br transition-colors duration-700", tab.glow)}
          style={{ left: "var(--inset, 0px)", right: "var(--inset, 0px)", borderRadius: "var(--radius, 0px)" }}
        />
        <div className="relative mx-auto w-[calc(100%-2rem)] max-w-7xl p-4 sm:p-8 md:w-[calc(100%-4rem)] lg:p-12">
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label={ways.eyebrow}
              className="grid w-full grid-cols-2 gap-1 rounded-[1.75rem] bg-white/50 p-1.5 shadow-sm ring-1 ring-white/70 backdrop-blur md:flex md:w-auto md:rounded-full"
            >
              {TABS.map((entry, index) => {
                const entryLink = linkById(entry.link);
                const TabIcon = getIcon(entryLink.icon);
                const selected = index === active;
                return (
                  <button
                    key={entry.link}
                    type="button"
                    role="tab"
                    id={`ways-tab-${index}`}
                    aria-selected={selected}
                    aria-controls="ways-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => {
                      const next = { ArrowRight: (index + 1) % TABS.length, ArrowLeft: (index + TABS.length - 1) % TABS.length }[event.key];
                      if (next === undefined) return;
                      event.preventDefault();
                      setActive(next);
                      event.currentTarget.parentElement.children[next].focus();
                    }}
                    className={cx(
                      "flex items-center gap-2.5 rounded-full px-3 py-2.5 text-left text-sm font-semibold leading-tight transition-all md:whitespace-nowrap md:px-5 md:text-base",
                      selected ? "bg-white text-brand shadow-md" : "text-gray-700 hover:bg-white/60 hover:text-gray-900",
                    )}
                  >
                    <span
                      className={cx(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                        selected ? "bg-brand text-white" : "bg-white/70 text-gray-500",
                      )}
                    >
                      <TabIcon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    {entryLink.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="ways-panel"
            role="tabpanel"
            aria-labelledby={`ways-tab-${active}`}
            className="mt-5 grid items-center gap-8 rounded-2xl bg-white p-6 shadow-xl sm:mt-7 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12"
          >
            <div key={tab.link} className="situation-in">
              <p className="inline-flex items-center gap-2 font-semibold text-gray-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                {link.label}
              </p>
              <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">{tab.hero.title}</h3>
              <p className="mt-5 text-lg text-gray-600">{tab.hero.text}</p>
              <SmartLink
                to={link.to}
                href={link.href}
                className="group mt-8 inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1 font-semibold text-gray-900 transition-colors hover:border-brand hover:text-brand"
              >
                {item.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </SmartLink>
            </div>
            <div aria-hidden="true" className={cx("flex min-h-[22rem] items-center justify-center rounded-xl p-6 sm:p-10", tab.tint)}>
              <div key={tab.link} className="situation-in flex w-full justify-center">
                <tab.Mock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
