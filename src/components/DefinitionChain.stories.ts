import DefinitionChain from "./DefinitionChain.astro";

export default {
  title: "Apparatus/DefinitionChain",
  component: DefinitionChain,
};

/** Pick a term to derive it; click a bold word inside a sentence to re-root the chain. */
export const Default = { args: { hrefs: {} } };

/** The end of Part III, which reaches back through the political chapters. */
export const Church = { args: { start: "church", hrefs: {} } };
