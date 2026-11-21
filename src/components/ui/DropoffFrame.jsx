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
    body > header, .hero { display: none !important; }
    .wrap { max-width: none !important; margin: 0 !important; padding: 2px 2px 16px !important; }
    .card { border: 1px solid #e5e7eb !important; border-radius: 20px !important; box-shadow: none !important; background: #fff !important; }
    .eyebrow { color: ${brand} !important; }
    h2, h3 { color: #111827 !important; font-weight: 600 !important; }
    .control { border-radius: 12px !important; border-color: #d1d5db !important; }
    .control:focus { outline: 2px solid ${brand} !important; outline-offset: 1px; border-color: ${brand} !important; }
    label { color: #111827 !important; }
    .service, .etm-checkbox-option { border: 1px solid #e5e7eb !important; border-radius: 16px !important; box-shadow: none !important; }
    .service:hover, .service:focus-visible { border-color: ${brand} !important; background: #f7faff !important; box-shadow: 0 8px 22px rgb(23 127 248 / 0.12) !important; }
    .service:after { color: ${brand} !important; }
    .service:before { background: ${brandSubtle} ${serviceIcon} no-repeat center / 22px !important; }
    .etm-checkbox-option:has(input:checked) { background: #f7faff !important; border-color: ${brand} !important; }
    #steps .step { border-color: #e5e7eb !important; background: #f9fafb !important; color: #4b5563 !important; }
    .btn { border-radius: 9999px !important; font-weight: 600 !important; }
    .btn:not(.secondary) { background: ${brand} !important; border-color: ${brand} !important; color: #fff !important; }
    .btn:not(.secondary):hover:not(:disabled) { background: ${brandStrong} !important; }
    .btn.secondary { color: ${brand} !important; border-color: #d1d5db !important; }
    #steps .step.active { background: ${brand} !important; border-color: ${brand} !important; color: #fff !important; }
  `;
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
