/**
 * Hobbes's own form of a title, shown only when it differs from the modern
 * one. "Power" is spelt the same in 1651 and needs no note; "Soveraignty" and
 * "the late Civill warre" do.
 */
export function hobbesForm(title: string, hobbes?: string): string | undefined {
  if (!hobbes) return undefined;
  return hobbes.toLowerCase() === title.toLowerCase() ? undefined : `Hobbes: ${hobbes}`;
}
