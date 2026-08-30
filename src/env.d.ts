/// <reference types="astro/client" />

// @alpinejs/persist ships no type declarations; the `$persist` augmentation lives in src/alpine.ts.
declare module "@alpinejs/persist" {
  import type { PluginCallback } from "alpinejs";
  const persist: PluginCallback;
  export default persist;
}
