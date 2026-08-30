import type { CollectionEntry } from "astro:content";

export const chapterLink = (ch: CollectionEntry<"chapters">) => ({
  href: `/chapters/${ch.id}/`,
  label: `Chapter ${ch.data.number}: ${ch.data.title}`,
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
