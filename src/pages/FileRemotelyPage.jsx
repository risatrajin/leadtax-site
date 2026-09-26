import content from "../content/pages/file-remotely.json";
import seo from "../content/seo.json";
import ServicePage from "../sections/services/ServicePage.jsx";

export default function FileRemotelyPage() {
  return <ServicePage content={content} seo={seo.pages.fileRemotely} />;
}
