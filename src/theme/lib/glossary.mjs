import { loadUnits } from "./text.mjs";

/**
 * The machinery behind the language glossaries, which hold nothing but data.
 * An entry names what to look for in the primary text; this finds it, so the
 * citations are located rather than typed and stay right as the text is
 * corrected.
 */

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Every term with the places the text uses it. A term found nowhere is a
 * mistake in the list rather than a fact about the book, so it warns at build
 * time.
 *
 * `find` is a locator rather than a headword: it can be narrower than the entry
 * when one of the words has another sense elsewhere in the book.
 *
 * @param {{ dir: string,
 *           groups: { id: string, title: string, blurb: string }[],
 *           terms: { group: string, term: string, literal: string, gloss: string,
 *                    find: string[], script?: string, lang?: string }[],
 *           absent?: { term: string, literal: string, gloss: string }[],
 *           label: string }} glossary
 */
export function glossaryIndex({ dir, groups, terms, absent = [], label }) {
  const book = loadUnits(dir).sort((a, b) => a.number - b.number);
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
