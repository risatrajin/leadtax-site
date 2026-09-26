import { Link } from "react-router";
import { cx } from "../../lib/cx.js";
import { resolveHref } from "../../lib/links.js";

const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  inverse: "bg-white text-brand hover:bg-gray-100",
  outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  outlineMuted: "border-2 border-brand text-brand hover:bg-gray-50",
  outlineInverse: "bg-transparent border-2 border-white text-white hover:bg-white/10",
  outlineInverseFill: "border-2 border-white text-white hover:bg-white hover:text-brand",
  inverseTint: "bg-white text-brand hover:bg-brand-subtle",
  ghost: "text-brand hover:bg-gray-100",
  disabled: "border-2 border-gray-300 text-gray-400 cursor-not-allowed",
};

/**
 * Three sizes used across the site: sm (40px), md (48px) and lg (56px, the default).
 * Heights are minimums so a label that wraps on a narrow screen still fits.
 */
const SIZES = {
  sm: "min-h-10 px-5 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-base",
  lg: "min-h-14 px-8 py-3 text-base",
  /** Header booking button: a little smaller between 1024 and 1279px so the nav fits. */
  header: "min-h-10 px-5 py-2 text-sm xl:px-6 xl:text-base",
  /** Full-width md button. */
  block: "min-h-12 w-full px-6 py-2.5 text-base",
};

/** Older size names, kept so existing content and pages map onto the three sizes. */
const ALIASES = { wide: "md", xl: "lg" };

const BASE = "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold";

/** Class list for a pill button, for elements that only look like buttons (e.g. inside a card link). */
export function buttonClasses({ variant = "primary", size = "lg", transition = "transition-colors", className } = {}) {
  return cx(BASE, VARIANTS[variant], SIZES[ALIASES[size] ?? size], transition, className);
}

/**
 * Pill-shaped button. Renders a router <Link> when `to` is set, an <a> when
 * `href` is set (accepts "app:" refs), otherwise a <button>.
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size = "lg",
  transition = "transition-colors",
  className,
  children,
  ...rest
}) {
  const classes = buttonClasses({ variant, size, transition, className });

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={resolveHref(href)} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
