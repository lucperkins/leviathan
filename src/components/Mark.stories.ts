import Mark from "./Mark.astro";

export default {
  title: "Site/Mark",
  component: Mark,
};

/** As it sits above the title on the home page. */
export const Hero = { args: { size: 44 } };

/** Small enough to check that the orb and the crossguard still read. */
export const Small = { args: { size: 20 } };

/** Large enough to see what the paths are actually doing. */
export const Large = { args: { size: 160 } };
