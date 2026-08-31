import React from "react";
import { IconButton } from "storybook/internal/components";
import { addons, types, useGlobals } from "storybook/manager-api";

/**
 * The theme control in the toolbar, as one button that cycles rather than a
 * menu that has to be opened and picked from — the same gesture the site's own
 * ThemeToggle uses, and in the same order: light, sepia, dark.
 *
 * The `theme` global is declared in preview.ts, which also does the work of
 * putting the class on <html>. This only changes it.
 */
const ORDER = ["light", "sepia", "dark"] as const;
const LABEL = { light: "Light", sepia: "Sepia", dark: "Dark" } as const;
const GLYPH = { light: "☀", sepia: "◗", dark: "☾" } as const;

function ThemeCycle() {
  const [globals, updateGlobals] = useGlobals();
  const theme = (globals.theme ?? "light") as (typeof ORDER)[number];
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  return (
    <IconButton
      key="theme-cycle"
      title={`Theme: ${LABEL[theme]} — click for ${LABEL[next]}`}
      onClick={() => updateGlobals({ theme: next })}
    >
      <span style={{ fontSize: 14, lineHeight: 1, width: "1.1em", textAlign: "center" }}>{GLYPH[theme]}</span>
      <span style={{ marginLeft: 6 }}>{LABEL[theme]}</span>
    </IconButton>
  );
}

addons.register("leviathan/theme", () => {
  addons.add("leviathan/theme", {
    title: "Theme",
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: ThemeCycle,
  });
});
