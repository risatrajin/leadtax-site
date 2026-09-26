export default function CrossBorderExperience({ experience }) {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={experience.image.src}
              alt={experience.image.alt}
              className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-gray-900">{experience.title}</h2>
              <p className="text-lg text-gray-600">{experience.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {experience.stats.map((stat) => (
                <div key={stat.label} className="bg-brand-subtle p-4 md:p-6 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold text-brand mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
