/**
 * Helpers for the client's eTaskMe pages shown in iframes (the enquiry and drop-off forms). Each
 * host serves those pages through this site's own domain, so the frame's document can be read and
 * restyled from here.
 */

/** The site's brand colours and body font, read from the live page so the frames match it. */
export function siteTheme() {
  const root = getComputedStyle(document.documentElement);
  return {
    brand: root.getPropertyValue("--color-brand").trim() || "#177ff8",
    brandStrong: root.getPropertyValue("--color-brand-strong").trim() || "#0b5ed7",
    brandSubtle: root.getPropertyValue("--color-brand-subtle").trim() || "#d6e8fe",
    font: getComputedStyle(document.body).fontFamily,
  };
}

/** Adds `css` to the framed page, plus the site's web-font stylesheet so `font` resolves there too. */
export function restyleFrame(doc, css) {
  const style = doc.createElement("style");
  style.textContent = css;
  doc.head.append(style);
  for (const link of document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]')) {
    doc.head.append(link.cloneNode());
  }
}

/** Keeps the iframe as tall as its page as the page's content grows and shrinks. */
export function fitFrame(frame, doc) {
  const fit = () => {
    frame.style.height = `${Math.ceil(doc.body.getBoundingClientRect().bottom)}px`;
  };
  new ResizeObserver(fit).observe(doc.body);
  fit();
}
