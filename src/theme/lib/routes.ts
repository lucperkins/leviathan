import { neighbours } from "./sequence";

/**
 * getStaticPaths routes for a collection's entry pages: one route per entry,
 * with the entry and its prev/next neighbours (in the order given, which
 * should match the sidebar's) as props. Used with the EntryPage component.
 */
export function entryRoutes<T extends { id: string; data: { title: string } }>(
  entries: T[],
  basePath: string,
) {
  return entries.map((entry, i) => ({
    params: { id: entry.id },
    props: {
      entry,
      ...neighbours(entries, i, (e) => ({ href: `${basePath}/${e.id}/`, title: e.data.title })),
    },
  }));
}
