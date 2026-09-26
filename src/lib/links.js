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

export function isExternal(href) {
  return resolveHref(href).startsWith("http");
}
