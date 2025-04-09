import { ReactNode } from "react";
import clsx from "clsx";

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
      className={clsx("text-center text-xl text-gray-900", {
        "font-bold": isBolded,
        "font-normal": !isBolded,
      })}
    >
      {children}
    </h1>
  );
}
