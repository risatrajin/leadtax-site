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

const SIZES = {
  sm: "px-6 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4",
  wide: "px-8 py-3",
  xl: "px-10 py-4",
  /** Vertical padding only, for full-width buttons. */
  block: "py-3",
};

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
  const classes = cx(VARIANTS[variant], SIZES[size], "rounded-full", transition, className);

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
