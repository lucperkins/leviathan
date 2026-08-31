import { visit } from "unist-util-visit";

/** Never link inside these: a citation in a heading or an existing link stays plain text. */
const SKIP = new Set(["a", "h1", "h2", "h3", "h4", "code", "pre", "concept-ref", "sup"]);

/**
 * Primary-text pages: turn the text's own citations of an external corpus —
 * scriptural references like "(Eph. 6. 12.)", say — into
 * links to that passage, opened in a new tab so the reader keeps their place.
 *
 * The matching and the link building are the site's (`options.match` and
 * `options.href`): the same functions its citation-index page counts with, so
 * a reference that appears there is a link here and the two cannot drift
 * apart. Only the reference itself is wrapped; the surrounding brackets and
 * stops are left alone.
 *
 * @param {{ textCollection: string,
 *           match: (text: string) => Iterable<{ index: number, length: number, text: string } & Record<string, any>>,
 *           href: (citation: any) => string,
 *           linkTitle: (citation: any) => string,
 *           className: string }} options
 */
export default function rehypeCitations({ textCollection, match, href, linkTitle, className }) {
  const marker = `/content/${textCollection}/`;
  return (tree, file) => {
    if (!file.path?.includes(marker)) return;

    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined || SKIP.has(parent.tagName)) return;

      const out = [];
      let last = 0;
      for (const c of match(node.value)) {
        if (c.index < last) continue;
        if (c.index > last) out.push({ type: "text", value: node.value.slice(last, c.index) });
        out.push({
          type: "element",
          tagName: "a",
          properties: {
            href: href(c),
            className: [className],
            target: "_blank",
            rel: "noopener noreferrer",
            title: linkTitle(c),
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
