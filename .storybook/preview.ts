import "../src/styles/global.css";

/**
 * A decorator may set things up — classes on <html>, values in localStorage —
 * and must then return `story()` untouched. It cannot wrap the result in
 * markup. storybook-astro renders each component on the server over a
 * websocket, so `story()` returns a descriptor rather than HTML, and dropping
 * that into a template literal prints the source of an Astro internal:
 * "(...args) => { if (!validateArgs(args)) ...". Every wrapping decorator in
 * this project did exactly that, which is why the stories showed a function
 * body instead of a component. Layout that a story needs goes in
 * preview-head.html.
 *
 * The site's three themes as a toolbar control. On the site itself the class
 * goes on <html> and the page background comes from Layout.astro; stories have
 * no Layout, so the decorator also puts the body colours on directly, using
 * the same four utilities Layout puts on its <body>.
 */
/**
 * No `toolbar` here on purpose: a toolbar item renders as a menu you open and
 * pick from, and manager.tsx puts a single cycling button in its place instead.
 */
export const globalTypes = {
  theme: { description: "Site theme" },
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
      // Add rather than assign: Storybook puts its own classes on the body
      // (sb-show-main, sb-main-padded) and replacing them loses the padding.
      document.body.classList.add("bg-stone-50", "text-stone-900", "dark:bg-stone-950", "dark:text-stone-100");
      return story();
    },
  ],
};

export default preview;
