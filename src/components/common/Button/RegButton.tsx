import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils/mergeTailwind";

const buttconVariants = cva(
  "mt-3 rounded-xl border px-6 py-3 font-medium text-gray-600",
  {
    variants: {
      color: {
        yellow: "bg-amber-300",
        yellowDark: "bg-amber-400",
        blue: "bg-blue-200",
      },
    },
    defaultVariants: {
      color: "yellow",
    },
  },
);

type RegButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: VariantProps<typeof buttconVariants>["color"];
};

const RegButton = React.forwardRef<HTMLButtonElement, RegButtonProps>(
  ({ type = "button", className, color, children, ...props }, ref) => {
    const style = cn(buttconVariants({ color }), className);
    return (
      <button ref={ref} className={style} type={type} {...props}>
        {children}
      </button>
    );
  },
);

export default RegButton;
