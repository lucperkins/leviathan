import config from "../site.config";
import { contentDir, loadUnits } from "../theme/lib/text.mjs";

/**
 * The books Hobbes cites, in canonical order, with the spellings and
 * abbreviations he (and his printer) actually use. The 1651 text is not
 * consistent: Matthew appears as Mat., Matth., Matt. and Math., and Ezekiel is
 * once misprinted Exekiel. Anything not listed here is not treated as a
 * citation, which keeps "Chap. 4.2" and the like out of the index.
 */
const BOOKS = [
  ["Genesis", ["Gen", "Gene", "Genes", "Genesis"]],
  ["Exodus", ["Exod", "Exodus"]],
  ["Leviticus", ["Levit", "Leviticus"]],
  ["Numbers", ["Numb", "Numbers"]],
  ["Deuteronomy", ["Deut", "Deuter", "Deuteronomy"]],
  ["Joshua", ["Josh", "Joshua"]],
  ["Judges", ["Judg", "Judges"]],
  ["Ruth", ["Ruth"]],
  ["1 Samuel", ["1 Sam", "1 Samuel", "Sam"]],
  ["2 Samuel", ["2 Sam", "2 Samuel"]],
  ["1 Kings", ["1 King", "1 Kings", "Kings"]],
  ["2 Kings", ["2 King", "2 Kings"]],
  ["1 Chronicles", ["1 Chro", "1 Chron", "Chron", "1 Chronicles"]],
  ["2 Chronicles", ["2 Chro", "2 Chron", "2 Chronicles"]],
  ["Job", ["Job"]],
  ["Psalms", ["Psal", "Psalm", "Psalms", "Psalme"]],
  ["Proverbs", ["Prov", "Proverbs"]],
  ["Ecclesiastes", ["Eccles", "Ecclesiastes"]],
  ["Isaiah", ["Isa", "Isai", "Isaiah", "Esay"]],
  ["Jeremiah", ["Jer", "Jerem", "Jeremiah"]],
  ["Ezekiel", ["Ezek", "Ezekiel", "Exekiel"]],
  ["Daniel", ["Dan", "Daniel"]],
  ["Joel", ["Joel"]],
  ["Amos", ["Amos"]],
  ["Jonah", ["Jonah", "Jonas"]],
  ["Micah", ["Micah", "Mic"]],
  ["Zechariah", ["Zech", "Zachary", "Zechariah"]],
  ["Malachi", ["Mal", "Malachi"]],
  ["2 Esdras", ["2 Esdras"]],
  ["Matthew", ["Mat", "Mat t", "Matt", "Math", "Matth", "Matthew"]],
  ["Mark", ["Mar", "Mark", "Marke"]],
  ["Luke", ["Luke", "Luk"]],
  ["John", ["John", "Joh"]],
  ["Acts", ["Acts", "Act"]],
  ["Romans", ["Rom", "Romans"]],
  ["1 Corinthians", ["1 Cor", "1 Corinth", "1 Corinthians"]],
  ["2 Corinthians", ["2 Cor", "2 Corinth", "2 Corinthians"]],
  ["Galatians", ["Gal", "Galat", "Galatians"]],
  ["Ephesians", ["Ephes", "Eph", "Ephesians"]],
  ["Philippians", ["Phil", "Philip", "Philippians"]],
  ["Colossians", ["Col", "Coloss", "Colossians"]],
  ["1 Thessalonians", ["1 Thess", "1 Thessal", "1 Thessalonians"]],
  ["2 Thessalonians", ["2 Thess", "2 Thessal", "2 Thessalonians"]],
  ["1 Timothy", ["1 Tim", "1 Timothy", "Timothy", "Tim"]],
  ["2 Timothy", ["2 Tim", "2 Timothy"]],
  ["Titus", ["Tit", "Titus"]],
  ["Hebrews", ["Heb", "Hebr", "Hebrews"]],
  ["James", ["James", "Jam"]],
  ["1 Peter", ["1 Pet", "1 Peter"]],
  ["2 Peter", ["2 Pet", "2 Peter"]],
  ["1 John", ["1 John", "1 Joh", "1 Epist. of John"]],
  ["Jude", ["Jude"]],
  ["Revelation", ["Rev", "Revel", "Revelation", "Apocalypse"]],
];

const ORDER = new Map(BOOKS.map(([name], i) => [name, i]));
const LOOKUP = new Map();
for (const [name, forms] of BOOKS) {
  for (const f of forms) LOOKUP.set(f.toLowerCase().replace(/\s+/g, " "), name);
}

// Longest forms first so "1 Sam" wins over "Sam" and "Matth" over "Mat".
const ALT = [...LOOKUP.keys()]
  .sort((a, b) => b.length - a.length)
  .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\.?\\s*"))
  .join("|");

/** "Gen. 17.7,8." / "1 Sam.8.3" / "2 Kings, 1. 12." / "(Rom. 13.)" */
const CITE = new RegExp(String.raw`\b(${ALT})\.?\s*,?\s*(\d{1,3})(?:\s*[.:]\s*(\d{1,3}(?:\s*[,;&]\s*\d{1,3}|\s*[-–]\s*\d{1,3})*))?`, "gi");

const tidyVerses = (v) =>
  v
    ? v
        .replace(/\s+/g, "")
        .replace(/[;&]/g, ",")
        .replace(/,/g, ", ")
        .replace(/[-–]/g, "\u2013")
    : null;

/**
 * Wikisource's King James text: one page per book, with `#Chapter_N` headings
 * and `#C:V` anchors on every verse. Public domain, no ads, and the same
 * authorised version Hobbes worked from.
 */
export function scriptureHref(book, chapter, verses) {
  const first = verses ? parseInt(verses, 10) : NaN;
  const fragment = Number.isNaN(first) ? `Chapter_${chapter}` : `${chapter}:${first}`;
  return `https://en.wikisource.org/wiki/Bible_(King_James)/${book.replace(/ /g, "_")}#${fragment}`;
}

/**
 * Every citation in a run of text, as {index, length, book, chapter, verses}.
 * Shared by the index page, which counts them, and rehype-scripture, which
 * turns them into links in the chapter text, so both agree on what counts as
 * a citation.
 */
export function* matchCitations(text) {
  for (const m of text.matchAll(new RegExp(CITE.source, "gi"))) {
    const key = m[1].toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
    const book = LOOKUP.get(key);
    if (!book) continue;
    yield {
      index: m.index,
      length: m[0].length,
      text: m[0],
      book,
      chapter: Number(m[2]),
      verses: tidyVerses(m[3]),
    };
  }
}

/**
 * Every scriptural citation in the chapter texts, grouped by book and
 * reference, with the places Hobbes cites it. Only the reference is recorded:
 * the passage itself is left to the external link.
 */
export function scriptureIndex() {
  /** @type {Map<string, {book: string, chapter: number, verses: string|null, cited: any[]}>} */
  const refs = new Map();

  for (const unit of loadUnits(contentDir(config.text.collection))) {
    unit.paras.forEach((para, i) => {
      for (const m of para.matchAll(CITE)) {
        const key = m[1].toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
        const book = LOOKUP.get(key);
        if (!book) continue;
        const chapter = Number(m[2]);
        const verses = tidyVerses(m[3]);
        const refKey = `${book}|${chapter}|${verses ?? ""}`;
        if (!refs.has(refKey)) refs.set(refKey, { book, chapter, verses, cited: [] });
        const entry = refs.get(refKey);
        const where = {
          id: unit.id,
          number: unit.number,
          title: unit.title,
          part: unit.part,
          para: unit.numbered ? i + 1 : null,
        };
        if (!entry.cited.some((c) => c.id === where.id && c.para === where.para)) entry.cited.push(where);
      }
    });
  }

  const all = [...refs.values()].sort(
    (a, b) =>
      ORDER.get(a.book) - ORDER.get(b.book) ||
      a.chapter - b.chapter ||
      (parseInt(a.verses ?? "0", 10) || 0) - (parseInt(b.verses ?? "0", 10) || 0),
  );

  for (const r of all) {
    r.label = r.verses ? `${r.book} ${r.chapter}:${r.verses}` : `${r.book} ${r.chapter}`;
    r.href = scriptureHref(r.book, r.chapter, r.verses);
    r.cited.sort((a, b) => a.number - b.number || (a.para ?? 0) - (b.para ?? 0));
  }

  const books = [];
  for (const r of all) {
    if (!books.length || books[books.length - 1].book !== r.book) books.push({ book: r.book, refs: [] });
    books[books.length - 1].refs.push(r);
  }

  return { books, total: all.length, citations: all.reduce((n, r) => n + r.cited.length, 0) };
}
