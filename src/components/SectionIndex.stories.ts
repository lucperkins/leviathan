import SectionIndex from "./SectionIndex.astro";

const entries = [
  {
    href: "/themes/power/",
    title: "Power",
    meta: "Power",
    summary:
      "The master term of the book. Hobbes defines power as a man's present means to some future good, and then shows that because power is comparative, the pursuit of it cannot stop.",
  },
  {
    href: "/themes/reason/",
    title: "Reason",
    meta: "Reason",
    summary: "Not a faculty that perceives truths but rather an operation: adding and subtracting the consequences of names.",
  },
];

export default {
  title: "Navigation/SectionIndex",
  component: SectionIndex,
  argTypes: {
    title: { control: "text" },
    intro: { control: "text", description: "Inline markdown; links are allowed" },
    eyebrow: { control: "text" },
  },
};

export const Default = {
  args: {
    title: "Themes",
    intro: "Large subjects that run the length of the book, each gathering passages from chapters that sit far apart.",
    entries,
  },
};

export const WithEyebrow = {
  args: { eyebrow: "Appendix", title: "Appendix", intro: "Apparatus rather than argument.", entries },
};

export const WithoutMeta = {
  args: {
    title: "Concepts",
    intro: "The terms Hobbes fixes and then builds on.",
    entries: entries.map(({ meta, ...rest }) => rest),
  },
};
