import career from "../content/pages/career.json";
import PageShell from "../components/layout/PageShell.jsx";
import Button from "../components/ui/Button.jsx";

const { benefits, openings, openApplication } = career;

/** Careers. Sets no page-specific SEO; "Apply Now" and "Submit Resume" have no action (known issues). */
export default function CareerPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-4">{career.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{career.intro}</p>
        </div>

        <div className="bg-brand-subtle rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-brand mb-6">{benefits.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.items.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="text-brand text-2xl">{benefit.emoji}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand mb-8">{openings.title}</h2>
          <div className="space-y-6">
            {openings.jobs.map((job) => (
              <div
                key={job.title}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-subtle text-brand rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button size="md" className="whitespace-nowrap">
                    {openings.applyLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-brand mb-4">{openApplication.title}</h2>
          <p className="text-gray-600 mb-6">{openApplication.text}</p>
          <Button size="wide">{openApplication.buttonLabel}</Button>
        </div>
      </div>
    </PageShell>
  );
}
