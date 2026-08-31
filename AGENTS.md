# Leviathan — agent notes

An interactive reading of Thomas Hobbes's *Leviathan* (1651). Chapter text on
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
(`astro check`; needs TypeScript 6.x), `bun run check:links`, `process-compose up`.

`check:links` (`scripts/check-links.mjs`) reads the built `dist/` and checks
every internal href and src: that the page exists, and that a `#fragment`
names an id on it. It is a Bun script rather than htmltest so that it runs the
same way in the dev shell and in CI, which has bun and nothing else; it runs
after `build` in the deploy workflow. External links are skipped — the point
is the several thousand internal ones the rehype plugins generate.

## Deployment

- GitHub: `lucperkins/leviathan` (public). Netlify site
  `hobbes-leviathan-80f7c159` (project id in `.netlify/state.json`, which is
  gitignored) on the `lucperkins` Starter team; `netlify-cli` is in the dev
  shell and the machine has `NETLIFY_AUTH_TOKEN`.
- `.github/workflows/deploy.yml` builds and deploys on every push to `main`
  (production) and on PRs (preview alias); it uses the `NETLIFY_AUTH_TOKEN`
  and `NETLIFY_SITE_ID` repo secrets. `netlify deploy --build --prod` from
  the linked checkout also works for a manual deploy.
- No password (removed 2026-08-29; Netlify's native site password needs a
  Pro team, and the interim edge function was dropped). Instead the site asks
  not to be crawled: `public/robots.txt` disallows everything, `netlify.toml`
  sets `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` on every
  response, and `Layout.astro` carries a matching `<meta name="robots">`.
  These are requests, not enforcement.


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
| `authors`  | `authors/slug.mdx`  | same as concepts + `dates?`, `sortName?` (surname; defaults to the title's last word — authors sort by it in the sidebar and prev/next) |
| `themes`   | `themes/slug.mdx`   | `title`, `summary`, `hobbes?`, `chapters` (refs), `concepts` (refs) |
| `works`    | `works/slug.mdx`    | `title`, `dates`, `year` (sort key), `summary`, `chapters`/`concepts`/`themes` (refs) |
| `kindred`  | `kindred/slug.mdx`  | same as `works`; `year` is a birth year, negative for BC |
| `readings` | `readings/slug.mdx` | `title`, `summary`, `chapters`/`concepts`/`themes` (refs) |

Every collection also takes `footnotes` (`after` is matched in the text, the
note collected at the foot; see `rehype-footnotes.mjs`). The marker is placed
after any punctuation that follows the match, and the note's number links back
to it. Notes about people end with a pointer to `/thinkers/`, said accurately:
"Listed among the people Hobbes names" for those on that page, "Not among…"
for contemporaries like Bramhall, Wallis, and Cromwell who are not in the book.

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
not in bulk. Keep Hobbes's spelling; do not modernise.

Author pages: brief account of the author, then Hobbes's relationship to them
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
4. `src/plugins/rehype-chapter-links.mjs`: on concept/author/theme pages,
   prose mentions like "Chapter XVII" or "Chapters XIV and XV" are rewritten
   to arabic numerals (matching the sidebar) and linked to the chapter page
   when it is loaded. Write chapter numbers in prose however you like (roman
   or arabic); the reader always sees "Chapter 17". Quote footers use arabic
   too. Part numbers stay roman ("Part III").
5. `src/plugins/rehype-concept-headings.mjs` gives `h2–h4` on chapter, concept,
   and author pages ids and wraps them in self-links (`.heading-anchor`).
5. `src/plugins/rehype-pullquotes.mjs`: a chapter's frontmatter `pullquotes`
   (verbatim sentences) are set out as `<aside id="quote-N" class="pullquote">`
   after the paragraph containing them; the quote is a link to
   `?hl=…&to=…#pN`, which `quoteTarget` intercepts to highlight the
   sentence in place (no reload). Reserve these for the famous lines.
6. `src/plugins/rehype-chapter-paragraphs.mjs` numbers top-level paragraphs on
   chapter pages (`<p id="p7">`) and prefixes each with a light `¶7` self-link
   (`.para-num`, positioned in the left margin; excluded from highlighting), and `rehype-quote-sources.mjs` links
   quotations of Hobbes on concept, author, theme, and Hobbes-himself pages to those paragraphs: every
   blockquote gets a "Leviathan, Chapter 2 ¶7" footer (full chapter title on hover), and
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

## The apparatus pages

- `/definitions/` has the two hand-built SVG figures (`src/diagrams/`) and,
  below them, the walkable chain: `src/lib/definitions.ts` holds each term's
  defining sentence with its borrowings marked inline as `{word|id}`, and
  `derivation()` computes what a term rests on. The page's `DEFINED` map merges
  that data with the ids that exist only in the figures. Adding a term means
  editing one entry; the edges follow.
- `/thinkers/` is generated from `src/lib/thinkers.mjs`. `mentions` is
  hand-verified in context, so it cannot be generated, but it is checked:
  `src/lib/mentions.mjs` counts the `tokens` across the chapter text and the
  page warns unless `mentions + excluded` matches. Editing a chapter that names
  someone will fail loudly there.
- `/scripture/` links verses to Wikisource's King James text (public domain,
  with `#Chapter_N` and `#C:V` anchors), not to a commercial Bible site.
- Sidelights are the `Sidelight` component: a carded aside for a modern rhyme
  with the text (Deleuze on desire, Ryle on spirit, Mandeville's bees). The
  register is for resemblances, not descents — nobody in one is claimed to
  have read Hobbes; claimed descents belong on `/ancestor/`. Keep them rare:
  one on a page, and only where the rhyme is exact.
- `/frontispiece/` is the 1651 engraving as a diagram: `FrontispieceMap`
  lays invisible buttons over the plate from the region data in
  `src/lib/frontispiece.ts` (percent coordinates, calibrated against a grid
  overlay), reusing the `hobbesMap` Alpine component for the pinned/hover
  behaviour. One note shows at a time beside the plate.
- `/latin/` and `/greek/` gloss the foreign vocabulary, from `src/lib/latin.mjs`
  and `src/lib/greek.mjs`: a headword, a literal translation, a paragraph of
  gloss, and the places Hobbes uses it. `src/lib/glossary.mjs` locates those in
  the chapter text at build time the way the quote sources are, and warns for a
  term found nowhere; `Glossary.astro` renders both. An entry's `find` is a
  locator and may be narrower than the headword, as with "Circumscriptive"
  where "Definitive" alone would also catch Chapter 42's "sentence definitive".
  Each page ends with the words a reader expects and will not find. The Hebrew
  and Aramaic are a group at the foot of `/greek/` rather than a page: there is
  little of it and it mostly arrives through the Septuagint.
- `/ancestor/` lists the disciplines that claim Hobbes as a founder — social
  science, legal positivism, AI, game theory — each with the passage it rests
  on, so the claim can be weighed against the text. Data in
  `src/lib/ancestry.mjs`, rendered by the same `Shelves` component as the
  reading lists.
- `/further-reading/` is the one appendix page not generated from the text: a
  short reading list in `src/lib/library.mjs`, each entry described by what it
  claims. Entries have stable `id` anchors so pages can link to a book.
- `/receptions/` is the same afterlife cut by place rather than by school:
  what Britain, France, Germany, America and Italy each did with him, and why
  each wanted him when it did. Same schema and same footnote convention as
  `/readings/`, and the two cross-link — Schmitt is a totalitarian reading and
  a German reception, and the pages should say different things about him.
- `/readings/` is the schools that have taken the book up — feminist, marxist,
  social scientific, post-colonial, libertarian, totalitarian, materialist.
  These pages are about the scholarship, so the people are footnoted rather
  than linked inline: a footnote carries the dates, the book and the link,
  and the prose stays readable.
- `/kindred/` is the thinkers Hobbes resembles rather than answers, in the
  order they lived. Distinct from `/touchstones/`, who are the people he
  argues with inside the book; the two overlap only in that most of the
  kindred are on the `/thinkers/` list of surprising omissions. Each page is
  shaped: where they agree, where they part, whether he read them.
- `/works/` is his other nine books, in the order he wrote them (`year`).
  Brisk pages: what each is, what it does that *Leviathan* does not, and where
  the same argument sits in *Leviathan*.
- `/hobbes/` runs in `order`: life, career, character, faith, contemporaries,
  impact. The life page carries `HobbesMap`, whose coastline is projected from
  Natural Earth at build time into `src/lib/map.ts` — no map library, nothing
  fetched at runtime.

## Layout and navigation

- `src/layouts/Layout.astro` fetches all collections and renders the sidebar:
  `SiteTitle`, `ChapterNav` (a top-level "The book" section with one nested
  section per `part`), then `ListNav` for Themes, Concepts, and Authors.
  Every group is a `NavSection` (`<details>`; `nested` for the parts), open/closed state
  persisted by Alpine `$persist` under `localStorage["leviathan:nav:<id>"]`;
  a pre-paint `is:inline` script applies it early. The section containing the
  current page is always forced open. The sidebar's scroll offset is kept in
  `sessionStorage["leviathan:nav-scroll"]` (Alpine `navScroll` saves it; the
  same pre-paint script restores it) so the nav stays put between pages.
- Active link = `currentPath` (normalised with trailing slash) equals the
  item href. Pages do not pass a `current` prop.
- `Lightbox` wraps an `astro:assets` image in a button that opens the
  full-size file in a native `<dialog>` (Alpine `lightbox`); used for the
  frontispiece on the home page.
- Favicon: `public/favicon.svg` (sword and crozier crossed under a crown,
  after the frontispiece) plus PNG renders `favicon-32.png` and
  `apple-touch-icon.png` made with sharp.
- `ResumeReading` on the home page links back to wherever the reader left off.
  Chapter pages record it (`readingPosition`, the paragraph nearest the top of
  the viewport) in `localStorage["leviathan:reading"]`; the button starts hidden
  and appears only when a position exists.
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
- Marginalia are on Chapters 15, 21, 30, 42, 44, and 46. The plugin warns when
  a `heading` does not match, so a mistyped heading fails the same way.
- The chapter extraction script is not in the repo yet (it lived in a
  scratchpad); if it is added, put it at `scripts/extract-chapters.ts`.

## Mobile

Below `desk` (60rem) the sidebar becomes a drawer. That breakpoint is defined
in `global.css` rather than reused from Tailwind's `md`, because an iPad in
portrait is 820px and at `md` it fell on the desktop side, giving a quarter of
a narrow screen to navigation. There is also a `touch` variant
(`@media (hover: none)`) for anything that depends on there being a pointer,
which is a sounder test than any width. `Layout.astro` renders a
fixed navbar (`md:hidden`) carrying the title, a drawer toggle, and a theme
toggle; the `<aside>` is `fixed … -translate-x-full` until the Alpine
`navDrawer` component opens it, with a scrim behind and the document scroll
locked while it is open. Escape closes it. The theme lives in an Alpine
**store** rather than a component precisely because two toggles are on the
page at once below that breakpoint and have to agree.

`<main>` drops to `px-5 pt-20` to clear the navbar, and `.para-num` floats
inline instead of sitting outside the column, which it cannot do once the
column reaches the screen edge.

## TODO

- **Make the site mobile-friendly.** Mostly done, see above. What is left:
  - The derivation diagrams on `/definitions/` set `min-width: 40rem` inside
    an `overflow-x-auto` container. They scroll rather than break, but the
    hover-to-trace interaction has no touch equivalent.
  - Already handled and worth keeping that way: `.margin-note` falls back to
    an inline block below `82rem`, and the `/contents/` chapter grid drops to
    one column below `48rem`.
  - Check the lightbox dialog and the `/scripture/` reference rows, which
    wrap but have not been looked at on a small screen.

- **Glossaries of the other languages.** Hobbes writes in English but argues
  in Latin, quotes Greek, and drops Hebrew where the scripture needs it. Done,
  except that nothing here indexes the chapter titles' echoes of *De Cive*.
  - *Latin*: done, at `/latin/`. 28 entries in `src/lib/latin.mjs`, grouped by
    what the word is doing, plus three famous tags that are not in the book
    (`Bellum omnium contra omnes` is De Cive, `Auctoritas non veritas facit
    legem` is the 1668 Latin Leviathan, and the frontispiece motto is on the
    picture). Each entry's `find` is matched against the chapter paragraphs at
    build time, so a phrase that is not there warns rather than lies; `find`
    may be narrower than the headword where a word has a second sense
    ("sentence definitive" in Chapter 42).
  - *Greek*: done, at `/greek/`. 37 entries, five groups of Greek and one of
    Hebrew and Aramaic at the end. More than the Latin, and mostly etymology
    rather than terms of art.
  - *French*: no. Two words in one sentence of Chapter 4 (`Parole`, `Verbe`,
    illustrating that Latin and French differ less than the schools pretend)
    and one Spanish (`Varones`, Chapter 10). Not a page.
  Both glossaries share `src/lib/glossary.mjs` and `Glossary.astro`, so a third
  list would be data and a thin page.

- **The book's impact, and the main lines of interpretation.** Nothing on the
  site yet covers what happened to *Leviathan* after 1651 or how it has been
  read since. Two related pieces:
  - *Impact*: written, at `/hobbes/impact/`. What remains is the interpretations
    half. The original note follows.
  - *Impact*: the reception (the 1666 Commons committee on atheism and
    profaneness, the 1683 Oxford burning), and the afterlife in Spinoza,
    Locke, Rousseau, Bentham, Schmitt, and modern game-theoretic readings.
    Some of this already sits in `themes/contractarianism.mdx`, which the new
    page should link to rather than repeat.
  - *Interpretations*: the standing disagreements — whether Hobbes is an
    egoist or a natural-law theorist (the Taylor–Warrender thesis), whether
    the religion of Parts III and IV is sincere or tactical (already opened in
    `hobbes/faith.mdx`), Skinner's contextual reading against Strauss's, and
    what "absolutism" does and does not commit him to.
  - Shape is undecided: a theme page, a new top-level section beside
    `/thinkers/`, or two pages. Themes are essays on topics inside the book,
    so a reception essay may not belong in that collection.
