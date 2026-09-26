import { ImageOff } from "lucide-react";
import { cx } from "../../lib/cx.js";

/** Stand-in for a photo we don't have yet. The label says which photo is needed. */
export default function PhotoPlaceholder({ label, className }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("flex flex-col items-center justify-center gap-2 bg-gray-100 p-4 text-center text-sm text-gray-600", className)}
    >
      <ImageOff aria-hidden="true" className="h-6 w-6" />
      {label}
    </div>
  );
}
