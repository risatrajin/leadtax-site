/** Grey stand-in for a photo that hasn't been supplied yet. The label says which photo is needed. */
export default function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-ed-image bg-ed-surface p-6 text-center text-sm text-ed-muted ${className}`}
    >
      {label}
    </div>
  );
}
