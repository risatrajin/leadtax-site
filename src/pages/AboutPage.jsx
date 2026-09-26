import about from "../content/pages/about.json";
import seo from "../content/seo.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";

export default function AboutPage() {
  return (
    <PageShell seo={seo.pages.about}>
      <PageHero title={about.title} text={about.intro} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

        <div className="prose prose-lg max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-brand mb-6">{about.mission.title}</h2>
            {about.mission.paragraphs.map((paragraph, index, all) => (
              <p
                key={index}
                className={index < all.length - 1 ? "text-gray-700 leading-relaxed mb-6" : "text-gray-700 leading-relaxed"}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {about.stats.map((stat) => (
              <div key={stat.label} className="text-center p-6">
                <div className="text-5xl font-bold text-brand mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-subtle rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-brand mb-6">{about.whyChooseUs.title}</h2>
            <ul className="space-y-4 text-gray-700">
              {about.whyChooseUs.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
