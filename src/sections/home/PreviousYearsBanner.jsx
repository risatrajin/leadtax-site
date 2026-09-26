import home from "../../content/home.json";
import Button from "../../components/ui/Button.jsx";

const { previousYears } = home;

/** "Want to file taxes for previous years?" The button has no action (known issue). */
export default function PreviousYearsBanner() {
  return (
    <section className="bg-gray-100 px-[32px] py-[80px]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="mb-8">
          <img
            src={previousYears.image.src}
            alt={previousYears.image.alt}
            className="w-full h-[250px] md:h-[400px] object-cover shadow-lg rounded-lg"
          />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900">{previousYears.title}</h2>
        <p className="text-lg text-gray-600">{previousYears.text}</p>
        <Button>{previousYears.ctaLabel}</Button>
      </div>
    </section>
  );
}
