import { useEffect } from "react";
import site from "../../content/site.json";

/**
 * Loads Google Tag Manager. Also stubs window.fbq so the Facebook pixel
 * configured inside GTM does nothing (behaviour kept from the original build).
 */
export default function Analytics() {
  useEffect(() => {
    const id = site.integrations.gtmId;
    window.fbq = function () {};
    window._fbq = window.fbq;

    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(noscript, document.body.firstChild);
  }, []);
  return null;
}
