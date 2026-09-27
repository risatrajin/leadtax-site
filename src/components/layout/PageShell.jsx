import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";

/**
 * Standard inner-page frame: full-height column with header, a growing <main>
 * and the footer. `mainClassName` defaults to "flex-1". SEO tags come from the global <Seo>.
 * `afterMain` renders between <main> and the footer (e.g. dialogs).
 */
export default function PageShell({ afterMain, className = "min-h-screen flex flex-col", mainClassName = "flex-1", children }) {
  return (
    <div className={className}>
      <SiteHeader />
      <main className={mainClassName}>{children}</main>
      {afterMain}
      <SiteFooter />
    </div>
  );
}
