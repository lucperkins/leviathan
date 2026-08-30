import type { Alpine } from "alpinejs";
import persist from "@alpinejs/persist";

/** @alpinejs/persist adds `$persist` to the Alpine object; its package ships no types. */
declare module "alpinejs" {
  interface Alpine {
    $persist<T>(value: T): { as(key: string): T; using(storage: Storage): T };
  }
}

/** The three settings of the theme toggle; null in storage means follow the system. */
type Theme = "light" | "sepia" | "dark";

/** Where the reader last was, kept in localStorage under `leviathan:reading`. */
interface Reading {
  /** Chapter id, e.g. "13-of-the-naturall-condition-of-mankind". */
  id: string;
  /** What to call it in the resume link: "Chapter 13", or the title for the front matter. */
  label: string;
  /** Paragraph id ("p7"), or null on the chapters that are not numbered. */
  para: string | null;
  at: number;
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
  /**
   * Light, sepia, and dark, cycled in that order by the toggle. `stored` is
   * null until the reader chooses, in which case the system preference decides
   * between light and dark; choosing anything pins it. Layout.astro applies
   * the same rule before paint.
   */
  Alpine.data("theme", () => ({
    stored: Alpine.$persist(null as Theme | null).as("leviathan:theme"),
    mode: (document.documentElement.classList.contains("dark")
      ? "dark"
      : document.documentElement.classList.contains("theme-sepia")
        ? "sepia"
        : "light") as Theme,
    init() {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", (e) => {
        if (!this.stored) this.set(e.matches ? "dark" : "light");
      });
    },
    /** The one the toggle will move to, which is also the icon it shows. */
    get next(): Theme {
      return this.mode === "light" ? "sepia" : this.mode === "sepia" ? "dark" : "light";
    },
    get label() {
      return { light: "Light mode", sepia: "Sepia mode", dark: "Dark mode" }[this.next];
    },
    set(mode: Theme) {
      this.mode = mode;
      document.documentElement.classList.toggle("dark", mode === "dark");
      document.documentElement.classList.toggle("theme-sepia", mode === "sepia");
    },
    cycle() {
      this.stored = this.next;
      this.set(this.stored);
    },
  }));

  /** Sidebar scroll offset, remembered for the session so the nav stays put across pages. */
  /**
   * Chapter pages: remember where the reader got to, so the home page can
   * offer to send them back. The paragraph nearest the top of the viewport is
   * taken to be the one being read; scrolling saves on a short debounce.
   */
  Alpine.data("readingPosition", () => ({
    saved: Alpine.$persist(null as Reading | null).as("leviathan:reading"),
    timer: undefined as number | undefined,
    init() {
      const { id, label } = (this.$el as HTMLElement).dataset as { id: string; label: string };
      this.record(id, label);
      const later = () => {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.record(id, label), 400);
      };
      window.addEventListener("scroll", later, { passive: true });
      window.addEventListener("pagehide", () => this.record(id, label));
    },
    /** The last paragraph whose top has passed the reading line. */
    paragraph(): string | null {
      let found: string | null = null;
      for (const p of document.querySelectorAll<HTMLElement>(".prose-chapter p[id^='p']")) {
        if (p.getBoundingClientRect().top > 140) break;
        found = p.id;
      }
      return found;
    },
    record(id: string, label: string) {
      this.saved = { id, label, para: this.paragraph(), at: Date.now() };
    },
  }));

  /** Home page: a link back to wherever `readingPosition` last left the reader. */
  Alpine.data("resumeReading", () => ({
    saved: Alpine.$persist(null as Reading | null).as("leviathan:reading"),
    get href() {
      if (!this.saved) return "/chapters/the-epistle-dedicatory/";
      return `/chapters/${this.saved.id}/${this.saved.para ? `#${this.saved.para}` : ""}`;
    },
    get label() {
      return this.saved ? `Resume ${this.saved.label}` : "";
    },
  }));

  /**
   * The map on /hobbes/life/. One place is always shown; hovering or focusing
   * another previews it without losing the pinned one, so the panel never goes
   * empty and a click still works on a touch screen.
   */
  Alpine.data("hobbesMap", () => ({
    pinned: 0,
    hover: null as number | null,
    get active() {
      return this.hover ?? this.pinned;
    },
    preview(i: number) {
      this.hover = i;
    },
    clear() {
      this.hover = null;
    },
    pin(i: number) {
      this.pinned = i;
      this.hover = null;
    },
  }));

  /**
   * The chain of definitions on /definitions/. `chains` maps a term to its
   * whole derivation, computed at build time; picking a term shows those cards
   * and hides the rest, and clicking a borrowed word inside a sentence re-roots
   * the chain on the term it points to.
   */
  Alpine.data(
    "definitionChain",
    ({ chains, terms, start }: { chains: Record<string, string[]>; terms: Record<string, string>; start: string }) => ({
      chains,
      terms,
      root: start,
      get chain() {
        return this.chains[this.root] ?? [];
      },
      get summary() {
        const steps = this.chain.length - 1;
        if (steps <= 0) return `${this.terms[this.root]} is where the chain starts.`;
        return `${this.terms[this.root]} rests on ${steps} earlier definition${steps === 1 ? "" : "s"}, in the order below.`;
      },
      select(id: string) {
        if (this.chains[id]) this.root = id;
      },
    }),
  );

  Alpine.data("navScroll", () => ({
    pending: false,
    save() {
      if (this.pending) return;
      this.pending = true;
      requestAnimationFrame(() => {
        this.pending = false;
        try {
          sessionStorage.setItem("leviathan:nav-scroll", String(this.$el.scrollTop));
        } catch {}
      });
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

