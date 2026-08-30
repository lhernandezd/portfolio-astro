---
paths:
  - "src/**/*.astro"
  - "src/**/*.jsx"
---

- Only use a React island (`.jsx` + a `client:*` directive) for pieces
  that are genuinely stateful/interactive: mobile menu toggle, theme
  toggle, react-spring animations. Everything else — cards, links, page
  shells — must be a plain `.astro` component so it ships zero JS.
- `react-icons` components render fine inside `.astro` files with no
  `client:*` directive (static SSR, no hydration shipped) — don't add
  `client:load` just to render an icon.
- Local images always go through `astro:assets`'s `<Image>` component with
  a source under `src/assets` — never a plain `<img src="...">` for an
  image that lives in this repo.
- Card-style content (work/education/teaching entries) stays data-driven:
  the arrays live in `src/data/*.js` (`work.js`, `education.js`,
  `teaching.js`, `skills.js`), imported into `index.astro` and mapped over
  `WorkCard.astro`/`EducationCard.astro` — don't hand-write bespoke markup
  per entry, and don't put data arrays back inline in page frontmatter
  (see [.claude/skills/add-entry](../.claude/skills/add-entry/SKILL.md)).
- This is a single-page site (`index.astro` holds every section); new
  content is almost always a new `<section id="...">` on that page, not a
  new route. See [.claude/skills/new-page](../.claude/skills/new-page/SKILL.md)
  for the rare case a real new route is warranted.
- `CustomLink.astro` takes an `iconName` string (`"github" | "linkedin" |
  "mail" | "resume"`), not a component reference — Astro needs icon
  imports statically known inside the `.astro` file, so new icons must be
  added to the `icons` map in `CustomLink.astro` itself, not passed in as
  props from callers.
