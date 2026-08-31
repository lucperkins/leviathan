/**
 * Schema pieces for the site's content collections. The site's
 * src/content.config.ts assembles its collections from these, extending them
 * with its own fields; the theme's plugins and components rely on the field
 * names here.
 */
import { reference } from "astro:content";
import { z } from "astro/zod";

/** Editorial footnotes, available to every collection: `after` is matched in the text, the note collected at the foot. */
export const footnotesSchema = z.array(z.object({ after: z.string(), text: z.string() })).default([]);

/** The primary text's units (chapters). `textCollection` names the collection itself, for self-references. */
export const textUnitSchema = () =>
  z.object({
    /** Ordering key. Front matter is ≤ 0. */
    number: z.number(),
    title: z.string(),
    /** One of the site config's `text.divisions`. Front matter has no division. */
    part: z.string().optional(),
    /** Verbatim sentences to set out as pull quotes after the paragraph they occur in. */
    pullquotes: z.array(z.string()).default([]),
    /** Whether paragraphs get ¶ numbers. */
    numbered: z.boolean().default(true),
    /** Editorial headnote above the unit's text; inline markdown, so links work. */
    note: z.string().optional(),
    footnotes: footnotesSchema,
    /** Notes shown beside a marginal heading, e.g. the argument a passage answers. */
    marginalia: z
      .array(z.object({ heading: z.string(), label: z.string(), href: z.string() }))
      .default([]),
  });

/** Collection names reference() will accept, with their literal types kept. */
type CollectionKey = Parameters<typeof reference>[0];

/** Shared shape for anything that gets a tooltip + page (the ref kinds). */
export const refEntrySchema = <C extends CollectionKey>(textCollection: C) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    /** Words to link in the primary text; defaults to the title, `[]` opts out. */
    terms: z.array(z.string()).optional(),
    chapters: z.array(reference(textCollection)).default([]),
    footnotes: footnotesSchema,
  });

/** Shared shape for an essay collection: title, summary, references into the text. */
export const essaySchema = <C extends CollectionKey>(textCollection: C) =>
  z.object({
    title: z.string(),
    summary: z.string(),
    chapters: z.array(reference(textCollection)).default([]),
    footnotes: footnotesSchema,
  });
