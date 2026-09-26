import content from "../content/pages/drop-off.json";
import seo from "../content/seo.json";
import ServicePage from "../sections/services/ServicePage.jsx";

export default function DropOffPage() {
  return <ServicePage content={content} seo={seo.pages.dropOff} />;
}
