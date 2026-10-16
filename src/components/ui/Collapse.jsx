import { cx } from "../../lib/cx.js";

/**
 * Animated show/hide for accordion panels: the height eases open and closed (CSS grid rows
 * 0fr ↔ 1fr) with a fade. Closed panels are `inert`, so their links can't be focused or read.
 */
export default function Collapse({ open, id, className, children }) {
  return (
    <div
      id={id}
      {...(open ? {} : { inert: "" })}
      className={cx(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
