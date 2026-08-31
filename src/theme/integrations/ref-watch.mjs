import { resolve, sep } from "node:path";
import { contentDir } from "../lib/text.mjs";

/**
 * Dev-only integration. The primary text's MDX is compiled once by Vite with
 * the ref terms baked in by rehype-concepts. When a ref entry is added,
 * removed, or edited, invalidate the compiled text modules so the plugin
 * re-runs with the current term list, then reload the browser.
 *
 * New ref *pages* need none of this: Astro's content layer already watches
 * the collection directories in dev.
 *
 * @param {{ refKinds: { collection: string }[], textCollection: string }} options
 * @returns {import("astro").AstroIntegration}
 */
export default function refWatch({ refKinds, textCollection }) {
  return {
    name: "theme:ref-watch",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        const refDirs = refKinds.map((k) => resolve(contentDir(k.collection)) + sep);
        const textDir = resolve(contentDir(textCollection)) + sep;

        const invalidateUnits = (event, file) => {
          if (!refDirs.some((d) => file.startsWith(d))) return;
          let n = 0;
          for (const mod of server.moduleGraph.idToModuleMap.values()) {
            if (mod.file?.startsWith(textDir)) {
              server.moduleGraph.invalidateModule(mod);
              n++;
            }
          }
          logger.info(`${event} ${file.replace(process.cwd() + sep, "")}; invalidated ${n} text module(s)`);
          server.ws.send({ type: "full-reload" });
        };

        for (const event of ["add", "unlink", "change"]) {
          server.watcher.on(event, (file) => invalidateUnits(event, file));
        }
      },
    },
  };
}
