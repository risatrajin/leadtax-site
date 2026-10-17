import home from "../../content/pages/file-online.json";
import Button from "../../components/ui/Button.jsx";

const { previousYears } = home;

/**
 * "Want to file taxes for previous years?" The button opens the DIY tax software sign-up.
 * With `portrait` (a cut-out image) the picture becomes a blue panel like the homepage hero, with
 * the person standing on its bottom edge in front of a darker rounded panel.
 */
export default function PreviousYearsBanner({ className = "bg-gray-100", portrait }) {
  return (
    <section className={`${className} px-[32px] py-[80px]`}>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="mb-8">
          {portrait ? (
            <div className="relative flex h-[250px] items-end justify-center overflow-hidden rounded-2xl bg-hero-blue shadow-lg md:h-[400px]">
              <div aria-hidden="true" className="absolute bottom-[12%] left-1/2 h-[68%] w-[46%] -translate-x-1/2 rounded-3xl bg-brand-strong/60 md:w-[34%]" />
              <img src={portrait.src} alt={portrait.alt} className="relative h-[94%] w-auto object-contain object-bottom" />
            </div>
          ) : (
            <img
              src={previousYears.image.src}
              alt={previousYears.image.alt}
              className="w-full h-[250px] md:h-[400px] object-cover shadow-lg rounded-lg"
            />
          )}
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
