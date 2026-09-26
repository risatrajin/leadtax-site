import { BrowserRouter, Route, Routes } from "react-router";
import Favicon from "./components/global/Favicon.jsx";
import ScrollToTop from "./components/global/ScrollToTop.jsx";
import Analytics from "./components/global/Analytics.jsx";
import IntercomWidget from "./components/global/IntercomWidget.jsx";
import Seo from "./components/seo/Seo.jsx";
import HomePage from "./pages/HomePage.jsx";
import FileRemotelyPage from "./pages/FileRemotelyPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import CareerPage from "./pages/CareerPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

/*
 * Route table mirrors the original build. Phase 1 rebuilds "/" only; the other
 * routes are listed in docs/rebuild-map.md and are added in phase 2.
 * There is no catch-all route in the original, so unknown paths render nothing.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Favicon />
      <Seo />
      <ScrollToTop />
      <Analytics />
      <IntercomWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/file-remotely" element={<FileRemotelyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
