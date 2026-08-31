import ConceptRefs from "./ConceptRefs.astro";

const concepts = [
  {
    kind: "concept",
    id: "sense",
    title: "Sense",
    summary:
      "The origin of every thought: external bodies pressing on the organs, producing in us a fancy that seems to be outside us.",
  },
];

export default {
  title: "Reading/ConceptRefs",
  component: ConceptRefs,
  parameters: { layout: "padded" },
};

/** Hover or focus a dotted word to open the tooltip. */
export const Default = { args: { refs: concepts } };
