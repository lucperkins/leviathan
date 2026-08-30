import Gloss from "./Gloss.astro";

export default {
  title: "Reading/Gloss",
  component: Gloss,
  argTypes: {
    note: { control: "text", description: "The note shown on hover or focus" },
  },
  decorators: [
    (story: () => unknown) =>
      `<p class="max-w-prose font-serif text-lg leading-relaxed">There is no narrative of the fighting, no mention of ${story()} or of the scaffold at Whitehall.</p>`,
  ],
};

export const Default = {
  args: {
    note: "The battle of 14 June 1645, at which the New Model Army destroyed the King's main field army in an afternoon.",
    slots: { default: "Naseby" },
  },
};

export const Short = {
  args: {
    note: "Where Charles I was executed on 30 January 1649.",
    slots: { default: "Whitehall" },
  },
};

export const Long = {
  args: {
    note: "A scaffold built against the Banqueting House in Whitehall, where Charles I was beheaded on 30 January 1649 before a large crowd that is said to have groaned rather than cheered. Hobbes was in Paris and heard of it at a distance.",
    slots: { default: "the scaffold at Whitehall" },
  },
};
