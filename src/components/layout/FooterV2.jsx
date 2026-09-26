import { Link } from "react-router";
import content from "../../content/home-v2.json";
import { offices, officePhone, officeTel } from "../../lib/offices.js";
import { tollFreeDashed } from "../../lib/phone.js";
import TextLink from "../editorial/TextLink.jsx";

const { footer, header } = content;
const LINK = "text-ed-muted transition-colors hover:text-ed-ink";

/** Footer for the editorial homepage. */
export default function FooterV2() {
  return (
    <footer className="border-t border-ed-line">
      <div className="ed-container py-16 xl:py-20">
        <div className="grid gap-12 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <Link to={header.homeTo} className="text-[22px] font-semibold tracking-[-0.03em]">
              {header.wordmark}
            </Link>
            <p className="mt-4 max-w-[320px] text-ed-muted">{footer.tagline}</p>
            <a href={`tel:${tollFreeDashed}`} className="mt-4 inline-block text-ed-ink underline-offset-4 hover:underline">
              {tollFreeDashed}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 xl:col-span-8">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-ed-ink">{column.title}</h2>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <TextLink to={link.to} href={link.href} className={LINK}>
                        {link.label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="sm:col-span-2">
              <h2 className="text-sm font-medium text-ed-ink">{footer.officesTitle}</h2>
              <ul className="mt-4 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
                {offices.map((office) => (
                  <li key={office.id}>
                    <p className="text-ed-ink">{office.shortName}</p>
                    <p className="text-ed-muted">{office.display.address}</p>
                    <a href={officeTel(office)} className={LINK}>
                      {officePhone(office)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ed-line pt-6 text-sm text-ed-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {footer.legalName}
          </p>
          <ul className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
