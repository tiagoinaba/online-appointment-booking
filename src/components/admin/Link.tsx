import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export const Link: React.FC<LinkProps & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  className,
  active,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "relative mx-auto flex items-center justify-center gap-2 overflow-hidden p-0 py-[2px] before:absolute before:bottom-0 before:h-[2px] before:w-full before:-translate-x-full before:bg-zinc-300 before:transition before:duration-300 before:content-[''] hover:before:translate-x-0",
        className,
        active && "before:translate-x-0"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
