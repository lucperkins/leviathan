import ResumeReading from "./ResumeReading.astro";

/**
 * The button reads its position from localStorage, so the stories seed it.
 *
 * A decorator here may set things up and must then return `story()` untouched.
 * It cannot wrap the result in markup: storybook-astro renders each component
 * over a websocket and `story()` hands back a descriptor, not HTML, so putting
 * it in a template literal prints the source of an Astro internal instead.
 */
const seed = (value: unknown) => (story: () => unknown) => {
  if (value === null) localStorage.removeItem("leviathan:reading");
  else localStorage.setItem("leviathan:reading", JSON.stringify(value));
  return story();
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
