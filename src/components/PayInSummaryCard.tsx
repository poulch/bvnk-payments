import { paymentOptions } from "@/paymentOptions";
import { Combobox } from "./ui/Combobx";
import { PaymentAmount } from "./ui/PaymentAmount";
import { PaymentTitle } from "./ui/PaymentTitle";
import { Text } from "./ui/Text";

export interface PayInSummaryCardProps {
  reference: string;
  title: string;
  currencyAmount: number;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export const PayInSummaryCard = ({
  currency,
  currencyAmount,
  onCurrencyChange,
  reference,
  title,
}: PayInSummaryCardProps) => {
  return (
    <>
      <PaymentTitle>{title}</PaymentTitle>
      <PaymentAmount
        className="mt-2"
        amount={currencyAmount}
        currency={currency}
      />
      <p className="text-center mt-6">
        <Text className="text-sm">For reference number:</Text>
        <Text isBolded>{reference}</Text>
      </p>
      <div className="flex flex-col gap-1 mt-6">
        <Text>Pay with</Text>
        <Combobox
          options={paymentOptions}
          placeholder="Select Currency"
          onChange={onCurrencyChange}
        />
      </div>
    </>
  );
};
