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
  core: {
    builder: "@storybook/builder-vite",
  },
};

export default config;
