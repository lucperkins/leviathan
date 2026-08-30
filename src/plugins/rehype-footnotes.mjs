import { visit } from "unist-util-visit";

/** Minimal inline markdown for footnote text: **bold**, *emphasis*, [links](/href). */
function inline(text) {
  const out = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    if (m.index > last) out.push({ type: "text", value: text.slice(last, m.index) });
    if (m[1] !== undefined) {
      out.push({ type: "element", tagName: "a", properties: { href: m[2] }, children: inline(m[1]) });
    } else if (m[3] !== undefined) {
      out.push({ type: "element", tagName: "strong", properties: {}, children: [{ type: "text", value: m[3] }] });
    } else {
      out.push({ type: "element", tagName: "em", properties: {}, children: [{ type: "text", value: m[4] }] });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: "text", value: text.slice(last) });
  return out;
}

const el = (tagName, properties, children = []) => ({ type: "element", tagName, properties, children });

/**
 * Editorial footnotes in any content collection, driven by frontmatter:
 *
 *   footnotes:
 *     - after: "Mr. Seldens most excellent Treatise of that subject."
 *       text: "John Selden (1584–1654), *Titles of Honor* (1614)…"
 *
 * `after` is matched against the text; a numbered marker is inserted straight
 * after it, and the notes are collected at the foot of the entry. Runs late,
 * so markers are not counted as paragraph text and the appended list is not
 * given a ¶ number.
 */
export default function rehypeFootnotes() {
  return (tree, file) => {
    if (!file.path?.includes("/content/")) return;
    const notes = file.data?.astro?.frontmatter?.footnotes ?? [];
    if (!notes.length) return;

    const placed = new Set();

    notes.forEach((note, i) => {
      const n = i + 1;
      visit(tree, "text", (node, index, parent) => {
        if (placed.has(n) || !parent || index === undefined) return;
        if (parent.tagName === "a" || parent.tagName === "sup") return;
        const at = node.value.indexOf(note.after);
        if (at < 0) return;

        // The marker goes after the punctuation, not before it: "Godolphin;1",
        // never "Godolphin1;". A dash is the one mark it precedes.
        let end = at + note.after.length;
        while (end < node.value.length && /[.,;:!?)\]'"’”]/.test(node.value[end])) end++;
        const marker = el("sup", { className: ["fn-ref"] }, [
          el("a", { id: `fnref-${n}`, href: `#fn-${n}` }, [{ type: "text", value: String(n) }]),
        ]);
        const replacement = [
          { type: "text", value: node.value.slice(0, end) },
          marker,
          { type: "text", value: node.value.slice(end) },
        ].filter((p) => p.type !== "text" || p.value !== "");

        parent.children.splice(index, 1, ...replacement);
        placed.add(n);
        return index + replacement.length;
      });
    });

    const missing = notes.map((_, i) => i + 1).filter((n) => !placed.has(n));
    if (missing.length) {
      console.warn(`[footnotes] no match in ${file.path} for note(s): ${missing.join(", ")}`);
    }

    tree.children.push(
      el("div", { className: ["chapter-footnotes"] }, [
        el("p", { className: ["chapter-footnotes__title"], id: "notes" }, [{ type: "text", value: "Notes" }]),
        el(
          "ol",
          { className: ["footnotes"] },
          notes.map((note, i) =>
            el("li", { id: `fn-${i + 1}` }, [
              // The number is the way back: it returns to the marker it belongs to.
              el(
                "a",
                { href: `#fnref-${i + 1}`, className: ["footnotes__num"], ariaLabel: "Back to the text" },
                [{ type: "text", value: String(i + 1) }],
              ),
              el("span", {}, inline(note.text)),
            ]),
          ),
        ),
      ]),
    );
  };
}
