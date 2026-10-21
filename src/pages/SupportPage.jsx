import { ArrowRight, ChevronRight, Copy } from "lucide-react";
import page from "../content/pages/support.json";
import site from "../content/site.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { SectionTitle } from "../components/ui/ServiceBlocks.jsx";
import { clientLoginLinks, enabledLinks } from "../components/layout/site-header/panels.jsx";
import { tollFreeDashed } from "../lib/phone.js";
import { getIcon } from "../lib/icons.js";
import { CARD, CARD_TITLE } from "../lib/styles.js";
import CopyText from "../components/ui/CopyText.jsx";

const LIFT = "group transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0";

/** Where a contact card points, and its link text. Phone and email cards copy instead of linking. */
function contactLink(item) {
  if (item.kind === "phone") return { copy: true, label: tollFreeDashed };
  if (item.kind === "email") return { copy: true, label: site.contact.email };
  return { to: item.to, label: item.label };
}

/** Support hub: ways to reach the team, self-help resources and client sign-in. */
export default function SupportPage() {
  const { hero } = page;
  return (
    <PageShell>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} decor />

      <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={page.contactTitle} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.contact.map((item) => {
              const Icon = getIcon(item.icon);
              const link = contactLink(item);
              return (
                <li key={item.title}>
                  {link.copy ? (
                    <div className={`${CARD} flex h-full flex-col p-7`}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className={`mt-5 ${CARD_TITLE}`}>{item.title}</h3>
                      <p className="mt-2 flex-1 text-gray-600">{item.text}</p>
                      <CopyText value={link.label} className="mt-5 inline-flex items-center gap-1.5 self-start break-all font-semibold text-brand hover:underline">
                        {link.label}
                        <Copy aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
                      </CopyText>
                    </div>
                  ) : (
                  <SmartLink to={link.to} href={link.href} className={`${CARD} ${LIFT} flex h-full flex-col p-7`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-md">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className={`mt-5 ${CARD_TITLE}`}>{item.title}</h3>
                    <p className="mt-2 flex-1 text-gray-600">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 break-all font-semibold text-brand">
                      {link.label}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </span>
                  </SmartLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title={page.selfTitle} />
          <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {enabledLinks(page.self).map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <li key={link.to}>
                  <SmartLink to={link.to} className="group flex items-center gap-5 py-6">
                    <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-subtle text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon aria-hidden="true" strokeWidth={1.75} className="h-7 w-7" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xl font-semibold text-gray-900">{link.label}</span>
                      <span className="mt-1 block text-gray-600">{link.description}</span>
                    </span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl bg-hero-blue p-10 text-center text-white shadow-xl">
          <h2 className="text-3xl font-semibold tracking-tight">{page.loginTitle}</h2>
          <p className="text-lg text-white/90">{page.loginText}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {clientLoginLinks.map((link, index) => (
              <Button key={link.label} href={link.href} variant={index === 0 ? "inverse" : "outlineInverseFill"}>
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
