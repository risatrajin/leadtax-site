import { useEffect } from "react";
import site from "../../content/site.json";

/** Boots the Intercom chat launcher (standard Intercom install snippet). */
export default function IntercomWidget() {
  useEffect(() => {
    const { intercomAppId: appId, intercomApiBase: apiBase } = site.integrations;
    window.intercomSettings = { api_base: apiBase, app_id: appId };

    const existing = window.Intercom;
    if (typeof existing === "function") {
      existing("reattach_activator");
      existing("update", window.intercomSettings);
    } else {
      const queue = function (...args) {
        queue.c(args);
      };
      queue.q = [];
      queue.c = function (args) {
        queue.q.push(args);
      };
      window.Intercom = queue;

      const load = function () {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = `https://widget.intercom.io/widget/${appId}`;
        const first = document.getElementsByTagName("script")[0];
        first.parentNode?.insertBefore(script, first);
      };
      if (document.readyState === "complete") load();
      else window.addEventListener("load", load, false);
    }

    return () => {
      const intercom = window.Intercom;
      if (typeof intercom === "function") intercom("shutdown");
    };
  }, []);
  return null;
}
