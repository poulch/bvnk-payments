import { Text } from "./Text";

interface MoneyProps {
  money?: {
    amount: number;
    currency: string | null;
  };
}

export const Money = ({ money }: MoneyProps) => {
  if (!money) {
    return <Text>0.00</Text>;
  }

  const { amount, currency } = money;

  return (
    <Text>
      {amount} {currency}
    </Text>
  );
};
