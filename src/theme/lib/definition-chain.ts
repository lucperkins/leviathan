/**
 * The machinery behind a chain of definitions: each definition's sentence
 * marks the terms it borrows inline as `{word|id}`, where `word` is how it
 * appears in the sentence and `id` is the definition it points back to.
 * The dependency edges and the derivation of a term back to its roots are
 * computed from those strings, so there is one place to correct.
 */

export interface ChainDefinition {
  id: string;
  /** The defining sentence, with borrowings marked `{word|id}`. */
  text: string;
}

export type Segment = { text: string } | { word: string; of: string };

/** Split a definition's text into plain runs and the terms it borrows. */
export function segments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(/\{([^{}|]+)\|([a-z]+)\}/g)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ word: m[1], of: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** The terms a definition consumes directly, in the order they appear. */
export function borrows(d: ChainDefinition): string[] {
  const seen = new Set<string>();
  for (const s of segments(d.text)) if ("of" in s) seen.add(s.of);
  return [...seen];
}

/**
 * Everything a term rests on, itself included, in the order the list defines
 * them. This is the derivation: reading it top to bottom is reading the
 * author's own order of proof.
 */
export function derivation<T extends ChainDefinition>(definitions: T[], id: string): T[] {
  const byId = new Map(definitions.map((d) => [d.id, d]));
  const need = new Set<string>();
  const walk = (at: string) => {
    if (need.has(at)) return;
    need.add(at);
    const d = byId.get(at);
    if (d) for (const b of borrows(d)) walk(b);
  };
  walk(id);
  return definitions.filter((d) => need.has(d.id));
}

/** Definitions that consume this one, for reading the chain forwards. */
export function usedBy<T extends ChainDefinition>(definitions: T[], id: string): T[] {
  return definitions.filter((d) => borrows(d).includes(id));
}
