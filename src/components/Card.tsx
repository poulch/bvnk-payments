import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-xl p-8 mx-auto grid gap-6 min-h-80",
        className
      )}
    >
      {children}
    </article>
  );
}
