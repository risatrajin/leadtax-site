import content from "../content/pages/file-in-person.json";
import seo from "../content/seo.json";
import ServicePage from "../sections/services/ServicePage.jsx";

export default function FileInPersonPage() {
  return <ServicePage content={content} seo={seo.pages.fileInPerson} />;
}
