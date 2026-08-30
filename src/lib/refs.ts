import { getCollection } from "astro:content";

export type RefKind = "concept" | "interlocutor";

export interface RefSummary {
  kind: RefKind;
  id: string;
  title: string;
  summary: string;
}

/** URL prefix for each ref kind. */
export const refPath = (kind: RefKind, id: string) => `/${kind}s/${id}/`;

/** Every tooltip-able entry across all ref collections. */
export async function getAllRefs(): Promise<RefSummary[]> {
  const [concepts, interlocutors] = await Promise.all([getCollection("concepts"), getCollection("interlocutors")]);
  return [
    ...concepts.map((c) => ({ kind: "concept" as const, id: c.id, title: c.data.title, summary: c.data.summary })),
    ...interlocutors.map((a) => ({ kind: "interlocutor" as const, id: a.id, title: a.data.title, summary: a.data.summary })),
  ];
}
