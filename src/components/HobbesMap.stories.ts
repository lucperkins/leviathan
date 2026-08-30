import HobbesMap from "./HobbesMap.astro";

export default {
  title: "Hobbes/HobbesMap",
  component: HobbesMap,
  decorators: [(story: () => unknown) => `<div class="max-w-2xl p-6">${story()}</div>`],
};

/** Hover or focus a place to preview it; click to pin it. */
export const Default = {};
