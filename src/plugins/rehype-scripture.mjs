import { visit } from "unist-util-visit";
import { matchCitations, scriptureHref } from "../lib/scripture.mjs";

/** Never link inside these: a citation in a heading or an existing link stays plain text. */
const SKIP = new Set(["a", "h1", "h2", "h3", "h4", "code", "pre", "concept-ref", "sup"]);

/**
 * Chapter pages: turn Hobbes's own scriptural citations — "(Eph. 6. 12.)",
 * "1 Sam.8.3", "Rom. 13." — into links to that passage in the King James text
 * on Wikisource, opened in a new tab so the reader keeps their place.
 *
 * The matching is `matchCitations` from src/lib/scripture.mjs, the same
 * function the /scripture/ index counts with, so a reference that appears
 * there is a link here and the two cannot drift apart. Only the reference
 * itself is wrapped; the surrounding brackets and stops are left alone.
 */
export default function rehypeScripture() {
  return (tree, file) => {
    if (!file.path?.includes("/content/chapters/")) return;

    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined || SKIP.has(parent.tagName)) return;

      const out = [];
      let last = 0;
      for (const c of matchCitations(node.value)) {
        if (c.index < last) continue;
        if (c.index > last) out.push({ type: "text", value: node.value.slice(last, c.index) });
        out.push({
          type: "element",
          tagName: "a",
          properties: {
            href: scriptureHref(c.book, c.chapter, c.verses),
            className: ["scripture-ref"],
            target: "_blank",
            rel: "noopener noreferrer",
            title: `${c.book} ${c.chapter}${c.verses ? `:${c.verses}` : ""} — King James Version`,
          },
          children: [{ type: "text", value: c.text }],
        });
        last = c.index + c.length;
      }
      if (!out.length) return;
      if (last < node.value.length) out.push({ type: "text", value: node.value.slice(last) });

      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}
