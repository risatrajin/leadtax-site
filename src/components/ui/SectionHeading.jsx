const DEFAULT_CLASSES = "text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 mb-12";

/** Section title. Most sections use the default size; pass className to replace it. */
export default function SectionHeading({ as: Tag = "h2", className = DEFAULT_CLASSES, children }) {
  return <Tag className={className}>{children}</Tag>;
}
