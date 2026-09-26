import content from "../../content/pages/us-cross-border.json";

/** Button props for an action on this page. "consultation" is the page's Calendly discovery call. */
export function crossBorderAction(action) {
  if (action.to) return { to: action.to };
  if (action.href === "consultation") {
    return { href: content.consultationUrl, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: action.href, ...(action.download ? { download: true } : {}) };
}
