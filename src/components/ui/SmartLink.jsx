import { forwardRef } from "react";
import { Link } from "react-router";
import { resolveHref } from "../../lib/links.js";

/**
 * Link for a content link record: `to` renders a router link; `href` renders an anchor
 * (resolving "app:" / "download:" refs) and opens external URLs in a new tab.
 */
const SmartLink = forwardRef(function SmartLink({ to, href, children, ...rest }, ref) {
  if (to) {
    return (
      <Link ref={ref} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  const url = resolveHref(href);
  const external = /^https?:\/\//.test(url);
  return (
    <a ref={ref} href={url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
});

export default SmartLink;
