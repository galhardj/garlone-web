import { cva } from "class-variance-authority";

export const buttonVariants = (baseStyle: string) =>
  cva(baseStyle, {
    variants: {
      color: {
        yellow: "bg-amber-300",
        yellowDark: "bg-amber-400",
        blue: "bg-blue-200",
        gray: "bg-gray-600",
      },
    },
    defaultVariants: {
      color: "yellow",
    },
  });
