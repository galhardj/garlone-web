import { cva, type VariantProps } from "class-variance-authority";

export const featureVariants = cva("flex flex-col gap-8 lg:gap-16", {
  variants: {
    position: {
      left: "md:flex-row",
      right: "md:flex-row-reverse",
    },
  },
  defaultVariants: {
    position: "left",
  },
});
