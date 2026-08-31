import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Gives headings on the primary text's and the essay collections' pages an id
 * and wraps their text in a link to that id, so each section is hoverable and
 * directly linkable.
 *
 * @param {{ collections: string[] }} options collections to run on.
 */
export default function rehypeConceptHeadings({ collections }) {
  const scope = new RegExp(`/content/(${collections.join("|")})/`);
  const slug = rehypeSlug();
  const autolink = rehypeAutolinkHeadings({
    behavior: "wrap",
    properties: { className: ["heading-anchor"] },
    test: ["h2", "h3", "h4"],
  });
  return (tree, file) => {
    if (!scope.test(file.path ?? "")) return;
    slug(tree, file);
    autolink(tree, file);
  };
}
