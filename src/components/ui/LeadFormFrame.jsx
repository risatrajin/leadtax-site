import { useRef, useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";
import site from "../../content/site.json";
import Button from "./Button.jsx";
import LeadFormSent from "./LeadFormSent.jsx";

/**
 * Restyles the eTaskMe pages to match the site: the form loses its own header (the banner above
 * replaces it), and fields, labels and the button take the site's font and brand blue. The
 * thank-you page after sending uses inline styles, hence the !important rules for it.
 */
function formStyles(brand, brandStrong, font) {
  return `
    html, body { background: transparent !important; }
    body { margin: 0 !important; padding: 2px !important; font: 15px/1.5 ${font} !important; color: #4b5563 !important; }
    body > div { margin: 0 !important; padding: 40px 24px !important; max-width: none !important; border: 0 !important; border-radius: 16px !important; background: #f0f6ff !important; text-align: center; }
    h2 { margin: 0 0 8px; font-size: 24px; font-weight: 600; color: #111827; }
    main { max-width: none; margin: 0; padding: 2px; }
    .card { border: 0; border-radius: 0; box-shadow: none; background: transparent; overflow: visible; }
    .card header { display: none; }
    form { padding: 0; }
    .lead-row { gap: 0 16px; }
    @media (min-width: 360px) { .lead-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .field { margin-bottom: 16px; }
    label { margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #111827; }
    input, select, textarea { min-height: 48px; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 12px; color: #111827; transition: border-color .15s; }
    textarea { min-height: 112px; }
    select { appearance: none; padding-right: 44px; cursor: pointer; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 16px center; }
    input:hover, select:hover, textarea:hover { border-color: ${brand}; }
    input:focus, select:focus, textarea:focus { outline: 2px solid ${brand}; outline-offset: 1px; border-color: ${brand}; }
    input[type=checkbox] { min-height: 0; padding: 0; accent-color: ${brand}; }
    p { color: #4b5563; }
    .card button[type=submit] { width: 100%; min-height: 48px; border-radius: 9999px; background: ${brand}; font-size: 16px; font-weight: 600; transition: background-color .2s; }
    .card button[type=submit]:hover { background: ${brandStrong}; }
  `;
}

/**
 * `compact` forms (the one in the service page hero): tighter spacing, softly filled fields with a
 * focus glow, brand-coloured required marks, a lock before the privacy line and a gradient button.
 */
function compactStyles(brand, brandStrong) {
  return `
    form { padding-bottom: 18px; }
    .lead-row { gap: 0 12px; }
    .field { margin-bottom: 12px; }
    label { margin-bottom: 5px; font-size: 13px; color: #374151; }
    .req { color: ${brand}; }
    input, select, textarea { min-height: 42px; padding: 9px 14px; border-color: #e5e7eb; border-radius: 10px; background-color: #f8fafc; font-size: 14px; transition: border-color .15s, background-color .15s, box-shadow .15s; }
    select { padding-right: 40px; background-position: right 12px center; }
    textarea { min-height: 72px; height: 72px; }
    input:focus, select:focus, textarea:focus { outline: none; background-color: #fff; box-shadow: 0 0 0 4px rgb(23 127 248 / 0.15); }
    input[type=checkbox] { width: 18px; height: 18px; margin-top: 2px !important; }
    form > p { margin: 0 0 14px !important; padding-left: 20px; font-size: 11px !important; line-height: 1.45; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Crect width='18' height='11' x='3' y='11' rx='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E") no-repeat left 1px; }
    .card button[type=submit] { min-height: 46px; font-size: 15px; background: linear-gradient(135deg, ${brand}, ${brandStrong}); box-shadow: 0 10px 24px -8px rgb(23 127 248 / 0.6); transition: transform .15s, box-shadow .15s; }
    .card button[type=submit]::after { content: "  →"; }
    .card button[type=submit]:hover { transform: translateY(-1px); box-shadow: 0 14px 28px -8px rgb(23 127 248 / 0.7); }
  `;
}

/**
 * The client's enquiry form from their ERP (eTaskMe), used by the quick question modal and the
 * Contact page. That form only loads inside pages on its own domain, so it is served through this
 * site at site.leadFormPath (each host proxies /PublicLead; see README). Once it loads it is restyled
 * and kept as tall as its content. Once sent (eTaskMe's thank-you page loads), LeadFormSent shows
 * its message with a celebration and `onSent` runs. Without the proxy, a link to the form
 * (`fallbackLabel`) shows instead. `service` is the label of one of the form's "Interested service"
 * options to preselect; `compact` tightens the spacing.
 */
export default function LeadFormFrame({ title, fallbackLabel, loadingLabel, service, onSent, compact, className = "" }) {
  const frameRef = useRef(null);
  const [state, setState] = useState("loading");
  const [sent, setSent] = useState(null);

  const onLoad = () => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc?.body) return;
    // The first page must be eTaskMe's form; anything else (a 404) means this host has no proxy.
    // Later pages, such as the thank-you page after sending, live under /PublicLead/.
    const isForm = doc.querySelector('form[action*="PublicLead"]');
    const path = frame.contentWindow.location.pathname;
    if (!isForm && !path.startsWith("/PublicLead/")) {
      setState("fallback");
      return;
    }
    if (path.startsWith("/PublicLead/Thanks")) {
      setSent({ title: doc.querySelector("h1, h2")?.textContent.trim(), text: doc.querySelector("p")?.textContent.trim() });
      setState("sent");
      onSent?.();
      return;
    }
    const root = getComputedStyle(document.documentElement);
    const brand = root.getPropertyValue("--color-brand").trim() || "#177ff8";
    const brandStrong = root.getPropertyValue("--color-brand-strong").trim() || "#0b5ed7";
    const style = doc.createElement("style");
    style.textContent = formStyles(brand, brandStrong, getComputedStyle(document.body).fontFamily) + (compact ? compactStyles(brand, brandStrong) : "");
    // Wrap the "*" that marks required fields so it can take the brand colour.
    for (const label of doc.querySelectorAll("label")) {
      const last = label.lastChild;
      if (last?.nodeType === 3 && last.textContent.trimEnd().endsWith("*")) {
        last.textContent = last.textContent.trimEnd().slice(0, -1);
        const mark = doc.createElement("span");
        mark.className = "req";
        mark.textContent = "*";
        label.append(mark);
      }
    }
    doc.head.append(style);
    const serviceOption = service && [...doc.querySelectorAll("#ProjectTypeId option")].find((option) => option.text.trim() === service);
    if (serviceOption) serviceOption.selected = true;
    for (const link of document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]')) {
      doc.head.append(link.cloneNode());
    }
    // Keep the frame as tall as its page (the form grows when validation messages appear).
    const fit = () => {
      frame.style.height = `${Math.ceil(doc.body.getBoundingClientRect().bottom)}px`;
    };
    new ResizeObserver(fit).observe(doc.body);
    fit();
    setState("loaded");
  };

  if (state === "sent") {
    return <LeadFormSent title={sent.title} text={sent.text} />;
  }
  if (state === "fallback") {
    return (
      <Button href={site.leadFormUrl} target="_blank" rel="noopener noreferrer" size="block" className={`gap-2 ${className}`}>
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
        src={site.leadFormPath}
        title={title}
        onLoad={onLoad}
        loading="lazy"
        className={state === "loading" ? "absolute inset-x-0 top-0 h-96 w-full opacity-0" : "block h-[36rem] w-full"}
      />
    </div>
  );
}
