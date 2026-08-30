# CLAUDE.md

Personal portfolio site for Luis Hernandez (frontend developer), built with
Astro. Single scrolling page (`src/pages/index.astro`): hero, About, Work,
Projects, Education, Teaching as `<section id="...">` blocks with anchor
nav (`#about`, `#work`, `#projects`, etc.), plus a separate `404.astro`.
Deployed on Netlify at lhernandezd.me (build config in `netlify.toml`,
including redirects from the old `/about/`, `/work/`, `/education/`,
`/teaching/` routes to their anchors — this used to be a multi-page site).

Work vs. Projects are intentionally separate: Work is a compact timeline
of actual employment (`src/data/work.js`, no cards — a timeline + card
grid showing the same jobs twice was a real duplication bug, fixed by
splitting). Projects (`src/data/projects.js`, `ProjectCard.astro`) is
freelance/personal work with live links and tech-tag pills — don't
merge these back into one dataset/section.

Coding conventions, styling rules, and the npm registry override for this
repo live in [.claude/rules](.claude/rules) — they load automatically, not
duplicated here.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (also runs in CI)
- `npm run check` — astro diagnostics/type-checking (also runs in CI)
- `npm run lint` — eslint over `.js`/`.jsx` only (react-app config)
- `npm run format` — prettier write over `src`, including `.astro`
  (via `prettier-plugin-astro`)
- `npm test` — placeholder only, no tests exist yet

## Architecture notes

- Content for the Work/Education/Teaching/Skills sections lives in
  `src/data/*.js` (plain arrays of objects), imported into
  `index.astro` — not inline in the page frontmatter, since one page now
  holds all of it.
- Islands architecture: pages/static components are plain `.astro` (ship
  zero JS). Only stateful/animated pieces are React, loaded via
  `@astrojs/react` with `client:load`: `src/components/Header.jsx` (mobile
  menu + theme toggle), `Drawer.jsx`, `HeroTrail.jsx` (homepage hero
  animation, uses `react-spring`).
- `src/hooks/useTheme.js` is called from `Header.jsx` and passed down to
  `Drawer.jsx` — the toggle is live in both the desktop nav and the mobile
  drawer. It writes to `localStorage` and toggles the `.light`/`.dark`
  class on `#app-root` (all theme-scoped CSS keys off that class), plus
  sets `document.documentElement.style.backgroundColor` for the no-FOUC
  flash. The hook always initializes React state to `"dark"` (matching
  the SSR default in `BaseLayout.astro`) and only corrects to the stored
  value in a `useEffect` after mount — reading `localStorage` during the
  initial render would mismatch between server and client and break
  hydration. A no-FOUC inline script in `src/layouts/BaseLayout.astro`
  applies the stored theme class before hydration; the hook's first
  post-mount DOM-sync effect run is intentionally skipped (via a ref
  flag) so it doesn't stomp on that pre-hydration class with its own
  `"dark"`-default state before correcting itself.

## Skills

- `/add-entry` — add a new work/education/teaching card entry
- `/new-page` — scaffold a new static page
- `/adversarial-review` — run the frontend-developer + ui-ux-designer +
  qa agents over a diff, with QA adversarially verifying their findings

## Review agents

Invoke on demand for a change/PR/file — review only, they don't edit:

- `frontend-developer` — architecture, code quality, correctness, perf
- `ui-ux-designer` — visual/responsive/accessibility review (uses the
  browser preview tools against the running dev server)
- `qa` — bug hunting + adversarial verification of other agents' claims
