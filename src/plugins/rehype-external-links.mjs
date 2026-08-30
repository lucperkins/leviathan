import { visit } from "unist-util-visit";

/**
 * Links to other sites open in a new tab. The `external` class lets
 * global.css append the small arrow icon; `rel` guards the opener.
 */
export default function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, { type: "element", tagName: "a" }, (node) => {
      const href = node.properties?.href;
      if (typeof href !== "string" || !/^https?:\/\//.test(href)) return;
      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
      node.properties.className = [...(node.properties.className ?? []), "external"];
    });
  };
}
