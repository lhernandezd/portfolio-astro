---
description: Add a new work, project, education, or teaching entry to the portfolio.
---

Add a new entry to one of the data-driven sections on the single page
([src/pages/index.astro](src/pages/index.astro)).

1. Ask which section: work ([src/data/work.js](src/data/work.js) — a
   timeline row, no card, real employment only), projects
   ([src/data/projects.js](src/data/projects.js) — a card with a live
   link and tech tags, for freelance/personal work), education
   ([src/data/education.js](src/data/education.js)), or teaching
   ([src/data/teaching.js](src/data/teaching.js), reuses the work/teaching
   card shape).
2. Ask for the fields needed for that shape:
   - Work entries (timeline only — see the "Work vs. Projects" note in
     `CLAUDE.md` before adding a job here): `dateString`, `company`,
     `role`, `techStack: [...]`
   - Project entries: `title`, `link`, `year`, `description`,
     `techStack: [...]`
   - Teaching entries: `title`, `dateString`, `company: { name, link }`
     (omit `company` entirely for an "in development" entry), `description`,
     `list: { title, items: [...] }`
   - Education entries: `title`, `dateString`, `description`,
     `education: { title, link }`
3. Add the new object to the relevant array in that data file, matching
   existing ordering (most recent first) — don't touch
   `WorkCard.astro`/`ProjectCard.astro`/`EducationCard.astro`, they're
   generic and already handle any entry shaped this way.
4. Run `npm run check` and `npm run dev` to verify the new entry renders
   correctly before finishing.
