import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { essaySchema, footnotesSchema, refEntrySchema, textUnitSchema } from "./theme/content";

const load = (name: string) => glob({ pattern: "**/*.mdx", base: `./src/content/${name}` });

const chapters = defineCollection({
  loader: load("chapters"),
  schema: textUnitSchema(),
});

const concepts = defineCollection({
  loader: load("concepts"),
  /** `hobbes` is his spelling, shown only where it differs from the modern title. */
  schema: refEntrySchema("chapters").extend({ hobbes: z.string().optional() }),
});

const touchstones = defineCollection({
  loader: load("touchstones"),
  schema: refEntrySchema("chapters").extend({
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
  loader: load("themes"),
  schema: essaySchema("chapters").extend({
    /** Hobbes's own spelling of the theme's key term, shown under the title (e.g. "Soveraignty"). */
    hobbes: z.string().optional(),
    concepts: z.array(reference("concepts")).default([]),
  }),
});

/**
 * Readings: the schools that have taken the book up and what each finds in it.
 * Sorted alphabetically, like the themes, and deliberately heavy on names —
 * the point of a page here is to send a reader to the scholarship.
 */
const readings = defineCollection({
  loader: load("readings"),
  schema: essaySchema("chapters").extend({
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    context: z.array(reference("context")).default([]),
  }),
});

/**
 * National receptions: how a country's tradition took the book up, and why it
 * needed him when it did. Distinct from the readings, which are grouped by
 * school of interpretation rather than by place.
 */
const receptions = defineCollection({
  loader: load("receptions"),
  schema: essaySchema("chapters").extend({
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    context: z.array(reference("context")).default([]),
  }),
});

/**
 * Kindred spirits: thinkers Hobbes did not argue with so much as resemble.
 * Distinct from the touchstones, who are the people he answers in the book.
 * Read in the order they lived, so `year` sorts them.
 */
const kindred = defineCollection({
  loader: load("kindred"),
  schema: essaySchema("chapters").extend({
    /** Shown under the title: "c. 1275–1342". */
    dates: z.string(),
    /** Sort key: birth year, negative for BC. */
    year: z.number(),
    /** Sidebar label, where it differs from the title. */
    navTitle: z.string().optional(),
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    context: z.array(reference("context")).default([]),
  }),
});

/**
 * His other books. Short pages: what each one is, what it does that Leviathan
 * does not, and where the same argument sits in Leviathan. Read in the order
 * they were written, so `year` sorts them.
 */
const works = defineCollection({
  loader: load("works"),
  schema: essaySchema("chapters").extend({
    /** Shown under the title: "1642, printed for the public in 1647". */
    dates: z.string(),
    /** Sort key: when it was written, not when it was printed. */
    year: z.number(),
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
    context: z.array(reference("context")).default([]),
  }),
});

/**
 * The world around the book rather than the man or the argument. Read in
 * sequence, so entries carry an explicit `order`.
 */
const context = defineCollection({
  loader: load("context"),
  schema: essaySchema("chapters").extend({
    /** Shown under the title: the years the page covers, e.g. "1642–1651". */
    dates: z.string(),
    /** Sort key: the pages read in rough chronological order. */
    order: z.number(),
    concepts: z.array(reference("concepts")).default([]),
    themes: z.array(reference("themes")).default([]),
  }),
});

/**
 * Hobbes himself: a short life read in sequence rather than alphabetically,
 * so entries carry an explicit `order`.
 */
const hobbes = defineCollection({
  loader: load("hobbes"),
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
      footnotes: footnotesSchema,
    }),
});

export const collections = { chapters, concepts, context, hobbes, kindred, readings, receptions, touchstones, themes, works };
