import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import site from "./src/site.config";
import { matchCitations, scriptureHref } from "./src/lib/scripture.mjs";
import rehypeConcepts from "./src/theme/plugins/rehype-concepts.mjs";
import rehypeCitations from "./src/theme/plugins/rehype-citations.mjs";
import rehypeConceptHeadings from "./src/theme/plugins/rehype-concept-headings.mjs";
import rehypeChapterParagraphs from "./src/theme/plugins/rehype-chapter-paragraphs.mjs";
import rehypeQuoteSources from "./src/theme/plugins/rehype-quote-sources.mjs";
import rehypePullquotes from "./src/theme/plugins/rehype-pullquotes.mjs";
import rehypeChapterLinks from "./src/theme/plugins/rehype-chapter-links.mjs";
import rehypeExternalLinks from "./src/theme/plugins/rehype-external-links.mjs";
import rehypeMarginalia from "./src/theme/plugins/rehype-marginalia.mjs";
import rehypeFootnotes from "./src/theme/plugins/rehype-footnotes.mjs";
import refWatch from "./src/theme/integrations/ref-watch.mjs";

const { text } = site;
const essays = site.essayCollections;

export default defineConfig({
  // The civil-war essay moved from the themes section to the context section.
  redirects: { "/themes/the-english-civil-war/": "/context/the-english-civil-war/" },
  integrations: [
    mdx(),
    alpinejs({ entrypoint: "/src/alpine" }),
    refWatch({ refKinds: site.refKinds, textCollection: text.collection }),
  ],
  markdown: {
    // Astro 7: plugins go on the processor, not on `markdown.rehypePlugins`.
    // The theme's plugins are factories; their options are built from src/site.config.ts.
    processor: unified({
      rehypePlugins: [
        [rehypeConcepts, { refKinds: site.refKinds, textCollection: text.collection }],
        [
          // Hobbes's own scriptural citations, linked to the King James text.
          rehypeCitations,
          {
            textCollection: text.collection,
            match: matchCitations,
            href: (c: any) => scriptureHref(c.book, c.chapter, c.verses),
            linkTitle: (c: any) => `${c.book} ${c.chapter}${c.verses ? `:${c.verses}` : ""} — King James Version`,
            className: "scripture-ref",
          },
        ],
        [rehypeConceptHeadings, { collections: [text.collection, ...essays] }],
        [rehypeChapterParagraphs, { textCollection: text.collection }],
        [
          rehypeQuoteSources,
          {
            collections: essays,
            textCollection: text.collection,
            basePath: text.basePath,
            workTitle: text.workTitle,
            unitWord: text.unitWord,
            // "— Introduction" attributes a quote from the book's unnumbered introduction.
            unnumbered: { word: "Introduction", label: "The Introduction" },
          },
        ],
        [rehypePullquotes, { textCollection: text.collection }],
        [
          rehypeChapterLinks,
          { collections: essays, textCollection: text.collection, basePath: text.basePath, unitWord: text.unitWord },
        ],
        rehypeFootnotes,
        [rehypeExternalLinks, { skip: ["scripture-ref"] }],
        [rehypeMarginalia, { textCollection: text.collection }],
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
