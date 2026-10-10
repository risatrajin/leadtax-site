import career from "../content/pages/career.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import { fill } from "../lib/template.js";
import { getIcon } from "../lib/icons.js";
import { CARD, ICON_BADGE } from "../lib/styles.js";

const { benefits, openings, openApplication } = career;

/** Email link for applications; the address is a placeholder until the client confirms how to apply (question 21). */
const applyHref = (subject) => `mailto:${career.applyEmail}?subject=${encodeURIComponent(subject)}`;

/** Careers. "Apply Now" and "Submit Resume" open an email to the application address. */
export default function CareerPage() {
  return (
    <PageShell>
      <PageHero title={career.title} text={career.intro} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

        <div className={`${CARD} p-8 md:p-12 mb-12`}>
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-6">{benefits.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.items.map((benefit) => {
              const Icon = getIcon(benefit.icon);
              return (
                <div key={benefit.title} className="flex gap-4">
                  <div className={ICON_BADGE}>
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">{openings.title}</h2>
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
                  <Button href={applyHref(fill(career.applySubject, { job: job.title }))} size="md" className="whitespace-nowrap">
                    {openings.applyLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">{openApplication.title}</h2>
          <p className="text-gray-600 mb-6">{openApplication.text}</p>
          <Button href={applyHref(career.openApplicationSubject)} size="wide">
            {openApplication.buttonLabel}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
