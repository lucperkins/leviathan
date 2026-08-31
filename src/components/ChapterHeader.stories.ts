import ChapterHeader from "../theme/components/ChapterHeader.astro";

export default {
  title: "Reading/ChapterHeader",
  component: ChapterHeader,
  argTypes: {
    number: { control: "number", description: "Chapter number" },
    part: { control: "text", description: "Part title; leave empty for front or back matter" },
    title: { control: "text", description: "Chapter title" },
  },
};

export const Short = {
  args: { number: 1, title: "Of Sense", part: "Of Man" },
};

export const FrontMatter = {
  args: { number: 0, title: "The Introduction" },
};

export const BackMatter = {
  args: { number: 48, title: "A Review, and Conclusion" },
};

export const Long = {
  args: {
    number: 13,
    title: "Of the Naturall Condition of Mankind, as Concerning Their Felicity, and Misery",
    part: "Of Man",
  },
};
