import RichText from "./RichText.jsx";
import { cx } from "../../lib/cx.js";


/**
 * The page's longer descriptive copy (the search-focused summary and short "about" paragraphs),
 * set small and grey in a quiet band at the end of the page, just above the footer, so the top of
 * the page stays short. `text` is the summary paragraph; `blocks` are { title, text } pairs.
 */
export default function PageNote({ text, blocks = [], className = "bg-white" }) {
  const items = blocks.filter(Boolean);
  if (!text && !items.length) return null;
  return (
    <section className={cx("border-t border-gray-200 px-4 py-10 md:px-8 md:py-14", className)}>
      <div className={cx("mx-auto grid max-w-7xl gap-8 lg:gap-12", text && items.length && "lg:grid-cols-12")}>
        {text && (
          <p className={cx("text-sm leading-relaxed text-gray-500", items.length ? "lg:col-span-5" : "max-w-4xl")}>
            <RichText text={text} />
          </p>
        )}
        {items.length > 0 && (
          <div className={cx("grid gap-8", items.length > 1 && "sm:grid-cols-2", text && "lg:col-span-7")}>
            {items.map((block) => (
              <div key={block.title} className={cx(items.length === 1 && "max-w-xl")}>
                <h2 className="text-sm font-semibold text-gray-700">{block.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  <RichText text={block.text} />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
