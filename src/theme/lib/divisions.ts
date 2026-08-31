/** The ordered divisions ("parts") of the primary text, from the site config's `text.divisions`. */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** First division → 1; unknown titles sort last. */
export const divisionNumber = (divisions: readonly string[], title: string) => {
  const i = divisions.indexOf(title);
  return i < 0 ? divisions.length + 1 : i + 1;
};

/** "Of Man" → "I. Of Man". */
export const divisionLabel = (divisions: readonly string[], title: string) => {
  const n = divisionNumber(divisions, title);
  return n <= divisions.length ? `${ROMAN[n - 1]}. ${title}` : title;
};
