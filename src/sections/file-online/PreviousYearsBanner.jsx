import home from "../../content/pages/file-online.json";
import Button from "../../components/ui/Button.jsx";

const { previousYears } = home;

/**
 * "Want to file taxes for previous years?" The button opens the DIY tax software sign-up.
 * `portrait` (an image) switches to the homepage style: a blue band like the hero, with the
 * portrait mirrored on the left, standing on the bottom edge, and the text on the right.
 */
export default function PreviousYearsBanner({ className = "bg-gray-100", portrait }) {
  if (portrait) {
    return (
      <section className="bg-hero-blue px-4 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <img
            src={portrait.src}
            alt={portrait.alt}
            className="order-2 mx-auto -mb-px w-full max-w-xs -scale-x-100 self-end [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_6%)] sm:max-w-sm lg:order-1 lg:max-w-md"
          />
          <div className="order-1 self-center pt-16 text-center lg:order-2 lg:py-20 lg:text-left">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">{previousYears.title}</h2>
            <p className="mt-5 text-lg text-white/90 md:text-xl">{previousYears.text}</p>
            <Button href={previousYears.ctaHref} target="_blank" rel="noopener noreferrer" variant="inverse" className="mt-8">
              {previousYears.ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`${className} px-[32px] py-[80px]`}>
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
        <Button href={previousYears.ctaHref} target="_blank" rel="noopener noreferrer">
          {previousYears.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
