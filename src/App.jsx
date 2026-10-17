import { BrowserRouter, Route, Routes } from "react-router";
import Favicon from "./components/global/Favicon.jsx";
import ScrollToTop from "./components/global/ScrollToTop.jsx";
import RevealOnScroll from "./components/global/RevealOnScroll.jsx";
import Analytics from "./components/global/Analytics.jsx";
import IntercomWidget from "./components/global/IntercomWidget.jsx";
import Seo from "./components/seo/Seo.jsx";
import RedirectTo from "./components/global/RedirectTo.jsx";
import HomePage from "./pages/HomePage.jsx";
import FileOnlinePage from "./pages/FileOnlinePage.jsx";
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
import UsCrossBorderPage from "./pages/UsCrossBorderPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/*
 * "/" is the service-focused homepage from the developer package; /home-legacy and /home-v2
 * redirect to "/", /home-redesign and /cross-border-tax to /us-cross-border, /business-tax to
 * /corporate-tax.
 * Other routes are in the same order as the original build. /sign-in and /file-remote-landing were
 * not rebuilt; /diy-landing and /dyi-landing redirect to /file-online (their copy is in
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
      <RevealOnScroll />
      <Analytics />
      <IntercomWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file-remotely" element={<FileRemotelyPage />} />
        <Route path="/drop-off" element={<DropOffPage />} />
        <Route path="/file-online" element={<FileOnlinePage />} />
        <Route path="/file-in-person" element={<FileInPersonPage />} />
        <Route path="/us-cross-border" element={<UsCrossBorderPage />} />
        <Route path="/personal-tax" element={<ServicePage key="personal-tax" slug="personal-tax" />} />
        <Route path="/corporate-tax" element={<ServicePage key="corporate-tax" slug="corporate-tax" />} />
        <Route path="/business-tax" element={<RedirectTo to="/corporate-tax" />} />
        <Route path="/cross-border-tax" element={<RedirectTo to="/us-cross-border" />} />
        <Route path="/bookkeeping" element={<ServicePage key="bookkeeping" slug="bookkeeping" />} />
        <Route path="/trust-estate-tax" element={<ServicePage key="trust-estate-tax" slug="trust-estate-tax" />} />
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
