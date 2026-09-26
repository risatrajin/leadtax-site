import content from "../../content/home-v2.json";
import { officeCities } from "../../lib/offices.js";
import { fill } from "../../lib/template.js";
import TextLink from "../../components/editorial/TextLink.jsx";

const { localLinks } = content;
const cities = [...officeCities, ...localLinks.extraCities.map((city) => city.name)];

/** "Tax services near you": every service for every city with an office, plus extra cities from content. */
export default function LocalLinks() {
  return (
    <section className="ed-container pb-24 xl:pb-28">
      <div className="grid gap-10 border-t border-ed-line pt-12 sm:grid-cols-2 xl:grid-cols-4">
        <h2 className="text-xl font-medium tracking-[-0.01em]">{localLinks.title}</h2>
        {cities.map((city) => (
          <div key={city}>
            <h3 className="text-sm font-medium">{city}</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {localLinks.services.map((service) => (
                <li key={service.label}>
                  <TextLink href={service.href} className="text-ed-muted transition-colors hover:text-ed-ink">
                    {fill(service.label, { city })}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
