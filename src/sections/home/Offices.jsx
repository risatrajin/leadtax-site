import content from "../../content/home.json";
import { offices } from "../../lib/offices.js";
import OfficeRow from "../../components/ui/OfficeRow.jsx";

const { offices: copy, bookingFallback } = content;

export default function Offices() {
  return (
    <section id="offices" className="scroll-mt-24 bg-gray-50 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <h2 className="text-3xl text-gray-900 md:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="max-w-lg text-lg text-gray-600">{copy.intro}</p>
        </div>
        <ul className="mt-12 space-y-6">
          {offices.map((office) => (
            <OfficeRow key={office.id} office={office} copy={copy} bookingFallback={bookingFallback.href} />
          ))}
        </ul>
      </div>
    </section>
  );
}
