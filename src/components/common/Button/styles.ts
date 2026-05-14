import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "mt-3 px-8 py-2 font-medium rounded border border-black hover:bg-black hover:text-white transition-colors duration-100",
  {
    variants: {
      color: {
        transparent: "bg-transparent",
        yellow: "bg-amber-300",
        yellowDark: "bg-amber-400",
        blue: "bg-blue-200",
        gray: "bg-gray-600",
      },
    },
    defaultVariants: {
      color: "transparent",
    },
  },
);

export type buttonColors = VariantProps<typeof buttonVariants>["color"];

export const iconVariants = cva("", {
  variants: {
    category: {
      resetButton:
        "flex h-9 w-9 items-center justify-center rounded-full bg-red-100 p-1 transition-colors hover:bg-red-200",
      chevronLeft:
        "absolute top-1/2 left-0.5 rounded-full bg-gray-200/50 p-3 hover:scale-110",
      chevronRight:
        "absolute top-1/2 right-0.5 rounded-full bg-gray-200/50 p-3 hover:scale-110",
      password:
        "absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 items-center justify-center bg-transparent",
    },
  },
});
