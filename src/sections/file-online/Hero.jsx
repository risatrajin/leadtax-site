import { Mail, Phone } from "lucide-react";
import home from "../../content/pages/file-online.json";
import site from "../../content/site.json";
import { tollFreeSpaced } from "../../lib/phone.js";
import Button from "../../components/ui/Button.jsx";
import WistiaPopover from "../../components/media/WistiaPopover.jsx";
import CopyText from "../../components/ui/CopyText.jsx";
import QuickQueryButton from "../../components/ui/QuickQueryButton.jsx";

const { hero } = home;

const VIDEO_LINK_CLASSES =
  "inline-flex min-h-14 items-center gap-2 rounded-full bg-white/15 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25";

export default function Hero() {
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
        <QuickQueryButton className="bottom-4 right-4 xl:bottom-auto xl:right-[8%] xl:top-[38%]" />
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
            <CopyText value={tollFreeSpaced} className="hover:text-white transition-colors text-[18px] flex items-center gap-2">
              <Phone className="w-[18px] h-[18px]" />
              {tollFreeSpaced}
            </CopyText>
            <CopyText value={site.contact.email} className="hover:text-white transition-colors text-[18px] flex items-center gap-2">
              <Mail className="w-[18px] h-[18px]" />
              {site.contact.email}
            </CopyText>
          </div>
        </div>
      </div>

    </section>
  );
}
