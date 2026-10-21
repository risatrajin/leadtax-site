import content from "../content/pages/file-in-person.json";
import ServicePage from "../sections/services/ServicePage.jsx";
import Offices from "../sections/home/Offices.jsx";

export default function FileInPersonPage() {
  return <ServicePage content={content} afterSteps={<Offices className="bg-white" />} />;
}
