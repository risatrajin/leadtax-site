import { BrowserRouter, Route, Routes } from "react-router";
import Favicon from "./components/global/Favicon.jsx";
import ScrollToTop from "./components/global/ScrollToTop.jsx";
import Analytics from "./components/global/Analytics.jsx";
import IntercomWidget from "./components/global/IntercomWidget.jsx";
import Seo from "./components/seo/Seo.jsx";
import RedirectTo from "./components/global/RedirectTo.jsx";
import HomePage from "./pages/HomePage.jsx";
import LegacyHomePage from "./pages/LegacyHomePage.jsx";
import FileRemotelyPage from "./pages/FileRemotelyPage.jsx";
import DropOffPage from "./pages/DropOffPage.jsx";
import FileInPersonPage from "./pages/FileInPersonPage.jsx";
import UsCrossBorderPage from "./pages/UsCrossBorderPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CareerPage from "./pages/CareerPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";

/*
 * "/" is the redesigned homepage; the original DIY homepage is at /home-legacy.
 * Other routes are in the same order as the original build. /sign-in, /diy-landing,
 * /dyi-landing and /file-remote-landing were not rebuilt (their copy is in
 * src/content/archive/). /sitemap.xml and /robots.txt are static files in public/.
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
        <Route path="/file-remotely" element={<FileRemotelyPage />} />
        <Route path="/drop-off" element={<DropOffPage />} />
        <Route path="/file-in-person" element={<FileInPersonPage />} />
        <Route path="/us-cross-border" element={<UsCrossBorderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        {/* The original DIY homepage, kept for comparison (noindex). */}
        <Route path="/home-legacy" element={<LegacyHomePage />} />
        {/* The redesign lived here before it became the homepage. */}
        <Route path="/home-v2" element={<RedirectTo to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
