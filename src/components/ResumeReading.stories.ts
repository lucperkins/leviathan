import ResumeReading from "./ResumeReading.astro";

/** The button reads its position from localStorage, so the stories seed it. */
const seed = (value: unknown) => (story: () => unknown) => {
  if (value === null) localStorage.removeItem("leviathan:reading");
  else localStorage.setItem("leviathan:reading", JSON.stringify(value));
  return `<div class="p-4">${story()}</div>`;
};

export default {
  title: "Reading/ResumeReading",
  component: ResumeReading,
};

/** Someone who has read as far as Chapter 13. */
export const InProgress = {
  decorators: [seed({ id: "13-of-the-naturall-condition-of-mankind", label: "Chapter 13", para: "p7", at: Date.now() })],
};

/** The front matter has no paragraph numbers, so the link is to the page itself. */
export const FrontMatter = {
  decorators: [seed({ id: "the-introduction", label: "The Introduction", para: null, at: Date.now() })],
};

/** Nothing read yet: the button stays hidden. */
export const Unread = {
  decorators: [seed(null)],
};
