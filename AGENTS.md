# Leviathan — agent notes

An interactive reading of Thomas Hobbes' *Leviathan* (1651). Chapter text on
the right, navigation on the left, with hover tooltips that link terms in the
text to explanatory pages. Static site, no backend.

## Stack

- **Astro 7** (static output) + **@astrojs/mdx**, **Tailwind v4** via
  `@tailwindcss/vite` (no tailwind.config; theme tokens live in
  `src/styles/global.css` under `@theme`).
- **Bun** for everything (`bun install`, `bun run …`). Do not introduce npm
  or a `package-lock.json`.
- **Storybook 10** with `storybook-astro` (renders `.astro` files directly).
  Stories sit beside components: `src/components/X.stories.ts`.
- **Nix flake** (`flake.nix`, `outputs = inputs:` style, `mkShellNoCC`)
  provides `bun` and `process-compose`. `.envrc` is `use flake`.
- **process-compose.yaml** runs `install` → then `site` (port 3000) and
  `storybook` (port 6006) in parallel. Site must stay on 3000.

Commands: `bun run build`, `bun run build-storybook`, `bun run check`
(`astro check`; needs TypeScript 6.x), `process-compose up`.

## Deployment

- GitHub: `lucperkins/leviathan` (public). Netlify site
  `hobbes-leviathan-80f7c159` (project id in `.netlify/state.json`, which is
  gitignored) on the `lucperkins` Starter team; `netlify-cli` is in the dev
  shell and the machine has `NETLIFY_AUTH_TOKEN`.
- `.github/workflows/deploy.yml` builds and deploys on every push to `main`
  (production) and on PRs (preview alias); it uses the `NETLIFY_AUTH_TOKEN`
  and `NETLIFY_SITE_ID` repo secrets. `netlify deploy --build --prod` from
  the linked checkout also works for a manual deploy.
- The site is behind HTTP Basic Auth implemented as a Netlify edge function
  (`netlify/edge-functions/password.ts`, declared in `netlify.toml`). Any
  username; the password is the `SITE_PASSWORD` Netlify env var (set with
  `netlify env:set`, never committed). Netlify's native site password is a
  Pro-plan feature and the API rejects it on Starter, hence the function.


**Start and stop the dev servers only through process-compose** — never run
`bun run dev` / `bun run storybook` / `astro dev stop` / `pkill` directly.
`process-compose up --tui=false` (background it) to start; `process-compose
down` to stop; `process-compose process restart site` to bounce Astro
(`storybook` likewise). This keeps ownership of the processes in one place
and avoids stale servers on ports 3000/6006. If a port is held by something
process-compose does not own, report it rather than killing it.

## Content model (`src/content.config.ts`)

Three collections, all MDX under `src/content/`, loaded with `glob`:

| collection | path | frontmatter |
|---|---|---|
| `chapters` | `chapters/NN-slug.mdx` | `number`, `title`, `part` (one of `PARTS` in `src/lib/parts.ts`), `pullquotes?` |
| `concepts` | `concepts/slug.mdx` | `title`, `summary`, `terms?`, `chapters` (refs) |
| `authors`  | `authors/slug.mdx`  | same as concepts + `dates?` |
| `themes`   | `themes/slug.mdx`   | `title`, `summary`, `hobbes?`, `chapters` (refs), `concepts` (refs) |

`concepts` and `authors` are **ref collections**: each entry gets (a) a brief
`summary` shown in tooltips and (b) a full page at `/concepts/<id>/` or
`/authors/<id>/`. `terms` is the list of words to match in chapter text
(case-insensitive, whole word); it defaults to `[title]`, and `terms: []` turns
linking off for an entry whose title is too common a word (e.g. "good"). Adding a new ref
kind means touching `REF_KINDS` in the rehype plugin, `src/lib/refs.ts`,
`content.config.ts`, a `[id].astro` page, and a `ListNav` in the layout.

### Chapter text

Chapters are the Project Gutenberg text (ebook #3207), one file per chapter,
paragraphs unwrapped, Gutenberg's standalone marginal headings turned into
`###`. Those headings ("Memory", "Dreams", …) are Hobbes's own marginal
notes from the 1651 edition, not editorial additions. Chapter IX's table of
the sciences is hand-built as a nested list inside `<div class="science-table">`
(Gutenberg encodes it by indentation, which the extractor cannot parse). Only Chapters I–III are in so far; the rest are added deliberately,
not in bulk. Keep Hobbes' spelling; do not modernise.

Author pages: brief account of the author, then Hobbes' relationship to them
(what he took, what he rejected, with quotations from the text).

Theme pages (`/themes/<id>/`) are essays on broad topics that run through the
book (Christianity, violence, the state). They are distinct from concepts,
which elucidate what Hobbes means by a specific term; themes are **not**
tooltip-linked in chapter text. They link out to related concepts and
chapters via `RelatedLinks`. A blockquote from the book's unnumbered
introduction is attributed with a trailing `— Introduction` line.

Theme prose uses **modern spelling** ("commonwealth", "sovereign", "kingdom
of darkness"); Hobbes's spelling appears only inside quotations and quoted
titles. Where the theme's key term is spelled differently by Hobbes, set
`hobbes:` in the frontmatter (e.g. `Soveraignty`) and it is shown under the
title as "Hobbes's spelling: …". Concept pages keep Hobbes's spelling in their
titles, since they explain his terms.

## How the tooltips work

1. `src/plugins/rehype-concepts.mjs` runs on `content/chapters/*` only. It
   reads every ref collection's frontmatter (re-read on each transform) and
   wraps matching words in `<concept-ref data-kind="concept|author"
   data-concept="<id>">`. Skips headings, links, code, and existing refs.
2. `src/components/ConceptRefs.astro` (rendered on chapter pages) emits one
   `<template id="ref-<kind>-<id>">` per entry. The Alpine `conceptRef`
   component (attached by the plugin via `x-data`/`x-bind`) clones it on
   hover/focus/click, stays open over the tooltip, closes on Escape, and
   flips above when near the bottom of the viewport. The tooltip contains
   the summary and a link to the full page.
3. `src/integrations/ref-watch.mjs` (dev only) watches the ref directories
   through Vite's watcher and invalidates compiled chapter modules on
   add/remove/change so step 1 re-runs. Nothing external is needed for
   this — no watchexec, no restart.
4. `src/plugins/rehype-concept-headings.mjs` gives `h2–h4` on chapter, concept,
   and author pages ids and wraps them in self-links (`.heading-anchor`).
5. `src/plugins/rehype-pullquotes.mjs`: a chapter's frontmatter `pullquotes`
   (verbatim sentences) are set out as `<aside id="quote-N" class="pullquote">`
   after the paragraph containing them; the quote is a link to
   `?hl=…&to=…#pN`, which `quoteTarget` intercepts to highlight the
   sentence in place (no reload). Reserve these for the famous lines.
6. `src/plugins/rehype-chapter-paragraphs.mjs` numbers top-level paragraphs on
   chapter pages (`<p id="p7">`) and prefixes each with a light `¶7` self-link
   (`.para-num`, positioned in the left margin; excluded from highlighting), and `rehype-quote-sources.mjs` links
   quotations of Hobbes on concept/author pages to those paragraphs: every
   blockquote gets a "Leviathan, Chapter II ¶7" footer (full chapter title on hover), and
   inline `"…"` quotations of five or more words become links. Links look
   like `/chapters/<id>/?hl=<first six words>&to=<last six words>#p7`; the
   Alpine `quoteTarget` component on chapter pages finds that span in
   paragraph 7 (matching ignores case, punctuation, and tooltip wrappers),
   wraps the whole quotation in `<mark class="quote-hl">`, and scrolls there. Clicking a highlight
   removes it and strips `?hl=` from the URL. Done in JS rather
   than URL text fragments so it works and looks the same in every browser. Matching is by
   the first eight words of the quote against the chapter files on disk, so
   quote Hobbes verbatim (an ellipsis `…` may follow the opening words). For a
   quote from a chapter not yet loaded, end the blockquote with a line
   `— Chapter XVII`; it shows as a plain attribution and becomes a link once
   that chapter exists. Note Astro's smartypants turns `"` into curly quotes
   before rehype runs.

Hover timing is one token: `--default-transition-duration` (180ms) in the
`@theme` block, used by Tailwind's `transition-*` utilities and by the shared
transition rule for hand-written hover styles; the tooltip fades in on the
same duration. Don't hard-code other durations.

Styling for all of this is plain CSS at the bottom of `global.css`
(`concept-ref`, `.concept-tip*`, `.heading-anchor`, `.prose-chapter`).

## Layout and navigation

- `src/layouts/Layout.astro` fetches all collections and renders the sidebar:
  `SiteTitle`, `ChapterNav` (a top-level "The book" section with one nested
  section per `part`), then `ListNav` for Themes, Concepts, and Authors.
  Every group is a `NavSection` (`<details>`; `nested` for the parts), open/closed state
  persisted by Alpine `$persist` under `localStorage["leviathan:nav:<id>"]`;
  a pre-paint `is:inline` script applies it early. The section containing the
  current page is always forced open.
- Active link = `currentPath` (normalised with trailing slash) equals the
  item href. Pages do not pass a `current` prop.
- `Lightbox` wraps an `astro:assets` image in a button that opens the
  full-size file in a native `<dialog>` (Alpine `lightbox`); used for the
  frontispiece on the home page.
- Favicon: `public/favicon.svg` (sword and crozier crossed under a crown,
  after the frontispiece) plus PNG renders `favicon-32.png` and
  `apple-touch-icon.png` made with sharp.
- `BackButton` sits at the top of every page except the home page: `history.back()` if
  the referrer is same-origin, otherwise a link to `/`.
- Every chapter, concept, author, and theme page ends with `PrevNext` (chapters by
  number; concepts and authors alphabetically, matching the sidebar).
- Dark mode is class-based (`@custom-variant dark` in `global.css`, `.dark`
  on `<html>`). `ThemeToggle` (bottom-left of the sidebar) drives the Alpine
  `theme` component: `leviathan:theme` persisted as `"light"`/`"dark"`, or
  null to follow the system; a pre-paint script in `Layout.astro` `<head>`
  applies it. Use `dark:` variants in templates; hand-written CSS gets
  `.dark …` overrides at the bottom of `global.css`.
- Reading column: `max-w-2xl`, serif (`--font-serif` in `global.css`),
  `pb-32` bottom padding on `<main>`.

## Conventions

- **Sentence case** for everything that is not Hobbes's own text: entry
  titles ("The state", not "The State"), `###` headings, UI labels, link
  text. Chapter titles, part names, and quoted phrases keep the book's
  capitalisation and spelling (e.g. "Of Common-wealth", "Kingdome of
  Darknesse").
- Only hyphenate compound adjectives when needed to avoid ambiguity
  ("early modern", not "early-modern").
- In "not X but Y" contrasts always write "but rather Y" ("not qualities of
  things but rather names"); "not only X but also Y" keeps "also".
- Periods and commas go inside closing quotation marks ("fair" and "foul.");
  semicolons and colons stay outside. Hobbes's own quoted text is never
  altered to fit this.

- Components take plain data as props (no `getCollection` inside components)
  so they render in Storybook. Add a story for every new component.
- **All interactivity is Alpine.js.** Components are registered in
  `src/alpine.ts` (loaded everywhere by `@astrojs/alpinejs`, and in Storybook
  by `.storybook/alpine.ts` via the framework `scripts` option). Use
  `x-data`/`x-on:`/`x-bind:` in templates; for markup generated by rehype
  use `x-data="name" x-bind="nameEvents"` with `Alpine.bind` so no `@`/`:`
  attribute names have to survive MDX. The only non-Alpine script is the
  pre-paint `is:inline` block in `Layout.astro` that applies persisted
  accordion state before Alpine boots. No React/Vue/etc.
- No custom keyboard shortcuts: Cmd+[ / Cmd+] were tried for prev/next and
  removed because they shadow the browser's back/forward. Leave them alone.
- Verify with `bun run build` and `bun run build-storybook`; grep `dist/`
  for the expected markup rather than assuming.
- Git is initialised but nothing is committed; stage with `git add -A` so
  the flake sees new files. Commit only when asked.
- The chapter extraction script is not in the repo yet (it lived in a
  scratchpad); if it is added, put it at `scripts/extract-chapters.ts`.
