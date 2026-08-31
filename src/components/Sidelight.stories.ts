import Sidelight from "../theme/components/Sidelight.astro";

export default {
  title: "Reading/Sidelight",
  component: Sidelight,
};

/** A modern rhyme with the text, boxed as an aside beside the argument. */
export const Default = {
  args: {
    title: "The hedonic treadmill",
    slots: {
      default:
        "<p>In 1971 Brickman and Campbell gave the thing a name: pleasure is registered as departure from a level a person has adapted to, so a gain raises the level and stops being felt.</p><p>Hobbes has the conclusion in Chapter XI, by deduction from motion rather than by asking anybody anything.</p>",
    },
  },
};
