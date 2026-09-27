import officeData from "../content/offices.json";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder.jsx";
import { fill } from "./template.js";

/**
 * The office's photo, or a labelled placeholder when there is no usable photo yet.
 * `photoZoom` in offices.json scales the photo up to crop its edges; `photoPosition` sets the focus.
 */
export function OfficePhoto({ office, alt, className }) {
  if (!office.photo) {
    return (
      <PhotoPlaceholder
        label={fill(officeData.photoPlaceholderLabel, { office: office.shortName })}
        className={className}
      />
    );
  }
  if (office.photoZoom) {
    // Zoomed in to crop the edges (e.g. arrows baked into a screenshot).
    return (
      <div role="img" aria-label={alt || undefined} className={`${className} overflow-hidden`}>
        <img
          src={office.photo}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: office.photoPosition, transform: `scale(${office.photoZoom})`, transformOrigin: office.photoPosition }}
        />
      </div>
    );
  }
  return <img src={office.photo} alt={alt} className={className} />;
}
