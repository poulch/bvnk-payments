interface PaymentAmountProps {
  amount: number;
  currency: string;
}

export const PaymentAmount = ({ amount, currency }: PaymentAmountProps) => {
  return (
    <h2 className="font-bold text-gray-900 flex gap-1 items-baseline justify-center">
      <span className="text-3xl">{amount}</span>
      <span className=" text-xl">{currency}</span>
    </h2>
  );
};
