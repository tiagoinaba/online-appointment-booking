import { cn } from "@/lib/utils";
import React, { type FC, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-[50px] min-w-[150px] rounded border p-6 transition duration-300 hover:bg-zinc-50",
        className
      )}
    >
      {children}
    </div>
  );
};
