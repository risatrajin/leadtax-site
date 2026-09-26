import AccentText from "./AccentText.jsx";

const SIZES = {
  display: "text-ed-display-sm md:text-[60px] md:leading-[1.05] xl:text-ed-display",
  section: "text-ed-section-sm xl:text-ed-section",
  cta: "text-ed-cta-sm xl:text-ed-cta",
  minor: "text-[26px] leading-[1.2] tracking-[-0.02em] xl:text-ed-minor",
};

/** Weight-400 heading with tight tracking; "{x}" in the text becomes an accent letter. */
export default function SectionHeading({ as: Tag = "h2", size = "section", text, className = "", id }) {
  return (
    <Tag id={id} className={`font-normal ${SIZES[size]} ${className}`}>
      <AccentText text={text} />
    </Tag>
  );
}
