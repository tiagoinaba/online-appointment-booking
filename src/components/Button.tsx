import { cn } from "@/lib/utils";
import React, { type PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
  variant?: "default" | "ghost" | "destructive";
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (
  props: PropsWithChildren<ButtonProps>
) => {
  const { className, children, onClick, variant, ...rest } = props;

  const classDefault =
    "flex flex-nowrap items-center justify-center gap-1 rounded px-2 py-1 transition duration-200 cursor-pointer disabled:cursor-auto";

  const cNGenerator = (variant: ButtonProps["variant"]) => {
    if (variant) {
      const styles: Record<typeof variant, string> = {
        default:
          "bg-zinc-700 text-zinc-50 hover:bg-zinc-900 disabled:bg-zinc-400",
        ghost:
          "hover:bg-zinc-300 cursor-pointer disabled:bg-zinc-200 disabled:text-zinc-400",
        destructive:
          "bg-red-600 text-zinc-50 hover:bg-red-500 disabled:bg-red-400",
      };
      return styles[variant];
    } else {
      return "bg-zinc-700 text-zinc-50 hover:bg-zinc-900 disabled:bg-zinc-400";
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(cNGenerator(props.variant), className, classDefault)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
