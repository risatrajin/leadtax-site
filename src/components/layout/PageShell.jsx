import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import Seo from "../seo/Seo.jsx";

/**
 * Standard inner-page frame: full-height column with header, a growing <main>
 * and the footer. `seo` is passed to <Seo>; `mainClassName` defaults to "flex-1".
 * `afterMain` renders between <main> and the footer (e.g. dialogs).
 */
export default function PageShell({ seo, afterMain, className = "min-h-screen flex flex-col", mainClassName = "flex-1", children }) {
  return (
    <div className={className}>
      {seo && <Seo {...seo} />}
      <SiteHeader />
      <main className={mainClassName}>{children}</main>
      {afterMain}
      <SiteFooter />
    </div>
  );
}
