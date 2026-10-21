import { useRef, useState } from "react";
import { cx } from "../../lib/cx.js";

/**
 * The LeadTax mark in the middle of soft pastel rings, with tool logos on an outer ring that turns
 * slowly and endlessly (each logo turns back so it stays upright). Hovering or focusing a logo pauses
 * the ring and slides in a small card beside it with the tool's name and what it is, on whichever
 * side has room. It holds still for people who prefer reduced motion.
 * `items` are { label, text, node } where node is the logo; `hint` shows under the ring on phones
 * until a logo is tapped.
 */
export default function LogoOrbit({ items, mark, markAlt, hint }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);
  const [side, setSide] = useState("right");

  // Open the card on the side facing away from the centre, so it never covers the middle.
  const open = (index, element) => {
    const root = rootRef.current.getBoundingClientRect();
    const tile = element.getBoundingClientRect();
    setSide(tile.left + tile.width / 2 >= root.left + root.width / 2 ? "right" : "left");
    setActive(index);
  };

  const current = active !== null ? items[active] : null;
  return (
    <>
    <div ref={rootRef} className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {/* Glow and soft rings behind the centre. */}
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-[conic-gradient(from_90deg,#fde68a,#bfdbfe,#c4b5fd,#fbcfe8,#fed7aa,#fde68a)] opacity-60 blur-2xl" />
      <div aria-hidden="true" className="absolute inset-[22%] rounded-full bg-white/50 ring-1 ring-white/70 backdrop-blur-sm" />
      <div aria-hidden="true" className="absolute inset-[31%] rounded-full bg-white/40 ring-1 ring-white/70" />
      {/* Outer ring line. */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-gray-200" />

      {/* Centre tile with the LeadTax mark. */}
      <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] bg-white shadow-2xl ring-8 ring-white/60">
        <img src={mark} alt={markAlt} className="h-[62%] w-[62%] object-contain" />
      </div>

      {/* The turning ring of logos. */}
      <ul className={cx("orbit-spin absolute inset-[8%]", active !== null && "orbit-paused")}>
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
          const isOpen = active === index;
          return (
            <li
              key={item.label}
              className={cx("absolute h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2", isOpen && "z-30")}
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className={cx("orbit-counter relative block h-full w-full", active !== null && "orbit-paused")}>
                <span
                  tabIndex={0}
                  aria-describedby={`orbit-info-${index}`}
                  onMouseEnter={(event) => open(index, event.currentTarget)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={(event) => open(index, event.currentTarget)}
                  onBlur={() => setActive(null)}
                  className={cx(
                    "flex h-full w-full cursor-default items-center justify-center rounded-[28%] bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    isOpen && "scale-110",
                  )}
                >
                  {item.node}
                  <span className="sr-only">{item.label}</span>
                </span>

                {/* Info card that slides out beside the logo. */}
                <span
                  id={`orbit-info-${index}`}
                  role="tooltip"
                  className={cx(
                    "pointer-events-none absolute top-1/2 hidden w-48 sm:block -translate-y-1/2 rounded-2xl bg-white p-4 text-left shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-out",
                    side === "right" ? "left-full ml-3" : "right-full mr-3",
                    isOpen
                      ? "visible translate-x-0 opacity-100"
                      : cx("invisible opacity-0", side === "right" ? "-translate-x-2" : "translate-x-2"),
                  )}
                >
                  <span className="block font-semibold text-gray-900">{item.label}</span>
                  {item.text && <span className="mt-1 block text-sm text-gray-600">{item.text}</span>}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
    {/* Phones: no room beside the logos, so the info shows under the ring instead. */}
    <p aria-hidden="true" className="mx-auto mt-4 min-h-16 max-w-xs text-center sm:hidden">
      {current ? (
        <span key={current.label} className="situation-in block">
          <span className="block font-semibold text-gray-900">{current.label}</span>
          <span className="mt-1 block text-sm text-gray-600">{current.text}</span>
        </span>
      ) : (
        <span className="text-sm text-gray-500">{hint}</span>
      )}
    </p>
    </>
  );
}
