import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CHAPTER_DIR = "src/content/chapters";

/** Every chapter body joined, marginal headings included, read once per build. */
let corpus = null;
function text() {
  if (corpus === null) {
    corpus = readdirSync(CHAPTER_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => matter(readFileSync(join(CHAPTER_DIR, f), "utf8")).content)
      .join("\n");
  }
  return corpus;
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * How often the chapter text uses any of `tokens`: whole words, case
 * insensitive, allowing the trailing s Hobbes writes for a possessive
 * ("Aristotles Metaphysiques"). Spelling variants go in the token list, since
 * the 1651 printer is not consistent ("Litleton" in XV, "Littleton" in XXVI).
 */
export function rawMentions(tokens = []) {
  return tokens.reduce(
    (n, t) => n + (text().match(new RegExp(`\\b${escape(t)}s?\\b`, "gi")) ?? []).length,
    0,
  );
}
