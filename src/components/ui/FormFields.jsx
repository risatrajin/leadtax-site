import { ChevronDown } from "lucide-react";
import { cx } from "../../lib/cx.js";

/** Shared look for the site's enquiry forms. */
export const FIELD =
  "mt-2 min-h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition placeholder:text-gray-400 hover:border-brand focus:border-brand";
export const LABEL = "text-sm font-semibold text-gray-900";

/** Labelled text input. `className` goes on the label (e.g. a grid span). */
export function TextField({ name, label, type = "text", autoComplete, required = true, className }) {
  return (
    <label className={cx("block", className)}>
      <span className={LABEL}>{label}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className={FIELD} />
    </label>
  );
}

/** Labelled dropdown in the form's field style. */
export function SelectField({ name, label, options, defaultValue }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      <span className="relative block">
        <select name={name} defaultValue={defaultValue} className={`${FIELD} cursor-pointer appearance-none pr-12`}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-[calc(50%+4px)] h-5 w-5 -translate-y-1/2 text-gray-500" />
      </span>
    </label>
  );
}

/** Labelled multi-line text box. */
export function TextAreaField({ name, label, placeholder, rows = 4, required = false }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      <textarea name={name} rows={rows} required={required} placeholder={placeholder} className={`${FIELD} resize-y`} />
    </label>
  );
}
