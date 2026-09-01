import ChapterNote from "../theme/components/ChapterNote.astro";

export default {
  title: "Reading/ChapterNote",
  component: ChapterNote,
};

/** The editorial headnote above a chapter, marked with the printer's asterisk. */
export const Default = {
  args: {
    note: "Part IV opens by naming four causes of spirituall darkness; this chapter takes the first of them, the abuse of scripture. Its second half answers texts rather than doctrines, much as the end of [Chapter 42](/chapters/42-of-power-ecclesiasticall/) does.",
  },
};
