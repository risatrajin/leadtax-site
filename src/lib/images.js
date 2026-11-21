import variants from "../content/image-variants.json";

const UNSPLASH_WIDTHS = [480, 800, 1200];

/** The Unsplash URL resized to `width` (Unsplash resizes on request with its `w` parameter). */
function unsplashAt(src, width) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  return url.toString();
}

/**
 * srcset for a photo, so the browser downloads the smallest copy that is sharp at its displayed
 * size: the smaller WebP copies made by `npm run images` (listed in content/image-variants.json),
 * or Unsplash's own resizing. Undefined when there are no smaller copies.
 */
export function srcSetFor(src) {
  if (typeof src !== "string") return undefined;
  if (src.startsWith("https://images.unsplash.com/")) {
    const original = Number(new URL(src).searchParams.get("w")) || Infinity;
    const widths = UNSPLASH_WIDTHS.filter((w) => w < original);
    return [...widths.map((w) => `${unsplashAt(src, w)} ${w}w`), ...(Number.isFinite(original) ? [`${src} ${original}w`] : [])].join(", ");
  }
  const entry = variants[src];
  if (!entry) return undefined;
  return [...entry.sizes.map((w) => `${src.replace(/\.\w+$/, `-${w}w.webp`)} ${w}w`), `${src} ${entry.width}w`].join(", ");
}

/** `src`, `srcSet` and `sizes` props for an <img>; `sizes` is its displayed width (CSS media list). */
export function imgProps(src, sizes) {
  const srcSet = srcSetFor(src);
  return srcSet ? { src, srcSet, sizes } : { src };
}
