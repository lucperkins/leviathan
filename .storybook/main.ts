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
  /**
   * The dev server watches the project root, so `bun run build` or
   * `build-storybook` in another terminal rewrites files under it and forces a
   * full page reload in whatever story is open. Ignore the build outputs.
   * Vite's own defaults are restated because this list replaces them.
   */
  async viteFinal(config) {
    config.server ??= {};
    config.server.watch = {
      ...config.server.watch,
      ignored: ["**/.git/**", "**/node_modules/**", "**/dist/**", "**/storybook-static/**", "**/.astro/**"],
    };
    return config;
  },
};

export default config;
