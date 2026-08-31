import { variantForm } from "../theme/lib/spelling";

/**
 * Hobbes's own form of a title, shown only when it differs from the modern
 * one. "Power" is spelt the same in 1651 and needs no note; "Soveraignty" and
 * "the late Civill warre" do.
 */
export const hobbesForm = (title: string, hobbes?: string) => variantForm(title, hobbes, "Hobbes");
