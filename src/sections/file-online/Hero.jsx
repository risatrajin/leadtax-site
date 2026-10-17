import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import home from "../../content/pages/file-online.json";
import site from "../../content/site.json";
import { tollFreeSpaced } from "../../lib/phone.js";
import Button from "../../components/ui/Button.jsx";
import WistiaPopover from "../../components/media/WistiaPopover.jsx";

const { hero } = home;

const VIDEO_LINK_CLASSES =
  "inline-flex min-h-14 items-center gap-2 rounded-full bg-white/15 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25";

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
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-highlight to-brand text-white">
      {/* Below 1280px the photo sits on top; from 1280px it covers the whole hero behind the text. */}
      <div className="relative h-64 sm:h-80 lg:h-[26rem] xl:absolute xl:inset-0 xl:h-auto">
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.image.position }}
        />
        {/* Extra shade behind the text on wide screens; the photo is already darker on the left. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-gray-950/60 via-gray-950/25 via-40% to-transparent to-60% xl:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-8 xl:pb-32 xl:pt-28">
        <div className="max-w-2xl space-y-8 xl:[text-shadow:0_1px_8px_rgb(0_0_0/0.25)]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{hero.title}</h1>
          <p className="text-lg md:text-xl text-brand-subtle leading-relaxed xl:max-w-xl xl:text-white/90">{hero.text}</p>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center [text-shadow:none]">
            <Button href={hero.primaryCta.href} variant="inverse" className="sm:min-w-56">
              {hero.primaryCta.label}
            </Button>
            <WistiaPopover
              mediaId={hero.video.mediaId}
              label={hero.video.label}
              linkClassName={VIDEO_LINK_CLASSES}
              className="block [&_wistia-player]:block [&_wistia-player]:w-full [&_button]:w-full [&_button]:justify-center"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-brand-subtle xl:text-white/90">
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
      </div>

    </section>
  );
}
