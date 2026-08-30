import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

const CHAPTER_DIR = "src/content/chapters";

const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const roman = (n) => {
  const map = [[50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, r] of map) while (n >= v) { out += r; n -= v; }
  return out;
};
const fromRoman = (s) => {
  const v = { I: 1, V: 5, X: 10, L: 50 };
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const a = v[s[i]], b = v[s[i + 1]] ?? 0;
    n += a < b ? -a : a;
  }
  return n;
};

/**
 * Chapters as they are on disk, with paragraphs in the same order (and
 * therefore the same index) that rehype-chapter-paragraphs numbers them.
 */
function loadChapters() {
  return readdirSync(CHAPTER_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(CHAPTER_DIR, f), "utf8"));
      const paras = content
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter((b) => b && !/^(#|[-*]\s|\d+[.)]\s|<|>)/.test(b)) // only real paragraphs
        .map((b) => normalise(b.replace(/\n/g, " ")));
      return { id: f.replace(/\.mdx$/, ""), number: data.number, title: data.title, paras };
    });
}

/** Find the chapter and paragraph index containing the opening words of `quote`. */
function locate(chapters, quote) {
  const first = quote.split(/…|\.\.\./)[0];
  const words = normalise(first).split(" ").filter(Boolean);
  if (words.length < 5) return null;
  const needle = words.slice(0, 8).join(" ");
  for (const ch of chapters) {
    const i = ch.paras.findIndex((p) => p.includes(needle));
    if (i >= 0) return { chapter: ch, para: i + 1 };
  }
  return null;
}

/**
 * URL for a quotation: the paragraph id as the fragment, `?hl=` carrying the
 * quote's opening words and `&to=` its closing words. The Alpine `quoteTarget`
 * component on chapter pages highlights from the first to the last on arrival
 * (src/alpine.ts). Short quotes (six words or fewer, no ellipsis) send only `hl`.
 */
export const HL_WORDS = 6;
export function quoteHref(chapterId, para, quote) {
  const segments = quote.split(/…|\.\.\./).map((t) => t.replace(/[\s"“”]+/g, " ").trim()).filter(Boolean);
  const first = segments[0].split(" ");
  const last = segments[segments.length - 1].split(" ");
  const total = segments.reduce((n, t) => n + t.split(" ").length, 0);
  const params = new URLSearchParams({ hl: first.slice(0, HL_WORDS).join(" ") });
  if (segments.length > 1 || total > HL_WORDS) params.set("to", last.slice(-HL_WORDS).join(" "));
  return `/chapters/${chapterId}/?${params}#p${para}`;
}

const link = (href, text, title) => ({
  type: "element",
  tagName: "a",
  properties: { href, className: ["quote-source__link"], title },
  children: [{ type: "text", value: text }],
});

/** Short form for footers ("Chapter 6", arabic to match the sidebar); the full title goes in the link's hover text. */
const label = (ch) => `Chapter ${ch.number}`;
const fullTitle = (ch) => `Chapter ${ch.number}, ${ch.title}`;

/**
 * On concept and author pages, link quotations of Hobbes to the paragraph
 * of the chapter they come from.
 *
 * Runs on concept, author, and theme pages.
 *
 * - Blockquotes get a footer: "Leviathan, Chapter 2 ¶7" (full title on hover),
 *   linked to /chapters/<id>/?hl=<opening words>#p7; the chapter page
 *   highlights those words on arrival. A trailing "— Chapter XVII" line inside
 *   the blockquote gives the source explicitly; it is used as a plain
 *   attribution when that chapter is not loaded yet. "— Introduction" is
 *   accepted for the book's unnumbered introduction.
 * - Inline "…" quotations of five words or more that occur in a loaded
 *   chapter are wrapped in a link to that paragraph.
 */
export default function rehypeQuoteSources() {
  return (tree, file) => {
    if (!/\/content\/(concepts|authors|themes)\//.test(file.path ?? "")) return;
    const chapters = loadChapters();

    // Blockquotes
    visit(tree, { type: "element", tagName: "blockquote" }, (node) => {
      const paras = node.children.filter((c) => c.type === "element" && c.tagName === "p");
      if (paras.length === 0) return;

      let explicit = null; // chapter number, or "Introduction"
      const last = paras[paras.length - 1];
      const m = /^\s*[—–-]\s*(?:Chapter\s+([IVXL]+|\d+)\b|(Introduction)\b)/i.exec(toString(last));
      if (m) {
        explicit = m[2] ? "Introduction" : /^\d+$/.test(m[1]) ? Number(m[1]) : fromRoman(m[1]);
        node.children.splice(node.children.indexOf(last), 1);
        paras.pop();
      }

      const quote = paras.map((p) => toString(p)).join(" ");
      const hit = locate(chapters, quote);
      /** @type {any[]} */
      let content;
      if (hit) {
        content = [
          { type: "text", value: "Leviathan, " },
          link(quoteHref(hit.chapter.id, hit.para, quote), `${label(hit.chapter)} ¶${hit.para}`, fullTitle(hit.chapter)),
        ];
      } else if (explicit === "Introduction") {
        content = [{ type: "text", value: "Leviathan, The Introduction" }];
      } else if (explicit) {
        const ch = chapters.find((c) => c.number === explicit);
        content = ch
          ? [{ type: "text", value: "Leviathan, " }, link(`/chapters/${ch.id}/`, label(ch), fullTitle(ch))]
          : [{ type: "text", value: `Leviathan, Chapter ${explicit}` }];
      } else {
        return;
      }
      node.children.push({
        type: "element",
        tagName: "footer",
        properties: { className: ["quote-source"] },
        children: content,
      });
    });

    // Inline quotations
    const SKIP = new Set(["a", "blockquote", "code", "pre", "h1", "h2", "h3", "h4"]);
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined || SKIP.has(parent.tagName)) return;
      // don't descend into blockquotes at any depth
      const re = /["“]([^"“”]{20,}?)["”]/g;
      const out = [];
      let last = 0;
      for (const m of node.value.matchAll(re)) {
        const hit = locate(chapters, m[1]);
        if (!hit) continue;
        out.push({ type: "text", value: node.value.slice(last, m.index + 1) });
        out.push({
          type: "element",
          tagName: "a",
          properties: {
            href: quoteHref(hit.chapter.id, hit.para, m[1]),
            className: ["quote-link"],
            title: `${fullTitle(hit.chapter)} ¶${hit.para}`,
          },
          children: [{ type: "text", value: m[1] }],
        });
        last = m.index + m[0].length - 1;
      }
      if (!out.length) return;
      out.push({ type: "text", value: node.value.slice(last) });
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
