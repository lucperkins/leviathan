import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { chapterParagraphs } from "../plugins/rehype-quote-sources.mjs";

const CHAPTER_DIR = "src/content/chapters";

/**
 * The machinery behind the language glossaries — `latin.mjs`, `greek.mjs` —
 * which hold nothing but data. An entry names what to look for in the chapter
 * text; this finds it, so the citations are located rather than typed and stay
 * right as the text is corrected.
 */

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Chapters in reading order, with their paragraphs as written and numbered as the pages number them. */
function chapters() {
  return readdirSync(CHAPTER_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(CHAPTER_DIR, f), "utf8"));
      return {
        id: f.replace(/\.mdx$/, ""),
        number: data.number,
        title: data.title,
        part: data.part,
        numbered: data.numbered !== false,
        paras: chapterParagraphs(content),
      };
    })
    .sort((a, b) => a.number - b.number);
}

/**
 * Every term with the places Hobbes uses it. A term found nowhere is a mistake
 * in the list rather than a fact about the book, so it warns at build time in
 * the same way the index of thinkers does.
 *
 * `find` is a locator rather than a headword: it can be narrower than the entry
 * when one of the words has another sense elsewhere in the book.
 */
export function glossaryIndex({ groups, terms, absent = [], label }) {
  const book = chapters();
  const placed = terms.map((t) => {
    const res = t.find.map((f) => new RegExp(`(^|[^A-Za-z])${escape(f)}([^A-Za-z]|$)`, "i"));
    const cited = [];
    for (const ch of book) {
      ch.paras.forEach((p, i) => {
        if (!res.some((re) => re.test(p))) return;
        cited.push({
          id: ch.id,
          title: ch.title,
          number: ch.number,
          part: ch.part,
          para: ch.numbered ? i + 1 : null,
        });
      });
    }
    if (cited.length === 0) console.warn(`[${label}] "${t.term}" is not in the chapter text`);
    return { ...t, cited };
  });

  return {
    groups: groups.map((g) => ({ ...g, terms: placed.filter((t) => t.group === g.id) })),
    total: placed.length,
    absent,
  };
}
