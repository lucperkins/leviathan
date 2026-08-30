import ConceptHeader from "./ConceptHeader.astro";

export default {
  title: "Reading/ConceptHeader",
  component: ConceptHeader,
  argTypes: {
    kind: { control: "text" },
    title: { control: "text" },
    meta: { control: "text" },
    summary: { control: "text" },
  },
};

export const Concept = {
  args: {
    title: "Sense",
    summary:
      "The origin of every thought: external bodies pressing on the organs, producing in us a fancy that seems to be outside us.",
  },
};

export const Interlocutor = {
  args: {
    kind: "Interlocutor",
    title: "Aristotle",
    meta: "384–322 BC",
    summary: "Greek philosopher whose works, filtered through the medieval schools, were the authority Hobbes set out to displace.",
  },
};
