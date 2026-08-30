import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const chapters = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/chapters" }),
  schema: z.object({
    /** Ordering key. Chapters are 1–47; front matter (the epistle, the introduction) is ≤ 0. */
    number: z.number(),
    title: z.string(),
    /** One of PARTS in src/lib/parts.ts. Front matter has no part. */
    part: z.string().optional(),
    /** Verbatim sentences to set out as pull quotes after the paragraph they occur in. */
    pullquotes: z.array(z.string()).default([]),
    /** Whether paragraphs get ¶ numbers. Off for the epistle and the introduction. */
    numbered: z.boolean().default(true),
    /** Notes shown beside a marginal heading, e.g. the argument a passage answers. */
    marginalia: z
      .array(z.object({ heading: z.string(), label: z.string(), href: z.string() }))
      .default([]),
  }),
});

/** Shared shape for anything that gets a tooltip + page: concepts, interlocutors. */
const refSchema = z.object({
  title: z.string(),
  summary: z.string(),
  terms: z.array(z.string()).optional(),
  chapters: z.array(reference("chapters")).default([]),
});

const concepts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/concepts" }),
  schema: refSchema,
});

const interlocutors = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/interlocutors" }),
  schema: refSchema.extend({
    dates: z.string().optional(),
    /** Surname (or other key) to sort by; defaults to the last word of the title. */
    sortName: z.string().optional(),
  }),
});

/**
 * Themes are broad topics that run through the book (Christianity, violence,
 * the state). Unlike concepts they do not elucidate a term of Hobbes's and
 * are not tooltip-linked in chapter text.
 */
const themes = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/themes" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Hobbes's own spelling of the theme's key term, shown under the title (e.g. "Soveraignty"). */
    hobbes: z.string().optional(),
    chapters: z.array(reference("chapters")).default([]),
    concepts: z.array(reference("concepts")).default([]),
  }),
});

export const collections = { chapters, concepts, interlocutors, themes };
