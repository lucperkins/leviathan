import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { visit } from "unist-util-visit";

const CHAPTER_DIR = "src/content/chapters";
const fromRoman = (s) => {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const a = v[s[i]], b = v[s[i + 1]] ?? 0;
    n += a < b ? -a : a;
  }
  return n;
};
const toNumber = (s) => (/^\d+$/.test(s) ? Number(s) : fromRoman(s));

/** number → chapter id for the chapters currently loaded. */
function loadChapterIds() {
  const map = new Map();
  for (const f of readdirSync(CHAPTER_DIR)) {
    if (!f.endsWith(".mdx")) continue;
    const { data } = matter(readFileSync(join(CHAPTER_DIR, f), "utf8"));
    map.set(Number(data.number), f.replace(/\.mdx$/, ""));
  }
  return map;
}

const SKIP = new Set(["a", "code", "pre", "blockquote", "h1", "h2", "h3", "h4"]);
// "Chapter XVII", "Chapters XIV and XV", "Chapters XVIII–XXI", "Chapter 17"
const MENTION = /\b(Chapters?)(\s+)((?:[IVXLC]+|\d+)(?:(?:,\s*|\s+and\s+|\s*[–-]\s*)(?:[IVXLC]+|\d+))*)\b/g;
const NUMERAL = /([IVXLC]+|\d+)/g;

/**
 * On concept, interlocutor, and theme pages, chapter mentions in prose become
 * arabic numerals (matching the sidebar) and link to the chapter page when
 * that chapter is loaded. Quotations and headings are left alone.
 */
export default function rehypeChapterLinks() {
  return (tree, file) => {
    if (!/\/content\/(concepts|interlocutors|themes)\//.test(file.path ?? "")) return;
    const ids = loadChapterIds();

    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined || SKIP.has(parent.tagName)) return;
      const out = [];
      let last = 0;
      for (const m of node.value.matchAll(MENTION)) {
        out.push({ type: "text", value: node.value.slice(last, m.index) + m[1] + m[2] });
        // rewrite each numeral in the list, keeping the separators
        let cursor = 0;
        for (const n of m[3].matchAll(NUMERAL)) {
          if (n.index > cursor) out.push({ type: "text", value: m[3].slice(cursor, n.index) });
          const num = toNumber(n[1]);
          const id = ids.get(num);
          out.push(
            id
              ? { type: "element", tagName: "a", properties: { href: `/chapters/${id}/`, className: ["chapter-link"] }, children: [{ type: "text", value: String(num) }] }
              : { type: "text", value: String(num) },
          );
          cursor = n.index + n[1].length;
        }
        if (cursor < m[3].length) out.push({ type: "text", value: m[3].slice(cursor) });
        last = m.index + m[0].length;
      }
      if (!out.length) return;
      out.push({ type: "text", value: node.value.slice(last) });
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
