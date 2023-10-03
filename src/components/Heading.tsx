import { cn } from "@/lib/utils";
import React, { type FC, type ReactNode } from "react";
import { classNames } from "uploadthing/client";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Heading: FC<Props> = ({ children, className }) => {
  return (
    <h2
      className={cn("mx-40 self-start border-b text-4xl font-bold", className)}
    >
      {children}
    </h2>
  );
};
