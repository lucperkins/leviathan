/** Neighbours of `index` in an ordered list, mapped to prev/next link items. */
export function neighbours<T>(
  items: T[],
  index: number,
  toItem: (item: T) => { href: string; title: string },
) {
  return {
    prev: index > 0 ? toItem(items[index - 1]) : undefined,
    next: index < items.length - 1 ? toItem(items[index + 1]) : undefined,
  };
}
