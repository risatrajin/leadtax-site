import { cx } from "../../lib/cx.js";

/**
 * Two-column call-to-action panel: photo on the left, copy and actions on the right.
 * Colours and spacing differ between uses, so each slot takes its own classes.
 */
export default function CtaBanner({
  sectionClassName,
  frameClassName,
  gridClassName = "grid md:grid-cols-2",
  media,
  image,
  bodyClassName,
  title,
  text,
  textClassName,
  children,
}) {
  return (
    <section className={cx("py-16 md:py-24 px-4 md:px-8", sectionClassName)}>
      <div className="max-w-6xl mx-auto">
        <div className={cx("rounded-3xl overflow-hidden shadow-xl", frameClassName)}>
          <div className={gridClassName}>
            <div className={media}>
              <img src={image.src} alt={image.alt} className={image.className} />
            </div>
            <div className={bodyClassName}>
              <h2 className="text-3xl md:text-4xl mb-4">{title}</h2>
              <p className={textClassName}>{text}</p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
