# Placeholder content

We design with mock data until the client answers [questions-for-client.md](questions-for-client.md).
Every value that is invented or unconfirmed is flagged, so nothing ships by accident.

## Where content comes from, in order

1. What the current site already says.
2. The client's homepage mockup. So far this gives the service list: Personal Tax,
   Business Tax, Bookkeeping, US & Cross-Border Tax, Trust & Estate Tax Filing.
3. Invented copy, only where neither of the above has anything.

Record the origin in a `_source` field when it isn't obvious (see `services.json` → `serviceLines`).

## How to flag

Flags go on the record that owns the value:

```json
{ "_placeholder": true, "name": "Pathum", "url": "..." }
```

The whole record is a placeholder.

```json
{ "_placeholders": ["phone", "email", "display.address"], "phone": "6049784850", ... }
```

Only these fields are placeholders. Dotted paths reach into nested objects.

Flag a value when it is:

- invented, or edited from existing copy;
- already on the site but covered by a question in `questions-for-client.md`.

## Never invent

Reviews, statistics, credentials, guarantees and prices are never made up. Where the design needs
one and the site has nothing, the visible text is literally:

```
[TBD: what's needed]
```

For example `"price": "[TBD: Bookkeeping monthly price]"`. These strings are listed automatically;
they don't need a flag.

## Listing placeholders

```
npm run placeholders
```

This prints every flagged field and `[TBD: …]` text with its file and path. It also runs at the end
of `npm run build` and prints the count. It warns about flags that point at missing fields. It does
not fail the build yet. Archived pages (`src/content/archive/`) are not checked.
