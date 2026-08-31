import PrevNext from "./PrevNext.astro";

export default {
  title: "Navigation/PrevNext",
  component: PrevNext,
  argTypes: { kind: { control: "text" } },
};

export const Both = {
  args: {
    kind: "chapter",
    prev: { href: "/chapters/01-of-sense/", title: "Of Sense" },
    next: { href: "/chapters/03-of-the-consequence-or-trayne-of-imaginations/", title: "Of the Consequence or Trayne of Imaginations" },
  },
};
export const OnlyNext = {
  args: { kind: "concept", next: { href: "/concepts/imagination/", title: "Imagination" } },
};
export const OnlyPrev = {
  args: { kind: "touchstone", prev: { href: "/touchstones/aristotle/", title: "Aristotle" } },
};
