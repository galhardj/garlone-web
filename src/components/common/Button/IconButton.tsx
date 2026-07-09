import React from "react";
import { cn } from "@/src/lib/utils";
import { type IconCategory, iconVariants } from "./styles";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  category: IconCategory;
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
