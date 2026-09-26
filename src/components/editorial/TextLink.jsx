import { Link } from "react-router";
import { resolveHref } from "../../lib/links.js";

/** Plain text link that accepts either a route (`to`) or a URL/ref (`href`). */
export default function TextLink({ to, href, className = "", children, ...rest }) {
  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  const url = resolveHref(href);
  const external = url.startsWith("http");
  return (
    <a href={url} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
