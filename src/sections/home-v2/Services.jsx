import { ArrowUpRight } from "lucide-react";
import content from "../../content/home-v2.json";
import { pillClasses } from "../../components/editorial/PillButton.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";
import TextLink from "../../components/editorial/TextLink.jsx";

const { services } = content;

const FEATURED_TONES = {
  ink: { tile: "bg-ed-ink text-white", text: "text-white/70", pill: "inverse" },
  surface: { tile: "bg-ed-surface text-ed-ink", text: "text-ed-muted", pill: "solid" },
};

function FeaturedTile({ tile }) {
  const tone = FEATURED_TONES[tile.tone];
  return (
    <TextLink
      to={tile.to}
      href={tile.href}
      className={`group flex min-h-[320px] flex-col justify-end rounded-ed-card p-8 md:p-10 xl:col-span-3 ${tone.tile}`}
    >
      <h3 className="text-[30px] font-normal leading-[1.1] tracking-[-0.03em]">{tile.title}</h3>
      <p className={`mt-3 max-w-[440px] ${tone.text}`}>{tile.text}</p>
      <span className={`mt-8 self-start ${pillClasses(tone.pill, "sm")}`}>{tile.cta}</span>
    </TextLink>
  );
}

function StandardTile({ tile }) {
  return (
    <TextLink
      to={tile.to}
      href={tile.href}
      className="group flex min-h-[240px] flex-col justify-between rounded-ed-card bg-ed-surface p-8 xl:col-span-2"
    >
      <ArrowUpRight aria-hidden="true" className="h-5 w-5 self-end text-ed-muted transition-colors group-hover:text-ed-ink" />
      <div>
        <h3 className="text-[24px] font-normal leading-[1.15] tracking-[-0.02em]">{tile.title}</h3>
        <p className="mt-2 text-ed-muted">{tile.text}</p>
      </div>
    </TextLink>
  );
}

export default function Services() {
  return (
    <section id="services" className="border-t border-ed-line">
      <div className="ed-container py-24 xl:py-28">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading text={services.title} className="max-w-[620px]" />
          <p className="max-w-[420px] text-lg text-ed-muted">{services.intro}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
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
