import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils/mergeTailwind";
import { buttonVariants } from "./styles";

// TODO: more styles for buttons for existing components use it
// relative inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-amber-950 shadow-lg shadow-amber-400/30 transition-all duration-300 hover:scale-[1.03] hover:bg-amber-500 hover:shadow-amber-500/40 active:scale-[0.98]
// TODO: merge RegButton and IconButton

type RegButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: VariantProps<typeof buttonVariants>["color"];
};

const RegButton = React.forwardRef<HTMLButtonElement, RegButtonProps>(
  ({ type = "button", className, color, children, ...props }, ref) => {
    const style = cn(buttonVariants({ color }), className);
    return (
      <button ref={ref} className={style} type={type} {...props}>
        {children}
      </button>
    );
  },
);

export default RegButton;
