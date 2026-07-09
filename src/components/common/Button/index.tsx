import React from "react";
import { cn } from "@/src/lib/utils";
import {
  type ButtonColors,
  type IconCategory,
  buttonVariants,
  iconVariants,
} from "./styles";

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type RegButtonProps = BaseProps & {
  color?: ButtonColors;
  category?: never;
};

type IconButtonProps = BaseProps & {
  category: IconCategory;
  color?: never;
};

type ButtonProps = RegButtonProps | IconButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = "button", className, color, category, children, ...props },
    ref,
  ) => {
    const style = category
      ? cn(iconVariants({ category }), className)
      : cn(buttonVariants({ color }), className);

    return (
      <button ref={ref} className={style} type={type} {...props}>
        {children}
      </button>
    );
  },
);

export default Button;
