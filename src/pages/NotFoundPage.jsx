import copy from "../content/pages/not-found.json";
import PageShell from "../components/layout/PageShell.jsx";
import Button from "../components/ui/Button.jsx";

/**
 * Shown for any path without a route. It is a client-side page, so the server still answers
 * 200; the page is noindex so search engines don't list it.
 */
export default function NotFoundPage() {
  return (
    <PageShell mainClassName="flex flex-1 items-center justify-center">
      <div className="px-4 py-20 text-center md:px-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">{copy.title}</h1>
        <p className="mx-auto mb-8 max-w-md text-gray-600">{copy.text}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {copy.actions.map((action) => (
            <Button key={action.label} to={action.to} variant={action.variant} size="md">
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
