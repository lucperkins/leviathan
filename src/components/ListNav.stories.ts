import ListNav from "./ListNav.astro";

const concepts = [
  { id: "sense", title: "Sense" },
  { id: "imagination", title: "Imagination" },
  { id: "commonwealth", title: "Commonwealth" },
];
const touchstones = [
  { id: "aristotle", title: "Aristotle" },
  { id: "cicero", title: "Cicero" },
];

export default {
  title: "Navigation/ListNav",
  component: ListNav,
  argTypes: {
    currentPath: { control: "text", description: "pathname of the page being read" },
  },
  decorators: [
    (story: () => unknown) => `<div class="w-80 bg-stone-100 px-4 py-6">${story()}</div>`,
  ],
};

export const Concepts = {
  args: { sectionId: "concepts", title: "Concepts", basePath: "/concepts", items: concepts },
};
export const ConceptsWithCurrent = {
  args: { ...Concepts.args, currentPath: "/concepts/sense/" },
};
export const Touchstones = {
  args: { sectionId: "touchstones", title: "Touchstones", basePath: "/touchstones", items: touchstones },
};
