import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={clsx(
        "bg-white rounded-md p-8 max-w-[460px] mx-auto grid gap-6",
        className
      )}
    >
      {children}
    </article>
  );
}
