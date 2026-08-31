import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * The primary text as it is on disk: units (chapters), their paragraphs, and
 * the machinery for locating a quotation in them. Shared by the quote-source
 * and pullquote plugins, the glossary index, and the site's apparatus pages,
 * so they all agree on what counts as a paragraph and where a quote lives.
 */

/** Content collections live under src/content, one directory per collection. */
export const contentDir = (collection) => `src/content/${collection}`;

export const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export const fromRoman = (s) => {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const a = v[s[i]], b = v[s[i + 1]] ?? 0;
    n += a < b ? -a : a;
  }
  return n;
};

/**
 * A unit's body split into the paragraphs that rehype-chapter-paragraphs
 * numbers, in the same order, with the text left as written. Headings, lists,
 * and bold-only display lines are not paragraphs and get no number.
 */
export function unitParagraphs(content) {
  return content
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b && !/^(#|[-*]\s|\d+[.)]\s|<|>)/.test(b) && !/^\*\*[^*]+\*\*$/.test(b))
    .map((b) => b.replace(/\n/g, " "));
}

/**
 * The units of the primary text as they are on disk, with paragraphs as
 * written, in the same order (and therefore the same index) that
 * rehype-chapter-paragraphs numbers them.
 */
export function loadUnits(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(dir, f), "utf8"));
      return {
        id: f.replace(/\.mdx$/, ""),
        number: data.number,
        title: data.title,
        part: data.part,
        numbered: data.numbered !== false,
        paras: unitParagraphs(content),
      };
    });
}

/** Units whose paragraphs `locate` can search: numbered only, text folded. */
export function locatable(units) {
  return units
    .filter((u) => u.numbered) // no ¶ ids to link to
    .map((u) => ({ ...u, paras: u.paras.map(normalise) }));
}

/** Find the unit and paragraph index containing the opening words of `quote`. */
export function locate(units, quote) {
  const first = quote.split(/…|\.\.\./)[0];
  const words = normalise(first).split(" ").filter(Boolean);
  if (words.length < 5) return null;
  const needle = words.slice(0, 8).join(" ");
  for (const u of units) {
    const i = u.paras.findIndex((p) => p.includes(needle));
    if (i >= 0) return { chapter: u, para: i + 1 };
  }
  return null;
}

/**
 * Query-and-fragment for a quotation: the paragraph id as the fragment,
 * `?hl=` carrying the quote's opening words and `&to=` its closing words. The
 * Alpine `quoteTarget` component on unit pages highlights from the first to
 * the last on arrival (src/theme/alpine.ts). Short quotes (six words or
 * fewer, no ellipsis) send only `hl`.
 */
export const HL_WORDS = 6;
export function quoteQuery(para, quote) {
  const segments = quote.split(/…|\.\.\./).map((t) => t.replace(/[\s"“”]+/g, " ").trim()).filter(Boolean);
  const first = segments[0].split(" ");
  const last = segments[segments.length - 1].split(" ");
  const total = segments.reduce((n, t) => n + t.split(" ").length, 0);
  const params = new URLSearchParams({ hl: first.slice(0, HL_WORDS).join(" ") });
  if (segments.length > 1 || total > HL_WORDS) params.set("to", last.slice(-HL_WORDS).join(" "));
  return `?${params}#p${para}`;
}

/** Full URL for a quotation: the unit page plus `quoteQuery`. */
export function quoteHref(basePath, unitId, para, quote) {
  return `${basePath}/${unitId}/${quoteQuery(para, quote)}`;
}
