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
  decorators: [
    (story: () => unknown) => `
      <div class="prose-chapter max-w-2xl font-serif text-lg leading-relaxed" style="padding-bottom: 10rem">
        <p>
          The Originall of them all, is that which we call
          <concept-ref data-kind="concept" data-concept="sense" x-data="conceptRef" x-bind="conceptRefEvents">Sense</concept-ref>; (For there is no
          conception in a mans mind, which hath not at first, totally, or by parts,
          been begotten upon the organs of <concept-ref data-kind="concept" data-concept="sense" x-data="conceptRef" x-bind="conceptRefEvents">Sense</concept-ref>.)
          The rest are derived from that originall.
        </p>
        ${story()}
      </div>`,
  ],
};

/** Hover or focus a dotted word to open the tooltip. */
export const Default = { args: { refs: concepts } };
