import config from "../site.config";
import { contentDir } from "../theme/lib/text.mjs";
import { rawMentions as count } from "../theme/lib/mentions.mjs";

/**
 * How often the chapter text uses any of `tokens`: whole words, case
 * insensitive, allowing the trailing s Hobbes writes for a possessive
 * ("Aristotles Metaphysiques"). Spelling variants go in the token list, since
 * the 1651 printer is not consistent ("Litleton" in XV, "Littleton" in XXVI).
 */
export const rawMentions = (tokens = []) => count(contentDir(config.text.collection), tokens);
