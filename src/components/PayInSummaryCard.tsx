import { PaymentAmount } from "./ui/PaymentAmount";
import { PaymentTitle } from "./ui/PaymentTitle";
import { Text } from "./ui/Text";
import { Currency } from "@/types";

export interface PayInSummaryCardProps {
  reference: string;
  title: string;
  currency: Currency;
}

export const PayInSummaryCard = ({
  currency,
  reference,
  title,
}: PayInSummaryCardProps) => {
  return (
    <>
      <PaymentTitle>{title}</PaymentTitle>
      <PaymentAmount
        className="mt-2"
        amount={currency.amount}
        currency={currency.currency || ""}
      />
      <p className="text-center mt-6">
        <Text className="text-sm">For reference number: </Text>
        <Text isBolded>{reference}</Text>
      </p>
    </>
  );
};
