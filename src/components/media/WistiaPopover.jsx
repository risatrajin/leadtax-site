import { useEffect, useRef } from "react";

const PLAYER_SCRIPT = "https://fast.wistia.com/player.js";
const PLAY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>';

function loadScript(src, type) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  if (type) script.type = type;
  document.head.appendChild(script);
}

/**
 * Wistia popover video trigger. The <wistia-player> element and its trigger link
 * are created imperatively (as in the original build) so Wistia's web component
 * can take them over.
 */
export default function WistiaPopover({ mediaId, label, linkClassName, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    loadScript(PLAYER_SCRIPT);
    loadScript(`https://fast.wistia.com/embed/${mediaId}.js`, "module");

    const container = containerRef.current;
    if (!container || container.querySelector("wistia-player")) return;

    const player = document.createElement("wistia-player");
    player.setAttribute("media-id", mediaId);
    player.setAttribute("popover-content", "link");
    player.setAttribute("wistia-popover", "true");
    player.setAttribute("aspect", "1.7777777777777777");
    player.style.display = "inline-block";

    const trigger = document.createElement("a");
    trigger.href = "#";
    trigger.addEventListener("click", (event) => event.preventDefault());
    trigger.className = linkClassName;
    trigger.innerHTML = `${PLAY_ICON} ${label}`;

    player.appendChild(trigger);
    container.appendChild(player);
  }, []);

  return <div ref={containerRef} className={className} />;
}
