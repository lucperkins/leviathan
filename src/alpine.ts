import type { Alpine } from "alpinejs";
import persist from "@alpinejs/persist";

/** @alpinejs/persist adds `$persist` to the Alpine object; its package ships no types. */
declare module "alpinejs" {
  interface Alpine {
    $persist<T>(value: T): { as(key: string): T; using(storage: Storage): T };
  }
}

/** Shape of the `conceptRef` component, so `Alpine.bind` handlers can type `this`. */
interface ConceptRef {
  $el: HTMLElement;
  tip: HTMLElement | null;
  timer: number | undefined;
  schedule(open: boolean, delay: number): void;
  show(): void;
  hide(): void;
  position(tip: HTMLElement): void;
}

/**
 * All client-side behaviour lives here as Alpine components. Loaded on every
 * page by @astrojs/alpinejs (see astro.config.mjs) and in Storybook by
 * .storybook/alpine.ts.
 */
export default (Alpine: Alpine) => {
  Alpine.plugin(persist);

  /** Sidebar accordion section; open state persisted per section id. */
  Alpine.data("navSection", (id: string) => ({
    open: Alpine.$persist(true).as(`leviathan:nav:${id}`),
    init() {
      // Never hide the page being read.
      if (this.$el.querySelector('[aria-current="page"]')) this.open = true;
    },
  }));

  /** Hover/focus tooltip on a <concept-ref data-kind data-concept> element. */
  const OPEN_DELAY = 120;
  const CLOSE_DELAY = 200;
  Alpine.data("conceptRef", () => ({
    tip: null as HTMLElement | null,
    timer: undefined as number | undefined,

    init() {
      this.$el.setAttribute("tabindex", "0");
      this.$el.setAttribute("role", "button");
      this.$el.setAttribute("aria-haspopup", "true");
      this.$el.setAttribute("aria-expanded", "false");
    },
    schedule(open: boolean, delay: number) {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => (open ? this.show() : this.hide()), delay);
    },
    show() {
      if (this.tip) return;
      const el = this.$el as HTMLElement;
      const kind = el.dataset.kind ?? "concept";
      const id = el.dataset.concept;
      const tpl = document.getElementById(`ref-${kind}-${id}`) as HTMLTemplateElement | null;
      if (!tpl) return;
      const tip = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
      tip.id = `${kind}-${id}-tip-${Math.random().toString(36).slice(2, 7)}`;
      tip.addEventListener("mouseenter", () => window.clearTimeout(this.timer));
      tip.addEventListener("mouseleave", () => this.schedule(false, CLOSE_DELAY));
      tip.querySelector("a")?.addEventListener("blur", () => this.hide());
      el.appendChild(tip);
      this.tip = tip;
      el.setAttribute("aria-describedby", tip.id);
      el.setAttribute("aria-expanded", "true");
      this.position(tip);
    },
    hide() {
      window.clearTimeout(this.timer);
      this.tip?.remove();
      this.tip = null;
      this.$el.removeAttribute("aria-describedby");
      this.$el.setAttribute("aria-expanded", "false");
    },
    /** Keep the tooltip inside the viewport horizontally; flip above if no room below. */
    position(tip: HTMLElement) {
      const anchor = this.$el.getBoundingClientRect();
      const rect = tip.getBoundingClientRect();
      const overflowRight = anchor.left + rect.width - (window.innerWidth - 16);
      if (overflowRight > 0) tip.style.left = `${-overflowRight}px`;
      if (anchor.bottom + rect.height > window.innerHeight - 16 && anchor.top > rect.height) {
        tip.classList.add("concept-tip--above");
      }
    },
  }));
  Alpine.bind("conceptRefEvents", () => ({
    "x-on:mouseenter"(this: ConceptRef) { this.schedule(true, OPEN_DELAY); },
    "x-on:mouseleave"(this: ConceptRef) { this.schedule(false, CLOSE_DELAY); },
    "x-on:focus"(this: ConceptRef) { this.show(); },
    "x-on:blur"(this: ConceptRef, e: FocusEvent) {
      const next = e.relatedTarget as Node | null;
      if (!next || !this.$el.contains(next)) this.hide();
    },
    "x-on:click"(this: ConceptRef, e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a")) return;
      this.tip ? this.hide() : this.show();
    },
    "x-on:keydown.escape"(this: ConceptRef) { this.hide(); },
  }));

  /** Back link: history.back() when the previous page is on this site. */
  Alpine.data("backButton", () => ({
    go(e: MouseEvent) {
      let sameOrigin = false;
      try {
        sameOrigin = new URL(document.referrer).origin === location.origin;
      } catch {}
      if (history.length > 1 && sameOrigin) {
        e.preventDefault();
        history.back();
      }
      // otherwise let the fallback href navigate
    },
  }));


  /**
   * Colour theme. The <head> script in Layout.astro SETS the initial theme
   * (persisted choice, else system preference) before paint. This component
   * only CHANGES it: on toggle, or when the system preference changes while
   * no explicit choice is stored.
   */
  Alpine.data("theme", () => ({
    stored: Alpine.$persist(null as "light" | "dark" | null).as("leviathan:theme"),
    dark: document.documentElement.classList.contains("dark"),
    init() {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", (e) => {
        if (!this.stored) this.set(e.matches);
      });
    },
    set(dark: boolean) {
      this.dark = dark;
      document.documentElement.classList.toggle("dark", dark);
    },
    toggle() {
      this.stored = this.dark ? "light" : "dark";
      this.set(this.stored === "dark");
    },
  }));

  /** Image lightbox: a native <dialog> opened with showModal(); Escape, backdrop, and the button close it. */
  Alpine.data("lightbox", () => ({
    open() {
      (this.$refs.dialog as HTMLDialogElement).showModal();
      document.documentElement.style.overflow = "hidden";
    },
    close() {
      (this.$refs.dialog as HTMLDialogElement).close();
    },
    /** Runs on the dialog's native close event (also fired by Escape). */
    closed() {
      document.documentElement.style.overflow = "";
    },
  }));

  /**
   * On a chapter page reached via a quotation link (?hl=<opening words>#pN),
   * wrap those words in <mark> inside paragraph N and scroll them into view.
   * Matching ignores case, punctuation, and the tooltip wrappers in the text.
   */
  Alpine.data("quoteTarget", () => ({
    marks: [] as HTMLElement[],
    init() {
      const q = new URLSearchParams(location.search);
      const words = q.get("hl");
      const to = q.get("to");
      const para = /^#(p\d+)$/.exec(location.hash)?.[1];
      // Defer: mutating the text while Alpine is still walking the tree on
      // first init leaves the marks stripped; after the tick it is stable.
      if (words && para) this.$nextTick(() => this.jump(para, words, to, false));
    },
    /** Highlight from `words` to the end of `to` (or just `words`) inside paragraph `para`, and scroll there. */
    jump(para: string, words: string, to: string | null, pushUrl: boolean) {
      const target = document.getElementById(para);
      if (!target) return;
      this.clear();
      this.marks = highlight(target, words, to);
      for (const m of this.marks) m.title = "Click to remove highlight";
      if (pushUrl) {
        const q = new URLSearchParams({ hl: words });
        if (to) q.set("to", to);
        history.replaceState(null, "", `?${q}#${para}`);
      }
      this.marks[0]?.scrollIntoView({ block: "center" });
    },
    clear() {
      for (const m of this.marks) m.replaceWith(...m.childNodes);
      this.marks = [];
      this.$el.normalize();
    },
    /** Clicks inside the text: a pull quote jumps to its sentence; a highlight dismisses itself. */
    onClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      const pull = t.closest<HTMLAnchorElement>("a.pullquote__link");
      if (pull) {
        const url = new URL(pull.href);
        const words = url.searchParams.get("hl");
        const para = url.hash.slice(1);
        if (!words || !para) return;
        e.preventDefault();
        this.jump(para, words, url.searchParams.get("to"), true);
        return;
      }
      if (t.closest("mark.quote-hl")) {
        this.clear();
        history.replaceState(null, "", location.pathname + location.hash);
      }
    },
  }));
};

/** Lowercase alphanumerics only, keeping a map back to original offsets. */
function fold(text: string) {
  const chars: string[] = [];
  const offsets: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i].toLowerCase();
    if (/[a-z0-9]/.test(c)) {
      chars.push(c);
      offsets.push(i);
    }
  }
  return { folded: chars.join(""), offsets };
}

/**
 * Wrap the span from `needle` to the end of `endNeedle` (or just `needle`),
 * found within `root` possibly across inline elements, in <mark> elements.
 */
function highlight(root: HTMLElement, needle: string, endNeedle: string | null = null): HTMLElement[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(".para-num") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes: Text[] = [];
  let text = "";
  const starts: number[] = [];
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    nodes.push(n);
    starts.push(text.length);
    text += n.data;
  }
  const hay = fold(text);
  const start = fold(needle).folded;
  const idx = hay.folded.indexOf(start);
  if (idx < 0) return [];
  let endIdx = idx + start.length; // exclusive, in folded space
  if (endNeedle) {
    const end = fold(endNeedle).folded;
    const j = hay.folded.indexOf(end, idx);
    if (j >= 0) endIdx = j + end.length;
  }
  const from = hay.offsets[idx];
  let to = hay.offsets[endIdx - 1] + 1;
  while (to < text.length && /[.,;:!?)\]”"']/.test(text[to])) to++; // keep closing punctuation


  const marks: HTMLElement[] = [];
  nodes.forEach((node, i) => {
    const nodeFrom = starts[i];
    const nodeTo = nodeFrom + node.data.length;
    const a = Math.max(from, nodeFrom) - nodeFrom;
    const b = Math.min(to, nodeTo) - nodeFrom;
    if (a >= b) return;
    const range = document.createRange();
    range.setStart(node, a);
    range.setEnd(node, b);
    const mark = document.createElement("mark");
    mark.className = "quote-hl";
    range.surroundContents(mark);
    marks.push(mark);
  });
  return marks;
}

