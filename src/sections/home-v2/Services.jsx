import { ArrowUpRight } from "lucide-react";
import content from "../../content/home-v2.json";
import { buttonClasses } from "../../components/ui/Button.jsx";
import SmartLink from "../../components/ui/SmartLink.jsx";

const { services } = content;

/** Large navy tile. The approved storefront crops were too soft at this size, so these tiles have no photo. */
function FeaturedTile({ tile }) {
  return (
    <SmartLink
      to={tile.to}
      href={tile.href}
      className="group flex min-h-[320px] flex-col justify-end rounded-2xl bg-gradient-to-br from-brand to-brand-strong p-8 text-white shadow-xl transition-shadow hover:shadow-2xl md:p-10 xl:col-span-3"
    >
      <h3 className="text-2xl font-semibold md:text-3xl">{tile.title}</h3>
      <p className="mt-3 max-w-md text-brand-subtle">{tile.text}</p>
      <span className={buttonClasses({ variant: "inverse", size: "md", className: "mt-8 self-start font-semibold" })}>
        {tile.cta}
      </span>
    </SmartLink>
  );
}

function StandardTile({ tile }) {
  return (
    <SmartLink
      to={tile.to}
      href={tile.href}
      className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl xl:col-span-2"
    >
      <ArrowUpRight aria-hidden="true" className="h-6 w-6 self-end text-brand" />
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{tile.title}</h3>
        <p className="mt-2 leading-relaxed text-gray-600">{tile.text}</p>
      </div>
    </SmartLink>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{services.title}</h2>
          <p className="max-w-md text-lg text-gray-600">{services.intro}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          {services.featured.map((tile) => (
            <FeaturedTile key={tile.serviceId} tile={tile} />
          ))}
          {services.standard.map((tile) => (
            <StandardTile key={tile.serviceId} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
