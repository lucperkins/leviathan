import config from "../site.config";
import { divisionLabel, divisionNumber } from "../theme/lib/divisions";

/** The four parts of Leviathan, in order, from the site config. Chapter frontmatter `part` must match a title here. */
export const PARTS = config.text.divisions;

/** "Of Man" → 1; unknown titles sort last. */
export const partNumber = (title: string) => divisionNumber(PARTS, title);

/** "Of Man" → "I. Of Man". */
export const partLabel = (title: string) => divisionLabel(PARTS, title);

/** "Of the Kingdome of Darknesse" → "of-the-kingdome-of-darknesse", for /parts/ routes. */
export { divisionSlug as partSlug } from "../theme/lib/divisions";
