import MarginNav from "./MarginNav.astro";

export default {
  title: "Navigation/MarginNav",
  component: MarginNav,
  parameters: { layout: "fullscreen" },
  decorators: [
    (story: () => unknown) =>
      `<div class="min-h-[60vh] p-16 text-stone-600">
         <p class="mx-auto max-w-2xl">Move the pointer to the far left or right of the window. The rails only
         appear above 80rem, so widen the preview if nothing shows.</p>${story()}</div>`,
  ],
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
