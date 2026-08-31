/**
 * Titles sort as though a leading article were not there, so "The English
 * Civil War" files under E and "The state of nature" under S.
 */
export const titleSortKey = (title: string) => title.replace(/^the\s+/i, "");

/** People sort by surname: `sortName` if given, else the last word of the title. */
export const surnameSortKey = (title: string, sortName?: string) =>
  sortName ?? title.trim().split(/\s+/).at(-1)!;
