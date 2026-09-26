import site from "../content/site.json";

/**
 * Content files refer to the external LeadTax apps as "app:<app>.<target>"
 * (e.g. "app:diy.register") so the URLs live only in site.json.
 */
export function resolveHref(href) {
  if (typeof href !== "string" || !href.startsWith("app:")) return href;
  const [app, target] = href.slice(4).split(".");
  return site.apps[app][target];
}

export function isExternal(href) {
  return resolveHref(href).startsWith("http");
}
