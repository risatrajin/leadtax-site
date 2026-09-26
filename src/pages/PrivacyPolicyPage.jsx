import privacyPolicy from "../content/pages/privacy-policy.json";
import LegalDocument from "../components/legal/LegalDocument.jsx";

/** Privacy Policy. Sets no page-specific SEO, so the site defaults apply (known issue). */
export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicy} />;
}
