import { cx } from "../../lib/cx.js";

/** White rounded surface. Pass layout, shadow and padding through className. */
export default function Card({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cx("bg-white rounded-2xl", className)} {...rest}>
      {children}
    </Tag>
  );
}
