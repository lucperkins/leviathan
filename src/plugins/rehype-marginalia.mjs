import { visit } from "unist-util-visit";

/** All the text under a node, flattened, with whitespace collapsed. */
function textOf(node) {
  let out = "";
  visit(node, "text", (t) => {
    out += t.value;
  });
  return out.replace(/\s+/g, " ").trim();
}

/**
 * Chapter pages: attaches a short note to a marginal heading, shown in the
 * right margin where there is room for it and inline underneath where there
 * is not. Driven by the chapter's `marginalia` frontmatter:
 *
 *   marginalia:
 *     - heading: "The First Book"
 *       label: "Bellarmine: the Church is a mixed monarchy"
 *       href: "/interlocutors/bellarmine/#de-summo-pontifice"
 *
 * `heading` is matched against the heading's own text, so it survives the
 * anchor wrapping that rehype-concept-headings adds.
 */
export default function rehypeMarginalia() {
  return (tree, file) => {
    if (!file.path?.includes("/content/chapters/")) return;
    const notes = file.data?.astro?.frontmatter?.marginalia ?? [];
    if (!notes.length) return;

    const wanted = new Map(notes.map((n) => [n.heading.replace(/\s+/g, " ").trim(), n]));
    const seen = new Set();

    visit(tree, "element", (node) => {
      if (!/^h[2-4]$/.test(node.tagName)) return;
      const note = wanted.get(textOf(node));
      if (!note || seen.has(note)) return;
      seen.add(note);
      node.properties = { ...node.properties, className: [...(node.properties?.className ?? []), "has-note"] };
      node.children.push({
        type: "element",
        tagName: "span",
        properties: { className: ["margin-note"] },
        children: [
          {
            type: "element",
            tagName: "a",
            properties: { href: note.href },
            children: [{ type: "text", value: note.label }],
          },
        ],
      });
    });

    const missed = notes.filter((n) => !seen.has(n)).map((n) => n.heading);
    if (missed.length) {
      console.warn(`[marginalia] no heading matched in ${file.path}: ${missed.join("; ")}`);
    }
  };
}
