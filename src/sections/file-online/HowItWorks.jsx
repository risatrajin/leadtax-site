import home from "../../content/pages/file-online.json";
import SectionHeading from "../../components/ui/SectionHeading.jsx";

const { steps } = home;

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>{steps.title}</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.items.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand text-white rounded-full mb-4">
                <span className="text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
