import React from "react";
import { cn } from "@/src/lib/utils";
import { type ButtonColors, buttonVariants } from "./styles";

// TODO: more styles for buttons for existing components use it
// TODO: merge RegButton and IconButton

type RegButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColors;
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
