import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";
import { iconVariants } from "./styles";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  category: VariantProps<typeof iconVariants>["category"];
};

const IconButton = ({
  type = "button",
  className,
  category,
  children,
  ...props
}: IconButtonProps) => {
  const style = cn(iconVariants({ category }), className);
  return (
    <button className={style} type={type} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
