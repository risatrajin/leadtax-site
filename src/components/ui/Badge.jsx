import { cx } from "../../lib/cx.js";

const TONES = {
  light: "bg-brand-subtle text-brand",
  onBrand: "bg-white/10 text-brand-subtle",
};

/** Small rounded label (the site's tag pill). */
export default function Badge({ tone = "light", className, children }) {
  return <span className={cx("inline-flex items-center rounded-full px-4 py-1.5 text-sm", TONES[tone], className)}>{children}</span>;
}
