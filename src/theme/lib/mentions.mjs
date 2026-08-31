import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/** Every unit body joined, marginal headings included, read once per build per dir. */
const corpora = new Map();
function text(dir) {
  if (!corpora.has(dir)) {
    corpora.set(
      dir,
      readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => matter(readFileSync(join(dir, f), "utf8")).content)
        .join("\n"),
    );
  }
  return corpora.get(dir);
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * How often the text in `dir` uses any of `tokens`: whole words, case
 * insensitive, allowing a trailing s for an early-modern possessive
 * ("Aristotles Metaphysiques"). Spelling variants go in the token list, since
 * old printers are not consistent ("Litleton" in XV, "Littleton" in XXVI).
 */
export function rawMentions(dir, tokens = []) {
  return tokens.reduce(
    (n, t) => n + (text(dir).match(new RegExp(`\\b${escape(t)}s?\\b`, "gi")) ?? []).length,
    0,
  );
}
