import config from "../site.config";
import { contentDir, loadUnits, locatable, locate, quoteHref as themeQuoteHref } from "../theme/lib/text.mjs";

/**
 * The chapter text, bound to this site's config, for the apparatus pages
 * that locate quotations in it (the home page, /thinkers/, /definitions/).
 */

/** Chapters whose paragraphs `locate` can search, in reading order on disk. */
export const loadChapters = () => locatable(loadUnits(contentDir(config.text.collection)));

export { locate };

/** URL for a quotation of chapter `id`, highlighting it on arrival. */
export const quoteHref = (id, para, quote) => themeQuoteHref(config.text.basePath, id, para, quote);
