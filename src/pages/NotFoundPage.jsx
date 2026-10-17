import { ArrowRight } from "lucide-react";
import copy from "../content/pages/not-found.json";
import PageShell from "../components/layout/PageShell.jsx";
import Button from "../components/ui/Button.jsx";
import EnquirySection from "../components/ui/EnquirySection.jsx";

/**
 * Shown for any path without a route: a short message with a way home, then the enquiry form.
 * It is a client-side page, so the server still answers 200; the page is noindex so search
 * engines don't list it.
 */
export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-brand to-brand-strong px-4 py-20 text-center text-white md:px-8 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">{copy.eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{copy.title}</h1>
        <Button to={copy.action.to} variant="inverse" className="mt-10 gap-2">
          {copy.action.label}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Button>
      </section>
      <EnquirySection className="bg-white" />
    </PageShell>
  );
}
