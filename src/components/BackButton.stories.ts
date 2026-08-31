import BackButton from "../theme/components/BackButton.astro";

export default {
  title: "Navigation/BackButton",
  component: BackButton,
  argTypes: {
    label: { control: "text" },
    fallback: { control: "text", description: "href used when there is no same-site history" },
  },
};

export const Default = { args: {} };
export const CustomLabel = { args: { label: "Back to chapter", fallback: "/chapters/01-of-sense/" } };
