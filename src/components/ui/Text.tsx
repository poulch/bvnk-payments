import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  isBolded?: boolean;
  className?: string;
}

export function Text({ className, children, isBolded }: TextProps) {
  return (
    <span
      className={cn(
        "text-gray-600 text-sm",
        {
          "font-medium": isBolded,
          "font-normal": !isBolded,
        },
        className
      )}
    >
      {children}
    </span>
  );
}
