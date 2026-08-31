import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { contentDir, fromRoman, loadUnits, locatable, locate, quoteHref } from "../lib/text.mjs";

const link = (href, text, title) => ({
  type: "element",
  tagName: "a",
  properties: { href, className: ["quote-source__link"], title },
  children: [{ type: "text", value: text }],
});

/**
 * On the editorial pages, link quotations of the primary text to the
 * paragraph of the unit they come from.
 *
 * Runs on the collections named in `options.collections`.
 *
 * - Blockquotes get a footer: "<workTitle>, Chapter 2 ¶7" (full title on
 *   hover), linked to <basePath>/<id>/?hl=<opening words>#p7; the unit page
 *   highlights those words on arrival. A trailing "— Chapter XVII" line inside
 *   the blockquote gives the source explicitly; it is used as a plain
 *   attribution when that unit is not loaded yet. `options.unnumbered` names
 *   an accepted attribution for an unnumbered unit, e.g.
 *   `{ word: "Introduction", label: "The Introduction" }`.
 * - Inline "…" quotations of five words or more that occur in a loaded unit
 *   are wrapped in a link to that paragraph.
 *
 * @param {{ collections: string[], textCollection: string, basePath: string,
 *           workTitle: string, unitWord: string,
 *           unnumbered?: { word: string, label: string } }} options
 */
export default function rehypeQuoteSources({ collections, textCollection, basePath, workTitle, unitWord, unnumbered }) {
  const scope = new RegExp(`/content/(${collections.join("|")})/`);
  const dir = contentDir(textCollection);
  // "— Chapter XVII", "— Chapter 17", or the unnumbered unit's own word.
  const attribution = new RegExp(
    `^\\s*[—–-]\\s*(?:${unitWord}\\s+([IVXL]+|\\d+)\\b${unnumbered ? `|(${unnumbered.word})\\b` : ""})`,
    "i",
  );

  /** Short form for footers ("Chapter 6", arabic to match the sidebar); the full title goes in the link's hover text. Front matter has no number. */
  const label = (ch) => (ch.part ? `${unitWord} ${ch.number}` : ch.title);
  const fullTitle = (ch) => (ch.part ? `${unitWord} ${ch.number}, ${ch.title}` : ch.title);

  return (tree, file) => {
    if (!scope.test(file.path ?? "")) return;
    const chapters = locatable(loadUnits(dir));

    // Blockquotes
    visit(tree, { type: "element", tagName: "blockquote" }, (node) => {
      const paras = node.children.filter((c) => c.type === "element" && c.tagName === "p");
      if (paras.length === 0) return;

      let explicit = null; // unit number, or the unnumbered unit's word
      const last = paras[paras.length - 1];
      const m = attribution.exec(toString(last));
      if (m) {
        explicit = m[2] ? unnumbered.word : /^\d+$/.test(m[1]) ? Number(m[1]) : fromRoman(m[1]);
        node.children.splice(node.children.indexOf(last), 1);
        paras.pop();
      }

      const quote = paras.map((p) => toString(p)).join(" ");
      const hit = locate(chapters, quote);
      /** @type {any[]} */
      let content;
      if (hit) {
        content = [
          { type: "text", value: `${workTitle}, ` },
          link(quoteHref(basePath, hit.chapter.id, hit.para, quote), `${label(hit.chapter)} ¶${hit.para}`, fullTitle(hit.chapter)),
        ];
      } else if (unnumbered && explicit === unnumbered.word) {
        content = [{ type: "text", value: `${workTitle}, ${unnumbered.label}` }];
      } else if (explicit) {
        const ch = chapters.find((c) => c.number === explicit);
        content = ch
          ? [{ type: "text", value: `${workTitle}, ` }, link(`${basePath}/${ch.id}/`, label(ch), fullTitle(ch))]
          : [{ type: "text", value: `${workTitle}, ${unitWord} ${explicit}` }];
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
            href: quoteHref(basePath, hit.chapter.id, hit.para, m[1]),
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
