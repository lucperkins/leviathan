import { visit } from "unist-util-visit";

/** A paragraph that is nothing but bold text: a display line ("FINIS", a salutation), not prose. */
const isDisplayLine = (node) => node.children.length === 1 && node.children[0].tagName === "strong";

/**
 * Numbers the top-level paragraphs of chapter pages (<p id="p1">…) and
 * prefixes each with a light, clickable ¶N link to itself, shown in the
 * left margin by CSS. Quotations on concept/author/theme pages link to
 * these ids. Display lines get the `display-line` class and no number
 * (rehype-quote-sources skips them the same way when it counts paragraphs).
 */
export default function rehypeChapterParagraphs() {
  return (tree, file) => {
    if (!file.path?.includes("/content/chapters/")) return;
    let n = 0;
    visit(tree, { type: "element", tagName: "p" }, (node, _index, parent) => {
      if (parent !== tree) return;
      if (isDisplayLine(node)) {
        node.properties = { ...node.properties, className: ["display-line"] };
        return;
      }
      const id = `p${++n}`;
      node.properties = { ...node.properties, id };
      node.children.unshift({
        type: "element",
        tagName: "a",
        properties: { href: `#${id}`, className: ["para-num"], ariaLabel: `Paragraph ${n}` },
        children: [{ type: "text", value: `¶${n}` }],
      });
    });
  };
}
