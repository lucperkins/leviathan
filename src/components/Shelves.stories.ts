import Shelves from "./Shelves.astro";
// @ts-ignore -- plain-JS data
import { SHELVES, REPLIES } from "../lib/library.mjs";

export default {
  title: "Appendix/Shelves",
  component: Shelves,
};

/** Books about Leviathan: the title carries the link when the book has an entry of its own. */
export const About = { args: { shelves: SHELVES.slice(0, 2) } };

/** Books answering Leviathan, where most links sit on the author instead. */
export const Replies = { args: { shelves: REPLIES } };
