import { Link } from "react-router";
import { resolveHref } from "../../lib/links.js";

const VARIANTS = {
  solid: "bg-ed-ink text-white hover:bg-ed-ink/90",
  outline: "border border-ed-outline text-ed-ink hover:border-ed-ink",
  inverse: "bg-white text-ed-ink hover:bg-ed-surface",
};

const SIZES = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-5 text-sm",
};

export const pillClasses = (variant = "solid", size = "md") =>
  `inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors ${VARIANTS[variant]} ${SIZES[size]}`;

/**
 * Fully rounded button or link. `to` renders a router link, `href` an anchor
 * (accepts "app:" / "download:" refs; http links open in a new tab), otherwise a <button>.
 */
export default function PillButton({ to, href, variant = "solid", size = "md", className = "", children, ...rest }) {
  const classes = `${pillClasses(variant, size)} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    const url = resolveHref(href);
    const external = url.startsWith("http");
    return (
      <a href={url} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
