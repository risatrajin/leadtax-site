import terms from "../content/pages/terms.json";
import LegalDocument from "../components/legal/LegalDocument.jsx";

/** Terms and Conditions. Sets no page-specific SEO, so the site defaults apply (known issue). */
export default function TermsPage() {
  return <LegalDocument document={terms} />;
}
