import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils/mergeTailwind";
import { buttonVariants } from "@/src/constants/styles";

const regButtonVariants = buttonVariants(
  "mt-3 rounded-xl border px-6 py-3 font-medium text-gray-600",
);

type RegButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: VariantProps<typeof regButtonVariants>["color"];
};

const RegButton = React.forwardRef<HTMLButtonElement, RegButtonProps>(
  ({ type = "button", className, color, children, ...props }, ref) => {
    const style = cn(regButtonVariants({ color }), className);
    return (
      <button ref={ref} className={style} type={type} {...props}>
        {children}
      </button>
    );
  },
);

export default RegButton;
