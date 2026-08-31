import MarginNav from "./MarginNav.astro";

export default {
  title: "Navigation/MarginNav",
  component: MarginNav,
  parameters: { layout: "fullscreen" },
};

/** Both rails, as on a chapter in the middle of the book. */
export const Both = {
  args: {
    prev: { href: "#prev", title: "Of Religion" },
    next: { href: "#next", title: "Of the First and Second Naturall Lawes" },
  },
};

/** The first page of a section has only one. */
export const NextOnly = { args: { next: { href: "#next", title: "Of Imagination" } } };
