import NavIcon from "../theme/components/NavIcon.astro";
import NavIconSheet from "./NavIconSheet.astro";

export default {
  title: "Navigation/NavIcon",
  component: NavIcon,
};

/** Every mark in the site config at once, labelled by section. */
export const Default = { render: () => NavIconSheet };

/** One per top-level sidebar section; nested part sections get none. */
export const Book = { args: { name: "book" } };
export const Themes = { args: { name: "themes" } };
export const Concepts = { args: { name: "concepts" } };
export const Touchstones = { args: { name: "touchstones" } };
export const Kindred = { args: { name: "kindred" } };
export const Hobbes = { args: { name: "hobbes" } };
export const Works = { args: { name: "works" } };
export const Appendix = { args: { name: "appendix" } };
