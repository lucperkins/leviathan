import Glossary from "../theme/components/Glossary.astro";
// @ts-ignore -- plain-JS data. These modules import nothing, which is the point:
// the machinery that locates each term reads the chapter files with node:fs and
// cannot run in a browser, so a story must never reach for it.
import { GROUPS as LATIN_GROUPS, TERMS as LATIN_TERMS, ABSENT as LATIN_ABSENT } from "../lib/latin.mjs";
// @ts-ignore -- plain-JS data
import { GROUPS as GREEK_GROUPS, TERMS as GREEK_TERMS } from "../lib/greek.mjs";

/** What glossaryIndex does at build time, minus the citations it reads from disk. */
const group = (groups: { id: string }[], terms: { group: string }[]) =>
  groups.map((g) => ({ ...g, terms: terms.filter((t) => t.group === g.id) }));

export default {
  title: "Appendix/Glossary",
  component: Glossary,
};

/** Terms of art, and the three famous tags that are not in the book. */
export const Latin = {
  args: { groups: group(LATIN_GROUPS, LATIN_TERMS).slice(0, 2), absent: LATIN_ABSENT },
};

/** Mostly etymology, and a group whose entries run longer. */
export const Greek = { args: { groups: group(GREEK_GROUPS, GREEK_TERMS).slice(2, 4) } };
