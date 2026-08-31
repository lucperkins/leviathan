import config from "../site.config";
import { contentDir } from "../theme/lib/text.mjs";
import { glossaryIndex as build } from "../theme/lib/glossary.mjs";

/**
 * The machinery behind the language glossaries — `latin.mjs`, `greek.mjs` —
 * bound to this site's chapter text. See src/theme/lib/glossary.mjs.
 */
export const glossaryIndex = (glossary) =>
  build({ ...glossary, dir: contentDir(config.text.collection) });
