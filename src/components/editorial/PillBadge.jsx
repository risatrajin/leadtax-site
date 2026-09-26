/** Small rounded label on a surface background. */
export default function PillBadge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-ed-surface px-4 py-1.5 text-sm text-ed-ink ${className}`}>
      {children}
    </span>
  );
}
