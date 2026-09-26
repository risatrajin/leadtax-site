import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Seo from "../seo/Seo.jsx";

/**
 * Standard inner-page frame: full-height column with header, a growing <main>
 * and the footer. `seo` is passed to <Seo>; `mainClassName` defaults to "flex-1".
 */
export default function PageShell({ seo, className = "min-h-screen flex flex-col", mainClassName = "flex-1", children }) {
  return (
    <div className={className}>
      {seo && <Seo {...seo} />}
      <Header />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
