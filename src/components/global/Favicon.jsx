import { useEffect } from "react";
import site from "../../content/site.json";

/** Sets the favicon and apple-touch-icon at runtime (index.html has none). */
export default function Favicon() {
  useEffect(() => {
    let icon = document.querySelector("link[rel~='icon']");
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = site.favicon;

    let touchIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (!touchIcon) {
      touchIcon = document.createElement("link");
      touchIcon.rel = "apple-touch-icon";
      document.head.appendChild(touchIcon);
    }
    touchIcon.href = site.favicon;
  }, []);
  return null;
}
