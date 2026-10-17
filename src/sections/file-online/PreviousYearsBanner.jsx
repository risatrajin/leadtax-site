import home from "../../content/pages/file-online.json";
import Button from "../../components/ui/Button.jsx";

const { previousYears } = home;

/**
 * "Want to file taxes for previous years?" The button opens the DIY tax software sign-up.
 * `image` replaces the default photo (the homepage uses its own).
 */
export default function PreviousYearsBanner({ className = "bg-gray-100", image = previousYears.image }) {
  return (
    <section className={`${className} px-[32px] py-[80px]`}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="mb-8">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-[250px] md:h-[400px] object-cover shadow-lg rounded-lg"
            style={{ objectPosition: image.position }}
          />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900">{previousYears.title}</h2>
        <p className="text-lg text-gray-600">{previousYears.text}</p>
        <Button href={previousYears.ctaHref} target="_blank" rel="noopener noreferrer">
          {previousYears.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
