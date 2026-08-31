import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import { contentDir } from "../lib/text.mjs";

/**
 * Reads every ref collection and returns [{ kind, id, terms }] where `terms`
 * are the words that should be linked in the primary text. Falls back to the
 * entry title when no `terms` list is given.
 *
 * @param {{ kind: string, collection: string }[]} kinds
 */
export function loadRefTerms(kinds) {
  return kinds.flatMap(({ kind, collection }) => {
    const dir = contentDir(collection);
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const { data } = matter(readFileSync(join(dir, f), "utf8"));
        const id = f.replace(/\.mdx$/, "");
        const terms = /** @type {string[]} */ (data.terms ?? [data.title]).filter(Boolean);
        return { kind, id, terms };
      });
  });
}

const SKIP = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre", "concept-ref"]);

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Rehype plugin: wraps ref terms in the primary text's body with
 * <concept-ref data-kind="<kind>" data-concept="id">…</concept-ref>.
 * Only runs on files in the text collection so ref pages don't self-link.
 *
 * The ref list is re-read on every transform (it is a handful of files) so
 * edits to an entry's `terms` apply the next time a unit is compiled.
 * Adding or removing an entry is handled by the ref-watch integration, which
 * invalidates compiled unit modules so this plugin runs again.
 *
 * @param {{ refKinds: { kind: string, collection: string }[], textCollection: string }} options
 */
export default function rehypeConcepts({ refKinds, textCollection }) {
  const marker = `/content/${textCollection}/`;
  const buildMatchers = () =>
    loadRefTerms(refKinds)
      .filter(({ terms }) => terms.length > 0) // `terms: []` opts an entry out of linking
      .map(({ kind, id, terms }) => ({
      kind,
      id,
        re: new RegExp(`\\b(${terms.map(escape).join("|")})\\b`, "gi"),
      }));

  return (tree, file) => {
    if (!file.path?.includes(marker)) return;
    const matchers = buildMatchers();
    if (matchers.length === 0) return;

    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined || SKIP.has(parent.tagName)) return;

      /** @type {any[]} */
      let pieces = [node];
      for (const { kind, id, re } of matchers) {
        pieces = pieces.flatMap((piece) => {
          if (piece.type !== "text") return [piece];
          const out = [];
          let last = 0;
          for (const m of piece.value.matchAll(re)) {
            if (m.index > last) out.push({ type: "text", value: piece.value.slice(last, m.index) });
            out.push({
              type: "element",
              tagName: "concept-ref",
              properties: {
                dataKind: kind,
                dataConcept: id,
                "x-data": "conceptRef",
                "x-bind": "conceptRefEvents",
              },
              children: [{ type: "text", value: m[0] }],
            });
            last = m.index + m[0].length;
          }
          if (last < piece.value.length) out.push({ type: "text", value: piece.value.slice(last) });
          return out.length ? out : [piece];
        });
      }
      if (pieces.length === 1 && pieces[0] === node) return;
      parent.children.splice(index, 1, ...pieces);
      return index + pieces.length;
    });
  };
}
