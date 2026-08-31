import ChapterNav from "./ChapterNav.astro";

const chapters = [
  { id: "the-epistle-dedicatory", number: -1, title: "The Epistle Dedicatory" },
  { id: "the-introduction", number: 0, title: "The Introduction" },
  { id: "01-of-sense", number: 1, title: "Of Sense", part: "Of Man" },
  { id: "02-of-imagination", number: 2, title: "Of Imagination", part: "Of Man" },
  {
    id: "03-of-the-consequence-or-trayne-of-imaginations",
    number: 3,
    title: "Of the Consequence or Trayne of Imaginations",
    part: "Of Man",
  },
  {
    id: "17-of-the-causes-generation-and-definition-of-a-common-wealth",
    number: 17,
    title: "Of the Causes, Generation, and Definition of a Common-wealth",
    part: "Of Common-wealth",
  },
  { id: "21-of-the-liberty-of-subjects", number: 21, title: "Of the Liberty of Subjects", part: "Of Common-wealth" },
  { id: "a-review-and-conclusion", number: 48, title: "A Review, and Conclusion" },
];

export default {
  title: "Navigation/ChapterNav",
  component: ChapterNav,
  argTypes: {
    currentPath: {
      control: "select",
      options: [undefined, ...chapters.map((c) => `/chapters/${c.id}/`)],
      description: "pathname of the page being read",
    },
  },
};

export const Default = {
  args: { chapters },
};

export const WithCurrentChapter = {
  args: { chapters, currentPath: "/chapters/02-of-imagination/" },
};

export const SinglePart = {
  args: { chapters: chapters.filter((c) => c.part === "Of Man") },
};

export const ChaptersOnly = {
  args: { chapters: chapters.filter((c) => c.part) },
};
