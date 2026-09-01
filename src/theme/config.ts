/**
 * The contract between the theme and the site that uses it.
 *
 * Theme code imports the site's values from `src/site.config.ts` (one fixed
 * relative path); a site adopts the theme by copying `src/theme/` and writing
 * its own `src/site.config.ts` exporting a `SiteConfig` as its default. See
 * src/theme/README.md for the full contract.
 */

/** One entry in a sidebar list. `sort` overrides the ordering key (default: title). */
export interface NavItemData {
  id: string;
  title: string;
  sort?: string;
}

/** A sidebar section backed by a content collection, rendered as a ListNav. */
export interface SectionConfig {
  /** NavSection persist id, and the key into `icons`. */
  id: string;
  title: string;
  /** URL prefix, e.g. "/themes"; the section's index page lives at `${basePath}/`. */
  basePath: string;
  /** astro:content collection name. Content lives at `src/content/<collection>`. */
  collection: string;
  /** Maps a collection entry to its sidebar item. */
  item: (entry: { id: string; data: Record<string, any> }) => NavItemData;
}

/** A content collection whose entries get hover tooltips in the primary text. */
export interface RefKindConfig {
  /** The `data-kind` value on <concept-ref> elements, e.g. "concept". */
  kind: string;
  /** astro:content collection name; content lives at `src/content/<collection>`. */
  collection: string;
  /** URL prefix for the full pages, e.g. "/concepts". */
  basePath: string;
  /** Key into `icons` for the mark shown at the head of the tooltip. */
  icon: string;
}

/** The primary text: the one collection read in sequence, with numbered paragraphs. */
export interface TextConfig {
  /** astro:content collection name; content lives at `src/content/<collection>`. */
  collection: string;
  /** URL prefix for unit pages, e.g. "/chapters". */
  basePath: string;
  /** NavSection persist id (and `icons` key) for the sidebar's book section. */
  navId: string;
  /** The sidebar's heading for the text, e.g. "The book". */
  navTitle: string;
  /** What a unit is called in prose and labels, e.g. "Chapter". Pluralised with "s". */
  unitWord: string;
  /** The work's name, used in quotation footers: "<workTitle>, Chapter 2 ¶7". */
  workTitle: string;
  /** A hand-built table of contents page, listed first in the book section. */
  contents?: { href: string; title: string };
  /** Unit the resume-reading button falls back to before a position is saved. */
  firstUnitId: string;
  /** Eyebrow for units with no division and number ≤ 0 / > 0. */
  frontMatterLabel: string;
  backMatterLabel: string;
  /** The work's ordered divisions ("parts"); a unit's `part` frontmatter must match one. */
  divisions: readonly string[];
  /** Landing page for a division; when given, division titles in the sidebar link there. */
  divisionHref?: (title: string) => string;
}

/** The editorial-apparatus section of the sidebar: hand-built pages, not a collection. */
export interface ApparatusConfig {
  /** NavSection persist id, and the key into `icons`. */
  id: string;
  title: string;
  indexHref?: string;
  /** Each id is a top-level route: { id: "latin" } links to "/latin/". */
  items: { id: string; title: string }[];
}

export interface SiteConfig {
  /** The site name: browser title suffix, masthead, mobile navbar. */
  title: string;
  /** Line under the masthead title, e.g. the author and date. */
  subtitle?: string;
  /** <html lang>. */
  lang: string;
  /** <meta name="robots"> content; omit for no robots meta at all. */
  robots?: string;
  /** Namespace for localStorage/sessionStorage keys, e.g. the site's name. */
  storagePrefix: string;
  text: TextConfig;
  /** Sidebar sections between the book and the apparatus, in order. */
  sections: SectionConfig[];
  apparatus?: ApparatusConfig;
  refKinds: RefKindConfig[];
  /**
   * Collections whose prose gets the editorial treatment: heading anchors,
   * unit-mention links, and quotation links back into the primary text.
   */
  essayCollections: string[];
  /**
   * Sidebar section marks, keyed by section id: SVG path `d` strings for a
   * 16×16 box, stroked with currentColor.
   */
  icons: Record<string, string[]>;
}
