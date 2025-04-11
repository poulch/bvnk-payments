import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaymentTitleProps {
  isBolded?: boolean;
  children: ReactNode;
}

export function PaymentTitle({
  isBolded = false,
  children,
}: PaymentTitleProps) {
  return (
    <h1
      className={cn("text-center text-xl text-gray-900", {
        "font-bold": isBolded,
        "font-medium": !isBolded,
      })}
    >
      {children}
    </h1>
  );
}
