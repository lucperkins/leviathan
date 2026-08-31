/**
 * Everything Leviathan-specific that the theme needs to know: the site's name,
 * the shape of the primary text, the sidebar taxonomy, the ref kinds that get
 * tooltips, and the apparatus pages. The theme (src/theme/) reads this module
 * and nothing else of the site's; see src/theme/README.md for the contract.
 */
import type { SiteConfig } from "./theme/config";
import { surnameSortKey, titleSortKey } from "./theme/lib/sort";

const config: SiteConfig = {
  title: "Leviathan",
  subtitle: "Thomas Hobbes, 1651",
  lang: "en",
  robots: "noindex, nofollow, noarchive",
  storagePrefix: "leviathan",

  text: {
    collection: "chapters",
    basePath: "/chapters",
    navId: "book",
    navTitle: "The book",
    unitWord: "Chapter",
    workTitle: "Leviathan",
    contents: { href: "/contents/", title: "Contents" },
    firstUnitId: "the-epistle-dedicatory",
    frontMatterLabel: "Front matter",
    backMatterLabel: "Back matter",
    /** The four parts of Leviathan, in order. Chapter frontmatter `part` must match a title here. */
    divisions: ["Of Man", "Of Common-wealth", "Of a Christian Common-wealth", "Of the Kingdome of Darknesse"],
  },

  sections: [
    { id: "themes", title: "Themes", basePath: "/themes", collection: "themes",
      item: (t) => ({ id: t.id, title: t.data.title, sort: titleSortKey(t.data.title) }) },
    { id: "concepts", title: "Concepts", basePath: "/concepts", collection: "concepts",
      item: (c) => ({ id: c.id, title: c.data.title }) },
    { id: "touchstones", title: "Touchstones", basePath: "/touchstones", collection: "touchstones",
      item: (a) => ({ id: a.id, title: a.data.title, sort: surnameSortKey(a.data.title, a.data.sortName) }) },
    { id: "kindred", title: "Kindred spirits", basePath: "/kindred", collection: "kindred",
      item: (k) => ({ id: k.id, title: k.data.navTitle ?? k.data.title, sort: String(k.data.year + 1000).padStart(5, "0") }) },
    // The section is called Readings, so the entries do not each repeat the word:
    // "Feminist readings" is listed as "Feminist".
    { id: "readings", title: "Readings", basePath: "/readings", collection: "readings",
      item: (r) => {
        const short = r.data.title.replace(/ readings$/i, "");
        return { id: r.id, title: short, sort: titleSortKey(short) };
      } },
    { id: "receptions", title: "Receptions", basePath: "/receptions", collection: "receptions",
      item: (r) => ({ id: r.id, title: r.data.title, sort: titleSortKey(r.data.title) }) },
    { id: "context", title: "Context", basePath: "/context", collection: "context",
      item: (c) => ({ id: c.id, title: c.data.title, sort: String(c.data.order) }) },
    { id: "hobbes", title: "Hobbes himself", basePath: "/hobbes", collection: "hobbes",
      item: (h) => ({ id: h.id, title: h.data.title, sort: String(h.data.order) }) },
    { id: "works", title: "Other works", basePath: "/works", collection: "works",
      item: (w) => ({ id: w.id, title: w.data.title, sort: String(w.data.year) }) },
  ],

  /** Editorial apparatus rather than a content collection. */
  apparatus: {
    id: "appendix",
    title: "Appendix",
    indexHref: "/appendix/",
    items: [
      { id: "frontispiece", title: "The frontispiece" },
      { id: "definitions", title: "The chain of definitions" },
      { id: "scripture", title: "Scriptural references" },
      { id: "latin", title: "Latin glossary" },
      { id: "greek", title: "Greek glossary" },
      { id: "thinkers", title: "Thinkers named" },
      { id: "further-reading", title: "Further reading" },
      { id: "after-hobbes", title: "After Hobbes" },
      { id: "ancestor", title: "Disciplinary legacy" },
    ],
  },

  /** Content collections whose entries get hover tooltips in chapter text. */
  refKinds: [
    { kind: "concept", collection: "concepts", basePath: "/concepts", icon: "concepts" },
    { kind: "touchstone", collection: "touchstones", basePath: "/touchstones", icon: "touchstones" },
  ],

  /** Every essay collection gets heading anchors, chapter links, and quotation links. */
  essayCollections: ["concepts", "touchstones", "themes", "context", "hobbes", "readings", "receptions", "kindred", "works"],

  /**
   * Sidebar section marks. Drawn in the same idiom as the buttons on the home
   * page, which point at the same places.
   */
  icons: {
    book: ["M8 4.4C7 3.5 5.4 3.1 3 3.3v9c2.4-.2 4 .2 5 1.1 1-.9 2.6-1.3 5-1.1v-9c-2.4-.2-4 .2-5 1.1Z", "M8 4.4v9"],
    themes: ["M8 2.2a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6Z", "m10.4 5.6-1.5 3.3-3.3 1.5 1.5-3.3Z"],
    readings: ["M3.5 3.4h9v9.2h-9Z", "M6 6.2h4M6 8.4h4M6 10.6h2.4", "M13.4 5.2v9.4H4.6"],
    concepts: ["M2.8 4.2h5.4L12.6 8l-4.4 3.8H2.8Z", "M9.9 6.3h.01"],
    touchstones: ["M6 6.3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z", "M11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z", "M2.4 13.4c.5-2 1.8-3 3.6-3 1 0 1.9.3 2.5.9", "M8.9 13.4c.3-1.4 1.1-2.1 2.4-2.1.9 0 1.5.3 2 .9"],
    kindred: ["M6.1 3.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Z", "M9.9 3.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Z"],
    receptions: ["M2.6 8a5.4 5.4 0 1 0 10.8 0 5.4 5.4 0 0 0-10.8 0Z", "M8 2.6c1.7 1.5 2.6 3.3 2.6 5.4S9.7 12 8 13.4C6.3 12 5.4 10.1 5.4 8S6.3 4.1 8 2.6Z", "M2.9 6.2h10.2M2.9 9.8h10.2"],
    context: ["M4.7 2.7h6.6M4.7 13.3h6.6", "M5.5 2.7c0 2.9 2.5 3.7 2.5 5.3 0 1.6-2.5 2.4-2.5 5.3M10.5 2.7c0 2.9-2.5 3.7-2.5 5.3 0 1.6 2.5 2.4 2.5 5.3"],
    hobbes: ["M8 3.1a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z", "M3.7 13.3c.7-2.3 2.2-3.5 4.3-3.5s3.6 1.2 4.3 3.5"],
    works: ["M3 3.6h3.6v8.8H3Z", "M7.6 3.6h3.6v8.8H7.6Z", "M2.2 13.8h11.6"],
    appendix: ["M4 2.6h5.6L12.4 5.4v8H4Z", "M9.4 2.6v2.6h2.8", "M6.1 8.4h4.2M6.1 10.6h2.6"],
  },
};

export default config;
