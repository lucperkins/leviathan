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
};

export default config;
