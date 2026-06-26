import type { InputProps } from "@/src/type/forms";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, ...props }, ref) => (
    <input
      ref={ref}
      id={id}
      name={id}
      {...props}
      className={cn("w-full rounded-sm border-2 px-2 py-2.5", className)}
    />
  ),
);

export default Input;
