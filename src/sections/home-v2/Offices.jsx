import content from "../../content/home-v2.json";
import { offices } from "../../lib/offices.js";
import OfficeRow from "../../components/editorial/OfficeRow.jsx";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";

const { offices: copy, bookingFallback } = content;

export default function Offices() {
  return (
    <section id="offices" className="bg-ed-surface">
      <div className="ed-container py-24 xl:py-28">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading text={copy.title} />
          <p className="max-w-[460px] text-lg text-ed-muted">{copy.intro}</p>
        </div>
        <ul className="mt-12 space-y-4">
          {offices.map((office) => (
            <OfficeRow key={office.id} office={office} copy={copy} bookingFallback={bookingFallback.href} />
          ))}
        </ul>
      </div>
    </section>
  );
}
