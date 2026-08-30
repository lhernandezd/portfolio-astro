---
paths:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.astro"
  - "**/*.mjs"
---

- No semicolons, double quotes, 2-space indent — matches `.prettierrc`.
  Run `npm run format` rather than hand-formatting.
- `.js`/`.jsx` files are linted by `npm run lint` (eslint, react-app
  config). `.astro` files are NOT covered by eslint — they're validated by
  `npm run check` (astro diagnostics/type-checking) instead. Run both
  before considering a change done.
