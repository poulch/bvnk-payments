import { cn } from "@/lib/utils";

interface PaymentAmountProps {
  amount: number;
  currency: string;
  className?: string;
}

export const PaymentAmount = ({
  amount,
  currency,
  className,
}: PaymentAmountProps) => {
  return (
    <h2
      className={cn(
        "font-bold text-gray-900 flex gap-1 items-baseline justify-center",
        className
      )}
    >
      <span className="text-3xl">{amount}</span>
      <span className=" text-xl">{currency}</span>
    </h2>
  );
};
