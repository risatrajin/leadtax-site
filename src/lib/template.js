/** Fill "{name}" slots in content strings. Unknown slots are left as-is. */
export function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}
