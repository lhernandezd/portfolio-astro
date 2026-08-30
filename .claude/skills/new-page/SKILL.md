---
description: Add a new section to the single-page site, or (rarely) scaffold a real new route.
---

This is a single-page site — [src/pages/index.astro](src/pages/index.astro)
holds every section (hero, About, Work, Education, Teaching). Adding new
content almost always means a new section on that page, not a new route.

## Adding a new section on the existing page (the common case)

1. Ask for the section name and anchor id (e.g. `projects` → `#projects`).
2. Add a new `<section id="...">` in `index.astro` following the existing
   sections' pattern: a `.section-label` (`... /Name ...`) + `<h2>` header.
3. If it needs its own nav entry, add the id to the `pages` array in
   [src/components/Header.jsx](src/components/Header.jsx) — it
   automatically shows in both the desktop nav and the mobile drawer as
   an anchor link.
4. If the section needs its own styles, add a new SCSS partial in
   `src/scss/_<name>.scss` and `@import` it from
   [src/scss/layout.scss](src/scss/layout.scss).
5. If the section is data-driven (a list of entries), put the data in
   `src/data/<name>.js` rather than inline in `index.astro` — see
   [.claude/skills/add-entry](../add-entry/SKILL.md).

## Scaffolding a real new route (rare — e.g. a future blog)

1. Ask for the route name (e.g. `blog` → `src/pages/blog.astro`) and page
   title (used for `<title>`/SEO via `BaseLayout`'s `title` prop).
2. Create `src/pages/<route>.astro` importing `BaseLayout` from
   `../layouts/BaseLayout.astro` and wrapping content in
   `<BaseLayout title="...">`.
3. This route won't be part of the anchor-nav automatically — decide with
   the user whether it needs a link in `Header.jsx` (as a real `href`, not
   an anchor) or is linked from elsewhere (e.g. a footer link).

Run `npm run check` and `npm run dev` to verify before finishing, either way.
