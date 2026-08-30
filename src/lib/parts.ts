/** The four parts of Leviathan, in order. Chapter frontmatter `part` must match a title here. */
export const PARTS = [
  "Of Man",
  "Of Common-wealth",
  "Of a Christian Common-wealth",
  "Of the Kingdome of Darknesse",
] as const;

const ROMAN = ["I", "II", "III", "IV"];

/** "Of Man" → 1; unknown titles sort last. */
export const partNumber = (title: string) => {
  const i = PARTS.indexOf(title as (typeof PARTS)[number]);
  return i < 0 ? PARTS.length + 1 : i + 1;
};

/** "Of Man" → "I. Of Man". */
export const partLabel = (title: string) => {
  const n = partNumber(title);
  return n <= PARTS.length ? `${ROMAN[n - 1]}. ${title}` : title;
};
