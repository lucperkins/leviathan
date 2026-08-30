// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeConcepts from "./src/plugins/rehype-concepts.mjs";
import rehypeConceptHeadings from "./src/plugins/rehype-concept-headings.mjs";
import rehypeChapterParagraphs from "./src/plugins/rehype-chapter-paragraphs.mjs";
import rehypeQuoteSources from "./src/plugins/rehype-quote-sources.mjs";
import rehypePullquotes from "./src/plugins/rehype-pullquotes.mjs";
import rehypeChapterLinks from "./src/plugins/rehype-chapter-links.mjs";
import rehypeExternalLinks from "./src/plugins/rehype-external-links.mjs";
import refWatch from "./src/integrations/ref-watch.mjs";

export default defineConfig({
  integrations: [mdx(), alpinejs({ entrypoint: "/src/alpine" }), refWatch()],
  markdown: {
    // Astro 7: plugins go on the processor, not on `markdown.rehypePlugins`.
    processor: unified({
      rehypePlugins: [
        rehypeConcepts,
        rehypeConceptHeadings,
        rehypeChapterParagraphs,
        rehypeQuoteSources,
        rehypePullquotes,
        rehypeChapterLinks,
        rehypeExternalLinks,
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
