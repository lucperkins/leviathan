import RelatedLinks from "./RelatedLinks.astro";

export default {
  title: "Reading/RelatedLinks",
  component: RelatedLinks,
  argTypes: { title: { control: "text" } },
};

export const Chapters = {
  args: {
    title: "Read in Leviathan",
    items: [
      { href: "/chapters/01-of-sense/", label: "Chapter 1: Of Sense" },
      { href: "/chapters/02-of-imagination/", label: "Chapter 2: Of Imagination" },
    ],
  },
};
export const Concepts = {
  args: {
    title: "Related concepts",
    items: [
      { href: "/concepts/common-wealth/", label: "Common-wealth" },
      { href: "/concepts/sense/", label: "Sense" },
    ],
  },
};
export const Empty = { args: { title: "Read in Leviathan", items: [] } };
