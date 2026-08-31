import Mark from "./Mark.astro";

export default {
  title: "Site/Mark",
  component: Mark,
  decorators: [(story: () => unknown) => `<div class="p-8 text-stone-400 dark:text-stone-600">${story()}</div>`],
};

/** As it sits above the title on the home page. */
export const Hero = { args: { size: 44 } };

/** Small enough to check that the crozier's curl still reads. */
export const Small = { args: { size: 20 } };

/** Large enough to see what the paths are actually doing. */
export const Large = { args: { size: 160 } };
