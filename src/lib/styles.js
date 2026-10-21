/**
 * Shared class lists for the site's card style, so panels and callouts match the homepage cards.
 */

/** White card: light border, soft shadow, 16px corners. Add padding per use. */
export const CARD = "rounded-2xl border border-gray-200 bg-white shadow-md";

/** Card title. */
export const CARD_TITLE = "text-xl font-semibold text-gray-900";

/** Round pale-blue badge holding a bright-blue icon. */
export const ICON_BADGE = "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-bright";

/** Section padding on the service pages; the scroll margin clears the header and the sticky "On this page" bar. */
export const SECTION = "scroll-mt-32 md:scroll-mt-40 px-4 py-16 md:px-8 md:py-24";

/** Card that lifts slightly on hover. */
export const LIFT = "transition duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0";
