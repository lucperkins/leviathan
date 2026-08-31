import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "storybook-astro";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "storybook-astro",
    options: {
      // Alpine powers all interactivity; load it into every story.
      scripts: ["/.storybook/alpine.ts"],
    },
  },
  // storybook-astro's preset points at the builder by absolute directory path,
  // which Node cannot resolve as ESM; name it here so the bare specifier wins.
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    /**
     * Tailwind v4 generates its utilities in a Vite plugin; astro.config.mjs
     * registers it for the site, and Storybook has its own Vite config, so it
     * needs the plugin too. Without it `@import "tailwindcss"` resolves to a
     * file of @theme and @layer declarations that nothing compiles, so every
     * utility class in every component silently does nothing and only the
     * hand-written rules in global.css survive.
     */
    config.plugins ??= [];
    config.plugins.push(tailwindcss());

    /**
     * The dev server watches the project root, so `bun run build` or
     * `build-storybook` in another terminal rewrites files under it and forces
     * a full page reload in whatever story is open. Ignore the build outputs.
     * Vite's own defaults are restated because this list replaces them.
     */
    config.server ??= {};
    config.server.watch = {
      ...config.server.watch,
      ignored: ["**/.git/**", "**/node_modules/**", "**/dist/**", "**/storybook-static/**", "**/.astro/**"],
    };
    return config;
  },
};

export default config;
