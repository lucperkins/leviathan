import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Gives headings on chapter, concept, and author pages an id and wraps their text in a link to
 * that id, so each section is hoverable and directly linkable.
 * Scoped to files under src/content/{chapters,concepts,authors,themes}.
 */
export default function rehypeConceptHeadings() {
  const slug = rehypeSlug();
  const autolink = rehypeAutolinkHeadings({
    behavior: "wrap",
    properties: { className: ["heading-anchor"] },
    test: ["h2", "h3", "h4"],
  });
  return (tree, file) => {
    if (!/\/content\/(chapters|concepts|authors|themes)\//.test(file.path ?? "")) return;
    slug(tree, file);
    autolink(tree, file);
  };
}
