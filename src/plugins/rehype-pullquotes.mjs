import { toString } from "hast-util-to-string";
import { quoteHref } from "./rehype-quote-sources.mjs";

const fold = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

/**
 * Chapter pages: for each verbatim sentence in the frontmatter `pullquotes`
 * list, insert a pull quote <aside id="quote-N"> after the top-level
 * paragraph that contains it. The quote is a link to ?hl=<opening words>#pN,
 * which the Alpine `quoteTarget` component intercepts to highlight the
 * sentence in place. Must run after rehype-chapter-paragraphs (needs the
 * paragraph ids); nested inside <aside>, the quote's <p> is not numbered.
 */
export default function rehypePullquotes() {
  return (tree, file) => {
    if (!file.path?.includes("/content/chapters/")) return;
    /** @type {string[]} */
    const quotes = file.data?.astro?.frontmatter?.pullquotes ?? [];
    if (!quotes.length) return;

    let k = 0;
    for (const quote of quotes) {
      const needle = fold(quote);
      const idx = tree.children.findIndex(
        (n) => n.type === "element" && n.tagName === "p" && fold(toString(n)).includes(needle),
      );
      if (idx < 0) {
        file.message(`pull quote not found in any paragraph: "${quote.slice(0, 40)}…"`);
        continue;
      }
      const para = tree.children[idx];
      const next = tree.children[idx + 1];
      if (next?.type === "element" && next.tagName === "aside" && next.properties?.className?.includes("pullquote")) {
        // Two pull quotes from one paragraph set out together read as a stack
        // rather than as a quotation from the passage above them.
        file.message(`two pull quotes in one paragraph; skipping "${quote.slice(0, 40)}…"`);
        continue;
      }
      const paraId = String(para.properties?.id ?? "");
      // same-page link: keep only the query and fragment
      const href = quoteHref("", Number(paraId.slice(1)), quote).replace(/^\/chapters\/\//, "");
      tree.children.splice(idx + 1, 0, {
        type: "element",
        tagName: "aside",
        properties: { id: `quote-${++k}`, className: ["pullquote"], role: "note", ariaLabel: "Pull quote" },
        children: [
          {
            type: "element",
            tagName: "p",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "a",
                properties: { href, className: ["pullquote__link"], title: "Show this sentence in the text" },
                children: [{ type: "text", value: quote }],
              },
            ],
          },
        ],
      });
    }
  };
}
