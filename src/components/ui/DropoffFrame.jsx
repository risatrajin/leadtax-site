import { useRef, useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";
import site from "../../content/site.json";
import Button from "./Button.jsx";
import { fitFrame, restyleFrame, siteTheme } from "../../lib/embed.js";
import { openPopup } from "../../lib/links.js";

const { path, submit } = site.apps.dropoff;

/**
 * Takes the drop-off page onto the site's look: its own header and welcome banner go (the dialog's
 * header replaces them), its colour variables become the site's blues, and cards, fields and
 * buttons get the site's corners and font. Its script, steps and validation are left alone.
 */
function dropoffStyles({ brand, brandStrong, brandSubtle, font }, serviceIcon) {
  return `
    :root { --ink: #111827 !important; --muted: #6b7280 !important; --line: #e5e7eb !important; --blue: ${brand} !important; --blue2: ${brandStrong} !important; --bg: transparent !important; --sage: ${brandSubtle} !important; --sage-deep: ${brandStrong} !important; --shadow: none !important; }
    html, body { background: transparent !important; }
    body { font: 15px/1.55 ${font} !important; color: #374151 !important; }
    button, input, select, textarea { font-family: inherit !important; }
    body > header, .hero { display: none !important; }
    .wrap { max-width: none !important; margin: 0 !important; padding: 2px 2px 12px !important; }

    /* The dialog is the card: no box inside a box. */
    .card { margin: 0 !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; background: transparent !important; }
    .card-intro { margin-bottom: 16px !important; }
    .eyebrow { margin-bottom: 4px !important; color: ${brand} !important; font-size: 12px !important; letter-spacing: .08em !important; }
    h2 { margin: 0 0 4px !important; font-size: 20px !important; }
    h2, h3 { color: #111827 !important; font-weight: 600 !important; letter-spacing: -.01em; }
    .muted, .help { color: #6b7280 !important; font-size: 14px !important; }

    /* Fields like the site's forms. */
    .field { margin-bottom: 14px !important; }
    label { margin-bottom: 6px !important; color: #111827 !important; font-size: 14px !important; font-weight: 600 !important; }
    .control { min-height: 46px !important; padding: 10px 14px !important; border: 1px solid #d1d5db !important; border-radius: 12px !important; background-color: #fff !important; color: #111827 !important; font-size: 15px !important; }
    select.control { appearance: none !important; padding-right: 44px !important; cursor: pointer; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center !important; }
    textarea.control { min-height: 96px !important; }
    .control:hover { border-color: ${brand} !important; }
    .control:focus { outline: 2px solid ${brand} !important; outline-offset: 1px; border-color: ${brand} !important; }

    /* Services as compact two-column rows: icon, then name and line. */
    #services.grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr)) !important; gap: 10px !important; margin-top: 18px !important; }
    .service { display: grid !important; grid-template-columns: 40px 1fr auto !important; grid-template-rows: auto auto !important; column-gap: 12px !important; align-items: center !important; min-height: 0 !important; padding: 14px 16px !important; border: 1px solid #e5e7eb !important; border-radius: 16px !important; background: #fff !important; box-shadow: none !important; transform: none !important; }
    .service:before { grid-row: 1 / 3; width: 40px !important; height: 40px !important; margin: 0 !important; border-radius: 12px !important; background: ${brandSubtle} ${serviceIcon} no-repeat center / 20px !important; }
    .service strong { grid-column: 2; margin: 0 !important; font-size: 15px !important; font-weight: 600 !important; color: #111827 !important; }
    .service small { grid-column: 2; margin: 0 !important; font-size: 13px !important; color: #6b7280 !important; }
    .service:after { content: "→" !important; grid-column: 3; grid-row: 1 / 3; margin: 0 !important; color: #9ca3af !important; font-size: 18px !important; transition: transform .15s, color .15s; }
    .service:hover, .service:focus-visible { border-color: ${brand} !important; background: #f7faff !important; box-shadow: 0 8px 22px rgb(23 127 248 / 0.12) !important; }
    .service:hover:after, .service:focus-visible:after { color: ${brand} !important; transform: translateX(3px); }

    /* Contact details in two columns where there's room. */
    #wizard .etm-contact-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr)) !important; gap: 0 14px !important; }
    .etm-step-introduction { margin: 18px 0 12px !important; }
    .etm-step-introduction h3 { margin: 0 0 2px !important; font-size: 18px !important; }

    /* The step bar as a stepper: numbered circles joined by a line, names underneath; the current
       step is filled blue and finished ones show a tick (see decorateSteps). */
    #steps.stepbar { display: flex !important; gap: 0 !important; margin: 8px 0 20px !important; padding: 8px 0 !important; overflow: visible !important; background: #fff !important; }
    #steps .step { position: relative; display: flex !important; flex: 1 1 0 !important; min-width: 0 !important; flex-direction: column; align-items: center; gap: 6px; padding: 0 4px !important; border: 0 !important; background: none !important; box-shadow: none !important; color: #6b7280 !important; font-size: 12px !important; font-weight: 500 !important; line-height: 1.3; text-align: center; }
    #steps .step:not(:last-child)::after { content: ""; position: absolute; top: 15px; left: calc(50% + 20px); right: calc(-50% + 20px); height: 2px; border-radius: 2px; background: #e5e7eb; }
    #steps .step.done::after { background: ${brand}; }
    #steps .step-num { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 2px solid #d1d5db; border-radius: 50%; background: #fff; color: #6b7280; font-size: 13px; font-weight: 600; transition: background .2s, border-color .2s, box-shadow .2s; }
    #steps .step.active .step-num { border-color: ${brand}; background: ${brand}; color: #fff; box-shadow: 0 0 0 4px rgb(23 127 248 / 0.15); }
    #steps .step.done .step-num { border-color: ${brand}; background: ${brand}; color: #fff; }
    #steps .step.active { color: #111827 !important; font-weight: 600 !important; }
    #steps .step.done { color: #374151 !important; }
    #steps .step { overflow-wrap: normal !important; word-break: normal !important; }
    /* Phones: circles only, with the current step's name on one line underneath. */
    @media (max-width: 480px) {
      #steps.stepbar { padding-bottom: 30px !important; }
      #steps .step:not(.active) .step-name { display: none; }
      #steps .step.active .step-name { position: absolute; top: 40px; left: 50%; transform: translateX(-50%); white-space: nowrap; }
      #steps .step.active:first-child .step-name { left: 0; transform: none; }
      #steps .step.active:last-child .step-name { left: auto; right: 0; transform: none; }
    }

    /* Choices. */
    .etm-checkbox-option { border: 1px solid #e5e7eb !important; border-radius: 14px !important; box-shadow: none !important; }
    .etm-checkbox-option:has(input:checked) { background: #f7faff !important; border-color: ${brand} !important; }
    input[type=checkbox], input[type=radio] { accent-color: ${brand}; }

    /* Buttons as the site's pills. */
    .btn { min-height: 44px !important; padding: 10px 22px !important; border-radius: 9999px !important; font-weight: 600 !important; }
    .btn:not(.secondary) { background: ${brand} !important; border-color: ${brand} !important; color: #fff !important; }
    .btn:not(.secondary):hover:not(:disabled) { background: ${brandStrong} !important; }
    .btn.secondary { background: #fff !important; color: ${brand} !important; border: 1px solid #d1d5db !important; }
    .btn.secondary:hover:not(:disabled) { border-color: ${brand} !important; }
  `;
}

const TICK =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

/**
 * Turns eTaskMe's step bar ("1. Business profile" boxes) into stepper markup: a number circle and a
 * name for each step, with steps before the current one marked done (a tick). eTaskMe redraws the
 * bar on every step, so this runs again whenever it changes.
 */
function decorateSteps(doc) {
  const bar = doc.getElementById("steps");
  if (!bar) return;
  const apply = () => {
    observer.disconnect();
    const steps = [...bar.querySelectorAll(".step")];
    const current = steps.findIndex((step) => step.classList.contains("active"));
    steps.forEach((step, index) => {
      if (!step.querySelector(".step-num")) {
        const [, number = index + 1, name = step.textContent.trim()] = step.textContent.trim().match(/^(\d+)\.\s*(.*)$/) ?? [];
        step.dataset.number = number;
        step.innerHTML = `<span class="step-num"></span><span class="step-name"></span>`;
        step.querySelector(".step-name").textContent = name;
      }
      const done = current > -1 && index < current;
      step.classList.toggle("done", done);
      const circle = step.querySelector(".step-num");
      if (done) circle.innerHTML = TICK;
      else circle.textContent = step.dataset.number;
      if (step.classList.contains("active")) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
    observer.observe(bar, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  };
  const observer = new MutationObserver(apply);
  apply();
}

/**
 * The client's document drop-off form from their ERP (eTaskMe), in an iframe. Like the enquiry form
 * it only loads inside pages on its own domain, so each host proxies site.apps.dropoff.path (see
 * README); the frame is restyled and kept as tall as its content. Without the proxy, a button opens
 * the form in its own window instead.
 */
export default function DropoffFrame({ title, fallbackLabel, loadingLabel, className = "" }) {
  const frameRef = useRef(null);
  const [state, setState] = useState("loading");

  const onLoad = () => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc?.body) return;
    // Anything but eTaskMe's drop-off page (a 404) means this host has no proxy.
    if (!doc.getElementById("publicServicePicker")) {
      setState("fallback");
      return;
    }
    // The service cards' document icon is drawn in eTaskMe's green; redraw it in the site's blue.
    const theme = siteTheme();
    const service = doc.querySelector(".service");
    const icon = service ? getComputedStyle(service, "::before").backgroundImage.replace(/%23[0-9a-f]{6}/gi, encodeURIComponent(theme.brand)) : "none";
    restyleFrame(doc, dropoffStyles(theme, icon));
    decorateSteps(doc);
    fitFrame(frame, doc);
    // Picking a service or moving between steps redraws the form; bring its top back into view.
    doc.addEventListener("click", (event) => {
      if (!event.target.closest(".service, .btn")) return;
      setTimeout(() => {
        if (frame.getBoundingClientRect().top < 0) frame.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 50);
    });
    setState("loaded");
  };

  if (state === "fallback") {
    return (
      <Button
        href={submit}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => openPopup(submit, "companyDropoff") && event.preventDefault()}
        size="block"
        className={`gap-2 ${className}`}
      >
        {fallbackLabel}
        <ExternalLink aria-hidden="true" className="h-5 w-5" />
      </Button>
    );
  }
  return (
    <div className={`relative ${className}`}>
      {state === "loading" && (
        <div className="flex h-96 items-center justify-center text-brand">
          <LoaderCircle aria-hidden="true" className="h-8 w-8 animate-spin motion-reduce:animate-none" />
          <span className="sr-only">{loadingLabel}</span>
        </div>
      )}
      <iframe
        ref={frameRef}
        src={path}
        title={title}
        onLoad={onLoad}
        className={state === "loading" ? "absolute inset-x-0 top-0 h-96 w-full opacity-0" : "block h-[36rem] w-full"}
      />
    </div>
  );
}
