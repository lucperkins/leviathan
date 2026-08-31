import type { CollectionEntry } from "astro:content";
import { surnameSortKey, titleSortKey } from "../theme/lib/sort";

export { titleSortKey };

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

export const themeSortKey = (t: CollectionEntry<"themes">) => titleSortKey(t.data.title);

/** Themes in sidebar order: alphabetical, ignoring a leading "The". */
export const sortThemes = (themes: CollectionEntry<"themes">[]) =>
  [...themes].sort((a, b) => themeSortKey(a).localeCompare(themeSortKey(b)));

/** Touchstones sort by surname: `sortName` if given, else the last word of the title. */
export const touchstoneSortKey = (a: CollectionEntry<"touchstones">) =>
  surnameSortKey(a.data.title, a.data.sortName);

export const sortTouchstones = (touchstones: CollectionEntry<"touchstones">[]) =>
  [...touchstones].sort((x, y) => touchstoneSortKey(x).localeCompare(touchstoneSortKey(y)));

export const themeLink = (t: CollectionEntry<"themes">) => ({
  href: `/themes/${t.id}/`,
  label: t.data.title,
});

/** Related themes: alphabetical, matching the sidebar. */
export const themeLinks = (themes: CollectionEntry<"themes">[]) => sortThemes(themes).map(themeLink);

export const contextLink = (c: CollectionEntry<"context">) => ({
  href: `/context/${c.id}/`,
  label: c.data.title,
});

/** Related context: in reading order, matching the sidebar. */
export const contextLinks = (context: CollectionEntry<"context">[]) =>
  [...context].sort((a, b) => a.data.order - b.data.order).map(contextLink);
