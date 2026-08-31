/**
 * Tiny inline-markdown for frontmatter `summary` strings: `*text*` → <em>,
 * `[text](href)` → <a>. Everything else is HTML-escaped. Use with set:html.
 */
export function inlineMarkdown(src: string): string {
  const esc = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return esc
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
