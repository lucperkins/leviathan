import type { CollectionEntry } from "astro:content";

export const chapterLink = (ch: CollectionEntry<"chapters">) => ({
  href: `/chapters/${ch.id}/`,
  label: ch.data.part ? `Chapter ${ch.data.number}: ${ch.data.title}` : ch.data.title,
});

/** "Read in Leviathan" lists: chapters in book order regardless of frontmatter order. */
export const chapterLinks = (chapters: CollectionEntry<"chapters">[]) =>
  [...chapters].sort((a, b) => a.data.number - b.data.number).map(chapterLink);

/** Related concepts: alphabetical, matching the sidebar. */
export const conceptLinks = (concepts: CollectionEntry<"concepts">[]) =>
  [...concepts].sort((a, b) => a.data.title.localeCompare(b.data.title)).map(conceptLink);

export const conceptLink = (c: CollectionEntry<"concepts">) => ({
  href: `/concepts/${c.id}/`,
  label: c.data.title,
});

/** Interlocutors sort by surname: `sortName` if given, else the last word of the title. */
export const interlocutorSortKey = (a: CollectionEntry<"interlocutors">) =>
  a.data.sortName ?? a.data.title.trim().split(/\s+/).at(-1)!;

export const sortInterlocutors = (interlocutors: CollectionEntry<"interlocutors">[]) =>
  [...interlocutors].sort((x, y) => interlocutorSortKey(x).localeCompare(interlocutorSortKey(y)));

export const themeLink = (t: CollectionEntry<"themes">) => ({
  href: `/themes/${t.id}/`,
  label: t.data.title,
});

/** Related themes: alphabetical, matching the sidebar. */
export const themeLinks = (themes: CollectionEntry<"themes">[]) =>
  [...themes].sort((a, b) => a.data.title.localeCompare(b.data.title)).map(themeLink);
