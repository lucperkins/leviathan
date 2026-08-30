import "../src/styles/global.css";

/**
 * The site's three themes as a toolbar control. On the site itself the class
 * goes on <html> and the page background comes from Layout.astro; stories have
 * no Layout, so the decorator also puts the body colours on directly, using
 * the same utilities Layout uses.
 */
export const globalTypes = {
  theme: {
    description: "Site theme",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "sepia", title: "Sepia", icon: "book" },
        { value: "dark", title: "Dark", icon: "moon" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview = {
  parameters: {
    layout: "padded",
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (story: () => unknown, context: { globals: { theme?: string } }) => {
      const theme = context.globals.theme ?? "light";
      const root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
      root.classList.toggle("theme-sepia", theme === "sepia");
      document.body.className = "bg-stone-50 text-stone-900";
      return story();
    },
  ],
};

export default preview;
