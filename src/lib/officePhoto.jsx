import officeData from "../content/offices.json";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder.jsx";
import { fill } from "./template.js";

/** The office's photo, or a labelled placeholder when there is no usable photo yet. */
export function OfficePhoto({ office, alt, className }) {
  if (!office.photo) {
    return (
      <PhotoPlaceholder
        label={fill(officeData.photoPlaceholderLabel, { office: office.shortName })}
        className={className}
      />
    );
  }
  return <img src={office.photo} alt={alt} className={className} />;
}
