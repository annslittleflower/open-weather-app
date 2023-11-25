import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/classnames";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input className={cn("p-4  border-2 border-black", className)} {...rest} />
  );
};

export default Input;
