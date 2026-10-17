import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CircleCheckBig, FolderOpen, MousePointerClick } from "lucide-react";
import { getIcon } from "../../lib/icons.js";
import { cx } from "../../lib/cx.js";
import Collapse from "../../components/ui/Collapse.jsx";

/** How long each step stays open before the next opens on its own (wide screens only). */
const STEP_MS = 7000;

/** One icon per step, in order: choose, prepare, complete. */
const STEP_ICONS = [MousePointerClick, FolderOpen, CircleCheckBig];

/** Step 1: the five services as chips, the first picked. */
function ChooseMock({ tiles }) {
  return (
    <div className="space-y-2.5">
      {tiles.map((tile, index) => {
        const Icon = getIcon(tile.icon);
        return (
          <div
            key={tile.link}
            className={cx(
              "flex items-center gap-3 rounded-xl border px-4 py-3",
              index === 0 ? "border-brand bg-brand-subtle/50 text-gray-900" : "border-gray-100 text-gray-500",
            )}
          >
            <Icon className={cx("h-5 w-5", index === 0 ? "text-brand" : "text-gray-400")} />
            <span className="flex-1 font-medium">{tile.title}</span>
            {index === 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                <Check className="h-3 w-3" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Step 2: a document checklist filling up. */
function PrepareMock() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg">
          <FolderOpen className="h-7 w-7" />
        </span>
        <div className="flex-1 space-y-2">
          <span className="block h-3 w-3/4 rounded-full bg-gray-200" />
          <span className="block h-2.5 w-1/2 rounded-full bg-gray-100" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {[100, 86, 92, 70, 60].map((width, index) => (
          <div key={width} className="flex items-center gap-3">
            <span
              className={cx(
                "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                index < 3 ? "bg-brand text-white" : "border border-gray-300",
              )}
            >
              {index < 3 && <Check className="h-3 w-3" />}
            </span>
            <span className="h-2.5 rounded-full bg-gray-100" style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 3: a finished review, ready to approve. */
function CompleteMock({ cta }) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-subtle text-brand">
        <CircleCheckBig className="h-9 w-9" />
      </span>
      <div className="mx-auto mt-6 max-w-[16rem] space-y-2.5">
        <span className="mx-auto block h-3 w-3/4 rounded-full bg-gray-200" />
        <span className="mx-auto block h-2.5 w-full rounded-full bg-gray-100" />
        <span className="mx-auto block h-2.5 w-5/6 rounded-full bg-gray-100" />
      </div>
      <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-subtle to-sky-100 py-3.5 font-semibold text-brand">{cta}</div>
    </div>
  );
}

/**
 * "From your first question to your next step": a gradient panel on the left with the open step
 * shown as a card, and the heading with the steps as a list on the right. The open step shows its
 * text, a link to the enquiry form and a progress bar; on wide screens the next step opens when the
 * bar fills, and hovering or focusing the section pauses it.
 */
export default function ProcessShowcase({ process, tiles }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setAutoplay(Boolean(window.matchMedia?.("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches));
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const running = autoplay && inView && !paused;
  const mocks = [<ChooseMock key="choose" tiles={tiles} />, <PrepareMock key="prepare" />, <CompleteMock key="complete" cta={process.cta.label} />];

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-28 bg-gray-50 px-4 py-16 md:px-8 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div aria-hidden="true" className="order-2 lg:order-1">
          <div className="relative flex h-full min-h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-brand-subtle via-sky-300 to-brand-strong p-6 sm:p-12">
            {/* Soft vertical lines behind the card. */}
            <div className="absolute inset-x-0 top-1/3 h-40 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.4)_0_2px,transparent_2px_22px)] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
            <div key={active} className="situation-in relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl ring-8 ring-white/40">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand">
                {String(active + 1).padStart(2, "0")} / {process.steps[active].label}
              </p>
              {mocks[active]}
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col lg:order-2">
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-brand-subtle px-3 py-1 text-sm font-semibold text-brand">
            {process.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">{process.title}</h2>

          <ul className="mt-10 lg:mt-auto lg:pt-16">
            {process.steps.map((step, index) => {
              const open = index === active;
              const Icon = STEP_ICONS[index];
              const panelId = `process-panel-${index}`;
              return (
                <li key={step.title} className="relative border-b border-gray-200">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(index)}
                      className={cx(
                        "flex w-full items-center gap-4 py-5 text-left text-xl font-semibold transition-colors md:text-2xl",
                        open ? "text-gray-900" : "text-gray-400 hover:text-gray-700",
                      )}
                    >
                      <Icon aria-hidden="true" className={cx("h-6 w-6 flex-shrink-0", open && "text-brand")} />
                      {step.title}
                    </button>
                  </h3>
                  <Collapse id={panelId} open={open} className="flex items-start gap-6 pb-6 pl-10">
                    <p className="flex-1 text-lg text-gray-600">{step.text}</p>
                    <a
                      href={process.cta.href}
                      aria-label={`${process.cta.label}: ${step.title}`}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                    </a>
                  </Collapse>
                  {open && (
                    <span
                      aria-hidden="true"
                      onAnimationEnd={() => setActive((current) => (current + 1) % process.steps.length)}
                      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand"
                      style={
                        autoplay
                          ? { animation: `situation-progress ${STEP_MS}ms linear`, animationPlayState: running ? "running" : "paused" }
                          : undefined
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
