import ThemeToggle from "./ThemeToggle.astro";

export default {
  title: "Navigation/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (story: () => unknown) => `<div class="w-80 bg-stone-100 px-4 py-3 dark:bg-stone-900">${story()}</div>`,
  ],
};

/** Toggles the `dark` class on <html>; the whole Storybook canvas follows. */
export const Default = {};
