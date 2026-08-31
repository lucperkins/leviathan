import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import { contentDir, fromRoman } from "../lib/text.mjs";

const toNumber = (s) => (/^\d+$/.test(s) ? Number(s) : fromRoman(s));

/** number → unit id for the units currently loaded. */
function loadUnitIds(dir) {
  const map = new Map();
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".mdx")) continue;
    const { data } = matter(readFileSync(join(dir, f), "utf8"));
    map.set(Number(data.number), f.replace(/\.mdx$/, ""));
  }
  return map;
}

const SKIP = new Set(["a", "code", "pre", "blockquote", "h1", "h2", "h3", "h4"]);

/**
 * On the essay collections' pages, unit mentions in prose ("Chapter XVII",
 * "Chapters XIV and XV", "Chapters XVIII–XXI", "Chapter 17") become arabic
 * numerals (matching the sidebar) and link to the unit page when that unit is
 * loaded. Quotations and headings are left alone.
 *
 * @param {{ collections: string[], textCollection: string, basePath: string, unitWord: string }} options
 */
export default function rehypeChapterLinks({ collections, textCollection, basePath, unitWord }) {
  const scope = new RegExp(`/content/(${collections.join("|")})/`);
  const dir = contentDir(textCollection);
  const MENTION = new RegExp(
    `\\b(${unitWord}s?)(\\s+)((?:[IVXLC]+|\\d+)(?:(?:,\\s*|\\s+and\\s+|\\s*[–-]\\s*)(?:[IVXLC]+|\\d+))*)\\b`,
    "g",
  );
  const NUMERAL = /([IVXLC]+|\d+)/g;

  return (tree, file) => {
    if (!scope.test(file.path ?? "")) return;
    const ids = loadUnitIds(dir);

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
              ? { type: "element", tagName: "a", properties: { href: `${basePath}/${id}/`, className: ["chapter-link"] }, children: [{ type: "text", value: String(num) }] }
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
