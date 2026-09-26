import { Check, Download } from "lucide-react";
import content from "../../content/home-v2.json";
import SectionHeading from "../../components/editorial/SectionHeading.jsx";
import TextLink from "../../components/editorial/TextLink.jsx";

const { firstVisit } = content;
const { checklist } = firstVisit;

export default function FirstVisit() {
  return (
    <section className="ed-container py-24 xl:py-28">
      <div className="grid gap-12 xl:grid-cols-[1fr_420px] xl:items-end xl:gap-16">
        <div>
          <SectionHeading text={firstVisit.title} className="max-w-[640px]" />
          <ol className="mt-12 border-t border-ed-line">
            {firstVisit.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-ed-line py-6">
                <span aria-hidden="true" className="serif-accent col-span-2 text-[32px] leading-none text-ed-accent md:col-span-1">
                  {index + 1}
                </span>
                <h3 className="col-span-10 text-lg font-medium md:col-span-4">{step.title}</h3>
                <p className="col-span-10 col-start-3 text-ed-muted md:col-span-7 md:col-start-auto">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="rounded-ed-panel bg-ed-surface p-8 md:p-10">
          <h3 className="text-[26px] font-normal tracking-[-0.02em]">{checklist.title}</h3>
          <ul className="mt-6 space-y-3">
            {checklist.items.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-ed-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <TextLink
            href={checklist.download.href}
            className="mt-8 inline-flex items-center gap-2 font-medium underline underline-offset-4"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {checklist.download.label}
          </TextLink>
        </aside>
      </div>
    </section>
  );
}
