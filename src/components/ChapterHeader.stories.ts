import ChapterHeader from "./ChapterHeader.astro";

export default {
  title: "Reading/ChapterHeader",
  component: ChapterHeader,
  argTypes: {
    number: { control: "number", description: "Chapter number" },
    title: { control: "text", description: "Chapter title" },
  },
};

export const Short = {
  args: { number: 1, title: "Of Sense" },
};

export const Long = {
  args: {
    number: 13,
    title: "Of the Naturall Condition of Mankind, as Concerning Their Felicity, and Misery",
  },
};
