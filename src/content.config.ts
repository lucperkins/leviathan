import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/** Editorial footnotes, available to every collection: `after` is matched in the text, the note collected at the foot. */
const footnotes = z.array(z.object({ after: z.string(), text: z.string() })).default([]);

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
    /** Editorial headnote above the chapter text; inline markdown, so links work. */
    note: z.string().optional(),
    footnotes,
    /** Notes shown beside a marginal heading, e.g. the argument a passage answers. */
    marginalia: z
      .array(z.object({ heading: z.string(), label: z.string(), href: z.string() }))
      .default([]),
  }),
});

/** Shared shape for anything that gets a tooltip + page: concepts, touchstones. */
const refSchema = z.object({
  title: z.string(),
  summary: z.string(),
  terms: z.array(z.string()).optional(),
  chapters: z.array(reference("chapters")).default([]),
  footnotes,
});

const concepts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/concepts" }),
  /** `hobbes` is his spelling, shown only where it differs from the modern title. */
  schema: refSchema.extend({ hobbes: z.string().optional() }),
});

const touchstones = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/touchstones" }),
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
    footnotes,
  }),
});

/**
 * Kindred spirits: thinkers Hobbes did not argue with so much as resemble.
 * Distinct from the touchstones, who are the people he answers in the book.
 * Read in the order they lived, so `year` sorts them.
 */
const kindred = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/kindred" }),
  schema: z.object({
    title: z.string(),
    /** Shown under the title: "c. 1275–1342". */
    dates: z.string(),
    /** Sort key: birth year, negative for BC. */
    year: z.number(),
    summary: z.string(),
    chapters: z.array(reference("chapters")).default([]),
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    footnotes,
  }),
});

/**
 * His other books. Short pages: what each one is, what it does that Leviathan
 * does not, and where the same argument sits in Leviathan. Read in the order
 * they were written, so `year` sorts them.
 */
const works = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    /** Shown under the title: "1642, printed for the public in 1647". */
    dates: z.string(),
    /** Sort key: when it was written, not when it was printed. */
    year: z.number(),
    summary: z.string(),
    chapters: z.array(reference("chapters")).default([]),
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    footnotes,
  }),
});

/**
 * Hobbes himself: a short life in four parts, read in sequence rather than
 * alphabetically, so entries carry an explicit `order`.
 */
const hobbes = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/hobbes" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      /** Portrait or plate heading the section; all are public domain. */
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),
      imageCredit: z.string().optional(),
      footnotes,
    }),
});

export const collections = { chapters, concepts, hobbes, kindred, touchstones, themes, works };
