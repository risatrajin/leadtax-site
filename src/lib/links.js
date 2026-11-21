import site from "../content/site.json";

/**
 * Content files refer to shared URLs by reference so each URL lives only in site.json:
 *   "app:<app>.<target>"  → site.apps (e.g. "app:diy.register")
 *   "download:<id>"       → site.downloads (e.g. "download:whatToBring")
 */
export function resolveHref(href) {
  if (typeof href !== "string") return href;
  if (href.startsWith("app:")) {
    const [app, target] = href.slice(4).split(".");
    return site.apps[app][target];
  }
  if (href.startsWith("download:")) return site.downloads[href.slice(9)];
  return href;
}

/**
 * Opens `href` in a small named window (how the client's eTaskMe snippets open their forms).
 * Returns false when the browser blocks it, so the link can open it normally instead.
 */
export function openPopup(href, name) {
  const popup = window.open(resolveHref(href), name, "width=780,height=760,resizable=yes,scrollbars=yes");
  if (!popup) return false;
  popup.focus();
  return true;
}

export function isExternal(href) {
  return resolveHref(href).startsWith("http");
}
