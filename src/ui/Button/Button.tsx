import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/classnames";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn("p-2 border-2 border-black", className)}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
