import { getCollection } from "astro:content";
import config from "../../site.config";

export interface RefSummary {
  kind: string;
  id: string;
  title: string;
  summary: string;
}

/** Every tooltip-able entry across the ref collections named in the site config. */
export async function getAllRefs(): Promise<RefSummary[]> {
  const byKind = await Promise.all(
    config.refKinds.map(async (rk) => {
      // Collection names come from the config as strings, so the generated key types can't narrow them.
      const entries = (await getCollection(rk.collection as never)) as unknown as {
        id: string;
        data: { title: string; summary: string };
      }[];
      return entries.map((e) => ({ kind: rk.kind, id: e.id, title: e.data.title, summary: e.data.summary }));
    }),
  );
  return byKind.flat();
}
