import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={clsx("bg-white rounded-xl p-8 mx-auto grid gap-6", className)}
    >
      {children}
    </article>
  );
}
