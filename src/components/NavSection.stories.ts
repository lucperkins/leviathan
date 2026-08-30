import NavSection from "./NavSection.astro";

const items = `
<ul class="space-y-1">
  <li><a href="#" class="block rounded px-2 py-1 text-stone-700 hover:bg-stone-200">1. Of Sense</a></li>
  <li><a href="#" class="block rounded px-2 py-1 text-stone-700 hover:bg-stone-200">2. Of Imagination</a></li>
</ul>`;

export default {
  title: "Navigation/NavSection",
  component: NavSection,
  argTypes: {
    title: { control: "text" },
    open: { control: "boolean" },
  },
  decorators: [
    (story: () => unknown) => `<div class="w-80 bg-stone-100 px-4 py-6 text-sm">${story()}</div>`,
  ],
};

export const Open = { args: { id: "demo", title: "Of Man", open: true, slots: { default: items } } };
export const Closed = { args: { id: "demo", title: "Of Man", open: false, slots: { default: items } } };

export const Nested = {
  args: {
    id: "demo-nested",
    title: "Of Man",
    open: true,
    nested: true,
    slots: { default: items },
  },
};
