import Lightbox from "./Lightbox.astro";
import frontispiece from "../assets/frontispiece.jpg";

export default {
  title: "Reading/Lightbox",
  component: Lightbox,
  decorators: [(story: () => unknown) => `<div class="max-w-md">${story()}</div>`],
};

/** Click the image to open it in a modal; Escape or the backdrop closes it. */
export const Default = {
  args: {
    src: frontispiece,
    alt: "The frontispiece of Leviathan, 1651.",
    caption: "Frontispiece engraved by Abraham Bosse, 1651. British Library copy, via Wikimedia Commons.",
    widths: [480, 720],
  },
};
