/**
 * The author's own form of a title, shown only when it differs from the
 * modern one. "Power" is spelt the same in 1651 and needs no note;
 * "Soveraignty" and "the late Civill warre" do.
 */
export function variantForm(title: string, variant: string | undefined, label: string): string | undefined {
  if (!variant) return undefined;
  return variant.toLowerCase() === title.toLowerCase() ? undefined : `${label}: ${variant}`;
}
