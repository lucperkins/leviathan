import { visit } from "unist-util-visit";

/**
 * Links to other sites open in a new tab. The `external` class lets the
 * theme's CSS append the small arrow icon; `rel` guards the opener.
 *
 * @param {{ skip?: string[] }} [options] link classes to leave alone — for
 *   generated citations that are already marked and too numerous to carry an
 *   arrow each (rehype-citations has set their target and rel).
 */
export default function rehypeExternalLinks({ skip = [] } = {}) {
  return (tree) => {
    visit(tree, { type: "element", tagName: "a" }, (node) => {
      const href = node.properties?.href;
      if (typeof href !== "string" || !/^https?:\/\//.test(href)) return;
      if (skip.some((c) => node.properties.className?.includes?.(c))) return;
      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
      node.properties.className = [...(node.properties.className ?? []), "external"];
    });
  };
}
