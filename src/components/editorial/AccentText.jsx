/** Renders "{x}" markers in content as accent letters (Instrument Serif italic). */
export default function AccentText({ text }) {
  return text.split(/(\{[^}]+\})/).map((part, index) =>
    part.startsWith("{") ? (
      <span key={index} className="serif-accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}
