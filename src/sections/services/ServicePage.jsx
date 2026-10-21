import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";
import ServiceHero from "./ServiceHero.jsx";
import ServiceSteps from "./ServiceSteps.jsx";
import ServiceBenefits from "./ServiceBenefits.jsx";
import ServiceAudience from "./ServiceAudience.jsx";
import ServiceTrust from "./ServiceTrust.jsx";
import ServiceCta from "./ServiceCta.jsx";

const WRAPPER = { remote: "min-h-screen bg-white", local: "min-h-screen" };

/**
 * Template shared by the File Remotely, Drop-off and In Person pages.
 * These pages have no <main> element (kept from the original).
 * `afterSteps` is an optional extra section shown right after the steps (e.g. the office finder).
 */
export default function ServicePage({ content, afterSteps = null }) {
  const { variant } = content;
  return (
    <div className={WRAPPER[variant]}>
      <SiteHeader />
      <ServiceHero hero={content.hero} />
      <ServiceSteps variant={variant} steps={content.steps} />
      {afterSteps}
      <ServiceBenefits variant={variant} benefits={content.benefits} />
      <ServiceAudience variant={variant} audience={content.audience} />
      <ServiceTrust variant={variant} trust={content.trust} />
      <ServiceCta variant={variant} cta={content.cta} />
      <SiteFooter />
    </div>
  );
}
