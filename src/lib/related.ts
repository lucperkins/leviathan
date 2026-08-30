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

/**
 * Titles sort as though a leading article were not there, so "The English
 * Civil War" files under E and "The state of nature" under S. Used for the
 * themes, which are the only collection whose titles start with "The".
 */
export const titleSortKey = (title: string) => title.replace(/^the\s+/i, "");

export const themeSortKey = (t: CollectionEntry<"themes">) => titleSortKey(t.data.title);

/** Themes in sidebar order. */
export const sortThemes = (themes: CollectionEntry<"themes">[]) =>
  [...themes].sort((a, b) => themeSortKey(a).localeCompare(themeSortKey(b)));

/** Touchstones sort by surname: `sortName` if given, else the last word of the title. */
export const touchstoneSortKey = (a: CollectionEntry<"touchstones">) =>
  a.data.sortName ?? a.data.title.trim().split(/\s+/).at(-1)!;

export const sortTouchstones = (touchstones: CollectionEntry<"touchstones">[]) =>
  [...touchstones].sort((x, y) => touchstoneSortKey(x).localeCompare(touchstoneSortKey(y)));

export const themeLink = (t: CollectionEntry<"themes">) => ({
  href: `/themes/${t.id}/`,
  label: t.data.title,
});

/** Related themes: alphabetical, matching the sidebar. */
export const themeLinks = (themes: CollectionEntry<"themes">[]) => sortThemes(themes).map(themeLink);
