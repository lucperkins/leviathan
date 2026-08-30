import { resolve, sep } from "node:path";
import { REF_KINDS } from "../plugins/rehype-concepts.mjs";

/**
 * Dev-only integration. Chapter MDX is compiled once by Vite with the concept
 * and author terms baked in by rehype-concepts. When a ref entry is added,
 * removed, or edited, invalidate the compiled chapter modules so the plugin
 * re-runs with the current term list, then reload the browser.
 *
 * New ref *pages* need none of this: Astro's content layer already watches
 * the collection directories in dev.
 *
 * @returns {import("astro").AstroIntegration}
 */
export default function refWatch() {
  return {
    name: "leviathan:ref-watch",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        const refDirs = REF_KINDS.map((k) => resolve(k.dir) + sep);
        const chapterDir = resolve("src/content/chapters") + sep;

        const invalidateChapters = (event, file) => {
          if (!refDirs.some((d) => file.startsWith(d))) return;
          let n = 0;
          for (const mod of server.moduleGraph.idToModuleMap.values()) {
            if (mod.file?.startsWith(chapterDir)) {
              server.moduleGraph.invalidateModule(mod);
              n++;
            }
          }
          logger.info(`${event} ${file.replace(process.cwd() + sep, "")}; invalidated ${n} chapter module(s)`);
          server.ws.send({ type: "full-reload" });
        };

        for (const event of ["add", "unlink", "change"]) {
          server.watcher.on(event, (file) => invalidateChapters(event, file));
        }
      },
    },
  };
}
