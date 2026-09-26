import { useState } from "react";

const TAB = "px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold transition-all text-sm md:text-base";
const TAB_ACTIVE = "bg-brand text-white shadow-lg";
const TAB_IDLE = "bg-white text-gray-700 hover:bg-gray-100";

/** Tabbed "how it works" for individuals, businesses and property owners. */
export default function CrossBorderProcess({ process }) {
  const [activeId, setActiveId] = useState(process.tabs[0].id);

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-12 text-gray-900">{process.title}</h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {process.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={`${TAB} ${activeId === tab.id ? TAB_ACTIVE : TAB_IDLE}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
          {process.tabs
            .filter((tab) => tab.id === activeId)
            .map((tab) => (
              <div key={tab.id} className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">{tab.title}</h3>
                  <div className="space-y-4">
                    {tab.steps.map((step, index) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <img
                    src={tab.image.src}
                    alt={tab.image.alt}
                    className="w-full h-[250px] md:h-[400px] object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
