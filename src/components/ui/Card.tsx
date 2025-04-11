import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article className={cn("bg-white rounded-md p-6 mx-auto ", className)}>
      {children}
    </article>
  );
}
