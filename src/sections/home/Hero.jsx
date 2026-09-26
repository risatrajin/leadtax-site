import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import home from "../../content/home.json";
import site from "../../content/site.json";
import { tollFreeSpaced } from "../../lib/phone.js";
import Button from "../../components/ui/Button.jsx";
import WistiaPopover from "../../components/media/WistiaPopover.jsx";

const { hero } = home;

const VIDEO_LINK_CLASSES =
  "inline-flex items-center gap-2 bg-white/10 text-white no-underline px-8 py-5 rounded-full font-semibold text-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm";

/** Copies text using a hidden textarea (the original approach; works without the Clipboard API). */
function copyText(text, onCopied) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-999999px";
  textarea.style.top = "-999999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
    textarea.remove();
    onCopied();
  } catch {
    console.error("Failed to copy");
    textarea.remove();
  }
}

function Tooltip({ tone, children }) {
  return (
    <div
      className={`absolute top-8 left-0 ${tone} text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-sm`}
    >
      {children}
      <div className={`absolute -top-1 left-4 w-2 h-2 ${tone} rotate-45`} />
    </div>
  );
}

export default function Hero() {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPhone = () =>
    copyText(tollFreeSpaced, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

  return (
    <section className="bg-gradient-to-br from-brand via-brand-highlight to-brand text-white py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-subtle rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{hero.title}</h1>
            <p className="text-lg md:text-xl text-brand-subtle leading-relaxed">{hero.text}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center w-full">
              <Button
                href={hero.primaryCta.href}
                variant="inverse"
                transition="transition-all duration-300"
                className="block font-semibold text-base md:text-lg hover:shadow-xl hover:scale-105 text-center flex-1"
              >
                {hero.primaryCta.label}
              </Button>
              <WistiaPopover
                mediaId={hero.video.mediaId}
                label={hero.video.label}
                linkClassName={VIDEO_LINK_CLASSES}
                className="block flex-1 [&_wistia-player]:block [&_wistia-player]:w-full [&_a]:w-full [&_a]:justify-center [&_a]:text-center [&_a]:py-4 [&_a]:px-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-brand-subtle">
              <div className="flex items-center gap-2 relative">
                <Phone className="w-[18px] h-[18px]" />
                <button
                  onClick={copyPhone}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="text-[18px] cursor-pointer hover:text-white transition-colors"
                >
                  {tollFreeSpaced}
                </button>
                {hovering && !copied && <Tooltip tone="bg-gray-900/95">{hero.copyTooltip}</Tooltip>}
                {copied && <Tooltip tone="bg-green-600/95">{hero.copiedTooltip}</Tooltip>}
              </div>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-white transition-colors text-[18px] flex items-center gap-2"
              >
                <Mail className="w-[18px] h-[18px]" />
                {site.contact.email}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 ring-4 ring-white/10">
              <img src={hero.image.src} alt={hero.image.alt} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-brand-subtle rounded-3xl -z-10 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
