import Glossary from "./Glossary.astro";
// @ts-ignore -- plain-JS data
import { latinIndex } from "../lib/latin.mjs";
// @ts-ignore -- plain-JS data
import { greekIndex } from "../lib/greek.mjs";

const latin = latinIndex();
const greek = greekIndex();

export default {
  title: "Appendix/Glossary",
  component: Glossary,
  decorators: [(story: () => unknown) => `<div class="max-w-3xl p-6">${story()}</div>`],
};

/** Terms of art, and the three famous tags that are not in the book. */
export const Latin = { args: { groups: latin.groups.slice(0, 2), absent: latin.absent } };

/** Mostly etymology, and a group whose entries run longer. */
export const Greek = { args: { groups: greek.groups.slice(2, 4) } };
