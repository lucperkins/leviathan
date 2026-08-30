import { visit } from "unist-util-visit";

/**
 * Numbers the top-level paragraphs of chapter pages (<p id="p1">…) and
 * prefixes each with a light, clickable ¶N link to itself, shown in the
 * left margin by CSS. Quotations on concept/author/theme pages link to
 * these ids.
 */
export default function rehypeChapterParagraphs() {
  return (tree, file) => {
    if (!file.path?.includes("/content/chapters/")) return;
    let n = 0;
    visit(tree, { type: "element", tagName: "p" }, (node, _index, parent) => {
      if (parent !== tree) return;
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
