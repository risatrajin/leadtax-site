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
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CareerPage from "./pages/CareerPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import ServiceLinePage from "./pages/ServiceLinePage.jsx";
import BookkeepingPage from "./pages/BookkeepingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/*
 * "/" is the original DIY homepage. The redesigned homepage is the US & cross-border page
 * (/us-cross-border); /home-legacy and /home-v2 redirect to "/", /home-redesign to /us-cross-border.
 * Other routes are in the same order as the original build. /sign-in, /diy-landing,
 * /dyi-landing and /file-remote-landing were not rebuilt (their copy is in
 * src/content/archive/). /sitemap.xml and /robots.txt are static files in public/.
 * The original had no catch-all route, so unknown paths rendered a blank page; they now show
 * NotFoundPage.
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
        <Route path="/" element={<LegacyHomePage />} />
        <Route path="/file-remotely" element={<FileRemotelyPage />} />
        <Route path="/drop-off" element={<DropOffPage />} />
        <Route path="/file-in-person" element={<FileInPersonPage />} />
        <Route path="/us-cross-border" element={<HomePage />} />
        <Route path="/personal-tax" element={<ServiceLinePage slug="personal-tax" />} />
        <Route path="/business-tax" element={<ServiceLinePage slug="business-tax" />} />
        <Route path="/bookkeeping" element={<BookkeepingPage />} />
        <Route path="/trust-estate-tax" element={<ServiceLinePage slug="trust-estate-tax" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        {/* Earlier addresses of the homepages and the redesign. */}
        <Route path="/home-redesign" element={<RedirectTo to="/us-cross-border" />} />
        <Route path="/home-legacy" element={<RedirectTo to="/" />} />
        <Route path="/home-v2" element={<RedirectTo to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
